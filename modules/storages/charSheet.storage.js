import { StorageError } from '../errors.js'
import createEventBus from '../createEventBus.js'
import createLocalStorage from './createLocalStorage.js'
import properties from '../stores/charSheet.authority.properties.js'
import { t } from '../i18n.js'
import { fromJSONEntry, toJSONEntry } from './charSheet.storage.helpers.js'

const PREFIX_KEY = 'charsheet'
const STORAGE_VERSION = 1

const CHARACTER_LIST_KEY = 'charSheetsListSaved'
const CHARACTER_SAVE_KEY = 'saves'

const storage = createLocalStorage(PREFIX_KEY)

const CHAR_LIST_CHANGED = 'charListChanged'
const eventBus = createEventBus()

let _currentId = undefined
function setCurrentId(id, { notify = '' } = {}) {
  const changed = id !== _currentId
  _currentId = id
  if (notify !== 'mute' && (changed || notify === 'force')) eventBus.emit(CHAR_LIST_CHANGED)
}
function getCurrentId() {
  return _currentId
}

function buildSaveKey(id) {
  if (!id) throw StorageError('A save id is required')
  return [CHARACTER_SAVE_KEY, id].join('.')
}

function getList(includeCurrent = true) {
  return storage.getJSONItem(CHARACTER_LIST_KEY)?.filter(item => includeCurrent || item.id !== getCurrentId()) ?? []
}

function setSheetsList(sheetsList) {
  storage.setJSONItem(CHARACTER_LIST_KEY, sheetsList)
}

function getLastSaveId() {
  return getList()
    .sort((a, b) => (b?.updatedAt ?? 0) - (a?.updatedAt ?? 0))[0]?.id
}

function create(id, notify) {
  setCurrentId(id?.trim?.() || crypto.randomUUID(), notify)
}

function get(id) {
  const entry = fromJSONEntry(storage.getItem(buildSaveKey(id)))
  if (!entry) throw StorageError('CharSheet id not found')

  setSheetsList(getList().map(item =>
    item.id === id ? { ...item, updatedAt: Date.now() } : item
  ))

  setCurrentId(id)
  return entry.data
}

function save(sheet, notify) {
  const entry = {
    id: getCurrentId() ?? crypto.randomUUID(),
    updatedAt: Date.now(),
    version: STORAGE_VERSION,
    data: sheet,
  }

  storage.setItem(buildSaveKey(entry.id), toJSONEntry(entry))

  const sheetsList = getList().filter(item => item.id !== entry.id)
  sheetsList.push({
    id: entry.id,
    name: sheet?.[properties.name]?.toString()?.trim() || t._('navbar.unnamedCharacter'),
    updatedAt: entry.updatedAt,
  })

  setSheetsList(sheetsList)

  setCurrentId(entry.id, notify)
  return entry
}

function remove(id) {
  storage.removeItem(buildSaveKey(id))
  setSheetsList(getList().filter(item => item.id !== id))

  setCurrentId(undefined)
}

function getCurrentSaveRaw() {
  return storage.getItem(buildSaveKey(getCurrentId()))
}

export default {
  create: create,
  getList,
  getLastSaveId,
  get,
  save,
  remove,
  getCurrentSaveRaw,
  onCharListChanged(callback) {
    return eventBus.on(CHAR_LIST_CHANGED, callback)
  },
}
