import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { SIZE_CATEGORY } from '../../modules/common.js'
import { domOn, populateSelect } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class Specs extends AbstractComponent {
  static get tagName() { return 'specs-block' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #initiativeElement
  #speedElement
  #sizeCategoryElement
  #sizeElement
  #passivePerceptionElement

  _connectedCallback() {
    this.#initiativeElement = this.querySelector('[name="specs.initiative"]')
    this.#speedElement = this.querySelector('[name="specs.speed"]')
    this.#sizeCategoryElement = this.querySelector('.size-category')
    this.#sizeElement = this.querySelector('[name="specs.size"]')
    this.#passivePerceptionElement = this.querySelector('[name="specs.passivePerception"]')

    this.#renderSizeCategoryList()
    this.#renderInitiative()
    this.#renderSpeed()
    this.#renderSize()
    this.#renderPassivePerception()
  }

  _registerEvents() {
    this._pushEvents(
      domOn(this.#sizeCategoryElement, 'change', this.#sizeCategoryChanged),
      domOn(this.#sizeElement, 'change', this.#sizeChanged),
      charSheetStore.onMap({
        [charSheetProps.initiative]: this.#renderInitiative,
        [charSheetProps.speed]: this.#renderSpeed,
        [charSheetProps.sizeCategory]: this.#renderSize,
        [charSheetProps.size]: this.#renderSize,
        [charSheetProps.passivePerception]: this.#renderPassivePerception,
      })
    )
  }

  #renderInitiative = () => {
    console.info('Specs.#renderInitiative')
    if (this.#initiativeElement) {
      this.#initiativeElement.value = charSheetStore.getInitiative()
    }
  }

  _i18nChanged = () => {
    this.#renderSizeCategoryList()
    this.#renderSize()
  }

  #renderSpeed = () => {
    console.info('Specs.#renderSpeed')
    if (this.#speedElement) {
      this.#speedElement.value = charSheetStore.getSpeed()
    }
  }

  #renderSize = () => {
    console.info('Specs.#renderSize')
    if (this.#sizeCategoryElement) {
      this.#sizeCategoryElement.value = charSheetStore.getSizeCategory()
    }
    if (this.#sizeElement) {
      this.#sizeElement.value = charSheetStore.getSize() || ''
    }
  }

  #renderSizeCategoryList = () => {
    populateSelect(this.#sizeCategoryElement, Object.keys(SIZE_CATEGORY).map(sizeCategory => ({
      value: sizeCategory,
      text: t._(`statics.sizeCategory.${sizeCategory}`),
    })), {
      placeholder: '',
    })
  }

  #renderPassivePerception = () => {
    console.info('Specs.#renderPassivePerception')
    if (this.#passivePerceptionElement) {
      this.#passivePerceptionElement.value = charSheetStore.getPassivePerception()
    }
  }

  #sizeCategoryChanged = ({ target: { value } }) => {
    charSheetStore.setSizeCategory(value)
  }

  #sizeChanged = ({ target: { value } }) => {
    charSheetStore.setSize(value)
  }
}
