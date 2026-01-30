import { AbstractComponent } from '../AbstractComponent/index.js'

export class AbstractSelect extends AbstractComponent {
  static get _componentPath() {
    return '/components/AbstractSelect'
  }

  _selectElement

  async connectedCallback() {
    await super.connectedCallback()
    console.info('-- AbstractSelect.connectedCallback')

    // console.log('1', this._id)

    this._selectElement = this.querySelector('select')

    this._refreshList()
    this._refreshValue()

    this._registerEvents()
  }

  disconnectedCallback() {
    this._unregisterEvents()
  }

  _registerEvents() { }

  _unregisterEvents() { }

  _refreshList = () => { }

  _refreshValue = () => { }
}
