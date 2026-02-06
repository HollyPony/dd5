import { fromJSON, fromSaveData, toJSON, toSaveData } from '../storages/storageManager.js'
import charSheetStorage from '../storages/charSheet.storage.js'
import charSheetStore from '../stores/charSheet.store.js'

function init() {
  const id = charSheetStorage.getLastSaveId()
  id ? load(id) : create()
}

function create() {
  charSheetStorage.create()
  charSheetStore.reset(true)
}

function getList(includeCurrent) {
  return charSheetStorage.getList(includeCurrent)
    .sort((a, b) => (b?.updatedAt ?? 0) - (a?.updatedAt ?? 0))
}

function load(id) {
  const charSheet = fromSaveData(charSheetStorage.get(id))
  charSheetStore.init(charSheet, true)
}

function save() {
  return charSheetStorage.save(toSaveData(charSheetStore.get()))
}

function importJSON(json) {
  const data = fromJSON(json)
  // charSheetStorage.create()
  charSheetStore.init(data, true)
  save()
}

function exportJSON() {
  return toJSON(charSheetStore.get())
}

export default {
  init,
  create,
  getList,
  load,
  save,
  importJSON,
  exportJSON,
  remove: charSheetStorage.remove,
  subscribeCharSheetsList: charSheetStorage.subscribeCharSheetsList,
}
