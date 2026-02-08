import { AbstractComponent } from '../AbstractComponent/index.js'
import charSheetStore from '../../modules/stores/charSheet.store.js'
import charSheetObserver from '../../modules/stores/charSheet.observer.js'
import { createElement, replaceElement } from '../../modules/domlib.js'
import { ARMOR_CATEGORY } from '../../modules/data/equipments.js'
import { t, i18n } from '../../modules/i18n.js'

// TODO: Review this whole file
export class Trainings extends AbstractComponent {
  static get tagName() { return 'trainings-block' }
  static get _componentPath() { return '/components/Trainings' }

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

    this.#refreshTrainings()
    i18n.applyTranslations(this)
  }

  _registerEvents() {
    this._pushEvents(
      charSheetObserver.subscribe('charClass', this.#refreshTrainings),
      charSheetObserver.subscribe('classTools', this.#refreshTrainings),
      charSheetObserver.subscribe('feats', this.#refreshTrainings),
    )
  }

  #refreshTrainings = () => {
    this.#refreshArmors()
    this.#refreshWeaponProficiencies()
    this.#refreshToolsProficiency()
  }

  #refreshArmors = () => {
    const armorProficiencies = charSheetStore.getArmorProficiencies() || []
    this.#armorLightElement.checked = armorProficiencies.includes(ARMOR_CATEGORY.Light)
    this.#armorMediumElement.checked = armorProficiencies.includes(ARMOR_CATEGORY.Medium)
    this.#armorHeavyElement.checked = armorProficiencies.includes(ARMOR_CATEGORY.Heavy)
    this.#shieldElement.checked = charSheetStore.getShieldProficiency()
  }

  #refreshWeaponProficiencies = () => {
    const weaponProficiencies = charSheetStore.getWeaponProficiencies() || []
    const weaponItems = weaponProficiencies.length === 0
      ? [createElement('p', t._('components.Trainings.weapons.none'), { class: 'text-muted' })]
      : weaponProficiencies.map(proficiency => createElement('p', t._(['components.Trainings.weapons']
        .concat(proficiency.length === 1 ? [proficiency, 'all'] : proficiency)
        .join('.')
      )))
    replaceElement(this.#weaponsListElement, weaponItems)
  }

  #refreshToolsProficiency = () => {
    const toolProficiencies = charSheetStore.getToolProficiencies() || []
    const toolItems = toolProficiencies.length === 0
      ? createElement('p', t._('components.Trainings.tools.none'), { class: 'text-muted' })
      : toolProficiencies.map(tool => createElement('p', t._(`statics.TOOLS.${tool.replace('TOOLS_', '')}.name`)))
    replaceElement(this.#toolsListElement, toolItems)
  }

  _i18nChanged = () => {
    this.#refreshTrainings()
  }
}
