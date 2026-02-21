import initTranslations, { i18n } from './modules/i18n.js'
import charSheetService from './modules/services/charSheet.service.js'
import { domOn } from './modules/domlib.js'
import registerWebComponents from './index.webmodules.js'
import authService from './modules/auth/auth.service.js'


async function initApp() {
  const listeners = []
  const translations = document.querySelectorAll('[data-i18n], [data-i18n-attributes]')

  charSheetService.init()
  authService.init()

  listeners.push(
    domOn(window, 'pagehide', function off() {
      while (listeners.length) listeners.pop()?.()
      charSheetService.unregister()
    }),
    i18n.onLangChange(() => {
      for (const element of translations) {
        i18n.applyTranslation(element)
      }
    }),
  )

  registerWebComponents()
  initTranslations()
}

initApp()
