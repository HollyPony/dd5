import charSheetStorage from '../storages/charSheet.storage.js'
import charSheetSupabase from '../storages/charSheet.supabase.js'
import charSheetStore from '../stores/charSheet.authority.store.js'
import authService from '../auth/auth.service.js'
import { debounce } from '../helpers.js'
import { fromJSONEntry } from '../storages/charSheet.storage.helpers.js'
import charSheetSyncService, { SYNC_STATUS } from './charSheetSync.service.js'
import createEventBus from '../createEventBus.js'
import modalService from './modal.service.js'
import { SyncConflictModalContent } from '../../webComponents/SyncConflictModalContent/SyncConflictModalContent.js'
import { t } from '../i18n.js'

const CURRENT_CHARSHEET_CHANGED = 'currentCharSheetChanged'
const eventBus = createEventBus()

const AUTOSAVE_DELAY = 600
const AUTOSYNC_DELAY = 1800

let autosaveEventTarget = null
let userConnectedEventOff = null
let userDisconnectingEventOff = null
let userDisconnectedEventOff = null

let _currentEntryId = undefined
function setCurrentId(id) {
  const changed = id !== _currentEntryId
  _currentEntryId = id
  if (changed) eventBus.emit(CURRENT_CHARSHEET_CHANGED)
}

function resolveSyncResults(resolveStates) {
  const conflictStates = resolveStates.filter(resolveState => resolveState.status === SYNC_STATUS.conflict)
  if (conflictStates.length === 0)
    return

  modalService.open({
    title: t._('modals.syncConflicts.title'),
    contentComponent: SyncConflictModalContent,
    contentProps: {
      syncConflicts: conflictStates,
      resolveConflict: ({ entryId, choice }) =>
        charSheetSyncService.resolveConflicts([{ entryId, choice }]),
    },
    dialogClasses: ['modal-lg'],
  })

  throw new Error(t._('errors.sync.conflict'))
}

async function getAllSyncEntryIds() {
  const localEntryIds = charSheetStorage.getSheetList().map(item => item.id)
  const remoteEntryIds = await charSheetSupabase.listIds()
  return [...new Set([...localEntryIds, ...remoteEntryIds])]
}

const synchronizeCurrentEntry = debounce(() => {
  charSheetSyncService?.synchronizeEntry(_currentEntryId)
    .then(syncState => resolveSyncResults([syncState]))
}, AUTOSYNC_DELAY)

/**
 * Flush pending local save/sync immediately while auth is still active.
 * This function rejects when:
 * - the user is unauthenticated
 * - the synchronization reports a conflict state (handled by UI flow)
 * - the underlying sync operation fails
 *
 * @returns {Promise<void>}
 * @throws {Error} When flush cannot complete successfully.
 */
function flushSyncNow() {
  if (!authService.isAuthenticated) throw new Error('Cannot flush sync while unauthenticated.')

  synchronizeCurrentEntry.cancel()
  saveCurrent()

  return charSheetSyncService.synchronizeEntry(_currentEntryId)
    .then(syncState => resolveSyncResults([syncState]))
}

function init() {
  const id = charSheetStorage.getLastUpdatedEntryId()

  autosaveEventTarget?.off()
  userConnectedEventOff?.()
  userDisconnectingEventOff?.()
  userDisconnectedEventOff?.()

  autosaveEventTarget = charSheetStore.onAny(debounce(saveCurrent, AUTOSAVE_DELAY))
  userConnectedEventOff = authService.onUserConnected(() => {
    getAllSyncEntryIds()
      .then(charSheetSyncService.synchronizeEntries)
      .then(resolveSyncResults)
  })
  userDisconnectingEventOff = authService.onUserDisconnecting(() => flushSyncNow())
  userDisconnectedEventOff = authService.onUserDisconnected(() => synchronizeCurrentEntry.cancel())

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
  if (authService.isAuthenticated) synchronizeCurrentEntry()
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
  if (authService.isAuthenticated) charSheetSupabase.remove(id)
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
    userDisconnectingEventOff?.()
    userDisconnectingEventOff = null
    userDisconnectedEventOff?.()
    userDisconnectedEventOff = null
  },
}
