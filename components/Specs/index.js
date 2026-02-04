import { AbstractComponent } from '../AbstractComponent/index.js'
import charSheet from '../../modules/stores/charSheet.store.js'
import { i18n } from '../../modules/i18n.js'

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

    i18n.applyTranslations(this)
  }

  _registerEvents() {
    super._registerEvents()
    this._subscriptions.push(
      charSheet.subscribe('modifiers', this.#refreshInitiative),
      charSheet.subscribe('charSpecies', this.#refreshSpeed),
      charSheet.subscribe('equiped', this.#refreshSpeed),
      charSheet.subscribe('feats', this.#refreshSpeed),
      charSheet.subscribe('charSizeCategory', this.#refreshSize),
      charSheet.subscribe('charSize', this.#refreshSize),
      charSheet.subscribe('classSkills', this.#refreshPassivePerception),
      charSheet.subscribe('modifiers', this.#refreshPassivePerception),
    )
  }

  #refreshInitiative = () => {
    if (this.#initiativeElement) {
      this.#initiativeElement.value = charSheet.getInitiative()
    }
  }

  #refreshSpeed = () => {
    if (this.#speedElement) {
      this.#speedElement.value = charSheet.getCharSpeed()
    }
  }

  #refreshSize = () => {
    if (this.#sizeCategoryElement) {
      this.#sizeCategoryElement.value = charSheet.getCharSizeCategory()
    }
    if (this.#sizeElement) {
      this.#sizeElement.value = charSheet.getCharSize() || ''
    }
  }

  #refreshPassivePerception = () => {
    if (this.#passivePerceptionElement) {
      this.#passivePerceptionElement.value = charSheet.getPassivePerception()
    }
  }

  _i18nChanged = () => {
    i18n.applyTranslations(this)
  }
}
