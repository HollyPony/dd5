import { AbstractSelect } from '../AbstractSelect/index.js'
import { getList as getClassesList, } from '../../modules/data/classes.js'
import { populateSelect, } from '../../modules/domlib.js'
import { i18n } from '../../modules/i18n.js'

export class ClassSelect extends AbstractSelect {
  static get tagName() { return 'class-select' }

  // async connectedCallback() {
  //   await super.connectedCallback()

  //   const stylesheet = document.createElement('link')
  //   stylesheet.setAttribute('rel', 'stylesheet')
  //   stylesheet.setAttribute('href', `/components/ClassSelect/index.css`)

  //   this.appendChild(stylesheet)
  // }

  _registerEvents() {
    this._selectElement.addEventListener('change', this._selectChanged)

    document.addEventListener("userData.charClassChanged", this._refreshValue)
  }

  _unregisterEvents() {
    this._selectElement.removeEventListener('change', this._selectChanged)

    document.removeEventListener("userData.charClassChanged", this._refreshValue)
  }

  _refreshList = () => {
    console.info('-- ClassSelect.#refreshList')
    populateSelect(
      this._selectElement,
      [
        { value: '', text: i18n._('classes.select.chooseOne'), disabled: true },
        ...getClassesList().map(className => ({ value: className, text: i18n._(`statics.classes.${className}`), }))
      ]
    )
  }

  _refreshValue = () => {
    console.info('-- ClassSelect.#refreshValue')
    this._selectElement.value = ClassSelect.charsheet.charClassName || ''
  }

  _selectChanged = ({ target: { value } }) => {
    console.info('-- ClassSelect.#selectChanged', value)
    ClassSelect.charsheet.charClassName = value
  }
}
