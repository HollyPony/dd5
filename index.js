import initTranslations, { i18n } from './modules/i18n.js'
import charSheetService from './modules/services/charSheet.service.js'
import { domSubscribe } from './modules/domlib.js'
import registerWebComponents from './index.webmodules.js'


async function initApp() {
  const subscriptions = []
  const translations = document.querySelectorAll('[data-i18n], [data-i18n-attributes]')

  charSheetService.init()

  subscriptions.push(
    domSubscribe(window, 'pagehide', function unregisterSubscriptions() {
      while (subscriptions.length) subscriptions.pop()?.()
      charSheetService.unregister()
    }),
    i18n.subscribe(() => {
      for (const element of translations) {
        i18n.applyTranslation(element)
      }
    }),
  )

  registerWebComponents()
  initTranslations()
}

initApp()
