import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'

export class Feats extends AbstractComponent {
  static get tagName() { return 'feats-block' }
  static _modulePath = new URL('.', import.meta.url).pathname

  _connectedCallback() {
    // i18n.applyTranslations(this)
  }

  _i18nChanged = () => {
    // i18n.applyTranslations(this)
  }
}
