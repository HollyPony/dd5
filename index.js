import { DICES as D, } from './modules/common.js'
import initTranslations, { t, i18n } from './modules/i18n.js'
import charSheetStore from './modules/stores/charSheet.derived.store.js'
import charSheetProps from './modules/stores/charSheet.derived.properties.js'
import { TechnicalError, } from './modules/errors.js'
import charSheetService from './modules/services/charSheet.service.js'
import { createElement, domSubscribe, replaceElement, } from './modules/domlib.js'
import registerWebComponents from './index.webmodules.js'
import './modules/toast.js'

/////////////////////////////////////////////////////////////////////////
// ELEMENTS TO UPDATE ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

const charNameElement = document.getElementsByName('charName')[0]
const charExperienceElement = document.getElementsByName('experiencepoints')[0]
const charLevelElement = document.getElementsByName('charLevel')[0]
const armorClassElement = document.getElementsByName('armorClass')[0]
const hitPointMaxElement = document.getElementsByName('hitPointMax')[0]
const hitDiceMaxElement = document.getElementsByName('hitDiceMax')[0]
const charAlignmentElement = document.getElementsByName('alignment')[0]
const exportCharLink = document.getElementById("exportCharLink")
const importCharLink = document.getElementById("importCharLink")
const importCharFileElement = document.getElementById("importCharFile")
const createCharacterLink = document.getElementById("createCharacterLink")
const savedCharactersListTitle = document.getElementById("savedCharactersListTitle")
const savedCharactersList = document.getElementById("savedCharactersList")
const currentCharacterName = document.getElementById("currentCharacterName")
const debugOutputElement = document.getElementById('jsonOutput')
const debugModal = document.getElementById('debugModal')

const translations = document.querySelectorAll('[data-i18n], [data-i18n-attributes]')

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

  replaceElement(savedCharactersListTitle, t._(saves.length ? 'navbar.savedCharacters' : 'navbar.noCharacters'))
  replaceElement(savedCharactersList, createElement(
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
  charNameElement.value = charSheetStore.getCharName()
  replaceElement(currentCharacterName, charSheetStore.getCharName() || t._('navbar.unnamedCharacter'))
}

function renderCharExperience() {
  charExperienceElement.value = charSheetStore.getCharExperience()
}

function renderCharLevel() {
  charLevelElement.value = charSheetStore.getCharLevel()
}

function renderArmorClass() {
  armorClassElement.value = charSheetStore.getArmorClass()
}

function renderHitPointMax() {
  hitPointMaxElement.value = charSheetStore.getHitPointMax()
}

function renderHitDiceMax() {
  hitDiceMaxElement.value = diceToString(charSheetStore.getHitDiceMax())
}

function renderCharAlignment() {
  charAlignmentElement.value = charSheetStore.getCharAlignment()
}

function renderJSONOutput() {
  const defaultOpenLevels = 2
  function renderJsonTree(value, keyLabel, level = 0) {
    const type = Array.isArray(value) ? 'array' : (value === null ? 'null' : typeof value)

    if (type === 'object' || type === 'array') {
      const container = level === 0
        ? createElement()
        : createElement('div', null, { style: 'padding-left: 1rem;' })

      const entries = type === 'array' ? value.entries() : Object.entries(value)
      for (const [k, v] of entries) {
        container.appendChild(renderJsonTree(v, String(k), level + 1))
      }

      return level === 0
        ? createElement(null, container)
        : createElement('details',
          [
            createElement('summary',
              keyLabel ? `${keyLabel} (${type})` : type
            ),
            container
          ],
          { open: defaultOpenLevels > level })
    }

    const leaf = document.createElement('div')
    leaf.textContent = keyLabel ? `${keyLabel}: ${JSON.stringify(value)}` : JSON.stringify(value)
    return leaf
  }
  // TODO: render by tab state / savedState format
  // jsonOutputElement.replaceChildren(renderJsonTree(charSheetStore.get()))
  debugOutputElement.replaceChildren(renderJsonTree(JSON.parse(charSheetService.getJSONEntry())))
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
    charSheetService.importJSON(jsonText)
  } catch (error) {
    new TechnicalError(error)
  } finally {
    importCharFileElement.value = ''
  }
}

function exportJSONClicked(event) {
  event?.preventDefault()

  let url
  try {
    const json = charSheetService.getJSONEntry(2)

    const blob = new Blob([json], { type: "application/json" })
    url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.download = charSheetStore.getCharName().replace(/[^a-zA-Z0-9 ]/g, '').trim() || 'TheCharacterWithNoName'
    link.href = url
    link.click()
  } catch (error) {
    throw new TechnicalError(error)
  } finally {
    if (url) {
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 0)
    }
  }
}

function charNameChanged({ target: { value } }) {
  charSheetStore.setCharName(value)
}

function charExperienceChanged({ target: { value } }) {
  charSheetStore.setCharExperience(value)
}

function translationsChanged() {
  for (const element of translations) {
    i18n.applyTranslation(element)
  }
  renderSavedCharSheets()
  renderCharName()
}

function pageHided() {
  unregisterSubscriptions()
}

/////////////////////////////////////////////////////////////////////////
// SUBSCRIPTIONS ////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

const subscriptions = []

function registerRenders() {
  subscriptions.push(
    ...charSheetStore.onMap({
      [charSheetProps.charName]: [renderCharName],
      [charSheetProps.charExperience]: [renderCharExperience],
      [charSheetProps.charLevel]: [renderCharLevel, renderHitPointMax, renderHitDiceMax],
      [charSheetProps.charClass]: [renderHitPointMax, renderHitDiceMax, renderArmorClass],
      [charSheetProps.modifiers]: [renderHitPointMax, renderArmorClass],
      [charSheetProps.charAlignment]: [renderCharAlignment],
      [charSheetProps.equiped]: [renderArmorClass],
      [charSheetProps.feats]: [renderArmorClass],
    }),
    charSheetService.subscribeCharSheetsList(renderSavedCharSheets),
  )
}

function registerDomEvents() {
  subscriptions.push(
    // Dom html events
    domSubscribe(exportCharLink, 'click', exportJSONClicked),
    domSubscribe(importCharLink, 'click', importCharClicked),
    domSubscribe(importCharFileElement, 'change', importCharFileChanged),
    domSubscribe(savedCharactersList, 'click', savedCharacterClicked),
    domSubscribe(createCharacterLink, 'click', createCharacterClicked),
    domSubscribe(charNameElement, 'input', charNameChanged),
    domSubscribe(charExperienceElement, 'change', charExperienceChanged),
    domSubscribe(debugModal, 'show.bs.modal', renderJSONOutput),

    domSubscribe(window, 'pagehide', pageHided),
  )
}

function registerTranslationsUpdates() {
  subscriptions.push(
    i18n.subscribe(() => translationsChanged()),
  )
}

function unregisterSubscriptions() {
  while (subscriptions.length) subscriptions.pop()?.()
  charSheetService.unregister()
}

/////////////////////////////////////////////////////////////////////////
// POPULATE /////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

async function initApp() {
  registerRenders()
  charSheetService.init()

  registerDomEvents()
  registerTranslationsUpdates()
  registerWebComponents()

  initTranslations()
}

initApp()
