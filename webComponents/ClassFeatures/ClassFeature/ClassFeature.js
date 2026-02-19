import { AbstractComponent } from '../../AbstractComponent/AbstractComponent.js'
import charSheetStore from '../../../modules/stores/charSheet.derived.store.js'
import { t } from '../../../modules/i18n.js'
import createEventBus from '../../../modules/createEventBus.js'

export class ClassFeature extends AbstractComponent {
  static get tagName() { return 'class-feature' }
  static _modulePath = new URL('.', import.meta.url).pathname

  _actionRequired = false
  eventBus = createEventBus()

  #accordionParent
  #feature
  #titleElement
  #descriptionElement

  _connectedCallback() {
    console.info('-- ClassFeature.connectedCallback')

    this.#accordionParent = this.dataset.accordion
    this.#feature = charSheetStore.getClass()?.features.find(feature => feature.name === this.dataset.feature)

    this.#titleElement = this.querySelector('.accordion-header > .feature-title')
    this.#titleElement.dataset.bsTarget = `#${this._id}`
    const content = this.querySelector('.accordion-collapse')
    this.#descriptionElement = content.querySelector('.accordion-body > .description > .card-body')

    content.id = this._id
    content.dataset.bsParent = `#${this.#accordionParent}`

    this.#renderTexts()
    this.#renderDescription()

    this._actionRequired = false
    this.eventBus.emit('actionRequired')
  }

  #renderTexts() {
    while (this.#titleElement.firstChild) { this.#titleElement.removeChild(this.#titleElement.firstChild) }
    this.#titleElement.appendChild(t.md('components.ClassFeature.name', {
      level: this.#feature.atLevel,
      featureName: t._(`statics.class-features.${charSheetStore.getClassName()}.${this.#feature.name}.name`)
    }))
  }

  #renderDescription() {
    while (this.#descriptionElement.firstChild) { this.#descriptionElement.removeChild(this.#descriptionElement.firstChild) }
    this.#descriptionElement.appendChild(
      t.md(`statics.class-features.${charSheetStore.getClassName()}.${this.#feature.name}.description`)
    )
  }

  _i18nChanged = () => {
    this.#renderTexts()
    this.#renderDescription()
  }
}
