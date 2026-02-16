import { AbstractSelect } from '../AbstractSelect/AbstractSelect.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { getList as getSpeciesList } from '../../modules/data/species.js'
import { domSubscribe, populateSelect } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class SpeciesSelect extends AbstractSelect {
  static get tagName() { return 'species-select' }

  _registerEvents() {
    this._pushEvents(
      domSubscribe(this._selectElement, 'change', this.#selectChanged),
      charSheetStore.on(charSheetProps.speciesName, this._renderValue),
    )
  }

  _renderList = () => {
    console.info('-- SpeciesSelect.#renderList')
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

  _renderValue = () => {
    console.info('-- SpeciesSelect.#renderValue')
    this._selectElement.value = charSheetStore.getSpeciesName() || ''
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- SpeciesSelect.#selectChanged', value)
    // TODO: alert skills lost
    charSheetStore.setSpeciesName(value)
  }
}
