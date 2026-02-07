import { Ability } from './components/Ability/index.js'
import { OriginSelect } from './components/OriginSelect/index.js'
import { SpeciesSelect } from './components/SpeciesSelect/index.js'
import { ClassSelect } from './components/ClassSelect/index.js'
import { SubClassSelect } from './components/SubClassSelect/index.js'
import { ClassFeatures } from './components/ClassFeatures/index.js'
import { ClassBase } from './components/ClassFeatures/ClassBase/index.js'
import { ClassFeature } from './components/ClassFeatures/ClassFeature/index.js'
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
import initTranslations, { t, i18n } from './modules/i18n.js'
import charSheet from './modules/stores/charSheet.store.js'
import { TechnicalError, } from './modules/errors.js'
import { debounce, } from './modules/helpers.js'
import charSheetService from './modules/services/charSheet.service.js'
import { createElement, domSubscribe, fillElement, } from './modules/domlib.js'
import './modules/toast.js'

const AUTOSAVE_DELAY_MS = 600

/////////////////////////////////////////////////////////////////////////
// ELEMENTS TO UPDATE ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

const charNameElement = document.getElementsByName('charName')[0]
const charLevelElement = document.getElementsByName('charLevel')[0]
const charExperienceElement = document.getElementsByName('experiencepoints')[0]
const exportCharLink = document.getElementById("exportCharLink")
const importCharLink = document.getElementById("importCharLink")
const importCharFileElement = document.getElementById("importCharFile")
const createCharacterLink = document.getElementById("createCharacterLink")
const savedCharactersListTitle = document.getElementById("savedCharactersListTitle")
const savedCharactersList = document.getElementById("savedCharactersList")
const currentCharacterName = document.getElementById("currentCharacterName")

/////////////////////////////////////////////////////////////////////////
// DISPLAY HELPERS //////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function diceToString({ number, dice }) {
  return D[dice] ? `${number}d${dice}` : 'err' // TODO:
}

/////////////////////////////////////////////////////////////////////////
// DOM RENDERS //////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function renderSavedCharSheets() {
  const saves = charSheetService.getList(false)

  fillElement(savedCharactersListTitle, t._(saves.length ? 'navbar.savedCharacters' : 'navbar.noCharacters'))
  fillElement(savedCharactersList, createElement(
    'div',
    saves.map(save => createElement('a', save.name || t._('navbar.unnamedCharacter'), {
      href: '',
      class: 'list-group-item list-group-item-action',
      'data-save-Id': save.id,
    })),
    { class: 'list-group list-group-flush' }
  ))
}

function renderCharName() {
  charNameElement.value = charSheet.getCharName()
  fillElement(currentCharacterName, charSheet.getCharName() || t._('navbar.unnamedCharacter'))
}

function renderCharExperience() {
  charExperienceElement.value = charSheet.getCharExperience()
}

function renderCharLevel() {
  charLevelElement.value = charSheet.getCharLevel()
}

function renderArmorClass() {
  document.getElementsByName('armorClass')[0].value = charSheet.getArmorClass()
}

function renderHitPointMax() {
  document.getElementsByName('hitPointMax')[0].value = charSheet.getHitPointMax()
}

function renderHitDiceMax() {
  document.getElementsByName('hitDiceMax')[0].value = diceToString(charSheet.getHitDiceMax())
}

function renderCharAlignment() {
  document.getElementsByName('alignment')[0].value = charSheet.getCharAlignment()
}

function renderJSONOutput() {
  document.getElementById('jsonOutput').textContent = JSON.stringify(charSheet.get(), null, 2)
}

/////////////////////////////////////////////////////////////////////////
// SUBSCRIPTIONS ////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

const subscriptions = []

function registerSubscriptions() {
  subscriptions.push(
    // Dom html events
    domSubscribe(exportCharLink, 'click', exportJSONClicked),
    domSubscribe(importCharLink, 'click', importCharClicked),
    domSubscribe(importCharFileElement, 'change', importCharFileChanged),
    domSubscribe(savedCharactersList, 'click', savedCharacterClicked),
    domSubscribe(createCharacterLink, 'click', createCharacterClicked),
    domSubscribe(charNameElement, 'input', charNameChanged),
    domSubscribe(charExperienceElement, 'change', charExperienceChanged),

    // Observable events
    charSheet.subscribe('charName', renderCharName),
    charSheet.subscribe('charExperience', renderCharExperience),
    charSheet.subscribe('charLevel', renderCharLevel),
    charSheet.subscribe('charLevel', renderHitPointMax),
    charSheet.subscribe('charClass', renderHitPointMax),
    charSheet.subscribe('modifiers', renderHitPointMax),
    charSheet.subscribe('charLevel', renderHitDiceMax),
    charSheet.subscribe('charClass', renderHitDiceMax),
    charSheet.subscribe('charAlignment', renderCharAlignment),
    charSheet.subscribe('charClass', renderArmorClass),
    charSheet.subscribe('equiped', renderArmorClass),
    charSheet.subscribe('feats', renderArmorClass),
    charSheet.subscribe('modifiers', renderArmorClass),
    charSheet.subscribe(ALL, renderJSONOutput),
    charSheet.subscribe(ALL, debounce(() => charSheetService.save(), AUTOSAVE_DELAY_MS)),
    charSheetService.subscribeCharSheetsList(renderSavedCharSheets),
    i18n.subscribe(() => AbstractComponent.notifyI18nChanged()),
  )
}

function unregisterSubscriptions() {
  while (subscriptions.length) subscriptions.pop()?.()
}

/////////////////////////////////////////////////////////////////////////
// EVENTS ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function createCharacterClicked(event) {
  event.preventDefault()
  charSheetService.create()
}

function savedCharacterClicked(event) {
  event.preventDefault()
  const saveId = event.target.dataset?.saveId
  if (!saveId) return

  charSheetService.load(saveId)
}

function importCharClicked(event) {
  event.preventDefault()
  importCharFileElement.click()
}

async function importCharFileChanged({ target: { files } }) {
  if (!files?.length) return

  try {
    const jsonText = await files[0].text()
    // TODO: ask for new or erase current. Currently it default to new
    charSheetService.importJSON(jsonText)
  } catch (error) {
    throw new TechnicalError(error)
  }
  importCharFileElement.value = ''
}

function exportJSONClicked(event) {
  event?.preventDefault()

  let json
  try {
    json = charSheetService.exportJSON()
  } catch (error) {
    throw new TechnicalError(error)
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

function charNameChanged({ target: { value } }) {
  charSheet.setCharName(value)
}

function charExperienceChanged({ target: { value } }) {
  charSheet.setCharExperience(value)
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

async function initApp() {
  await initTranslations()

  registerCustomElements()
  registerSubscriptions()

  subscriptions.push(domSubscribe(window, 'pagehide', destroyApp))

  charSheetService.init()
}

function destroyApp() {
  unregisterSubscriptions()
}

initApp()
