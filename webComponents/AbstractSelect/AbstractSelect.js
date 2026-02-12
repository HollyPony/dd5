import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'

export class AbstractSelect extends AbstractComponent {
  static _modulePath = new URL('.', import.meta.url).pathname
  static _moduleName = AbstractSelect.name

  _selectElement

  _connectedCallback() {
    console.info('-- AbstractSelect.connectedCallback')

    this.setAttribute('data-abstract-select', '')

    this._selectElement = this.querySelector('select')

    this._renderList()
    this._renderValue()
  }

  _renderList = () => { }

  _renderValue = () => { }

  _i18nChanged = () => {
    this._renderList()
    this._renderValue()
  }
}
