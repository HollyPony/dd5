import { AbstractComponent } from '../AbstractComponent/index.js'
import { i18n } from '../../modules/i18n.js'

export class WeaponsCantrip extends AbstractComponent {
  static get tagName() { return 'weapons-cantrip' }
  static get _componentPath() { return '/components/WeaponsCantrip' }

  _connectedCallback() {
    i18n.applyTranslations(this)
  }

  _registerEvents() {
    super._registerEvents()
    this._subscriptions.push(i18n.subscribe(() => i18n.applyTranslations(this)))
  }
}
