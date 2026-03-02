import { resolvePath } from './helpers.js'
import parseMarkdown from './markdown.js'

const DEFAULT_LANGUAGE = 'fr'
const availableLanguages = ['fr']
const langChangeListeners = new Set()

let translations = {}
export let currentLang = null

/**
 * Resolve the language requested by the document or browser.
 * @returns {string}
 */
const getDocumentLanguage = () => document.documentElement?.lang || navigator.language || DEFAULT_LANGUAGE

/**
 * Initialize i18n by selecting the best available language.
 * Tries document language, its base language, then default.
 * @returns {Promise<string>} The resolved language.
 */
export default async function init() {
  const requested = getDocumentLanguage()
  const candidates = [
    requested,
    requested?.split('-')?.[0],
    DEFAULT_LANGUAGE,
  ].filter(lang => Boolean(lang) && availableLanguages.includes(lang))

  for (const lang of candidates) {
    const langLoaded = await changeLang(lang)
      .then(result => result)
      .catch(() => undefined)

    if (langLoaded) return langLoaded
  }

  console.warn(`No translation file found, fallback to empty translations`)
  notify()
  return DEFAULT_LANGUAGE
}

/**
 * Load and apply a language pack.
 * @param {string} lang Language code to load.
 * @returns {Promise<string>} The applied language.
 */
async function changeLang(lang) {
  translations = (await import(`../i18n/${lang}/index.js`)).default
  currentLang = lang
  notify()
  return lang
}

/**
 * Translate a key path and interpolate variables.
 * Falls back to the key when missing.
 * @param {string} path Translation key path.
 * @param {Object|Array} [interpolations] Values for `{}` placeholders.
 * @returns {string}
 */
function _(path, interpolations) {
  if (!currentLang) return path
  const value = resolvePath(translations, path)
  if (value == null) {
    console.warn(
      `Missing translation key: '${path}' (lang: '${currentLang}')`,
      new Error('i18n.missing').stack
    )
  }
  return value ? strObjInterpolation(value, interpolations) : path
}

/**
 * Translate and parse markdown into a DOM node.
 * @param {string} path Translation key path.
 * @param {Object|Array} [interpolations] Values for `{}` placeholders.
 * @returns {Node|null}
 */
function md(path, interpolations) {
  return parseMarkdown(_(path, interpolations))
}

/**
 * Translate and return a text node.
 * @param {string} path Translation key path.
 * @param {Object|Array} [interpolations] Values for `{}` placeholders.
 * @returns {Text}
 */
function tn(path, interpolations) {
  return document.createTextNode(_(path, interpolations))
}

/**
 * Apply translations for a single element based on its data attributes.
 * Supports `data-i18n`, `data-i18n-interpolations`, and `data-i18n-attributes`.
 * @param {HTMLElement} element Element to translate.
 */
function applyTranslation(element) {
  const path = element.dataset.i18n

  if (path) {
    const markdown = element.dataset.i18nMd === 'true'
    const interpolationsRaw = element.dataset.i18nInterpolations
    const interpolations = interpolationsRaw
      ? (() => {
        try {
          return JSON.parse(interpolationsRaw)
        } catch (e) {
          console.warn(
            `Failed to parse "data-i18n-values='${interpolationsRaw}'"\n`,
            element, '\n',
            e.message,
            e.stack
          )
          return undefined
        }
      })()
      : undefined

    const result = (markdown ? md : tn)(path, interpolations)
    if (result) element.replaceChildren(result)
  }

  const attributesRaw = element.dataset.i18nAttributes
  if (attributesRaw) {
    try {
      const attributesObj = JSON.parse(attributesRaw)
      try {
        for (const [attributeName, { key, interpolations }] of Object.entries(attributesObj)) {
          try {
            element.setAttribute(attributeName, _(key, interpolations))
          } catch (e) {
            console.warn(
              `Failed to define attribute: '${attributeName}' with '${interpolations}' datas.\n`,
              element, '\n',
              e.message,
              e.stack
            )
          }
        }
      } catch (e) {
        console.warn(
          `Bad JSON format for i18n-attributes:\n`,
          attributesObj, '\n',
          `Valid format:\n`,
          JSON.stringify({ nameOfAttributeToTranslate: { key: 'translationPath', interpolations: {} } }), '\n',
          element, '\n',
          e.message,
          e.stack
        )
      }
    } catch (e) {
      console.warn(
        `Failed to parse "data-i18n-attributes='${attributesRaw}'".\n`,
        element, '\n',
        e.message,
        e.stack
      )
    }
  }
}

/**
 * Scane all `data-i18n` and `data-i18n-attributes` on given element
 * See `i18n.applyTranslation` for details
 * @param {ParentNode} [rootElement=document] Root to scan for translatable elements.
 */
function applyTranslations(rootElement = document) {
  for (const element of rootElement.querySelectorAll('[data-i18n], [data-i18n-attributes]')) {
    applyTranslation(element)
  }
}

/**
 * On language change trigger.
 * @param {Function} callback Callback invoked on notify.
 * @returns {Function} Off function.
 */
function onLangChange(callback) {
  langChangeListeners.add(callback)
  return () => langChangeListeners.delete(callback)
}

export const t = {
  _, md, tn
}

export const i18n = {
  availableLanguages,
  changeLang,
  applyTranslation,
  applyTranslations,
  onLangChange,
}

/**
 * Interpolate `{}` placeholders in a string using an object or array.
 * Unmatched placeholders are left untouched.
 *
 * Usage:
 * strObjInterpolation("I'm {age} years old!", { age: 29 });
 * strObjInterpolation("The {0} says {1}, {1}, {1}!", ['cow', 'moo']);
 *
 * @param {string} [str=''] Input string.
 * @param {Object|Array} [interpolations=[]] Interpolation values by name or index.
 * @returns {string}
 */
function strObjInterpolation(str = '', interpolations = []) {
  return str.replace(
    /{([^{}]*)}/g,
    (match, p1) => {
      const value = interpolations[p1]
      if (value instanceof Date) return value.toLocaleDateString(currentLang)
      return typeof value === 'string' || typeof value === 'number' ? value : match
    },
  )
}

/**
 * Notify all listeners of a language change.
 */
function notify() {
  for (const listener of langChangeListeners) listener()

}
