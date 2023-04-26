import { derived, get, writable } from "svelte/store"
import type { Readable, Writable } from "svelte/store"
import Habit from "./habit"
import type { HabitTimeOfDay as HabitTimeOfDayType } from "./habit-enums"

interface BackupData {
    habits: Habit[],
    habitsHistory: Map<string, Date[]>
}

interface BackupTimestamps {
    created: Date,
    updated: Date
}

export default class Backup {
    synced: Writable<boolean> = writable()
    _id: Writable<string> = writable()
    data: Writable<BackupData> = writable()
    timestamps: Writable<BackupTimestamps> = writable()

    protected backupProperties = [this.synced, this._id, this.data, this.timestamps]
    edits: Readable<number> = derived([...this.backupProperties], (_, set) => set(get(this.edits) + 1), 0)

    constructor(json?: Record<string, unknown>) {
        this.fromJson(json)
    }

    fromJson(json: Record<string, unknown>): void {
        this.synced.set(json?.['synced'] as boolean)
        this._id.set(json?.['_id'] as string)
        const habitsData: [] = json?.['data']?.['habits'] ?? []
        const habits: Habit[] = []
        for (let i = 0; i < habitsData.length; i++) {
            habits.push(new Habit(habitsData[i]))
        }
        const habitsHistory = json?.['data']?.['habitsHistory'] as Map<string, Date[]> ?? new Map()
        this.data.set({ habits, habitsHistory })
        this.timestamps.set({
            created: new Date(json?.['timestamps']?.['created']),
            updated: new Date(json?.['timestamps']?.['updated'])
        })
    }

    toJson(): Record<string, unknown> {
        // eslint-disable-next-line prefer-const
        let jsonHabits: Record<string, unknown>[] = []
        const habits = get(this.data).habits
        for (let i = 0; i < habits.length; i++) {
            jsonHabits.push(habits[i].toJson())
        }
        const habitsHistory = get(this.data).habitsHistory
        return {
            synced: get(this.synced),
            _id: get(this._id),
            data: {
                habits: jsonHabits,
                habitsHistory
            },
            timestamps: {
                created: get(this.timestamps).created,
                updated: get(this.timestamps).updated
            }
        }
    }

    addHabit(habit: Habit): boolean {
        if (!habit.isValid()) return false
        const currentData = get(this.data)
        currentData.habits.push(habit)
        this.data.set(currentData)
        return true
    }

    getHabitById(id: string): Habit {
        const habits = get(this.data).habits
        for (let i = 0; i < habits.length; i++) {
            if (habits[i]._idValue == id) return habits[i]
        }
        return null
    }

    updateHabitById(id: string, newData: Record<string, unknown>): void {
        const currentData = get(this.data)
        const habits = currentData.habits
        for (let i = 0; i < habits.length; i++) {
            if (habits[i]._idValue == id) {
                habits[i].fromJson({...newData, _id: id})
                currentData.habits = habits
                this.data.set(currentData)
                return
            }
        }
    }

    deleteHabitById(id: string): void {
        const currentData = get(this.data)
        const habits = currentData.habits
        for (let i = 0; i < habits.length; i++) {
            if (habits[i]._idValue == id) {
                habits.splice(i, 1)
                currentData.habits = habits
                this.data.set(currentData)
                return
            }
        }
    }

    getHabitsByTimeOfDay(timeOfDay?: HabitTimeOfDayType): Habit[] {
        const habits = get(this.data).habits
        const filteredHabits = []
        for (let i = 0; i < habits.length; i++) {
            if ((get(habits[i].timeOfDay) ?? []).length == 0 && timeOfDay == undefined) filteredHabits.push(habits[i])
            else if ((get(habits[i].timeOfDay) ?? []).indexOf(timeOfDay) != -1) filteredHabits.push(habits[i])
        }
        return filteredHabits
    }

}