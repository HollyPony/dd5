import { AbstractSelect } from '../AbstractSelect/index.js'
import { getSubClasses, } from '../../modules/data/classes.js'
import { populateSelect, } from '../../modules/domlib.js'
import { i18n } from '../../modules/i18n.js'

export class SubClassSelect extends AbstractSelect {
  static get tagName() { return 'sub-class-select' }

  // async connectedCallback() {
  //   await super.connectedCallback()
  // }

  _registerEvents() {
    this._selectElement.addEventListener('change', this._selectChanged)

    document.addEventListener('userData.charLevelChanged', this._charLevelChanged)
    document.addEventListener('userData.charClassChanged', this._charClassChanged)
    document.addEventListener('userData.charSubClassChanged', this._refreshValue)
  }

  _unregisterEvents() {
    this._selectElement.removeEventListener('change', this._charClassChanged)

    document.removeEventListener('userData.charLevelChanged', this._charLevelChanged)
    document.removeEventListener('userData.charClassChanged', this._charClassChanged)
    document.removeEventListener('userData.charSubClassChanged', this._refreshValue)
  }

  _refreshList = () => {
    console.info('-- SubClassSelect.#refreshList')
    populateSelect(
      this._selectElement,
      [
        { value: '', text: i18n._((SubClassSelect.charsheet.charLevel < 3 || !SubClassSelect.charsheet.charClassName) ? `subClasses.select.unavailable` : `subClasses.select.chooseOne`), disabled: true },
        ...getSubClasses(SubClassSelect.charsheet.charClassName).map(subClassName => ({
          value: subClassName,
          text: i18n._(`statics.subClasses.${SubClassSelect.charsheet.charClassName}.${subClassName}`),
        })),
      ],
      { clear: true }
    )
  }

  _refreshValue = () => {
    console.info('-- SubClassSelect.#refreshValue')
    this._selectElement.value = SubClassSelect.charsheet.charLevel > 2 && SubClassSelect.charsheet.charSubClassName || ''
    this._selectElement.disabled = SubClassSelect.charsheet.charLevel < 3
  }

  _selectChanged = ({ target: { value } }) => {
    console.info('-- SubClassSelect.#selectChanged', value)
    // TODO: alert skills lost
    SubClassSelect.charsheet.charSubClassName = value
  }

  _charLevelChanged = () => {
    console.info('-- SubClassSelect.#charLevelChanged')
    this._refreshValue()
  }

  _charClassChanged = () => {
    console.info('-- SubClassSelect.#charClassChanged')
    this._refreshList()
    this._refreshValue()
  }
}
