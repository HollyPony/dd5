import charSheetStorage from '../storages/charSheet.storage.js'
import charSheetStore from '../stores/charSheet.authority.store.js'
import { debounce } from '../helpers.js'

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
  const charSheet = charSheetStorage.get(id)
  charSheetStore.init(charSheet)
}

function save() {
  return charSheetStorage.save(charSheetStore.get())
}

function importJSON(json) {
  const entry = charSheetStorage.fromJSONEntry(json)
  const resume = autosaveEventTarget?.mute()
  try {
    charSheetStore.init(entry.data)
    save()
  } finally {
    resume?.()
  }
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
  subscribeCharSheetsList: charSheetStorage.onCharListChanged,
  unregister() {
    autosaveEventTarget?.off()
    autosaveEventTarget = null
  },
}
