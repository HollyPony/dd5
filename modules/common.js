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
  strength: Symbol.for('ABILITY.strength'),
  dexterity: Symbol.for('ABILITY.dexterity'),
  constitution: Symbol.for('ABILITY.constitution'),
  wisdom: Symbol.for('ABILITY.wisdom'),
  intelligence: Symbol.for('ABILITY.intelligence'),
  charisma: Symbol.for('ABILITY.charisma'),
})

export const EFFECT = Enum({
  SpeedModifierEffect: Symbol.for('EFFECT.SpeedModifierEffect'),
  ACOverrideEffect: Symbol.for('EFFECT.ACOverrideEffect'),
  ACModifierEffect: Symbol.for('EFFECT.ACModifierEffect'),
  PBModifierEffect: Symbol.for('EFFECT.PBModifierEffect'),
  SavesModifierEffect: Symbol.for('EFFECT.SavesModifierEffect'),
  SubClassChooseEffect: Symbol.for('EFFECT.SubClassChooseEffect'),
  ImprovementChooseEffect: Symbol.for('EFFECT.ImprovementChooseEffect'),
  ChooseAbilityImprovmentEffect: Symbol.for('EFFECT.ChooseAbilityImprovmentEffect'),
  AbilityImprovmentEffect: Symbol.for('EFFECT.AbilityImprovmentEffect'),
  AddAbilityEffect: Symbol.for('EFFECT.AddAbilityEffect'),
  AddFeatEffect: Symbol.for('EFFECT.AddFeatEffect'),
  ReduceFallDamageEffect: Symbol.for('EFFECT.ReduceFallDamageEffect'),
  ByPassArmorStrengthRequirementEffect: Symbol.for('EFFECT.ByPassArmorStrengthRequirementEffect'),
  HasArmorProficiencyEffect: Symbol.for('EFFECT.HasArmorProficiencyEffect'),
  HasShieldProficiencyEffect: Symbol.for('EFFECT.HasShieldProficiencyEffect'),
})

export const SKILLS = Enum({
  acrobatics: Symbol.for('SKILLS.acrobatics'),
  animalHandling: Symbol.for('SKILLS.animalHandling'),
  arcana: Symbol.for('SKILLS.arcana'),
  athletics: Symbol.for('SKILLS.athletics'),
  deception: Symbol.for('SKILLS.deception'),
  history: Symbol.for('SKILLS.history'),
  insight: Symbol.for('SKILLS.insight'),
  intimidation: Symbol.for('SKILLS.intimidation'),
  investigation: Symbol.for('SKILLS.investigation'),
  medicine: Symbol.for('SKILLS.medicine'),
  nature: Symbol.for('SKILLS.nature'),
  perception: Symbol.for('SKILLS.perception'),
  performance: Symbol.for('SKILLS.performance'),
  persuasion: Symbol.for('SKILLS.persuasion'),
  religion: Symbol.for('SKILLS.religion'),
  sleightOfHand: Symbol.for('SKILLS.sleightOfHand'),
  stealth: Symbol.for('SKILLS.stealth'),
  survival: Symbol.for('SKILLS.survival'),
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
 * @returns {symbol} Ability enum value.
 * @throws {UnknownSkillError} When skill is unknown.
 */
export function getAbilityBySkill(skill) {
  return SKILL_ABILITY[validateSkill(skill)]
}
