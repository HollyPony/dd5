const componentPath = '/components/empty'

export class Empty extends HTMLElement {
  #id

  static #templatePromise
  static get template() {
    if (!this.#templatePromise) {
      this.#templatePromise = fetch(`${componentPath}/index.html`)
        .then(result => result.text())
        .then(html => new DOMParser()
          .parseFromString(html, 'text/html')
          .querySelector('template'))
    }
    return this.#templatePromise
  }

  constructor() {
    super()
  }

  async connectedCallback() {
    console.info('-- Mother.connectedCallback')

    const template = await this.constructor.template

    const stylesheet = document.createElement('link')
    stylesheet.setAttribute('rel', 'stylesheet')
    stylesheet.setAttribute('href', `${componentPath}/index.css`)

    this.appendChild(stylesheet)
    this.appendChild(template.content.cloneNode(true), true)

    this.#id = crypto.randomUUID()

    this.#registerEvents()
  }

  disconnectedCallback() {
    console.info('-- Mother.disconnectedCallback')
    this.#unregisterEvents()
  }

  #registerEvents() {
    console.info('-- Mother.registerEvents')
  }

  #unregisterEvents() {
    console.info('-- Mother.unregisterEvents')
  }
  // static get observedAttributes() {
  //   return ['score']
  // }
  // attributeChangedCallback(name, oldValue, newValue) {
  //   console.info('-- Ability.attributeChangedCallback', name, oldValue, newValue);
  //   // this.querySelector('.ability-score').value = newValue;
  //   switch (name) {
  //     case 'score': return this.#updateScore(oldValue, newValue)
  //     case 'value': return this.#updateValue(oldValue, newValue)
  //   }
  // }
}
