import { Ability } from './components/Ability/index.js'
import { OriginSelect } from './components/OriginSelect/index.js'
import { SpeciesSelect } from './components/SpeciesSelect/index.js'
import { ClassSelect } from './components/ClassSelect/index.js'
import { SubClassSelect } from './components/SubClassSelect/index.js'
import { ClassFeatures } from './components/ClassFeatures/index.js'
import { ClassBase } from './components/ClassBase/index.js'
import { ClassFeature } from './components/ClassFeature/index.js'
import { WeaponSelect } from './components/WeaponSelect/index.js'

import { DICES as D, } from './modules/common.js'
import { createElement, removeAllChildren, } from './modules/domlib.js'
import { i18n } from '/modules/i18n.js'
import charSheet from './modules/stores/charSheet.store.js'
import { ARMOR_CATEGORY, } from './modules/data/equipments.js'
import { ExportError, ImportError } from './modules/errors.js'

import { fromJSON } from './modules/storageManager.js'

/////////////////////////////////////////////////////////////////////////
// ELEMENTS TO UPDATE ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

const charNameElement = document.getElementsByName('charName')[0]
const charLevelElement = document.getElementsByName('charLevel')[0]
const charExperienceElement = document.getElementsByName('experiencepoints')[0] // TODO: Update level with experience ?
const exportCharLink = document.getElementById("exportCharLink")
const importCharLink = document.getElementById("importCharLink")
const importCharFileElement = document.getElementById("importCharFile")
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
  document.getElementsByName('charName')[0].value = charSheet.getCharName()
}

function refreshCharExperience() {
  charExperienceElement.value = charSheet.getCharExperience()
}

function refreshCharLevel() {
  charLevelElement.value = charSheet.getCharLevel()
}

function refreshArmorClass() {
  document.getElementsByName('armorClass')[0].value = charSheet.getArmorClass()
}

function refreshProficiencyBonus() {
  document.getElementsByName('proficiencybonus')[0].value = skillAsText(charSheet.getProficiencyBonus())
}

function refreshHitPointMax() {
  document.getElementsByName('hitPointMax')[0].value = charSheet.getHitPointMax()
}

function refreshHitDiceMax() {
  document.getElementsByName('hitDiceMax')[0].value = diceToString(charSheet.getHitDiceMax())
}

function refreshInitiative() {
  document.getElementsByName('specs.initiative')[0].value = charSheet.getInitiative()
}

function refreshSpeed() {
  document.getElementsByName('specs.speed')[0].value = charSheet.getCharSpeed()
}

function refreshSize() {
  document.getElementsByClassName('size-category')[0].value = charSheet.getCharSizeCategory()
  document.getElementsByName('specs.size')[0].value = charSheet.getCharSize() || ''
}

function refreshPassivePerception() {
  document.getElementsByName('specs.passivePerception')[0].value = charSheet.getPassivePerception()
}

function refreshCharAlignment() {
  document.getElementsByName('alignment')[0].value = charSheet.getCharAlignment()
}

function refreshTrainings() {
  const armorProficiencies = charSheet.getArmorProficiencies()
  trainingsElements.armorLight.checked = armorProficiencies?.includes(ARMOR_CATEGORY.Light)
  trainingsElements.armorMedium.checked = armorProficiencies?.includes(ARMOR_CATEGORY.Medium)
  trainingsElements.armorHeavy.checked = armorProficiencies?.includes(ARMOR_CATEGORY.Heavy)
  trainingsElements.shield.checked = charSheet.getShieldProficiency()
  removeAllChildren(trainingsElements.weaponsList)
  charSheet.getWeaponProficiencies().forEach(proficiency => trainingsElements.weaponsList
    .appendChild(createElement('p', i18n._(['stats.trainings.weapons']
      .concat(proficiency.length === 1 ? [proficiency, 'all'] : proficiency)
      .join('.')
    )))
  )

  removeAllChildren(trainingsElements.toolsList)
}

function refreshAll() {
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
}

/////////////////////////////////////////////////////////////////////////
// SUBSCRIPTIONS ////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

const subscriptions = []

function registerSubscriptions() {
  subscriptions.push(
    charSheet.subscribe('charName', refreshCharName),
    charSheet.subscribe('charExperience', refreshCharExperience),
    charSheet.subscribe('charLevel', refreshCharLevel),
    charSheet.subscribe('proficiencyBonus', refreshProficiencyBonus),
    charSheet.subscribe('charLevel', refreshHitPointMax),
    charSheet.subscribe('charClass', refreshHitPointMax),
    charSheet.subscribe('modifiers', refreshHitPointMax),
    charSheet.subscribe('charLevel', refreshHitDiceMax),
    charSheet.subscribe('charClass', refreshHitDiceMax),
    charSheet.subscribe('modifiers', refreshInitiative),
    charSheet.subscribe('charSpecies', refreshSpeed),
    charSheet.subscribe('equiped', refreshSpeed),
    charSheet.subscribe('feats', refreshSpeed),
    charSheet.subscribe('charSizeCategory', refreshSize),
    charSheet.subscribe('charSize', refreshSize),
    charSheet.subscribe('classSkills', refreshPassivePerception),
    charSheet.subscribe('modifiers', refreshPassivePerception),
    charSheet.subscribe('charAlignment', refreshCharAlignment),
    charSheet.subscribe('charClass', refreshTrainings),
    charSheet.subscribe('feats', refreshTrainings),
    charSheet.subscribe('charClass', refreshArmorClass),
    charSheet.subscribe('equiped', refreshArmorClass),
    charSheet.subscribe('feats', refreshArmorClass),
    charSheet.subscribe('modifiers', refreshArmorClass),
  )
}

function unregisterSubscriptions() {
  while (subscriptions.length) {
    const unsubscribe = subscriptions.pop()
    if (unsubscribe) unsubscribe()
  }
}

/////////////////////////////////////////////////////////////////////////
// EVENTS ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function charNameChanged({ target: { value } }) {
  charSheet.setCharName(value)
}

function charExperienceChanged({ target: { value } }) {
  charSheet.setCharExperience(value)
}

/////////////////////////////////////////////////////////////////////////
// STORAGE //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function exportJSON(event) {
  event?.preventDefault()

  let json
  try {
    json = charSheet.toJSON()
  } catch (error) {
    throw new ExportError(error?.message)
  }

  const blob = new Blob([json], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')


  // const safeName = (charSheet.getCharName() || '').replace(/[^a-zA-Z0-9 ]/g, '').trim()
  link.download = charSheet.getCharName().replace(/[^a-zA-Z0-9 ]/g, '').trim() || 'TheCharacterWithNoName'
  link.href = url
  link.click()

  // nettoyage mémoire
  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 0)
}

async function importFromJSONFile(file) {
  try {
    const jsonText = await file.text()
    const jsData = fromJSON(jsonText)
    charSheet.init(jsData, true)
    refreshAll()
  } catch (error) {
    throw new ImportError(error?.message)
  }
}

function importCharClicked(event) {
  event.preventDefault()
  importCharFileElement.click()
}

function importCharFileChanged({ target: { files } }) {
  if (!files?.length) return
  importFromJSONFile(files[0])
  importCharFileElement.value = ''
}

function setBindings() {
  exportCharLink.addEventListener('click', exportJSON)
  importCharLink.addEventListener('click', importCharClicked)
  importCharFileElement.addEventListener('change', importCharFileChanged)

  charNameElement.addEventListener('change', charNameChanged)
  charExperienceElement.addEventListener('change', charExperienceChanged)
}

function unregisterBindings() {
  exportCharLink.removeEventListener('click', exportJSON)
  importCharLink.removeEventListener('click', importCharClicked)
  importCharFileElement.removeEventListener('change', importCharFileChanged)

  charNameElement.removeEventListener('change', charNameChanged)
  charExperienceElement.removeEventListener('change', charExperienceChanged)
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
}

/////////////////////////////////////////////////////////////////////////
// POPULATE /////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function initApp() {
  charSheet.init()

  refreshAll()

  setBindings()
  registerCustomElements()
  registerSubscriptions()
  window.addEventListener('beforeunload', destroyApp)

  i18n.applyTranslations()
}

function destroyApp() {
  unregisterSubscriptions()
  unregisterBindings()
  window.removeEventListener('beforeunload', destroyApp)
}

initApp()
