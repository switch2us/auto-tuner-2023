import { derived, get, writable } from "svelte/store"
import type { Writable, Readable } from "svelte/store"

interface UserTokensInterface {
    verify_email: string,
    recover: string
}

interface UserTimestampsInterface {
    created: Date,
    updated: Date
}

export default class User {
    _id: Writable<string> = writable()
    name: Writable<string> = writable()
    email: Writable<string> = writable()
    email_verified: Writable<boolean> = writable()
    password: Writable<string> = writable()
    pro: Writable<boolean> = writable()
    tokens: Writable<UserTokensInterface> = writable()
    timestamps: Writable<UserTimestampsInterface> = writable()

    protected userProperties = [this._id, this.name, this.email, this.email_verified, this.password, this.pro, this.tokens, this.timestamps]
    edits: Readable<number> = derived(this.userProperties, (_, set) => set(get(this.edits) + 1), 0)

    constructor(json?: Record<string, unknown>) {
        this.userFromJson(json)
    }

    protected userFromJson(json: Record<string, unknown>): void {
        this._id.set(json?.['_id'] as string)
        this.name.set(json?.['name'] as string)
        this.email.set(json?.['email'] as string)
        this.email_verified.set(json?.['email_verified'] as boolean)
        this.password.set(json?.['password'] as string)
        this.pro.set(json?.['pro'] as boolean)
        this.tokens.set({
            verify_email: json?.['tokens']?.['verify_email'] as string,
            recover: json?.['tokens']?.['recover'] as string
        })
        this.timestamps.set({
            created: new Date(json?.['timestamps']?.['created']),
            updated: new Date(json?.['timestamps']?.['updated'])
        })
    }

    fromJson(json: Record<string, unknown>): void {
        return this.userFromJson(json)
    }

    toJson(): Record<string, unknown> {
        return {
            _id: get(this._id),
            name: get(this.name),
            email: get(this.email),
            email_verified: get(this.email_verified),
            password: get(this.password),
            pro: get(this.pro),
            tokens: {
                verify_email: get(this.tokens).verify_email,
                recover: get(this.tokens).recover
            },
            timestamps: {
                created: get(this.timestamps).created,
                updated: get(this.timestamps).updated
            }
        }
    }
}