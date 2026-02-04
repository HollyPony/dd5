import { AbstractComponent } from '../AbstractComponent/index.js'
import charSheet from '../../modules/stores/charSheet.store.js'
import { i18n } from '../../modules/i18n.js'
import { signDisplay } from '../../modules/helpers.js'

export class Stats extends AbstractComponent {
  static get tagName() { return 'stats-block' }
  static get _componentPath() { return '/components/Stats' }

  #proficiencyBonusElement

  _connectedCallback() {
    this.#proficiencyBonusElement = this.querySelector('[name="proficiencybonus"]')
    this.#refreshProficiencyBonus()
    i18n.applyTranslations(this)
  }

  _registerEvents() {
    super._registerEvents()
    this._subscriptions.push(
      i18n.subscribe(() => i18n.applyTranslations(this)),
      charSheet.subscribe('proficiencyBonus', this.#refreshProficiencyBonus),
    )
  }

  #refreshProficiencyBonus = () => {
    const bonus = charSheet.getProficiencyBonus()
    this.#proficiencyBonusElement.value = signDisplay(bonus)
  }
}
