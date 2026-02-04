import { AbstractComponent } from '../AbstractComponent/index.js'
import { i18n } from '../../modules/i18n.js'

export class SpeciesTraits extends AbstractComponent {
  static get tagName() { return 'species-traits' }
  static get _componentPath() { return '/components/SpeciesTraits' }

  _connectedCallback() {
    i18n.applyTranslations(this)
  }

  _i18nChanged = () => {
    i18n.applyTranslations(this)
  }
}
