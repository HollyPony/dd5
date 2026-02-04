export class AbstractComponent extends HTMLElement {
  _id

  _listeners = []
  _subscriptions = []

  static get tagName() { return null }
  static get _componentPath() { return undefined }
  static register({ tagName, ...options } = {}) { customElements.define(tagName ?? this.tagName, this, options) }

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

    await this._connectedCallback()

    this._registerEvents()
  }

  disconnectedCallback() {
    console.info('-- AbstractComponent.disconnectedCallback')
    this._disconnectedCallback()
    this._unregisterEvents()
  }

  _connectedCallback() { }

  _disconnectedCallback() { }

  _registerEvents() {
    console.info('-- AbstractComponent.registerEvents')
  }

  _unregisterEvents() {
    console.info('-- AbstractComponent.unregisterEvents')

    for (const listener of this._listeners) listener()
    this._listeners.length = 0

    for (const subscription of this._subscriptions) subscription()
    this._subscriptions.length = 0
  }

  _listen(target, event, handler, options) {
    if (!target || !event || !handler) return
    target.addEventListener(event, handler, options)

    this._listeners.push(() => target.removeEventListener(event, handler, options))
  }
}
