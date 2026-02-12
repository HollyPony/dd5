import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import charSheetStore, { properties as charSheetProps } from '../../modules/stores/charSheet.derived.store.js'
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

    this.#renderFeatures()
    this.#renderActionRequired()

    const baseFeatureElement = this.querySelector('class-base')
    const subscription = baseFeatureElement._eventBus.on('actionRequired', this.#actionRequiredChanged)
    baseFeatureElement._pushEvents(subscription)
  }

  _registerEvents() {
    this._pushEvents(
      // TODO: had a class features changed ????
      charSheetStore.onMap({
        [charSheetProps.charLevel]: [this.#levelChanged],
        [charSheetProps.charClass]: [this.#classChanged],
      }),
    )
  }

  #renderFeatures() {
    console.info('-- ClassFeatures.#renderFeatures',)

    const featureElements = charSheetStore.getCharClass()?.features?.map(this.#createFeature) ?? []
    replaceElement(this.#featuresElement, featureElements)
  }

  #renderActionRequired() {
    console.info('-- ClassFeatures.#renderActionRequired',)

    let hasActionRequired = false
    for (const element of this.querySelectorAll('class-base, class-feature')) {
      hasActionRequired = element._actionRequired
      if (hasActionRequired) break
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

    const subscription = classFeature._eventBus.on('actionRequired', this.#actionRequiredChanged)
    classFeature._pushEvents(subscription)
    return classFeature
  }

  #actionRequiredChanged = () => {
    console.info('-- ClassFeatures.actionRequiredChanged')
    this.#renderActionRequired()
  }

  #levelChanged = () => {
    console.info('-- ClassFeatures.#levelChanged',)

    this.#classChanged()
  }

  #classChanged = () => {
    console.info('-- ClassFeatures.#classChanged',)

    this.#renderFeatures()
    this.#renderActionRequired()
  }
}
