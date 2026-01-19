import { getAbilityFromSkill, } from './data/abilities.js'
import getClass from './data/classes.js'
import { origins, } from './data/origins.js'
import getSpecies from './data/species.js'

const charsheet = Object.seal({
  charName: '',
  charClass: null,
  charClassName: '',
  charSubClassName: null,
  charLevel: 1,
  charOrigin: '',
  charSpecies: null,
  charSpeciesName: '',
  charAlignment: '',
  charExperience: 0,
  charSizeCategory: '',
  charSize: '',
  attributes: Object.seal({
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    charisma: 10,
  }),
  modifiers: Object.seal({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    wisdom: 0,
    intelligence: 0,
    charisma: 0,
  }),
  skillChoosed: [],
  equipments: {
    weapons: {},
    armors: {},
    shield: false,
    tools: {},
    miscs: []
  }, // TODO: seal
})

// ACCESSORS

export function getCharName() { return charsheet.charName }
export function getCharOrigin() { return charsheet.charOrigin }
export function getCharClassName() { return charsheet.charClassName }
export function getCharSubClassName() { return charsheet.charSubClassName }
export function getCharSpeciesName() { return charsheet.charSpeciesName }
export function getCharLevel() { return charsheet.charLevel }
export function getCharExperience() { return charsheet.charExperience }
export function getCharAlignment() { return charsheet.charAlignment }
export function getSizeCategory() { return charsheet.charSizeCategory }
export function getSize() { return charsheet.charSize }
export function getAbilityScore(attributeName) { return charsheet.attributes[attributeName] }
export function getSkillChoosed() { return charsheet.skillChoosed }
export function getEquipments() { return charsheet.equipments }
// -- COMPUTED
export function getCharClass() { return charsheet.charClass }
export function getCharSpecies() { return charsheet.charSpecies }
export function getCharModifiers() { return charsheet.modifiers }
export function getCharFeatures() { return } // TODO: get from class + species human?

// SETTERS

export function setCharName(charName) { charsheet.charName = charName }
export function setCharClassName(charClassName) {
  charsheet.charClassName = charClassName
  charsheet.charSubClassName = undefined
  charsheet.charClass = getClass(getCharClassName(), getCharSubClassName(), getCharLevel())
}
export function setCharSubClassName(charSubClassName) {
  charsheet.charSubClassName = charSubClassName
  charsheet.charClass = getClass(getCharClassName(), getCharSubClassName(), getCharLevel())
}
export function setCharLevel(charLevel) {
  charsheet.charLevel = charLevel
  charsheet.charClass = getClass(getCharClassName(), getCharSubClassName(), getCharLevel())
  charsheet.charSpecies = getSpecies(getCharSpeciesName())
}
export function setCharOrigin(charOrigin) { charsheet.charOrigin = charOrigin }
export function setCharSpeciesName(charSpecies) { charsheet.charSpeciesName = charSpecies }
export function setCharAlignment(charAlignment) { charsheet.charAlignment = charAlignment }
export function setCharExperience(charExperience) { charsheet.charExperience = charExperience }
export function setAttribute(attributeName, score) {
  charsheet.attributes[attributeName] = parseInt(score)
  charsheet.modifiers[attributeName] = abilityScoreToModifier(charsheet.attributes[attributeName])
}
export function skillChoosedAdd(skill) { getSkillChoosed().push(skill) }
export function skillChoosedRemove(skill) { getSkillChoosed().splice(getSkillChoosed().indexOf(skill), 1) }
export function skillChoosedClear() { getSkillChoosed().lentgh = 0 }

// COMPUTE VALUE
function abilityScoreToModifier(score) {
  return Math.floor(score / 2) - 5
}

// COMPUTED VALUES

export function getArmorClass() {
  const equippedArmors = getEquipments?.armors ? Object.values(getEquipments?.armors).filter(armor => armor.isEquipped) : false
  const hasArmor = equippedArmors?.length > 0
  const hasShield = getEquipments?.shield

  const overrideFeatures = getCharClass().features
    .filter(_ => _.type === 'ACOverride' && _.condition({ hasArmor, hasShield }))

  // si pas armure ni bouclier - monk 10+dex+sag P.128
  // si pas armure - barbarian 10+dex+con - sorcerer/draconic 10+dex+cha P.99
  if (overrideFeatures.length > 0) {
    if (overrideFeatures.length > 1) {
      console.error('too much features overrides')
      return -1
    }
    return overrideFeatures[0].apply(getCharModifiers())
  }

  if (equippedArmors.length > 1) {
    console.error('too much equipped armors')
    return -1
  }

  const dexMod = getAbilityModifier('dexterity')
  let armor = hasArmor ? equippedArmors[0].armorClass(dexMod) : 10 + dexMod // Armors P.220 || Basic AC without armors P.42
  getCharFeatures().filter(_ => _.type == 'ACModifier' && _.condition({ hasArmor })).forEach(feature =>
    // si armure - char has feat (don P.210) Defense = +1
    armor = feature.apply(armor)
  )

  if (hasShield) armor = armor + 2

  // TODO: Apply equipments modifier
  // Cloak of Protection – +1 à la CA et aux jets de sauvegarde tant que vous portez la cape.
  // Ring of Protection – +1 à la CA et aux jets de sauvegarde tant que vous portez l’anneau.
  // Bracers of Defense – +2 à la CA si vous ne portez pas d’armure ni de bouclier.
  // Ioun Stone of Protection – +1 à la CA tant que la pierre orbite autour de vous
  return armor
}
export function getProficencyBonus() { return Math.floor(getCharLevel() / 4) + 2 }
export function getAbilityModifier(ability) { return charsheet.modifiers[ability] }
export function getAbilitySave(ability) {
  return getCharClass()?.saves?.includes(ability)
    ? getAbilityModifier(ability) + getProficencyBonus()
    : getAbilityModifier(ability)
}
export function isAuthorizedSkill(skill) {
  return getCharClass()?.authorizedSkills?.includes(skill)
}
export function isCheckedSkill(skill) {
  return origins[getCharOrigin()]?.skills?.includes(skill) || getSkillChoosed().includes(skill)
}
export function isDisabledSkill(skill) {
  return (!isAuthorizedSkill(skill)) || origins[getCharOrigin()]?.skills?.includes(skill) || !getSkillChoosed().includes(skill) && (getSkillChoosed().length >= getCharClass()?.authorizedNumberSkills ?? 0)
}
export function getSkillScore(skill) {
  return getAbilityModifier(getAbilityFromSkill(skill)) + (isCheckedSkill(skill) ? getProficencyBonus() : 0)
}

// INITIALIZER

export function init(_charsheet) {
  charsheet.charName = _charsheet.charName
  charsheet.charOrigin = _charsheet.charOrigin
  charsheet.charClassName = _charsheet.charClassName
  charsheet.charSubClassName = _charsheet.charSubClassName
  charsheet.charSpeciesName = _charsheet.charSpeciesName
  charsheet.charLevel = _charsheet.charLevel
  charsheet.charExperience = _charsheet.charExperience
  charsheet.charAlignment = _charsheet.charAlignment
  charsheet.charSizeCategory = _charsheet.charSizeCategory
  charsheet.charSize = _charsheet.charSize
  charsheet.attributes.strength = _charsheet.attributes.strength
  charsheet.attributes.dexterity = _charsheet.attributes.dexterity
  charsheet.attributes.constitution = _charsheet.attributes.constitution
  charsheet.attributes.wisdom = _charsheet.attributes.wisdom
  charsheet.attributes.intelligence = _charsheet.attributes.intelligence
  charsheet.attributes.charisma = _charsheet.attributes.charisma

  charsheet.modifiers.strength = abilityScoreToModifier(charsheet.attributes.strength)
  charsheet.modifiers.dexterity = abilityScoreToModifier(charsheet.attributes.dexterity)
  charsheet.modifiers.constitution = abilityScoreToModifier(charsheet.attributes.constitution)
  charsheet.modifiers.wisdom = abilityScoreToModifier(charsheet.attributes.wisdom)
  charsheet.modifiers.intelligence = abilityScoreToModifier(charsheet.attributes.intelligence)
  charsheet.modifiers.charisma = abilityScoreToModifier(charsheet.attributes.charisma)

  charsheet.skillChoosed = _charsheet.skillChoosed

  charsheet.charClass = getClass(getCharClassName(), getCharSubClassName(), getCharLevel())
  charsheet.charSpecies = getSpecies(getCharSpeciesName())
}

// EXPORT

export function toJSON() {
  return JSON.stringify({
    charName: charsheet.charName,
    charOriginName: charsheet.charOrigin,
    charClassName: charsheet.charClassName,
    charSubClassName: charsheet.charSubClassName,
    charSpecies: charsheet.charSpeciesName,
    charLevel: charsheet.charLevel,
    charExperience: charsheet.charExperience,
    charAlignment: charsheet.charAlignment,
    charSizeCategory: charsheet.charSizeCategory,
    charSize: charsheet.charSize,
    attributes: {
      strength: charsheet.attributes.strength,
      dexterity: charsheet.attributes.dexterity,
      constitution: charsheet.attributes.constitution,
      wisdom: charsheet.attributes.wisdom,
      intelligence: charsheet.attributes.intelligence,
      charisma: charsheet.attributes.charisma,
    },
    skillChoosed: charsheet.skillChoosed,
    equipments: {
      weapons: charsheet.equipments.weapons,
      armors: charsheet.equipments.armors,
      shield: charsheet.equipments.shield,
      tools: charsheet.equipments.tools,
      miscs: charsheet.equipments.miscs,
    }
  })
}
