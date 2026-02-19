import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { EQUIPMENT_TYPE, getEquipment } from '../../modules/data/equipments.js'
import { createElement, domSubscribe, replaceElement } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class WeaponsCantrip extends AbstractComponent {
  static get tagName() { return 'weapons-cantrip' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #weaponListElement

  _connectedCallback() {
    this.#weaponListElement = this.querySelector('.weaponscantrip-list')
    this.#renderWeapons()
  }

  _registerEvents() {
    this._pushEvents(
      charSheetStore.on(charSheetProps.equipments, this.#renderWeapons),
      domSubscribe(this.#weaponListElement, 'click', this.#weaponListClicked),
    )
  }

  _i18nChanged = () => {
    this.#renderWeapons()
  }

  #renderWeapons = () => {
    const weapons = (charSheetStore.getEquipments() ?? [])
      .filter(equipment => equipment.equiped && getEquipment(equipment.name)?.type === EQUIPMENT_TYPE.WEAPON)

    if (weapons.length === 0) {
      replaceElement(this.#weaponListElement, [
        createElement('li', t._('weaponscantrip.weapons.none'), {
          class: 'list-group-item text-muted',
        })
        , createElement('li', createElement('weapon-select'), {
          class: 'list-group-item',
        })])
      return
    }

    replaceElement(this.#weaponListElement, weapons.map(weapon =>
      createElement('li', [
        createElement('label', [
          t._(`statics.${weapon.name.description}.name`),
        ], { class: 'form-check-label flex-grow-1 text-break' }),
        createElement('button', t._('weaponscantrip.weapons.unequip'), {
          class: 'btn btn-outline-secondary btn-sm',
          type: 'button',
          'data-action': 'unequip',
          'data-id': weapon.id,
        }),
      ], { class: 'list-group-item d-flex align-items-center gap-2' })
    ).concat(createElement('li', createElement('weapon-select'), {
      class: 'list-group-item',
    })))
  }

  #weaponListClicked = ({ target }) => {
    const actionElement = target.closest('[data-action]')
    if (!actionElement) return
    if (actionElement.dataset.action !== 'unequip') return

    charSheetStore.setEquipmentEquiped(actionElement.dataset.id, false)
  }
}
