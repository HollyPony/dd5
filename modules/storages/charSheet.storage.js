import { StorageError } from '../errors.js'
import { createObservable } from '../helpers.js'
import { buildStorage } from './localStorage.helper.js'

const PREFIX_KEY = 'charsheet'
const STORAGE_VERSION = 1

const CHARACTER_LIST_KEY = 'charSheetsListSaved'
const CHARACTER_SAVE_KEY = 'saves'

const storage = buildStorage(PREFIX_KEY)

const CHAR_LIST_CHANGED = 'charListChanged'
const observable = createObservable()

let currentId = undefined

function saveKey(id) {
  return [CHARACTER_SAVE_KEY, id].join('.')
}

function getList(includeCurrent = true) {
  return storage.getJSONItem(CHARACTER_LIST_KEY)?.filter(item => includeCurrent || item.id !== currentId) ?? []
}

function setCharSheetsList(charList) {
  storage.setJSONItem(CHARACTER_LIST_KEY, charList)
}

function getLastSaveId() {
  return getList()
    .sort((a, b) => (b?.updatedAt ?? 0) - (a?.updatedAt ?? 0))[0]?.id
}

function create() {
  currentId = crypto.randomUUID()
  observable.notify(CHAR_LIST_CHANGED)
}

function get(id) {
  if (!id) throw StorageError('A save id is required')
  const entry = storage.getJSONItem(saveKey(id))
  if (!entry) throw StorageError('CharSheet id not found')

  setCharSheetsList(getList().map(item =>
    item.id === id ? { ...item, updatedAt: Date.now() } : item
  ))

  const shouldNotify = currentId !== id
  currentId = id

  if (shouldNotify) observable.notify(CHAR_LIST_CHANGED)
  return entry.data
}

function save(jsData) {
  const listItem = getList().find(item => item.id === currentId)
  const entry = {
    id: listItem?.id ?? crypto.randomUUID(),
    name: jsData?.name?.toString()?.trim()
      || 'Unamed', // TODO: translate it or generateid,
    updatedAt: Date.now(),
    version: STORAGE_VERSION,
    data: jsData,
  }

  storage.setJSONItem(saveKey(entry.id), entry)

  const charList = getList().filter(item => item.id !== entry.id)
  charList.push({
    id: entry.id,
    name: entry.name,
    updatedAt: entry.updatedAt,
  })

  setCharSheetsList(charList)

  currentId = entry.id
  return entry
}

function remove(id) {
  if (!id) throw StorageError('A save id is required')

  storage.removeItem(saveKey(id))
  setCharSheetsList(getList().filter(item => item.id !== id))

  currentId = undefined
  observable.notify(CHAR_LIST_CHANGED)
}

export default {
  create: create,
  getList,
  getLastSaveId,
  get,
  save,
  remove,
  subscribeCharSheetsList(callback) {
    observable.subscribe(CHAR_LIST_CHANGED, callback)
  },
}

