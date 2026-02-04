// P.200
import { f, } from '../helpers.js'
import { ABILITY, } from '../common.js'

const FEAT_CATEGORY = f({
  ORIGINS: Symbol('feat_category_origins'),
  GENERAL: Symbol('feat_category_general'),
  FIGHTING_STYLE: Symbol('feat_category_fighting_style'),
  EPIC_BOON: Symbol('feat_category_epic_boon'),
})

export const feats = f({
  elementalAdept: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  feyTouched: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  shadowTouched: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  abilityScoreImprovement: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  archery: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  greatWeaponFighting: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  thrownWeaponFighting: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  athlete: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  tavernBrawler: f({
    category: FEAT_CATEGORY.ORIGINS,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  crusher: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.constitution]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  lucky: f({
    category: FEAT_CATEGORY.ORIGINS,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  chef: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.constitution, ABILITY.wisdom]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  twoWeaponFighting: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  unarmedFighting: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  blindFighting: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  dualWielder: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  mountedCombatant: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity, ABILITY.wisdom]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  actor: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.charisma]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  defense: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    benefits: f({
      acBonusArmor: 1,
      // TODO: ACModifierEffect with condition equipedArmor.
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  skulker: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  skilled: f({
    category: FEAT_CATEGORY.ORIGINS,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  dueling: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  defensiveDuelist: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  piercer: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  grappler: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  poisoner: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.dexterity, ABILITY.intelligence]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  keenMind: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.intelligence]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  skillExpert: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  charger: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
      speedBonusMeters: 3,
      // TODO: Apply SpeedModifierEffect when effect system supports feat modifiers.
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  crafter: f({
    category: FEAT_CATEGORY.ORIGINS,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  epicBoonOfIrresistibleOffense: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  epicBoonOfSkill: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  epicBoonOfDimensionalTravel: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  epicBoonOfNightSpirit: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  epicBoonOfMagicMemory: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  epicBoonOfMartialProwess: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  epicBoonOfRecovery: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  epicBoonOfEnergyResistance: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  epicBoonOfFortitude: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  epicBoonOfTruesight: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  epicBoonOfSpeed: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  epicBoonOfFate: f({
    category: FEAT_CATEGORY.EPIC_BOON,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  inspiringLeader: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.wisdom, ABILITY.charisma]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  martialWeaponTraining: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  durable: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.constitution]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  healer: f({
    category: FEAT_CATEGORY.ORIGINS,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  spellSniper: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  magicInitiate: f({
    category: FEAT_CATEGORY.ORIGINS,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  interception: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  warCaster: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  ritualCaster: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  crossbowExpert: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  weaponMaster: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  polearmMaster: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  heavyWeaponMaster: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  mediumArmorMaster: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  heavyArmorMaster: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.constitution]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  shieldMaster: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  mobile: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.dexterity, ABILITY.constitution]),
        amount: 1,
        max: 20,
      }),
      speedBonusMeters: 3,
      // TODO: Apply SpeedModifierEffect when effect system supports feat modifiers.
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  musician: f({
    category: FEAT_CATEGORY.ORIGINS,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  observant: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.intelligence, ABILITY.wisdom]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  protection: f({
    category: FEAT_CATEGORY.FIGHTING_STYLE,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  mediumArmorTraining: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  lightArmorTraining: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  heavyArmorTraining: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.constitution]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  resilient: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  tough: f({
    category: FEAT_CATEGORY.ORIGINS,
    benefits: f({
      maxHpIncreaseOnGain: { type: "levelMultiplier", multiplier: 2 },
      maxHpIncreasePerLevel: 2,
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  savageAttacker: f({
    category: FEAT_CATEGORY.ORIGINS,
    benefits: f({
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  sentinel: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  telekinetic: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  telepathic: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.intelligence, ABILITY.wisdom, ABILITY.charisma]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  sharpshooter: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  slasher: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  mageSlayer: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      abilityIncrease: f({
        choices: f([ABILITY.strength, ABILITY.dexterity]),
        amount: 1,
        max: 20,
      }),
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
  alert: f({
    category: FEAT_CATEGORY.ORIGINS,
    benefits: f({
      initiativeBonus: { type: "proficiency" },
      // TODO: Initiative swap with ally.
    }),
    // TODO: Convert remaining effects to structured benefits/effects.
  }),
})
