import CurrentUserState from './current_user'
import CurrentBackupState from './current_backup'
import { browser } from '$app/env'
import { isEqual, throttle } from 'underscore'
import app from './app'

let readFromLocalStorage = false
let currentUserJson: Record<string, unknown>
let currentBackupJson: Record<string, unknown>

function getLocalStateCurrentUser(): void {
    try {
        if (!browser) return
        currentUserJson = JSON.parse(localStorage.getItem('current_user')) as Record<string, unknown>
        CurrentUserState.fromJson(currentUserJson)
    } catch (error) {
        console.log(error)
    }
}

function getLocalStateCurrentBackup(): void {
    try {
        if (!browser) return
        currentBackupJson = JSON.parse(localStorage.getItem('current_backup')) as Record<string, unknown>
        CurrentBackupState.fromJson(currentBackupJson)
    } catch (error) {
        console.log(error)
    }
}

function getLocalState(): void {
    if (!browser) return
    getLocalStateCurrentUser()
    getLocalStateCurrentBackup()
    readFromLocalStorage = true
    app.localStorageLoaded.set(true)
}

function _setLocalStateCurrentUser(): void {
    try {
        if (!browser) return
        if (!readFromLocalStorage) return
        const newUserJson = CurrentUserState.toJson()
        if (isEqual(newUserJson, currentUserJson)) return
        currentUserJson = newUserJson
        localStorage.setItem('current_user', JSON.stringify(currentUserJson))
    } catch (error) {
        console.log(error)
    }
}

const setLocalStateCurrentUserThrottled = throttle(_setLocalStateCurrentUser, 1000)

function setLocalStateCurrentUser(): void {
    try {
        setLocalStateCurrentUserThrottled()
    } catch (error) {
        console.log(error)
    }
}

CurrentUserState.edits.subscribe(setLocalStateCurrentUser)

function _setLocalStateCurrentBackup(): void {
    try {
        if (!browser) return
        if (!readFromLocalStorage) return
        const newBackupJson = CurrentBackupState.toJson()
        if (isEqual(newBackupJson, currentBackupJson)) return
        currentBackupJson = newBackupJson
        localStorage.setItem('current_backup', JSON.stringify(currentBackupJson))
    } catch (error) {
        console.log(error)
    }
}

const setLocalStateCurrentBackupThrottled = throttle(_setLocalStateCurrentBackup, 1000)

function setLocalStateCurrentBackup(): void {
    try {
        setLocalStateCurrentBackupThrottled()
    } catch (error) {
        console.log(error)
    }
}

CurrentBackupState.edits.subscribe(setLocalStateCurrentBackup)

function setLocalState(): void {
    if (!browser) return
    if (!readFromLocalStorage) return
    setLocalStateCurrentUser()
    setLocalStateCurrentBackup()
}

export {
    getLocalState,
    getLocalStateCurrentUser,
    getLocalStateCurrentBackup,
    setLocalState,
    setLocalStateCurrentUser,
    setLocalStateCurrentBackup
}