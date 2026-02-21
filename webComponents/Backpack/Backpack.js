import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { EQUIPMENT_ATTRIBUTE, EQUIPMENT_TYPE, getEquipment, getEquipments } from '../../modules/data/equipments.js'
import { createElement, domOn, replaceElement } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

export class Backpack extends AbstractComponent {
  static get tagName() { return 'backpack-block' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #listElement
  #resultsElement
  #searchElement
  #tabsElement
  #tabsCollapseElement
  #tabsToggleButtonElement
  #selectedTypeLabelElement
  #openModalButtonElement
  #modalElement
  #modal
  #selectedTypeKey = 'weapon'

  _connectedCallback() {
    this.#listElement = this.querySelector('.backpack-list')
    this.#resultsElement = this.querySelector('.backpack-add-results')
    this.#searchElement = this.querySelector('.backpack-search')
    this.#tabsElement = this.querySelector('.backpack-type-tabs')
    this.#tabsCollapseElement = this.querySelector('#navbarBackpackEquipmentAdd')
    this.#tabsToggleButtonElement = this.querySelector('[data-bs-target="#navbarBackpackEquipmentAdd"]')
    this.#selectedTypeLabelElement = this.querySelector('.backpack-selected-type-label')
    this.#openModalButtonElement = this.querySelector('.backpack-open-add-modal')
    this.#modalElement = this.querySelector('.backpack-add-modal')

    if (globalThis.bootstrap?.Modal) {
      this.#modal = new globalThis.bootstrap.Modal(this.#modalElement)
    }

    this.#renderList()
    this.#setActiveTab()
    this.#renderAddResults()
  }

  _registerEvents() {
    this._pushEvents(
      domOn(this.#openModalButtonElement, 'click', this.#openModal),
      domOn(this.#listElement, 'click', this.#listClicked),
      domOn(this.#tabsElement, 'click', this.#tabsClicked),
      domOn(this.#searchElement, 'input', this.#renderAddResults),
      domOn(this.#resultsElement, 'click', this.#resultsClicked),
      charSheetStore.on(charSheetProps.equipments, this.#renderBackpack),
    )
  }

  _i18nChanged = () => {
    this.#renderBackpack()
  }

  #renderBackpack = () => {
    this.#renderList()
    this.#setActiveTab()
    this.#renderAddResults()
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

  #renderAddResults = () => {
    const type = this.#getTypeFromKey(this.#selectedTypeKey)
    const searchTerm = this.#searchElement.value.toLowerCase().trim()
    const equipments = getEquipments({ type })
      .filter(equipment => {
        if (!searchTerm) return true
        const name = t._(`statics.${equipment?.name?.description}.name`).toLowerCase()
        return name.includes(searchTerm)
      })

    if (equipments.length === 0) {
      replaceElement(this.#resultsElement, [
        createElement('div', t._('components.Backpack.addModal.noResults'), {
          class: 'list-group-item text-muted'
        })
      ])
      return
    }

    replaceElement(this.#resultsElement, equipments.map(equipment => {
      const description = this.#getEquipmentDescription(equipment)
      return createElement('div', [
        createElement('div', [
          createElement('div', t._(`statics.${equipment?.name?.description}.name`), { class: 'text-break flex-grow-1' }),
          createElement('button', t._('components.Backpack.addModal.add'), {
            class: 'btn btn-sm btn-outline-primary flex-shrink-0',
            type: 'button',
            'data-action': 'add',
            'data-name': equipment.name.description,
          }),
        ], { class: 'd-flex align-items-center gap-2 w-100' }),
        description
          ? createElement('small', description, { class: 'text-body-secondary d-block' })
          : null,
      ], { class: 'list-group-item d-flex flex-column align-items-start justify-content-between gap-2' })
    }))
  }

  #openModal = () => {
    this.#searchElement.value = ''
    this.#selectedTypeKey = 'weapon'
    this.#setActiveTab()
    this.#renderAddResults()
    this.#modal?.show()
  }

  #tabsClicked = ({ target }) => {
    const tabButton = target.closest('[data-type-key]')
    if (!tabButton) return

    this.#selectedTypeKey = tabButton.dataset.typeKey
    this.#setActiveTab()
    this.#renderAddResults()

    const isMobileTogglerVisible = this.#tabsToggleButtonElement
      && getComputedStyle(this.#tabsToggleButtonElement).display !== 'none'

    if (isMobileTogglerVisible && globalThis.bootstrap?.Collapse && this.#tabsCollapseElement) {
      globalThis.bootstrap.Collapse
        .getOrCreateInstance(this.#tabsCollapseElement)
        .hide()
    }
  }

  #resultsClicked = ({ target }) => {
    const actionElement = target.closest('[data-action]')
    if (!actionElement || actionElement.dataset.action !== 'add') return

    charSheetStore.addEquipment(Symbol.for(actionElement.dataset.name))
    this.#modal?.hide()
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

  #getTypeFromKey(typeKey) {
    switch (typeKey) {
      case 'weapon': return EQUIPMENT_TYPE.WEAPON
      case 'armor': return EQUIPMENT_TYPE.ARMOR
      case 'shield': return EQUIPMENT_TYPE.SHIELD
      case 'tool': return EQUIPMENT_TYPE.TOOL
      case 'gear': return EQUIPMENT_TYPE.GEAR
      case 'magicItem': return EQUIPMENT_TYPE.MAGIC_ITEM
      default: return EQUIPMENT_TYPE.WEAPON
    }
  }

  #setActiveTab() {
    const labelKey = `components.Backpack.types.${this.#selectedTypeKey}`
    if (this.#selectedTypeLabelElement) {
      this.#selectedTypeLabelElement.textContent = t._(labelKey)
    }

    this.#tabsElement?.querySelectorAll('[data-type-key]').forEach(button => {
      button.classList.toggle('active', button.dataset.typeKey === this.#selectedTypeKey)
    })
  }

  #getEquipmentDescription(equipment) {
    const basePath = `statics.${equipment?.name?.description}`

    if (equipment?.type === EQUIPMENT_TYPE.TOOL)
      return t._(`${basePath}.usage`)
    return t._(`${basePath}.description`)
  }
}
