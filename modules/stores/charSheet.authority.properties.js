import { Enum } from '../helpers.js'

export default Enum({
  charName: Symbol.for('charName'),
  charExperience: Symbol.for('charExperience'),
  charClassName: Symbol.for('charClassName'),
  charSubClassName: Symbol.for('charSubClassName'),
  charOriginName: Symbol.for('charOriginName'),
  charSpeciesName: Symbol.for('charSpeciesName'),
  charAlignment: Symbol.for('charAlignment'),
  charSizeCategory: Symbol.for('charSizeCategory'),
  charSize: Symbol.for('charSize'),
  attributes: Symbol.for('attributes'),
  choiceSelections: Symbol.for('choiceSelections'),
  equipments: Symbol.for('equipments'),
})
