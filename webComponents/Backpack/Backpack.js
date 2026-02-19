import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { EQUIPMENT_TYPE, getEquipments } from '../../modules/data/equipments.js'
import { createElement, domSubscribe, populateSelect, replaceElement } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class Backpack extends AbstractComponent {
  static get tagName() { return 'backpack-block' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #listElement
  #selectElement
  #openModalButtonElement
  #confirmAddButtonElement
  #modalElement
  #modal

  _connectedCallback() {
    this.#listElement = this.querySelector('.backpack-list')
    this.#selectElement = this.querySelector('.backpack-equipment-select')
    this.#openModalButtonElement = this.querySelector('.backpack-open-add-modal')
    this.#confirmAddButtonElement = this.querySelector('.backpack-add-confirm')
    this.#modalElement = this.querySelector('.backpack-add-modal')

    if (globalThis.bootstrap?.Modal) {
      this.#modal = new globalThis.bootstrap.Modal(this.#modalElement)
    }

    this.#renderList()
    this.#renderModalSelect()
  }

  _registerEvents() {
    this._pushEvents(
      domSubscribe(this.#openModalButtonElement, 'click', () => this.#modal?.show()),
      domSubscribe(this.#confirmAddButtonElement, 'click', this.#confirmAddEquipment),
      domSubscribe(this.#listElement, 'click', this.#listClicked),
      charSheetStore.on(charSheetProps.equipments, this.#renderBackpack),
    )
  }

  _i18nChanged = () => {
    this.#renderBackpack()
  }

  #renderBackpack = () => {
    this.#renderList()
    this.#renderModalSelect()
  }

  #renderList = () => {
    const equipments = charSheetStore.getEquipments() ?? []
    if (equipments.length === 0) {
      replaceElement(this.#listElement, [
        createElement('li', t._('components.Backpack.empty'), { class: 'list-group-item text-muted small' })
      ])
      return
    }

    replaceElement(this.#listElement, equipments.map(equipment =>
      createElement('li', [
        createElement('span', t._(`statics.${equipment?.name?.description}.name`), { class: 'flex-grow-1 text-break' }),
        equipment.equiped
          ? createElement('span', t._('components.Backpack.equipedBadge'), { class: 'badge text-bg-secondary' })
          : null,
        createElement('button', t._('components.Backpack.removeButton'), {
          class: 'btn btn-sm btn-outline-danger',
          type: 'button',
          'data-action': 'remove',
          'data-id': equipment.id,
        })
      ], { class: 'list-group-item d-flex align-items-center gap-2 py-1' })
    ))
  }

  #renderModalSelect = () => {
    const grouped = Object.values(EQUIPMENT_TYPE)
      .map(type => ({ type, equipments: getEquipments({ type }) }))
      .filter(({ equipments }) => equipments.length > 0)

    populateSelect(
      this.#selectElement,
      grouped.map(({ type, equipments }) => ({
        label: t._(`components.Backpack.types.${this.#getEquipmentTypeLabelKey(type)}`),
        options: equipments.map(equipment => ({
          value: equipment.name.description,
          text: t._(`statics.${equipment?.name?.description}.name`),
        })),
      })),
      { placeholder: t._('components.Backpack.addModal.selectPlaceholder') }
    )
  }

  #confirmAddEquipment = () => {
    const selectedName = this.#selectElement.value
    if (!selectedName) return

    charSheetStore.addEquipment(Symbol.for(selectedName))
    this.#modal?.hide()
  }

  #listClicked = ({ target }) => {
    const actionElement = target.closest('[data-action]')
    if (!actionElement) return
    if (actionElement.dataset.action !== 'remove') return

    charSheetStore.removeEquipment(actionElement.dataset.id)
  }

  #getEquipmentTypeLabelKey(type) {
    switch (type) {
      case EQUIPMENT_TYPE.WEAPON: return 'weapon'
      case EQUIPMENT_TYPE.ARMOR: return 'armor'
      case EQUIPMENT_TYPE.SHIELD: return 'shield'
      case EQUIPMENT_TYPE.TOOL: return 'tool'
      case EQUIPMENT_TYPE.GEAR: return 'gear'
      case EQUIPMENT_TYPE.MAGIC_ITEM: return 'magicItem'
      default: return 'other'
    }
  }
}
