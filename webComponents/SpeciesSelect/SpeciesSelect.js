import { AbstractSelect } from '../AbstractSelect/AbstractSelect.js'
import charSheetStore from '../../modules/stores/charSheet.store.js'
import charSheetObserver from '../../modules/stores/charSheet.observer.js'
import { getList as getSpeciesList, } from '../../modules/data/species.js'
import { populateSelect, } from '../../modules/domlib.js'
import { domSubscribe } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class SpeciesSelect extends AbstractSelect {
  static get tagName() { return 'species-select' }

  _registerEvents() {
    this._pushEvents(
      domSubscribe(this._selectElement, 'change', this.#selectChanged),
      charSheetObserver.subscribe('charSpeciesName', this._refreshValue),
    )
  }

  _refreshList = () => {
    console.info('-- SpeciesSelect.#refreshList')
    populateSelect(
      this._selectElement,
      getSpeciesList().map(species => (
        species.lineages ? {
          isGroup: true,
          label: t._(`statics.species.${species.name}.name`),
          options: species.lineages.map(lineage => ({
            value: `${species.name}.${lineage}`,
            text: t._(`statics.species.${species.name}-${lineage}.name`),
          })),
        } : {
          value: species.name, text: t._(`statics.species.${species.name}.name`),
        }
      )),
      {
        placeholder: t._('components.SpeciesSelect.chooseOne'),
      })
  }

  _refreshValue = () => {
    console.info('-- SpeciesSelect.#refreshValue')
    this._selectElement.value = charSheetStore.getCharSpeciesName() || ''
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- SpeciesSelect.#selectChanged', value)
    // TODO: alert skills lost
    charSheetStore.setCharSpeciesName(value)
  }
}

