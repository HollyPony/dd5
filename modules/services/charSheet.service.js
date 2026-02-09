import { fromJSON, fromSaveData, toJSON, toSaveData } from '../storages/storageManager.js'
import charSheetStorage from '../storages/charSheet.storage.js'
import charSheetStore from '../stores/charSheet.store.js'
import charSheetObserver from '../stores/charSheet.observer.js'
import { ALL, } from '../stores/createStore.js'
import { debounce } from '../helpers.js'

const AUTOSAVE_DELAY = 600

const autosaveCallback = debounce(save, AUTOSAVE_DELAY)

function init() {
  const id = charSheetStorage.getLastSaveId()
  id ? load(id) : create()

  charSheetObserver.subscribe(ALL, autosaveCallback)
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
  return charSheetStorage.save(toSaveData(charSheetStore.get()))
}

function importJSON(json) {
  const data = fromJSON(json)
  charSheetObserver.suspendWhile(ALL, autosaveCallback)(() => {
    charSheetStore.init(data)
    save()
  })
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
  toSaveData,
  importJSON,
  exportJSON,
  remove: charSheetStorage.remove,
  subscribeCharSheetsList: charSheetStorage.subscribeCharSheetsList,
  unregister() {
    charSheetObserver.unsubscribe()
  }
}
