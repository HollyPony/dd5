import { AbstractSelect } from '../AbstractSelect/index.js'
import charSheet from '../../modules/stores/charSheet.store.js'
import { getSubClasses, } from '../../modules/data/classes.js'
import { populateSelect, } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class SubClassSelect extends AbstractSelect {
  static get tagName() { return 'sub-class-select' }

  _registerEvents() {
    super._registerEvents()
    this._listen(this._selectElement, 'change', this.#selectChanged)

    this._subscriptions.push(
      charSheet.subscribe('charLevel', this.#charLevelChanged),
      charSheet.subscribe('charClass', this.#charClassChanged),
      charSheet.subscribe('charSubClassName', this._refreshValue)
    )
  }

  _refreshList = () => {
    console.info('-- SubClassSelect.#refreshList')
    populateSelect(
      this._selectElement,
      getSubClasses(charSheet.getCharClassName()).map(subClassName => ({
        value: subClassName,
        text: t._(`statics.subClasses.${charSheet.getCharClassName()}.${subClassName}`),
      })),
      {
        placeholder: t._((charSheet.getCharLevel() < 3 || !charSheet.getCharClassName()) ? `subClasses.select.unavailable` : `subClasses.select.chooseOne`)
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
