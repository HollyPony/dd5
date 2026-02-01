import { AbstractComponent } from '../AbstractComponent/index.js'
import { i18n } from '../../modules/i18n.js'

export class ClassFeature extends AbstractComponent {
  static get tagName() { return 'class-feature' }
  static get _componentPath() { return '/components/ClassFeature' }

  #accordionParent
  #feature

  async connectedCallback() {
    await super.connectedCallback()
    console.info('-- ClassFeature.connectedCallback')

    this.#accordionParent = this.dataset.accordion
    this.#feature = ClassFeature.charsheet.charClass?.features.find(feature => feature.name === this.dataset.feature)

    const title = this.querySelector('.accordion-header > .feature-title')
    const content = this.querySelector('.accordion-collapse')
    const description = content.querySelector('.accordion-body > .description > .card-body')

    title.appendChild(i18n.md('components.ClassFeature.name', {
      level: this.#feature.atLevel,
      featureName: i18n._(`statics.class-features.${ClassFeature.charsheet.charClassName}.${this.#feature.name}.name`)
    }))
    title.dataset.bsTarget = `#${this._id}`

    content.id = this._id
    content.dataset.bsParent = `#${this.#accordionParent}`

    description.appendChild(
      i18n.md(`statics.class-features.${ClassFeature.charsheet.charClassName}.${this.#feature.name}.description`)
    )

    i18n.applyTranslations(this)
    this.#registerEvents()
  }

  disconnectedCallback() {
    this.#unregisterEvents()
  }

  #registerEvents() {
    // this.#scoreElement.addEventListener('change', this.#scoreChanged)
    // document.addEventListener("userData.charLevelChanged", this.#refreshScore)
  }

  #unregisterEvents() {
    // this.#scoreElement.removeEventListener('change', this.#scoreChanged)
    // document.removeEventListener("userData.charLevelChanged", this.#refreshScore)
  }
}
