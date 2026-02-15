import { Enum } from '../helpers.js'
import authorityProperties from './charSheet.authority.properties.js'

export default Enum(Object.assign({
  charLevel: Symbol.for('DERIVED_PROPERTIES.charLevel'),
  proficiencyBonus: Symbol.for('DERIVED_PROPERTIES.proficiencyBonus'),
  skills: Symbol.for('DERIVED_PROPERTIES.skills'),
  initiative: Symbol.for('DERIVED_PROPERTIES.initiative'),
  speed: Symbol.for('DERIVED_PROPERTIES.speed'),
  passivePerception: Symbol.for('DERIVED_PROPERTIES.passivePerception'),
  charClass: Symbol.for('DERIVED_PROPERTIES.charClass'),
  charOrigin: Symbol.for('DERIVED_PROPERTIES.charOrigin'),
  charSpecies: Symbol.for('DERIVED_PROPERTIES.charSpecies'),
  modifiers: Symbol.for('DERIVED_PROPERTIES.modifiers'),
  saves: Symbol.for('DERIVED_PROPERTIES.saves'),
  feats: Symbol.for('DERIVED_PROPERTIES.feats'),
  equiped: Symbol.for('DERIVED_PROPERTIES.equiped'),
  toolProficiencies: Symbol.for('DERIVED_PROPERTIES.toolProficiencies'),
}, authorityProperties))
