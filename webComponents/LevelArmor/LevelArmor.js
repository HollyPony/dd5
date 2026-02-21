import { domOn } from '../../modules/domlib.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'

export class LevelArmor extends AbstractComponent {
  static get tagName() { return 'level-armor-block' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #experienceElement
  #levelElement
  #armorClassElement
  #shieldElement

  _connectedCallback() {
    this.#experienceElement = this.querySelector('[name="experiencepoints"]')
    this.#levelElement = this.querySelector('[name="charLevel"]')
    this.#armorClassElement = this.querySelector('[name="armorClass"]')
    this.#shieldElement = this.querySelector('[name="shield"]')

    this.#shieldElement.disabled = true

    this.#renderExperience()
    this.#renderLevel()
    this.#renderArmorClass()
    this.#renderShield()
  }

  _registerEvents() {
    this._pushEvents(
      domOn(this.#experienceElement, 'change', this.#experienceChanged),
      charSheetStore.onMap({
        [charSheetProps.experience]: [this.#renderExperience],
        [charSheetProps.level]: [this.#renderLevel, this.#renderArmorClass],
        [charSheetProps.class]: [this.#renderArmorClass, this.#renderShield],
        [charSheetProps.modifiers]: [this.#renderArmorClass],
        [charSheetProps.equiped]: [this.#renderArmorClass],
        [charSheetProps.feats]: [this.#renderArmorClass, this.#renderShield],
      }),
    )
  }

  #renderExperience = () => {
    this.#experienceElement.value = charSheetStore.getExperience()
  }

  #renderLevel = () => {
    this.#levelElement.value = charSheetStore.getLevel()
  }

  #renderArmorClass = () => {
    this.#armorClassElement.value = charSheetStore.getArmorClass()
  }

  #renderShield = () => {
    this.#shieldElement.checked = charSheetStore.getShieldProficiency()
  }

  #experienceChanged = ({ target: { value } }) => {
    charSheetStore.setExperience(value)
  }
}
