export const classes = {

  barbarian: {
    saves: ['strenght', 'constitution'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['animalHandling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'],
    features: {
      1: { features: [], rages: 2, rageDamage: 2, weaponMastery: 0 },
    },
    subClasses: {
      berserker: {},
      wildHeart: {},
      worldTree: {},
      zealot: {},
    },
  },
  bard: {
    saves: ['dexterity', 'charisma'],
    authorizedNumberSkills: 3,
    authorizedSkills: ['acrobatics', 'animalHandling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleightOfHand', 'stealth', 'survival'],
    subClasses: {
      dance: {},
      glamour: {},
      lore: {},
      valor: {},
    },
  },
  cleric: {
    saves: ['wisdom', 'charisma'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['history', 'insight', 'medicine', 'persuasion', 'religion'],
    subClasses: {
      life: {},
      light: {},
      trickery: {},
      war: {},
    },
  },
  druid: {
    saves: ['intelligence', 'wisdom'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['animalHandling', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival'],
    subClasses: {
      land: {},
      moon: {},
      sea: {},
      stars: {},
    },
  },
  fighter: {
    saves: ['strenght', 'constitution'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['acrobatics', 'animalHandling', 'athletics', 'history', 'insight', 'intimidation', 'persuasion', 'perception', 'survival'],
    subClasses: {
      battleMaster: {},
      champion: {},
      eldritchKnight: {},
      psiWarrior: {},
    },
  },
  monk: {
    saves: ['strenght', 'dexterity'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth'],
    subClasses: {
      mercy: {},
      shadow: {},
      elements: {},
      openHand: {},
    },
  },
  paladin: {
    saves: ['wisdom', 'charisma'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion'],
    subClasses: {
      devotion: {},
      glory: {},
      ancients: {},
      vengeance: {},
    },
  },
  ranger: {
    saves: ['strenght', 'dexterity'],
    authorizedNumberSkills: 3,
    authorizedSkills: ['animalHandling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'sruvival'],
    subClasses: {
      beast: {},
      fey: {},
      stalker: {},
      hunter: {},
    },
  },
  rogue: {
    saves: ['dexterity', 'intelligence'],
    authorizedNumberSkills: 4,
    authorizedSkills: ['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'persuasion', 'sleightOfHand', 'stealth'],
    subClasses: {
      arcana: {},
      assassin: {},
      soulknife: {},
      thief: {},
    },
  },
  sorcerer: {
    saves: ['constitution', 'charisma'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion'],
    subClasses: {
      aberrant: {},
      clockwork: {},
      draconic: {},
      wild: {},
    },
  },
  warlock: {
    saves: ['wisdom', 'charisma'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion'],
    subClasses: {
      archfey: {},
      celestial: {},
      fiend: {},
      old: {},
    },
  },
  wizard: {
    saves: ['intelligence', 'wisdom'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['arcana', 'history', 'insight', 'medicine', 'nature', 'religion'],
    subClasses: {
      abjureur: {},
      diviner: {},
      evoker: {},
      illusionist: {},
    },
  },
}