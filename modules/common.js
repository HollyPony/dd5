import { BadDiceError, UnknownSkillError } from './errors.js'
import { Enum } from './helpers.js' // TODO: Of break completion

export function DICE(number, dice,) {
  if (!DICES[dice]) throw new BadDiceError(dice) // TODO: Custom err
  return { number, dice, }
}

export const DICES = Enum({
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  20: 20,
  100: 100,
})

export const ABILITY = Enum({
  // Warning: keys used as html className
  // TODO : use another enum for html binding name ?
  strength: 'ABILITY_strength',
  dexterity: 'ABILITY_dexterity',
  constitution: 'ABILITY_constitution',
  wisdom: 'ABILITY_wisdom',
  intelligence: 'ABILITY_intelligence',
  charisma: 'ABILITY_charisma',
})

export const EFFECT = Enum({
  SpeedModifierEffect: 'EFFECT_SpeedModifierEffect',
  ACOverrideEffect: 'EFFECT_ACOverrideEffect',
  ACModifierEffect: 'EFFECT_ACModifierEffect',
  PBModifierEffect: 'EFFECT_PBModifierEffect',
  SavesModifierEffect: 'EFFECT_SavesModifierEffect',
  SubClassChooseEffect: 'EFFECT_SubClassChooseEffect',
  ImprovementChooseEffect: 'EFFECT_ImprovementChooseEffect',
  ChooseAbilityImprovmentEffect: 'EFFECT_ChooseAbilityImprovmentEffect',
  AbilityImprovmentEffect: 'EFFECT_AbilityImprovmentEffect',
  AddAbilityEffect: 'EFFECT_ImproveAbilityEffect',
  AddFeatEffect: 'EFFECT_ImproveFeatEffect',
  ReduceFallDamageEffect: 'EFFECT_ReducedFallDamageEffect',
  ByPassArmorStrengthRequirementEffect: 'EFFECT_ByPassArmorStrengthRequirementEffect',
  HasArmorProficiencyEffect: 'EFFECT_HasArmorProficiencyEffect',
  HasShieldProficiencyEffect: 'EFFECT_HasShieldProficiencyEffect',
})

export const SKILLS = Enum({
  // Warning: keys used as html className
  // TODO : use another enum for html binding name ?
  acrobatics: 'SKILLS_acrobatics',
  animalHandling: 'SKILLS_animalHandling',
  arcana: 'SKILLS_arcana',
  athletics: 'SKILLS_athletics',
  deception: 'SKILLS_deception',
  history: 'SKILLS_history',
  insight: 'SKILLS_insight',
  intimidation: 'SKILLS_intimidation',
  investigation: 'SKILLS_investigation',
  medicine: 'SKILLS_medicine',
  nature: 'SKILLS_nature',
  perception: 'SKILLS_perception',
  performance: 'SKILLS_performance',
  persuasion: 'SKILLS_persuasion',
  religion: 'SKILLS_religion',
  sleightOfHand: 'SKILLS_sleightOfHand',
  stealth: 'SKILLS_stealth',
  survival: 'SKILLS_survival',
})

export const SKILL_ABILITY = Enum({
  [SKILLS.acrobatics]: ABILITY.dexterity,
  [SKILLS.animalHandling]: ABILITY.wisdom,
  [SKILLS.arcana]: ABILITY.intelligence,
  [SKILLS.athletics]: ABILITY.strength,
  [SKILLS.deception]: ABILITY.charisma,
  [SKILLS.history]: ABILITY.intelligence,
  [SKILLS.insight]: ABILITY.wisdom,
  [SKILLS.intimidation]: ABILITY.charisma,
  [SKILLS.investigation]: ABILITY.intelligence,
  [SKILLS.medicine]: ABILITY.wisdom,
  [SKILLS.nature]: ABILITY.intelligence,
  [SKILLS.perception]: ABILITY.wisdom,
  [SKILLS.performance]: ABILITY.charisma,
  [SKILLS.persuasion]: ABILITY.charisma,
  [SKILLS.religion]: ABILITY.intelligence,
  [SKILLS.sleightOfHand]: ABILITY.dexterity,
  [SKILLS.stealth]: ABILITY.dexterity,
  [SKILLS.survival]: ABILITY.wisdom,
})

const cachedSkillNames = Object.values(SKILLS)

/**
 * Resolve and validate a skill enum value.
 *
 * @param {string} skillName - Skill enum value.
 * @returns {string} Skill enum value.
 * @throws {UnknownSkillError} When skill is unknown.
 */
export function getSkillByName(skillName) {
  if (!cachedSkillNames.includes(skillName)) throw UnknownSkillError(skillName)
  return skillName
}

/**
 * Resolve and validate ability bound to a skill.
 *
 * @param {string} skillName - Skill enum value.
 * @returns {string} Ability enum value.
 * @throws {UnknownSkillError} When skill is unknown.
 */
export function getAbilityBySkill(skillName) {
  const ability = SKILL_ABILITY[skillName]
  if (!ability) throw UnknownSkillError(skillName)
  return ability
}
