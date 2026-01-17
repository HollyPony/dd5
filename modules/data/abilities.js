export const abilities = {
  strength: {
    relatedSkills: ['athletics']
  },
  dexterity: {
    relatedSkills: ['acrobatics', 'sleightOfHand', 'stealth',]
  },
  constitution: {
    relatedSkills: []
  },
  wisdom: {
    relatedSkills: ['animalHandling', 'insight', 'medicine', 'perception', 'survival',]
  },
  intelligence: {
    relatedSkills: ['arcana', 'history', 'investigation', 'nature', 'religion',]
  },
  charisma: {
    relatedSkills: ['deception', 'intimidation', 'performance', 'persuasion',]
  },
}
export function getAllSkills() {
  return Object.values(abilities).reduce((acc, value) => acc.concat(value.relatedSkills), [])
}

export function getAbilityFromSkill(skill) {
  return Object.keys(abilities).find(ability => abilities[ability].relatedSkills.includes(skill))
}
