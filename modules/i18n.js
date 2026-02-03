import { resolvePath } from './helpers.js';
import parseMarkdown from './markdown.js'

const language = document.language ?? "fr";

export const i18n = {
  translations: {
    fr: fr
  },

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
  strObjInterpolation(str = '', obj = []) {
    return str.replace(
      /{([^{}]*)}/g,
      (a, b) => {
        const r = obj[b]
        return typeof r === 'string' || typeof r === 'number' ? r : a
      },
    )
  },

  _(path, interpolations) {
    const value = resolvePath(i18n.translations[language], path) ?? path
    return i18n.strObjInterpolation(value, interpolations)
  },

  md(path, interpolations) {
    return parseMarkdown(i18n._(path, interpolations))
  },

  tn(path, interpolations) {
    return document.createTextNode(i18n._(path, interpolations))
  },

  /**
   * Translate a dom element
   * @param {HTMLElement} element to insert the translated text
   * @param {string} path translation path
   * @param {Object} config 
   * @param {boolean} config.markdown if true, parse result as markdown
   * @param {Array.string} config.interpolations // TODO: test interpolations
   * @param {Array.object} config.attributess // TODO: test attributes translations
   */
  translate(element, path, {
    markdown = false,
    interpolations = [],
    attributes = []
  }) {
    for (attribute of attributes) {
      // TODO
      // elment attr set
      i18n._(attribute.keys, attribute.interpolations)
    }

    const result = i18n[markdown ? 'md' : 'tn'](path, interpolations)
    if (result) {
      while (element.firstChild) { element.removeChild(element.firstChild) }
      element.appendChild(result)
    }
  },

  /**
   * Compute all dom translations attributes : data-i18n
   */
  applyTranslations(rootElement = document) {
    for (const element of rootElement.querySelectorAll('[data-i18n]')) {
      const key = element.dataset.i18n
      const markdown = element.dataset.i18nMd === 'true'
      const interpolations = element.dataset.i18nValues ? JSON.parse(element.dataset.i18nValues) : undefined
      const attributes = element.dataset.i18nAttrs ? JSON.parse(element.dataset.i18nAttrs) : undefined

      i18n.translate(element, key, { markdown, interpolations, attributes, })
    }
  },
}
