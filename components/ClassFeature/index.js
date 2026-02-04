import { AbstractComponent } from '../AbstractComponent/index.js'
import charSheet from '../../modules/stores/charSheet.store.js'
import { t, i18n } from '../../modules/i18n.js'

export class ClassFeature extends AbstractComponent {
  static get tagName() { return 'class-feature' }
  static get _componentPath() { return '/components/ClassFeature' }

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

    this._observable('actionRequired').set(false)

    i18n.applyTranslations(this)
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
    i18n.applyTranslations(this)
    this.#refreshTexts()
    this.#refreshDescription()
  }
}
