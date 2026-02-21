import { SIZE_CATEGORY } from '../common.js'
import { InvalidCharacterFieldError } from '../errors.js'
import properties from './charSheet.authority.properties.js'
import initialData from './charSheet.authority.initial.js'
import { EQUIPED_CATEGORY, EQUIPMENT_ATTRIBUTE, getEquipment } from '../data/equipments.js'

export function parseIntegerField(fieldName, value, { min = 0, max = Number.MAX_SAFE_INTEGER } = {}) {
  const parsedValue = Number.parseInt(value, 10)
  if (!Number.isInteger(parsedValue)) throw InvalidCharacterFieldError(fieldName, 'Expected an integer')
  if (parsedValue < min || parsedValue > max) throw InvalidCharacterFieldError(fieldName, `Expected value between ${min} and ${max}`)
  return parsedValue
}

export function parseSizeCategory(sizeCategory) {
  if (sizeCategory) SIZE_CATEGORY[sizeCategory]
  return sizeCategory || initialData[properties.sizeCategory]
}

export function parseExperience(experience) {
  return parseIntegerField('experience', experience, { min: 0 })
}

export function parseDeathSaves(deathSaves) {
  if (!deathSaves || typeof deathSaves !== 'object') throw InvalidCharacterFieldError('deathSaves', 'Expected an object')
  return {
    success: parseIntegerField('deathSaves.success', deathSaves.success, { min: 0, max: 3 }),
    failure: parseIntegerField('deathSaves.failure', deathSaves.failure, { min: 0, max: 3 }),
  }
}

export function computeEquipmentAttribute(id, equipments, attribute, value) {
  if (!id) throw InvalidCharacterFieldError('equipment.id', 'Missing id')

  const equipmentFound = equipments.find(item => item.id === id)
  if (!equipmentFound)
    throw InvalidCharacterFieldError('equipment.id', `Unknown id '${id}' on user equipments`)

  const equipment = getEquipment(equipmentFound.name)
  if (!equipment)
    throw InvalidCharacterFieldError('equipment.name', `Unknown equipment name '${String(equipmentFound.name)}' on equipments list`)

  switch (attribute) {
    case EQUIPMENT_ATTRIBUTE.HAS_ATTUNEMENT:
      if (!equipment.requireAttunement)
        throw InvalidCharacterFieldError('equipment.hasAttunement', `Equipment '${String(equipmentFound.name)}' cannot be attuned`)
      if (typeof value !== 'boolean')
        throw InvalidCharacterFieldError(`equipments.${attribute}`, `Expected a boolean`)
      break
    case EQUIPMENT_ATTRIBUTE.EQUIPED:
      if (!equipment.equipOn || !EQUIPED_CATEGORY.hasValue(equipment.equipOn))
        throw InvalidCharacterFieldError('equipment.equipOn', `Equipment '${String(equipmentFound.name)}' cannot be equiped`)
      if (typeof value !== 'boolean')
        throw InvalidCharacterFieldError(`equipments.${attribute}`, `Expected a boolean`)
      break
    default:
      throw InvalidCharacterFieldError(`equipments.${attribute}`, `Invalid attribute`)
  }

  if (value == null) return equipmentFound

  return { ...equipmentFound, [attribute]: value }
}
