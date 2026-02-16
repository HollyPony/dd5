import { MissingPathError } from '../errors.js'
import { Enum } from '../enum.js'

export const SELECTOR_TYPE = Enum({
  CLASS: Symbol.for('SELECTOR_TYPE.CLASS'),
  ORIGIN: Symbol.for('SELECTOR_TYPE.ORIGIN'),
  SPECIES: Symbol.for('SELECTOR_TYPE.SPECIES'),
  FEAT: Symbol.for('SELECTOR_TYPE.FEAT'),
  MANUAL: Symbol.for('SELECTOR_TYPE.MANUAL'),
})

export function getSelectorKey(selector) {
  if (!selector.type?.description) throw MissingPathError('Choice type is required')
  if (!selector.key?.description) throw MissingPathError('Choice key is required')

  return `${selector.type.description}#${[selector.key.description].flat().join('.')}`
}
