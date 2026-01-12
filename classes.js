const classes = {

  barbarian: {
    saves: ['strenght', 'constitution'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['animalHandling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'],
    features: {
      1: { features: [], rages: 2, rageDamage: 2, weaponMastery: 0 },
    }
  },
  bard: {
    saves: ['dexterity', 'charisma'],
    authorizedNumberSkills: 3,
    authorizedSkills: [ 'acrobatics', 'animalHandling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleightOfHand', 'stealth', 'survival'],
  },
  cleric: {
    saves: ['wisdom', 'charisma'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['history', 'insight', 'medicine', 'persuasion', 'religion'],
  },
  druid: {
    saves: ['intelligence', 'wisdom'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['animalHandling', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival'],
  },
  fighter: {
    saves: ['strenght', 'constitution'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['acrobatics', 'animalHandling', 'athletics', 'history', 'insight', 'intimidation', 'persuasion', 'perception', 'survival'],
  },
  monk: {
    saves: ['strenght', 'dexterity'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth'],
  },
  paladin: {
    saves: ['wisdom', 'charisma'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion'],
  },
  ranger: {
    saves: ['strenght', 'dexterity'],
    authorizedNumberSkills: 3,
    authorizedSkills: ['animalHandling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'sruvival'],
  },
  rogue: {
    saves: ['dexterity', 'intelligence'],
    authorizedNumberSkills: 4,
    authorizedSkills: ['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'persuasion', 'sleightOfHand', 'stealth'],
  },
  sorcerer: {
    saves: ['constitution', 'charisma'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion'],
  },
  warlock: {
    saves: ['wisdom', 'charisma'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion'],
  },
  wizard: {
    saves: ['intelligence', 'wisdom'],
    authorizedNumberSkills: 2,
    authorizedSkills: ['arcana', 'history', 'insight', 'medicine', 'nature', 'religion'],
  },
}