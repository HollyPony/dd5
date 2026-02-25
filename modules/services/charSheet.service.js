import charSheetStorage from '../storages/charSheet.storage.js'
import charSheetCloud from '../storages/charSheet.cloud.js'
import charSheetStore from '../stores/charSheet.authority.store.js'
import authService from '../auth/auth.service.js'
import { debounce } from '../helpers.js'
import { fromJSONEntry } from '../storages/charSheet.storage.helpers.js'
import charSheetSyncFactory from './charSheetSync.factory.js'
import { throwAsync } from '../errors.js'
import createEventBus from '../createEventBus.js'
import authCloudService from '../auth/auth.cloud.service.js'

const CURRENT_CHARSHEET_CHANGED = 'currentCharSheetChanged'
const eventBus = createEventBus()

const AUTOSAVE_DELAY = 600
const AUTOSYNC_DELAY = 1800

let autosaveEventTarget = null
let userConnectedEventOff = null
let userDisconnectedEventOff = null
let charSheetSyncService = undefined

let _currentEntryId = undefined
function setCurrentId(id) {
  const changed = id !== _currentEntryId
  _currentEntryId = id
  if (changed) eventBus.emit(CURRENT_CHARSHEET_CHANGED)
}

/**
 * @param {{ id: string, updatedAt: number, data: object }} localEntry
 * @param {{ id: string, updatedAt: number, data: object }} cloudEntry
 * @returns {'local' | 'cloud' | 'both'}
 */
function resolveSyncConflict(localEntry, cloudEntry) {
  const localDate = new Date(localEntry.updatedAt).toISOString()
  const cloudDate = new Date(cloudEntry.updatedAt).toISOString()
  // TODO: replace prompt-based conflict resolution with a UI-driven workflow.
  const choice = window.prompt(
    [
      `Sync conflict detected for '${localEntry.id}'.`,
      `Type one value: local | cloud | both`,
      `local=${localDate}`,
      `cloud=${cloudDate}`,
    ].join('\n'),
    cloudEntry.updatedAt > localEntry.updatedAt ? 'cloud' : 'local'
  )?.trim()?.toLowerCase()

  if (!choice) throw new Error('Sync conflict was canceled by user.')
  if (!['local', 'cloud', 'both'].includes(choice)) throw new Error(`Invalid sync choice '${choice}'.`)
  return choice
}

const synchronizeCurrentEntry = debounce(() => {
  charSheetSyncService?.synchronizeEntry(_currentEntryId).catch(throwAsync)
}, AUTOSYNC_DELAY)

async function init() {
  const id = charSheetStorage.getLastUpdatedEntryId()

  autosaveEventTarget?.off()
  userConnectedEventOff?.()
  userDisconnectedEventOff?.()
  charSheetSyncService = undefined

  autosaveEventTarget = charSheetStore.onAny(debounce(saveCurrent, AUTOSAVE_DELAY))
  userConnectedEventOff = authService.onUserConnected(async () => {
    const syncService = await charSheetSyncFactory(resolveSyncConflict).catch(throwAsync)
    charSheetSyncService = syncService
  })
  userDisconnectedEventOff = authService.onUserDisconnected(() => {
    charSheetSyncService = undefined
  })

  id ? load(id) : create()
}

function create() {
  setCurrentId(charSheetStorage.createId())
  charSheetStore.reset()
}

function getList(includeCurrent) {
  return charSheetStorage.getSheetList(includeCurrent)
    .filter(item => includeCurrent || item.id !== _currentEntryId)
    .sort((a, b) => (b?.updatedAt ?? 0) - (a?.updatedAt ?? 0))
}

function load(entryId) {
  const sheet = charSheetStorage.getSheet(entryId)
  setCurrentId(entryId)
  charSheetStore.init(sheet)
}

function saveCurrent() {
  const entry = charSheetStorage.saveSheet(_currentEntryId, charSheetStore.get())
  if (authCloudService.isAuthenticated) synchronizeCurrentEntry()
  return entry
}

function importJSON(json) {
  autosaveEventTarget.muteWhile(() => {
    const entry = fromJSONEntry(json)
    charSheetStore.init(entry.data)
    setCurrentId(entry.id)
    saveCurrent()
  })
}

function remove(id) {
  charSheetStorage.remove(id)
  if (authCloudService.isAuthenticated) charSheetCloud.remove(id).catch(throwAsync)
  if (id === _currentEntryId) create()
}

function removeCurrent(options) {
  remove(_currentEntryId, options)
}

export default {
  init,
  create,
  getList,
  load,
  importJSON,
  getCurrentRawEntry: () => charSheetStorage.getRawEntry(_currentEntryId),
  remove, removeCurrent,
  onCurrentCharSheetChange: callback => eventBus.on(CURRENT_CHARSHEET_CHANGED, callback),
  onCharListChanged: charSheetStorage.onCharListChanged,
  unregister() {
    autosaveEventTarget?.off()
    autosaveEventTarget = null
    userConnectedEventOff?.()
    userConnectedEventOff = null
    userDisconnectedEventOff?.()
    userDisconnectedEventOff = null
  },
}
