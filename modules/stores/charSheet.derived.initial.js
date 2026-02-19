import { ABILITIES } from '../common.js'
import { EQUIPED_CATEGORY } from '../data/equipments.js'
import { s } from '../helpers.js'
import authorityInitialData from './charSheet.authority.initial.js'
import properties from './charSheet.derived.properties.js'

export default {
  ...authorityInitialData,
  [properties.level]: 1,
  [properties.proficiencyBonus]: 0,
  [properties.skills]: {},
  [properties.initiative]: 0,
  [properties.speed]: 10,
  [properties.passivePerception]: 10,
  [properties.class]: null,
  [properties.origin]: null,
  [properties.species]: null,
  [properties.modifiers]: s({
    [ABILITIES.strength]: 0,
    [ABILITIES.dexterity]: 0,
    [ABILITIES.constitution]: 0,
    [ABILITIES.wisdom]: 0,
    [ABILITIES.intelligence]: 0,
    [ABILITIES.charisma]: 0,
  }),
  [properties.saves]: s({
    [ABILITIES.strength]: 0,
    [ABILITIES.dexterity]: 0,
    [ABILITIES.constitution]: 0,
    [ABILITIES.wisdom]: 0,
    [ABILITIES.intelligence]: 0,
    [ABILITIES.charisma]: 0,
  }),
  [properties.feats]: [],
  [properties.equiped]: s({
    [EQUIPED_CATEGORY.WEAPON]: [],
    [EQUIPED_CATEGORY.ARMOR]: null,
    [EQUIPED_CATEGORY.SHIELD]: null,
    [EQUIPED_CATEGORY.OTHER]: [],
  }),
}
