import { domOn } from '../../modules/domlib.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'

export class CommonInformations extends AbstractComponent {
  static get tagName() { return 'common-informations-block' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #nameElement

  _connectedCallback() {
    this.#nameElement = this.querySelector('[name="charName"]')

    this.#renderName()
  }

  _registerEvents() {
    this._pushEvents(
      domOn(this.#nameElement, 'input', this.#nameChanged),
      charSheetStore.on(charSheetProps.name, this.#renderName),
    )
  }

  #renderName = () => {
    this.#nameElement.value = charSheetStore.getName()
  }

  #nameChanged = ({ target: { value } }) => {
    charSheetStore.setName(value)
  }
}
