import { Enum } from '../enum.js'

export default Enum({
  name: Symbol.for('AUTHORITY_PROPERTIES.name'),
  experience: Symbol.for('AUTHORITY_PROPERTIES.experience'),
  className: Symbol.for('AUTHORITY_PROPERTIES.className'),
  subClassName: Symbol.for('AUTHORITY_PROPERTIES.subClassName'),
  originName: Symbol.for('AUTHORITY_PROPERTIES.originName'),
  speciesName: Symbol.for('AUTHORITY_PROPERTIES.speciesName'),
  alignment: Symbol.for('AUTHORITY_PROPERTIES.alignment'),
  sizeCategory: Symbol.for('AUTHORITY_PROPERTIES.sizeCategory'),
  size: Symbol.for('AUTHORITY_PROPERTIES.size'),
  hitPointCurrent: Symbol.for('AUTHORITY_PROPERTIES.hitPointCurrent'),
  hitPointTemp: Symbol.for('AUTHORITY_PROPERTIES.hitPointTemp'),
  deathSaves: Symbol.for('AUTHORITY_PROPERTIES.deathSaves'),
  abilities: Symbol.for('AUTHORITY_PROPERTIES.abilities'),
  choiceSelections: Symbol.for('AUTHORITY_PROPERTIES.choiceSelections'),
  equipments: Symbol.for('AUTHORITY_PROPERTIES.equipments'),
})
