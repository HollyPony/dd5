import { fromJSON, fromSaveData, toJSON, toSaveData } from '../storages/storageManager.js'
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
  const charSheet = fromSaveData(charSheetStorage.get(id))
  charSheetStore.init(charSheet)
}

function save() {
  return charSheetStorage.save(getSavedData())
}

function importJSON(json) {
  const data = fromJSON(json)
  const resume = autosaveEventTarget?.mute()
  try {
    charSheetStore.init(data)
    save()
  } finally {
    resume?.()
  }
}

function exportJSON() {
  return toJSON(charSheetStore.get())
}

function getSavedData() {
  return toSaveData(charSheetStore.get())
}

export default {
  init,
  create,
  getList,
  load,
  save,
  getSavedData,
  importJSON,
  exportJSON,
  remove: charSheetStorage.remove,
  subscribeCharSheetsList: charSheetStorage.onCharListChanged,
  unregister() {
    autosaveEventTarget?.off()
    autosaveEventTarget = null
  },
}
