import { MissingPathError } from '../errors.js'
import { Enum } from '../helpers.js'

export const SELECTOR_TYPE = Enum({
  CLASS: Symbol.for('SELECTOR_TYPE.class'),
  ORIGIN: Symbol.for('SELECTOR_TYPE.origin'),
  SPECIES: Symbol.for('SELECTOR_TYPE.species'),
  FEAT: Symbol.for('SELECTOR_TYPE.feat'),
  MANUAL: Symbol.for('SELECTOR_TYPE.manual'),
})

export function getSelectorKey(selector) {
  if (!selector.type?.description) throw MissingPathError('Choice type is required')
  if (!selector.key?.description) throw MissingPathError('Choice key is required')

  return `${selector.type.description}#${[selector.key.description].flat().join('.')}`
}
