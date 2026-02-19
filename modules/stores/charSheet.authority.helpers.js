import { SIZE_CATEGORY } from '../common.js'
import { InvalidCharacterFieldError } from '../errors.js'
import properties from './charSheet.authority.properties.js'
import initialData from './charSheet.authority.initial.js'

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
