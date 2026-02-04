import { AbstractComponent } from '../AbstractComponent/index.js'
import charSheet from '../../modules/stores/charSheet.store.js'
import { createElement, removeAllChildren } from '../../modules/domlib.js'
import { i18n } from '../../modules/i18n.js'

export class ClassFeatures extends AbstractComponent {
  static get tagName() { return 'class-features' }
  static get _componentPath() { return '/components/ClassFeatures' }

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
    const subscription = baseFeatureElement._observable('actionRequired').subscribe(this.#actionRequiredChanged)
    baseFeatureElement._pushEvents(subscription)

    i18n.applyTranslations(this)
  }

  _registerEvents() {
    this._pushEvents(
      // TODO: had a class features changed ????
      charSheet.subscribe('charLevel', this.#levelChanged),
      charSheet.subscribe('charClass', this.#classChanged),
    )
  }

  #refreshBaseFeature() {
    console.info('-- ClassFeatures.#refreshBaseFeature',)
  }

  #refreshFeatures() {
    console.info('-- ClassFeatures.#refreshFeatures',)

    removeAllChildren(this.#featuresElement)
    charSheet.getCharClass()?.features?.forEach(this.#appendFeature)
  }

  #refreshActionRequired() {
    console.info('-- ClassFeatures.#refreshActionRequired',)

    let hasActionRequired = false
    for (const element of this.querySelectorAll('class-base, class-feature')) {
      hasActionRequired = element._observable('actionRequired').get()
      if (hasActionRequired) break;
    }
    this.#mainRequiredBadgeElement.classList[hasActionRequired ? 'add' : 'remove']('show')
  }

  #appendFeature = (feature) => {
    console.info('-- ClassFeatures.#appendFeature',)

    const classFeature = createElement('class-feature', [
      // createElement('span', 'ca marche ?', { slot: 'label-name' })
    ], {
      class: 'accordion-item',
      'data-accordion': this.#featuresElement.id,
      'data-feature': feature.name,
    })

    this.#featuresElement.appendChild(classFeature)

    const subscritpion = classFeature._observable('actionRequired').subscribe(this.#actionRequiredChanged)
    classFeature._pushEvents(subscritpion)
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
