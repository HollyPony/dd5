import { removeAllChildren } from './domlib.js';
import { resolvePath } from './helpers.js';
import parseMarkdown from './markdown.js'

const DEFAULT_LANGUAGE = 'fr'
const availableLanguages = ['fr']
const langChangeSubscribers = new Set()

let translations = null
let language = null

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
    // TODO: handle specifics catch and display precise error
    try {
      await changeLang(lang)
      return language
    } catch (error) {
      console.warn(error)
      // try next candidate
    }
  }

  console.warn(`No translation file found, fallback to empty translations`)
  translations = {}
  applyTranslations()
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
  language = lang
  applyTranslations()
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
  if (!language) return path
  const value = resolvePath(translations || {}, path) ?? path
  if (value === undefined || value === null || typeof value !== 'string') {
    console.warn(
      `Missing translation key: '${path}' (lang: '${language}')`,
      new Error('i18n.missing').stack
    )
  }
  return strObjInterpolation(typeof value === 'string' ? value : path, interpolations)
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
    if (result) removeAllChildren(element).appendChild(result)
  }

  const attributesRaw = element.dataset.i18nAttributes
  if (attributesRaw) {
    try {
      const attributesObj = JSON.parse(attributesRaw)
      try {
        for (const [attributeName, { key, interpolations }] of Object.entries(attributesObj)) { // TODO: elment attr set
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
 * Subscribe to i18n updates (language changes).
 * @param {Function} callback Callback invoked on notify.
 * @returns {Function} Unsubscribe function.
 */
function subscribe(callback) {
  langChangeSubscribers.add(callback)
  return () => langChangeSubscribers.delete(callback)
}

export const t = {
  _, md, tn
}

export const i18n = {
  availableLanguages,
  changeLang,
  applyTranslation,
  applyTranslations,
  subscribe,
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
 * @param {Object|Array} [obj=[]] Interpolation values by name or index.
 * @returns {string}
 */
function strObjInterpolation(str = '', obj = []) {
  return str.replace(
    /{([^{}]*)}/g,
    (a, b) => {
      const r = obj[b]
      return typeof r === 'string' || typeof r === 'number' ? r : a
    },
  )
}

/**
 * Notify all subscribers of a language change.
 */
function notify() {
  for (const callback of langChangeSubscribers) {
    callback()
  }
}
