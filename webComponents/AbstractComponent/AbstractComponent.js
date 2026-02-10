import { currentLang, i18n } from '../../modules/i18n.js'
const APP_URL = window.DD5_APP_URL

export class AbstractComponent extends HTMLElement {
  _id

  #events = []

  static #instances = new Set()
  static get tagName() { return null }
  static _modulePath = undefined
  static register({ tagName, ...options } = {}) { customElements.define(tagName ?? this.tagName, this, options) }

  static _templatePromise
  static _getTemplate(url, fileName) {
    if (!this._templatePromise) {
      this._templatePromise = fetch(`${url}${fileName}`)
        .then(result => result.text())
        .then(html => new DOMParser()
          .parseFromString(html, 'text/html')
          .querySelector('template'))
    }
    return this._templatePromise
  }

  static _addStyle(url, fileName) {
    const STYLE_ID = `--webcomponent-css-${this.name}-id`

    if (!document.getElementById(STYLE_ID) && url) {
      const stylesheetLink = document.createElement('link')
      stylesheetLink.id = STYLE_ID
      stylesheetLink.setAttribute('rel', 'stylesheet')
      stylesheetLink.setAttribute('href', `${url}/${fileName}`)
      document.head.appendChild(stylesheetLink)
    }
  }

  _langApplied = undefined
  static #i18nUnsubscribe = undefined
  static #i18nSubscribe() {
    if (!AbstractComponent.#i18nUnsubscribe) {
      AbstractComponent.#i18nUnsubscribe = i18n.subscribe(() => {
        if (currentLang) {
          for (const instance of AbstractComponent.#instances) {
            if (instance._langApplied !== currentLang) {
              instance._langApplied = currentLang
              instance.#applyTranslations()
              instance._i18nChanged?.()
            }
          }
        }
      })
    }
  }

  #applyTranslations() {
    if (this._langApplied) {
      i18n.applyTranslations(this)
    }
  }

  constructor() {
    super()
    this._id = crypto.randomUUID()
  }

  async connectedCallback() {
    console.info('-- AbstractComponent.connectedCallback')

    const modulePath = `${APP_URL}${this.constructor._modulePath ?? new URL('.', import.meta.url).pathname}`
    const moduleName = this.constructor._moduleName ?? this.constructor.name

    const template = await this.constructor._getTemplate(modulePath, `${moduleName}.html`)
    this.appendChild(template.content.cloneNode(true), true)

    this.constructor._addStyle(modulePath, `${moduleName}.css`)

    await this._connectedCallback?.()

    this.#registerEvents()

    this._langApplied = currentLang
    this.#applyTranslations()
    AbstractComponent.#instances.add(this)
    AbstractComponent.#i18nSubscribe()
  }

  async disconnectedCallback() {
    console.info('-- AbstractComponent.disconnectedCallback')
    this._langApplied = undefined
    AbstractComponent.#instances.delete(this)
    if (AbstractComponent.#instances.size === 0) {
      AbstractComponent.#i18nUnsubscribe?.()
      AbstractComponent.#i18nUnsubscribe = undefined
    }
    await this._disconnectedCallback?.()
    this.#unregisterEvents()
  }

  #registerEvents() {
    console.info('-- AbstractComponent.registerEvents')
    this._registerEvents?.()
  }

  #unregisterEvents() {
    console.info('-- AbstractComponent.unregisterEvents')

    this._unregisterEvents?.()

    for (const unregister of this.#events) unregister()
  }

  _pushEvents(...events) {
    this.#events.push(...events)
  }
}
