import { AbstractComponent } from '../AbstractComponent/index.js'
import charSheet from '../../modules/stores/charSheet.store.js'
import { createElement, removeAllChildren } from '../../modules/domlib.js'
import { ARMOR_CATEGORY } from '../../modules/data/equipments.js'
import { t, i18n } from '../../modules/i18n.js'

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
    this._events.push(
      charSheet.subscribe('charClass', this.#refreshTrainings),
      charSheet.subscribe('feats', this.#refreshTrainings),
    )
  }

  #refreshTrainings = () => {
    const armorProficiencies = charSheet.getArmorProficiencies() || []
    this.#armorLightElement.checked = armorProficiencies.includes(ARMOR_CATEGORY.Light)
    this.#armorMediumElement.checked = armorProficiencies.includes(ARMOR_CATEGORY.Medium)
    this.#armorHeavyElement.checked = armorProficiencies.includes(ARMOR_CATEGORY.Heavy)
    this.#shieldElement.checked = charSheet.getShieldProficiency()

    removeAllChildren(this.#weaponsListElement)
    const weaponProficiencies = charSheet.getWeaponProficiencies() || []
    if (weaponProficiencies.length === 0) {
      this.#weaponsListElement.appendChild(
        createElement('p', t._('components.Trainings.weapons.none'), { class: 'text-muted' })
      )
    } else {
      weaponProficiencies.forEach(proficiency => this.#weaponsListElement
        .appendChild(createElement('p', t._(['components.Trainings.weapons']
          .concat(proficiency.length === 1 ? [proficiency, 'all'] : proficiency)
          .join('.')
        )))
      )
    }

    removeAllChildren(this.#toolsListElement)
    const toolProficiencies = charSheet.getToolProficiencies() || []
    if (toolProficiencies.length === 0) {
      this.#toolsListElement.appendChild(
        createElement('p', t._('components.Trainings.tools.none'), { class: 'text-muted' })
      )
    }
  }

  _i18nChanged = () => {
    this.#refreshTrainings()
  }
}
