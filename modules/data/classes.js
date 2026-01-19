import { f, } from '../lib.js'

const classes = f({
  barbarian: f({ // P.51
    mainAbility: f(['strength']),
    hitPointDice: 12, // TODO: +1 per level
    saves: f(['strength', 'constitution']),
    authorizedNumberSkills: 2,
    authorizedSkills: f(['animalHandling', 'athletics', 'intimidation', 'nature', 'perception', 'survival']),
    subClasses: f({
      berserker: f({}),
      wildHeart: f({}),
      worldTree: f({}),
      zealot: f({}),
    }),
  }),
  bard: f({ // P.57
    mainAbility: f(['charisma']),
    hitPointDice: 8, // TODO: +1 per level
    saves: f(['dexterity', 'charisma']),
    authorizedNumberSkills: 3,
    authorizedSkills: f(['acrobatics', 'animalHandling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleightOfHand', 'stealth', 'survival']),
    subClasses: f({
      dance: f({}),
      glamour: f({}),
      lore: f({}),
      valor: f({}),
    }),
  }),
  cleric: f({
    mainAbility: f(['wisdom']),
    hitPointDice: 8, // TODO: +1 per level
    saves: f(['wisdom', 'charisma']),
    authorizedNumberSkills: 2,
    authorizedSkills: f(['history', 'insight', 'medicine', 'persuasion', 'religion']),
    subClasses: f({
      life: f({}),
      light: f({}),
      trickery: f({}),
      war: f({}),
    }),
  }),
  druid: f({ // P.79
    mainAbility: f(['wisdom']),
    hitPointDice: 8, // TODO: +1 per level
    saves: f(['intelligence', 'wisdom']),
    authorizedNumberSkills: 2,
    authorizedSkills: f(['animalHandling', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival']),
    subClasses: f({
      land: f({}),
      moon: f({}),
      sea: f({}),
      stars: f({}),
    }),
  }),
  fighter: f({ // P.105
    mainAbility: f(['strength', 'dexterity']), // TODO: choose
    hitPointDice: 10, // TODO: +1 per level
    saves: f(['strength', 'constitution']),
    authorizedNumberSkills: 2,
    authorizedSkills: f(['acrobatics', 'animalHandling', 'athletics', 'history', 'insight', 'intimidation', 'persuasion', 'perception', 'survival']),
    subClasses: f({
      battleMaster: f({}),
      champion: f({}),
      eldritchKnight: f({}),
      psiWarrior: f({}),
    }),
  }),
  monk: f({ // P.127
    mainAbility: f(['dexterity', 'wisdom']), // TODO: twice
    hitPointDice: 8, // TODO: +1 per level
    saves: f(['strength', 'dexterity']),
    authorizedNumberSkills: 2,
    authorizedSkills: f(['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth']),
    features: f([
      f({ name: 'martialArts', atLevel: 1 }), // TODO
      f({
        name: 'unarmoredDefense', atLevel: 1, type: 'ACOverride',
        condition: (inputs) => !inputs.hasArmor && !inputs.hasShield,
        apply: (modifiers) => 10 + modifiers['dexterity'] + modifiers['wisdom']
      }),
    ]),
    subClasses: f({
      mercy: f({}),
      shadow: f({}),
      elements: f({}),
      openHand: f({}),
    }),
    specificProps: {
      martialArtsPoints: (level) => level < 5 ? 6 : level < 11 ? 8 : level < 17 ? 10 : 12,
    }
  }),
  paladin: f({ // P.147
    mainAbility: f(['strength', 'charisma']), // TODO: twice
    hitPointDice: 10, // TODO: +1 per level
    saves: f(['wisdom', 'charisma']), // TODO: choose
    authorizedNumberSkills: 2,
    authorizedSkills: f(['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion']),
    subClasses: f({
      devotion: f({}),
      glory: f({}),
      ancients: f({}),
      vengeance: f({}),
    }),
  }),
  ranger: f({ // P.157
    mainAbility: f(['dexterity', 'wisdom']), // TODO: twice
    hitPointDice: 10, // TODO: +1 per level
    saves: f(['strength', 'dexterity']),
    authorizedNumberSkills: 3,
    authorizedSkills: f(['animalHandling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'sruvival']),
    subClasses: f({
      beast: f({}),
      fey: f({}),
      stalker: f({}),
      hunter: f({}),
    }),
  }),
  rogue: f({ // P.167
    mainAbility: f(['dexterity']),
    hitPointDice: 8, // TODO: +1 per level
    saves: f(['dexterity', 'intelligence']),
    authorizedNumberSkills: 4,
    authorizedSkills: f(['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'persuasion', 'sleightOfHand', 'stealth']),
    subClasses: f({
      arcana: f({}),
      assassin: f({}),
      soulknife: f({}),
      thief: f({}),
    }),
  }),
  sorcerer: f({ // P. 91
    mainAbility: f(['charisma']),
    hitPointDice: 6, // TODO: +1 per level
    saves: f(['constitution', 'charisma']),
    authorizedNumberSkills: 2,
    authorizedSkills: f(['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion']),
    subClasses: f({
      aberrant: f({}),
      clockwork: f({}),
      draconic: f({}),
      wild: f({}),
    }),
  }),
  warlock: f({ // P.135
    mainAbility: f(['charisma']),
    hitPointDice: 8, // TODO: +1 per level
    saves: f(['wisdom', 'charisma']),
    authorizedNumberSkills: 2,
    authorizedSkills: f(['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion']),
    subClasses: f({
      archfey: f({}),
      celestial: f({}),
      fiend: f({}),
      old: f({}),
    }),
  }),
  wizard: f({ // P.115
    mainAbility: f(['intelligence']),
    hitPointDice: 6, // TODO: +1 per level
    saves: f(['intelligence', 'wisdom']),
    authorizedNumberSkills: 2,
    authorizedSkills: f(['arcana', 'history', 'insight', 'medicine', 'nature', 'religion']),
    subClasses: f({
      abjureur: f({}),
      diviner: f({}),
      evoker: f({}),
      illusionist: f({}),
    }),
  }),
})

export function getList() { return Object.keys(classes) }
export function getSubClasses(className) { return Object.keys(classes[className].subClasses) }
export default function get(className, subClassName, level) {
  const { subClasses, ...classBase } = classes[className]
  if (!subClassName) {
    return classBase
  }
  const subClass = subClasses?.[subClassName]
  if (!subClass) {
    console.warn(`Subclass ${lineageName} invalid for ${className}`)
    return classBase
  }

  return f({
    ...classBase,
    ...subClass,
    traits: [...(classBase?.traits || []), ...(subClass?.traits?.filter(trait => trait.atLevel >= level) || []),],
    spells: [...(classBase?.spells || []), ...(subClass?.spells?.filter(spell => spell.atLevel >= level) || []),],
  })
}