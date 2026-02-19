import { ABILITIES } from '../common.js'
import properties from './charSheet.authority.properties.js'

export default {
  [properties.name]: '',
  [properties.experience]: 0,
  [properties.className]: '',
  [properties.subClassName]: null,
  [properties.originName]: '',
  [properties.speciesName]: '',
  [properties.alignment]: '',
  [properties.sizeCategory]: '',
  [properties.size]: 170,
  [properties.hitPointCurrent]: 0,
  [properties.hitPointTemp]: 0,
  [properties.deathSaves]: {
    success: 0,
    failure: 0,
  },
  [properties.abilities]: {
    [ABILITIES.strength]: 10,
    [ABILITIES.dexterity]: 10,
    [ABILITIES.constitution]: 10,
    [ABILITIES.wisdom]: 10,
    [ABILITIES.intelligence]: 10,
    [ABILITIES.charisma]: 10,
  },
  [properties.choiceSelections]: {},
  [properties.equipments]: [],
}
