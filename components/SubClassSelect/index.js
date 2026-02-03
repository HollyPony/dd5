import { AbstractSelect } from '../AbstractSelect/index.js'
import charSheet from '../../modules/stores/charSheet.store.js'
import { getSubClasses, } from '../../modules/data/classes.js'
import { populateSelect, } from '../../modules/domlib.js'
import { i18n } from '../../modules/i18n.js'

export class SubClassSelect extends AbstractSelect {
  static get tagName() { return 'sub-class-select' }

  #subscriptions = []

  _registerEvents() {
    this._selectElement.addEventListener('change', this.#selectChanged)

    this.#subscriptions.push(
      charSheet.subscribe('charLevel', this.#charLevelChanged),
      charSheet.subscribe('charClass', this.#charClassChanged),
      charSheet.subscribe('charSubClassName', this._refreshValue)
    )
  }

  _unregisterEvents() {
    this._selectElement.removeEventListener('change', this.#charClassChanged)

    this.#subscriptions.forEach(subscription => subscription())
  }

  _refreshList = () => {
    console.info('-- SubClassSelect.#refreshList')
    populateSelect(
      this._selectElement,
      getSubClasses(charSheet.getCharClassName()).map(subClassName => ({
        value: subClassName,
        text: i18n._(`statics.subClasses.${charSheet.getCharClassName()}.${subClassName}`),
      })),
      {
        clear: true,
        placeholder: i18n._((charSheet.getCharLevel() < 3 || !charSheet.getCharClassName()) ? `subClasses.select.unavailable` : `subClasses.select.chooseOne`)
      }
    )
  }

  _refreshValue = () => {
    console.info('-- SubClassSelect.#refreshValue')
    this._selectElement.value = charSheet.getCharLevel() > 2 && charSheet.getCharSubClassName() || ''
    this._selectElement.disabled = charSheet.getCharLevel() < 3
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- SubClassSelect.#selectChanged', value)
    // TODO: alert skills lost
    charSheet.setCharSubClassName(value)
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
