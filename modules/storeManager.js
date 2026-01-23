import { ABILITY, EQUIPED_CATEGORY, EQUIPMENT_TYPE, SKILLS, } from './data/common.js'

export const mock = {
  charName: 'Doudou McDoubidou',
  charOrigin: 'artisan',
  charClassName: 'monk',
  charSubClassName: undefined,
  charSpeciesName: 'goliath.stone',
  charLevel: 2,
  charExperience: 300,
  charAlignment: 'neutralGood',
  charSizeCategory: 'medium',
  charSize: '242',
  attributes: {
    [ABILITY.strength]: 12,
    [ABILITY.dexterity]: 17,
    [ABILITY.constitution]: 14,
    [ABILITY.wisdom]: 12,
    [ABILITY.intelligence]: 8,
    [ABILITY.charisma]: 12,
  },
  skillChoosed: ['athletics', 'acrobatics'],
  equipments: [
    {
      name: 'shield',
      equiped: false,
    },
    {
      name: 'cloakOfProtection',
      hasAttunement: true,
      equiped: false,
    }
  ],
}

export function fromJSON(jsonData) {
  // TODO: See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter
  const replacer = (key, value) => {
    if (key === 'type') {
      if (value === ENUMM_TYPE.X.qsd) return ENUMM_TYPE.X
    }
    return value
  }
  return JSON.parse(jsonData, replacer)
}

export function toJSON(jsData) {
  // TODO: See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse?the_reviver_parameter
  const reviver = (key, value) => {
    if (key === 'attributes') {
      console.log(key, value)
    }
    // console.log(key, value)

    // if (Object.values(SKILLS).find(_ => _ === key)) {
    //   console.log(key, value)
    // }

    switch (key) {
      case 'skillChoosed': return Object.keys(SKILLS).filter(key => value.includes(SKILLS[key]))
      default: return value
    }
  }

  return JSON.stringify({
    charName: jsData.charName,
    charOriginName: jsData.charOrigin,
    charClassName: jsData.charClassName,
    charSubClassName: jsData.charSubClassName,
    charSpecies: jsData.charSpeciesName,
    charLevel: jsData.charLevel,
    charExperience: jsData.charExperience,
    charAlignment: jsData.charAlignment,
    charSizeCategory: jsData.charSizeCategory,
    charSize: jsData.charSize,
    attributes: jsData.attributes,
    // attributes: {
    //   [ABILITY.strength]: jsData.attributes[ABILITY.strength],
    //   [ABILITY.dexterity]: jsData.attributes[ABILITY.dexterity],
    //   [ABILITY.constitution]: jsData.attributes[ABILITY.constitution],
    //   [ABILITY.wisdom]: jsData.attributes[ABILITY.wisdom],
    //   [ABILITY.intelligence]: jsData.attributes[ABILITY.intelligence],
    //   [ABILITY.charisma]: jsData.attributes[ABILITY.charisma],
    // },
    skillChoosed: jsData.skillChoosed,
    equipments: jsData.equipments
  }, reviver, 2)
}