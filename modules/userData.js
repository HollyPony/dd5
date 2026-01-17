import { getAbilityFromSkill, } from './data/abilities.js'
import { classes, } from './data/classes.js'
import { origins, } from './data/origins.js'

const charsheet = {
  charName: '',
  charClass: '',
  charSubClass: undefined,
  charLevel: 1,
  charOrigin: '',
  charRace: '',
  charAlignment: '',
  charExperience: 0,
  attributes: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    charisma: 10,
  },
  skillChoosed: [],
}

// ACCESSORS

export function getCharName() { return charsheet.charName }
export function getCharClass() { return charsheet.charClass }
export function getCharSubClass() { return charsheet.charSubClass }
export function getCharLevel() { return charsheet.charLevel }
export function getCharOrigin() { return charsheet.charOrigin }
export function getCharRace() { return charsheet.charRace }
export function getCharAlignment() { return charsheet.charAlignment }
export function getCharExperience() { return charsheet.charExperience }
export function getAbilityScore(attributeName) { return charsheet.attributes[attributeName] }
export function getSkillChoosed() { return charsheet.skillChoosed }

// SETTERS

export function init(_charsheet) { Object.keys(charsheet).forEach(key => charsheet[key] = _charsheet[key]) }
export function setCharClass(charClass) { charsheet.charClass = charClass }
export function setCharSubClass(charSubClass) { charsheet.charSubClass = charSubClass }
export function setCharLevel(charLevel) { charsheet.charLevel = charLevel }
export function setCharOrigin(charOrigin) { charsheet.charOrigin = charOrigin }
export function setCharRace(charRace) { charsheet.charRace = charRace }
export function setcharAlignment(charAlignment) { charsheet.charAlignment = charAlignment }
export function setCharExperience(charExperience) { charsheet.charExperience = charExperience }
export function setAttribute(attributeName, score) { charsheet.attributes[attributeName] = parseInt(score) }
export function addSkillChoosed(skill) { getSkillChoosed().push(skill) }
export function removeSkillChoosed(skill) { getSkillChoosed().splice(getSkillChoosed().indexOf(skill), 1) }

// COMPUTED VALUES

export function getProficencyBonus() { return Math.floor(getCharLevel() / 4) + 2 }
export function getAbilityModifier(ability) { return Math.floor(getAbilityScore(ability) / 2) - 5 }
export function getAbilitySave(ability) {
  return classes[getCharClass()]?.saves?.includes(ability)
    ? getAbilityModifier(ability) + getProficencyBonus()
    : getAbilityModifier(ability)
}
export function isAuthorizedSkill(skill) {
  return classes[getCharClass()]?.authorizedSkills?.includes(skill)
}
export function isCheckedSkill(skill) {
  return origins[getCharOrigin()]?.skills?.includes(skill) || getSkillChoosed().includes(skill)
}
export function isDisabledSkill(skill) {
  return (!isAuthorizedSkill(skill)) || origins[getCharOrigin()]?.skills?.includes(skill) || !getSkillChoosed().includes(skill) && (getSkillChoosed().length >= classes[getCharClass()]?.authorizedNumberSkills ?? 0)
}
export function getSkillScore(skill) {
  return getAbilityModifier(getAbilityFromSkill(skill)) + (isCheckedSkill(skill) ? getProficencyBonus() : 0)
}
