import { f, Enum, } from '../helpers.js'
import {
  ABILITY, D, DICE, EFFECT,
}
  from '../common.js'

export const EQUIPMENT_TYPE = Enum({
  WEAPON: 'EQUIPMENT_TYPE.WEAPON',
  ARMOR: 'EQUIPMENT_TYPE.ARMOR',
  SHIELD: 'EQUIPMENT_TYPE.SHIELD',
  TOOL: 'EQUIPMENT_TYPE.TOOL',
  GEAR: 'EQUIPMENT_TYPE.GEAR',
  MAGIC_ITEM: 'EQUIPMENT_TYPE.MAGIC_ITEM',
})

export const EQUIPED_CATEGORY = Enum({
  WEAPON: 'EQUIPED_CATEGORY.WEAPON',
  ARMOR: 'EQUIPED_CATEGORY.ARMOR',
  SHIELD: 'EQUIPED_CATEGORY.SHIELD',
  OTHER: 'EQUIPED_CATEGORY.OTHER',
})

export const WEAPON_CATEGORY = Enum({
  simpleMelee: 'WEAPON_CATEGORY.simpleMelee', // Armes courantes de corps à corps
  simpleRanged: 'WEAPON_CATEGORY.simpleRanged', // Armes courantes à distance
  martialMelee: 'WEAPON_CATEGORY.martialMelee', // Armes de guerre de corps à corps
  martialRanged: 'WEAPON_CATEGORY.martialRanged', // Armes de guerre à distance
})

export const WEAPON_DAMAGE_TYPE = Enum({
  piercing: 'WEAPON_DAMAGE_TYPE.piercing', // Perforant
  slashing: 'WEAPON_DAMAGE_TYPE.slashing', // Tranchant
  bludgeoning: 'WEAPON_DAMAGE_TYPE.bludgeoning', // Contondant
})

export const WEAPON_PROPERTY = Enum({ // P.214 - Propriété
  Ammunition: 'WEAPON_PROPERTY.Ammunition',
  Finesse: 'WEAPON_PROPERTY.Finesse',
  Heavy: 'WEAPON_PROPERTY.Heavy',
  Light: 'WEAPON_PROPERTY.Light',
  Loading: 'WEAPON_PROPERTY.Loading',
  Range: 'WEAPON_PROPERTY.Range',
  Reach: 'WEAPON_PROPERTY.Reach',
  Thrown: 'WEAPON_PROPERTY.Thrown',
  TwoHanded: 'WEAPON_PROPERTY.TwoHanded',
  Versatile: 'WEAPON_PROPERTY.Versatile',
})

export const WEAPON_AMMUNITION = Enum({
  Arrows: 'WEAPON_AMMUNITION.Arrow',
  Bolts: 'WEAPON_AMMUNITION.Bolt',
  Bullets: 'WEAPON_AMMUNITION.SlingBullets',
  Needles: 'WEAPON_AMMUNITION.Needle',
})

export const WEAPON_MASTERY = Enum({ // Bottes P.215
  Cleave: 'WEAPON_MASTERY.Cleave',
  Graze: 'WEAPON_MASTERY.Graze',
  Nick: 'WEAPON_MASTERY.Nick',
  Push: 'WEAPON_MASTERY.Push',
  Sap: 'WEAPON_MASTERY.Sap',
  Slow: 'WEAPON_MASTERY.Slow',
  Topple: 'WEAPON_MASTERY.Topple',
  Vex: 'WEAPON_MASTERY.Vex',
})

export const ARMOR_CATEGORY = Enum({ // P.220
  Light: 'ARMOR_CATEGORY.Light',
  Medium: 'ARMOR_CATEGORY.Medium',
  Heavy: 'ARMOR_CATEGORY.Heavy',
})

export const MAGIC_ITEM_TYPE = Enum({
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

const weapons = f([ // P.214
  f({
    name: 'quarterstaff',
    damage: DICE(1, D[6]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([WEAPON_PROPERTY.Versatile]),
    propertiesValues: {
      [WEAPON_PROPERTY.Versatile]: {
        // TODO: test
        condition: weapons => weapons?.length && (weapons?.[0] === this ?? false),
        damage: DICE(1, D[8]),
      },
    },
    mastery: WEAPON_MASTERY.Topple,
    weight: 2000,
    cost: 20,
  }),
  f({
    name: 'dagger',
    damage: DICE(1, D[4]),
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
    weight: 500,
    cost: 200,
  }),
  f({
    name: 'club',
    damage: DICE(1, D[4]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([WEAPON_PROPERTY.Light]),
    mastery: WEAPON_MASTERY.Slow,
    weight: 1000,
    cost: 10,
  }),
  f({
    name: 'handaxe',
    damage: DICE(1, D[6]),
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
    weight: 1000,
    cost: 500,
  }),
  f({
    name: 'javelin',
    damage: DICE(1, D[6]),
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
    weight: 1000,
    cost: 50,
  }),
  f({
    name: 'spear',
    damage: DICE(1, D[6]),
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
        damage: DICE(1, D[8]),
      },
    },
    mastery: WEAPON_MASTERY.Sap,
    weight: 1500,
    cost: 100,
  }),
  f({
    name: 'lightHammer',
    damage: DICE(1, D[4]),
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
    weight: 1000,
    cost: 200,
  }),
  f({
    name: 'mace',
    damage: DICE(1, D[6]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([]),
    mastery: WEAPON_MASTERY.Sap,
    weight: 2000,
    cost: 500,
  }),
  f({
    name: 'greatclub',
    damage: DICE(1, D[8]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([WEAPON_PROPERTY.TwoHanded]),
    mastery: WEAPON_MASTERY.Push,
    weight: 5000,
    cost: 20,
  }),
  f({
    name: 'sickle',
    damage: DICE(1, D[4]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.simpleMelee,
    properties: f([WEAPON_PROPERTY.Light]),
    mastery: WEAPON_MASTERY.Nick,
    weight: 1000,
    cost: 100,
  }),
  f({
    name: 'lightCrossbow',
    damage: DICE(1, D[8]),
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
    weight: 2500,
    cost: 2500,
  }),
  f({
    name: 'shortbow',
    damage: DICE(1, D[6]),
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
    weight: 1000,
    cost: 2500,
  }),
  f({
    name: 'dart',
    damage: DICE(1, D[4]),
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
    weight: 125,
    cost: 5,
  }),
  f({
    name: 'sling',
    damage: DICE(1, D[4]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.simpleRanged,
    properties: f([WEAPON_PROPERTY.Ammunition]),
    propertiesValues: {
      [WEAPON_PROPERTY.Ammunition]: {
        type: WEAPON_AMMUNITION.Bullets,
        range: {
          normal: 9,
          max: 36,
        }
      }
    },
    mastery: WEAPON_MASTERY.Slow,
    weight: 0,
    cost: 10,
  }),
  f({
    name: 'scimitar',
    damage: DICE(1, D[6]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Finesse, WEAPON_PROPERTY.Light]),
    mastery: WEAPON_MASTERY.Nick,
    weight: 1500,
    cost: 2500,
  }),
  f({
    name: 'glaive',
    damage: DICE(1, D[10]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Reach, WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy]),
    mastery: WEAPON_MASTERY.Graze,
    weight: 3000,
    cost: 2000,
  }),
  f({
    name: 'greatSword',
    damage: DICE(2, D[6]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy]),
    mastery: WEAPON_MASTERY.Graze,
    weight: 3000,
    cost: 5000,
  }),
  f({
    name: 'shortSword',
    damage: DICE(1, D[6]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Finesse, WEAPON_PROPERTY.Light]),
    mastery: WEAPON_MASTERY.Vex,
    weight: 1000,
    cost: 1000,
  }),
  f({
    name: 'longSword',
    damage: DICE(1, D[8]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Versatile]),
    propertiesValues: {
      [WEAPON_PROPERTY.Versatile]: {
        // TODO: test
        condition: weapons => weapons?.length && (weapons?.[0] === this ?? false),
        damage: DICE(1, D[10]),
      },
    },
    mastery: WEAPON_MASTERY.Sap,
    weight: 1500,
    cost: 1500,
  }),
  f({
    name: 'flail',
    damage: DICE(1, D[8]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([]),
    mastery: WEAPON_MASTERY.Sap,
    weight: 1000,
    cost: 1000,
  }),
  f({
    name: 'whip',
    damage: DICE(1, D[4]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Reach, WEAPON_PROPERTY.Finesse]),
    mastery: WEAPON_MASTERY.Slow,
    weight: 1500,
    cost: 200,
  }),
  f({
    name: 'gretAxe',
    damage: DICE(1, D[12]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy]),
    mastery: WEAPON_MASTERY.Cleave,
    weight: 3500,
    cost: 3000,
  }),
  f({
    name: 'battleAxe',
    damage: DICE(1, D[8]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Versatile]),
    propertiesValues: {
      [WEAPON_PROPERTY.Versatile]: {
        // TODO: test
        condition: weapons => weapons?.length && (weapons?.[0] === this ?? false),
        damage: DICE(1, D[10]),
      },
    },
    mastery: WEAPON_MASTERY.Topple,
    weight: 2000,
    cost: 1000,
  }),
  f({
    name: 'halberd',
    damage: DICE(1, D[10]),
    damageType: WEAPON_DAMAGE_TYPE.slashing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Reach, WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy]),
    mastery: WEAPON_MASTERY.Cleave,
    weight: 3000,
    cost: 2000,
  }),
  f({
    name: 'lance',
    damage: DICE(1, D[10]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialMelee,
    // TODO: execpt on horse
    properties: f([WEAPON_PROPERTY.Reach, `Deux mains (sauf à cheval)`, WEAPON_PROPERTY.Heavy]),
    mastery: WEAPON_MASTERY.Topple,
    weight: 3000,
    cost: 1000,
  }),
  f({
    name: 'maul',
    damage: DICE(2, D[6]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy]),
    mastery: WEAPON_MASTERY.Topple,
    weight: 5000,
    cost: 1000,
  }),
  f({
    name: 'warhammer',
    damage: DICE(1, D[8]),
    damageType: WEAPON_DAMAGE_TYPE.bludgeoning,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Versatile]),
    propertiesValues: {
      [WEAPON_PROPERTY.Versatile]: {
        // TODO: test
        condition: weapons => weapons?.length && (weapons?.[0] === this ?? false),
        damage: DICE(1, D[10]),
      },
    },
    mastery: WEAPON_MASTERY.Push,
    weight: 2500,
    cost: 1500,
  }),
  f({
    name: 'morningstar',
    damage: DICE(1, D[8]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([]),
    mastery: WEAPON_MASTERY.Sap,
    weight: 2000,
    cost: 1500,
  }),
  f({
    name: 'warPick',
    damage: DICE(1, D[8]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Versatile]),
    propertiesValues: {
      [WEAPON_PROPERTY.Versatile]: {
        // TODO: test
        condition: weapons => weapons?.length && (weapons?.[0] === this ?? false),
        damage: DICE(1, D[10]),
      },
    },
    mastery: WEAPON_MASTERY.Sap,
    weight: 1000,
    cost: 500,
  }),
  f({
    name: 'pike',
    damage: DICE(1, D[10]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Reach, WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Heavy]),
    mastery: WEAPON_MASTERY.Push,
    weight: 9000,
    cost: 500,
  }),
  f({
    name: 'rapier',
    damage: DICE(1, D[8]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialMelee,
    properties: f([WEAPON_PROPERTY.Finesse]),
    mastery: WEAPON_MASTERY.Vex,
    weight: 1000,
    cost: 2500,
  }),
  f({
    name: 'trident',
    damage: DICE(1, D[8]),
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
        damage: DICE(1, D[10]),
      },
    },
    mastery: WEAPON_MASTERY.Topple,
    weight: 2000,
    cost: 500,
  }),
  f({
    name: 'handCrossbow',
    damage: DICE(1, D[6]),
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
    weight: 1500,
    cost: 7500,
  }),
  f({
    name: 'heavyCrossbow',
    damage: DICE(1, D[10]),
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
    weight: 9000,
    cost: 5000,
  }),
  f({
    name: 'longbow',
    damage: DICE(1, D[8]),
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
    weight: 1000,
    cost: 5000,
  }),
  f({
    name: 'musket',
    damage: DICE(1, D[12]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialRanged,
    properties: f([WEAPON_PROPERTY.Loading, WEAPON_PROPERTY.TwoHanded, WEAPON_PROPERTY.Ammunition]),
    propertiesValues: {
      [WEAPON_PROPERTY.Ammunition]: {
        type: WEAPON_AMMUNITION.Bullets,
        range: {
          normal: 12,
          max: 32,
        }
      }
    },
    mastery: WEAPON_MASTERY.Slow,
    weight: 5000,
    cost: 50000,
  }),
  f({
    name: 'pistol',
    damage: DICE(1, D[10]),
    damageType: WEAPON_DAMAGE_TYPE.piercing,
    category: WEAPON_CATEGORY.martialRanged,
    properties: f([WEAPON_PROPERTY.Loading, WEAPON_PROPERTY.Ammunition]),
    propertiesValues: {
      [WEAPON_PROPERTY.Ammunition]: {
        type: WEAPON_AMMUNITION.Bullets,
        range: {
          normal: 9,
          max: 27,
        }
      }
    },
    mastery: WEAPON_MASTERY.Vex,
    weight: 1500,
    cost: 25000,
  }),
  f({
    name: 'blowgun',
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
    weight: 500,
    cost: 1000,
  }),
])

const armors = f([ // P.220
  f({
    name: 'padded',
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 11 + modifiers[ABILITY.dexterity],
      },
    }), strength: null,
    stealthMalus: true,
    weight: 4000, // TODO: Weight
    cost: 500,
    category: ARMOR_CATEGORY.Light,
  }),
  f({
    name: 'leather',
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 11 + modifiers[ABILITY.dexterity],
      },
    }), strength: null,
    stealthMalus: false,
    weight: 5000,
    cost: 1000,
    category: ARMOR_CATEGORY.Light,
  }),
  f({
    name: 'studdedLeather',
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 12 + modifiers[ABILITY.dexterity],
      },
    }), strength: null,
    stealthMalus: false,
    weight: 6500,
    cost: 4500,
    category: ARMOR_CATEGORY.Light,
  }),
  f({
    name: 'hideArmor',
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 12 + Math.min(modifiers[ABILITY.dexterity], 2),
      },
    }), strength: null,
    stealthMalus: false,
    weight: 6000,
    cost: 1000,
    category: ARMOR_CATEGORY.Medium,
  }),
  f({
    name: 'chainShirt',
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 13 + Math.min(modifiers[ABILITY.dexterity], 2),
      },
    }), strength: null,
    stealthMalus: false,
    weight: 10000,
    cost: 5000,
    category: ARMOR_CATEGORY.Medium,
  }),
  f({
    name: 'scaleMail',
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 14 + Math.min(modifiers[ABILITY.dexterity], 2),
      },
    }), strength: null,
    stealthMalus: true,
    weight: 22500,
    cost: 5000,
    category: ARMOR_CATEGORY.Medium,
  }),
  f({
    name: 'breastplate',
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 14 + Math.min(modifiers[ABILITY.dexterity], 2),
      },
    }), strength: null,
    stealthMalus: false,
    weight: 10000,
    cost: 40000,
    category: ARMOR_CATEGORY.Medium,
  }),
  f({
    name: 'halfPlate',
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: ({ modifiers, }) => 15 + Math.min(modifiers[ABILITY.dexterity], 2),
      },
    }), strength: null,
    stealthMalus: true,
    weight: 20000,
    cost: 75000,
    category: ARMOR_CATEGORY.Medium,
  }),
  f({
    name: 'ringMail',
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: () => 14,
      },
    }), strength: null,
    stealthMalus: true,
    weight: 20000,
    cost: 3000,
    category: ARMOR_CATEGORY.Heavy,
  }),
  f({
    name: 'chainMail',
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: () => 16,
      },
    }), strength: 13,
    stealthMalus: true,
    weight: 27500,
    cost: 7500,
    category: ARMOR_CATEGORY.Heavy,
  }),
  f({
    name: 'splint',
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: () => 17,
      },
    }), strength: 15,
    stealthMalus: true,
    weight: 30000,
    cost: 20000,
    category: ARMOR_CATEGORY.Heavy,
  }),
  f({
    name: 'plate',
    effects: f({
      [EFFECT.ACOverrideEffect]: {
        apply: () => 18,
      },
    }), strength: 15,
    stealthMalus: true,
    weight: 32500,
    cost: 150000,
    category: ARMOR_CATEGORY.Heavy,
  }),
])

const shields = f([ // P.220
  f({
    name: `shield`,
    effects: f({
      [EFFECT.ACModifierEffect]: {
        condition: ({ hasShieldProficiency }) => hasShieldProficiency,
        apply: ({ ac }) => ac + 2,
      },
    }), strength: null,
    stealthMalus: false,
    weight: 3000,
    cost: 1000,
  }),
])

const tools = f([ // P.221
  // TODO: Implement tools
])

// TODO: Handle weight / cost variables
const gears = f([ // P.223
  { name: 'acid', weight: 500, cost: 2500, },
  { name: 'antitoxin', weight: 0, cost: 5000, },
  { name: 'clothesFine', weight: 3000, cost: 1500, },
  { name: 'ramPortable', weight: 17500, cost: 400, },
  { name: 'ballBearings', weight: 1000, cost: 100, },
  { name: 'tinderbox', weight: 500, cost: 50, },
  { name: 'candle', weight: 0, cost: 1, },
  { name: 'bottleGlass', weight: 1000, cost: 200, },
  { name: 'lock', weight: 500, cost: 1000, },
  { name: 'quiver', weight: 500, cost: 100, },
  { name: 'map', weight: 0, cost: 100, },
  { name: 'chain', weight: 5000, cost: 500, },
  { name: 'caltrops', weight: 1000, cost: 100, },
  { name: 'bell', weight: 0, cost: 100, },
  { name: 'chest', weight: 12500, cost: 500, },
  { name: 'rope', weight: 2500, cost: 100, },
  { name: 'costume', weight: 2000, cost: 500, },
  { name: 'blanket', weight: 1500, cost: 50, },
  { name: 'jug', weight: 2000, cost: 2, },
  { name: 'holyWater', weight: 500, cost: 2500, },
  { name: 'ladder', weight: 12500, cost: 10, },
  { name: 'ink', weight: 0, cost: 1000, },
  { name: 'caseMapOrScroll', weight: 500, cost: 100, },
  { name: 'caseCrossbowBolt', weight: 500, cost: 100, },
  { name: 'alchemistsFire', weight: 500, cost: 5000, },
  { name: 'string', weight: 0, cost: 10, },
  { name: 'net', weight: 1500, cost: 100, },
  { name: 'vial', weight: 0, cost: 100, },
  { name: 'flask', weight: 500, cost: 2, },
  { name: 'arcaneFocus', weight: 'Variable', cost: 'Variable', },
  { name: 'druidicFocus', weight: 'Variable', cost: 'Variable', },
  { name: 'grapplingHook', weight: 2000, cost: 200, },
  { name: 'oil', weight: 500, cost: 10, },
  { name: 'lamp', weight: 500, cost: 50, },
  { name: 'lanternHooded', weight: 1000, cost: 500, },
  { name: 'lanternBullseye', weight: 1000, cost: 1000, },
  { name: 'book', weight: 2500, cost: 2500, },
  { name: 'spyglass', weight: 500, cost: 100000, },
  { name: 'magnifyingGlass', weight: 0, cost: 10000, },
  { name: 'climbersKit', weight: 6000, cost: 2500, },
  { name: 'manacles', weight: 3000, cost: 200, },
  { name: 'mirror', weight: 250, cost: 500, },
  { name: 'ammunition', weight: 'Variable', cost: 'Variable', },
  { name: 'waterskin', weight: 2500, cost: 20, },
  { name: 'blockAndTackle', weight: 2500, cost: 100, },
  { name: 'basket', weight: 1000, cost: 40, },
  { name: 'paper', weight: 0, cost: 20, },
  { name: 'burglarsPack', weight: 21000, cost: 1600, },
  { name: 'diplomatsPack', weight: 19500, cost: 3900, },
  { name: 'entertainersPack', weight: 29000, cost: 4000, },
  { name: 'priestsPack', weight: 14500, cost: 3300, },
  { name: 'scholarsPack', weight: 11000, cost: 4000, },
  { name: 'explorersPack', weight: 27500, cost: 1000, },
  { name: 'dungeoneersPack', weight: 27500, cost: 1200, },
  { name: 'parchment', weight: 0, cost: 10, },
  { name: 'spellScrollLevel1', weight: 0, cost: 5000, },
  { name: 'spellScrollCantrip', weight: 0, cost: 3000, },
  { name: 'perfume', weight: 0, cost: 500, },
  { name: 'shovel', weight: 2500, cost: 200, },
  { name: 'pole', weight: 3500, cost: 5, },
  { name: 'crowbar', weight: 2500, cost: 200, },
  { name: 'huntingTrap', weight: 12500, cost: 500, },
  { name: 'spikesIron', weight: 2500, cost: 100, },
  { name: 'poisonBasic', weight: 0, cost: 10000, },
  { name: 'inkPen', weight: 0, cost: 2, },
  { name: 'potIron', weight: 5000, cost: 200, },
  { name: 'potionOfHealing', weight: 250, cost: 5000, },
  { name: 'rations', weight: 1000, cost: 50, },
  { name: 'robe', weight: 2000, cost: 100, },
  { name: 'sack', weight: 250, cost: 1, },
  { name: 'backpack', weight: 2500, cost: 200, },
  { name: 'bedroll', weight: 3500, cost: 100, },
  { name: 'pouch', weight: 500, cost: 50, },
  { name: 'componentPouch', weight: 1000, cost: 2500, },
  { name: 'bucket', weight: 1000, cost: 5, },
  { name: 'signalWhistle', weight: 0, cost: 5, },
  { name: 'holySymbol', weight: 'Variable', cost: 'Variable', },
  { name: 'tent', weight: 10000, cost: 200, },
  { name: 'clothesTravelers', weight: 2000, cost: 200, },
  { name: 'barrel', weight: 35000, cost: 200, },
  { name: 'torch', weight: 500, cost: 1, },
  { name: 'healersKit', weight: 1500, cost: 500, },
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

weapons.filter(weapon => weapon.properties.filter(prop => prop === undefined || !Object.values(WEAPON_PROPERTY).includes(prop)).length > 0)
  // weapons.filter(weapon => weapon.properties.includes(prop => prop))
  .forEach(weapon => console.log('-- equipments', weapon.name, weapon.properties))