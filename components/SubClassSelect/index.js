import { AbstractSelect } from '../AbstractSelect/index.js'
import { getSubClasses, } from '../../modules/data/classes.js'
import { populateSelect, } from '../../modules/domlib.js'
import { i18n } from '../../modules/i18n.js'
import * as userData from '../../modules/userData.js'

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

    document.removeEventListener('userData.charSubClassChanged', this._refreshValue)
  }

  _refreshList = () => {
    console.info('-- SubClassSelect.#refreshList')
    populateSelect(
      this._selectElement,
      [
        { value: '', text: i18n._((userData.getCharLevel() < 3 || !userData.getCharClassName()) ? `subClasses.select.unavailable` : `subClasses.select.chooseOne`), disabled: true },
        ...getSubClasses(userData.getCharClassName()).map(subClassName => ({
          value: subClassName,
          text: i18n._(`statics.subClasses.${userData.getCharClassName()}.${subClassName}`),
        })),
      ],
      { clear: true }
    )
  }

  _refreshValue = () => {
    console.info('-- SubClassSelect.#refreshValue')
    this._selectElement.value = userData.getCharLevel() > 2 && userData.getCharSubClassName() || ''
    this._selectElement.disabled = userData.getCharLevel() < 3
  }

  _selectChanged = ({ target: { value } }) => {
    console.info('-- SubClassSelect.#selectChanged', value)
    // TODO: alert skills lost
    userData.setCharSubClassName(value)
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
