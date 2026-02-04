import { AbstractSelect } from '../AbstractSelect/index.js'
import charSheet from '../../modules/stores/charSheet.store.js'
import { getList as getClassesList, } from '../../modules/data/classes.js'
import { populateSelect, } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class ClassSelect extends AbstractSelect {
  static get tagName() { return 'class-select' }

  #subscriptions = []

  // async connectedCallback() {
  //   await super.connectedCallback()

  //   const stylesheet = document.createElement('link')
  //   stylesheet.setAttribute('rel', 'stylesheet')
  //   stylesheet.setAttribute('href', `/components/ClassSelect/index.css`)

  //   this.appendChild(stylesheet)
  // }

  _registerEvents() {
    super._registerEvents()
    this._selectElement.addEventListener('change', this.#selectChanged)

    this.#subscriptions.push(
      charSheet.subscribe('charClass', this._refreshValue),
    )
  }

  _unregisterEvents() {
    super._unregisterEvents()
    this._selectElement.removeEventListener('change', this.#selectChanged)

    this.#subscriptions.forEach(subscription => subscription())
  }

  _refreshList = () => {
    console.info('-- ClassSelect.#refreshList')
    populateSelect(
      this._selectElement,
      getClassesList().map(className => ({ value: className, text: t._(`statics.classes.${className}`), })),
      {
        placeholder: t._('components.ClassSelect.chooseOne'),
      },
    )
  }

  _refreshValue = () => {
    console.info('-- ClassSelect.#refreshValue')
    this._selectElement.value = charSheet.getCharClassName() || ''
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- ClassSelect.#selectChanged', value)
    charSheet.setCharClassName(value)
  }
}
