import charSheetStorage from '../storages/charSheet.storage.js'
import charSheetStore from '../stores/charSheet.authority.store.js'
import { debounce } from '../helpers.js'
import { fromJSONEntry } from '../storages/charSheet.storage.helpers.js'
import createEventBus from '../createEventBus.js'

const CURRENT_CHARSHEET_CHANGED = 'currentCharSheetChanged'
const eventBus = createEventBus()

const AUTOSAVE_DELAY = 600

let autosaveEventTarget = null

let _currentEntryId = undefined
function setCurrentId(id) {
  const changed = id !== _currentEntryId
  _currentEntryId = id
  if (changed) eventBus.emit(CURRENT_CHARSHEET_CHANGED)
}
async function init() {
  const id = charSheetStorage.getLastUpdatedEntryId()

  autosaveEventTarget = charSheetStore.onAny(debounce(saveCurrent, AUTOSAVE_DELAY))
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

function saveCurrent({
} = {}) {
  const entry = charSheetStorage.saveSheet(_currentEntryId, charSheetStore.get())
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

function remove(id, {
} = {}) {
  charSheetStorage.remove(id)
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
    userConnectedEventOff?.()
    userConnectedEventOff = null
    autosaveEventTarget?.off()
    autosaveEventTarget = null
  },
}
