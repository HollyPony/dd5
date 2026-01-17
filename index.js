import { populateSelect } from './modules/lib.js'
import * as userData from './modules/userData.js'
import { classes, } from './modules/data/classes.js'
import { origins, } from './modules/data/origins.js'
import { races, } from './modules/data/races.js'
import { weapons, } from './modules/data/weapons.js'
import { abilities, getAllSkills } from './modules/data/abilities.js'

const charsheet = {
  charName: 'Titus Minus',
  charClass: 'wizard',
  charSubClass: undefined,
  charLevel: 1,
  charOrigin: 'farmer',
  charRace: 'dwarf',
  charAlignment: 'neutralGood',
  charExperience: 200,
  attributes: {
    strength: 15,
    dexterity: 14,
    constitution: 13,
    wisdom: 10,
    intelligence: 8,
    charisma: 12,
  },
  skillChoosed: [],
}

// INPUTS

const charNameElement = document.getElementsByName('charName')[0]
const charClassElement = document.getElementsByName('charClass')[0]
const charSubClassElement = document.getElementsByName('charSubClass')[0]
const charLevelElement = document.getElementsByName('charLevel')[0]
const charOriginElement = document.getElementsByName('charOrigin')[0]
const charRaceElement = document.getElementsByName('charRace')[0]
const charAlignmentElement = document.getElementsByName('alignment')[0]
const charExperienceElement = document.getElementsByName('experiencepoints')[0]

const proficiencyBonus = document.getElementsByName('proficiencybonus')[0]

const abilityElements = Object.keys(abilities).reduce((acc, ability) => {
  const abilityElement = document.getElementsByClassName(`${ability}`)[0]

  return {
    ...acc,
    [ability]: {
      root: abilityElement,
      score: abilityElement.getElementsByClassName('ability-score')[0],
      modifier: abilityElement.getElementsByClassName('ability-modifier')[0],
      saveCheck: abilityElement.getElementsByClassName('save-check')[0],
      saveScore: abilityElement.getElementsByClassName('save-score')[0],
    }
  }
}, {})

const skillElements = Object.values(abilities).reduce((acc, ability) => ({
  ...acc,
  ...ability.relatedSkills.reduce((accSkill, skill) => ({
    ...accSkill,
    [skill]: {
      check: document.getElementsByClassName(`skill-check ${skill}-check`)[0],
      score: document.getElementsByClassName(`skill-score ${skill}-score`)[0],
    }
  }), {})
}), {})

const weaponSelectElement = document.getElementsByName('weapons')[0]

// DISPLAY HELPERS

function skillAsText(score) { return score > 0 ? `+${score}` : `${score}` }

// DISPLAY UPDATES

function refreshSubClass() {
  if (userData.getCharClass()) {
    populateSelect(
      charSubClassElement,
      [
        { value: '', text: i18n._(userData.getCharLevel() < 3 ? `subClasses._unavailable` : `subClasses._select`) },
        ...Object.keys(classes[userData.getCharClass()].subClasses).map((subClassName) => ({
          value: subClassName,
          text: i18n._(`subClasses.${userData.getCharClass()}.${subClassName}`),
        })),
      ],
      { clear: true }
    )

    charSubClassElement.value = userData.getCharLevel() > 2 && userData.getCharSubClass() || ''
    charSubClassElement.disabled = userData.getCharLevel() < 3
  }
}

function refreshProficiencyBonus() {
  proficiencyBonus.value = skillAsText(userData.getProficencyBonus())
}

function updateAbilityScore(ability) {
  const abilityElement = abilityElements[ability]

  abilityElement.score.value = userData.getAbilityScore(ability)

  updateAbilityModifier(ability)
  updateAbilitySave(ability)
}

function updateAbilityModifier(ability) {
  abilityElements[ability].modifier.value = skillAsText(userData.getAbilityModifier(ability))

  abilities[ability].relatedSkills.forEach(updateSkillScore)
}

function updateAbilitySave(ability) {
  abilityElements[ability].saveScore.textContent = skillAsText(userData.getAbilitySave(ability))
  abilityElements[ability].saveCheck.checked = classes[userData.getCharClass()]?.saves?.includes(ability)
}

function updateSkillScore(skill) {
  const skillScoreElement = skillElements[skill].score

  skillScoreElement.textContent = skillAsText(userData.getSkillScore(skill))
}

// EVENTS

function charLevelChanged(event) {
  userData.setCharLevel(event.currentTarget.value)
  refreshSubClass()
  refreshProficiencyBonus()
  Object.keys(abilities).forEach(updateAbilityModifier)
  Object.keys(abilities).forEach(updateAbilitySave)
}

function charClassChanged(event) {
  userData.setCharClass(event.currentTarget.value)
  refreshSubClass()
}

function abilityScoreChanged(event) {
  const element = event.currentTarget

  const abilityName = element.dataset.ability
  userData.setAttribute(abilityName, element.value)

  updateAbilityModifier(abilityName)
}

function skillChecked(event) {
  const element = event.currentTarget

  const skill = element.name
  const skillChecked = skillElements[skill].check.checked

  userData[skillChecked ? 'addSkillChoosed' : 'removeSkillChoosed'](skill)

  updateSkillScore(skill)

  getAllSkills().forEach((skill) => {
    skillElements[skill].check.disabled = userData.isDisabledSkill(skill)
  })
}

// INITIALIZATION

function init(charsheet) {
  populateSelect(
    charOriginElement,
    Object.keys(origins).map((originName) => ({ value: originName, text: i18n._(`origins.${originName}`), }))
  )

  populateSelect(
    charClassElement,
    Object.keys(classes).map((className) => ({ value: className, text: i18n._(`classes.${className}`), }))
  )

  populateSelect(
    charRaceElement,
    Object.keys(races).map((raceName) => ({ value: raceName, text: i18n._(`races.${raceName}`), }))
  )

  populateSelect(
    weaponSelectElement,
    [
      { value: '', text: i18n._('weapons._select') },
      ...
      Object.entries(weapons).map(([weaponClass, weapons]) => ({
        isGroup: true,
        label: i18n._(`weaponClasses.${weaponClass}`),
        options: Object.keys(weapons).map(weapon => ({ value: weapon, text: i18n._(`weapons.${weapon}`) })),
      })),
    ]
  )

  // Init data
  userData.init(charsheet)

  charNameElement.value = userData.getCharName()
  charClassElement.value = userData.getCharClass()

  charOriginElement.value = userData.getCharOrigin()
  charRaceElement.value = userData.getCharRace()

  charAlignmentElement.value = userData.getCharAlignment()
  charExperienceElement.value = userData.getCharExperience()
  charLevelElement.value = userData.getCharLevel()

  Object.entries(abilities).forEach(([abilityName, abilityValue]) => {
    abilityValue.relatedSkills.forEach(skill => {
      skillElements[skill].check.disabled = userData.isDisabledSkill(skill)
      skillElements[skill].check.checked = userData.isCheckedSkill(skill)
    })

    updateAbilityScore(abilityName)
  })

  refreshProficiencyBonus()
  refreshSubClass()
}

function setBindings() {
  charLevelElement.addEventListener('change', charLevelChanged)
  charClassElement.addEventListener('change', charClassChanged)
  for (element of Object.values(skillElements).map(_ => _.check)) { element.addEventListener('change', skillChecked) }
  for (element of Object.values(abilityElements).map(_ => _.score)) { element.addEventListener('change', abilityScoreChanged) }
}

setBindings()
init(charsheet)
