import { AbstractSelect } from '../AbstractSelect/AbstractSelect.js'
import charSheetStore, { properties as charSheetProps } from '../../modules/stores/charSheet.derived.store.js'
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
        [charSheetProps.charLevel]: [this.#charLevelChanged],
        [charSheetProps.charClassName]: [this.#charClassChanged],
        [charSheetProps.charSubClassName]: [this._renderValue],
      }),
    )
  }

  _renderList = () => {
    console.info('-- SubClassSelect.#renderList')
    populateSelect(
      this._selectElement,
      getSubClasses(charSheetStore.getCharClassName()).map(subClassName => ({
        value: subClassName,
        text: t._(`statics.subClasses.${charSheetStore.getCharClassName()}.${subClassName}`),
      })),
      {
        placeholder: t._((charSheetStore.getCharLevel() < 3 || !charSheetStore.getCharClassName()) ? `subClasses.select.unavailable` : `subClasses.select.chooseOne`)
      }
    )
  }

  _renderValue = () => {
    console.info('-- SubClassSelect.#renderValue')
    this._selectElement.value = charSheetStore.getCharLevel() > 2 && charSheetStore.getCharSubClassName() || ''
    this._selectElement.disabled = charSheetStore.getCharLevel() < 3
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- SubClassSelect.#selectChanged', value)
    // TODO: alert skills lost
    charSheetStore.setCharSubClassName(value)
  }

  #charLevelChanged = () => {
    console.info('-- SubClassSelect.#charLevelChanged')
    this._renderList()
    this._renderValue()
  }

  #charClassChanged = () => {
    console.info('-- SubClassSelect.#charClassChanged')
    this._renderList()
    this._renderValue()
  }
}
