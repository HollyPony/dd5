import { resolvePath } from './helpers.js';
import parseMarkdown from './markdown.js'

const DEFAULT_LANGUAGE = 'fr'
const availableLanguages = ['fr']
const getDocumentLanguage = () => document.documentElement?.lang || navigator.language || DEFAULT_LANGUAGE
const subscribers = new Set()

let translations = null
let language = DEFAULT_LANGUAGE

export default async function init() {
  const requested = getDocumentLanguage()
  const candidates = [
    requested,
    requested?.split('-')?.[0],
    DEFAULT_LANGUAGE,
  ].filter(lang => Boolean(lang) && availableLanguages.includes(lang))

  for (const lang of candidates) {
    try {
      await changeLang(lang)
      return language
    } catch (error) {
      // try next candidate
    }
  }

  console.warn(`No translation file found, fallback to empty translations`)
  translations = {}
  applyTranslations()
  notify()
  return DEFAULT_LANGUAGE
}

async function changeLang(lang) {
  if (!lang || !availableLanguages.includes(lang)) {
    throw new Error(`Language '${lang}' is not available`)
  }
  translations = (await import(`../i18n/${lang}/index.js`)).default
  language = lang
  applyTranslations()
  notify()
  return lang
}

function _(path, interpolations) {
  const value = resolvePath(translations || {}, path) ?? path
  return strObjInterpolation(typeof value === 'string' ? value : path, interpolations)
}

function md(path, interpolations) {
  return parseMarkdown(_(path, interpolations))
}

function tn(path, interpolations) {
  return document.createTextNode(_(path, interpolations))
}

/**
 * Compute all dom translations attributes : data-i18n
 */
function applyTranslations(rootElement = document) {
  for (const element of rootElement.querySelectorAll('[data-i18n]')) {
    const key = element.dataset.i18n
    const markdown = element.dataset.i18nMd === 'true'
    const interpolations = element.dataset.i18nValues ? JSON.parse(element.dataset.i18nValues) : undefined
    const attributes = element.dataset.i18nAttrs ? JSON.parse(element.dataset.i18nAttrs) : undefined

    translate(element, key, { markdown, interpolations, attributes, })
  }
}

function subscribe(callback) {
  if (typeof callback !== 'function') return () => { }
  subscribers.add(callback)
  return () => subscribers.delete(callback)
}

export const t = {
  _, md, tn
}

export const i18n = {
  availableLanguages,
  changeLang,
  applyTranslations,
  subscribe,
}

/**
 * Translate a dom element
 * @param {HTMLElement} element to insert the translated text
 * @param {string} path translation path
 * @param {Object} config 
 * @param {boolean} config.markdown if true, parse result as markdown
 * @param {Array.string} config.interpolations // TODO: test interpolations
 * @param {Array.object} config.attributess // TODO: test attributes translations
 */
function translate(element, path, {
  markdown = false,
  interpolations = [],
  attributes = []
}) {
  for (const attribute of attributes) {
    // TODO
    // elment attr set
    _(attribute.keys, attribute.interpolations)
  }

  const result = (markdown ? md : tn)(path, interpolations)
  if (result) {
    while (element.firstChild) { element.removeChild(element.firstChild) }
    element.appendChild(result)
  }
}

/**
* Interpolates variables wrapped with `{}` in `str` with variables in `obj`
* It will replace what it can, and leave the rest untouched
*
* Usage:
*
* named variables:
* strObjInterpolation("I'm {age} years old!", { age: 29 });
*
* ordered variables
* strObjInterpolation("The {0} says {1}, {1}, {1}!", ['cow', 'moo']);
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

function notify() {
  for (const callback of subscribers) {
    callback()
  }
}
