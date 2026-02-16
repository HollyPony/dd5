import { AbstractSelect } from '../AbstractSelect/AbstractSelect.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { getList as getClassesList } from '../../modules/data/classes.js'
import { domSubscribe, populateSelect } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class ClassSelect extends AbstractSelect {
  static get tagName() { return 'class-select' }

  _registerEvents() {
    this._pushEvents(
      domSubscribe(this._selectElement, 'change', this.#selectChanged),
      charSheetStore.on(charSheetProps.className, this._renderValue),
    )
  }

  _renderList = () => {
    console.info('-- ClassSelect.#renderList')
    populateSelect(
      this._selectElement,
      getClassesList().map(className => ({ value: className, text: t._(`statics.classes.${className}.name`), })),
      {
        placeholder: t._('components.ClassSelect.chooseOne'),
      },
    )
  }

  _renderValue = () => {
    console.info('-- ClassSelect.#renderValue')
    this._selectElement.value = charSheetStore.getClassName() || ''
  }

  #selectChanged = ({ target: { value } }) => {
    console.info('-- ClassSelect.#selectChanged', value)
    charSheetStore.setClassName(value)
  }
}
