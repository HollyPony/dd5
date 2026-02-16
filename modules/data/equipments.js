import { Enum } from '../enum.js'
import { f } from '../helpers.js'
import {
  ABILITIES, DICES, DICE, EFFECTS,
}
  from '../common.js'
import { Money, GOLD as G, SILVER as S, COPPER as C } from './money.js'
import { Weight } from './weight.js'

export const EQUIPMENT_TYPE = Enum({
  WEAPON: Symbol.for('EQUIPMENT_TYPE.WEAPON'),
  ARMOR: Symbol.for('EQUIPMENT_TYPE.ARMOR'),
  SHIELD: Symbol.for('EQUIPMENT_TYPE.SHIELD'),
  TOOL: Symbol.for('EQUIPMENT_TYPE.TOOL'),
  GEAR: Symbol.for('EQUIPMENT_TYPE.GEAR'),
  MAGIC_ITEM: Symbol.for('EQUIPMENT_TYPE.MAGIC_ITEM'),
})

export const EQUIPED_CATEGORY = Enum({
  WEAPON: Symbol.for('EQUIPED_CATEGORY.WEAPON'),
  ARMOR: Symbol.for('EQUIPED_CATEGORY.ARMOR'),
  SHIELD: Symbol.for('EQUIPED_CATEGORY.SHIELD'),
  OTHER: Symbol.for('EQUIPED_CATEGORY.OTHER'),
})

export const WEAPON_CATEGORY = Enum({
  simpleMelee: Symbol.for('WEAPON_CATEGORY.simpleMelee'), // Armes courantes de corps à corps
  simpleRanged: Symbol.for('WEAPON_CATEGORY.simpleRanged'), // Armes courantes à distance
  martialMelee: Symbol.for('WEAPON_CATEGORY.martialMelee'), // Armes de guerre de corps à corps
  martialRanged: Symbol.for('WEAPON_CATEGORY.martialRanged'), // Armes de guerre à distance
})

export const WEAPON_DAMAGE_TYPE = Enum({
  piercing: Symbol.for('WEAPON_DAMAGE_TYPE.piercing'), // Perforant
  slashing: Symbol.for('WEAPON_DAMAGE_TYPE.slashing'), // Tranchant
  bludgeoning: Symbol.for('WEAPON_DAMAGE_TYPE.bludgeoning'), // Contondant
})

export const WEAPON_PROPERTY = Enum({ // P.214 - Propriété
  Ammunition: Symbol.for('WEAPON_PROPERTY.Ammunition'),
  Finesse: Symbol.for('WEAPON_PROPERTY.Finesse'),
  Heavy: Symbol.for('WEAPON_PROPERTY.Heavy'),
  Light: Symbol.for('WEAPON_PROPERTY.Light'),
  Loading: Symbol.for('WEAPON_PROPERTY.Loading'),
  Range: Symbol.for('WEAPON_PROPERTY.Range'),
  Reach: Symbol.for('WEAPON_PROPERTY.Reach'),
  Thrown: Symbol.for('WEAPON_PROPERTY.Thrown'),
  TwoHanded: Symbol.for('WEAPON_PROPERTY.TwoHanded'),
  Versatile: Symbol.for('WEAPON_PROPERTY.Versatile'),
})

export const WEAPON_AMMUNITION = Enum({
  Arrows: Symbol.for('WEAPON_AMMUNITION.Arrows'),
  Bolts: Symbol.for('WEAPON_AMMUNITION.Bolts'),
  SlingBullet: Symbol.for('WEAPON_AMMUNITION.SlingBullets'),
  FirearmBullets: Symbol.for('WEAPON_AMMUNITION.FirearmBullets'),
  Needles: Symbol.for('WEAPON_AMMUNITION.Needles'),
})

export const WEAPON_MASTERY = Enum({ // Bottes P.215
  Cleave: Symbol.for('WEAPON_MASTERY.Cleave'),
  Graze: Symbol.for('WEAPON_MASTERY.Graze'),
  Nick: Symbol.for('WEAPON_MASTERY.Nick'),
  Push: Symbol.for('WEAPON_MASTERY.Push'),
  Sap: Symbol.for('WEAPON_MASTERY.Sap'),
  Slow: Symbol.for('WEAPON_MASTERY.Slow'),
  Topple: Symbol.for('WEAPON_MASTERY.Topple'),
  Vex: Symbol.for('WEAPON_MASTERY.Vex'),
})

export const ARMOR_CATEGORY = Enum({ // P.220
  Light: Symbol.for('ARMOR_CATEGORY.Light'),
  Medium: Symbol.for('ARMOR_CATEGORY.Medium'),
  Heavy: Symbol.for('ARMOR_CATEGORY.Heavy'),
})

export const TOOL_CATEGORY = Enum({ // P.221
  Artisan: Symbol.for('TOOL_CATEGORY.Artisan'),
  MusicalInstrument: Symbol.for('TOOL_CATEGORY.MusicalInstrument'),
  Other: Symbol.for('TOOL_CATEGORY.Other'), // P.222
})

export const INSTRUMENTS = Enum({
  bagpipes: Symbol.for('INSTRUMENTS.bagpipes'),
  drum: Symbol.for('INSTRUMENTS.drum'),
  dulcimer: Symbol.for('INSTRUMENTS.dulcimer'),
  flute: Symbol.for('INSTRUMENTS.flute'),
  horn: Symbol.for('INSTRUMENTS.horn'),
  lute: Symbol.for('INSTRUMENTS.lute'),
  lyre: Symbol.for('INSTRUMENTS.lyre'),
  panFlute: Symbol.for('INSTRUMENTS.panFlute'),
  shawm: Symbol.for('INSTRUMENTS.shawm'),
  viol: Symbol.for('INSTRUMENTS.viol'),
})

export const MAGIC_ITEM_TYPE = Enum({
  armor: Symbol.for('MAGIC_ITEM_TYPE.armor'), // Armure
  potion: Symbol.for('MAGIC_ITEM_TYPE.potion'), // Potion
  ring: Symbol.for('MAGIC_ITEM_TYPE.ring'), // Anneau
  scroll: Symbol.for('MAGIC_ITEM_TYPE.scroll'), // Parchemin
  staff: Symbol.for('MAGIC_ITEM_TYPE.staff'), // Bâton
  wand: Symbol.for('MAGIC_ITEM_TYPE.wand'), // Baguette
  weapon: Symbol.for('MAGIC_ITEM_TYPE.weapon'), // Arme
  wondrousItem: Symbol.for('MAGIC_ITEM_TYPE.wondrousItem'), // Objet merveilleux
  rod: Symbol.for('MAGIC_ITEM_TYPE.rod'), // Sceptre
})

const WEAPONS = Enum({
  quarterstaff: Symbol.for('WEAPONS.quarterstaff'),
  dagger: Symbol.for('WEAPONS.dagger'),
  club: Symbol.for('WEAPONS.club'),
  handaxe: Symbol.for('WEAPONS.handaxe'),
  javelin: Symbol.for('WEAPONS.javelin'),
  spear: Symbol.for('WEAPONS.spear'),
  lightHammer: Symbol.for('WEAPONS.lightHammer'),
  mace: Symbol.for('WEAPONS.mace'),
  greatclub: Symbol.for('WEAPONS.greatclub'),
  sickle: Symbol.for('WEAPONS.sickle'),
  lightCrossbow: Symbol.for('WEAPONS.lightCrossbow'),
  shortbow: Symbol.for('WEAPONS.shortbow'),
  dart: Symbol.for('WEAPONS.dart'),
  sling: Symbol.for('WEAPONS.sling'),
  scimitar: Symbol.for('WEAPONS.scimitar'),
  glaive: Symbol.for('WEAPONS.glaive'),
  greatSword: Symbol.for('WEAPONS.greatSword'),
  shortSword: Symbol.for('WEAPONS.shortSword'),
  longSword: Symbol.for('WEAPONS.longSword'),
  flail: Symbol.for('WEAPONS.flail'),
  whip: Symbol.for('WEAPONS.whip'),
  gretAxe: Symbol.for('WEAPONS.gretAxe'),
  battleAxe: Symbol.for('WEAPONS.battleAxe'),
  halberd: Symbol.for('WEAPONS.halberd'),
  lance: Symbol.for('WEAPONS.lance'),
  maul: Symbol.for('WEAPONS.maul'),
  warhammer: Symbol.for('WEAPONS.warhammer'),
  morningstar: Symbol.for('WEAPONS.morningstar'),
  warPick: Symbol.for('WEAPONS.warPick'),
  pike: Symbol.for('WEAPONS.pike'),
  rapier: Symbol.for('WEAPONS.rapier'),
  trident: Symbol.for('WEAPONS.trident'),
  handCrossbow: Symbol.for('WEAPONS.handCrossbow'),
  heavyCrossbow: Symbol.for('WEAPONS.heavyCrossbow'),
  longbow: Symbol.for('WEAPONS.longbow'),
  musket: Symbol.for('WEAPONS.musket'),
  pistol: Symbol.for('WEAPONS.pistol'),
  blowgun: Symbol.for('WEAPONS.blowgun'),
})

const ARMORS = Enum({
  padded: Symbol.for('ARMORS.padded'),
  leather: Symbol.for('ARMORS.leather'),
  studdedLeather: Symbol.for('ARMORS.studdedLeather'),
  hideArmor: Symbol.for('ARMORS.hideArmor'),
  chainShirt: Symbol.for('ARMORS.chainShirt'),
  scaleMail: Symbol.for('ARMORS.scaleMail'),
  breastplate: Symbol.for('ARMORS.breastplate'),
  halfPlate: Symbol.for('ARMORS.halfPlate'),
  ringMail: Symbol.for('ARMORS.ringMail'),
  chainMail: Symbol.for('ARMORS.chainMail'),
  splint: Symbol.for('ARMORS.splint'),
  plate: Symbol.for('ARMORS.plate'),
})

const SHIELDS = Enum({
  shield: Symbol.for('SHIELDS.shield'),
})

export const TOOLS = Enum({
  alchemistsSupplies: Symbol.for('TOOLS.alchemistsSupplies'),
  brewersSupplies: Symbol.for('TOOLS.brewersSupplies'),
  calligraphersSupplies: Symbol.for('TOOLS.calligraphersSupplies'),
  carpentersTools: Symbol.for('TOOLS.carpentersTools'),
  cartographersToolTools: Symbol.for('TOOLS.cartographersToolTools'),
  cobblersTools: Symbol.for('TOOLS.cobblersTools'),
  cooksTools: Symbol.for('TOOLS.cooksTools'),
  glassblowersTools: Symbol.for('TOOLS.glassblowersTools'),
  jewelersTools: Symbol.for('TOOLS.jewelersTools'),
  leatherworkersTools: Symbol.for('TOOLS.leatherworkersTools'),
  masonsTools: Symbol.for('TOOLS.masonsTools'),
  paintersTools: Symbol.for('TOOLS.paintersTools'),
  pottersTools: Symbol.for('TOOLS.pottersTools'),
  smithsTools: Symbol.for('TOOLS.smithsTools'),
  tinkersTools: Symbol.for('TOOLS.tinkersTools'),
  weaversTools: Symbol.for('TOOLS.weaversTools'),
  woodcarversTools: Symbol.for('TOOLS.woodcarversTools'),

  disguiseKit: Symbol.for('TOOLS.disguiseKit'),
  forgeryKit: Symbol.for('TOOLS.forgeryKit'),
  gamingSet: Symbol.for('TOOLS.gamingSet'),
  herbalismKit: Symbol.for('TOOLS.herbalismKit'),
  bagpipes: Symbol.for('TOOLS.bagpipes'),
  drum: Symbol.for('TOOLS.drum'),
  dulcimer: Symbol.for('TOOLS.dulcimer'),
  flute: Symbol.for('TOOLS.flute'),
  horn: Symbol.for('TOOLS.horn'),
  lute: Symbol.for('TOOLS.lute'),
  lyre: Symbol.for('TOOLS.lyre'),
  panFlute: Symbol.for('TOOLS.panFlute'),
  shawm: Symbol.for('TOOLS.shawm'),
  viol: Symbol.for('TOOLS.viol'),
  navigatorsTools: Symbol.for('TOOLS.navigatorsTools'),
  poisonersKit: Symbol.for('TOOLS.poisonersKit'),
  thievesTools: Symbol.for('TOOLS.thievesTools'),
})

const GEARS = Enum({
  acid: Symbol.for('GEARS.acid'),
  antitoxin: Symbol.for('GEARS.antitoxin'),
  clothesFine: Symbol.for('GEARS.clothesFine'),
  ramPortable: Symbol.for('GEARS.ramPortable'),
  ballBearings: Symbol.for('GEARS.ballBearings'),
  tinderbox: Symbol.for('GEARS.tinderbox'),
  candle: Symbol.for('GEARS.candle'),
  bottleGlass: Symbol.for('GEARS.bottleGlass'),
  lock: Symbol.for('GEARS.lock'),
  quiver: Symbol.for('GEARS.quiver'),
  map: Symbol.for('GEARS.map'),
  chain: Symbol.for('GEARS.chain'),
  caltrops: Symbol.for('GEARS.caltrops'),
  bell: Symbol.for('GEARS.bell'),
  chest: Symbol.for('GEARS.chest'),
  rope: Symbol.for('GEARS.rope'),
  costume: Symbol.for('GEARS.costume'),
  blanket: Symbol.for('GEARS.blanket'),
  jug: Symbol.for('GEARS.jug'),
  holyWater: Symbol.for('GEARS.holyWater'),
  ladder: Symbol.for('GEARS.ladder'),
  ink: Symbol.for('GEARS.ink'),
  caseMapOrScroll: Symbol.for('GEARS.caseMapOrScroll'),
  caseCrossbowBolt: Symbol.for('GEARS.caseCrossbowBolt'),
  alchemistsFire: Symbol.for('GEARS.alchemistsFire'),
  string: Symbol.for('GEARS.string'),
  net: Symbol.for('GEARS.net'),
  vial: Symbol.for('GEARS.vial'),
  flask: Symbol.for('GEARS.flask'),
  arcaneFocus: Symbol.for('GEARS.arcaneFocus'),
  druidicFocus: Symbol.for('GEARS.druidicFocus'),
  grapplingHook: Symbol.for('GEARS.grapplingHook'),
  oil: Symbol.for('GEARS.oil'),
  lamp: Symbol.for('GEARS.lamp'),
  lanternHooded: Symbol.for('GEARS.lanternHooded'),
  lanternBullseye: Symbol.for('GEARS.lanternBullseye'),
  book: Symbol.for('GEARS.book'),
  spyglass: Symbol.for('GEARS.spyglass'),
  magnifyingGlass: Symbol.for('GEARS.magnifyingGlass'),
  climbersKit: Symbol.for('GEARS.climbersKit'),
  manacles: Symbol.for('GEARS.manacles'),
  mirror: Symbol.for('GEARS.mirror'),
  ammunition: Symbol.for('GEARS.ammunition'),
  waterskin: Symbol.for('GEARS.waterskin'),
  blockAndTackle: Symbol.for('GEARS.blockAndTackle'),
  basket: Symbol.for('GEARS.basket'),
  paper: Symbol.for('GEARS.paper'),
  burglarsPack: Symbol.for('GEARS.burglarsPack'),
  diplomatsPack: Symbol.for('GEARS.diplomatsPack'),
  entertainersPack: Symbol.for('GEARS.entertainersPack'),
  priestsPack: Symbol.for('GEARS.priestsPack'),
  scholarsPack: Symbol.for('GEARS.scholarsPack'),
  explorersPack: Symbol.for('GEARS.explorersPack'),
  dungeoneersPack: Symbol.for('GEARS.dungeoneersPack'),
  parchment: Symbol.for('GEARS.parchment'),
  spellScroll: Symbol.for('GEARS.spellScroll'),
  perfume: Symbol.for('GEARS.perfume'),
  shovel: Symbol.for('GEARS.shovel'),
  pole: Symbol.for('GEARS.pole'),
  crowbar: Symbol.for('GEARS.crowbar'),
  huntingTrap: Symbol.for('GEARS.huntingTrap'),
  spikesIron: Symbol.for('GEARS.spikesIron'),
  poisonBasic: Symbol.for('GEARS.poisonBasic'),
  inkPen: Symbol.for('GEARS.inkPen'),
  potIron: Symbol.for('GEARS.potIron'),
  potionOfHealing: Symbol.for('GEARS.potionOfHealing'),
  rations: Symbol.for('GEARS.rations'),
  robe: Symbol.for('GEARS.robe'),
  sack: Symbol.for('GEARS.sack'),
  backpack: Symbol.for('GEARS.backpack'),
  bedroll: Symbol.for('GEARS.bedroll'),
  pouch: Symbol.for('GEARS.pouch'),
  componentPouch: Symbol.for('GEARS.componentPouch'),
  bucket: Symbol.for('GEARS.bucket'),
  signalWhistle: Symbol.for('GEARS.signalWhistle'),
  holySymbol: Symbol.for('GEARS.holySymbol'),
  tent: Symbol.for('GEARS.tent'),
  clothesTravelers: Symbol.for('GEARS.clothesTravelers'),
  barrel: Symbol.for('GEARS.barrel'),
  torch: Symbol.for('GEARS.torch'),
  healersKit: Symbol.for('GEARS.healersKit'),
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
        type: WEAPON_AMMUNITION.Bolts,
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
        type: WEAPON_AMMUNITION.Arrows,
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
        type: WEAPON_AMMUNITION.Bolts,
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
        type: WEAPON_AMMUNITION.Bolts,
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
      [EFFECTS.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 11 + modifiers[ABILITIES.dexterity],
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
      [EFFECTS.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 11 + modifiers[ABILITIES.dexterity],
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
      [EFFECTS.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 12 + modifiers[ABILITIES.dexterity],
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
      [EFFECTS.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 12 + Math.min(modifiers[ABILITIES.dexterity], 2),
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
      [EFFECTS.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 13 + Math.min(modifiers[ABILITIES.dexterity], 2),
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
      [EFFECTS.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 14 + Math.min(modifiers[ABILITIES.dexterity], 2),
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
      [EFFECTS.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 14 + Math.min(modifiers[ABILITIES.dexterity], 2),
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
      [EFFECTS.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 15 + Math.min(modifiers[ABILITIES.dexterity], 2),
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
      [EFFECTS.ACOverrideEffect]: {
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
      [EFFECTS.ACOverrideEffect]: {
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
      [EFFECTS.ACOverrideEffect]: {
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
      [EFFECTS.ACOverrideEffect]: {
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
      [EFFECTS.ACModifierEffect]: {
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
    ability: ABILITIES.intelligence,
    weight: Weight(4000),
    cost: Money(G(5)),
    crafts: [GEARS.acid, GEARS.alchemistsFire, GEARS.componentPouch, GEARS.oil, GEARS.paper, GEARS.perfume,],
  },
  {
    name: TOOLS.brewersSupplies,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITIES.intelligence,
    weight: Weight(4500),
    cost: Money(G(20)),
    crafts: [GEARS.antitoxin,],
  },
  {
    name: TOOLS.calligraphersSupplies,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITIES.dexterity,
    weight: Weight(2500),
    cost: Money(G(10)),
    crafts: [GEARS.ink, GEARS.spellScroll,],
  },
  {
    name: TOOLS.carpentersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITIES.strength,
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
    ability: ABILITIES.wisdom,
    weight: Weight(3000),
    cost: Money(G(15)),
    crafts: [GEARS.map,],
  },
  {
    name: TOOLS.cobblersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITIES.dexterity,
    weight: Weight(2500),
    cost: Money(G(5)),
    crafts: [GEARS.climbersKit,],
  },
  {
    name: TOOLS.cooksTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITIES.wisdom,
    weight: Weight(4000),
    cost: Money(G(1)),
    crafts: [GEARS.rations,],
  },
  {
    name: TOOLS.glassblowersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITIES.intelligence,
    weight: Weight(2500),
    cost: Money(G(30)),
    crafts: [GEARS.bottleGlass, GEARS.magnifyingGlass, GEARS.spyglass, GEARS.vial],
  },
  {
    name: TOOLS.jewelersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITIES.intelligence,
    weight: Weight(1000),
    cost: Money(G(25)),
    crafts: [GEARS.arcaneFocus, GEARS.holySymbol,],
  },
  {
    name: TOOLS.leatherworkersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITIES.dexterity,
    weight: Weight(2500),
    cost: Money(G(5)),
    crafts: [
      WEAPONS.whip, WEAPONS.sling,
      ARMORS.leather, ARMORS.studdedLeather, ARMORS.hideArmor,
      GEARS.quiver, GEARS.caseCrossbowBolt, GEARS.caseMapOrScroll,
      GEARS.waterskin, GEARS.spellScroll, GEARS.pouch, GEARS.backpack,
    ],
  },
  {
    name: TOOLS.masonsTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITIES.strength,
    weight: Weight(4000),
    cost: Money(G(10)),
    crafts: [GEARS.blockAndTackle,],
  },
  {
    name: TOOLS.paintersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITIES.wisdom,
    weight: Weight(2500),
    cost: Money(G(10)),
    crafts: [GEARS.druidicFocus, GEARS.holySymbol,]
  },
  {
    name: TOOLS.pottersTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITIES.intelligence,
    weight: Weight(1500),
    cost: Money(G(10)),
    crafts: [GEARS.jug, GEARS.lamp,],
  },
  {
    name: TOOLS.smithsTools,
    category: TOOL_CATEGORY.Artisan,
    ability: ABILITIES.strength,
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
    ability: ABILITIES.dexterity,
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
    ability: ABILITIES.dexterity,
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
    ability: ABILITIES.dexterity,
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
    ability: ABILITIES.charisma,
    weight: Weight(1500),
    cost: Money(G(25)),
  },
  {
    name: TOOLS.forgeryKit,
    category: TOOL_CATEGORY.Other,
    ability: ABILITIES.dexterity,
    weight: Weight(2500),
    cost: Money(G(15)),
  },
  {
    name: TOOLS.gamingSet,
    category: TOOL_CATEGORY.Other,
    ability: ABILITIES.wisdom,
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
    ability: ABILITIES.intelligence,
    weight: Weight(1500),
    cost: Money(G(5)),
    crafts: [GEARS.antitoxin, GEARS.candle, GEARS.healersKit, GEARS.potionOfHealing,],
  },
  {
    name: TOOLS.bagpipes,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITIES.charisma,
    weight: Weight(3000),
    cost: Money(G(30)),
  },
  {
    name: TOOLS.drum,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITIES.charisma,
    weight: Weight(1500),
    cost: Money(G(6)),
  },
  {
    name: TOOLS.dulcimer,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITIES.charisma,
    weight: Weight(5000),
    cost: Money(G(25)),
  },
  {
    name: TOOLS.flute,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITIES.charisma,
    weight: Weight(500),
    cost: Money(G(2)),
  },
  {
    name: TOOLS.horn,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITIES.charisma,
    weight: Weight(1000),
    cost: Money(G(3)),
  },
  {
    name: TOOLS.lute,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITIES.charisma,
    weight: Weight(1000),
    cost: Money(G(35)),
  },
  {
    name: TOOLS.lyre,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITIES.charisma,
    weight: Weight(1000),
    cost: Money(G(30)),
  },
  {
    name: TOOLS.panFlute,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITIES.charisma,
    weight: Weight(1000),
    cost: Money(G(12)),
  },
  {
    name: TOOLS.shawm,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITIES.charisma,
    weight: Weight(500),
    cost: Money(G(2)),
  },
  {
    name: TOOLS.viol,
    category: TOOL_CATEGORY.MusicalInstrument,
    ability: ABILITIES.charisma,
    weight: Weight(500),
    cost: Money(G(30)),
  },
  {
    name: TOOLS.navigatorsTools,
    category: TOOL_CATEGORY.Other,
    ability: ABILITIES.wisdom,
    weight: Weight(1000),
    cost: Money(G(25)),
  },
  {
    name: TOOLS.poisonersKit,
    category: TOOL_CATEGORY.Other,
    ability: ABILITIES.intelligence,
    weight: Weight(1000),
    cost: Money(G(50)),
    crafts: [GEARS.poisonBasic]
  },
  {
    name: TOOLS.thievesTools,
    category: TOOL_CATEGORY.Other,
    ability: ABILITIES.dexterity,
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
      { name: [WEAPON_AMMUNITION.SlingBullet], weight: Weight(750), cost: Money(C(4)), quantity: 20, storage: GEARS.pouch, },
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
   *      [EFFECTS.ACModifierEffect]: { // TODO: add to common
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
      [EFFECTS.ACModifierEffect]: {
        condition: function () { return !this.requireAttunement || this.hasAttunement }, // To apply effect
        apply: ({ ac }) => ac + 1,
      },
      [EFFECTS.SavesModifierEffect]: {
        apply: ({ modifiers }) => Reflect.ownKeys(modifiers).reduce((acc, ability) => {
          acc[ability] = modifiers[ability] + 1
          return acc
        }, {})
      },
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
