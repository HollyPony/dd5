import { AbstractSelect } from '../AbstractSelect/index.js'
import { getSpeciesList, } from '../../modules/data/species.js'
import { populateSelect, } from '../../modules/domlib.js'
import { i18n } from '../../modules/i18n.js'
import * as userData from '../../modules/userData.js'

export class SpeciesSelect extends AbstractSelect {
  static get tagName() { return 'species-select' }

  // async connectedCallback() {
  //   await super.connectedCallback()
  // }

  _registerEvents() {
    this._selectElement.addEventListener('change', this._selectChanged)

    document.addEventListener("userData.charSpeciesChanged", this._refreshValue)
  }

  _unregisterEvents() {
    this._selectElement.removeEventListener('change', this._selectChanged)

    document.removeEventListener("userData.charSpeciesChanged", this._refreshValue)
  }

  _refreshList = () => {
    console.info('-- SpeciesSelect.#refreshList')
    populateSelect(
      this._selectElement,
      getSpeciesList().map(species => (
        species.lineages ? {
          isGroup: true,
          label: i18n._(`statics.species.${species.name}`),
          options: species.lineages.map(lineage => ({
            value: `${species.name}.${lineage}`,
            text: i18n._(`statics.species.${species.name}-${lineage}`),
          })),
        } : {
          value: species.name, text: i18n._(`statics.species.${species.name}`),
        }
      ))
    )
  }

  _refreshValue = () => {
    console.info('-- SpeciesSelect.#refreshValue')
    this._selectElement.value = userData.getCharSpeciesName() || ''
  }

  _selectChanged = ({ target: { value } }) => {
    console.info('-- SpeciesSelect.#selectChanged', value)
    // TODO: alert skills lost
    userData.setCharSpeciesName(value)
  }
}
