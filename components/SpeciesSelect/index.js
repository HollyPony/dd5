import { AbstractSelect } from '../AbstractSelect/index.js'
import charSheet from '../../modules/stores/charSheet.store.js'
import { getList as getSpeciesList, } from '../../modules/data/species.js'
import { populateSelect, } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class SpeciesSelect extends AbstractSelect {
  static get tagName() { return 'species-select' }

  #subscriptions = []

  _registerEvents() {
    super._registerEvents()
    this._selectElement.addEventListener('change', this.#selectChanged)

    this.#subscriptions.push(
      charSheet.subscribe('charSpeciesName', this._refreshValue)
    )
  }

  _unregisterEvents() {
    super._unregisterEvents()
    this._selectElement.removeEventListener('change', this.#selectChanged)

    this.#subscriptions.forEach(subscription => subscription())
  }

  _refreshList = () => {
    console.info('-- SpeciesSelect.#refreshList')
    populateSelect(
      this._selectElement,
      getSpeciesList().map(species => (
        species.lineages ? {
          isGroup: true,
          label: t._(`statics.species.${species.name}`),
          options: species.lineages.map(lineage => ({
            value: `${species.name}.${lineage}`,
            text: t._(`statics.species.${species.name}-${lineage}`),
          })),
        } : {
          value: species.name, text: t._(`statics.species.${species.name}`),
        }
      ))
      , {

        placeholder: t._('components.SpeciesSelect.chooseOne'),
      })
  }

  _refreshValue = () => {
    console.info('-- SpeciesSelect.#refreshValue')
    this._selectElement.value = charSheet.getCharSpeciesName() || ''
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- SpeciesSelect.#selectChanged', value)
    // TODO: alert skills lost
    charSheet.setCharSpeciesName(value)
  }
}
