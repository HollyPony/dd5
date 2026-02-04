import { AbstractComponent } from '../AbstractComponent/index.js'
import { i18n } from '../../modules/i18n.js'

export class Feats extends AbstractComponent {
  static get tagName() { return 'feats-block' }
  static get _componentPath() { return '/components/Feats' }

  _connectedCallback() {
    i18n.applyTranslations(this)
  }

  _i18nChanged = () => {
    i18n.applyTranslations(this)
  }
}
