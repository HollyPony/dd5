import { AbstractSelect } from '../AbstractSelect/AbstractSelect.js'
import charSheetStore from '../../modules/stores/charSheet.store.js'
import charSheetObserver from '../../modules/stores/charSheet.observer.js'
import { getSubClasses, } from '../../modules/data/classes.js'
import { populateSelect, } from '../../modules/domlib.js'
import { domSubscribe } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class SubClassSelect extends AbstractSelect {
  static get tagName() { return 'sub-class-select' }

  _registerEvents() {
    this._pushEvents(
      domSubscribe(this._selectElement, 'change', this.#selectChanged),
      charSheetObserver.subscribe('charLevel', this.#charLevelChanged),
      charSheetObserver.subscribe('charClass', this.#charClassChanged),
      charSheetObserver.subscribe('charSubClassName', this._refreshValue),
    )
  }

  _refreshList = () => {
    console.info('-- SubClassSelect.#refreshList')
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

  _refreshValue = () => {
    console.info('-- SubClassSelect.#refreshValue')
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
    this._refreshList()
    this._refreshValue()
  }

  #charClassChanged = () => {
    console.info('-- SubClassSelect.#charClassChanged')
    this._refreshList()
    this._refreshValue()
  }
}
