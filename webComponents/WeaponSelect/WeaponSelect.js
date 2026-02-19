import { AbstractSelect } from '../AbstractSelect/AbstractSelect.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { EQUIPMENT_TYPE, getEquipment } from '../../modules/data/equipments.js'
import { domSubscribe, populateSelect } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class WeaponSelect extends AbstractSelect {
  static get tagName() { return 'weapon-select' }

  _registerEvents() {
    this._pushEvents(
      domSubscribe(this._selectElement, 'change', this.#selectChanged),
      charSheetStore.on(charSheetProps.equipments, this._renderList),
    )
  }

  _renderList = () => {
    console.info('-- WeaponSelect._renderList')

    const ownedUnequipedWeapons = (charSheetStore.getEquipments() ?? [])
      .filter(entry => !entry.equiped && getEquipment(entry.name)?.type === EQUIPMENT_TYPE.WEAPON)
      .map(entry => ({ ...entry, details: getEquipment(entry.name) }))

    populateSelect(
      this._selectElement,
      Array.from(
        ownedUnequipedWeapons
          .reduce((acc, entry) => {
            if (!acc.has(entry.details.category)) acc.set(entry.details.category, [])
            acc.get(entry.details.category).push(entry)
            return acc
          }, new Map())
      ).map(([category, weapons]) => ({
        label: t._(`statics.${category.description}`),
        options: weapons.map(weapon => ({
          value: weapon.id, text: t._(`statics.${weapon.name.description}.name`)
        })),
      })),
      {
        placeholder: t._('weaponscantrip.weapons._equipSelect')
      })
  }

  _renderValue = () => {
    console.info('-- WeaponSelect._renderValue')
    this._selectElement.value = ''
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- WeaponSelect.#selectChanged', value)
    if (!value) return

    charSheetStore.setEquipmentEquiped(value, true)
    this._renderValue()
  }
}
