import getClass from './data/classes.js'
import { EFFECT, ABILITY, SKILLS, DICE, } from './common.js'
import { EQUIPED_CATEGORY, EQUIPMENT_TYPE, getEquipment, } from './data/equipments.js'
import { getOrigin, } from './data/origins.js'
import getSpecies from './data/species.js'
import { s } from './helpers.js'
import * as storeManager from './storeManager.js'

const charsheet = s({
  charName: '',
  charClass: null,
  charClassName: '',
  charSubClassName: null,
  charLevel: 1,
  charOrigin: null,
  charOriginName: '',
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
export function getCharOriginName() { return charsheet.charOriginName }
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

function applyEffect(item, effect, options, callback) {
  if (item?.effects?.[effect]
    && (item.effects[effect]?.condition?.call(item, options ?? true))) {
    callback(item.effects[effect].apply.call(item, options))
  }
}

function applyEffects(list, effect, options, callback) {
  list.forEach(item => applyEffect(item, effect, options, callback))
}

// COMPUTED VALUES


export function getCharOrigin() { return charsheet.charOrigin }
export function getCharClass() { return charsheet.charClass }
export function getCharSpecies() { return charsheet.charSpecies }
export function getCharModifiers() { return charsheet.modifiers }
export function getCharFeats() { return charsheet.feats } // TODO: get from class + species human?
export function getWeaponProficiencies() { // TODO: maitrise d'armes
  return Object.entries(getCharClass().weaponProficiencies).map(([category, properties]) =>
    [].concat(category, properties).join('.')
  )
}

export function getArmorProficiencies() {
  // TODO: armor category check ?
  // TODO: armor has malus effect if equiped without proficiency - display it
  const classArmorProficiencies = getCharClass()?.armorProficiencies
  applyEffects(getCharFeats(), EFFECT.HasArmorProficiencyEffect, {}, result => classArmorProficiencies.concat(result))
  return classArmorProficiencies
}

export function getShieldProficiency() {
  return (getCharClass()?.shieldProficiency ?? false)
    || (getCharFeats()?.includes(feat => feat?.[EFFECT.HasShieldProficiencyEffect]))
}

export function getToolProficiencies() {
  return getCharClass()?.toolProficiencies
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
  const hasShieldProficiency = getShieldProficiency()

  // Set default AC P.42
  let ac = 10 + modifiers[ABILITY.dexterity]

  // Apply Armors P.220
  // TODO: Test armor without override feature
  applyEffect(equipedArmor, EFFECT.ACOverride, { modifiers }, result => ac = result)

  // Apply class features effects
  applyEffects(getCharClass()?.features, EFFECT.ACOverrideEffect, { ac, equipedArmor, equipedShield, modifiers }, result => ac = result)

  // Apply feats modifier
  // TODO: Never tested
  // si armure - char has feat (don P.210) Defense = +1
  applyEffects(getCharFeats(), EFFECT.ACModifierEffect, { ac, equipedArmor, equipedShield, }, result => ac = result)

  // Apply Shield modifier
  // TODO: Test it
  applyEffect(equipedShield, EFFECT.ACModifierEffect, { ac, hasShieldProficiency, }, result => ac = result)

  // Apply other equiped effect
  applyEffects(getEquiped(EQUIPED_CATEGORY.OTHER), EFFECT.ACModifierEffect, { ac, equipedArmor, equipedShield, }, result => ac = result)

  return ac
}

export function getHitPointMax() {
  return (getCharClass()?.hitPointMax.base + getAbilityModifier(ABILITY.constitution)) // P.41
    + ((getCharClass()?.hitPointMax.addPerLevel + getAbilityModifier(ABILITY.constitution)) * (getCharLevel() - 1)) // P.43
}

export function getHitDiceMax() {
  return DICE(getCharLevel(), getCharClass()?.hitDice)
}

export function getProficencyBonus() {
  let proficiencyBonus = Math.floor(getCharLevel() / 4) + 2

  // TODO: update on equipped / unequipped / attuned / on scores changes
  // TODO: test application
  applyEffects(getEquiped(EQUIPED_CATEGORY.OTHER), EFFECT.PBModifierEffect, { proficiencyBonus }, result => proficiencyBonus = result)

  return proficiencyBonus
}

// TODO: take armor strength + update on armor change
export function getCharSpeed() {
  let speed = getCharSpecies()?.speed || 0

  const equipedArmor = getEquiped(EQUIPED_CATEGORY.ARMOR)
  const equipedShield = getEquiped(EQUIPED_CATEGORY.SHIELD)

  applyEffect(getCharClass(), EFFECT.SpeedModifierEffect, { speed, equipedArmor, equipedShield }, result => speed = result)

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

export function isCheckedSkill(skill) { // TODO: get from class features + get from feats
  return getCharOrigin()?.skills?.includes(skill) || getSkillChoosed().includes(skill)
}

export function isDisabledSkill(skill) {
  return (!getCharClass()?.skillProficiencies?.includes(skill))
    || getCharOrigin()?.skills?.includes(skill)
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

  document.dispatchEvent(new CustomEvent('userData.charClassChanged'))

  // TODO: refresh this datas with event
  // clear choose skill
  // refreshSubClassList()
  // reloadClassData()
  // refreshClassFeatures()
}
export function setCharSubClassName(charSubClassName) {
  charsheet.charSubClassName = charSubClassName
  charsheet.charClass = getClass(getCharClassName(), getCharSubClassName(), getCharLevel())

  document.dispatchEvent(new CustomEvent('userData.charSubClassChanged'))

  // TODO: refresh this datas with event
  // reloadClassData()
  // refreshClassFeatures()
}
export function setCharLevel(charLevel) {
  charsheet.charLevel = charLevel
  charsheet.charClass = getClass(getCharClassName(), getCharSubClassName(), getCharLevel())
  charsheet.charSpecies = getSpecies(getCharSpeciesName(), getCharLevel())

  document.dispatchEvent(new CustomEvent('userData.charLevelChanged'))
}
export function setCharOrigin(charOriginName) {
  charsheet.charOriginName = charOriginName
  charsheet.charOrigin = getOrigin(getCharOriginName())
  document.dispatchEvent(new CustomEvent('userData.charOriginChanged')) // TODO: maybe useless
  // TODO: handle skill from origin ?
  // TODO: remove also choosedSkill due to conflicts
}
export function setCharSpeciesName(charSpecies) {
  charsheet.charSpeciesName = charSpecies

  document.dispatchEvent(new CustomEvent('userData.charSpeciesChanged'))
  // TODO: Handle what changed on species changed
}
export function setCharAlignment(charAlignment) { charsheet.charAlignment = charAlignment }
export function setCharExperience(charExperience) { charsheet.charExperience = charExperience }
export function setAttribute(attributeName, score) {
  charsheet.attributes[attributeName] = parseInt(score)
  charsheet.modifiers[attributeName] = abilityScoreToModifier(charsheet.attributes[attributeName])
}
export function skillChoosedAdd(skill) {
  getSkillChoosed().push(skill)
  document.dispatchEvent(new CustomEvent('userData.skillChoosedChanged'))
}
export function skillChoosedRemove(skill) {
  getSkillChoosed().splice(getSkillChoosed().indexOf(skill), 1)
  document.dispatchEvent(new CustomEvent('userData.skillChoosedChanged'))
}
export function skillChoosedClear() {
  getSkillChoosed().lentgh = 0
  document.dispatchEvent(new CustomEvent('userData.skillChoosedChanged'))
}

// INITIALIZER

export function init(source) {
  // Values set from source
  Object.assign(charsheet, storeManager.toCharsheet(source))


  // Values set from charsheet
  charsheet.charOrigin = getOrigin(getCharOriginName())
  charsheet.charClass = getClass(getCharClassName(), getCharSubClassName(), getCharLevel())
  charsheet.charSpecies = getSpecies(getCharSpeciesName())

  Object.keys(charsheet.modifiers).forEach(ability => {
    charsheet.modifiers[ability] = abilityScoreToModifier(charsheet.attributes[ability])
  })

  charsheet.equipments?.filter?.(equipment => equipment.equiped).forEach(equipment => {
    const equipmentComputed = Object.assign({}, getEquipment(equipment.name), equipment)

    switch (equipmentComputed.type) {
      case EQUIPMENT_TYPE.WEAPON: charsheet.equiped[EQUIPED_CATEGORY.WEAPON].push(equipmentComputed); break;
      case EQUIPMENT_TYPE.ARMOR: charsheet.equiped[EQUIPED_CATEGORY.ARMOR] = equipmentComputed; break;
      case EQUIPMENT_TYPE.SHIELD: charsheet.equiped[EQUIPED_CATEGORY.SHIELD] = equipmentComputed; break;
      case EQUIPMENT_TYPE.MAGIC_ITEM: (magicItem => {
        switch (magicItem.equipOn) {
          case EQUIPED_CATEGORY.WEAPON: charsheet.equiped[EQUIPED_CATEGORY.WEAPON].push(magicItem); break;
          case EQUIPED_CATEGORY.ARMOR: charsheet.equiped[EQUIPED_CATEGORY.WEAPON] = magicItem; break;
          case EQUIPED_CATEGORY.SHIELD: charsheet.equiped[EQUIPED_CATEGORY.SHIELD] = magicItem; break;
          case EQUIPED_CATEGORY.OTHER: charsheet.equiped[EQUIPED_CATEGORY.OTHER].push(magicItem); break;
        }
      })(equipmentComputed); break;
    }
  })

  // TODO: init class features

  // TODO: init species traits

  // TODO: init feats
}

// STORAGE

export function toJSON() { return storeManager.toJSON(charsheet) }
