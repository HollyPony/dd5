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

function createId() {
  return crypto.randomUUID()
}

function buildStorageKey(id) {
  if (!id) throw StorageError('A save id is required')
  return [CHARACTER_SAVE_KEY, id].join('.')
}

function getSheetList() {
  return storage.getJSONItem(CHARACTER_LIST_KEY) ?? []
}

function setSheetList(sheetsList) {
  storage.setJSONItem(CHARACTER_LIST_KEY, sheetsList)
}

function getLastUpdatedEntryId() {
  return getSheetList()
    .sort((a, b) => (b?.updatedAt ?? 0) - (a?.updatedAt ?? 0))
  [0]?.id
}

// TODO: Challenge this usage
function getRawEntry(entryId) {
  return storage.getItem(buildStorageKey(entryId))
}

function getEntry(entryId) {
  return fromJSONEntry(getRawEntry(entryId))
}

function getSheet(entryId) {
  const entry = getEntry(entryId)
  if (!entry) throw StorageError('CharSheet id not found')

  setSheetList(getSheetList().map(item =>
    item.id === entryId ? { ...item, updatedAt: Date.now() } : item
  ))

  return entry.data
}

function saveSheet(entryId, data) {
  const entry = {
    id: entryId ?? crypto.randomUUID(),
    updatedAt: Date.now(),
    version: STORAGE_VERSION,
    data,
  }

  storage.setItem(buildStorageKey(entry.id), toJSONEntry(entry))

  const sheetsList = getSheetList().filter(item => item.id !== entry.id)
  sheetsList.push({
    id: entry.id,
    name: data?.[properties.name]?.toString()?.trim() || t._('navbar.unnamedCharacter'),
    updatedAt: entry.updatedAt,
  })

  setSheetList(sheetsList)
  eventBus.emit(CHAR_LIST_CHANGED)

  return entry
}

function copy(entryId) {
  const { data } = getEntry(entryId)
  return saveSheet(undefined, data)
}

function remove(entryId) {
  storage.removeItem(buildStorageKey(entryId))
  setSheetList(getSheetList().filter(item => item.id !== entryId))
  eventBus.emit(CHAR_LIST_CHANGED)
}

export default {
  createId,
  getSheetList,
  getLastUpdatedEntryId,
  getRawEntry, getEntry,
  getSheet, saveSheet,
  copy, remove,
  onCharListChanged(callback) {
    return eventBus.on(CHAR_LIST_CHANGED, callback)
  },
}
