export class AbstractComponent extends HTMLElement {
  _id

  static get _componentPath() { return undefined }

  static templatePromise
  static get template() {
    if (!this.templatePromise) {
      this.templatePromise = fetch(`${this._componentPath}/index.html`)
        .then(result => result.text())
        .then(html => new DOMParser()
          .parseFromString(html, 'text/html')
          .querySelector('template'))
    }
    return this.templatePromise
  }

  constructor() {
    super()
  }

  async connectedCallback() {
    console.info('-- AbstractComponent.connectedCallback')

    const template = await this.constructor.template

    const stylesheet = document.createElement('link')
    stylesheet.setAttribute('rel', 'stylesheet')
    stylesheet.setAttribute('href', `${this.constructor._componentPath}/index.css`)

    this.appendChild(stylesheet)
    this.appendChild(template.content.cloneNode(true), true)

    this._id = crypto.randomUUID()

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
