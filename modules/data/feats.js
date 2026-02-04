// P.200
import { f, } from '../helpers.js'
import { ABILITY, EFFECT, } from '../common.js'

const FEAT_CATEGORY = f({
  ORIGINS: Symbol('feat_category_origins'),
  GENERAL: Symbol('feat_category_general'),
  FIGHTING_STYLE: Symbol('feat_category_fighting_style'),
  EPIC_BOON: Symbol('feat_category_epic_boon'),
})

export const feats = f({
  elementalAdept: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      features: f({
        spellcastingOrPactMagic: true,
      }),
    }),
    repeatable: true,
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  feyTouched: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  shadowTouched: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  abilityScoreImprovement: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    repeatable: true,
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          options: [{ maxAbilities: 1, points: 2 }, { maxAbilities: 2, points: 1 }],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  archery: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    requirements: f({
      features: f({
        fightingStyle: true,
      }),
    }),
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  greatWeaponFighting: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    requirements: f({
      features: f({
        fightingStyle: true,
      }),
    }),
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  thrownWeaponFighting: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    requirements: f({
      features: f({
        fightingStyle: true,
      }),
    }),
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  athlete: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'any',
        list: f([{ ability: ABILITY.strength, min: 13 }, { ability: ABILITY.dexterity, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  tavernBrawler: f({
    category: FEAT_CATEGORY.ORIGINS,
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  crusher: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.constitution],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  lucky: f({
    category: FEAT_CATEGORY.ORIGINS,
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  chef: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.constitution, ABILITY.wisdom],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  twoWeaponFighting: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    requirements: f({
      features: f({
        fightingStyle: true,
      }),
    }),
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  unarmedFighting: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    requirements: f({
      features: f({
        fightingStyle: true,
      }),
    }),
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  blindFighting: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    requirements: f({
      features: f({
        fightingStyle: true,
      }),
    }),
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  dualWielder: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'any',
        list: f([{ ability: ABILITY.strength, min: 13 }, { ability: ABILITY.dexterity, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  mountedCombatant: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity, ABILITY.wisdom],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  actor: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'all',
        list: f([{ ability: ABILITY.charisma, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.AbilityImprovmentEffect]: {
        config: {
          ability: ABILITY.charisma,
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  defense: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    requirements: f({
      features: f({
        fightingStyle: true,
      }),
    }),
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  skulker: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'all',
        list: f([{ ability: ABILITY.dexterity, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.AbilityImprovmentEffect]: {
        config: {
          ability: ABILITY.dexterity,
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  skilled: f({
    category: FEAT_CATEGORY.ORIGINS,
    repeatable: true,
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  dueling: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    requirements: f({
      features: f({
        fightingStyle: true,
      }),
    }),
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  defensiveDuelist: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'all',
        list: f([{ ability: ABILITY.dexterity, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.AbilityImprovmentEffect]: {
        config: {
          ability: ABILITY.dexterity,
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  piercer: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  grappler: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'any',
        list: f([{ ability: ABILITY.strength, min: 13 }, { ability: ABILITY.dexterity, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  poisoner: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.dexterity, ABILITY.intelligence],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  keenMind: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'all',
        list: f([{ ability: ABILITY.intelligence, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.AbilityImprovmentEffect]: {
        config: {
          ability: ABILITY.intelligence,
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  skillExpert: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  charger: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'any',
        list: f([{ ability: ABILITY.strength, min: 13 }, { ability: ABILITY.dexterity, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  crafter: f({
    category: FEAT_CATEGORY.ORIGINS,
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  epicBoonOfIrresistibleOffense: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    requirements: f({
      minLevel: 19,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 30,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  epicBoonOfSkill: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    requirements: f({
      minLevel: 19,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          max: 30,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  epicBoonOfDimensionalTravel: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    requirements: f({
      minLevel: 19,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          max: 30,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  epicBoonOfNightSpirit: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    requirements: f({
      minLevel: 19,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          max: 30,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  epicBoonOfMagicMemory: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    requirements: f({
      minLevel: 19,
      features: f({
        spellcasting: true,
      }),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma],
          max: 30,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  epicBoonOfMartialProwess: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    requirements: f({
      minLevel: 19,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          max: 30,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  epicBoonOfRecovery: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    requirements: f({
      minLevel: 19,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          max: 30,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  epicBoonOfEnergyResistance: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    requirements: f({
      minLevel: 19,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          max: 30,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  epicBoonOfFortitude: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    requirements: f({
      minLevel: 19,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          max: 30,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  epicBoonOfTruesight: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          max: 30,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  epicBoonOfSpeed: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    requirements: f({
      minLevel: 19,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          max: 30,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  epicBoonOfFate: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    requirements: f({
      minLevel: 19,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          max: 30,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  inspiringLeader: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'any',
        list: f([{ ability: ABILITY.wisdom, min: 13 }, { ability: ABILITY.charisma, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.wisdom, ABILITY.charisma],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  martialWeaponTraining: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  durable: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.AbilityImprovmentEffect]: {
        config: {
          ability: ABILITY.constitution,
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  healer: f({
    category: FEAT_CATEGORY.ORIGINS,
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  spellSniper: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      features: f({
        spellcastingOrPactMagic: true,
      }),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  magicInitiate: f({
    category: FEAT_CATEGORY.ORIGINS,
    repeatable: true,
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  interception: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    requirements: f({
      features: f({
        fightingStyle: true,
      }),
    }),
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  warCaster: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      features: f({
        spellcastingOrPactMagic: true,
      }),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  ritualCaster: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'any',
        list: f([{ ability: ABILITY.intelligence, min: 13 }, { ability: ABILITY.wisdom, min: 13 }, { ability: ABILITY.charisma, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  crossbowExpert: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'all',
        list: f([{ ability: ABILITY.dexterity, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.AbilityImprovmentEffect]: {
        config: {
          ability: ABILITY.dexterity,
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  weaponMaster: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  polearmMaster: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'any',
        list: f([{ ability: ABILITY.strength, min: 13 }, { ability: ABILITY.dexterity, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  heavyWeaponMaster: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'all',
        list: f([{ ability: ABILITY.strength, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.AbilityImprovmentEffect]: {
        config: {
          ability: ABILITY.strength,
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  mediumArmorMaster: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      armorTraining: f(['medium']),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  heavyArmorMaster: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      armorTraining: f(['heavy']),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.constitution],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  shieldMaster: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      shieldTraining: true,
    }),
    effects: {
      [EFFECT.AbilityImprovmentEffect]: {
        config: {
          ability: ABILITY.strength,
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  mobile: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'any',
        list: f([{ ability: ABILITY.dexterity, min: 13 }, { ability: ABILITY.constitution, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.dexterity, ABILITY.constitution],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  musician: f({
    category: FEAT_CATEGORY.ORIGINS,
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  observant: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'any',
        list: f([{ ability: ABILITY.intelligence, min: 13 }, { ability: ABILITY.wisdom, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.intelligence, ABILITY.wisdom],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  protection: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    requirements: f({
      features: f({
        fightingStyle: true,
      }),
    }),
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  mediumArmorTraining: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      armorTraining: f(['light']),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  lightArmorTraining: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  heavyArmorTraining: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      armorTraining: f(['medium']),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.constitution],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  resilient: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          max: 20,
          // TODOEffect: Tie this choice to the saving throw proficiency selection.
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  tough: f({
    category: FEAT_CATEGORY.ORIGINS,
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  savageAttacker: f({
    category: FEAT_CATEGORY.ORIGINS,
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
  sentinel: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'any',
        list: f([{ ability: ABILITY.strength, min: 13 }, { ability: ABILITY.dexterity, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  telekinetic: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  telepathic: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  sharpshooter: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
      ability: f({
        mode: 'all',
        list: f([{ ability: ABILITY.dexterity, min: 13 }]),
      }),
    }),
    effects: {
      [EFFECT.AbilityImprovmentEffect]: {
        config: {
          ability: ABILITY.dexterity,
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  slasher: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  mageSlayer: f({
    category: FEAT_CATEGORY.GENERAL,
    requirements: f({
      minLevel: 4,
    }),
    effects: {
      [EFFECT.ChooseAbilityImprovmentEffect]: {
        config: {
          allowedAbilities: [ABILITY.strength, ABILITY.dexterity],
          max: 20,
        },
        apply: () => { },
      },
      // TODOEffect: Define effects for this feat.
    },
  }),
  alert: f({
    category: FEAT_CATEGORY.ORIGINS,
    effects: {
      // TODOEffect: Define effects for this feat.
    },
  }),
})
