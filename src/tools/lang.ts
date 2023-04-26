import { dev } from "$app/env"
import { get, writable } from "svelte/store"
import langs from '../../static/langs.json'

const languages: string[] = ['en', 'de', 'it', 'ru']
const _defaultLang = ((import.meta.env.VITE_DEFAULT_LANG ?? 'en') as string).toLowerCase()
export const defaultLang = languages.indexOf(_defaultLang) != -1 ? _defaultLang : 'en'

const lang = writable(defaultLang)

function createLangStore() {
    return {
        subscribe: lang.subscribe,
        setLang: (newLang: string = defaultLang) => {
            if (languages.indexOf(newLang) == -1) newLang = defaultLang
            lang.set(newLang)
        }
    }
}

export const langStore = createLangStore()

export function getTranslatedString(englishString = '', _lang = undefined): string {
    if (dev) {
        if (_lang == undefined) console.warn(`No reactive lang param was specified for the string: "${englishString}"`)
        languages.map((language) => {
            if (language == 'en') return
            if (langs?.[englishString]?.[language] == undefined) throw new Error(`No translation found on "${language}" language for the string: "${englishString}"`)
        })
    }
    if (_lang == undefined) _lang = get(lang)
    englishString = langs?.[englishString]?.[_lang] ?? englishString
    return englishString
}