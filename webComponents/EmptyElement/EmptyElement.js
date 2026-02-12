import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'

export class Empty extends AbstractComponent {
  static get tagName() { return 'empty-element' }
  static _modulePath = new URL('.', import.meta.url).pathname

  constructor() {
    super()
  }

  async _connectedCallback() {
    console.info('-- Empty.connectedCallback')

    //   const stylesheet = document.createElement('link')
    //   stylesheet.setAttribute('rel', 'stylesheet')
    //   stylesheet.setAttribute('href', `/components/ClassSelect/index.css`)

    //   this.appendChild(stylesheet)
  }

  _disconnectedCallback() {
    console.info('-- Empty.disconnectedCallback')
  }

  _registerEvents() {
    console.info('-- Empty.registerEvents')
  }

  _unregisterEvents() {
    console.info('-- Empty.unregisterEvents')
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
