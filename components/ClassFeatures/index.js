import { AbstractComponent } from '../AbstractComponent/index.js'
import { createElement, removeAllChildren } from '../../modules/domlib.js'
import { i18n } from '../../modules/i18n.js'
import * as userData from '../../modules/userData.js'

export class ClassFeatures extends AbstractComponent {
  static get tagName() { return 'class-features' }
  static get _componentPath() { return '/components/ClassFeatures' }

  #mainRequiredBadgeElement

  #baseFeatureElement
  #baseFeatureButtonElement
  #baseFeatureAccordionElement

  #featuresElement

  #features

  async connectedCallback() {
    await super.connectedCallback()
    console.info('-- ClassFeatures.connectedCallback')

    // TODO: toggle it
    this.#mainRequiredBadgeElement = this.querySelector('main-required-badge')

    this.#featuresElement = this.querySelector('.class-features')
    this.#featuresElement.id = `accordion-features-${this._id}`

    this.#refreshBaseFeature()
    this.#refreshFeatures()

    this.#registerEvents()
  }

  disconnectedCallback() {
    this.#unregisterEvents()
  }

  #registerEvents() {
    // this.#scoreElement.addEventListener('change', this.#classChanged)

    // TODO: had a class features changed ????
    document.addEventListener("userData.charLevelChanged", this.#levelChanged)
    document.addEventListener("userData.charClassChanged", this.#classChanged)
    document.addEventListener("userData.charSubClassChanged", this.#subClassChanged)
  }

  #unregisterEvents() {
    // this.#scoreElement.removeEventListener('change', this.#classChanged)

    document.removeEventListener("userData.charLevelChanged", this.#classChanged)
    document.removeEventListener("userData.charClassChanged", this.#classChanged)
    document.removeEventListener("userData.charSubClassChanged", this.#classChanged)
  }

  #refreshBaseFeature() {
    console.info('-- ClassFeatures.#refreshBaseFeature',)
  }

  #refreshFeatures() {
    console.info('-- ClassFeatures.#refreshFeatures',)

    removeAllChildren(this.#featuresElement)
    userData.getCharClass()?.features?.forEach(this.#appendFeature)
  }

  #appendFeature = (feature) => {
    console.info('-- ClassFeatures.#appendFeature',)

    this.#featuresElement.appendChild(createElement('class-feature', [
      // createElement('span', 'ca marche ?', { slot: 'label-name' })
    ], {
      class: 'accordion-item',
      'data-accordion': this.#featuresElement.id,
      'data-feature': feature.name,
    }))
  }

  #levelChanged = () => {
    console.info('-- ClassFeatures.#levelChanged',)

    this.#classChanged()
  }

  #classChanged = () => {
    console.info('-- ClassFeatures.#classChanged',)

    this.#refreshBaseFeature()
    this.#refreshFeatures()
  }

  #subClassChanged = this.#classChanged
}
