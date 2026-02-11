import { Enum, f } from '../helpers.js'
import {
  ABILITY, DICES, DICE, EFFECT,
}
  from '../common.js'
import { Money, GOLD as G, SILVER as S, COPPER as C } from './money.js'
import { Weight } from './weight.js'

export const EQUIPMENT_TYPE = Enum({
  WEAPON: 'EQUIPMENT_TYPE_WEAPON',
  ARMOR: 'EQUIPMENT_TYPE_ARMOR',
  SHIELD: 'EQUIPMENT_TYPE_SHIELD',
  TOOL: 'EQUIPMENT_TYPE_TOOL',
  GEAR: 'EQUIPMENT_TYPE_GEAR',
  MAGIC_ITEM: 'EQUIPMENT_TYPE_MAGIC_ITEM',
})

export const EQUIPED_CATEGORY = Enum({
  WEAPON: 'EQUIPED_CATEGORY_WEAPON',
  ARMOR: 'EQUIPED_CATEGORY_ARMOR',
  SHIELD: 'EQUIPED_CATEGORY_SHIELD',
  OTHER: 'EQUIPED_CATEGORY_OTHER',
})

export const WEAPON_CATEGORY = Enum({
  simpleMelee: 'WEAPON_CATEGORY_simpleMelee', // Armes courantes de corps à corps
  simpleRanged: 'WEAPON_CATEGORY_simpleRanged', // Armes courantes à distance
  martialMelee: 'WEAPON_CATEGORY_martialMelee', // Armes de guerre de corps à corps
  martialRanged: 'WEAPON_CATEGORY_martialRanged', // Armes de guerre à distance
})

export const WEAPON_DAMAGE_TYPE = Enum({
  piercing: 'WEAPON_DAMAGE_TYPE_piercing', // Perforant
  slashing: 'WEAPON_DAMAGE_TYPE_slashing', // Tranchant
  bludgeoning: 'WEAPON_DAMAGE_TYPE_bludgeoning', // Contondant
})

export const WEAPON_PROPERTY = Enum({ // P.214 - Propriété
  Ammunition: 'WEAPON_PROPERTY_Ammunition',
  Finesse: 'WEAPON_PROPERTY_Finesse',
  Heavy: 'WEAPON_PROPERTY_Heavy',
  Light: 'WEAPON_PROPERTY_Light',
  Loading: 'WEAPON_PROPERTY_Loading',
  Range: 'WEAPON_PROPERTY_Range',
  Reach: 'WEAPON_PROPERTY_Reach',
  Thrown: 'WEAPON_PROPERTY_Thrown',
  TwoHanded: 'WEAPON_PROPERTY_TwoHanded',
  Versatile: 'WEAPON_PROPERTY_Versatile',
})

export const WEAPON_AMMUNITION = Enum({
  Arrows: 'WEAPON_AMMUNITION_Arrows',
  Bolts: 'WEAPON_AMMUNITION_Bolts',
  SlingBullet: 'WEAPON_AMMUNITION_SlingBullets',
  FirearmBullets: 'WEAPON_AMMUNITION_FirearmBullets',
  Needles: 'WEAPON_AMMUNITION_Needles',
})

export const WEAPON_MASTERY = Enum({ // Bottes P.215
  Cleave: 'WEAPON_MASTERY_Cleave',
  Graze: 'WEAPON_MASTERY_Graze',
  Nick: 'WEAPON_MASTERY_Nick',
  Push: 'WEAPON_MASTERY_Push',
  Sap: 'WEAPON_MASTERY_Sap',
  Slow: 'WEAPON_MASTERY_Slow',
  Topple: 'WEAPON_MASTERY_Topple',
  Vex: 'WEAPON_MASTERY_Vex',
})

export const ARMOR_CATEGORY = Enum({ // P.220
  Light: 'ARMOR_CATEGORY_Light',
  Medium: 'ARMOR_CATEGORY_Medium',
  Heavy: 'ARMOR_CATEGORY_Heavy',
})

export const TOOL_CATEGORY = Enum({ // P.221
  Artisan: 'TOOL_CATEGORY_Artisan',
  MusicalInstrument: 'TOOL_CATEGORY_MusicalInstrument',
  Other: 'TOOL_CATEGORY_Other', // P.222
})

export const INSTRUMENTS = Enum({
  bagpipes: 'INSTRUMENTS_bagpipes',
  drum: 'INSTRUMENTS_drum',
  dulcimer: 'INSTRUMENTS_dulcimer',
  flute: 'INSTRUMENTS_flute',
  horn: 'INSTRUMENTS_horn',
  lute: 'INSTRUMENTS_lute',
  lyre: 'INSTRUMENTS_lyre',
  panFlute: 'INSTRUMENTS_panFlute',
  shawm: 'INSTRUMENTS_shawm',
  viol: 'INSTRUMENTS_viol',
})

export const MAGIC_ITEM_TYPE = Enum({
  armor: 'MAGIC_ITEM_TYPE_armor', // Armure
  potion: 'MAGIC_ITEM_TYPE_potion', // Potion
  ring: 'MAGIC_ITEM_TYPE_ring', // Anneau
  scroll: 'MAGIC_ITEM_TYPE_scroll', // Parchemin
  staff: 'MAGIC_ITEM_TYPE_staff', // Bâton
  wand: 'MAGIC_ITEM_TYPE_wand', // Baguette
  weapon: 'MAGIC_ITEM_TYPE_weapon', // Arme
  wondrousItem: 'MAGIC_ITEM_TYPE_wondrousItem', // Objet merveilleux
  rod: 'MAGIC_ITEM_TYPE_rod', // Sceptre
})

const WEAPONS = Enum({
  quarterstaff: 'WEAPONS_quarterstaff',
  dagger: 'WEAPONS_dagger',
  club: 'WEAPONS_club',
  handaxe: 'WEAPONS_handaxe',
  javelin: 'WEAPONS_javelin',
  spear: 'WEAPONS_spear',
  lightHammer: 'WEAPONS_lightHammer',
  mace: 'WEAPONS_mace',
  greatclub: 'WEAPONS_greatclub',
  sickle: 'WEAPONS_sickle',
  lightCrossbow: 'WEAPONS_lightCrossbow',
  shortbow: 'WEAPONS_shortbow',
  dart: 'WEAPONS_dart',
  sling: 'WEAPONS_sling',
  scimitar: 'WEAPONS_scimitar',
  glaive: 'WEAPONS_glaive',
  greatSword: 'WEAPONS_greatSword',
  shortSword: 'WEAPONS_shortSword',
  longSword: 'WEAPONS_longSword',
  flail: 'WEAPONS_flail',
  whip: 'WEAPONS_whip',
  gretAxe: 'WEAPONS_gretAxe',
  battleAxe: 'WEAPONS_battleAxe',
  halberd: 'WEAPONS_halberd',
  lance: 'WEAPONS_lance',
  maul: 'WEAPONS_maul',
  warhammer: 'WEAPONS_warhammer',
  morningstar: 'WEAPONS_morningstar',
  warPick: 'WEAPONS_warPick',
  pike: 'WEAPONS_pike',
  rapier: 'WEAPONS_rapier',
  trident: 'WEAPONS_trident',
  handCrossbow: 'WEAPONS_handCrossbow',
  heavyCrossbow: 'WEAPONS_heavyCrossbow',
  longbow: 'WEAPONS_longbow',
  musket: 'WEAPONS_musket',
  pistol: 'WEAPONS_pistol',
  blowgun: 'WEAPONS_blowgun',
})

const ARMORS = Enum({
  padded: 'ARMORS_padded',
  leather: 'ARMORS_leather',
  studdedLeather: 'ARMORS_studdedLeather',
  hideArmor: 'ARMORS_hideArmor',
  chainShirt: 'ARMORS_chainShirt',
  scaleMail: 'ARMORS_scaleMail',
  breastplate: 'ARMORS_breastplate',
  halfPlate: 'ARMORS_halfPlate',
  ringMail: 'ARMORS_ringMail',
  chainMail: 'ARMORS_chainMail',
  splint: 'ARMORS_splint',
  plate: 'ARMORS_plate',
})

const SHIELDS = Enum({
  shield: 'SHIELDS_shield',
})

export const TOOLS = Enum({
  alchemistsSupplies: 'TOOLS_alchemistsSupplies',
  brewersSupplies: 'TOOLS_brewersSupplies',
  calligraphersSupplies: 'TOOLS_calligraphersSupplies',
  carpentersTools: 'TOOLS_carpentersTools',
  cartographersToolTools: 'TOOLS_cartographersToolTools',
  cobblersTools: 'TOOLS_cobblersTools',
  cooksTools: 'TOOLS_cooksTools',
  glassblowersTools: 'TOOLS_glassblowersTools',
  jewelersTools: 'TOOLS_jewelersTools',
  leatherworkersTools: 'TOOLS_leatherworkersTools',
  masonsTools: 'TOOLS_masonsTools',
  paintersTools: 'TOOLS_paintersTools',
  pottersTools: 'TOOLS_pottersTools',
  smithsTools: 'TOOLS_smithsTools',
  tinkersTools: 'TOOLS_tinkersTools',
  weaversTools: 'TOOLS_weaversTools',
  woodcarversTools: 'TOOLS_woodcarversTools',

  disguiseKit: 'TOOLS_disguiseKit',
  forgeryKit: 'TOOLS_forgeryKit',
  gamingSet: 'TOOLS_gamingSet',
  herbalismKit: 'TOOLS_herbalismKit',
  bagpipes: 'TOOLS_bagpipes',
  drum: 'TOOLS_drum',
  dulcimer: 'TOOLS_dulcimer',
  flute: 'TOOLS_flute',
  horn: 'TOOLS_horn',
  lute: 'TOOLS_lute',
  lyre: 'TOOLS_lyre',
  panFlute: 'TOOLS_panFlute',
  shawm: 'TOOLS_shawm',
  viol: 'TOOLS_viol',
  navigatorsTools: 'TOOLS_navigatorsTools',
  poisonersKit: 'TOOLS_poisonersKit',
  thievesTools: 'TOOLS_thievesTools',
})

const GEARS = Enum({
  acid: 'GEARS_acid',
  antitoxin: 'GEARS_antitoxin',
  clothesFine: 'GEARS_clothesFine',
  ramPortable: 'GEARS_ramPortable',
  ballBearings: 'GEARS_ballBearings',
  tinderbox: 'GEARS_tinderbox',
  candle: 'GEARS_candle',
  bottleGlass: 'GEARS_bottleGlass',
  lock: 'GEARS_lock',
  quiver: 'GEARS_quiver',
  map: 'GEARS_map',
  chain: 'GEARS_chain',
  caltrops: 'GEARS_caltrops',
  bell: 'GEARS_bell',
  chest: 'GEARS_chest',
  rope: 'GEARS_rope',
  costume: 'GEARS_costume',
  blanket: 'GEARS_blanket',
  jug: 'GEARS_jug',
  holyWater: 'GEARS_holyWater',
  ladder: 'GEARS_ladder',
  ink: 'GEARS_ink',
  caseMapOrScroll: 'GEARS_caseMapOrScroll',
  caseCrossbowBolt: 'GEARS_caseCrossbowBolt',
  alchemistsFire: 'GEARS_alchemistsFire',
  string: 'GEARS_string',
  net: 'GEARS_net',
  vial: 'GEARS_vial',
  flask: 'GEARS_flask',
  arcaneFocus: 'GEARS_arcaneFocus',
  druidicFocus: 'GEARS_druidicFocus',
  grapplingHook: 'GEARS_grapplingHook',
  oil: 'GEARS_oil',
  lamp: 'GEARS_lamp',
  lanternHooded: 'GEARS_lanternHooded',
  lanternBullseye: 'GEARS_lanternBullseye',
  book: 'GEARS_book',
  spyglass: 'GEARS_spyglass',
  magnifyingGlass: 'GEARS_magnifyingGlass',
  climbersKit: 'GEARS_climbersKit',
  manacles: 'GEARS_manacles',
  mirror: 'GEARS_mirror',
  ammunition: 'GEARS_ammunition',
  waterskin: 'GEARS_waterskin',
  blockAndTackle: 'GEARS_blockAndTackle',
  basket: 'GEARS_basket',
  paper: 'GEARS_paper',
  burglarsPack: 'GEARS_burglarsPack',
  diplomatsPack: 'GEARS_diplomatsPack',
  entertainersPack: 'GEARS_entertainersPack',
  priestsPack: 'GEARS_priestsPack',
  scholarsPack: 'GEARS_scholarsPack',
  explorersPack: 'GEARS_explorersPack',
  dungeoneersPack: 'GEARS_dungeoneersPack',
  parchment: 'GEARS_parchment',
  spellScroll: 'GEARS_spellScroll',
  perfume: 'GEARS_perfume',
  shovel: 'GEARS_shovel',
  pole: 'GEARS_pole',
  crowbar: 'GEARS_crowbar',
  huntingTrap: 'GEARS_huntingTrap',
  spikesIron: 'GEARS_spikesIron',
  poisonBasic: 'GEARS_poisonBasic',
  inkPen: 'GEARS_inkPen',
  potIron: 'GEARS_potIron',
  potionOfHealing: 'GEARS_potionOfHealing',
  rations: 'GEARS_rations',
  robe: 'GEARS_robe',
  sack: 'GEARS_sack',
  backpack: 'GEARS_backpack',
  bedroll: 'GEARS_bedroll',
  pouch: 'GEARS_pouch',
  componentPouch: 'GEARS_componentPouch',
  bucket: 'GEARS_bucket',
  signalWhistle: 'GEARS_signalWhistle',
  holySymbol: 'GEARS_holySymbol',
  tent: 'GEARS_tent',
  clothesTravelers: 'GEARS_clothesTravelers',
  barrel: 'GEARS_barrel',
  torch: 'GEARS_torch',
  healersKit: 'GEARS_healersKit',
})

// TODO: Place MAGIC_ITEMS here

const weapons = f([ // P.214
  f({
    name: WEAPONS.quarterstaff,
    damage: DICE(1, DICES[6]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([WEAPON_PROPERTY.Versatile]),
    propertiesValues: {
      [WEAPON_PROPERTY.Versatile]: {
        // TODO: test
        condition: weapons => weapons?.length && (weapons?.[0] === this ?? false),
        damage: DICE(1, DICES[8]),
      },
    },
    mastery: WEAPON_MASTERY.Topple,
    weight: Weight(2000),
    cost: Money(S(2)),
  }),
  f({
    name: WEAPONS.dagger,
    damage: DICE(1, DICES[4]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([WEAPON_PROPERTY.Finesse, WEAPON_PROPERTY.Thrown, WEAPON_PROPERTY.Light]),
    propertiesValues: {
      [WEAPON_PROPERTY.Thrown]: {
        // TODO: test
        range: {
          normal: 6,
          max: 18, // TODO: Display malus if more than range - P.215
        },
      },
    },
    mastery: WEAPON_MASTERY.Nick,
    weight: Weight(500),
    cost: Money(G(2)),
  }),
  f({
    name: WEAPONS.club,
    damage: DICE(1, DICES[4]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([WEAPON_PROPERTY.Light]),
    mastery: WEAPON_MASTERY.Slow,
    weight: Weight(1000),
    cost: Money(S(1)),
  }),
  f({
    name: WEAPONS.handaxe,
    damage: DICE(1, DICES[6]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([WEAPON_PROPERTY.Thrown, WEAPON_PROPERTY.Light]),
    propertiesValues: {
      [WEAPON_PROPERTY.Thrown]: {
        // TODO: test
        range: {
          normal: 6,
          max: 18, // TODO: Display malus if more than range - P.215
        },
      },
    },
    mastery: WEAPON_MASTERY.Vex,
    weight: Weight(1000),
    cost: Money(G(5)),
  }),
  f({
    name: WEAPONS.javelin,
    damage: DICE(1, DICES[6]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([WEAPON_PROPERTY.Thrown]),
    propertiesValues: {
      [WEAPON_PROPERTY.Thrown]: {
        // TODO: test
        range: {
          normal: 9,
          max: 36, // TODO: Display malus if more than range - P.215
        },
      },
    },
    mastery: WEAPON_MASTERY.Slow,
    weight: Weight(1000),
    cost: Money(S(5)),
  }),
  f({
    name: WEAPONS.spear,
    damage: DICE(1, DICES[6]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([WEAPON_PROPERTY.Thrown, WEAPON_PROPERTY.Versatile]),
    propertiesValues: {
      [WEAPON_PROPERTY.Thrown]: {
        // TODO: test
        range: {
          normal: 6,
          max: 18, // TODO: Display malus if more than range - P.215
        },
      },
      [WEAPON_PROPERTY.Versatile]: {
        // TODO: test
        condition: weapons => weapons?.length && (weapons?.[0] === this ?? false),
        damage: DICE(1, DICES[8]),
      },
    },
    mastery: WEAPON_MASTERY.Sap,
    weight: Weight(1500),
    cost: Money(G(1)),
  }),
  f({
    name: WEAPONS.lightHammer,
    damage: DICE(1, DICES[4]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([WEAPON_PROPERTY.Thrown, WEAPON_PROPERTY.Light]),
    propertiesValues: {
      [WEAPON_PROPERTY.Thrown]: {
        // TODO: test
        range: {
          normal: 6,
          max: 18, // TODO: Display malus if more than range - P.215
        },
      },
    },
    mastery: WEAPON_MASTERY.Nick,
    weight: Weight(1000),
    cost: Money(G(2)),
  }),
  f({
    name: WEAPONS.mace,
    damage: DICE(1, DICES[6]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([]),
    mastery: WEAPON_MASTERY.Sap,
    weight: Weight(2000),
    cost: Money(G(5)),
  }),
  f({
    name: WEAPONS.greatclub,
    damage: DICE(1, DICES[8]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([WEAPON_PROPERTY.TwoHanded]),
    mastery: WEAPON_MASTERY.Push,
    weight: Weight(5000),
    cost: Money(S(2)),
  }),
  f({
    name: WEAPONS.sickle,
    damage: DICE(1, DICES[4]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([WEAPON_PROPERTY.Light]),
    mastery: WEAPON_MASTERY.Nick,
    weight: Weight(1000),
    cost: Money(G(1)),
  }),
  f({
    name: WEAPONS.lightCrossbow,
    damage: DICE(1, DICES[8]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.simpleRanged,
    properties: f([WEAPON_PROPERTY.Loading, WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Ammunition]),
    propertiesValues: {
      [WEAPON_PROPERTY.Ammunition]: {
        type: WEAPON_AMMUNITION.Bolt,
        range: {
          normal: 24,
          max: 96,
        }
      }
    },
    mastery: WEAPON_MASTERY.Slow,
    weight: Weight(2500),
    cost: Money(G(25)),
  }),
  f({
    name: WEAPONS.shortbow,
    damage: DICE(1, DICES[6]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.simpleRanged,
    properties: f([WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Ammunition]),
    propertiesValues: {
      [WEAPON_PROPERTY.Ammunition]: {
        type: WEAPON_AMMUNITION.Arrow,
        range: {
          normal: 24,
          max: 96,
        }
      }
    },
    mastery: WEAPON_MASTERY.Vex,
    weight: Weight(1000),
    cost: Money(G(25)),
  }),
  f({
    name: WEAPONS.dart,
    damage: DICE(1, DICES[4]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.simpleRanged,
    properties: f([WEAPON_PROPERTY.Finesse, WEAPON_PROPERTY.Thrown]),
    propertiesValues: {
      [WEAPON_PROPERTY.Thrown]: {
        // TODO: test
        range: {
          normal: 6,
          max: 18, // TODO: Display malus if more than range - P.215
        },
      },
    },
    mastery: WEAPON_MASTERY.Vex,
    weight: Weight(125),
    cost: Money(C(5)),
  }),
  f({
    name: WEAPONS.sling,
    damage: DICE(1, DICES[4]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.simpleRanged,
    properties: f([WEAPON_PROPERTY.Ammunition]),
    propertiesValues: {
      [WEAPON_PROPERTY.Ammunition]: {
        type: WEAPON_AMMUNITION.SlingBullet,
        range: {
          normal: 9,
          max: 36,
        }
      }
    },
    mastery: WEAPON_MASTERY.Slow,
    weight: Weight(0),
    cost: Money(S(1)),
  }),
  f({
    name: WEAPONS.scimitar,
    damage: DICE(1, DICES[6]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Finesse, WEAPON_PROPERTY.Light]),
    mastery: WEAPON_MASTERY.Nick,
    weight: Weight(1500),
    cost: Money(G(25)),
  }),
  f({
    name: WEAPONS.glaive,
    damage: DICE(1, DICES[10]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Reach, WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy]),
    mastery: WEAPON_MASTERY.Graze,
    weight: Weight(3000),
    cost: Money(G(20)),
  }),
  f({
    name: WEAPONS.greatSword,
    damage: DICE(2, DICES[6]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy]),
    mastery: WEAPON_MASTERY.Graze,
    weight: Weight(3000),
    cost: Money(G(50)),
  }),
  f({
    name: WEAPONS.shortSword,
    damage: DICE(1, DICES[6]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Finesse, WEAPON_PROPERTY.Light]),
    mastery: WEAPON_MASTERY.Vex,
    weight: Weight(1000),
    cost: Money(G(10)),
  }),
  f({
    name: WEAPONS.longSword,
    damage: DICE(1, DICES[8]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Versatile]),
    propertiesValues: {
      [WEAPON_PROPERTY.Versatile]: {
        // TODO: test
        condition: weapons => weapons?.length && (weapons?.[0] === this ?? false),
        damage: DICE(1, DICES[10]),
      },
    },
    mastery: WEAPON_MASTERY.Sap,
    weight: Weight(1500),
    cost: Money(G(15)),
  }),
  f({
    name: WEAPONS.flail,
    damage: DICE(1, DICES[8]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([]),
    mastery: WEAPON_MASTERY.Sap,
    weight: Weight(1000),
    cost: Money(G(10)),
  }),
  f({
    name: WEAPONS.whip,
    damage: DICE(1, DICES[4]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Reach, WEAPON_PROPERTY.Finesse]),
    mastery: WEAPON_MASTERY.Slow,
    weight: Weight(1500),
    cost: Money(G(2)),
  }),
  f({
    name: WEAPONS.gretAxe,
    damage: DICE(1, DICES[12]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy]),
    mastery: WEAPON_MASTERY.Cleave,
    weight: Weight(3500),
    cost: Money(G(30)),
  }),
  f({
    name: WEAPONS.battleAxe,
    damage: DICE(1, DICES[8]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Versatile]),
    propertiesValues: {
      [WEAPON_PROPERTY.Versatile]: {
        // TODO: test
        condition: weapons => weapons?.length && (weapons?.[0] === this ?? false),
        damage: DICE(1, DICES[10]),
      },
    },
    mastery: WEAPON_MASTERY.Topple,
    weight: Weight(2000),
    cost: Money(G(10)),
  }),
  f({
    name: WEAPONS.halberd,
    damage: DICE(1, DICES[10]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Reach, WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy]),
    mastery: WEAPON_MASTERY.Cleave,
    weight: Weight(3000),
    cost: Money(G(20)),
  }),
  f({
    name: WEAPONS.lance,
    damage: DICE(1, DICES[10]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Reach, WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy]),
    exceptions: {
      [WEAPON_PROPERTY.TwoHanded]: {
        label: 'TwoHandedExceptHorse' // TODO: test handle translation
      },
    },
    mastery: WEAPON_MASTERY.Topple,
    weight: Weight(3000),
    cost: Money(G(10)),
  }),
  f({
    name: WEAPONS.maul,
    damage: DICE(2, DICES[6]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy]),
    mastery: WEAPON_MASTERY.Topple,
    weight: Weight(5000),
    cost: Money(G(10)),
  }),
  f({
    name: WEAPONS.warhammer,
    damage: DICE(1, DICES[8]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Versatile]),
    propertiesValues: {
      [WEAPON_PROPERTY.Versatile]: {
        // TODO: test
        condition: weapons => weapons?.length && (weapons?.[0] === this ?? false),
        damage: DICE(1, DICES[10]),
      },
    },
    mastery: WEAPON_MASTERY.Push,
    weight: Weight(2500),
    cost: Money(G(15)),
  }),
  f({
    name: WEAPONS.morningstar,
    damage: DICE(1, DICES[8]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([]),
    mastery: WEAPON_MASTERY.Sap,
    weight: Weight(2000),
    cost: Money(G(15)),
  }),
  f({
    name: WEAPONS.warPick,
    damage: DICE(1, DICES[8]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Versatile]),
    propertiesValues: {
      [WEAPON_PROPERTY.Versatile]: {
        // TODO: test
        condition: weapons => weapons?.length && (weapons?.[0] === this ?? false),
        damage: DICE(1, DICES[10]),
      },
    },
    mastery: WEAPON_MASTERY.Sap,
    weight: Weight(1000),
    cost: Money(G(5)),
  }),
  f({
    name: WEAPONS.pike,
    damage: DICE(1, DICES[10]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Reach, WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy]),
    mastery: WEAPON_MASTERY.Push,
    weight: Weight(9000),
    cost: Money(G(5)),
  }),
  f({
    name: WEAPONS.rapier,
    damage: DICE(1, DICES[8]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Finesse]),
    mastery: WEAPON_MASTERY.Vex,
    weight: Weight(1000),
    cost: Money(G(25)),
  }),
  f({
    name: WEAPONS.trident,
    damage: DICE(1, DICES[8]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Thrown, WEAPON_PROPERTY.Versatile]),
    propertiesValues: {
      [WEAPON_PROPERTY.Thrown]: {
        // TODO: test
        range: {
          normal: 6,
          max: 18, // TODO: Display malus if more than range - P.215
        },
      },
      [WEAPON_PROPERTY.Versatile]: {
        // TODO: test
        condition: weapons => weapons?.length && (weapons?.[0] === this ?? false),
        damage: DICE(1, DICES[10]),
      },
    },
    mastery: WEAPON_MASTERY.Topple,
    weight: Weight(2000),
    cost: Money(G(5)),
  }),
  f({
    name: WEAPONS.handCrossbow,
    damage: DICE(1, DICES[6]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialRanged,
    properties: f([WEAPON_PROPERTY.Loading, WEAPON_PROPERTY.Light, WEAPON_PROPERTY.Ammunition]),
    propertiesValues: {
      [WEAPON_PROPERTY.Ammunition]: {
        type: WEAPON_AMMUNITION.Bolt,
        range: {
          normal: 9,
          max: 36,
        }
      }
    },
    mastery: WEAPON_MASTERY.Vex,
    weight: Weight(1500),
    cost: Money(G(75)),
  }),
  f({
    name: WEAPONS.heavyCrossbow,
    damage: DICE(1, DICES[10]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialRanged,
    properties: f([WEAPON_PROPERTY.Loading, WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy, WEAPON_PROPERTY.Ammunition]),
    propertiesValues: {
      [WEAPON_PROPERTY.Ammunition]: {
        type: WEAPON_AMMUNITION.Bolt,
        range: {
          normal: 30,
          max: 120,
        }
      }
    },
    mastery: WEAPON_MASTERY.Push,
    weight: Weight(9000),
    cost: Money(G(50)),
  }),
  f({
    name: WEAPONS.longbow,
    damage: DICE(1, DICES[8]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialRanged,
    properties: f([WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy, WEAPON_PROPERTY.Ammunition]),
    propertiesValues: {
      [WEAPON_PROPERTY.Ammunition]: {
        type: WEAPON_AMMUNITION.Arrows,
        range: {
          normal: 45,
          max: 180,
        }
      }
    },
    mastery: WEAPON_MASTERY.Slow,
    weight: Weight(1000),
    cost: Money(G(50)),
  }),
  f({
    name: WEAPONS.musket,
    damage: DICE(1, DICES[12]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialRanged,
    properties: f([WEAPON_PROPERTY.Loading, WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Ammunition]),
    propertiesValues: {
      [WEAPON_PROPERTY.Ammunition]: {
        type: WEAPON_AMMUNITION.FirearmBullets,
        range: {
          normal: 12,
          max: 32,
        }
      }
    },
    mastery: WEAPON_MASTERY.Slow,
    weight: Weight(5000),
    cost: Money(G(500)),
  }),
  f({
    name: WEAPONS.pistol,
    damage: DICE(1, DICES[10]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialRanged,
    properties: f([WEAPON_PROPERTY.Loading, WEAPON_PROPERTY.Ammunition]),
    propertiesValues: {
      [WEAPON_PROPERTY.Ammunition]: {
        type: WEAPON_AMMUNITION.FirearmBullets,
        range: {
          normal: 9,
          max: 27,
        }
      }
    },
    mastery: WEAPON_MASTERY.Vex,
    weight: Weight(1500),
    cost: Money(G(250)),
  }),
  f({
    name: WEAPONS.blowgun,
    damage: `1`,
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialRanged,
    properties: f([WEAPON_PROPERTY.Loading, WEAPON_PROPERTY.Ammunition]),
    propertiesValues: {
      [WEAPON_PROPERTY.Ammunition]: {
        type: WEAPON_AMMUNITION.Needles,
        range: {
          normal: 7.50,
          max: 30,
        }
      }
    },
    mastery: WEAPON_MASTERY.Vex,
    weight: Weight(500),
    cost: Money(G(10)),
  }),
])

const armors = f([ // P.220
  f({
    name: ARMORS.padded,
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 11 + modifiers[ABILITY.dexterity],
      },
    }), strength: null,
    stealthMalus: true,
    weight: Weight(4000), // TODO: Weight
    cost: Money(G(5)),
    category: ARMOR_CATEGORY.Light,
  }),
  f({
    name: ARMORS.leather,
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 11 + modifiers[ABILITY.dexterity],
      },
    }), strength: null,
    stealthMalus: false,
    weight: Weight(5000),
    cost: Money(G(10)),
    category: ARMOR_CATEGORY.Light,
  }),
  f({
    name: ARMORS.studdedLeather,
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 12 + modifiers[ABILITY.dexterity],
      },
    }), strength: null,
    stealthMalus: false,
    weight: Weight(6500),
    cost: Money(G(45)),
    category: ARMOR_CATEGORY.Light,
  }),
  f({
    name: ARMORS.hideArmor,
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 12 + Math.min(modifiers[ABILITY.dexterity], 2),
      },
    }), strength: null,
    stealthMalus: false,
    weight: Weight(6000),
    cost: Money(G(10)),
    category: ARMOR_CATEGORY.Medium,
  }),
  f({
    name: ARMORS.chainShirt,
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 13 + Math.min(modifiers[ABILITY.dexterity], 2),
      },
    }), strength: null,
    stealthMalus: false,
    weight: Weight(10000),
    cost: Money(G(50)),
    category: ARMOR_CATEGORY.Medium,
  }),
  f({
    name: ARMORS.scaleMail,
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 14 + Math.min(modifiers[ABILITY.dexterity], 2),
      },
    }), strength: null,
    stealthMalus: true,
    weight: Weight(22500),
    cost: Money(G(50)),
    category: ARMOR_CATEGORY.Medium,
  }),
  f({
    name: ARMORS.breastplate,
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 14 + Math.min(modifiers[ABILITY.dexterity], 2),
      },
    }), strength: null,
    stealthMalus: false,
    weight: Weight(10000),
    cost: Money(G(400)),
    category: ARMOR_CATEGORY.Medium,
  }),
  f({
    name: ARMORS.halfPlate,
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 15 + Math.min(modifiers[ABILITY.dexterity], 2),
      },
    }), strength: null,
    stealthMalus: true,
    weight: Weight(20000),
    cost: Money(G(750)),
    category: ARMOR_CATEGORY.Medium,
  }),
  f({
    name: ARMORS.ringMail,
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: () => 14,
      },
    }), strength: null,
    stealthMalus: true,
    weight: Weight(20000),
    cost: Money(G(30)),
    category: ARMOR_CATEGORY.Heavy,
  }),
  f({
    name: ARMORS.chainMail,
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: () => 16,
      },
    }), strength: 13,
    stealthMalus: true,
    weight: Weight(27500),
    cost: Money(G(75)),
    category: ARMOR_CATEGORY.Heavy,
  }),
  f({
    name: ARMORS.splint,
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: () => 17,
      },
    }), strength: 15,
    stealthMalus: true,
    weight: Weight(30000),
    cost: Money(G(200)),
    category: ARMOR_CATEGORY.Heavy,
  }),
  f({
    name: ARMORS.plate,
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: () => 18,
      },
    }), strength: 15,
    stealthMalus: true,
    weight: Weight(32500),
    cost: Money(G(1500)),
    category: ARMOR_CATEGORY.Heavy,
  }),
])

const shields = f([ // P.220
  f({
    name: SHIELDS.shield,
    effects: f({
      [EFFECT.ACModifierEffect]: {
        condition: ({ hasShieldProficiency }) => hasShieldProficiency,
        apply: ({ ac }) => ac + 2,
      },
    }), strength: null,
    stealthMalus: false,
    weight: Weight(3000),
    cost: Money(G(10)),
  }),
])

const tools = f([ // P.221
  // TODO: Implement tools
  {
    name: TOOLS.alchemistsSupplies,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.intelligence,
    weight: Weight(4000),
    cost: Money(G(5)),
    crafts: [GEARS.acid, GEARS.alchemistsFire, GEARS.componentPouch, GEARS.oil, GEARS.paper, GEARS.perfume,],
  },
  {
    name: TOOLS.brewersSupplies,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.intelligence,
    weight: Weight(4500),
    cost: Money(G(20)),
    crafts: [GEARS.antitoxin,],
  },
  {
    name: TOOLS.calligraphersSupplies,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.dexterity,
    weight: Weight(2500),
    cost: Money(G(10)),
    crafts: [GEARS.ink, GEARS.spellScroll,],
  },
  {
    name: TOOLS.carpentersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.strength,
    weight: Weight(3000),
    cost: Money(G(8)),
    crafts: [
      WEAPONS.quarterstaff, WEAPONS.club, WEAPONS.greatclub,
      GEARS.ramPortable, GEARS.chest, GEARS.ladder,
      GEARS.pole, GEARS.barrel, GEARS.torch,
    ],
  },
  {
    name: TOOLS.cartographersToolTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.wisdom,
    weight: Weight(3000),
    cost: Money(G(15)),
    crafts: [GEARS.map,],
  },
  {
    name: TOOLS.cobblersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.dexterity,
    weight: Weight(2500),
    cost: Money(G(5)),
    crafts: [GEARS.climbersKit,],
  },
  {
    name: TOOLS.cooksTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.wisdom,
    weight: Weight(4000),
    cost: Money(G(1)),
    crafts: [GEARS.rations,],
  },
  {
    name: TOOLS.glassblowersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.intelligence,
    weight: Weight(2500),
    cost: Money(G(30)),
    crafts: [GEARS.bottleGlass, GEARS.magnifyingGlass, GEARS.spyglass, GEARS.vial],
  },
  {
    name: TOOLS.jewelersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.intelligence,
    weight: Weight(1000),
    cost: Money(G(25)),
    crafts: [GEARS.arcaneFocus, GEARS.holySymbol,],
  },
  {
    name: TOOLS.leatherworkersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.dexterity,
    weight: Weight(2500),
    cost: Money(G(5)),
    crafts: [
      WEAPONS.whip, WEAPONS.sling,
      ARMORS.leather, ARMORS.studdedLeather, ARMORS.hideArmor,
      GEARS.quiver, GEARS.caseCrossbowBolt, GEARS.caseMapOrScroll,
      GEARS.waterskin, GEARS.scroll, GEARS.pouch, GEARS.backpack,
    ],
  },
  {
    name: TOOLS.masonsTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.strength,
    weight: Weight(4000),
    cost: Money(G(10)),
    crafts: [GEARS.blockAndTackle,],
  },
  {
    name: TOOLS.paintersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.wisdom,
    weight: Weight(2500),
    cost: Money(G(10)),
    crafts: [GEARS.druidicFocus, GEARS.holySymbol,]
  },
  {
    name: TOOLS.pottersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.intelligence,
    weight: Weight(1500),
    cost: Money(G(10)),
    crafts: [GEARS.jug, GEARS.lamp,],
  },
  {
    name: TOOLS.smithsTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.strength,
    weight: Weight(4000),
    cost: Money(G(20)),
    crafts: [
      ...weapons.filter(weapon =>
        [WEAPON_CATEGORY.simpleMelee, WEAPON_CATEGORY.martialMelee].includes(weapon.category)
        && ![WEAPONS.quarterstaff, WEAPONS.club, WEAPONS.greatclub, WEAPONS.whip,].includes(weapon.name)
      ).map(weapon => weapon.name),
      ...armors.filter(armor =>
        armor.category === ARMOR_CATEGORY.Heavy ||
        (armor.category === ARMOR_CATEGORY.Medium && armor.name !== ARMORS.hideArmor)
      ).map(armor => armor.name),
      WEAPON_AMMUNITION.SlingBullet, WEAPON_AMMUNITION.FirearmBullets,
      GEARS.bucket, GEARS.caltrops, GEARS.chain, GEARS.crowbar, GEARS.grapplingHook,
      GEARS.potIron, GEARS.spikesIron, GEARS.ballBearings,
    ],
  },
  {
    name: TOOLS.tinkersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.dexterity,
    weight: Weight(5000),
    cost: Money(G(50)),
    cratfs: [
      WEAPONS.musket, WEAPONS.pistol, GEARS.tinderbox, GEARS.bell,
      GEARS.lanternHooded, GEARS.lanternBullseye, GEARS.manacles, GEARS.shovel,
      GEARS.huntingTrap, GEARS.lock, GEARS.signalWhistle,
    ],
  },
  {
    name: TOOLS.weaversTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.dexterity,
    weight: Weight(2500),
    cost: Money(G(1)),
    crafts: [
      ARMORS.padded,
      GEARS.basket, GEARS.bedroll, GEARS.blanket, GEARS.clothesFine, GEARS.net,
      GEARS.robe, GEARS.rope, GEARS.sack, GEARS.string, GEARS.tent, GEARS.clothesTravelers,
    ],
  },
  {
    name: TOOLS.woodcarversTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITY.dexterity,
    weight: Weight(2500),
    cost: Money(G(1)),
    crafts: [
      WEAPONS.club, WEAPONS.greatclub, WEAPONS.quarterstaff,
      ...weapons.filter(weapon =>
        [WEAPON_CATEGORY.simpleRanged, WEAPON_CATEGORY.martialRanged].includes(weapon.category)
        && ![WEAPONS.pistol, WEAPONS.musket, WEAPONS.sling].includes(weapon.name)
      ).map(weapon => weapon.name),
      WEAPON_AMMUNITION.Arrows, WEAPON_AMMUNITION.Bolts, WEAPON_AMMUNITION.Needles,
      GEARS.arcaneFocus, GEARS.druidicFocus, GEARS.inkPen,
    ],
  },

  {
    name: TOOLS.disguiseKit,
    category: TOOL_CATEGORY.Other,
    ability: ABILITY.charisma,
    weight: Weight(1500),
    cost: Money(G(25)),
  },
  {
    name: TOOLS.forgeryKit,
    category: TOOL_CATEGORY.Other,
    ability: ABILITY.dexterity,
    weight: Weight(2500),
    cost: Money(G(15)),
  },
  {
    name: TOOLS.gamingSet,
    category: TOOL_CATEGORY.Other,
    ability: ABILITY.wisdom,
    weight: Weight(0),
    variants: [
      { name: 'dice', cost: Money(S(1)), },
      { name: 'dragonChess', cost: Money(G(1)), },
      { name: 'playingCards', cost: Money(S(5)), },
      { name: 'threeDragonAnte', cost: Money(G(1)), },
    ],
  },
  {
    name: TOOLS.herbalismKit,
    category: TOOL_CATEGORY.Other,
    ability: ABILITY.intelligence,
    weight: Weight(1500),
    cost: Money(G(5)),
    crafts: [GEARS.antitoxin, GEARS.candle, GEARS.healersKit, GEARS.potionOfHealing,],
  },
  {
    name: TOOLS.bagpipes,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITY.charisma,
    weight: Weight(3000),
    cost: Money(G(30)),
  },
  {
    name: TOOLS.drum,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITY.charisma,
    weight: Weight(1500),
    cost: Money(G(6)),
  },
  {
    name: TOOLS.dulcimer,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITY.charisma,
    weight: Weight(5000),
    cost: Money(G(25)),
  },
  {
    name: TOOLS.flute,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITY.charisma,
    weight: Weight(500),
    cost: Money(G(2)),
  },
  {
    name: TOOLS.horn,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITY.charisma,
    weight: Weight(1000),
    cost: Money(G(3)),
  },
  {
    name: TOOLS.lute,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITY.charisma,
    weight: Weight(1000),
    cost: Money(G(35)),
  },
  {
    name: TOOLS.lyre,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITY.charisma,
    weight: Weight(1000),
    cost: Money(G(30)),
  },
  {
    name: TOOLS.panFlute,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITY.charisma,
    weight: Weight(1000),
    cost: Money(G(12)),
  },
  {
    name: TOOLS.shawm,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITY.charisma,
    weight: Weight(500),
    cost: Money(G(2)),
  },
  {
    name: TOOLS.viol,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITY.charisma,
    weight: Weight(500),
    cost: Money(G(30)),
  },
  {
    name: TOOLS.navigatorsTools,
    category: TOOL_CATEGORY.Other,
    ability: ABILITY.wisdom,
    weight: Weight(1000),
    cost: Money(G(25)),
  },
  {
    name: TOOLS.poisonersKit,
    category: TOOL_CATEGORY.Other,
    ability: ABILITY.intelligence,
    weight: Weight(1000),
    cost: Money(G(50)),
    crafts: [GEARS.poisonBasic]
  },
  {
    name: TOOLS.thievesTools,
    category: TOOL_CATEGORY.Other,
    ability: ABILITY.dexterity,
    weight: Weight(500),
    cost: Money(G(25)),
  },
])

// TODO: Handle weight / cost variables
const gears = f([ // P.223
  { name: GEARS.acid, weight: Weight(500), cost: Money(G(25)), },
  { name: GEARS.antitoxin, weight: Weight(0), cost: Money(G(50)), },
  { name: GEARS.clothesFine, weight: Weight(3000), cost: Money(G(15)), },
  { name: GEARS.ramPortable, weight: Weight(17500), cost: Money(G(4)), },
  { name: GEARS.ballBearings, weight: Weight(1000), cost: Money(G(1)), },
  { name: GEARS.tinderbox, weight: Weight(500), cost: Money(S(5)), },
  { name: GEARS.candle, weight: Weight(0), cost: Money(C(1)), },
  { name: GEARS.bottleGlass, weight: Weight(1000), cost: Money(G(2)), },
  { name: GEARS.lock, weight: Weight(500), cost: Money(G(10)), },
  { name: GEARS.quiver, weight: Weight(500), cost: Money(G(1)), },
  { name: GEARS.map, weight: Weight(0), cost: Money(G(1)), },
  { name: GEARS.chain, weight: Weight(5000), cost: Money(G(5)), },
  { name: GEARS.caltrops, weight: Weight(1000), cost: Money(G(1)), },
  { name: GEARS.bell, weight: Weight(0), cost: Money(G(1)), },
  { name: GEARS.chest, weight: Weight(12500), cost: Money(G(5)), },
  { name: GEARS.rope, weight: Weight(2500), cost: Money(G(1)), },
  { name: GEARS.costume, weight: Weight(2000), cost: Money(G(5)), },
  { name: GEARS.blanket, weight: Weight(1500), cost: Money(S(5)), },
  { name: GEARS.jug, weight: Weight(2000), cost: Money(C(2)), },
  { name: GEARS.holyWater, weight: Weight(500), cost: Money(G(25)), },
  { name: GEARS.ladder, weight: Weight(12500), cost: Money(S(1)), },
  { name: GEARS.ink, weight: Weight(0), cost: Money(G(10)), },
  { name: GEARS.caseMapOrScroll, weight: Weight(500), cost: Money(G(1)), },
  { name: GEARS.caseCrossbowBolt, weight: Weight(500), cost: Money(G(1)), },
  { name: GEARS.alchemistsFire, weight: Weight(500), cost: Money(G(50)), },
  { name: GEARS.string, weight: Weight(0), cost: Money(S(1)), },
  { name: GEARS.net, weight: Weight(1500), cost: Money(G(1)), },
  { name: GEARS.vial, weight: Weight(0), cost: Money(G(1)), },
  { name: GEARS.flask, weight: Weight(500), cost: Money(C(2)), },
  {
    name: GEARS.arcaneFocus, variants: [
      { name: 'crystal', weight: Weight(500), cost: Money(G(10)), },
      { name: 'orb', weight: Weight(1500), cost: Money(G(20)), },
      { name: 'rod', weight: Weight(1000), cost: Money(G(10)), },
      { name: 'staff', weight: Weight(2000), cost: Money(G(5)), },
      { name: 'wand', weight: Weight(500), cost: Money(G(10)), },
    ],
  },
  {
    name: GEARS.druidicFocus, variants: [
      { name: 'sprigOfMistletoe', weight: Weight(500), cost: Money(G(10)), },
      { name: 'woodenStaff', weight: Weight(2000), cost: Money(G(5)), },
      { name: 'yewWand', weight: Weight(0), cost: Money(G(1)), },
    ]
  },
  { name: GEARS.grapplingHook, weight: Weight(2000), cost: Money(G(2)), },
  { name: GEARS.oil, weight: Weight(500), cost: Money(S(1)), },
  { name: GEARS.lamp, weight: Weight(500), cost: Money(S(5)), },
  { name: GEARS.lanternHooded, weight: Weight(1000), cost: Money(G(5)), },
  { name: GEARS.lanternBullseye, weight: Weight(1000), cost: Money(G(10)), },
  { name: GEARS.book, weight: Weight(2500), cost: Money(G(25)), },
  { name: GEARS.spyglass, weight: Weight(500), cost: Money(G(1000)), },
  { name: GEARS.magnifyingGlass, weight: Weight(0), cost: Money(G(100)), },
  { name: GEARS.climbersKit, weight: Weight(6000), cost: Money(G(25)), },
  { name: GEARS.manacles, weight: Weight(3000), cost: Money(G(2)), },
  { name: GEARS.mirror, weight: Weight(250), cost: Money(G(5)), },
  {
    name: GEARS.ammunition, variants: [
      { name: [WEAPON_AMMUNITION.Arrows], weight: Weight(500), cost: Money(G(1)), quantity: 20, storage: GEARS.quiver, },
      { name: [WEAPON_AMMUNITION.Bolts], weight: Weight(750), cost: Money(G(1)), quantity: 20, storage: GEARS.caseCrossbowBolt, },
      { name: [WEAPON_AMMUNITION.SlingBullets], weight: Weight(750), cost: Money(C(4)), quantity: 20, storage: GEARS.pouch, },
      { name: [WEAPON_AMMUNITION.FirearmBullets], weight: Weight(1000), cost: Money(G(3)), quantity: 10, storage: GEARS.pouch, },
      { name: [WEAPON_AMMUNITION.Needles], weight: Weight(500), cost: Money(G(1)), quantity: 50, storage: GEARS.pouch, },
    ],
  },
  { name: GEARS.waterskin, weight: Weight(2500), cost: Money(S(2)), },
  { name: GEARS.blockAndTackle, weight: Weight(2500), cost: Money(G(1)), },
  { name: GEARS.basket, weight: Weight(1000), cost: Money(S(4)), },
  { name: GEARS.paper, weight: Weight(0), cost: Money(S(2)), },
  { name: GEARS.burglarsPack, weight: Weight(21000), cost: Money(G(16)), },
  { name: GEARS.diplomatsPack, weight: Weight(19500), cost: Money(G(39)), },
  { name: GEARS.entertainersPack, weight: Weight(29000), cost: Money(G(40)), },
  { name: GEARS.priestsPack, weight: Weight(14500), cost: Money(G(33)), },
  { name: GEARS.scholarsPack, weight: Weight(11000), cost: Money(G(40)), },
  { name: GEARS.explorersPack, weight: Weight(27500), cost: Money(G(10)), },
  { name: GEARS.dungeoneersPack, weight: Weight(27500), cost: Money(G(12)), },
  { name: GEARS.parchment, weight: Weight(0), cost: Money(S(1)), },
  {
    name: GEARS.spellScroll, weight: Weight(0), cost: Money(G(30)),
    options: [
      { name: 'canTrip', cost: Money(G(30)), },
      { name: 'level1', cost: Money(G(50),) },
    ]
  },
  { name: GEARS.perfume, weight: Weight(0), cost: Money(G(5)), },
  { name: GEARS.shovel, weight: Weight(2500), cost: Money(G(2)), },
  { name: GEARS.pole, weight: Weight(3500), cost: Money(C(5)), },
  { name: GEARS.crowbar, weight: Weight(2500), cost: Money(G(2)), },
  { name: GEARS.huntingTrap, weight: Weight(12500), cost: Money(G(5)), },
  { name: GEARS.spikesIron, weight: Weight(2500), cost: Money(G(1)), },
  { name: GEARS.poisonBasic, weight: Weight(0), cost: Money(G(100)), },
  { name: GEARS.inkPen, weight: Weight(0), cost: Money(C(2)), },
  { name: GEARS.potIron, weight: Weight(5000), cost: Money(G(2)), },
  { name: GEARS.potionOfHealing, weight: Weight(250), cost: Money(G(50)), },
  { name: GEARS.rations, weight: Weight(1000), cost: Money(S(5)), },
  { name: GEARS.robe, weight: Weight(2000), cost: Money(G(1)), },
  { name: GEARS.sack, weight: Weight(250), cost: Money(C(1)), },
  { name: GEARS.backpack, weight: Weight(2500), cost: Money(G(2)), },
  { name: GEARS.bedroll, weight: Weight(3500), cost: Money(G(1)), },
  { name: GEARS.pouch, weight: Weight(500), cost: Money(S(5)), },
  { name: GEARS.componentPouch, weight: Weight(1000), cost: Money(G(25)), },
  { name: GEARS.bucket, weight: Weight(1000), cost: Money(C(5)), },
  { name: GEARS.signalWhistle, weight: Weight(0), cost: Money(C(5)), },
  { name: GEARS.holySymbol, weight: 'Variable', cost: 'Variable', },
  { name: GEARS.tent, weight: Weight(10000), cost: Money(G(2)), },
  { name: GEARS.clothesTravelers, weight: Weight(2000), cost: Money(G(2)), },
  { name: GEARS.barrel, weight: Weight(35000), cost: Money(G(2)), },
  { name: GEARS.torch, weight: Weight(500), cost: Money(C(1)), },
  { name: GEARS.healersKit, weight: Weight(1500), cost: Money(G(5)), },
])

const magicItems = f([
  /**
   * effect and condition function are called with `.call(magicItem, [props...])` method allowing `this` access to current magicItem
   * this function should stay explicit `function` and not arrowed `=>` to keep `this` features (unless `this` is useless)
   * `this` could be modified by user / char. So, accessing `this.hasAttunement` could be true
   * 
   *  magicalItemName: f({
   *    requireAttunement: true, // should be attuned
   *    hasAttunement: false, // default attuned status
   *    condition: function (props) { }, // Condition to equip
   *    type: EQUIPMENT_TYPE, // 
   *    category: MAGIC_ITEM_TYPE, // type - to display effect
   *    equipOn: EQUIPED_CATEGORY // category determine if it override an equiped item like an armor
   *    modifiers: {
   *      [EFFECT.ACModifierEffect]: { // TODO: add to common
   *        condition: function (props) { }, // To apply effect
   *        apply: function (props) { },
   *      },
   *    },
   *  }),
   */
  f({
    name: 'cloakOfProtection',
    requireAttunement: true,
    hasAttunement: false,
    condition: function () { true }, // TODO: can equip
    category: MAGIC_ITEM_TYPE.wondrousItem,
    equipOn: EQUIPED_CATEGORY.OTHER,
    effects: {
      [EFFECT.ACModifierEffect]: {
        condition: function () { return !this.requireAttunement || this.hasAttunement }, // To apply effect
        apply: ({ ac }) => ac + 1,
      },
      [EFFECT.SavesModifierEffect]: { apply: ({ modifiers }) => Object.entries(modifiers).reduce((acc, [name, modifier]) => ({ ...acc, [name]: modifier + 1 }), {}) },
    },
  }),
])

const equipments = []
  .concat(weapons.map(item => Object.assign({}, item, { type: EQUIPMENT_TYPE.WEAPON })))
  .concat(armors.map(item => Object.assign({}, item, { type: EQUIPMENT_TYPE.ARMOR })))
  .concat(shields.map(item => Object.assign({}, item, { type: EQUIPMENT_TYPE.SHIELD })))
  .concat(tools.map(item => Object.assign({}, item, { type: EQUIPMENT_TYPE.TOOL })))
  .concat(gears.map(item => Object.assign({}, item, { type: EQUIPMENT_TYPE.GEAR })))
  .concat(magicItems.map(item => Object.assign({}, item, { type: EQUIPMENT_TYPE.MAGIC_ITEM })))

export function getEquipments({ type }) { return equipments.filter(equipment => equipment.type === type) }
export function getWeapons() { return getEquipments({ type: EQUIPMENT_TYPE.WEAPON }) }
export function getEquipment(name) { return equipments.find(equipment => equipment.name === name) }
