import { derived, get, writable } from "svelte/store"
import type { Readable, Writable } from "svelte/store"
import User from "./user"

export default class CurrentUser extends User {
    session_token: Writable<string> = writable()
    connected: Writable<boolean> = writable()
    onboarded: Writable<boolean> = writable()

    protected currentUserProperties = [this.session_token, this.connected, this.onboarded]
    edits: Readable<number> = derived([...this.currentUserProperties, ...this.userProperties], (_, set) => set(get(this.edits) + 1), 0)

    constructor(json?: Record<string, unknown>) {
        super()
        this.currentUserFromJson(json)
    }
    
    protected currentUserFromJson(json: Record<string, unknown>): void {
        this.session_token.set(json?.['session_token'] as string)
        this.connected.set(json?.['connected'] as boolean)
        this.onboarded.set(json?.['onboarded'] as boolean)
    }

    fromJson(json: Record<string, unknown>): void {
        super.fromJson(json)
        this.currentUserFromJson(json)
    }

    toJson(): Record<string, unknown> {
        const json: Record<string, unknown> = super.toJson()
        json['session_token'] = get(this.session_token)
        json['connected'] = get(this.connected)
        json['onboarded'] = get(this.onboarded)
        return json
    }

    onboard(): void {
        this.onboarded.set(true)
    }
}