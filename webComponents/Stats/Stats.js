import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import { signDisplay } from '../../modules/helpers.js'

export class Stats extends AbstractComponent {
  static get tagName() { return 'stats-block' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #proficiencyBonusElement

  _connectedCallback() {
    this.#proficiencyBonusElement = this.querySelector('[name="proficiencybonus"]')
    this.#renderProficiencyBonus()
  }

  _registerEvents() {
    this._pushEvents(
      charSheetStore.on('proficiencyBonus', this.#renderProficiencyBonus),
    )
  }

  #renderProficiencyBonus = () => {
    const bonus = charSheetStore.getProficiencyBonus()
    this.#proficiencyBonusElement.value = signDisplay(bonus)
  }
}
