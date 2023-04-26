import { derived, get, writable } from "svelte/store"
import type { Readable, Writable } from "svelte/store"

class App {
    localStorageLoaded: Writable<boolean> = writable(false)

    protected backupProperties = [this.localStorageLoaded]
    edits: Readable<number> = derived([...this.backupProperties], (_, set) => set(get(this.edits) + 1), 0)

}

export default new App()