import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'

export class AbstractSelect extends AbstractComponent {
  static _modulePath = new URL('.', import.meta.url).pathname
  static _moduleName = AbstractSelect.name

  _selectElement

  _connectedCallback() {
    console.info('-- AbstractSelect.connectedCallback')

    this.setAttribute('data-abstract-select', '')

    this._selectElement = this.querySelector('select')

    this._refreshList()
    this._refreshValue()
  }

  _refreshList = () => { }

  _refreshValue = () => { }

  _i18nChanged = () => {
    this._refreshList()
    this._refreshValue()
  }
}
