import { InvalidClassNameError, InvalidSubClassNameError } from '../errors.js'
import { f, } from '../helpers.js'
import { EFFECT, DICES, SKILLS, WEAPON_CATEGORY, WEAPON_PROPERTY, ABILITY } from './common.js'

const abilityScoreImprovement = (level) => ({ // TODO: Check apply `this` work on this arrowed fct
  name: 'abilityScoreImprovement', atLevel: level,
  effects: {
    [EFFECT.ImprovementChooseEffect]: {},
    [EFFECT.AddAbilityEffect]: {
      condition: () => { }, // TODO: If abilityChoose
      apply: () => { }, // TODO: Update Ability - 2 ability +1 OR 1 ability +2 no more 20
    },
    [EFFECT.AddFeatEffect]: {
      condition: () => { }, // TODO: If abilityChoose
      apply: () => { }, // TODO: Update Ability - Choose feat according to conditions
    },
  }
})

const classes = f({
  barbarian: f({ // P.51
    mainAbility: f([ABILITY.strength]),
    hitDice: DICES.D12, // TODO: +1 per level
    hitPointMax: { base: 12, addPerLevel: 7, },
    saves: f([ABILITY.strength, ABILITY.constitution]),
    authorizedNumberSkills: 2,
    authorizedSkills: f([SKILLS.animalHandling, SKILLS.athletics, SKILLS.intimidation, SKILLS.nature, SKILLS.perception, SKILLS.survival]),
    subClasses: f({
      berserker: f({}),
      wildHeart: f({}),
      worldTree: f({}),
      zealot: f({}),
    }),
  }),
  bard: f({ // P.57
    mainAbility: f([ABILITY.charisma]),
    hitDice: DICES.D8, // TODO: +1 per level
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITY.dexterity, ABILITY.charisma]),
    authorizedNumberSkills: 3,
    authorizedSkills: f([SKILLS.acrobatics, SKILLS.animalHandling, SKILLS.arcana, SKILLS.athletics, SKILLS.deception, SKILLS.history, SKILLS.insight, SKILLS.intimidation, SKILLS.investigation, SKILLS.medicine, SKILLS.nature, SKILLS.perception, SKILLS.performance, SKILLS.persuasion, SKILLS.religion, SKILLS.sleightOfHand, SKILLS.stealth, SKILLS.survival]),
    subClasses: f({
      dance: f({}),
      glamour: f({}),
      lore: f({}),
      valor: f({}),
    }),
  }),
  cleric: f({
    mainAbility: f([ABILITY.wisdom]),
    hitDice: DICES.D8, // TODO: +1 per level
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITY.wisdom, ABILITY.charisma]),
    authorizedNumberSkills: 2,
    authorizedSkills: f([SKILLS.history, SKILLS.insight, SKILLS.medicine, SKILLS.persuasion, SKILLS.religion]),
    subClasses: f({
      life: f({}),
      light: f({}),
      trickery: f({}),
      war: f({}),
    }),
  }),
  druid: f({ // P.79
    mainAbility: f([ABILITY.wisdom]),
    hitDice: DICES.D8, // TODO: +1 per level
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITY.intelligence, ABILITY.wisdom]),
    authorizedNumberSkills: 2,
    authorizedSkills: f([SKILLS.animalHandling, SKILLS.insight, SKILLS.medicine, SKILLS.nature, SKILLS.perception, SKILLS.religion, SKILLS.survival]),
    subClasses: f({
      land: f({}),
      moon: f({}),
      sea: f({}),
      stars: f({}),
    }),
  }),
  fighter: f({ // P.105
    mainAbility: f([ABILITY.strength, ABILITY.dexterity]), // TODO: choose
    hitDice: DICES.D10, // TODO: +1 per level
    hitPointMax: { base: 10, addPerLevel: 6, },
    saves: f([ABILITY.strength, ABILITY.constitution]),
    authorizedNumberSkills: 2,
    authorizedSkills: f([SKILLS.acrobatics, SKILLS.animalHandling, SKILLS.athletics, SKILLS.history, SKILLS.insight, SKILLS.intimidation, SKILLS.persuasion, SKILLS.perception, SKILLS.survival]),
    subClasses: f({
      battleMaster: f({}),
      champion: f({}),
      eldritchKnight: f({}),
      psiWarrior: f({}),
    }),
  }),
  monk: f({ // P.127
    mainAbility: f([ABILITY.dexterity, ABILITY.wisdom]), // TODO: twice
    hitDice: DICES.D8, // TODO: +1 per level
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITY.strength, ABILITY.dexterity]),
    authorizedNumberSkills: 2,
    authorizedSkills: f([SKILLS.acrobatics, SKILLS.athletics, SKILLS.history, SKILLS.insight, SKILLS.religion, SKILLS.stealth]),
    weaponProfciencies: f({}), // TODO: Used to display masteries ?
    hasWeaponProficiency: weapon => [WEAPON_CATEGORY.simpleMelee, WEAPON_CATEGORY.simpleRanged].includes(weapon.category) ||
      ([WEAPON_CATEGORY.martialMelee, WEAPON_CATEGORY.martialRanged].includes(weapon.category) && weapon.properties.includes(WEAPON_PROPERTY.Light)),
    hasArmorProficiency: armor => { },
    effects: {
      [EFFECT.SpeedModifierEffect]: {
        condition: function ({ equipedArmor, equipedShield }) {
          return !equipedArmor && !equipedShield
        },
        apply: function () {
          return this.specificProps.speedModifier(this.level)
        },
      },
    },
    features: f([
      f({ name: 'martialArts', atLevel: 1, }), // TODO
      f({
        name: 'unarmoredDefense', atLevel: 1,
        effects: {
          [EFFECT.ACOverrideEffect]: {
            condition: function ({ equipedArmor, equipedShield, }) { return !equipedArmor && !equipedShield },
            apply: function ({ modifiers }) { return 10 + modifiers[ABILITY.dexterity] + modifiers[ABILITY.wisdom] },
          }
        },
      }),
      f({ name: 'monksFocus', atLevel: 2, }),
      f({ name: 'unarmoredMovement', atLevel: 2, }),
      f({ name: 'uncannyMetabolism', atLevel: 2, }),
      f({ name: 'deflectAttacks', atLevel: 3, }),
      f({
        name: 'monkSubClass', atLevel: 3, effects: {
          [EFFECT.SubClassChooseEffect]: {
            apply: () => { }
          },
        }
      }),
      f(abilityScoreImprovement(4)),
      f(abilityScoreImprovement(8)),
      f(abilityScoreImprovement(12)),
      f(abilityScoreImprovement(16)),
      f({
        name: 'slowFall', atLevel: 4, effects: {
          [EFFECT.ReduceFallDamageEffect]: {
            apply: () => { } // TODO: level * 5
          }
        }
      }),
      f({
        name: 'extraAttack', atLevel: 5,
      }),
      f({
        name: 'stunningStrike', atLevel: 5,
      }),
      f({
        name: 'empoweredStrikes', atLevel: 6,
      }),
      f({
        name: 'evasion', atLevel: 7,
      }),
      f({
        name: 'acrobaticMovement', atLevel: 9,
      }),
      f({
        name: 'heightenedFocus', atLevel: 10,
      }),
      f({
        name: 'selfRestoration', atLevel: 10,
      }),
      f({
        name: 'deflectEnergy', atLevel: 13,
      }),
      f({
        name: 'disciplinedSurvivor', atLevel: 14,
      }),
      f({
        name: 'perfectFocus', atLevel: 15,
      }),
      f({
        name: 'superiorDefense', atLevel: 18,
      }),
      f({
        name: 'epicBoon', atLevel: 19,
        effects: {
          [EFFECT.AddFeatEffect]: { // TODO: Epic
            condition: () => { },
            apply: () => { },
          },
        },
      }),
      f({
        name: 'bodyAndMind', atLevel: 20,
      }),
    ]),
    subClasses: f({
      mercy: f({}),
      shadow: f({}),
      elements: f({}),
      openHand: f({
        features: f([
          f({
            name: 'openHandTechnique', atLevel: 3,
            name: 'wholenessOfBody', atLevel: 6,
            name: 'fleetStep', atLevel: 11,
            name: 'quiveringPalm', atLevel: 17,
          }),
        ]),
      }),
    }),
    specificProps: {
      martialArtsPoints: level => (
        () => {
          for (let item of new Set([
            { max: 4, value: DICES.D6 }, { max: 10, value: DICES.D8 }, { max: 16, value: DICES.D10 }, { max: Infinity, value: DICES.D12 }
          ])) { if (level <= item.max) return item }
        }
      )().value,
      speedModifier: level => level === 1 ? 0 : (Math.floor((level - 2) / 4) + 2) * 1.5 // TODO: uncapped after level 20 ?
    }
  }),
  paladin: f({ // P.147
    mainAbility: f([ABILITY.strength, ABILITY.charisma]), // TODO: twice
    hitDice: DICES.D10, // TODO: +1 per level
    hitPointMax: { base: 10, addPerLevel: 6, },
    saves: f([ABILITY.wisdom, ABILITY.charisma]), // TODO: choose
    authorizedNumberSkills: 2,
    authorizedSkills: f([SKILLS.athletics, SKILLS.insight, SKILLS.intimidation, SKILLS.medicine, SKILLS.persuasion, SKILLS.religion]),
    subClasses: f({
      devotion: f({}),
      glory: f({}),
      ancients: f({}),
      vengeance: f({}),
    }),
  }),
  ranger: f({ // P.157
    mainAbility: f([ABILITY.dexterity, ABILITY.wisdom]), // TODO: twice
    hitDice: DICES.D10, // TODO: +1 per level
    hitPointMax: { base: 10, addPerLevel: 6, },
    saves: f([ABILITY.strength, ABILITY.dexterity]),
    authorizedNumberSkills: 3,
    authorizedSkills: f([SKILLS.animalHandling, SKILLS.athletics, SKILLS.insight, SKILLS.investigation, SKILLS.nature, SKILLS.perception, SKILLS.stealth, SKILLS.survival]),
    subClasses: f({
      beast: f({}),
      fey: f({}),
      stalker: f({}),
      hunter: f({}),
    }),
  }),
  rogue: f({ // P.167
    mainAbility: f([ABILITY.dexterity]),
    hitDice: DICES.D8, // TODO: +1 per level
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITY.dexterity, ABILITY.intelligence]),
    authorizedNumberSkills: 4,
    authorizedSkills: f([SKILLS.acrobatics, SKILLS.athletics, SKILLS.deception, SKILLS.insight, SKILLS.intimidation, SKILLS.investigation, SKILLS.perception, SKILLS.persuasion, SKILLS.sleightOfHand, SKILLS.stealth]),
    subClasses: f({
      arcana: f({}),
      assassin: f({}),
      soulknife: f({}),
      thief: f({}),
    }),
  }),
  sorcerer: f({ // P. 91
    mainAbility: f([ABILITY.charisma]),
    hitDice: DICES.D6, // TODO: +1 per level
    hitPointMax: { base: 6, addPerLevel: 4, },
    saves: f([ABILITY.constitution, ABILITY.charisma]),
    authorizedNumberSkills: 2,
    authorizedSkills: f([SKILLS.arcana, SKILLS.deception, SKILLS.insight, SKILLS.intimidation, SKILLS.persuasion, SKILLS.religion]),
    subClasses: f({
      aberrant: f({}),
      clockwork: f({}),
      draconic: f({}),
      wild: f({}),
    }),
  }),
  warlock: f({ // P.135
    mainAbility: f([ABILITY.charisma]),
    hitDice: DICES.D8, // TODO: +1 per level
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITY.wisdom, ABILITY.charisma]),
    authorizedNumberSkills: 2,
    authorizedSkills: f([SKILLS.arcana, SKILLS.deception, SKILLS.history, SKILLS.intimidation, SKILLS.investigation, SKILLS.nature, SKILLS.religion]),
    subClasses: f({
      archfey: f({}),
      celestial: f({}),
      fiend: f({}),
      old: f({}),
    }),
  }),
  wizard: f({ // P.115
    mainAbility: f([ABILITY.intelligence]),
    hitDice: DICES.D6, // TODO: +1 per level
    hitPointMax: { base: 6, addPerLevel: 4, },
    saves: f([ABILITY.intelligence, ABILITY.wisdom]),
    authorizedNumberSkills: 2,
    authorizedSkills: f([SKILLS.arcana, SKILLS.history, SKILLS.insight, SKILLS.medicine, SKILLS.nature, SKILLS.religion]),
    subClasses: f({
      abjureur: f({}),
      diviner: f({}),
      evoker: f({}),
      illusionist: f({}),
    }),
  }),
})

export function getList() { return Object.keys(classes) }
export function getSubClasses(className) { return Object.keys(classes?.[className]?.subClasses ?? {}) }
export default function get(className, subClassName, level) {
  if (className === null) {
    return null
  }
  if (!classes[className]) {
    throw InvalidClassNameError(className)
  }
  if (subClassName && !Object.keys(classes[className]?.subClasses)?.includes?.(subClassName)) {
    throw InvalidSubClassNameError(subClassName, className)
  }

  const {
    features,
    hasWeaponProficiency,
    hasArmorProficiency,
    subClasses,
    ...classBase
  } = classes[className]


  const {
    features: subClassFeatures,
    hasWeaponProficiency: subClassHasWeaponProficiency,
    hasArmorProficiency: subClassHasArmorProficiency,
    ...subClass
  } = subClasses[subClassName] || {}

  return f({
    level,
    ...classBase,
    ...subClass || {},
    // traits: [...(classBase?.traits || []), ...(subClass?.traits?.filter(trait => trait.atLevel >= level) || []),],
    // spells: [...(classBase?.spells || []), ...(subClass?.spells?.filter(spell => spell.atLevel >= level) || []),],
    features: [...(features || []), ...(subClassFeatures || [])].filter(({ atLevel }) => atLevel <= level),
    hasWeaponProficiency: (...params) => hasWeaponProficiency?.(...params) || subClassHasWeaponProficiency?.(...params),
    hasArmorProficiency: (...params) => hasArmorProficiency?.(...params) || subClassHasArmorProficiency?.(...params),
  })
}