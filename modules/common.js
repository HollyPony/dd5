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

export const ABILITIES = Enum({
  strength: Symbol.for('ABILITIES.strength'),
  dexterity: Symbol.for('ABILITIES.dexterity'),
  constitution: Symbol.for('ABILITIES.constitution'),
  wisdom: Symbol.for('ABILITIES.wisdom'),
  intelligence: Symbol.for('ABILITIES.intelligence'),
  charisma: Symbol.for('ABILITIES.charisma'),
})

export const EFFECTS = Enum({
  SpeedModifierEffect: Symbol.for('EFFECTS.SpeedModifierEffect'),
  ACOverrideEffect: Symbol.for('EFFECTS.ACOverrideEffect'),
  ACModifierEffect: Symbol.for('EFFECTS.ACModifierEffect'),
  PBModifierEffect: Symbol.for('EFFECTS.PBModifierEffect'),
  SavesModifierEffect: Symbol.for('EFFECTS.SavesModifierEffect'),
  SubClassChooseEffect: Symbol.for('EFFECTS.SubClassChooseEffect'),
  ImprovementChooseEffect: Symbol.for('EFFECTS.ImprovementChooseEffect'),
  ChooseAbilityImprovmentEffect: Symbol.for('EFFECTS.ChooseAbilityImprovmentEffect'),
  AbilityImprovmentEffect: Symbol.for('EFFECTS.AbilityImprovmentEffect'),
  AddAbilityEffect: Symbol.for('EFFECTS.AddAbilityEffect'),
  AddFeatEffect: Symbol.for('EFFECTS.AddFeatEffect'),
  ReduceFallDamageEffect: Symbol.for('EFFECTS.ReduceFallDamageEffect'),
  ByPassArmorStrengthRequirementEffect: Symbol.for('EFFECTS.ByPassArmorStrengthRequirementEffect'),
  HasArmorProficiencyEffect: Symbol.for('EFFECTS.HasArmorProficiencyEffect'),
  HasShieldProficiencyEffect: Symbol.for('EFFECTS.HasShieldProficiencyEffect'),
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
  [SKILLS.acrobatics]: ABILITIES.dexterity,
  [SKILLS.animalHandling]: ABILITIES.wisdom,
  [SKILLS.arcana]: ABILITIES.intelligence,
  [SKILLS.athletics]: ABILITIES.strength,
  [SKILLS.deception]: ABILITIES.charisma,
  [SKILLS.history]: ABILITIES.intelligence,
  [SKILLS.insight]: ABILITIES.wisdom,
  [SKILLS.intimidation]: ABILITIES.charisma,
  [SKILLS.investigation]: ABILITIES.intelligence,
  [SKILLS.medicine]: ABILITIES.wisdom,
  [SKILLS.nature]: ABILITIES.intelligence,
  [SKILLS.perception]: ABILITIES.wisdom,
  [SKILLS.performance]: ABILITIES.charisma,
  [SKILLS.persuasion]: ABILITIES.charisma,
  [SKILLS.religion]: ABILITIES.intelligence,
  [SKILLS.sleightOfHand]: ABILITIES.dexterity,
  [SKILLS.stealth]: ABILITIES.dexterity,
  [SKILLS.survival]: ABILITIES.wisdom,
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
