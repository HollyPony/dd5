import { ABILITY, SKILLS, } from './common.js'
import { StorageError } from './errors.js'

// // TODO: remove once at least web storage imported
// export const mock = {
//   name: 'Doudou McDoubidou',
//   origin: 'artisan',
//   class: 'monk',
//   species: 'goliath.stone',
//   experience: 300,
//   alignment: 'neutralGood',
//   sizeCategory: 'medium',
//   size: '242',
//   attributes: {
//     strength: 12,
//     dexterity: 17,
//     constitution: 14,
//     wisdom: 12,
//     intelligence: 8,
//     charisma: 12,
//   },
//   classSkills: ['athletics', 'acrobatics'],
//   expertSkills : [],
//   equipments: [
//     {
//       name: 'SHIELDS_shield',
//       equiped: false,
//     },
//     {
//       name: 'cloakOfProtection',
//       hasAttunement: true,
//       equiped: false,
//     }
//   ],
// }

export function toCharsheet(jsSource) {
  return {
    charName: jsSource?.name ?? '',
    charOriginName: jsSource?.origin ?? '',
    charClassName: jsSource?.class?.split('.')[0] ?? '',
    charSubClassName: jsSource?.class?.split('.')[1] ?? '',
    charSpeciesName: jsSource?.species ?? '',
    charExperience: jsSource?.experience ?? 0,
    charAlignment: jsSource?.alignment ?? '',
    charSizeCategory: jsSource?.sizeCategory ?? '',
    charSize: jsSource?.size ?? 0,
    attributes: {
      [ABILITY.strength]: jsSource?.attributes.strength ?? 10,
      [ABILITY.dexterity]: jsSource?.attributes.dexterity ?? 10,
      [ABILITY.constitution]: jsSource?.attributes.constitution ?? 10,
      [ABILITY.wisdom]: jsSource?.attributes.wisdom ?? 10,
      [ABILITY.intelligence]: jsSource?.attributes.intelligence ?? 10,
      [ABILITY.charisma]: jsSource?.attributes.charisma ?? 10,
    },
    classSkills: jsSource?.classSkills.map(skill => SKILLS[skill]) ?? [],
    expertSkills: jsSource?.expertSkills?.map(skill => SKILLS[skill]) ?? [],
    classTools: jsSource?.classTools ?? [],
    equipments: jsSource?.equipments ?? [],
  }
}

export function fromJSON(jsonData) {
  // TODO: See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter
  const replacer = (key, value) => {
    if (key === 'type') {
      // if (value === ENUMM_TYPE.X.qsd) return ENUMM_TYPE.X
    }
    return value
  }
  return JSON.parse(jsonData, replacer)
}

export function toJSON(jsData) {
  // TODO: See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse?the_reviver_parameter
  const reviver = (key, value) => {
    switch (key) {
      case 'classSkills': return Object.keys(SKILLS).filter(key => value.includes(SKILLS[key]))
      case 'expertSkills': return Object.keys(SKILLS).filter(key => value.includes(SKILLS[key]))
      default: return value
    }
  }

  return JSON.stringify({
    name: jsData.charName,
    origin: jsData.charOriginName,
    class: jsData.charClassName
      ? (jsData.charSubClassName ? `${jsData.charClassName}.${jsData.charSubClassName}` : jsData.charClassName)
      : undefined,
    species: jsData.charSpeciesName,
    experience: jsData.charExperience,
    alignment: jsData.charAlignment,
    sizeCategory: jsData.charSizeCategory,
    size: jsData.charSize,
    attributes: {
      strength: jsData.attributes[ABILITY.strength],
      dexterity: jsData.attributes[ABILITY.dexterity],
      constitution: jsData.attributes[ABILITY.constitution],
      wisdom: jsData.attributes[ABILITY.wisdom],
      intelligence: jsData.attributes[ABILITY.intelligence],
      charisma: jsData.attributes[ABILITY.charisma],
    },
    classSkills: jsData.classSkills,
    expertSkills: jsData.expertSkills,
    classTools: jsData.classTools,
    equipments: jsData.equipments
  }, reviver, 2)
}

const STORAGE_PREFIX = 'dd5'
const STORAGE_VERSION = 1
const SAVES_INDEX_KEY = `${STORAGE_PREFIX}.savesIndex`
const LAST_SAVE_KEY = `${STORAGE_PREFIX}.lastSaveId`
const SAVE_KEY_PREFIX = `${STORAGE_PREFIX}.save.`
const AUTOSAVE_ID = 'autosave'
const AUTOSAVE_NAME = 'Dernière modification'

function getLocalStorage() {
  try {
    if (!('localStorage' in window)) throw new Error('localStorage is not available')
    return window.localStorage
  } catch (error) {
    throw StorageError('Local storage is not available', error)
  }
}

function keyForSave(id) {
  return `${SAVE_KEY_PREFIX}${id}`
}

function safeParseJSON(raw, errorMessage) {
  try {
    return JSON.parse(raw)
  } catch (error) {
    throw StorageError(errorMessage ?? 'Invalid JSON data', error)
  }
}

function readIndex(storage) {
  const raw = storage.getItem(SAVES_INDEX_KEY)
  if (!raw) return []
  const index = safeParseJSON(raw, 'Invalid saves index')
  if (!Array.isArray(index)) throw StorageError('Invalid saves index format')
  return index
}

function writeIndex(storage, index) {
  storage.setItem(SAVES_INDEX_KEY, JSON.stringify(index))
}

function upsertIndexEntry(index, entry) {
  const next = index.filter(item => item.id !== entry.id)
  next.push(entry)
  return next
}

function normalizeName(name, fallback = 'Sans nom') {
  return (name ?? '').toString().trim() || fallback
}

export function listSaves({ includeAutosave = false } = {}) {
  const storage = getLocalStorage()
  const index = readIndex(storage)
  const filtered = includeAutosave ? index : index.filter(item => !item?.isAutosave)
  return filtered.sort((a, b) => (b?.updatedAt ?? 0) - (a?.updatedAt ?? 0))
}

export function saveCharsheet(jsData, { id, name, isAutosave = false } = {}) {
  const storage = getLocalStorage()
  const saveId = id ?? crypto.randomUUID()
  const updatedAt = Date.now()
  const resolvedName = normalizeName(name, normalizeName(jsData?.charName, 'Sans nom'))
  const jsonData = typeof jsData === 'string' ? jsData : toJSON(jsData)

  const entry = {
    id: saveId,
    name: resolvedName,
    updatedAt,
    version: STORAGE_VERSION,
    isAutosave,
    data: jsonData,
  }

  storage.setItem(keyForSave(saveId), JSON.stringify(entry))

  const nextIndex = upsertIndexEntry(readIndex(storage), {
    id: saveId,
    name: resolvedName,
    updatedAt,
    isAutosave,
  })
  writeIndex(storage, nextIndex)
  storage.setItem(LAST_SAVE_KEY, saveId)

  return entry
}

export function saveAutosave(jsData) {
  return saveCharsheet(jsData, { id: AUTOSAVE_ID, name: AUTOSAVE_NAME, isAutosave: true })
}

export function loadCharsheet(id) {
  if (!id) throw StorageError('A save id is required')
  const raw = getLocalStorage().getItem(keyForSave(id))
  if (!raw) return null

  const entry = safeParseJSON(raw, `Invalid save entry '${id}'`)
  const jsonData = entry?.data
  if (!jsonData) throw StorageError(`Missing data for save '${id}'`)

  return typeof jsonData === 'string' ? fromJSON(jsonData) : jsonData
}

export function loadLastCharsheet() {
  const storage = getLocalStorage()
  const lastId = storage.getItem(LAST_SAVE_KEY)
  if (lastId) {
    const data = loadCharsheet(lastId)
    if (data) return data
  }

  const list = listSaves({ includeAutosave: true })
  if (!list.length) return null

  const data = loadCharsheet(list[0].id)
  if (data) storage.setItem(LAST_SAVE_KEY, list[0].id)
  return data
}

export function deleteSave(id) {
  if (!id) throw StorageError('A save id is required')
  const storage = getLocalStorage()
  storage.removeItem(keyForSave(id))

  const nextIndex = readIndex(storage).filter(item => item.id !== id)
  writeIndex(storage, nextIndex)

  const lastId = storage.getItem(LAST_SAVE_KEY)
  if (lastId === id) {
    const next = listSaves({ includeAutosave: true })[0]
    if (next) storage.setItem(LAST_SAVE_KEY, next.id)
    else storage.removeItem(LAST_SAVE_KEY)
  }
}
