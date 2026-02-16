import { InvalidClassNameError, InvalidSubClassNameError } from '../errors.js'
import { Enum } from '../enum.js'
import { f } from '../helpers.js'
import { ABILITIES, DICES as D, EFFECTS, SKILLS } from '../common.js'
import { ARMOR_CATEGORY, TOOL_CATEGORY, TOOLS, WEAPON_CATEGORY, WEAPON_PROPERTY } from './equipments.js'
import { SELECTOR_TYPE } from '../services/choice.helper.js'
import derivedProperties from '../stores/charSheet.derived.properties.js'

export const INSERTION_TYPE = Enum({
  forced: Symbol.for('INSERTION_TYPE.forced'),
  select: Symbol.for('INSERTION_TYPE.select'),
})

export const SOURCE_KEY = Enum({
  TOOLS: Symbol.for('SOURCE_KEY.TOOLS'),
  SKILLS: Symbol.for('SOURCE_KEY.SKILLS'),
})

function buildSelector(key) {
  return {
    type: SELECTOR_TYPE.CLASS,
    key,
  }
}

const abilityScoreImprovement = (level) => ({ // TODO: Check apply `this` work on this arrowed fct
  name: 'abilityScoreImprovement', atLevel: level,
  effects: {
    [EFFECTS.ImprovementChooseEffect]: {},
    [EFFECTS.AddAbilityEffect]: {
      condition: () => { }, // TODO: If abilityChoose
      apply: () => { }, // TODO: Update Ability - 2 ability +1 OR 1 ability +2 no more 20
    },
    [EFFECTS.AddFeatEffect]: {
      condition: () => { }, // TODO: If featChoose
      apply: () => { }, // TODO: Update Ability - Choose feat according to conditions
    },
  }
})

const classes = f({
  barbarian: f({ // P.51
    mainAbility: f([ABILITIES.strength]),
    hitDice: D[12],
    hitPointMax: { base: 12, addPerLevel: 7, },
    saves: f([ABILITIES.strength, ABILITIES.constitution]),
    skills: f({
      choice: {
        selector: buildSelector(SOURCE_KEY.SKILLS),
        target: derivedProperties.skills,
      },
      nb: 2,
      list: f([SKILLS.animalHandling, SKILLS.athletics, SKILLS.intimidation, SKILLS.nature, SKILLS.perception, SKILLS.survival]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
      [WEAPON_CATEGORY.martialMelee]: [],
      [WEAPON_CATEGORY.martialRanged]: [],
    }),
    toolProficiencies: f({}),
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
    mainAbility: f([ABILITIES.charisma]),
    hitDice: D[8],
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITIES.dexterity, ABILITIES.charisma]),
    skills: f({
      choice: {
        selector: buildSelector(SOURCE_KEY.SKILLS),
        target: derivedProperties.skills,
      },
      nb: 3,
      list: f([SKILLS.acrobatics, SKILLS.animalHandling, SKILLS.arcana, SKILLS.athletics, SKILLS.deception, SKILLS.history, SKILLS.insight, SKILLS.intimidation, SKILLS.investigation, SKILLS.medicine, SKILLS.nature, SKILLS.perception, SKILLS.performance, SKILLS.persuasion, SKILLS.religion, SKILLS.sleightOfHand, SKILLS.stealth, SKILLS.survival]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
    }),
    toolProficiencies: f({
      choice: {
        selector: buildSelector(SOURCE_KEY.TOOLS),
        target: derivedProperties.toolProficiencies,
      },
      type: INSERTION_TYPE.select,
      max: 3,
      from: TOOL_CATEGORY.MusicalInstrument,
    }),
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
    mainAbility: f([ABILITIES.wisdom]),
    hitDice: D[8],
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITIES.wisdom, ABILITIES.charisma]),
    skills: f({
      choice: {
        selector: buildSelector(SOURCE_KEY.SKILLS),
        target: derivedProperties.skills,
      },
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
    mainAbility: f([ABILITIES.wisdom]),
    hitDice: D[8],
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITIES.intelligence, ABILITIES.wisdom]),
    skills: f({
      choice: {
        selector: buildSelector(SOURCE_KEY.SKILLS),
        target: derivedProperties.skills,
      },
      nb: 2,
      list: f([SKILLS.animalHandling, SKILLS.insight, SKILLS.medicine, SKILLS.nature, SKILLS.perception, SKILLS.religion, SKILLS.survival]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
    }),
    toolProficiencies: f({
      type: INSERTION_TYPE.forced,
      tools: [TOOLS.herbalismKit],
    }),
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
    mainAbility: f([ABILITIES.strength, ABILITIES.dexterity]), // TODO: choose
    hitDice: D[10],
    hitPointMax: { base: 10, addPerLevel: 6, },
    saves: f([ABILITIES.strength, ABILITIES.constitution]),
    skills: f({
      choice: {
        selector: buildSelector(SOURCE_KEY.SKILLS),
        target: derivedProperties.skills,
      },
      nb: 2,
      list: f([SKILLS.acrobatics, SKILLS.animalHandling, SKILLS.athletics, SKILLS.history, SKILLS.insight, SKILLS.intimidation, SKILLS.persuasion, SKILLS.perception, SKILLS.survival]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
      [WEAPON_CATEGORY.martialMelee]: [],
      [WEAPON_CATEGORY.martialRanged]: [],
    }),
    toolProficiencies: f({}),
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
    mainAbility: f([ABILITIES.dexterity, ABILITIES.wisdom]), // TODO: twice
    hitDice: D[8],
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITIES.strength, ABILITIES.dexterity]),
    skills: f({
      choice: {
        selector: buildSelector(SOURCE_KEY.SKILLS),
        target: derivedProperties.skills,
      },
      nb: 2,
      list: f([SKILLS.acrobatics, SKILLS.athletics, SKILLS.history, SKILLS.insight, SKILLS.religion, SKILLS.stealth]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
      [WEAPON_CATEGORY.martialMelee]: [WEAPON_PROPERTY.Light],
      [WEAPON_CATEGORY.martialRanged]: [WEAPON_PROPERTY.Light],
    }),
    toolProficiencies: f({
      choice: {
        selector: buildSelector(SOURCE_KEY.TOOLS),
        target: derivedProperties.toolProficiencies,
      },
      type: INSERTION_TYPE.select,
      max: 1,
      from: [TOOL_CATEGORY.Artisan, TOOL_CATEGORY.MusicalInstrument],
    }),
    armorProficiencies: f([]),
    shieldProficiency: false,
    effects: {
      [EFFECTS.SpeedModifierEffect]: {
        condition: function ({ equipedArmor, equipedShield }) { return !equipedArmor && !equipedShield },
        apply: function ({ speed }) { return speed + this.specificProps.speedModifier(this.level) },
      },
    },
    features: f([
      f({ name: 'martialArts', atLevel: 1, }), // TODO
      f({
        name: 'unarmoredDefense', atLevel: 1,
        effects: {
          [EFFECTS.ACOverrideEffect]: {
            condition: function ({ equipedArmor, equipedShield, }) { return !equipedArmor && !equipedShield },
            apply: function ({ modifiers }) { return 10 + modifiers[ABILITIES.dexterity] + modifiers[ABILITIES.wisdom] },
          }
        },
      }),
      f({ name: 'monksFocus', atLevel: 2, }),
      f({ name: 'unarmoredMovement', atLevel: 2, }),
      f({ name: 'uncannyMetabolism', atLevel: 2, }),
      f({ name: 'deflectAttacks', atLevel: 3, }),
      f({
        name: 'monkSubClass', atLevel: 3, effects: {
          [EFFECTS.SubClassChooseEffect]: {
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
          [EFFECTS.ReduceFallDamageEffect]: {
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
          [EFFECTS.AddFeatEffect]: { // TODO: Epic
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
    mainAbility: f([ABILITIES.strength, ABILITIES.charisma]), // TODO: twice
    hitDice: D[10],
    hitPointMax: { base: 10, addPerLevel: 6, },
    saves: f([ABILITIES.wisdom, ABILITIES.charisma]), // TODO: choose
    skills: f({
      choice: {
        selector: buildSelector(SOURCE_KEY.SKILLS),
        target: derivedProperties.skills,
      },
      nb: 2,
      list: f([SKILLS.athletics, SKILLS.insight, SKILLS.intimidation, SKILLS.medicine, SKILLS.persuasion, SKILLS.religion]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
      [WEAPON_CATEGORY.martialMelee]: [],
      [WEAPON_CATEGORY.martialRanged]: [],
    }),
    toolProficiencies: f({}),
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
    mainAbility: f([ABILITIES.dexterity, ABILITIES.wisdom]), // TODO: twice
    hitDice: D[10],
    hitPointMax: { base: 10, addPerLevel: 6, },
    saves: f([ABILITIES.strength, ABILITIES.dexterity]),
    skills: f({
      choice: {
        selector: buildSelector(SOURCE_KEY.SKILLS),
        target: derivedProperties.skills,
      },
      nb: 3,
      list: f([SKILLS.animalHandling, SKILLS.athletics, SKILLS.insight, SKILLS.investigation, SKILLS.nature, SKILLS.perception, SKILLS.stealth, SKILLS.survival]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
      [WEAPON_CATEGORY.martialMelee]: [],
      [WEAPON_CATEGORY.martialRanged]: [],
    }),
    toolProficiencies: f({}),
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
    mainAbility: f([ABILITIES.dexterity]),
    hitDice: D[8],
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITIES.dexterity, ABILITIES.intelligence]),
    skills: f({
      choice: {
        selector: buildSelector(SOURCE_KEY.SKILLS),
        target: derivedProperties.skills,
      },
      nb: 4,
      list: f([SKILLS.acrobatics, SKILLS.athletics, SKILLS.deception, SKILLS.insight, SKILLS.intimidation, SKILLS.investigation, SKILLS.perception, SKILLS.persuasion, SKILLS.sleightOfHand, SKILLS.stealth]),
    }),
    weaponProficiencies: f({
      [WEAPON_CATEGORY.simpleMelee]: [],
      [WEAPON_CATEGORY.simpleRanged]: [],
      [WEAPON_CATEGORY.martialMelee]: [WEAPON_PROPERTY.Finesse, WEAPON_PROPERTY.Light],
      [WEAPON_CATEGORY.martialRanged]: [WEAPON_PROPERTY.Finesse, WEAPON_PROPERTY.Light],
    }),
    toolProficiencies: f({
      type: INSERTION_TYPE.forced,
      tools: [TOOLS.thievesTools],
    }),
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
    mainAbility: f([ABILITIES.charisma]),
    hitDice: D[6],
    hitPointMax: { base: 6, addPerLevel: 4, },
    saves: f([ABILITIES.constitution, ABILITIES.charisma]),
    skills: f({
      choice: {
        selector: buildSelector(SOURCE_KEY.SKILLS),
        target: derivedProperties.skills,
      },
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
    mainAbility: f([ABILITIES.charisma]),
    hitDice: D[8],
    hitPointMax: { base: 8, addPerLevel: 5, },
    saves: f([ABILITIES.wisdom, ABILITIES.charisma]),
    skills: f({
      choice: {
        selector: buildSelector(SOURCE_KEY.SKILLS),
        target: derivedProperties.skills,
      },
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
    mainAbility: f([ABILITIES.intelligence]),
    hitDice: D[6],
    hitPointMax: { base: 6, addPerLevel: 4, },
    saves: f([ABILITIES.intelligence, ABILITIES.wisdom]),
    skills: f({
      choice: {
        selector: buildSelector(SOURCE_KEY.SKILLS),
        target: derivedProperties.skills,
      },
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
export default function (className, subClassName, level) {
  if (!className) return
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
