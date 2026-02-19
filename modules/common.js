import { Enum } from './enum.js'

export function DICE(number, dice,) {
  DICES[dice]
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

export const SIZE_CATEGORY = Enum({
  small: Symbol.for('SIZE_CATEGORY.small'),
  medium: Symbol.for('SIZE_CATEGORY.medium'),
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
