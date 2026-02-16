import { StorageError } from '../errors.js'
import createEventBus from '../createEventBus.js'
import createLocalStorage from './createLocalStorage.js'
import properties from '../stores/charSheet.authority.properties.js'
import { initialData } from '../stores/charSheet.authority.store.js'
import { s } from '../helpers.js'
import { ABILITIES } from '../common.js'

const PREFIX_KEY = 'charsheet'
const STORAGE_VERSION = 1
const SYMBOL_PREFIX = '_sym_#'

const CHARACTER_LIST_KEY = 'charSheetsListSaved'
const CHARACTER_SAVE_KEY = 'saves'

const storage = createLocalStorage(PREFIX_KEY)

const CHAR_LIST_CHANGED = 'charListChanged'
const eventBus = createEventBus()

let currentId = undefined

const serializeSymbols = (() => {
  function serializeSymbol(symbol) {
    if (!symbol.description) throw StorageError(`Symbol without description cannot be serialized: ${symbol.toString()}`)
    return `${SYMBOL_PREFIX}${symbol.description}`
  }

  return function serializeSymbols(value) {
    const valueType = Object.prototype.toString.call(value)
    if (valueType === '[object Symbol]') return serializeSymbol(value)
    if (valueType === '[object Object]') {
      return Reflect.ownKeys(value).reduce((acc, key) => {
        const serializedKey = typeof key === 'symbol' ? serializeSymbol(key) : key
        if (typeof serializedKey !== 'string') throw StorageError(`Only string/symbol object keys are supported: ${key} -> ${serializedKey}`)
        acc[serializedKey] = value[key]
        return acc
      }, {})
    }

    return value
  }
})()

const deserializeSymbols = (() => {
  function deserializeSymbol(value) {
    const symbolDescription = value.slice(SYMBOL_PREFIX.length)
    if (!symbolDescription) throw StorageError(`Serialized symbol description is required for: ${value}`)
    return Symbol.for(symbolDescription)
  }

  return function deserializeSymbols(value) {
    const valueType = Object.prototype.toString.call(value)
    if (valueType === '[object String]' && value.startsWith(SYMBOL_PREFIX)) return deserializeSymbol(value)
    if (valueType === '[object Object]') {
      return Object.entries(value).reduce((acc, [key, entryValue]) => {
        acc[key.startsWith(SYMBOL_PREFIX) ? deserializeSymbol(key) : key] = entryValue
        return acc
      }, {})
    }

    return value
  }
})()

function toJSONEntry(entry, space = undefined) {
  return JSON.stringify(entry, function replacer(key, value) {
    let result = value

    if (key === 'data') {
      const charClassName = value[properties.charClassName]
      const charSubClassName = value[properties.charSubClassName]

      result = {
        name: value[properties.charName],
        origin: value[properties.charOriginName],
        class: charClassName
          ? (charSubClassName ? `${charClassName}.${charSubClassName}` : charClassName)
          : undefined,
        species: value[properties.charSpeciesName],
        experience: value[properties.charExperience],
        alignment: value[properties.charAlignment],
        sizeCategory: value[properties.charSizeCategory],
        size: value[properties.charSize],
        attributes: {
          strength: value[properties.attributes][ABILITIES.strength],
          dexterity: value[properties.attributes][ABILITIES.dexterity],
          constitution: value[properties.attributes][ABILITIES.constitution],
          wisdom: value[properties.attributes][ABILITIES.wisdom],
          intelligence: value[properties.attributes][ABILITIES.intelligence],
          charisma: value[properties.attributes][ABILITIES.charisma],
        },
        choiceSelections: value[properties.choiceSelections],
        equipments: value[properties.equipments]
      }
    }

    return serializeSymbols(result)
  }, space)
}

function fromJSONEntry(jsonEntry) {
  return JSON.parse(jsonEntry, function reviver(key, value) {
    const result = deserializeSymbols(value)

    if (key === 'data') {
      const [charClassName = '', charSubClassName = ''] = (result?.class ?? '').split('.')

      return {
        [properties.charName]: result?.name ?? initialData[properties.charName] ?? '',
        [properties.charOriginName]: result?.origin ?? initialData[properties.charOriginName] ?? '',
        [properties.charClassName]: charClassName ?? initialData[properties.charClassName],
        [properties.charSubClassName]: charSubClassName ?? initialData[properties.charSubClassName] ?? null,
        [properties.charSpeciesName]: result?.species ?? initialData[properties.charSpeciesName] ?? '',
        [properties.charExperience]: result?.experience ?? initialData[properties.charExperience] ?? 0,
        [properties.charAlignment]: result?.alignment ?? initialData[properties.charAlignment] ?? '',
        [properties.charSizeCategory]: result?.sizeCategory ?? initialData[properties.charSizeCategory] ?? '',
        [properties.charSize]: result?.size ?? initialData[properties.charSize] ?? 0,
        [properties.attributes]: s({
          [ABILITIES.strength]: result?.attributes.strength ?? initialData[properties.attributes][ABILITIES.strength] ?? 10,
          [ABILITIES.dexterity]: result?.attributes.dexterity ?? initialData[properties.attributes][ABILITIES.dexterity] ?? 10,
          [ABILITIES.constitution]: result?.attributes.constitution ?? initialData[properties.attributes][ABILITIES.constitution] ?? 10,
          [ABILITIES.wisdom]: result?.attributes.wisdom ?? initialData[properties.attributes][ABILITIES.wisdom] ?? 10,
          [ABILITIES.intelligence]: result?.attributes.intelligence ?? initialData[properties.attributes][ABILITIES.intelligence] ?? 10,
          [ABILITIES.charisma]: result?.attributes.charisma ?? initialData[properties.attributes][ABILITIES.charisma] ?? 10,
        }),
        [properties.choiceSelections]: result?.choiceSelections ?? {},
        [properties.equipments]: result?.equipments ?? initialData[properties.equipments] ?? [],
      }
    }

    return result
  })
}

function buildSaveKey(id) {
  if (!id) throw StorageError('A save id is required')
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
  eventBus.emit(CHAR_LIST_CHANGED)
}

function get(id) {
  const entry = fromJSONEntry(storage.getItem(buildSaveKey(id)))
  if (!entry) throw StorageError('CharSheet id not found')

  setCharSheetsList(getList().map(item =>
    item.id === id ? { ...item, updatedAt: Date.now() } : item
  ))

  const shouldNotify = currentId !== id
  currentId = id

  if (shouldNotify) eventBus.emit(CHAR_LIST_CHANGED)
  return entry.data
}

function save(jsData) {
  const listItem = getList().find(item => item.id === currentId)
  const entry = {
    id: listItem?.id ?? crypto.randomUUID(),
    name: jsData?.[properties.charName]?.toString()?.trim()
      || 'Unamed', // TODO: translate it or generateid,
    updatedAt: Date.now(),
    version: STORAGE_VERSION,
    data: jsData,
  }

  storage.setItem(buildSaveKey(entry.id), toJSONEntry(entry))

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
  storage.removeItem(buildSaveKey(id))
  setCharSheetsList(getList().filter(item => item.id !== id))

  currentId = undefined
  eventBus.emit(CHAR_LIST_CHANGED)
}

function getCurrentSaveRaw() {
  return storage.getItem(buildSaveKey(currentId))
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
  fromJSONEntry, toJSONEntry,
}
