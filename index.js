import { Ability } from './components/Ability/index.js'
import { OriginSelect } from './components/OriginSelect/index.js'
import { SpeciesSelect } from './components/SpeciesSelect/index.js'
import { ClassSelect } from './components/ClassSelect/index.js'
import { SubClassSelect } from './components/SubClassSelect/index.js'
import { ClassFeatures } from './components/ClassFeatures/index.js'
import { ClassBase } from './components/ClassBase/index.js'
import { ClassFeature } from './components/ClassFeature/index.js'
import { WeaponSelect } from './components/WeaponSelect/index.js'
import { Trainings } from './components/Trainings/index.js'
import { Stats } from './components/Stats/index.js'
import { WeaponsCantrip } from './components/WeaponsCantrip/index.js'
import { SpeciesTraits } from './components/SpeciesTraits/index.js'
import { Feats } from './components/Feats/index.js'
import { Specs } from './components/Specs/index.js'
import { AbstractComponent } from './components/AbstractComponent/index.js'

import { DICES as D, } from './modules/common.js'
import { ALL } from './modules/stores/createObservableStore.js'
import initTranslations, { i18n } from '/modules/i18n.js'
import charSheet from './modules/stores/charSheet.store.js'
import { ExportError, ImportError } from './modules/errors.js'
import { debounce } from './modules/helpers.js'
import { fromJSON, loadLastCharsheet, saveAutosave } from './modules/storageManager.js'

const AUTOSAVE_DELAY_MS = 600

/////////////////////////////////////////////////////////////////////////
// ELEMENTS TO UPDATE ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

const charNameElement = document.getElementsByName('charName')[0]
const charLevelElement = document.getElementsByName('charLevel')[0]
const charExperienceElement = document.getElementsByName('experiencepoints')[0] // TODO: Update level with experience ?
const exportCharLink = document.getElementById("exportCharLink")
const importCharLink = document.getElementById("importCharLink")
const importCharFileElement = document.getElementById("importCharFile")

/////////////////////////////////////////////////////////////////////////
// DISPLAY HELPERS //////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

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

function refreshHitPointMax() {
  document.getElementsByName('hitPointMax')[0].value = charSheet.getHitPointMax()
}

function refreshHitDiceMax() {
  document.getElementsByName('hitDiceMax')[0].value = diceToString(charSheet.getHitDiceMax())
}

function refreshCharAlignment() {
  document.getElementsByName('alignment')[0].value = charSheet.getCharAlignment()
}


function refreshAll() {
  refreshCharName()
  refreshCharExperience()
  refreshCharLevel()
  refreshHitPointMax()
  refreshHitDiceMax()
  refreshCharAlignment()
  refreshArmorClass()
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
    charSheet.subscribe('charLevel', refreshHitPointMax),
    charSheet.subscribe('charClass', refreshHitPointMax),
    charSheet.subscribe('modifiers', refreshHitPointMax),
    charSheet.subscribe('charLevel', refreshHitDiceMax),
    charSheet.subscribe('charClass', refreshHitDiceMax),
    charSheet.subscribe('charAlignment', refreshCharAlignment),
    charSheet.subscribe('charClass', refreshArmorClass),
    charSheet.subscribe('equiped', refreshArmorClass),
    charSheet.subscribe('feats', refreshArmorClass),
    charSheet.subscribe('modifiers', refreshArmorClass),
    charSheet.subscribe(ALL, debounce(() => saveAutosave(charSheet.toJSON()), AUTOSAVE_DELAY_MS)),
    i18n.subscribe(() => AbstractComponent.notifyI18nChanged()),
  )
}

function unregisterSubscriptions() {
  while (subscriptions.length) {
    const unsubscribe = subscriptions.pop()
    if (unsubscribe) unsubscribe()
  }
}

/////////////////////////////////////////////////////////////////////////
// CONNECT HTML EVENTS //////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function setBindings() {
  exportCharLink.addEventListener('click', exportJSON)
  importCharLink.addEventListener('click', importCharClicked)
  importCharFileElement.addEventListener('change', importCharFileChanged)

  charNameElement.addEventListener('input', charNameChanged)
  charExperienceElement.addEventListener('change', charExperienceChanged)
}

function unregisterBindings() {
  exportCharLink.removeEventListener('click', exportJSON)
  importCharLink.removeEventListener('click', importCharClicked)
  importCharFileElement.removeEventListener('change', importCharFileChanged)

  charNameElement.removeEventListener('change', charNameChanged)
  charExperienceElement.removeEventListener('change', charExperienceChanged)
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


// REGISTER WEBCOMPONENTS

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
  Trainings.register()
  Stats.register()
  Specs.register()
  WeaponsCantrip.register()
  SpeciesTraits.register()
  Feats.register()
}

/////////////////////////////////////////////////////////////////////////
// POPULATE /////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function initApp() {
  charSheet.init(loadLastCharsheet())

  refreshAll()

  setBindings()
  registerCustomElements()
  registerSubscriptions()
  window.addEventListener('pagehide', destroyApp)

  initTranslations()
}

function destroyApp() {
  unregisterSubscriptions()
  unregisterBindings()
  window.removeEventListener('pagehide', destroyApp)
}

initApp()
