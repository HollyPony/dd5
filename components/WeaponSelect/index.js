import { AbstractSelect } from '../AbstractSelect/index.js'
import { getWeapons } from '../../modules/data/equipments.js'
import { populateSelect, } from '../../modules/domlib.js'
import { domSubscribe } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class WeaponSelect extends AbstractSelect {
  static get tagName() { return 'weapon-select' }

  // async connectedCallback() {
  //   await super.connectedCallback()
  // }

  _registerEvents() {
    this._pushEvents(
      domSubscribe(this._selectElement, 'change', this.#selectChanged),
    )

    // document.addEventListener("userData.charOriginChanged", this._refreshValue)
  }

  _refreshList = () => {
    console.info('-- WeaponSelect.#refreshList')

    populateSelect(
      this._selectElement,
      Object.entries(
        getWeapons()
          .reduce((acc, weapon) => {
            if (!acc[weapon.category]) acc[weapon.category] = []
            acc[weapon.category].push(weapon)
            return acc
          }, {})
      ).map(([category, weapons]) => ({
        isGroup: true,
        label: t._(`statics.${category}`),
        options: weapons.map(weapon => ({
          value: weapon, text: t._(`statics.${weapon.name}`)
        })),
      })),
      {
        placeholder: t._('weaponscantrip.weapons._select')
      })
  }

  _refreshValue = () => {
    console.info('-- WeaponSelect.#refreshValue')
    this._selectElement.value = ''
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- WeaponSelect.#selectChanged', value)

    // // TODO: implement it
    // userData.addWeapon()
  }
}
