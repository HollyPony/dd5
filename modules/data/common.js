import { f as Of, } from '../helpers.js' // TODO: Of break completion

export const DICES = Of({
  D4: 'd4',
  D6: 'd6',
  D8: 'd8',
  D10: 'd10',
  D100: 'd100',
  D12: 'd12',
  D20: 'd20',
})

export const ABILITY = Of({
  Strength: 'Strength'
})

export const CLASS_EFFECTS = Of({
  SpeedModifier: 'SpeedModifier',
})

export const FEATURE_EFFECTS = Of({
  ACOverride: 'ACOverride',
  SubClassChoose: 'SubClassChoose',
  ImprovementChoose: 'ImprovementChoose',
  AddAbility: 'ImproveAbility',
  AddFeat: 'ImproveFeat',
  ReduceFallDamage: 'ReducedFallDamage',
})

export const SKILLS = Of({
  acrobatics: 'acrobatics',
  animalHandling: 'animalHandling',
  arcana: 'arcana',
  athletics: 'athletics',
  deception: 'deception',
  history: 'history',
  insight: 'insight',
  intimidation: 'intimidation',
  investigation: 'investigation',
  medicine: 'medicine',
  nature: 'nature',
  perception: 'perception',
  performance: 'performance',
  persuasion: 'persuasion',
  religion: 'religion',
  sleightOfHand: 'sleightOfHand',
  stealth: 'stealth',
  survival: 'survival',
})

export const WEAPON_DAMAGE_TYPE = Of({
  piercing: 'piercing', // Perforant
  slashing: 'slashing', // Tranchant
  bludgeoning: 'bludgeoning', // Contondant
})

export const WEAPON_EFFECT = Of({})

export const WEAPON_CATEGORY = Of({
  simpleMelee: 'simpleMelee', // Armes courantes de corps à corps
  simpleRanged: 'simpleRanged', // Armes courantes à distance
  martialMelee: 'martialMelee', // Armes de guerre de corps à corps
  martialRanged: 'martialRanged', // Armes de guerre à distance
})

export const WEAPON_PROPERTY = Of({ // P.214 - Botte
  Amunition: 'Amunition',
  Finesse: 'Finesse',
  Heavy: 'Heavy',
  Light: 'Light',
  Range: 'Range',
  Thrown: 'Thrown',
  TwoHanded: 'TwoHanded',
  Versatile: 'Versatile',
})

export const WEAPON_MASTERY_PROPERTY = Of({ // P.215 - Botte
  Cleave: 'Cleave',
  Graze: 'Graze',
  Nick: 'Nick',
  Sap: 'Sap',
  Slow: 'Slow',
  Topple: 'Topple',
  Vex: 'Vex',
})

export const ARMOR_CATEGORY = Of({ // P.220
  Light: 'Light',
  Medium: 'Medium',
  Heavy: 'Heavy',
})

export const MAGIC_ITEM_EFFECT = Of({})

export const MAGIC_ITEM_TYPE = Of({
  armor: 'armor', // Armure
  potion: 'potion', // Potion
  ring: 'ring', // Anneau
  scroll: 'scroll', // Parchemin
  staff: 'staff', // Bâton
  wand: 'wand', // Baguette
  weapon: 'weapon', // Arme
  wondrousItem: 'wondrousItem', // Objet merveilleux
  rod: 'rod', // Sceptre
})