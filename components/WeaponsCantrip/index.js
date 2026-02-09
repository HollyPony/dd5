import { AbstractComponent } from '../AbstractComponent/index.js'

export class WeaponsCantrip extends AbstractComponent {
  static get tagName() { return 'weapons-cantrip' }
  static get _componentPath() { return '/components/WeaponsCantrip' }

  _connectedCallback() {
    // i18n.applyTranslations(this)
  }

  _i18nChanged = () => {
    // i18n.applyTranslations(this)
  }
}
