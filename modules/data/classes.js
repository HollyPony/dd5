import { InvalidClassNameError, InvalidSubClassNameError } from '../errors.js'
import { Enum, f, } from '../helpers.js'
import { EFFECT, D, SKILLS, ABILITY, } from '../common.js'
import { ARMOR_CATEGORY, INSTRUMENTS, TOOL_CATEGORY, TOOLS, WEAPON_CATEGORY, WEAPON_PROPERTY } from './equipments.js'

const INSERTION_TYPE = Enum({
  forced: 'INSERTION_TYPE.forced',
  select: 'INSERTION_TYPE.select',
})

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
    hitDice: D[12],
    hitPointMax: { base: 12, addPerLevel: 7, },
    saves: f([ABILITY.strength, ABILITY.constitution]),
    skills: f({
      nb: 2,
      list: f([SKILLS.animalHandling, SKILLS.athletics, SKILLS.intimidation, SKILLS.nature, SKILLS.perception, SKILLS.survival]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
      [WEAPON_CATEGORY.martialMelee]: [],
      [WEAPON_CATEGORY.martialRanged]: [],
    }),
    toolProficiencies: f([]),
    armorProficiencies: f([ARMOR_CATEGORY.Light, ARMOR_CATEGORY.Medium,]),
    shieldProficiency: true,
    subClasses: f({
      berserker: f({}),
      wildHeart: f({}),
      worldTree: f({}),
      zealot: f({}),
    }),
  }),
  bard: f({ // P.57
    mainAbility: f([ABILITY.charisma]),
    hitDice: D[8],
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITY.dexterity, ABILITY.charisma]),
    skills: f({
      nb: 3,
      list: f([SKILLS.acrobatics, SKILLS.animalHandling, SKILLS.arcana, SKILLS.athletics, SKILLS.deception, SKILLS.history, SKILLS.insight, SKILLS.intimidation, SKILLS.investigation, SKILLS.medicine, SKILLS.nature, SKILLS.perception, SKILLS.performance, SKILLS.persuasion, SKILLS.religion, SKILLS.sleightOfHand, SKILLS.stealth, SKILLS.survival]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
    }),
    toolProficiencies: f([
      { type: INSERTION_TYPE.select, count: 3, from: INSTRUMENTS, }
    ]),
    armorProficiencies: f([ARMOR_CATEGORY.Light,]),
    shieldProficiency: false,
    subClasses: f({
      dance: f({}),
      glamour: f({}),
      lore: f({}),
      valor: f({}),
    }),
  }),
  cleric: f({
    mainAbility: f([ABILITY.wisdom]),
    hitDice: D[8],
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITY.wisdom, ABILITY.charisma]),
    skills: f({
      nb: 2,
      list: f([SKILLS.history, SKILLS.insight, SKILLS.medicine, SKILLS.persuasion, SKILLS.religion]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
    }),
    armorProficiencies: [ARMOR_CATEGORY.Light, ARMOR_CATEGORY.Medium],
    shieldProficiency: true,
    subClasses: f({
      life: f({}),
      light: f({}),
      trickery: f({}),
      war: f({}),
    }),
  }),
  druid: f({ // P.79
    mainAbility: f([ABILITY.wisdom]),
    hitDice: D[8],
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITY.intelligence, ABILITY.wisdom]),
    skills: f({
      nb: 2,
      list: f([SKILLS.animalHandling, SKILLS.insight, SKILLS.medicine, SKILLS.nature, SKILLS.perception, SKILLS.religion, SKILLS.survival]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
    }),
    toolProficiencies: f([
      { type: INSERTION_TYPE.forced, value: TOOLS.herbalismKit }
    ]),
    armorProficiencies: f([ARMOR_CATEGORY.Light,]),
    shieldProficiency: true,
    subClasses: f({
      land: f({}),
      moon: f({}),
      sea: f({}),
      stars: f({}),
    }),
  }),
  fighter: f({ // P.105
    mainAbility: f([ABILITY.strength, ABILITY.dexterity]), // TODO: choose
    hitDice: D[10],
    hitPointMax: { base: 10, addPerLevel: 6, },
    saves: f([ABILITY.strength, ABILITY.constitution]),
    skills: f({
      nb: 2,
      list: f([SKILLS.acrobatics, SKILLS.animalHandling, SKILLS.athletics, SKILLS.history, SKILLS.insight, SKILLS.intimidation, SKILLS.persuasion, SKILLS.perception, SKILLS.survival]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
      [WEAPON_CATEGORY.martialMelee]: [],
      [WEAPON_CATEGORY.martialRanged]: [],
    }),
    toolProficiencies: f([]),
    armorProficiencies: f([ARMOR_CATEGORY.Light, ARMOR_CATEGORY.Medium, ARMOR_CATEGORY.Heavy,]),
    shieldProficiency: true,
    subClasses: f({
      battleMaster: f({}),
      champion: f({}),
      eldritchKnight: f({}),
      psiWarrior: f({}),
    }),
  }),
  monk: f({ // P.127
    mainAbility: f([ABILITY.dexterity, ABILITY.wisdom]), // TODO: twice
    hitDice: D[8],
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITY.strength, ABILITY.dexterity]),
    skills: f({
      nb: 2,
      list: f([SKILLS.acrobatics, SKILLS.athletics, SKILLS.history, SKILLS.insight, SKILLS.religion, SKILLS.stealth]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [], // TODO: is all weapons with Finesse and Light or just martials ?
      [WEAPON_CATEGORY.simpleRanged]: [],
      [WEAPON_CATEGORY.martialMelee]: [WEAPON_PROPERTY.Light],
      [WEAPON_CATEGORY.martialRanged]: [WEAPON_PROPERTY.Light],
    }),
    // TODO: remove ?
    // getWeaponProficienciesFilter: (armor) => [WEAPON_CATEGORY.simpleMelee, WEAPON_CATEGORY.simpleRanged].includes(weapon.category) ||
    //   ([WEAPON_CATEGORY.martialMelee, WEAPON_CATEGORY.martialRanged].includes(weapon.category) && weapon.properties.includes(WEAPON_PROPERTY.Light)),
    toolProficiencies: f([ // TODO: select one function
      { type: INSERTION_TYPE.select, max: 1, from: TOOL_CATEGORY.Artisan, } // TODO
    ]),
    armorProficiencies: f([]),
    shieldProficiency: false,
    effects: {
      [EFFECT.SpeedModifierEffect]: {
        condition: function ({ equipedArmor, equipedShield }) { return !equipedArmor && !equipedShield },
        apply: function ({ speed }) { return speed + this.specificProps.speedModifier(this.level) },
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
          f({ name: 'openHandTechnique', atLevel: 3, }),
          f({ name: 'wholenessOfBody', atLevel: 6, }),
          f({ name: 'fleetStep', atLevel: 11, }),
          f({ name: 'quiveringPalm', atLevel: 17, }),
        ]),
      }),
    }),
    specificProps: {
      martialArtsPoints: level => (
        () => {
          for (let item of new Set([
            { max: 4, value: D[6] }, { max: 10, value: D[8] }, { max: 16, value: D[10] }, { max: Infinity, value: D[12] }
          ])) { if (level <= item.max) return item }
        }
      )().value,
      speedModifier: level => level === 1 ? 0 : (Math.floor((level - 2) / 4) + 2) * 1.5 // TODO: uncapped after level 20 ?
    }
  }),
  paladin: f({ // P.147
    mainAbility: f([ABILITY.strength, ABILITY.charisma]), // TODO: twice
    hitDice: D[10],
    hitPointMax: { base: 10, addPerLevel: 6, },
    saves: f([ABILITY.wisdom, ABILITY.charisma]), // TODO: choose
    skills: f({
      nb: 2,
      list: f([SKILLS.athletics, SKILLS.insight, SKILLS.intimidation, SKILLS.medicine, SKILLS.persuasion, SKILLS.religion]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
      [WEAPON_CATEGORY.martialMelee]: [],
      [WEAPON_CATEGORY.martialRanged]: [],
    }),
    toolProficiencies: f([]),
    armorProficiencies: f([ARMOR_CATEGORY.Light, ARMOR_CATEGORY.Medium, ARMOR_CATEGORY.Heavy,]),
    shieldProficiency: true,
    subClasses: f({
      devotion: f({}),
      glory: f({}),
      ancients: f({}),
      vengeance: f({}),
    }),
  }),
  ranger: f({ // P.157
    mainAbility: f([ABILITY.dexterity, ABILITY.wisdom]), // TODO: twice
    hitDice: D[10],
    hitPointMax: { base: 10, addPerLevel: 6, },
    saves: f([ABILITY.strength, ABILITY.dexterity]),
    skills: f({
      nb: 3,
      list: f([SKILLS.animalHandling, SKILLS.athletics, SKILLS.insight, SKILLS.investigation, SKILLS.nature, SKILLS.perception, SKILLS.stealth, SKILLS.survival]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
      [WEAPON_CATEGORY.martialMelee]: [],
      [WEAPON_CATEGORY.martialRanged]: [],
    }),
    toolProficiencies: f([]),
    armorProficiencies: f([ARMOR_CATEGORY.Light, ARMOR_CATEGORY.Medium,]),
    shieldProficiency: true,
    subClasses: f({
      beast: f({}),
      fey: f({}),
      stalker: f({}),
      hunter: f({}),
    }),
  }),
  rogue: f({ // P.167
    mainAbility: f([ABILITY.dexterity]),
    hitDice: D[8],
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITY.dexterity, ABILITY.intelligence]),
    skills: f({
      nb: 4,
      list: f([SKILLS.acrobatics, SKILLS.athletics, SKILLS.deception, SKILLS.insight, SKILLS.intimidation, SKILLS.investigation, SKILLS.perception, SKILLS.persuasion, SKILLS.sleightOfHand, SKILLS.stealth]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [], // TODO: is all weapons with Finesse and Light or just martials ?
      [WEAPON_CATEGORY.simpleRanged]: [],
      [WEAPON_CATEGORY.martialMelee]: [WEAPON_PROPERTY.Finesse, WEAPON_PROPERTY.Light],
      [WEAPON_CATEGORY.martialRanged]: [WEAPON_PROPERTY.Finesse, WEAPON_PROPERTY.Light],
    }),
    toolProficiencies: f([
      { type: INSERTION_TYPE.forced, value: TOOLS.thievesTools, }
    ]),
    armorProficiencies: f([ARMOR_CATEGORY.Light,]),
    shieldProficiency: false,
    subClasses: f({
      arcana: f({}),
      assassin: f({}),
      soulknife: f({}),
      thief: f({}),
    }),
  }),
  sorcerer: f({ // P. 91
    mainAbility: f([ABILITY.charisma]),
    hitDice: D[6],
    hitPointMax: { base: 6, addPerLevel: 4, },
    saves: f([ABILITY.constitution, ABILITY.charisma]),
    skills: f({
      nb: 2,
      list: f([SKILLS.arcana, SKILLS.deception, SKILLS.insight, SKILLS.intimidation, SKILLS.persuasion, SKILLS.religion]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
    }),
    toolProficiencies: f({}),
    armorProficiencies: f([]),
    shieldProficiency: false,
    subClasses: f({
      aberrant: f({}),
      clockwork: f({}),
      draconic: f({}),
      wild: f({}),
    }),
  }),
  warlock: f({ // P.135
    mainAbility: f([ABILITY.charisma]),
    hitDice: D[8],
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITY.wisdom, ABILITY.charisma]),
    skills: f({
      nb: 2,
      list: f([SKILLS.arcana, SKILLS.deception, SKILLS.history, SKILLS.intimidation, SKILLS.investigation, SKILLS.nature, SKILLS.religion]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
    }),
    toolProficiencies: f({}),
    armorProficiencies: f([ARMOR_CATEGORY.Light,]),
    shieldProficiency: false,
    subClasses: f({
      archfey: f({}),
      celestial: f({}),
      fiend: f({}),
      old: f({}),
    }),
  }),
  wizard: f({ // P.115
    mainAbility: f([ABILITY.intelligence]),
    hitDice: D[6],
    hitPointMax: { base: 6, addPerLevel: 4, },
    saves: f([ABILITY.intelligence, ABILITY.wisdom]),
    skills: f({
      nb: 2,
      list: f([SKILLS.arcana, SKILLS.history, SKILLS.insight, SKILLS.medicine, SKILLS.nature, SKILLS.religion]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
    }),
    toolProficiencies: f({}),
    armorProficiencies: f([]),
    shieldProficiency: false,
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
    weaponProficiencies,
    armorProficiencies,
    shieldProficiency,
    subClasses,
    ...classBase
  } = classes[className]


  const {
    features: subClassFeatures,
    weaponProficiencies: subClassWeaponProficiencies,
    armorProficiencies: subClassArmorProficiencies,
    shieldProficiency: subClassShieldProficiency,
    ...subClass
  } = subClasses[subClassName] || {}

  return f({
    level,
    ...classBase,
    ...subClass || {},
    // traits: [...(classBase?.traits || []), ...(subClass?.traits?.filter(trait => trait.atLevel >= level) || []),],
    // spells: [...(classBase?.spells || []), ...(subClass?.spells?.filter(spell => spell.atLevel >= level) || []),],
    features: (features ?? []).concat(subClassFeatures ?? []).filter(({ atLevel }) => atLevel <= level),
    weaponProficiencies: Object.assign({}, weaponProficiencies, subClassWeaponProficiencies ?? {}),
    armorProficiencies: (armorProficiencies ?? []).concat(subClassArmorProficiencies ?? []),
    shieldProficiency: (shieldProficiency || subClassShieldProficiency) ?? false,
  })
}