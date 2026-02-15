import { Enum } from '../helpers.js'
import authorityProperties from './charSheet.authority.properties.js'

export default Enum(Object.assign({
  charLevel: Symbol.for('charLevel'),
  proficiencyBonus: Symbol.for('proficiencyBonus'),
  skills: Symbol.for('skills'),
  initiative: Symbol.for('initiative'),
  speed: Symbol.for('speed'),
  passivePerception: Symbol.for('passivePerception'),
  charClass: Symbol.for('charClass'),
  charOrigin: Symbol.for('charOrigin'),
  charSpecies: Symbol.for('charSpecies'),
  modifiers: Symbol.for('modifiers'),
  saves: Symbol.for('saves'),
  feats: Symbol.for('feats'),
  equiped: Symbol.for('equiped'),
  toolProficiencies: Symbol.for('toolProficiencies'),
}, authorityProperties))
