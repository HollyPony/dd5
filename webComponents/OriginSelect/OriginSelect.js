import { AbstractSelect } from '../AbstractSelect/AbstractSelect.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { getList as getOriginList } from '../../modules/data/origins.js'
import { domOn, populateSelect } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class OriginSelect extends AbstractSelect {
  static get tagName() { return 'origin-select' }

  _registerEvents() {
    this._pushEvents(
      domOn(this._selectElement, 'change', this.#selectChanged),
      charSheetStore.on(charSheetProps.originName, this._renderValue),
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
    this._selectElement.value = charSheetStore.getOriginName() || ''
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- OriginSelect.#selectChanged', value)
    // TODO: alert skills lost
    charSheetStore.setOriginName(value)
  }
}
