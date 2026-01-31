import { AbstractSelect } from '../AbstractSelect/index.js'
import { getWeapons } from '../../modules/data/equipments.js'
import { populateSelect, } from '../../modules/domlib.js'
import { i18n } from '../../modules/i18n.js'

export class WeaponSelect extends AbstractSelect {
  static get tagName() { return 'weapon-select' }

  // async connectedCallback() {
  //   await super.connectedCallback()
  // }

  _registerEvents() {
    // this._selectElement.addEventListener('change', this._selectChanged)

    // document.addEventListener("userData.charOriginChanged", this._refreshValue)
  }

  _unregisterEvents() {
    // this._selectElement.removeEventListener('change', this._selectChanged)

    // document.removeEventListener("userData.charOriginChanged", this._refreshValue)
  }

  _refreshList = () => {
    console.info('-- WeaponSelect.#refreshList')

    populateSelect(
      this._selectElement,
      [{ value: '', text: i18n._('weaponscantrip.weapons._select') }].concat(
        Object.entries(
          getWeapons()
            .reduce((acc, weapon) => {
              if (!acc[weapon.category]) acc[weapon.category] = []
              acc[weapon.category].push(weapon)
              return acc
            }, {})
        ).map(([category, weapons]) => ({
          isGroup: true,
          label: i18n._(`statics.${category}`),
          options: weapons.map(weapon => ({
            value: weapon, text: i18n._(`statics.${weapon.name}`)
          })),
        }))
      ))
  }

  _refreshValue = () => {
    console.info('-- WeaponSelect.#refreshValue')
    this._selectElement.value = ''
  }

  _selectChanged = ({ target: { value } }) => {
    console.info('-- WeaponSelect.#selectChanged', value)

    // // TODO: implement it
    // userData.addWeapon()
  }
}
