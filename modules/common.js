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
  acrobatics: Symbol.for('SKILLS_acrobatics'),
  animalHandling: Symbol.for('SKILLS_animalHandling'),
  arcana: Symbol.for('SKILLS_arcana'),
  athletics: Symbol.for('SKILLS_athletics'),
  deception: Symbol.for('SKILLS_deception'),
  history: Symbol.for('SKILLS_history'),
  insight: Symbol.for('SKILLS_insight'),
  intimidation: Symbol.for('SKILLS_intimidation'),
  investigation: Symbol.for('SKILLS_investigation'),
  medicine: Symbol.for('SKILLS_medicine'),
  nature: Symbol.for('SKILLS_nature'),
  perception: Symbol.for('SKILLS_perception'),
  performance: Symbol.for('SKILLS_performance'),
  persuasion: Symbol.for('SKILLS_persuasion'),
  religion: Symbol.for('SKILLS_religion'),
  sleightOfHand: Symbol.for('SKILLS_sleightOfHand'),
  stealth: Symbol.for('SKILLS_stealth'),
  survival: Symbol.for('SKILLS_survival'),
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

const cachedSkillsValues = Object.values(SKILLS)

/**
 * Validate a skill enum value.
 *
 * @param {symbol} skill - Skill enum value.
 * @returns {symbol} Same skill enum value.
 * @throws {UnknownSkillError} When skill is unknown.
 */
export function validateSkill(skill) {
  if (!cachedSkillsValues.includes(skill)) throw UnknownSkillError(skill)
  return skill
}

/**
 * Resolve and validate ability bound to a skill.
 *
 * @param {symbol} skill - Skill enum value.
 * @returns {string} Ability enum value.
 * @throws {UnknownSkillError} When skill is unknown.
 */
export function getAbilityBySkill(skill) {
  return SKILL_ABILITY[validateSkill(skill)]
}
