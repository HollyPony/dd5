import { Ability } from './components/Ability/index.js'
import { OriginSelect } from './components/OriginSelect/index.js'
import { SpeciesSelect } from './components/SpeciesSelect/index.js'
import { ClassSelect } from './components/ClassSelect/index.js'
import { SubClassSelect } from './components/SubClassSelect/index.js'
import { ClassFeatures } from './components/ClassFeatures/index.js'
import { ClassBase } from './components/ClassBase/index.js'
import { ClassFeature } from './components/ClassFeature/index.js'
import { WeaponSelect } from './components/WeaponSelect/index.js'

import { ABILITY, D, SKILLS } from './modules/common.js'
import { createElement, populateSelect, removeAllChildren, } from './modules/domlib.js'
import { i18n } from '/modules/i18n.js'
import * as userData from './modules/userData.js'
import { ARMOR_CATEGORY, getWeapons, } from './modules/data/equipments.js'


// TODO: remove mock
import { mock as storedData } from './modules/storeManager.js'

/////////////////////////////////////////////////////////////////////////
// INPUTS ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

const charLevelElement = document.getElementsByName('charLevel')[0]

// TODO: Update level with experience ?
const charExperienceElement = document.getElementsByName('experiencepoints')[0]

const exportCharLink = document.getElementById("exportCharLink")

const trainingsElements = {
  armorLight: document.getElementsByName('trainings-armor-light')[0],
  armorMedium: document.getElementsByName('trainings-armor-medium')[0],
  armorHeavy: document.getElementsByName('trainings-armor-heavy')[0],
  shield: document.getElementsByName('trainings-shield')[0],
  weaponsList: document.getElementsByClassName('trainings-weapons-list')[0],
  toolsList: document.getElementsByClassName('trainings-tools-list')[0],
}

//////////////////////////////////////////////////////////////////////
// DISPLAY HELPERS //////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function skillAsText(score) { return score > 0 ? `+${score}` : `${score}` }

function diceToString({ number, dice }) {
  return D[dice] ? `${number}d${dice}` : 'err' // TODO:
}

// DISPLAY UPDATES

function refreshCharName() {
  document.getElementsByName('charName')[0].value = userData.getCharName()
}

function refreshCharExperience() {
  charExperienceElement.value = userData.getCharExperience()
}

function refreshCharLevel() {
  charLevelElement.value = userData.getCharLevel()
}

function refreshArmorClass() {
  document.getElementsByName('armorClass')[0].value = userData.getArmorClass()
}

function refreshProficiencyBonus() {
  document.getElementsByName('proficiencybonus')[0].value = skillAsText(userData.getProficencyBonus())
}

function refreshHitPointMax() {
  document.getElementsByName('hitPointMax')[0].value = userData.getHitPointMax()
}

function refreshHitDiceMax() {
  document.getElementsByName('hitDiceMax')[0].value = diceToString(userData.getHitDiceMax())
}

function refreshInitiative() {
  document.getElementsByName('specs.initiative')[0].value = userData.getAbilityModifier(ABILITY.dexterity)
}

function refreshSpeed() {
  document.getElementsByName('specs.speed')[0].value = userData.getCharSpeed()
}

function refreshSize() {
  document.getElementsByClassName('size-category')[0].value = userData.getSizeCategory()
  document.getElementsByName('specs.size')[0].value = userData.getSize() || ''
}

function refreshPassivePerception() {
  document.getElementsByName('specs.passivePerception')[0].value = userData.getSkillScore(SKILLS.perception) + 10
}

function refreshCharAlignment() {
  document.getElementsByName('alignment')[0].value = userData.getCharAlignment()
}

function refreshTrainings() {
  const armorProficiencies = userData.getArmorProficiencies()
  trainingsElements.armorLight.checked = armorProficiencies.includes(ARMOR_CATEGORY.Light)
  trainingsElements.armorMedium.checked = armorProficiencies.includes(ARMOR_CATEGORY.Medium)
  trainingsElements.armorHeavy.checked = armorProficiencies.includes(ARMOR_CATEGORY.Heavy)
  trainingsElements.shield.checked = userData.getShieldProficiency()
  removeAllChildren(trainingsElements.weaponsList)
  userData.getWeaponProficiencies().forEach(proficiency => {
    const proficiencySplitted = proficiency.split('.').filter(_ => !['WEAPON_CATEGORY', 'WEAPON_PROPERTY'].includes(_))
    return trainingsElements.weaponsList.appendChild(createElement('p', i18n._(['stats.trainings.weapons']
      .concat(proficiencySplitted, proficiencySplitted.length === 1 ? 'all' : [])
      .join('.')
    )))
  })

  removeAllChildren(trainingsElements.toolsList)
}

/////////////////////////////////////////////////////////////////////////
// EVENTS ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function charLevelChanged({ target: { value } }) {
  userData.setCharLevel(value)

  refreshHitPointMax() // TODO: from event ?
  refreshHitDiceMax() // TODO: from event ?
  refreshProficiencyBonus() // TODO: from event ?

  // Update species abilities / spells etc ...

  // TODO: userData.reloadSpecies
}

/////////////////////////////////////////////////////////////////////////
// STORAGE //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function exportJSON() {
  const baseHref = exportCharLink.href
  const baseDowload = exportCharLink.download

  const json = userData.toJSON()
  const blob = new Blob([json], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  exportCharLink.download = userData.getCharName().replace(/[^a-zA-Z0-9 ]/g, '')
  exportCharLink.href = url

  // nettoyage mémoire
  setTimeout(() => {
    exportCharLink.href = baseHref
    exportCharLink.download = baseDowload
    URL.revokeObjectURL(url)
  }, 0)
}

/////////////////////////////////////////////////////////////////////////
// INITIALIZATION ///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function init() {
  const charsheet = storedData

  // Init data
  userData.init(charsheet)

  refreshCharName()

  refreshCharExperience()
  refreshCharLevel()

  refreshHitPointMax()
  refreshHitDiceMax()
  refreshInitiative()
  refreshSpeed()
  refreshSize()
  refreshPassivePerception()
  refreshCharAlignment()
  refreshTrainings()

  refreshArmorClass()
  refreshProficiencyBonus()

  setBindings()
  registerCustomElements()

  // userData.toJSON()

  i18n.applyTranslations()
}

function setBindings() {
  exportCharLink.addEventListener("click", exportJSON)

  charLevelElement.addEventListener('change', charLevelChanged)
}

function registerCustomElements() {
  Ability.register()
  OriginSelect.register()
  SpeciesSelect.register()
  ClassSelect.register()
  SubClassSelect.register()
  ClassFeatures.register()
  ClassBase.register()
  ClassFeature.register()
  WeaponSelect.register()

  // customElements
  // .whenDefined('data-uint')
  // .then((promise) => {
  //   const x = document.body.children[0]; 
  //   console.log(x.constructor.name);
  //   x.value = 10;
  // });
}

init()
