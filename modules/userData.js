import { getAbilityFromSkill, } from './data/abilities.js'
import getClass from './data/classes.js'
import { FEATURE_EFFECTS, CLASS_EFFECTS, ABILITY, } from './data/common.js'
import * as equipments from './data/equipments.js'
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
  feats: [],
  equipments: {
    weapons: [],
    armors: [],
    shields: [],
    tools: [],
    miscs: [],
    magicItems: [],
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
export function getCharFeats() { return charsheet.feats } // TODO: get from class + species human?
export function getWeaponProficiency() { }

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
  charsheet.charSpecies = getSpecies(getCharSpeciesName(), getCharLevel())
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

/* TODO: update if
 *  - armor equipped
 *  - Shield equipped
 *  - levelUp ?
 *  - traits - features changed (according to levelUp or GM)
 *  - magic items equipped
 *  - magic item attuned
 */
export function getArmorClass() {
  const modifiers = getCharModifiers()
  const equippedArmors = Object.values(getEquipments()?.armors || {}).filter(armor => armor.isEquipped)
  const equippedShields = Object.values(getEquipments()?.shields || {}).filter(armor => armor.isEquipped)
  const hasArmor = equippedArmors?.length > 0
  const hasShield = equippedShields?.length > 0

  const overrideFeatures = getCharClass().features
    .filter(_ => _.effects && _.effects[FEATURE_EFFECTS.ACOverride] && _.condition({ hasArmor, hasShield }))

  if (equippedArmors.length > 1) {
    console.error('too much equipped armors')
    return 'err'
  }
  if (overrideFeatures.length > 1) { // TODO: user must choose one
    console.error('too much features overrides')
    return 'err'
  }

  // si pas armure ni bouclier - monk 10+dex+sag P.128
  // si pas armure - barbarian 10+dex+con - sorcerer/draconic 10+dex+cha P.99
  let armor = overrideFeatures.length > 0
    ? overrideFeatures[0].apply({ hasArmor, hasShield, modifiers })
    : hasArmor
      ? equippedArmors[0].armorClass({ modifiers })
      : 10 + modifiers.dexterity // Armors P.220 || Basic AC without armors P.42

  getCharFeats().filter(_ => _.type == FEATURE_EFFECTS.ACModifier && _.condition({ hasArmor, hasShield })).forEach(feat =>
    // si armure - char has feat (don P.210) Defense = +1
    armor = feat.apply(armor)
  )

  if (hasShield) armor = armor + 2

  getEquipments().magicItems
    ?.filter(_ => _.condition.call(_) && Object.keys(_.modifiers).includes('ACModifier') && _.modifiers['ACModifier']?.condition.call(_))
    .forEach(magicItem => armor = magicItem.modifiers['ACModifier'].apply.call(magicItem, { ac: armor }))

  // TODO: Apply equipments modifier
  // Cloak of Protection – +1 à la CA et aux jets de sauvegarde tant que vous portez la cape.
  // Ring of Protection – +1 à la CA et aux jets de sauvegarde tant que vous portez l’anneau.
  // Bracers of Defense – +2 à la CA si vous ne portez pas d’armure ni de bouclier.
  // Ioun Stone of Protection – +1 à la CA tant que la pierre orbite autour de vous
  return armor
}
export function getProficencyBonus() {
  let proficiencyBonus = Math.floor(getCharLevel() / 4) + 2

  // TODO: update on equipped / unequipped / attuned / on scores changes
  getEquipments().magicItems
    ?.filter(_ => _.condition.call(_) && Object.keys(_.modifiers).includes('PBModifier') && _.modifiers['PBModifier']?.condition.call(_))
    .forEach(magicItem => proficiencyBonus = magicItem.modifiers['PBModifier'].apply.call(magicItem, { pb: proficiencyBonus }))

  return proficiencyBonus
}

export function getCharSpeed() { // TODO: take armor strength + update on armor change
  let speed = getCharSpecies()?.speed || 0

  const hasArmor = Object.values(getEquipments()?.armors || {}).filter(armor => armor.isEquipped) > 0
  const hasShield = Object.values(getEquipments()?.shields || {}).filter(armor => armor.isEquipped) > 0

  speed = (getCharClass().effects[CLASS_EFFECTS.SpeedModifier]?.condition?.call(getCharClass(), { hasArmor, hasShield }) && getCharClass().effects[CLASS_EFFECTS.SpeedModifier]?.apply?.call(getCharClass(), { speciesSpeed: speed })) ?? speed
  // Heavy rule
  speed += Object.values(getEquipments()?.armors).includes(armor => armor.isEquipped && armor.strength > getAbilityScore(ABILITY.Strength))
    /* TODO: && !feats.cancelHeavyRule */ ? -3 : 0
  return speed
}

export function getAbilityModifier(ability) { return charsheet.modifiers[ability] }
export function getAbilitySave(ability) {
  return getCharClass()?.saves?.includes(ability)
    ? getAbilityModifier(ability) + getProficencyBonus()
    : getAbilityModifier(ability)
}
export function isAuthorizedSkill(skill) {
  return getCharClass()?.authorizedSkills?.includes(skill)
}
export function isCheckedSkill(skill) { // TODO: get from class features + get from feats
  return origins[getCharOrigin()]?.skills?.includes(skill) || getSkillChoosed().includes(skill)
}
export function isDisabledSkill(skill) {
  return (!isAuthorizedSkill(skill)) || origins[getCharOrigin()]?.skills?.includes(skill) || !getSkillChoosed().includes(skill) && (getSkillChoosed().length >= getCharClass()?.authorizedNumberSkills ?? 0)
}
export function getSkillScore(skill) {
  return getAbilityModifier(getAbilityFromSkill(skill)) + (isCheckedSkill(skill) ? getProficencyBonus() : 0)
}

// INITIALIZER

export function init(source) {
  charsheet.charName = source.charName
  charsheet.charOrigin = source.charOrigin
  charsheet.charClassName = source.charClassName
  charsheet.charSubClassName = source.charSubClassName
  charsheet.charSpeciesName = source.charSpeciesName
  charsheet.charLevel = source.charLevel
  charsheet.charExperience = source.charExperience
  charsheet.charAlignment = source.charAlignment
  charsheet.charSizeCategory = source.charSizeCategory
  charsheet.charSize = source.charSize
  charsheet.attributes.strength = source.attributes.strength
  charsheet.attributes.dexterity = source.attributes.dexterity
  charsheet.attributes.constitution = source.attributes.constitution
  charsheet.attributes.wisdom = source.attributes.wisdom
  charsheet.attributes.intelligence = source.attributes.intelligence
  charsheet.attributes.charisma = source.attributes.charisma

  charsheet.modifiers.strength = abilityScoreToModifier(charsheet.attributes.strength)
  charsheet.modifiers.dexterity = abilityScoreToModifier(charsheet.attributes.dexterity)
  charsheet.modifiers.constitution = abilityScoreToModifier(charsheet.attributes.constitution)
  charsheet.modifiers.wisdom = abilityScoreToModifier(charsheet.attributes.wisdom)
  charsheet.modifiers.intelligence = abilityScoreToModifier(charsheet.attributes.intelligence)
  charsheet.modifiers.charisma = abilityScoreToModifier(charsheet.attributes.charisma)

  charsheet.skillChoosed = source.skillChoosed

  charsheet.charClass = getClass(getCharClassName(), getCharSubClassName(), getCharLevel())
  charsheet.charSpecies = getSpecies(getCharSpeciesName())

  // TODO: init species traits

  // TODO: init class features

  // TODO: init feats

  Object.keys(charsheet.equipments).forEach(_ => {
    charsheet.equipments[_] = source?.equipments[_]?.map(equipment => ({ ...equipments[_][equipment.name], ...equipment }))
  })
}
