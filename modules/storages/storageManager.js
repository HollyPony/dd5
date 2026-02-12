import { ABILITY, SKILLS } from '../common.js'
import { properties } from '../stores/charSheet.authority.store.js'

// // TODO: remove once at least web storage imported
// export const mock = {
//   name: 'Doudou McDoubidou',
//   origin: 'artisan',
//   class: 'monk',
//   species: 'goliath.stone',
//   experience: 300,
//   alignment: 'neutralGood',
//   sizeCategory: 'medium',
//   size: '242',
//   attributes: {
//     strength: 12,
//     dexterity: 17,
//     constitution: 14,
//     wisdom: 12,
//     intelligence: 8,
//     charisma: 12,
//   },
//   classSkills: ['athletics', 'acrobatics'],
//   expertSkills : [],
//   equipments: [
//     {
//       name: 'SHIELDS_shield',
//       equiped: false,
//     },
//     {
//       name: 'cloakOfProtection',
//       hasAttunement: true,
//       equiped: false,
//     }
//   ],
// }

export function fromSaveData(storedSource) {
  const [charClassName = '', charSubClassName = ''] = (storedSource?.class ?? '').split('.')

  return {
    [properties.charName]: storedSource?.name ?? '',
    [properties.charOriginName]: storedSource?.origin ?? '',
    [properties.charClassName]: charClassName,
    [properties.charSubClassName]: charSubClassName || null,
    [properties.charSpeciesName]: storedSource?.species ?? '',
    [properties.charExperience]: storedSource?.experience ?? 0,
    [properties.charAlignment]: storedSource?.alignment ?? '',
    [properties.charSizeCategory]: storedSource?.sizeCategory ?? '',
    [properties.charSize]: storedSource?.size ?? 0,
    [properties.attributes]: {
      [ABILITY.strength]: storedSource?.attributes.strength ?? 10,
      [ABILITY.dexterity]: storedSource?.attributes.dexterity ?? 10,
      [ABILITY.constitution]: storedSource?.attributes.constitution ?? 10,
      [ABILITY.wisdom]: storedSource?.attributes.wisdom ?? 10,
      [ABILITY.intelligence]: storedSource?.attributes.intelligence ?? 10,
      [ABILITY.charisma]: storedSource?.attributes.charisma ?? 10,
    },
    [properties.classSkills]: storedSource?.classSkills?.map(skill => SKILLS[skill]) ?? [],
    [properties.expertSkills]: storedSource?.expertSkills?.map(skill => SKILLS[skill]) ?? [],
    [properties.classTools]: storedSource?.classTools ?? [],
    [properties.equipments]: storedSource?.equipments ?? [],
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
  return fromSaveData(JSON.parse(jsonData, replacer))
}

export function toSaveData(jsData) {
  const charClassName = jsData[properties.charClassName]
  const charSubClassName = jsData[properties.charSubClassName]

  return {
    name: jsData[properties.charName],
    origin: jsData[properties.charOriginName],
    class: charClassName
      ? (charSubClassName ? `${charClassName}.${charSubClassName}` : charClassName)
      : undefined,
    species: jsData[properties.charSpeciesName],
    experience: jsData[properties.charExperience],
    alignment: jsData[properties.charAlignment],
    sizeCategory: jsData[properties.charSizeCategory],
    size: jsData[properties.charSize],
    attributes: {
      strength: jsData[properties.attributes][ABILITY.strength],
      dexterity: jsData[properties.attributes][ABILITY.dexterity],
      constitution: jsData[properties.attributes][ABILITY.constitution],
      wisdom: jsData[properties.attributes][ABILITY.wisdom],
      intelligence: jsData[properties.attributes][ABILITY.intelligence],
      charisma: jsData[properties.attributes][ABILITY.charisma],
    },
    classSkills: Object.keys(SKILLS).filter(key => jsData[properties.classSkills].includes(SKILLS[key])),
    expertSkills: Object.keys(SKILLS).filter(key => jsData[properties.expertSkills].includes(SKILLS[key])),
    classTools: jsData[properties.classTools],
    equipments: jsData[properties.equipments]
  }
}

export function toJSON(jsData) {
  // TODO: See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse?the_reviver_parameter
  const reviver = (key, value) => {
    // switch (key) {
    //   case 'classSkills': return Object.keys(SKILLS).filter(key => value.includes(SKILLS[key]))
    //   case 'expertSkills': return Object.keys(SKILLS).filter(key => value.includes(SKILLS[key]))
    //   default: return value
    // }
    return value
  }

  return JSON.stringify(toSaveData(jsData), reviver, 2)
}
