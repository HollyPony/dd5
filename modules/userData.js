import getClass from './data/classes.js'
import { EFFECT, ABILITY, EQUIPED_CATEGORY, DICES, SKILLS, EQUIPMENT_TYPE, } from './data/common.js'
import { getEquipment, } from './data/equipments.js'
import { origins, } from './data/origins.js'
import getSpecies from './data/species.js'
import { s } from './helpers.js'
import * as storeManager from './storeManager.js'

const charsheet = s({
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
  attributes: s({
    [ABILITY.strength]: 10,
    [ABILITY.dexterity]: 10,
    [ABILITY.constitution]: 10,
    [ABILITY.wisdom]: 10,
    [ABILITY.intelligence]: 10,
    [ABILITY.charisma]: 10,
  }),
  modifiers: s({
    [ABILITY.strength]: 0,
    [ABILITY.dexterity]: 0,
    [ABILITY.constitution]: 0,
    [ABILITY.wisdom]: 0,
    [ABILITY.intelligence]: 0,
    [ABILITY.charisma]: 0,
  }),
  skillChoosed: [],
  feats: [],
  equipments: [],
  equiped: s({
    [EQUIPED_CATEGORY.WEAPON]: [],
    [EQUIPED_CATEGORY.ARMOR]: null,
    [EQUIPED_CATEGORY.SHIELD]: null,
    [EQUIPED_CATEGORY.OTHER]: [],
  }),
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
export function getEquiped(category = null) { return category ? charsheet.equiped[category] : charsheet.equiped }
export function getEquipments() { return charsheet.equipments }

// COMPUTE VALUE
function abilityScoreToModifier(score) {
  return Math.floor(score / 2) - 5
}

// HELPERS

function diceToString(dice) {
  switch (dice) {
    case DICES.D4: return 'd4'
    case DICES.D6: return 'd6'
    case DICES.D8: return 'd8'
    case DICES.D10: return 'd10'
    case DICES.D12: return 'd12'
    case DICES.D20: return 'd20'
    case DICES.D100: return 'd100'
    default: return 'err'
  }
}

function applyEffect(item, effect, options, callback) {
  if (item?.effects?.[effect]
    && (item.effects[effect]?.condition?.call(item, options ?? true))) {
    callback(item.effects[effect].apply.call(item, options))
  }
}

function applyEffects(list, effect, options, callback) {
  list.forEach(item => applyEffect(item, effect, options, callback))
  // ?.filter(item => item?.effects?.[effect])
  // .filter(item => item.effects[effect]?.condition?.call(item, options) ?? true)
  // .forEach(item => callback(item.effects[effect].apply.call(item, options)))
}

// COMPUTED VALUES


export function getCharClass() { return charsheet.charClass }
export function getCharSpecies() { return charsheet.charSpecies }
export function getCharModifiers() { return charsheet.modifiers }
export function getCharFeats() { return charsheet.feats } // TODO: get from class + species human?
export function getWeaponProficiency() { } // TODO: maitrise d'armes
export function getArmorProficiencies() {
  // TODO: armor category check ?
  // TODO: amor has malus effect if equiped without proficiency
  return getCharFeats()?.filter(feat => feat?.[EFFECT.HasArmorProficiencyEffect]?.reduce((acc, effect) => {
    if (effect?.condition?.() ?? true) { acc.concat(effect?.values) }
    return acc
  }, (getCharClass()?.getArmorProficiencies() ?? [])))
}
export function getShieldProficiency() {
  return (getCharClass()?.getShieldProficiency() ?? false)
    || (getCharFeats()?.includes(feat => feat?.[EFFECT.HasShieldProficiencyEffect]))
}

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
  const equipedArmor = getEquiped(EQUIPED_CATEGORY.ARMOR)
  const equipedShield = getEquiped(EQUIPED_CATEGORY.SHIELD)

  const overrideFeaturesEffects = getCharClass()?.features
    ?.filter(feature => feature.effects?.[EFFECT.ACOverrideEffect])
    ?.filter(feature => feature.effects[EFFECT.ACOverrideEffect]?.condition?.call(feature, { equipedArmor, equipedShield }) ?? true)
    .flatMap(feature => feature.effects[EFFECT.ACOverrideEffect]) ?? []

  if (overrideFeaturesEffects.length > 1) { // TODO: user must choose one
    console.error('too much features overrides')
    return 'err'
  }

  // si pas armure ni bouclier - monk 10+dex+sag P.128
  // si pas armure - barbarian 10+dex+con - sorcerer/draconic 10+dex+cha P.99
  let armor = overrideFeaturesEffects.length > 0
    ? overrideFeaturesEffects[0]?.apply?.call(overrideFeaturesEffects[0], { equipedArmor, equipedShield, modifiers })
    : equipedArmor
      ? equipedArmor.effects?.[EFFECT.ACModifierEffect]?.apply?.call(equipedArmor, { modifiers }) // TODO: Test armor without override feature
      : 10 + modifiers[ABILITY.dexterity] // Armors P.220 || Basic AC without armors P.42

  // Apply feats modifier
  // TODO: Never tested
  // si armure - char has feat (don P.210) Defense = +1
  applyEffects(getCharFeats(), EFFECT.ACModifierEffect, { equipedArmor, equipedShield, ac: armor }, result => {
    armor += result
  })

  // Apply Shield modifier
  // TODO: Test it
  applyEffect(equipedShield, EFFECT.ACModifierEffect, { ac: armor, hasArmorProficiency: getShieldProficiency() }, result => {
    armor += result
  })

  // Apply other equiped effect
  applyEffects(getEquiped(EQUIPED_CATEGORY.OTHER), EFFECT.ACModifierEffect, { equipedArmor, equipedShield }, result => {
    armor += result
  })

  return armor
}

export function getHitPointMax() {
  return (getCharClass()?.hitPointMax.base + getAbilityModifier(ABILITY.constitution)) // P.41
    + ((getCharClass()?.hitPointMax.addPerLevel + getAbilityModifier(ABILITY.constitution)) * (getCharLevel() - 1)) // P.43
}

export function getHitDiceMax() {
  return `${getCharLevel()}${diceToString(getCharClass()?.hitDice)}`
}

export function getProficencyBonus() {
  let proficiencyBonus = Math.floor(getCharLevel() / 4) + 2

  // TODO: update on equipped / unequipped / attuned / on scores changes
  // TODO: test application
  applyEffects(getEquiped(EQUIPED_CATEGORY.OTHER), EFFECT.PBModifierEffect, {}, result => {
    proficiencyBonus += result
  })

  return proficiencyBonus
}

export function getCharSpeed() { // TODO: take armor strength + update on armor change
  let speed = getCharSpecies()?.speed || 0

  const equipedArmor = getEquiped(EQUIPED_CATEGORY.ARMOR)
  const equipedShield = getEquiped(EQUIPED_CATEGORY.SHIELD)

  applyEffect(getCharClass(), EFFECT.SpeedModifierEffect, { equipedArmor, equipedShield }, result => {
    speed += result
  })

  // Heavy rule
  if (equipedArmor?.strength
    && !feats.find(feat => feat?.effect?.[EFFECT.ByPassArmorStrengthRequirement])
    && equipedArmor.strength > getAbilityScore(ABILITY.strength))
    speed += -3

  return speed
}

export function getAbilityModifier(ability) { return charsheet.modifiers[ability] }
export function getAbilitySave(ability) {
  return getCharClass()?.saves?.includes(ability)
    ? getAbilityModifier(ability) + getProficencyBonus()
    : getAbilityModifier(ability)
}
function isAuthorizedSkill(skill) {
  return getCharClass()?.authorizedSkills?.includes(skill)
}
export function isCheckedSkill(skill) { // TODO: get from class features + get from feats
  return origins[getCharOrigin()]?.skills?.includes(skill) || getSkillChoosed().includes(skill)
}
export function isDisabledSkill(skill) {
  return (!isAuthorizedSkill(skill))
    || origins[getCharOrigin()]?.skills?.includes(skill)
    || !getSkillChoosed().includes(skill) && (getSkillChoosed().length >= getCharClass()?.authorizedNumberSkills ?? 0)
}
export function getSkillScore(skill) {
  return getAbilityModifier(skill.ability) + (isCheckedSkill(skill) ? getProficencyBonus() : 0)
}

// SETTERS - user interactions to character

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

// INITIALIZER

export function init(source) {
  // Values set from source
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
  charsheet.attributes[ABILITY.strength] = source.attributes[ABILITY.strength]
  charsheet.attributes[ABILITY.dexterity] = source.attributes[ABILITY.dexterity]
  charsheet.attributes[ABILITY.constitution] = source.attributes[ABILITY.constitution]
  charsheet.attributes[ABILITY.wisdom] = source.attributes[ABILITY.wisdom]
  charsheet.attributes[ABILITY.intelligence] = source.attributes[ABILITY.intelligence]
  charsheet.attributes[ABILITY.charisma] = source.attributes[ABILITY.charisma]
  charsheet.skillChoosed = source.skillChoosed.map(skill => SKILLS[skill])

  charsheet.equipments = source.equipments

  // Values set from charsheet
  Object.keys(charsheet.modifiers).forEach(ability => {
    charsheet.modifiers[ability] = abilityScoreToModifier(charsheet.attributes[ability])
  })

  charsheet.charClass = getClass(getCharClassName(), getCharSubClassName(), getCharLevel())
  charsheet.charSpecies = getSpecies(getCharSpeciesName())

  charsheet.equipments?.filter?.(equipment => equipment.equiped).forEach(equipment => {
    const _equipment = { ...getEquipment(equipment.name), ...equipment }

    switch (_equipment.type) {
      case EQUIPMENT_TYPE.WEAPON: charsheet.equiped[EQUIPED_CATEGORY.WEAPON].push(_equipment); break;
      case EQUIPMENT_TYPE.ARMOR: charsheet.equiped[EQUIPED_CATEGORY.ARMOR] = _equipment; break;
      case EQUIPMENT_TYPE.SHIELD: charsheet.equiped[EQUIPED_CATEGORY.SHIELD] = _equipment; break;
      case EQUIPMENT_TYPE.MAGIC_ITEM: (equipment => {
        switch (equipment.equipOn) {
          case EQUIPED_CATEGORY.WEAPON: charsheet.equiped[EQUIPED_CATEGORY.WEAPON].push(equipment); break;
          case EQUIPED_CATEGORY.ARMOR: charsheet.equiped[EQUIPED_CATEGORY.WEAPON] = equipment; break;
          case EQUIPED_CATEGORY.SHIELD: charsheet.equiped[EQUIPED_CATEGORY.SHIELD] = equipment; break;
          case EQUIPED_CATEGORY.OTHER: charsheet.equiped[EQUIPED_CATEGORY.OTHER].push(equipment); break;
        }
      })(_equipment); break;
    }
  })

  // TODO: init species traits

  // TODO: init class features

  // TODO: init feats
}

// STORAGE

export function toJSON() { return storeManager.toJSON(charsheet) }
