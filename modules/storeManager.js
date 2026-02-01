import { ABILITY, SKILLS, } from './common.js'

// TODO: remove
export const mock = {
  name: 'Doudou McDoubidou',
  origin: 'artisan',
  class: 'monk',
  species: 'goliath.stone',
  level: 2,
  experience: 300,
  alignment: 'neutralGood',
  sizeCategory: 'medium',
  size: '242',
  attributes: {
    strength: 12,
    dexterity: 17,
    constitution: 14,
    wisdom: 12,
    intelligence: 8,
    charisma: 12,
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

export function toCharsheet(jsSource) {
  return {
    charName: jsSource.name,
    charOriginName: jsSource.origin,
    charClassName: jsSource.class?.split('.')[0],
    charSubClassName: jsSource.class?.split('.')[1],
    charSpeciesName: jsSource.species,
    charLevel: jsSource.level,
    charExperience: jsSource.experience,
    charAlignment: jsSource.alignment,
    charSizeCategory: jsSource.sizeCategory,
    charSize: jsSource.size,
    attributes: {
      [ABILITY.strength]: jsSource.attributes.strength,
      [ABILITY.dexterity]: jsSource.attributes.dexterity,
      [ABILITY.constitution]: jsSource.attributes.constitution,
      [ABILITY.wisdom]: jsSource.attributes.wisdom,
      [ABILITY.intelligence]: jsSource.attributes.intelligence,
      [ABILITY.charisma]: jsSource.attributes.charisma,
    },
    skillChoosed: jsSource.skillChoosed.map(skill => SKILLS[skill]),
    equipments: jsSource.equipments,
  }
}

export function fromJSON(jsonData) {
  // TODO: See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter
  const replacer = (key, value) => {
    if (key === 'type') {
      // if (value === ENUMM_TYPE.X.qsd) return ENUMM_TYPE.X
    }
    return value
  }
  return JSON.parse(jsonData, replacer)
}

export function toJSON(jsData) {
  // TODO: See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse?the_reviver_parameter
  const reviver = (key, value) => {
    switch (key) {
      case 'skillChoosed': return Object.keys(SKILLS).filter(key => value.includes(SKILLS[key]))
      default: return value
    }
  }

  return JSON.stringify({
    name: jsData.charName,
    origin: jsData.charOriginName,
    class: `${jsData.charClassName}.${jsData.charSubClassName}`,
    species: jsData.charSpeciesName,
    level: jsData.charLevel,
    experience: jsData.charExperience,
    alignment: jsData.charAlignment,
    sizeCategory: jsData.charSizeCategory,
    size: jsData.charSize,
    attributes: {
      strength: jsData.attributes[ABILITY.strength],
      dexterity: jsData.attributes[ABILITY.dexterity],
      constitution: jsData.attributes[ABILITY.constitution],
      wisdom: jsData.attributes[ABILITY.wisdom],
      intelligence: jsData.attributes[ABILITY.intelligence],
      charisma: jsData.attributes[ABILITY.charisma],
    },
    skillChoosed: jsData.skillChoosed,
    equipments: jsData.equipments
  }, reviver, 2)
}