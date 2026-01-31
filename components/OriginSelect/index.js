import { AbstractSelect } from '../AbstractSelect/index.js'
import { origins, } from '../../modules/data/origins.js'
import { populateSelect, } from '../../modules/domlib.js'
import { i18n } from '../../modules/i18n.js'
import * as userData from '../../modules/userData.js'

export class OriginSelect extends AbstractSelect {
  static get tagName() { return 'origin-select' }

  // async connectedCallback() {
  //   await super.connectedCallback()
  // }

  _registerEvents() {
    this._selectElement.addEventListener('change', this._selectChanged)

    document.addEventListener("userData.charOriginChanged", this._refreshValue)
  }

  _unregisterEvents() {
    this._selectElement.removeEventListener('change', this._selectChanged)

    document.removeEventListener("userData.charOriginChanged", this._refreshValue)
  }

  _refreshList = () => {
    console.info('-- OriginSelect.#refreshList')
    populateSelect(
      this._selectElement,
      Object.keys(origins).map(originName => ({ value: originName, text: i18n._(`statics.origins.${originName}`), }))
    )
  }

  _refreshValue = () => {
    console.info('-- OriginSelect.#refreshValue')
    this._selectElement.value = userData.getCharOrigin() || ''
  }

  _selectChanged = ({ target: { value } }) => {
    console.info('-- OriginSelect.#selectChanged', value)
    // TODO: alert skills lost
    userData.setCharOrigin(value)
  }
}
