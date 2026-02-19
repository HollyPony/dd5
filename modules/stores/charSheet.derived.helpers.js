import { EFFECTS, SKILL_ABILITY, SKILLS } from '../common.js'
import { EQUIPED_CATEGORY, EQUIPMENT_TYPE, getEquipment } from '../data/equipments.js'
import { s } from '../helpers.js'
import properties from './charSheet.derived.properties.js'

export function applyEffect(item, effect, options, callback) {
  if (item?.effects?.[effect]
    && (item.effects[effect]?.condition?.call(item, options ?? true))) {
    callback(item.effects[effect].apply.call(item, options))
  }
}

export function applyEffects(list, effect, options, callback) {
  list?.forEach(item => applyEffect(item, effect, options, callback))
}

export function computeProficiencyBonus(level = 0) {
  return Math.floor((level - 1) / 4) + 2
}

export function computeAbilityModifier(score) {
  return Math.floor(score / 2) - 5
}

export function computeModifiers(abilities) {
  const isEnumerable = Object.prototype.propertyIsEnumerable
  const modifiers = {}

  for (const ability of Reflect.ownKeys(abilities)) {
    if (!isEnumerable.call(abilities, ability)) continue
    modifiers[ability] = computeAbilityModifier(abilities[ability])
  }

  return modifiers
}

export function computeSaves(abilities, modifiers, classData, proficiencyBonus) {
  const isEnumerable = Object.prototype.propertyIsEnumerable
  const saves = {}

  for (const ability of Reflect.ownKeys(abilities)) {
    if (!isEnumerable.call(abilities, ability)) continue
    saves[ability] = modifiers[ability] + (classData?.saves?.includes(ability) ? proficiencyBonus : 0)
  }

  return saves
}

// TODO: take armor strength + update on armor change
export function computeSpeed({
  speciesData,
  classData,
  equiped,
  feats = [],
  strength,
}) {
  let speed = speciesData?.speed || 0
  const equipedArmor = equiped?.[EQUIPED_CATEGORY.ARMOR]
  const equipedShield = equiped?.[EQUIPED_CATEGORY.SHIELD]

  applyEffect(classData, EFFECTS.SpeedModifierEffect, { speed, equipedArmor, equipedShield }, result => speed = result)

  // Heavy rule
  if (equipedArmor?.strength
    && !feats.find(feat => feat?.effects?.[EFFECTS.ByPassArmorStrengthRequirementEffect])
    && equipedArmor.strength > strength) {
    speed += -3
  }

  return speed
}

export function computePassivePerception(skills = {}) {
  return (skills?.[SKILLS.perception]?.score ?? 0) + 10
}

export function computeSkills(proficiencyBonus, modifiers, originData, choiceSelections) {
  const originSkills = originData?.skills ?? []

  const selectedSkills = Object.values(choiceSelections)
    .filter(choiceSelection => choiceSelection?.choice?.target === properties.skills)
    .map(choiceSelection => choiceSelection.payload).flat()

  return s(Object.values(SKILLS).reduce((acc, skill) => {
    const isProficient = originSkills.includes(skill) || selectedSkills.includes(skill)
    const isExpert = false // TODO: derive from features/feats
    const proficiencyMultiplier = isProficient ? (isExpert ? 2 : 1) : 0
    acc[skill] = s({
      score: (modifiers?.[SKILL_ABILITY[skill]] ?? 0) + (proficiencyBonus * proficiencyMultiplier),
      checked: isProficient,
      expert: isExpert,
    })
    return acc
  }, {}))
}

export function computeEquiped(equipments) {
  return equipments?.filter(equipment => equipment.equiped).reduce((acc, equipment) => {
    const equipmentComputed = Object.assign({}, getEquipment(equipment.name), equipment)

    switch (equipmentComputed.type) {
      case EQUIPMENT_TYPE.WEAPON: acc[EQUIPED_CATEGORY.WEAPON].push(equipmentComputed); break
      case EQUIPMENT_TYPE.ARMOR: acc[EQUIPED_CATEGORY.ARMOR] = equipmentComputed; break
      case EQUIPMENT_TYPE.SHIELD: acc[EQUIPED_CATEGORY.SHIELD] = equipmentComputed; break
      case EQUIPMENT_TYPE.MAGIC_ITEM:
        switch (equipmentComputed.equipOn) {
          case EQUIPED_CATEGORY.WEAPON: acc[EQUIPED_CATEGORY.WEAPON].push(equipmentComputed); break
          case EQUIPED_CATEGORY.ARMOR: acc[EQUIPED_CATEGORY.ARMOR] = equipmentComputed; break
          case EQUIPED_CATEGORY.SHIELD: acc[EQUIPED_CATEGORY.SHIELD] = equipmentComputed; break
          case EQUIPED_CATEGORY.OTHER: acc[EQUIPED_CATEGORY.OTHER].push(equipmentComputed); break
        }
        break
    }

    return acc
  }, {
    [EQUIPED_CATEGORY.WEAPON]: [],
    [EQUIPED_CATEGORY.ARMOR]: null,
    [EQUIPED_CATEGORY.SHIELD]: null,
    [EQUIPED_CATEGORY.OTHER]: [],
  })
}
