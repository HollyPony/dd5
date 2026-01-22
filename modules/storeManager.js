import { ABILITY, EQUIPED_CATEGORY, EQUIPMENT_TYPE, } from './data/common.js'

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
  equiped: {
    [EQUIPED_CATEGORY.WEAPON]: null,
    [EQUIPED_CATEGORY.ARMOR]: null,
    [EQUIPED_CATEGORY.SHIELD]: null, //{ name: 'shield' },
    [EQUIPED_CATEGORY.MAGIC_ITEM]: [
      // { name: 'cloakOfProtection', hasAttunement: true, }
    ],

  },
  equipments: [
    {
      name: 'cloakOfProtection',
      hasAttunement: true,
      category: EQUIPMENT_TYPE.MAGIC_ITEM,
    }
  ],
}

export function fromJSON(jsonData) {
  // TODO: See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter
  const replacer = (key, value, context) => {
    if (key === 'type') {
      if (value === ENUMM_TYPE.X.qsd) return ENUMM_TYPE.X
    }
    return value
  }
  return JSON.parse(jsonData, replacer)
}

export function toJSON(jsData) {
  // TODO: See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse?the_reviver_parameter
  const reviver = (key, value, context) => {
    if (key === 'type') {
      if (value === ENUMM_TYPE.X.qsd) return ENUMM_TYPE.X
    }
    return value
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
    attributes: {
      [ABILITY.strength]: jsData.attributes.strength,
      [ABILITY.dexterity]: jsData.attributes.dexterity,
      [ABILITY.constitution]: jsData.attributes.constitution,
      [ABILITY.wisdom]: jsData.attributes.wisdom,
      [ABILITY.intelligence]: jsData.attributes.intelligence,
      [ABILITY.charisma]: jsData.attributes.charisma,
    },
    skillChoosed: jsData.skillChoosed,
    equiped: {
      weapons: jsData.equiped.weapons,
      armor: jsData.equiped.armor,
      shield: jsData.equiped.shield,
      tools: jsData.equiped.tools,
      gears: jsData.equiped.gears,
      magicItems: jsData.equiped.magicItems,
    },
    equipments: jsData.equipments
  }, reviver)
}