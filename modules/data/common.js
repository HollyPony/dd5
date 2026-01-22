import { f as Of, } from '../helpers.js' // TODO: Of break completion

export const DICES = Of({
  D4: 'DICES.d4',
  D6: 'DICES.d6',
  D8: 'DICES.d8',
  D10: 'DICES.d10',
  D100: 'DICES.d100',
  D12: 'DICES.d12',
  D20: 'DICES.d20',
})

export const ABILITY = Of({
  // Warning: keys used as html className
  // TODO : use another enum for html binding name ?
  strength: 'ABILITY.strength',
  dexterity: 'ABILITY.dexterity',
  constitution: 'ABILITY.constitution',
  wisdom: 'ABILITY.wisdom',
  intelligence: 'ABILITY.intelligence',
  charisma: 'ABILITY.charisma',
})

export const EFFECT = Of({
  SpeedModifierEffect: 'EFFECT.SpeedModifier',
  ACOverrideEffect: 'EFFECT.ACOverride',
  ACModifierEffect: 'EFFECT.ACModifierEffect',
  PBModifierEffect: 'EFFECT.PBModifierEffect',
  SavesModifierEffect: 'EFFECT.SavesModifierEffect',
  SubClassChooseEffect: 'EFFECT.SubClassChoose',
  ImprovementChooseEffect: 'EFFECT.ImprovementChoose',
  AddAbilityEffect: 'EFFECT.ImproveAbility',
  AddFeatEffect: 'EFFECT.ImproveFeat',
  ReduceFallDamageEffect: 'EFFECT.ReducedFallDamage',
  ByPassArmorStrengthRequirement: 'EFFECT.ByPassArmorStrengthRequirement',
})

export const SKILLS = Of({
  // Warning: keys used as html className
  // TODO : use another enum for html binding name ?
  acrobatics: 'SKILLS.acrobatics',
  animalHandling: 'SKILLS.animalHandling',
  arcana: 'SKILLS.arcana',
  athletics: 'SKILLS.athletics',
  deception: 'SKILLS.deception',
  history: 'SKILLS.history',
  insight: 'SKILLS.insight',
  intimidation: 'SKILLS.intimidation',
  investigation: 'SKILLS.investigation',
  medicine: 'SKILLS.medicine',
  nature: 'SKILLS.nature',
  perception: 'SKILLS.perception',
  performance: 'SKILLS.performance',
  persuasion: 'SKILLS.persuasion',
  religion: 'SKILLS.religion',
  sleightOfHand: 'SKILLS.sleightOfHand',
  stealth: 'SKILLS.stealth',
  survival: 'SKILLS.survival',
})

export const EQUIPMENT_TYPE = Of({
  WEAPON: 'EQUIPMENT_TYPE.WEAPON',
  ARMOR: 'EQUIPMENT_TYPE.ARMOR',
  SHIELD: 'EQUIPMENT_TYPE.SHIELD',
  TOOL: 'EQUIPMENT_TYPE.TOOL',
  GEAR: 'EQUIPMENT_TYPE.GEAR',
  MAGIC_ITEM: 'EQUIPMENT_TYPE.MAGIC_ITEM',
})

export const EQUIPED_CATEGORY = Of({
  WEAPON: 'EQUIPED_CATEGORY.WEAPON',
  ARMOR: 'EQUIPED_CATEGORY.ARMOR',
  SHIELD: 'EQUIPED_CATEGORY.SHIELD',
  MAGIC_ITEM: 'EQUIPED_CATEGORY.MAGIC_ITEM',
  OTHER: 'EQUIPED_CATEGORY.OTHER',
})

export const WEAPON_DAMAGE_TYPE = Of({
  piercing: 'WEAPON_DAMAGE_TYPE.piercing', // Perforant
  slashing: 'WEAPON_DAMAGE_TYPE.slashing', // Tranchant
  bludgeoning: 'WEAPON_DAMAGE_TYPE.bludgeoning', // Contondant
})

export const WEAPON_CATEGORY = Of({
  simpleMelee: 'WEAPON_CATEGORY.simpleMelee', // Armes courantes de corps à corps
  simpleRanged: 'WEAPON_CATEGORY.simpleRanged', // Armes courantes à distance
  martialMelee: 'WEAPON_CATEGORY.martialMelee', // Armes de guerre de corps à corps
  martialRanged: 'WEAPON_CATEGORY.martialRanged', // Armes de guerre à distance
})

export const WEAPON_PROPERTY = Of({ // P.214 - Botte
  Amunition: 'WEAPON_PROPERTY.Amunition',
  Finesse: 'WEAPON_PROPERTY.Finesse',
  Heavy: 'WEAPON_PROPERTY.Heavy',
  Light: 'WEAPON_PROPERTY.Light',
  Range: 'WEAPON_PROPERTY.Range',
  Thrown: 'WEAPON_PROPERTY.Thrown',
  TwoHanded: 'WEAPON_PROPERTY.TwoHanded',
  Versatile: 'WEAPON_PROPERTY.Versatile',
})

export const WEAPON_MASTERY_PROPERTY = Of({ // P.215 - Botte
  Cleave: 'WEAPON_MASTERY_PROPERTY.Cleave',
  Graze: 'WEAPON_MASTERY_PROPERTY.Graze',
  Nick: 'WEAPON_MASTERY_PROPERTY.Nick',
  Sap: 'WEAPON_MASTERY_PROPERTY.Sap',
  Slow: 'WEAPON_MASTERY_PROPERTY.Slow',
  Topple: 'WEAPON_MASTERY_PROPERTY.Topple',
  Vex: 'WEAPON_MASTERY_PROPERTY.Vex',
})

export const ARMOR_CATEGORY = Of({ // P.220
  Light: 'ARMOR_CATEGORY.Light',
  Medium: 'ARMOR_CATEGORY.Medium',
  Heavy: 'ARMOR_CATEGORY.Heavy',
})


export const MAGIC_ITEM_TYPE = Of({
  armor: 'MAGIC_ITEM_TYPE.armor', // Armure
  potion: 'MAGIC_ITEM_TYPE.potion', // Potion
  ring: 'MAGIC_ITEM_TYPE.ring', // Anneau
  scroll: 'MAGIC_ITEM_TYPE.scroll', // Parchemin
  staff: 'MAGIC_ITEM_TYPE.staff', // Bâton
  wand: 'MAGIC_ITEM_TYPE.wand', // Baguette
  weapon: 'MAGIC_ITEM_TYPE.weapon', // Arme
  wondrousItem: 'MAGIC_ITEM_TYPE.wondrousItem', // Objet merveilleux
  rod: 'MAGIC_ITEM_TYPE.rod', // Sceptre
})