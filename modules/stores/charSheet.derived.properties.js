import { Enum } from '../enum.js'
import authorityProperties from './charSheet.authority.properties.js'

export default Enum(Object.assign({
  level: Symbol.for('DERIVED_PROPERTIES.level'),
  proficiencyBonus: Symbol.for('DERIVED_PROPERTIES.proficiencyBonus'),
  skills: Symbol.for('DERIVED_PROPERTIES.skills'),
  initiative: Symbol.for('DERIVED_PROPERTIES.initiative'),
  speed: Symbol.for('DERIVED_PROPERTIES.speed'),
  passivePerception: Symbol.for('DERIVED_PROPERTIES.passivePerception'),
  class: Symbol.for('DERIVED_PROPERTIES.class'),
  origin: Symbol.for('DERIVED_PROPERTIES.origin'),
  species: Symbol.for('DERIVED_PROPERTIES.species'),
  modifiers: Symbol.for('DERIVED_PROPERTIES.modifiers'),
  saves: Symbol.for('DERIVED_PROPERTIES.saves'),
  feats: Symbol.for('DERIVED_PROPERTIES.feats'),
  equiped: Symbol.for('DERIVED_PROPERTIES.equiped'),
  toolProficiencies: Symbol.for('DERIVED_PROPERTIES.toolProficiencies'),
}, authorityProperties))
