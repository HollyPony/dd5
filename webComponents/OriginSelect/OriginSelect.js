import { AbstractSelect } from '../AbstractSelect/AbstractSelect.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import { getList as getOriginList } from '../../modules/data/origins.js'
import { domSubscribe, populateSelect } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class OriginSelect extends AbstractSelect {
  static get tagName() { return 'origin-select' }

  _registerEvents() {
    this._pushEvents(
      domSubscribe(this._selectElement, 'change', this.#selectChanged),
      charSheetStore.on('charOriginName', this._renderValue),
    )
  }

  _renderList = () => {
    console.info('-- OriginSelect.#renderList')
    populateSelect(
      this._selectElement,
      getOriginList().map(originName => ({ value: originName, text: t._(`statics.origins.${originName}.name`), })),
      {
        placeholder: t._('components.OriginSelect.chooseOne'),
      }
    )
  }

  _renderValue = () => {
    console.info('-- OriginSelect.#renderValue')
    this._selectElement.value = charSheetStore.getCharOriginName() || ''
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- OriginSelect.#selectChanged', value)
    // TODO: alert skills lost
    charSheetStore.setCharOriginName(value)
  }
}
