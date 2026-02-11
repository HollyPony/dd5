import { BadDiceError } from './errors.js'
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
  acrobatics: { name: 'SKILLS_acrobatics', ability: ABILITY.dexterity, },
  animalHandling: { name: 'SKILLS_animalHandling', ability: ABILITY.wisdom, },
  arcana: { name: 'SKILLS_arcana', ability: ABILITY.intelligence, },
  athletics: { name: 'SKILLS_athletics', ability: ABILITY.strength, },
  deception: { name: 'SKILLS_deception', ability: ABILITY.charisma, },
  history: { name: 'SKILLS_history', ability: ABILITY.intelligence, },
  insight: { name: 'SKILLS_insight', ability: ABILITY.wisdom, },
  intimidation: { name: 'SKILLS_intimidation', ability: ABILITY.charisma, },
  investigation: { name: 'SKILLS_investigation', ability: ABILITY.intelligence, },
  medicine: { name: 'SKILLS_medicine', ability: ABILITY.wisdom, },
  nature: { name: 'SKILLS_nature', ability: ABILITY.intelligence, },
  perception: { name: 'SKILLS_perception', ability: ABILITY.wisdom, },
  performance: { name: 'SKILLS_performance', ability: ABILITY.charisma, },
  persuasion: { name: 'SKILLS_persuasion', ability: ABILITY.charisma, },
  religion: { name: 'SKILLS_religion', ability: ABILITY.intelligence, },
  sleightOfHand: { name: 'SKILLS_sleightOfHand', ability: ABILITY.dexterity, },
  stealth: { name: 'SKILLS_stealth', ability: ABILITY.dexterity, },
  survival: { name: 'SKILLS_survival', ability: ABILITY.wisdom, },
})
