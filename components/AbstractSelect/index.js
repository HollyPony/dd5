import { AbstractComponent } from '../AbstractComponent/index.js'
import { i18n } from '../../modules/i18n.js'

export class AbstractSelect extends AbstractComponent {
  static get _componentPath() { return '/components/AbstractSelect' }

  _selectElement

  _connectedCallback() {
    console.info('-- AbstractSelect.connectedCallback')

    this.setAttribute('data-abstract-select', '')

    this._selectElement = this.querySelector('select')

    this._refreshList()
    this._refreshValue()
  }

  _registerEvents() {
    super._registerEvents()
    this._subscriptions.push(i18n.subscribe(this._i18nChanged))
  }

  _refreshList = () => { }

  _refreshValue = () => { }

  _i18nChanged = () => {
    this._refreshList()
    this._refreshValue()
  }
}
