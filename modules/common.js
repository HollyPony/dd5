import { BadDiceError, } from './errors.js'
import { Enum, } from './helpers.js' // TODO: Of break completion

export function DICE(number, dice,) {
  if (!D[dice]) throw new BadDiceError(dice) // TODO: Custom err
  return { number, dice, }
}

export const D = Enum({
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
  strength: 'ABILITY.strength',
  dexterity: 'ABILITY.dexterity',
  constitution: 'ABILITY.constitution',
  wisdom: 'ABILITY.wisdom',
  intelligence: 'ABILITY.intelligence',
  charisma: 'ABILITY.charisma',
})

export const EFFECT = Enum({
  SpeedModifierEffect: 'EFFECT.SpeedModifierEffect',
  ACOverrideEffect: 'EFFECT.ACOverrideEffect',
  ACModifierEffect: 'EFFECT.ACModifierEffect',
  PBModifierEffect: 'EFFECT.PBModifierEffect',
  SavesModifierEffect: 'EFFECT.SavesModifierEffect',
  SubClassChooseEffect: 'EFFECT.SubClassChooseEffect',
  ImprovementChooseEffect: 'EFFECT.ImprovementChooseEffect',
  AddAbilityEffect: 'EFFECT.ImproveAbilityEffect',
  AddFeatEffect: 'EFFECT.ImproveFeatEffect',
  ReduceFallDamageEffect: 'EFFECT.ReducedFallDamageEffect',
  ByPassArmorStrengthRequirementEffect: 'EFFECT.ByPassArmorStrengthRequirementEffect',
  HasArmorProficiencyEffect: 'EFFECT.HasArmorProficiencyEffect',
  HasShieldProficiencyEffect: 'EFFECT.HasShieldProficiencyEffect',
})

export const SKILLS = Enum({
  // Warning: keys used as html className
  // TODO : use another enum for html binding name ?
  acrobatics: { name: 'SKILLS.acrobatics', ability: ABILITY.dexterity, },
  animalHandling: { name: 'SKILLS.animalHandling', ability: ABILITY.wisdom, },
  arcana: { name: 'SKILLS.arcana', ability: ABILITY.intelligence, },
  athletics: { name: 'SKILLS.athletics', ability: ABILITY.strength, },
  deception: { name: 'SKILLS.deception', ability: ABILITY.charisma, },
  history: { name: 'SKILLS.history', ability: ABILITY.intelligence, },
  insight: { name: 'SKILLS.insight', ability: ABILITY.wisdom, },
  intimidation: { name: 'SKILLS.intimidation', ability: ABILITY.charisma, },
  investigation: { name: 'SKILLS.investigation', ability: ABILITY.intelligence, },
  medicine: { name: 'SKILLS.medicine', ability: ABILITY.wisdom, },
  nature: { name: 'SKILLS.nature', ability: ABILITY.intelligence, },
  perception: { name: 'SKILLS.perception', ability: ABILITY.wisdom, },
  performance: { name: 'SKILLS.performance', ability: ABILITY.charisma, },
  persuasion: { name: 'SKILLS.persuasion', ability: ABILITY.charisma, },
  religion: { name: 'SKILLS.religion', ability: ABILITY.intelligence, },
  sleightOfHand: { name: 'SKILLS.sleightOfHand', ability: ABILITY.dexterity, },
  stealth: { name: 'SKILLS.stealth', ability: ABILITY.dexterity, },
  survival: { name: 'SKILLS.survival', ability: ABILITY.wisdom, },
})