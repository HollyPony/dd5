import charSheetStorage from '../storages/charSheet.storage.js'
import charSheetStore from '../stores/charSheet.authority.store.js'
import { debounce } from '../helpers.js'
import { fromJSONEntry } from '../storages/charSheet.storage.helpers.js'

const AUTOSAVE_DELAY = 600

let autosaveEventTarget = null

function init() {
  const id = charSheetStorage.getLastSaveId()
  id ? load(id) : create()

  autosaveEventTarget?.off()
  autosaveEventTarget = charSheetStore.onAny(debounce(save, AUTOSAVE_DELAY))
}

function create() {
  charSheetStorage.create()
  charSheetStore.reset()
}

function getList(includeCurrent) {
  return charSheetStorage.getList(includeCurrent)
    .sort((a, b) => (b?.updatedAt ?? 0) - (a?.updatedAt ?? 0))
}

function load(id) {
  charSheetStore.init(charSheetStorage.get(id))
}

function save(notify) {
  return charSheetStorage.save(charSheetStore.get(), notify)
}

function importJSON(json) {
  autosaveEventTarget?.muteWhile(() => {
    const entry = fromJSONEntry(json)
    charSheetStorage.create(entry.id, { notify: 'mute' })
    charSheetStore.init(entry.data)
    save({ notify: 'force' })
  })
}

function getJSONEntry(space) {
  return JSON.stringify(JSON.parse(charSheetStorage.getCurrentSaveRaw()), null, space)
}

export default {
  init,
  create,
  getList,
  load,
  save,
  importJSON,
  getJSONEntry,
  remove: charSheetStorage.remove,
  onCharListChanged: charSheetStorage.onCharListChanged,
  unregister() {
    autosaveEventTarget?.off()
    autosaveEventTarget = null
  },
}
