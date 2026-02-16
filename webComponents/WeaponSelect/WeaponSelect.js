import { AbstractSelect } from '../AbstractSelect/AbstractSelect.js'
import { getWeapons } from '../../modules/data/equipments.js'
import { domSubscribe, populateSelect } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class WeaponSelect extends AbstractSelect {
  static get tagName() { return 'weapon-select' }

  _registerEvents() {
    this._pushEvents(
      domSubscribe(this._selectElement, 'change', this.#selectChanged),
    )
  }

  _renderList = () => {
    console.info('-- WeaponSelect._renderList')

    populateSelect(
      this._selectElement,
      Array.from(
        getWeapons()
          .reduce((acc, weapon) => {
            if (!acc.has(weapon.category)) acc.set(weapon.category, [])
            acc.get(weapon.category).push(weapon)
            return acc
          }, new Map())
      ).map(([category, weapons]) => ({
        isGroup: true,
        label: t._(`statics.${category.description}`),
        options: weapons.map(weapon => ({
          value: weapon, text: t._(`statics.${weapon.name.description}`)
        })),
      })),
      {
        placeholder: t._('weaponscantrip.weapons._select')
      })
  }

  _renderValue = () => {
    console.info('-- WeaponSelect._renderValue')
    this._selectElement.value = ''
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- WeaponSelect.#selectChanged', value)

    // // TODO: implement it
    // userData.addWeapon()
  }
}
