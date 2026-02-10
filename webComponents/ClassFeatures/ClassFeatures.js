import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import charSheetStore from '../../modules/stores/charSheet.store.js'
import charSheetObserver from '../../modules/stores/charSheet.observer.js'
import { createElement, replaceElement } from '../../modules/domlib.js'

export class ClassFeatures extends AbstractComponent {
  static get tagName() { return 'class-features' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #mainRequiredBadgeElement

  #featuresElement

  _connectedCallback() {
    console.info('-- ClassFeatures.connectedCallback')

    // TODO: toggle it
    this.#mainRequiredBadgeElement = this.querySelector('.class-features-block > span.action-required')

    this.#featuresElement = this.querySelector('.class-features')
    this.#featuresElement.id = `accordion-features-${this._id}`

    this.#refreshBaseFeature()
    this.#refreshFeatures()
    this.#refreshActionRequired()

    const baseFeatureElement = this.querySelector('class-base')
    const subscription = baseFeatureElement._observable.subscribe('actionRequired', this.#actionRequiredChanged)
    baseFeatureElement._pushEvents(subscription)
  }

  _registerEvents() {
    this._pushEvents(
      // TODO: had a class features changed ????
      charSheetObserver.subscribe('charLevel', this.#levelChanged),
      charSheetObserver.subscribe('charClass', this.#classChanged),
    )
  }

  #refreshBaseFeature() {
    console.info('-- ClassFeatures.#refreshBaseFeature',)
  }

  #refreshFeatures() {
    console.info('-- ClassFeatures.#refreshFeatures',)

    const featureElements = charSheetStore.getCharClass()?.features?.map(this.#createFeature) ?? []
    replaceElement(this.#featuresElement, featureElements)
  }

  #refreshActionRequired() {
    console.info('-- ClassFeatures.#refreshActionRequired',)

    let hasActionRequired = false
    for (const element of this.querySelectorAll('class-base, class-feature')) {
      hasActionRequired = element._actionRequired
      if (hasActionRequired) break;
    }
    this.#mainRequiredBadgeElement.classList[hasActionRequired ? 'add' : 'remove']('show')
  }

  #createFeature = (feature) => {
    console.info('-- ClassFeatures.#appendFeature',)

    const classFeature = createElement('class-feature', [
      // createElement('span', 'ca marche ?', { slot: 'label-name' })
    ], {
      class: 'accordion-item',
      'data-accordion': this.#featuresElement.id,
      'data-feature': feature.name,
    })

    const subscritpion = classFeature._observable.subscribe('actionRequired', this.#actionRequiredChanged)
    classFeature._pushEvents(subscritpion)
    return classFeature
  }

  #actionRequiredChanged = () => {
    console.info('-- ClassFeatures.actionRequiredChanged')
    this.#refreshActionRequired()
  }

  #levelChanged = () => {
    console.info('-- ClassFeatures.#levelChanged',)

    this.#classChanged()
  }

  #classChanged = () => {
    console.info('-- ClassFeatures.#classChanged',)

    this.#refreshBaseFeature()
    this.#refreshFeatures()
    this.#refreshActionRequired()
  }
}
