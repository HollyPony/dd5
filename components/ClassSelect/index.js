import { AbstractSelect } from '../AbstractSelect/index.js'
import charSheetStore from '../../modules/stores/charSheet.store.js'
import charSheetObserver from '../../modules/stores/charSheet.observer.js'
import { getList as getClassesList, } from '../../modules/data/classes.js'
import { populateSelect, } from '../../modules/domlib.js'
import { domSubscribe } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

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
    this._pushEvents(
      domSubscribe(this._selectElement, 'change', this.#selectChanged),
      charSheetObserver.subscribe('charClass', this._refreshValue),
    )
  }

  _refreshList = () => {
    console.info('-- ClassSelect.#refreshList')
    populateSelect(
      this._selectElement,
      getClassesList().map(className => ({ value: className, text: t._(`statics.classes.${className}.name`), })),
      {
        placeholder: t._('components.ClassSelect.chooseOne'),
      },
    )
  }

  _refreshValue = () => {
    console.info('-- ClassSelect.#refreshValue')
    this._selectElement.value = charSheetStore.getCharClassName() || ''
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- ClassSelect.#selectChanged', value)
    charSheetStore.setCharClassName(value)
  }
}
