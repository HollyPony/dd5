import { createObservable } from '../../modules/helpers.js'

export class AbstractComponent extends HTMLElement {
  _id

  #events = []
  #observables = new Map()

  #isLoaded = false

  static #instances = new Set()
  static get tagName() { return null }
  static get _componentPath() { return undefined }
  static register({ tagName, ...options } = {}) { customElements.define(tagName ?? this.tagName, this, options) }
  static notifyI18nChanged() {
    for (const instance of AbstractComponent.#instances) {
      instance.#isLoaded && instance._i18nChanged?.()
    }
  }

  static _templatePromise
  static get _template() {
    if (!this._templatePromise) {
      this._templatePromise = fetch(`${this._componentPath}/index.html`)
        .then(result => result.text())
        .then(html => new DOMParser()
          .parseFromString(html, 'text/html')
          .querySelector('template'))
    }
    return this._templatePromise
  }

  constructor() {
    super()
  }

  async connectedCallback() {
    console.info('-- AbstractComponent.connectedCallback')
    this._id = crypto.randomUUID()
    AbstractComponent.#instances.add(this)

    const template = await this.constructor._template
    this.appendChild(template.content.cloneNode(true), true)

    const STYLE_ID = `${this.constructor.name}`

    if (!document.getElementById(STYLE_ID) && this.constructor._componentPath) {
      const stylesheetLink = document.createElement('link')
      stylesheetLink.id = STYLE_ID
      stylesheetLink.setAttribute('rel', 'stylesheet')
      stylesheetLink.setAttribute('href', `${this.constructor._componentPath}/index.css`)
      document.head.appendChild(stylesheetLink)
    }

    await this._connectedCallback?.()

    this.#registerEvents()
    this.#isLoaded = true
  }

  async disconnectedCallback() {
    console.info('-- AbstractComponent.disconnectedCallback')
    this.#isLoaded = false
    AbstractComponent.#instances.delete(this)
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
    this.#events.length = 0

    this.#observables.clear()
  }

  _pushEvents(...events) {
    this.#events.push(...events)
  }

  _observable(name) {
    return this.#observables.get(name) || this.#observables.set(name, createObservable()).get(name)
  }
}
