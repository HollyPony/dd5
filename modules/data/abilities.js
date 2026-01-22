import { f, } from '../helpers.js'
import { ABILITY } from './common.js'

export const abilities = f({
  [ABILITY.strength]: f({
    relatedSkills: f(['athletics']),
  }),
  [ABILITY.dexterity]: f({
    relatedSkills: f(['acrobatics', 'sleightOfHand', 'stealth',]),
  }),
  [ABILITY.constitution]: f({
    relatedSkills: f([]),
  }),
  [ABILITY.wisdom]: f({
    relatedSkills: f(['animalHandling', 'insight', 'medicine', 'perception', 'survival',]),
  }),
  [ABILITY.intelligence]: f({
    relatedSkills: f(['arcana', 'history', 'investigation', 'nature', 'religion',]),
  }),
  [ABILITY.charisma]: f({
    relatedSkills: f(['deception', 'intimidation', 'performance', 'persuasion',]),
  }),
})

export function getAllSkills() {
  return Object.values(abilities).flatMap(value => value.relatedSkills)
}

export function getAbilityFromSkill(skill) {
  return Object.keys(abilities).find(ability => abilities[ability].relatedSkills.includes(skill))
}
