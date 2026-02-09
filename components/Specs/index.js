import { AbstractComponent } from '../AbstractComponent/index.js'
import charSheetStore from '../../modules/stores/charSheet.store.js'
import charSheetObserver from '../../modules/stores/charSheet.observer.js'

export class Specs extends AbstractComponent {
  static get tagName() { return 'specs-block' }
  static get _componentPath() { return '/components/Specs' }

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

    this.#refreshInitiative()
    this.#refreshSpeed()
    this.#refreshSize()
    this.#refreshPassivePerception()
  }

  _registerEvents() {
    this._pushEvents(
      charSheetObserver.subscribe('modifiers', this.#refreshInitiative),
      charSheetObserver.subscribe('charSpecies', this.#refreshSpeed),
      charSheetObserver.subscribe('equiped', this.#refreshSpeed),
      charSheetObserver.subscribe('feats', this.#refreshSpeed),
      charSheetObserver.subscribe('charSizeCategory', this.#refreshSize),
      charSheetObserver.subscribe('charSize', this.#refreshSize),
      charSheetObserver.subscribe('classSkills', this.#refreshPassivePerception),
      charSheetObserver.subscribe('expertSkills', this.#refreshPassivePerception),
      charSheetObserver.subscribe('modifiers', this.#refreshPassivePerception),
    )
  }

  #refreshInitiative = () => {
    if (this.#initiativeElement) {
      this.#initiativeElement.value = charSheetStore.getInitiative()
    }
  }

  #refreshSpeed = () => {
    if (this.#speedElement) {
      this.#speedElement.value = charSheetStore.getCharSpeed()
    }
  }

  #refreshSize = () => {
    if (this.#sizeCategoryElement) {
      this.#sizeCategoryElement.value = charSheetStore.getCharSizeCategory()
    }
    if (this.#sizeElement) {
      this.#sizeElement.value = charSheetStore.getCharSize() || ''
    }
  }

  #refreshPassivePerception = () => {
    if (this.#passivePerceptionElement) {
      this.#passivePerceptionElement.value = charSheetStore.getPassivePerception()
    }
  }
}
