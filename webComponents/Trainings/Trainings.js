import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { createElement, replaceElement } from '../../modules/domlib.js'
import { INSERTION_TYPE, SOURCE_KEY } from '../../modules/data/classes.js'
import { ARMOR_CATEGORY } from '../../modules/data/equipments.js'
import { t } from '../../modules/i18n.js'
import { SELECTOR_TYPE } from '../../modules/services/choice.helper.js'

// TODO: Review this whole file
export class Trainings extends AbstractComponent {
  static get tagName() { return 'trainings-block' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #armorLightElement
  #armorMediumElement
  #armorHeavyElement
  #shieldElement
  #weaponsListElement
  #toolsListElement

  _connectedCallback() {
    console.info('-- Trainings.connectedCallback')

    this.#armorLightElement = this.querySelector('[name="trainings-armor-light"]')
    this.#armorMediumElement = this.querySelector('[name="trainings-armor-medium"]')
    this.#armorHeavyElement = this.querySelector('[name="trainings-armor-heavy"]')
    this.#shieldElement = this.querySelector('[name="trainings-shield"]')
    this.#weaponsListElement = this.querySelector('.trainings-weapons-list')
    this.#toolsListElement = this.querySelector('.trainings-tools-list')

    this.#renderTrainings()
  }

  _registerEvents() {
    this._pushEvents(
      charSheetStore.onMany(
        [charSheetProps.charClass, charSheetProps.choiceSelections, charSheetProps.feats],
        this.#renderTrainings
      ),
    )
  }

  #renderTrainings = () => {
    this.#renderArmors()
    this.#renderWeaponProficiencies()
    this.#renderToolsProficiency()
  }

  #renderArmors = () => {
    const armorProficiencies = charSheetStore.getArmorProficiencies() || []
    this.#armorLightElement.checked = armorProficiencies.includes(ARMOR_CATEGORY.Light)
    this.#armorMediumElement.checked = armorProficiencies.includes(ARMOR_CATEGORY.Medium)
    this.#armorHeavyElement.checked = armorProficiencies.includes(ARMOR_CATEGORY.Heavy)
    this.#shieldElement.checked = charSheetStore.getShieldProficiency()
  }

  #renderWeaponProficiencies = () => {
    const weaponProficiencies = charSheetStore.getWeaponProficiencies() || []
    const weaponItems = weaponProficiencies.length === 0
      ? [createElement('p', t._('components.Trainings.weapons.none'), { class: 'text-muted' })]
      : weaponProficiencies.map(proficiency => createElement('p', t._(['components.Trainings.weapons']
        .concat(proficiency.length === 1 ? [proficiency, 'all'] : proficiency)
        .join('.')
      )))
    replaceElement(this.#weaponsListElement, weaponItems)
  }

  #renderToolsProficiency = () => {
    const toolProficiencies = this.#resolveToolsProficiencies()
    const toolItems = toolProficiencies.length === 0
      ? createElement('p', t._('components.Trainings.tools.none'), { class: 'text-muted' })
      : toolProficiencies.map(tool => createElement('p', t._(`statics.TOOLS.${tool.replace('TOOLS_', '')}.name`)))
    replaceElement(this.#toolsListElement, toolItems)
  }

  #resolveToolsProficiencies() {
    // TODO: toolProficiencies can come from other than class or selections
    const toolRule = charSheetStore.getCharClass()?.toolProficiencies
    switch (toolRule?.type) {
      case INSERTION_TYPE.forced:
        return toolRule.tools ?? []
      case INSERTION_TYPE.select:
        return Object.values(charSheetStore.getChoiceSelections())
          .filter(selection =>
            selection?.choice?.selector?.type === SELECTOR_TYPE.CLASS
            && selection?.choice?.selector?.key === SOURCE_KEY.TOOLS
          )
          .flatMap(selection => selection?.payload ?? [])
      default:
        return []
    }
  }

  _i18nChanged = () => {
    this.#renderWeaponProficiencies()
    this.#renderToolsProficiency()
  }
}
