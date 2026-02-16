import './modules/toast.js'
import initTranslations, { i18n } from './modules/i18n.js'
import charSheetStore from './modules/stores/charSheet.derived.store.js'
import charSheetProps from './modules/stores/charSheet.derived.properties.js'
import charSheetService from './modules/services/charSheet.service.js'
import { domSubscribe } from './modules/domlib.js'
import registerWebComponents from './index.webmodules.js'

const alignmentElement = document.getElementsByName('alignment')[0]

const translations = document.querySelectorAll('[data-i18n], [data-i18n-attributes]')
const subscriptions = []

function renderCharAlignment() {
  alignmentElement.value = charSheetStore.getAlignment()
}

function translationsChanged() {
  for (const element of translations) {
    i18n.applyTranslation(element)
  }
}

function pageHided() {
  unregisterSubscriptions()
}

function registerRenders() {
  subscriptions.push(
    ...charSheetStore.onMap({
      [charSheetProps.alignment]: [renderCharAlignment],
    }),
  )
}

function registerDomEvents() {
  subscriptions.push(
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

async function initApp() {
  registerRenders()
  charSheetService.init()

  registerDomEvents()
  registerTranslationsUpdates()
  registerWebComponents()

  initTranslations()
}

initApp()
