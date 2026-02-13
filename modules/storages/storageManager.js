import { ABILITY, SKILLS } from '../common.js'
import { s } from '../helpers.js'
import { initialData, properties } from '../stores/charSheet.authority.store.js'

export function fromSaveData(storedSource) {
  const [charClassName = '', charSubClassName = ''] = (storedSource?.class ?? '').split('.')

  return s({
    [properties.charName]: storedSource?.name ?? initialData[properties.charName] ?? '',
    [properties.charOriginName]: storedSource?.origin ?? initialData[properties.charOriginName] ?? '',
    [properties.charClassName]: charClassName ?? initialData[properties.charClassName],
    [properties.charSubClassName]: charSubClassName ?? initialData[properties.charSubClassName] ?? null,
    [properties.charSpeciesName]: storedSource?.species ?? initialData[properties.charSpeciesName] ?? '',
    [properties.charExperience]: storedSource?.experience ?? initialData[properties.charExperience] ?? 0,
    [properties.charAlignment]: storedSource?.alignment ?? initialData[properties.charAlignment] ?? '',
    [properties.charSizeCategory]: storedSource?.sizeCategory ?? initialData[properties.charSizeCategory] ?? '',
    [properties.charSize]: storedSource?.size ?? initialData[properties.charSize] ?? 0,
    [properties.attributes]: s({
      [ABILITY.strength]: storedSource?.attributes.strength ?? initialData[properties.attributes][ABILITY.strength] ?? 10,
      [ABILITY.dexterity]: storedSource?.attributes.dexterity ?? initialData[properties.attributes][ABILITY.dexterity] ?? 10,
      [ABILITY.constitution]: storedSource?.attributes.constitution ?? initialData[properties.attributes][ABILITY.constitution] ?? 10,
      [ABILITY.wisdom]: storedSource?.attributes.wisdom ?? initialData[properties.attributes][ABILITY.wisdom] ?? 10,
      [ABILITY.intelligence]: storedSource?.attributes.intelligence ?? initialData[properties.attributes][ABILITY.intelligence] ?? 10,
      [ABILITY.charisma]: storedSource?.attributes.charisma ?? initialData[properties.attributes][ABILITY.charisma] ?? 10,
    }),
    [properties.classSkills]: storedSource?.classSkills?.map(skill => SKILLS[skill]) ?? initialData[properties.classSkills] ?? [],
    [properties.classTools]: storedSource?.classTools?.slice() ?? initialData[properties.classTools] ?? [],
    [properties.equipments]: (storedSource?.equipments ?? initialData[properties.equipments] ?? []).map(equipment => ({ ...equipment })),
  })
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
    classTools: jsData[properties.classTools],
    equipments: jsData[properties.equipments]
  }
}

export function toJSON(jsData) {
  // TODO: See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse?the_reviver_parameter
  const reviver = (key, value) => {
    // switch (key) {
    //   case 'classSkills': return Object.keys(SKILLS).filter(key => value.includes(SKILLS[key]))
    //   default: return value
    // }
    return value
  }

  return JSON.stringify(toSaveData(jsData), reviver, 2)
}
