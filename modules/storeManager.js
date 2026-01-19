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
    strength: 12,
    dexterity: 17,
    constitution: 14,
    wisdom: 12,
    intelligence: 8,
    charisma: 12,
  },
  skillChoosed: ['athletics', 'acrobatics'],
  equipments: {
    weapons: [],
    armors: [],
    shields: [],
    tools: [],
    miscs: [],
    magicItems: [
      {
        name: 'cloakOfProtection',
        hasAttunement: true,
      }
    ],
  }
}

export function fromJSON(jsonData) {
  return JSON.parse(jsonData)
}

export function toJSON(jsData) {
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
      strength: jsData.attributes.strength,
      dexterity: jsData.attributes.dexterity,
      constitution: jsData.attributes.constitution,
      wisdom: jsData.attributes.wisdom,
      intelligence: jsData.attributes.intelligence,
      charisma: jsData.attributes.charisma,
    },
    skillChoosed: jsData.skillChoosed,
    equipments: {
      weapons: jsData.equipments.weapons,
      armors: jsData.equipments.armors,
      shield: jsData.equipments.shield,
      tools: jsData.equipments.tools,
      miscs: jsData.equipments.miscs,
    }
  })
}