import { AbstractSelect } from '../AbstractSelect/index.js'
import { getList as getOriginList, } from '../../modules/data/origins.js'
import { populateSelect, } from '../../modules/domlib.js'
import { i18n } from '../../modules/i18n.js'

export class OriginSelect extends AbstractSelect {
  static get tagName() { return 'origin-select' }

  // async connectedCallback() {
  //   await super.connectedCallback()
  //   console.info('-- OriginSelect.#connectedCallback')
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
      getOriginList().map(originName => ({ value: originName, text: i18n._(`statics.origins.${originName}`), })),
      {
        placeholder: i18n._('components.OriginSelect.chooseOne'),
      }
    )
  }

  _refreshValue = () => {
    console.info('-- OriginSelect.#refreshValue')
    this._selectElement.value = OriginSelect.charsheet.charOriginName || ''
  }

  _selectChanged = ({ target: { value } }) => {
    console.info('-- OriginSelect.#selectChanged', value)
    // TODO: alert skills lost
    OriginSelect.charsheet.charOrigin = value
  }
}
