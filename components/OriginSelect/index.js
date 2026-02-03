import { AbstractSelect } from '../AbstractSelect/index.js'
import charSheet from '../../modules/stores/charSheet.store.js'
import { getList as getOriginList, } from '../../modules/data/origins.js'
import { populateSelect, } from '../../modules/domlib.js'
import { i18n } from '../../modules/i18n.js'

export class OriginSelect extends AbstractSelect {
  static get tagName() { return 'origin-select' }

  _registerEvents() {
    this._selectElement.addEventListener('change', this.#selectChanged)
  }

  _unregisterEvents() {
    this._selectElement.removeEventListener('change', this.#selectChanged)
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
    this._selectElement.value = charSheet.getCharOriginName() || ''
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- OriginSelect.#selectChanged', value)
    // TODO: alert skills lost
    charSheet.setCharOriginName(value)
  }
}
