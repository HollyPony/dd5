import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { EQUIPMENT_ATTRIBUTE, EQUIPMENT_TYPE, getEquipment } from '../../modules/data/equipments.js'
import { createElement, domOn, replaceElement } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'
import modalService from '../../modules/services/modal.service.js'
import { BackpackAddModalContent } from '../BackpackAddModalContent/BackpackAddModalContent.js'

export class Backpack extends AbstractComponent {
  static get tagName() { return 'backpack-block' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #listElement
  #openModalButtonElement

  _connectedCallback() {
    this.#listElement = this.querySelector('.backpack-list')
    this.#openModalButtonElement = this.querySelector('.backpack-open-add-modal')

    this.#renderList()
  }

  _registerEvents() {
    this._pushEvents(
      domOn(this.#openModalButtonElement, 'click', this.#openModal),
      domOn(this.#listElement, 'click', this.#listClicked),
      charSheetStore.on(charSheetProps.equipments, this.#renderList),
    )
  }

  _i18nChanged = () => {
    this.#renderList()
  }

  #renderList = () => {
    const equipments = charSheetStore.getEquipments() ?? []
    if (equipments.length === 0) {
      replaceElement(this.#listElement, [
        createElement('li', t._('components.Backpack.empty'), { class: 'list-group-item text-muted small' })
      ])
      return
    }

    replaceElement(this.#listElement, equipments.map(equipment => {
      const data = getEquipment(equipment.name)
      const description = this.#getEquipmentDescription(data)
      const isEquippable = [
        EQUIPMENT_TYPE.WEAPON,
        EQUIPMENT_TYPE.ARMOR,
        EQUIPMENT_TYPE.SHIELD,
        EQUIPMENT_TYPE.MAGIC_ITEM,
      ].includes(data?.type)
      const needsAttunement = data?.type === EQUIPMENT_TYPE.MAGIC_ITEM && data?.requireAttunement

      return createElement('li', [
        createElement('div', [
          createElement('div', t._(`statics.${equipment?.name?.description}.name`), { class: 'text-break flex-grow-1' }),
          equipment.equiped
            ? createElement('span', t._('components.Backpack.equipedBadge'), { class: 'badge text-bg-secondary' })
            : null,
          needsAttunement
            ? createElement('button', t._(equipment.hasAttunement
              ? 'components.Backpack.actions.attuned'
              : 'components.Backpack.actions.attune'
            ), {
              class: equipment.hasAttunement ? 'btn btn-sm btn-success flex-shrink-0' : 'btn btn-sm btn-outline-success flex-shrink-0',
              type: 'button',
              'data-action': equipment.hasAttunement ? 'unattune' : 'attune',
              'data-id': equipment.id,
            })
            : null,
          isEquippable
            ? createElement('button', t._(equipment.equiped
              ? 'components.Backpack.actions.unequip'
              : 'components.Backpack.actions.equip'
            ), {
              class: equipment.equiped ? 'btn btn-sm btn-outline-secondary flex-shrink-0' : 'btn btn-sm btn-outline-primary flex-shrink-0',
              type: 'button',
              'data-action': equipment.equiped ? 'unequip' : 'equip',
              'data-id': equipment.id,
            })
            : null,
          createElement('button', t._('components.Backpack.removeButton'), {
            class: 'btn btn-sm btn-outline-danger flex-shrink-0',
            type: 'button',
            'data-action': 'remove',
            'data-id': equipment.id,
          }),
        ].filter(Boolean), { class: 'd-flex w-100 align-items-center gap-2 py-1' }),
        description
          ? createElement('small', description, { class: 'text-body-secondary d-block' })
          : null,
      ].filter(Boolean), { class: 'list-group-item d-flex flex-column align-items-start gap-2 py-1' })
    }))
  }

  #openModal = () => {
    modalService.open({
      title: t._('components.Backpack.addModal.title'),
      contentComponent: BackpackAddModalContent,
      dialogClasses: ['modal-fullscreen'],
    })
  }

  #listClicked = ({ target }) => {
    const actionElement = target.closest('[data-action]')
    if (!actionElement) return
    const { action, id } = actionElement.dataset

    switch (action) {
      case 'remove':
        charSheetStore.removeEquipment(id)
        break
      case 'equip':
        charSheetStore.setEquipmentAttribute(id, EQUIPMENT_ATTRIBUTE.EQUIPED, true)
        break
      case 'unequip':
        charSheetStore.setEquipmentAttribute(id, EQUIPMENT_ATTRIBUTE.EQUIPED, false)
        break
      case 'attune':
        charSheetStore.setEquipmentAttribute(id, EQUIPMENT_ATTRIBUTE.HAS_ATTUNEMENT, true)
        break
      case 'unattune':
        charSheetStore.setEquipmentAttribute(id, EQUIPMENT_ATTRIBUTE.HAS_ATTUNEMENT, false)
        break
    }
  }

  #getEquipmentDescription(equipment) {
    const basePath = `statics.${equipment?.name?.description}`

    if (equipment?.type === EQUIPMENT_TYPE.TOOL)
      return t._(`${basePath}.usage`)
    return t._(`${basePath}.description`)
  }
}
