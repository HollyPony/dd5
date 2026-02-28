import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import { EQUIPMENT_TYPE, getEquipments } from '../../modules/data/equipments.js'
import { createElement, domOn, replaceElement } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'

export class BackpackAddModalContent extends AbstractComponent {
  static get tagName() { return 'backpack-add-modal-content' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #resultsElement
  #searchElement
  #tabsElement
  #tabsCollapseElement
  #tabsToggleButtonElement
  #selectedTypeLabelElement
  #selectedTypeKey = 'weapon'

  _connectedCallback() {
    this.#resultsElement = this.querySelector('.backpack-add-results')
    this.#searchElement = this.querySelector('.backpack-search')
    this.#tabsElement = this.querySelector('.backpack-type-tabs')
    this.#tabsCollapseElement = this.querySelector('#navbarBackpackEquipmentAdd')
    this.#tabsToggleButtonElement = this.querySelector('[data-bs-target="#navbarBackpackEquipmentAdd"]')
    this.#selectedTypeLabelElement = this.querySelector('.backpack-selected-type-label')

    this.#searchElement.value = ''
    this.#selectedTypeKey = 'weapon'
    this.#setActiveTab()
    this.#renderAddResults()
  }

  _registerEvents() {
    this._pushEvents(
      domOn(this.#tabsElement, 'click', this.#tabsClicked),
      domOn(this.#searchElement, 'input', this.#renderAddResults),
      domOn(this.#resultsElement, 'click', this.#resultsClicked),
    )
  }

  _i18nChanged = () => {
    this.#setActiveTab()
    this.#renderAddResults()
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
    this.closest('modal-host').closeModal()
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
    this.#selectedTypeLabelElement.textContent = t._(labelKey)

    this.#tabsElement.querySelectorAll('[data-type-key]').forEach(button => {
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

