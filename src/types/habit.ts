import { derived, get, writable } from "svelte/store"
import type { Writable, Readable } from "svelte/store"
import { nanoid } from 'nanoid'
import type * as HabitEnumsTypes from "./habit-enums"
import * as HabitEnums from "./habit-enums"
import { clone, isEqual } from 'underscore'

interface HabitTimestamps {
    created: Date
}

interface HabitRecord {
    goalRecorded: number
    timestamp: Date
    habitDetails: {
        useGoal: boolean
        splitGoal: boolean
        goal: number
        goalUnit: HabitEnumsTypes.HabitGoalUnitType
        goalInterval: HabitEnumsTypes.HabitRepeating
        timeOfDay: HabitEnumsTypes.HabitTimeOfDay[]
        optional: boolean
    }
}

export default class Habit {
    _id: Writable<string> = writable()
    title: Writable<string> = writable()
    description: Writable<string> = writable()
    timestamps: Writable<HabitTimestamps> = writable()
    minGoal: Writable<number> = writable()
    useGoal: Writable<boolean> = writable()
    splitGoal: Writable<boolean> = writable()
    goal: Writable<number> = writable()
    goalUnit: Writable<HabitEnumsTypes.HabitGoalUnitType> = writable()
    goalInterval: Writable<HabitEnumsTypes.HabitRepeating> = writable()
    maxGoal: Writable<number> = writable()
    timeOfDay: Writable<HabitEnumsTypes.HabitTimeOfDay[]> = writable()
    optional: Writable<boolean> = writable()
    records: Writable<Map<string, HabitRecord[]>> = writable()

    get _idValue(): string { return get(this._id) }
    get titleValue(): string { return get(this.title) }
    get descriptionValue(): string { return get(this.description) }
    get timestampsValue(): HabitTimestamps { return get(this.timestamps) }

    get goalValue(): number { return get(this.goal) }
    get goalUnitValue(): HabitEnumsTypes.HabitGoalUnitType { return get(this.goalUnit) }
    get goalIntervalValue(): HabitEnumsTypes.HabitRepeating { return get(this.goalInterval) }

    protected habitProperties = [this._id, this.title, this.description, this.timestamps, this.minGoal, this.useGoal, this.splitGoal, this.goal, this.goalInterval, this.goalUnit, this.maxGoal, this.timeOfDay, this.optional, this.records]
    edits: Readable<number> = derived([...this.habitProperties], (_, set) => set(get(this.edits) + 1), 0)

    constructor(json?: Record<string, unknown>) {
        this.fromJson(json)
    }

    protected habitFromJson(json: Record<string, unknown>): void {
        this._id.set(json?.['_id'] as string ?? nanoid(21))
        this.title.set(json?.['title'] as string)
        this.description.set(json?.['description'] as string)
        this.timestamps.set({
            created: new Date(json?.['timestamps']?.['created'] ?? Date.now())
        })
        this.minGoal.set(json?.['minGoal'] as number)
        this.useGoal.set(json?.['useGoal'] as boolean)
        this.splitGoal.set(json?.['splitGoal'] as boolean)
        this.goal.set(json?.['goal'] as number)
        this.goalInterval.set(json?.['goalInterval'] as number)
        this.goalUnit.set(json?.['goalUnit'] as number)
        this.maxGoal.set(json?.['maxGoal'] as number)
        this.timeOfDay.set(json?.['timeOfDay'] as HabitEnumsTypes.HabitTimeOfDay[])
        this.optional.set(json?.['optional'] as boolean)
        this.records.set(json?.['records'] as Map<string, HabitRecord[]>)
    }

    fromJson(json: Record<string, unknown>): void {
        this.habitFromJson(json)
    }

    toJson(): Record<string, unknown> {
        return {
            _id: get(this._id),
            title: get(this.title),
            description: get(this.description),
            timestamps: {
                created: get(this.timestamps).created
            },
            minGoal: get(this.minGoal),
            useGoal: get(this.useGoal),
            splitGoal: get(this.splitGoal),
            goal: get(this.goal),
            goalInterval: get(this.goalInterval),
            goalUnit: get(this.goalUnit),
            maxGoal: get(this.maxGoal),
            timeOfDay: get(this.timeOfDay),
            optional: get(this.optional),
            records: get(this.records)
        }
    }

    isValid(): boolean {
        if (get(this._id) == undefined) return false
        if (get(this.title) == undefined || get(this.title).length < 3) return false
        if (get(this.useGoal)) {
            if (get(this.goal) == undefined || get(this.goal) <= 0 || get(this.goal) >= 1000) return false
            if (get(this.goalInterval) == undefined) return false
            if (get(this.goalUnit) == undefined) return false
        }
        return true
    }

    isEqual(habit: Habit): boolean {
        return isEqual(this.toJson(), habit.toJson())
    }

    isAvailable(): boolean {
        // :todo check if habit can be done
        return false
    }

    addRecord(quantity: number): void {
        if (!this.isAvailable()) return
        // :todo add to records
        // :todo check if quantity can be added, if goal limits are not exeeded
        // :todo add to habit records
    }

    toggleTimeOfDay(timeOfDay: HabitEnumsTypes.HabitTimeOfDay): void {
        const orderedTimeOfDay: HabitEnumsTypes.HabitTimeOfDay[] = []
        const currentTimeOfDay = clone(get(this.timeOfDay) as HabitEnumsTypes.HabitTimeOfDay[] ?? [])
        if (currentTimeOfDay.indexOf(timeOfDay) == -1) currentTimeOfDay.push(timeOfDay)
        else currentTimeOfDay.splice(currentTimeOfDay.indexOf(timeOfDay), 1)
        if (currentTimeOfDay.indexOf(HabitEnums.HabitTimeOfDay.EARLY_MORNING) != -1) orderedTimeOfDay.push(HabitEnums.HabitTimeOfDay.EARLY_MORNING)
        if (currentTimeOfDay.indexOf(HabitEnums.HabitTimeOfDay.MORNING) != -1) orderedTimeOfDay.push(HabitEnums.HabitTimeOfDay.MORNING)
        if (currentTimeOfDay.indexOf(HabitEnums.HabitTimeOfDay.AFTERNOON) != -1) orderedTimeOfDay.push(HabitEnums.HabitTimeOfDay.AFTERNOON)
        if (currentTimeOfDay.indexOf(HabitEnums.HabitTimeOfDay.LATE_AFTERNOON) != -1) orderedTimeOfDay.push(HabitEnums.HabitTimeOfDay.LATE_AFTERNOON)
        if (currentTimeOfDay.indexOf(HabitEnums.HabitTimeOfDay.EVENING) != -1) orderedTimeOfDay.push(HabitEnums.HabitTimeOfDay.EVENING)
        if (currentTimeOfDay.indexOf(HabitEnums.HabitTimeOfDay.NIGHT) != -1) orderedTimeOfDay.push(HabitEnums.HabitTimeOfDay.NIGHT)
        this.timeOfDay.set(orderedTimeOfDay)
    }

    clearTimeOfDay(): void {
        this.timeOfDay.set([])
    }

    static getTimeOfDayLabel(timeOfDay: HabitEnumsTypes.HabitTimeOfDay): string {
        switch (timeOfDay) {
            case HabitEnums.HabitTimeOfDay.EARLY_MORNING: return 'Early Morning'
            case HabitEnums.HabitTimeOfDay.MORNING: return 'Morning'
            case HabitEnums.HabitTimeOfDay.AFTERNOON: return 'Afternoon'
            case HabitEnums.HabitTimeOfDay.LATE_AFTERNOON: return 'Late Afternoon'
            case HabitEnums.HabitTimeOfDay.EVENING: return 'Evening'
            case HabitEnums.HabitTimeOfDay.NIGHT: return 'Night'
        }
    }

    getTimeOfDayLabel(timeOfDay: HabitEnumsTypes.HabitTimeOfDay): string {
        return Habit.getTimeOfDayLabel(timeOfDay)
    }

    setGoalUnit(goalUnit: HabitEnumsTypes.HabitGoalUnitType): void {
        this.goalUnit.set(goalUnit)
    }

    getGoalUnitLabel(goal = get(this.goal), goalUnit = get(this.goalUnit)): string {
        switch (goalUnit) {
            case HabitEnums.HabitGoalUnitType.HOURS: return ((goal ?? 0) > 1 ? 'Hours' : 'Hour')
            case HabitEnums.HabitGoalUnitType.KILOMETERS: return ((goal ?? 0) > 1 ? 'Kilometers' : 'Kilometer')
            case HabitEnums.HabitGoalUnitType.MINUTES: return ((goal ?? 0) > 1 ? 'Minutes' : 'Minute')
            case HabitEnums.HabitGoalUnitType.PAGES: return ((goal ?? 0) > 1 ? 'Pages' : 'Page')
            case HabitEnums.HabitGoalUnitType.TIMES: return ((goal ?? 0) > 1 ? 'Times' : 'Time')
        }
    }

    setGoalInterval(goalInterval: HabitEnumsTypes.HabitRepeating): void {
        this.goalInterval.set(goalInterval)
    }

    getGoalIntervalLabel(goalInterval?: HabitEnumsTypes.HabitRepeating): string {
        switch (goalInterval ?? get(this.goalInterval)) {
            case HabitEnums.HabitRepeating.DAILY: return 'Daily'
            case HabitEnums.HabitRepeating.EVERY_FIVE_DAYS: return 'Every five days'
            case HabitEnums.HabitRepeating.EVERY_FOUR_DAYS: return 'Every four days'
            case HabitEnums.HabitRepeating.EVERY_FOUR_WEEKS: return 'Every four weeks'
            case HabitEnums.HabitRepeating.EVERY_SIX_DAYS: return 'Every six days'
            case HabitEnums.HabitRepeating.EVERY_THREE_DAYS: return 'Every three days'
            case HabitEnums.HabitRepeating.EVERY_THREE_WEEKS: return 'Every three weeks'
            case HabitEnums.HabitRepeating.EVERY_TWO_DAYS: return 'Every two days'
            case HabitEnums.HabitRepeating.EVERY_TWO_WEEKS: return 'Every two weeks'
            case HabitEnums.HabitRepeating.HALF_YEARLY: return 'Half yearly'
            case HabitEnums.HabitRepeating.MONTHLY: return 'Monthly'
            case HabitEnums.HabitRepeating.QUARTERLY: return 'Quarterly'
            case HabitEnums.HabitRepeating.WEEKLY: return 'Weekly'
            case HabitEnums.HabitRepeating.YEARLY: return 'Yearly'
        }
    }

    getCompletionRate(onDate = new Date()): number {
        const zeroHourStamp = onDate.setHours(0, 0, 0, 0)
        const records: HabitRecord[] = get(this.records)?.[zeroHourStamp] ?? []
        if (records.length == 0) return 0
        let rateSum = 0
        let rateCount = 0
        for (let i = 0; i < records.length; i++) {
            if ((records[i]?.habitDetails?.useGoal) ?? false) {
                rateSum += (records[i]?.goalRecorded ?? 0) / (records[i]?.habitDetails?.goal ?? 0)
            } else {
                rateSum += (records[i]?.goalRecorded ?? 0) / ((records[i]?.habitDetails?.splitGoal ?? false) ? ((records[i]?.habitDetails?.timeOfDay?.length) ?? 0) : 1)
            }
            rateCount++
        }
        return rateSum / rateCount
    }

}