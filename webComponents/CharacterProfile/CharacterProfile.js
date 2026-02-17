import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import { domSubscribe } from '../../modules/domlib.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'

export class CharacterProfile extends AbstractComponent {
  static get tagName() { return 'character-profile-block' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #alignmentElement

  _connectedCallback() {
    this.#alignmentElement = this.querySelector('[name="alignment"]')

    this.#renderAlignment()
  }

  _registerEvents() {
    this._pushEvents(
      domSubscribe(this.#alignmentElement, 'input', this.#alignmentChanged),
      charSheetStore.on(charSheetProps.alignment, this.#renderAlignment),
    )
  }

  #renderAlignment = () => {
    this.#alignmentElement.value = charSheetStore.getAlignment()
  }

  #alignmentChanged = ({ target: { value } }) => {
    charSheetStore.setAlignment(value)
  }
}
