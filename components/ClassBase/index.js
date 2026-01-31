import { AbstractComponent } from '../AbstractComponent/index.js'
import { i18n } from '../../modules/i18n.js'
import * as userData from '../../modules/userData.js'

export class ClassBase extends AbstractComponent {
  static get tagName() { return 'class-base' }
  static get _componentPath() { return '/components/ClassBase' }

  async connectedCallback() {
    await super.connectedCallback()
    console.info('-- ClassBase.connectedCallback')

    const baseFeatureElement = this.querySelector('.class-feature-base')
    const baseFeatureButtonElement = baseFeatureElement.querySelector('.accordion-button')
    const baseFeatureAccordionElement = baseFeatureElement.querySelector('.accordion-collapse')

    const baseAccordionId = `accordion-base-feature-${this._id}`
    const baseAccordionItemId = `base-item-${this._id}`

    baseFeatureElement.id = baseAccordionId
    baseFeatureButtonElement.dataset.bsTarget = `#${baseAccordionItemId}`
    baseFeatureAccordionElement.id = baseAccordionItemId
    baseFeatureAccordionElement.dataset.bsParent = `#${baseAccordionId}`

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
