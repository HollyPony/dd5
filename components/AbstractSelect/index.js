import { AbstractComponent } from '../AbstractComponent/index.js'
import { i18n } from '../../modules/i18n.js'

export class AbstractSelect extends AbstractComponent {
  static get _componentPath() { return '/components/AbstractSelect' }

  _selectElement
  #i18nUnsubscribe

  async connectedCallback() {
    await super.connectedCallback()
    console.info('-- AbstractSelect.connectedCallback')

    this.setAttribute('data-abstract-select', '')

    this._selectElement = this.querySelector('select')

    this._refreshList()
    this._refreshValue()

    this._registerEvents()
  }

  disconnectedCallback() {
    this._unregisterEvents()
  }

  _registerEvents() {
    this.#i18nUnsubscribe = i18n.subscribe(this._i18nChanged)
  }

  _unregisterEvents() {
    this.#i18nUnsubscribe()
  }

  _refreshList = () => { }

  _refreshValue = () => { }

  _i18nChanged = () => {
    this._refreshList()
    this._refreshValue()
  }
}
