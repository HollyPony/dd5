import { StorageError } from '../errors.js'
import createEventBus from '../createEventBus.js'
import createLocalStorage from './createLocalStorage.js'
import properties from '../stores/charSheet.authority.properties.js'
import derivedProperties from '../stores/charSheet.derived.properties.js'
import { initialData } from '../stores/charSheet.authority.store.js'
import { s } from '../helpers.js'
import { ABILITY } from '../common.js'

const PREFIX_KEY = 'charsheet'
const STORAGE_VERSION = 1

const CHARACTER_LIST_KEY = 'charSheetsListSaved'
const CHARACTER_SAVE_KEY = 'saves'

const storage = createLocalStorage(PREFIX_KEY)

const CHAR_LIST_CHANGED = 'charListChanged'
const eventBus = createEventBus()

let currentId = undefined

function fromJSONEntry(jsonEntry) {
  return JSON.parse(jsonEntry, function reviver(key, value) {
    if (key === 'data') {
      const [charClassName = '', charSubClassName = ''] = (value?.class ?? '').split('.')

      return {
        [properties.charName]: value?.name ?? initialData[properties.charName] ?? '',
        [properties.charOriginName]: value?.origin ?? initialData[properties.charOriginName] ?? '',
        [properties.charClassName]: charClassName ?? initialData[properties.charClassName],
        [properties.charSubClassName]: charSubClassName ?? initialData[properties.charSubClassName] ?? null,
        [properties.charSpeciesName]: value?.species ?? initialData[properties.charSpeciesName] ?? '',
        [properties.charExperience]: value?.experience ?? initialData[properties.charExperience] ?? 0,
        [properties.charAlignment]: value?.alignment ?? initialData[properties.charAlignment] ?? '',
        [properties.charSizeCategory]: value?.sizeCategory ?? initialData[properties.charSizeCategory] ?? '',
        [properties.charSize]: value?.size ?? initialData[properties.charSize] ?? 0,
        [properties.attributes]: s({
          [ABILITY.strength]: value?.attributes.strength ?? initialData[properties.attributes][ABILITY.strength] ?? 10,
          [ABILITY.dexterity]: value?.attributes.dexterity ?? initialData[properties.attributes][ABILITY.dexterity] ?? 10,
          [ABILITY.constitution]: value?.attributes.constitution ?? initialData[properties.attributes][ABILITY.constitution] ?? 10,
          [ABILITY.wisdom]: value?.attributes.wisdom ?? initialData[properties.attributes][ABILITY.wisdom] ?? 10,
          [ABILITY.intelligence]: value?.attributes.intelligence ?? initialData[properties.attributes][ABILITY.intelligence] ?? 10,
          [ABILITY.charisma]: value?.attributes.charisma ?? initialData[properties.attributes][ABILITY.charisma] ?? 10,
        }),
        [properties.choiceSelections]: value?.choiceSelections ?? {},
        [properties.equipments]: (value?.equipments ?? initialData[properties.equipments] ?? []).map(equipment => ({ ...equipment })),
      }
    }

    if (key === 'choice') {
      return {
        selector: {
          type: Symbol.for(value.selector.type),
          key: Symbol.for(value.selector.key),
        },
        target: Symbol.for(value.target),
      }
    }
    if (key === 'payload' && this?.choice?.target === derivedProperties.skills) {
      return value.map(skillKey => Symbol.for(skillKey))
    }

    return value
  })
}

function toJSONEntry(entry, space = undefined) {
  return JSON.stringify(entry, function replacer(key, value) {
    if (key === 'data') {
      const charClassName = value[properties.charClassName]
      const charSubClassName = value[properties.charSubClassName]

      return {
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
          strength: value[properties.attributes][ABILITY.strength],
          dexterity: value[properties.attributes][ABILITY.dexterity],
          constitution: value[properties.attributes][ABILITY.constitution],
          wisdom: value[properties.attributes][ABILITY.wisdom],
          intelligence: value[properties.attributes][ABILITY.intelligence],
          charisma: value[properties.attributes][ABILITY.charisma],
        },
        choiceSelections: value[properties.choiceSelections],
        equipments: value[properties.equipments]
      }
    }
    if (key === 'choice') {
      return {
        selector: {
          type: value.selector.type.description,
          key: value.selector.key.description,
        },
        target: value.target.description,
      }
    }
    if (key === 'payload' && this?.choice?.target === derivedProperties.skills) {
      return value.map(skill => skill.description)
    }
    return value
  }, space)
}

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
  eventBus.emit(CHAR_LIST_CHANGED)
}

function get(id) {
  if (!id) throw StorageError('A save id is required')
  const entry = fromJSONEntry(storage.getItem(saveKey(id)))
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

  storage.setItem(saveKey(entry.id), toJSONEntry(entry))

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
  eventBus.emit(CHAR_LIST_CHANGED)
}

export default {
  create: create,
  getList,
  getLastSaveId,
  get,
  save,
  remove,
  onCharListChanged(callback) {
    return eventBus.on(CHAR_LIST_CHANGED, callback)
  },
  fromJSONEntry, toJSONEntry,
}
