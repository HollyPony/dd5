import { AbstractComponent } from '../AbstractComponent/index.js'
import { i18n } from '../../modules/i18n.js'
import * as userData from '../../modules/userData.js'

export class ClassFeature extends AbstractComponent {
  static get tagName() { return 'class-feature' }
  static get _componentPath() { return '/components/ClassFeature' }

  #accordionParent
  #feature

  async connectedCallback() {
    await super.connectedCallback()
    console.info('-- ClassFeature.connectedCallback')

    this.#accordionParent = this.dataset.accordion
    this.#feature = userData.getCharClass()?.features.find(feature => feature.name === this.dataset.feature)

    const title = this.querySelector('.accordion-header > .feature-title')
    const content = this.querySelector('.accordion-collapse')
    const description = content.querySelector('.accordion-body')

    title.appendChild(i18n.md('class-features.feature.title', {
      level: this.#feature.atLevel,
      featureName: i18n._(`statics.class-features.${userData.getCharClassName()}.${this.#feature.name}.name`)
    }))
    title.dataset.bsTarget = `#${this._id}`

    content.id = this._id
    content.dataset.bsParent = `#${this.#accordionParent}`

    description.appendChild(
      i18n.md(`statics.class-features.${userData.getCharClassName()}.${this.#feature.name}.description`)
    )

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
