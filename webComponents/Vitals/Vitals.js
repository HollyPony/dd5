import { DICES as D } from '../../modules/common.js'
import { domOn } from '../../modules/domlib.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'

function diceToString({ number, dice }) {
  return D[dice] ? `${number}d${dice}` : 'err'
}

export class Vitals extends AbstractComponent {
  static get tagName() { return 'vitals-block' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #hitPointCurrentElement
  #hitPointTempElement
  #hitPointMaxElement
  #hitDiceMaxElement
  #deathSaveSuccessElements
  #deathSaveFailureElements

  _connectedCallback() {
    this.#hitPointCurrentElement = this.querySelector('[name="hitPointCurrent"]')
    this.#hitPointTempElement = this.querySelector('[name="hitPointTemp"]')
    this.#hitPointMaxElement = this.querySelector('[name="hitPointMax"]')
    this.#hitDiceMaxElement = this.querySelector('[name="hitDiceMax"]')
    this.#deathSaveSuccessElements = this.querySelectorAll('.death-save-success')
    this.#deathSaveFailureElements = this.querySelectorAll('.death-save-failure')

    this.#renderHitPointCurrent()
    this.#renderHitPointTemp()
    this.#renderHitPointMax()
    this.#renderHitDiceMax()
    this.#renderDeathSaves()
  }

  _registerEvents() {
    const deathSaveElements = [...this.#deathSaveSuccessElements, ...this.#deathSaveFailureElements]
    this._pushEvents(
      domOn(this.#hitPointCurrentElement, 'change', this.#hitPointCurrentChanged),
      domOn(this.#hitPointTempElement, 'change', this.#hitPointTempChanged),
      deathSaveElements.map(element => domOn(element, 'change', this.#deathSavesChanged)),
      charSheetStore.onMap({
        [charSheetProps.level]: [this.#renderHitPointMax, this.#renderHitDiceMax],
        [charSheetProps.class]: [this.#renderHitPointMax, this.#renderHitDiceMax],
        [charSheetProps.modifiers]: [this.#renderHitPointMax],
        [charSheetProps.hitPointCurrent]: [this.#renderHitPointCurrent],
        [charSheetProps.hitPointTemp]: [this.#renderHitPointTemp],
        [charSheetProps.deathSaves]: [this.#renderDeathSaves],
      }),
    )
  }

  #renderHitPointCurrent = () => {
    this.#hitPointCurrentElement.value = charSheetStore.getHitPointCurrent()
  }

  #renderHitPointTemp = () => {
    this.#hitPointTempElement.value = charSheetStore.getHitPointTemp()
  }

  #renderHitPointMax = () => {
    this.#hitPointMaxElement.value = charSheetStore.getHitPointMax()
  }

  #renderHitDiceMax = () => {
    this.#hitDiceMaxElement.value = diceToString(charSheetStore.getHitDiceMax())
  }

  #renderDeathSaves = () => {
    const deathSaves = charSheetStore.getDeathSaves()
    this.#deathSaveSuccessElements.forEach((element, index) => {
      element.checked = index < deathSaves.success
    })
    this.#deathSaveFailureElements.forEach((element, index) => {
      element.checked = index < deathSaves.failure
    })
  }

  #hitPointCurrentChanged = ({ target: { value } }) => {
    charSheetStore.setHitPointCurrent(value)
  }

  #hitPointTempChanged = ({ target: { value } }) => {
    charSheetStore.setHitPointTemp(value)
  }

  #deathSavesChanged = () => {
    charSheetStore.setDeathSaves({
      success: [...this.#deathSaveSuccessElements].filter(input => input.checked).length,
      failure: [...this.#deathSaveFailureElements].filter(input => input.checked).length,
    })
  }
}
