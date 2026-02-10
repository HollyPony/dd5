import { AbstractComponent } from '../../AbstractComponent/AbstractComponent.js'
import charSheet from '../../../modules/stores/charSheet.store.js'
import { t } from '../../../modules/i18n.js'
import { createObservable } from '../../../modules/createObservable.js'

export class ClassFeature extends AbstractComponent {
  static get tagName() { return 'class-feature' }
  static _modulePath = new URL('.', import.meta.url).pathname

  _actionRequired = false
  _observable = createObservable()

  #accordionParent
  #feature
  #titleElement
  #descriptionElement

  _connectedCallback() {
    console.info('-- ClassFeature.connectedCallback')

    this.#accordionParent = this.dataset.accordion
    this.#feature = charSheet.getCharClass()?.features.find(feature => feature.name === this.dataset.feature)

    this.#titleElement = this.querySelector('.accordion-header > .feature-title')
    this.#titleElement.dataset.bsTarget = `#${this._id}`
    const content = this.querySelector('.accordion-collapse')
    this.#descriptionElement = content.querySelector('.accordion-body > .description > .card-body')

    content.id = this._id
    content.dataset.bsParent = `#${this.#accordionParent}`

    this.#refreshTexts()
    this.#refreshDescription()

    this._actionRequired = false
    this._observable.notify('actionRequired')
  }

  #refreshTexts() {
    while (this.#titleElement.firstChild) { this.#titleElement.removeChild(this.#titleElement.firstChild) }
    this.#titleElement.appendChild(t.md('components.ClassFeature.name', {
      level: this.#feature.atLevel,
      featureName: t._(`statics.class-features.${charSheet.getCharClassName()}.${this.#feature.name}.name`)
    }))
  }

  #refreshDescription() {
    while (this.#descriptionElement.firstChild) { this.#descriptionElement.removeChild(this.#descriptionElement.firstChild) }
    this.#descriptionElement.appendChild(
      t.md(`statics.class-features.${charSheet.getCharClassName()}.${this.#feature.name}.description`)
    )
  }

  _i18nChanged = () => {
    this.#refreshTexts()
    this.#refreshDescription()
  }
}
