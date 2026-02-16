import { AbstractSelect } from '../AbstractSelect/AbstractSelect.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { getSubClasses } from '../../modules/data/classes.js'
import { domSubscribe, populateSelect } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class SubClassSelect extends AbstractSelect {
  static get tagName() { return 'sub-class-select' }

  _registerEvents() {
    this._pushEvents(
      domSubscribe(this._selectElement, 'change', this.#selectChanged),
      // TODO: avoid *change and use subscribeMany on selective refresh
      charSheetStore.onMap({
        [charSheetProps.level]: [this.#levelChanged],
        [charSheetProps.className]: [this.#classChanged],
        [charSheetProps.subClassName]: [this._renderValue],
      }),
    )
  }

  _renderList = () => {
    console.info('-- SubClassSelect.#renderList')
    populateSelect(
      this._selectElement,
      getSubClasses(charSheetStore.getClassName()).map(subClassName => ({
        value: subClassName,
        text: t._(`statics.subClasses.${charSheetStore.getClassName()}.${subClassName}`),
      })),
      {
        placeholder: t._((charSheetStore.getLevel() < 3 || !charSheetStore.getClassName()) ? `subClasses.select.unavailable` : `subClasses.select.chooseOne`)
      }
    )
  }

  _renderValue = () => {
    console.info('-- SubClassSelect.#renderValue')
    this._selectElement.value = charSheetStore.getLevel() > 2 && charSheetStore.getSubClassName() || ''
    this._selectElement.disabled = charSheetStore.getLevel() < 3
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- SubClassSelect.#selectChanged', value)
    // TODO: alert skills lost
    charSheetStore.setSubClassName(value)
  }

  #levelChanged = () => {
    console.info('-- SubClassSelect.#levelChanged')
    this._renderList()
    this._renderValue()
  }

  #classChanged = () => {
    console.info('-- SubClassSelect.#classChanged')
    this._renderList()
    this._renderValue()
  }
}
