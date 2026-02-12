import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'

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

    this.#renderInitiative()
    this.#renderSpeed()
    this.#renderSize()
    this.#renderPassivePerception()
  }

  _registerEvents() {
    this._pushEvents(
      charSheetStore.on('initiative', this.#renderInitiative),
      charSheetStore.on('charSpecies', this.#renderSpeed),
      charSheetStore.on('equiped', this.#renderSpeed),
      charSheetStore.on('feats', this.#renderSpeed),
      charSheetStore.on('charSizeCategory', this.#renderSize),
      charSheetStore.on('charSize', this.#renderSize),
      charSheetStore.on('classSkills', this.#renderPassivePerception),
      charSheetStore.on('expertSkills', this.#renderPassivePerception),
      charSheetStore.on('modifiers', this.#renderPassivePerception),
    )
  }

  #renderInitiative = () => {
    if (this.#initiativeElement) {
      this.#initiativeElement.value = charSheetStore.getInitiative()
    }
  }

  #renderSpeed = () => {
    if (this.#speedElement) {
      this.#speedElement.value = charSheetStore.getCharSpeed()
    }
  }

  #renderSize = () => {
    if (this.#sizeCategoryElement) {
      this.#sizeCategoryElement.value = charSheetStore.getCharSizeCategory()
    }
    if (this.#sizeElement) {
      this.#sizeElement.value = charSheetStore.getCharSize() || ''
    }
  }

  #renderPassivePerception = () => {
    if (this.#passivePerceptionElement) {
      this.#passivePerceptionElement.value = charSheetStore.getPassivePerception()
    }
  }
}
