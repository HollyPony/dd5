export class AbstractComponent extends HTMLElement {
  _id

  static get _componentPath() { return undefined }

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
    // this.#registerEvents()
  }

  // disconnectedCallback() {
  //   console.info('-- Mother.disconnectedCallback')
  //   this.#unregisterEvents()
  // }

  // #registerEvents() {
  //   console.info('-- Mother.registerEvents')
  // }

  // #unregisterEvents() {
  //   console.info('-- Mother.unregisterEvents')
  // }
}
