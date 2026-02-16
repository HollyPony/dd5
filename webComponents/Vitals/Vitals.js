import { DICES as D } from '../../modules/common.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'

function diceToString({ number, dice }) {
  return D[dice] ? `${number}d${dice}` : 'err'
}

export class Vitals extends AbstractComponent {
  static get tagName() { return 'vitals-block' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #hitPointMaxElement
  #hitDiceMaxElement

  _connectedCallback() {
    this.#hitPointMaxElement = this.querySelector('[name="hitPointMax"]')
    this.#hitDiceMaxElement = this.querySelector('[name="hitDiceMax"]')

    this.#renderHitPointMax()
    this.#renderHitDiceMax()
  }

  _registerEvents() {
    this._pushEvents(
      charSheetStore.onMap({
        [charSheetProps.level]: [this.#renderHitPointMax, this.#renderHitDiceMax],
        [charSheetProps.class]: [this.#renderHitPointMax, this.#renderHitDiceMax],
        [charSheetProps.modifiers]: [this.#renderHitPointMax],
      }),
    )
  }

  #renderHitPointMax = () => {
    this.#hitPointMaxElement.value = charSheetStore.getHitPointMax()
  }

  #renderHitDiceMax = () => {
    this.#hitDiceMaxElement.value = diceToString(charSheetStore.getHitDiceMax())
  }
}
