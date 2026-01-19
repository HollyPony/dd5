import { f, } from '../lib.js'

export const abilities = f({
  strength: f({
    relatedSkills: f(['athletics']),
  }),
  dexterity: f({
    relatedSkills: f(['acrobatics', 'sleightOfHand', 'stealth',]),
  }),
  constitution: f({
    relatedSkills: f([]),
  }),
  wisdom: f({
    relatedSkills: f(['animalHandling', 'insight', 'medicine', 'perception', 'survival',]),
  }),
  intelligence: f({
    relatedSkills: f(['arcana', 'history', 'investigation', 'nature', 'religion',]),
  }),
  charisma: f({
    relatedSkills: f(['deception', 'intimidation', 'performance', 'persuasion',]),
  }),
})

export function getAllSkills() {
  return Object.values(abilities).flatMap(value => value.relatedSkills)
}

export function getAbilityFromSkill(skill) {
  return Object.keys(abilities).find(ability => abilities[ability].relatedSkills.includes(skill))
}
