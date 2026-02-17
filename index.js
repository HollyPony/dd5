import './modules/toast.js'
import initTranslations, { i18n } from './modules/i18n.js'
import charSheetService from './modules/services/charSheet.service.js'
import { domSubscribe } from './modules/domlib.js'
import registerWebComponents from './index.webmodules.js'

const translations = document.querySelectorAll('[data-i18n], [data-i18n-attributes]')
const subscriptions = []

function translationsChanged() {
  for (const element of translations) {
    i18n.applyTranslation(element)
  }
}

function pageHided() {
  unregisterSubscriptions()
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
  charSheetService.init()

  registerDomEvents()
  registerTranslationsUpdates()
  registerWebComponents()

  initTranslations()
}

initApp()
