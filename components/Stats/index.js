import { AbstractComponent } from '../AbstractComponent/index.js'
import charSheetStore from '../../modules/stores/charSheet.store.js'
import charSheetObserver from '../../modules/stores/charSheet.observer.js'
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
    this._pushEvents(
      charSheetObserver.subscribe('proficiencyBonus', this.#refreshProficiencyBonus),
    )
  }

  #refreshProficiencyBonus = () => {
    const bonus = charSheetStore.getProficiencyBonus()
    this.#proficiencyBonusElement.value = signDisplay(bonus)
  }

  _i18nChanged = () => {
    i18n.applyTranslations(this)
  }
}
