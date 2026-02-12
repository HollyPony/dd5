import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import charSheetStore, { properties as charSheetProps } from '../../modules/stores/charSheet.derived.store.js'
import { createElement, replaceElement } from '../../modules/domlib.js'
import { spells } from '../../modules/data/spells.js'
import { t } from '../../modules/i18n.js'

const spellNameByRef = new Map(Object.entries(spells).map(([name, spell]) => [spell, name]))

export class SpeciesTraits extends AbstractComponent {
  static get tagName() { return 'species-traits' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #traitsListElement
  #descriptionElement

  _connectedCallback() {
    this.#traitsListElement = this.querySelector('.species-traits-list')
    this.#descriptionElement = this.querySelector('.species-description')
    this.#traitsListElement.id = `species-traits-${this._id}`
    this.#renderTraits()
  }

  _registerEvents() {
    this._pushEvents(
      charSheetStore.on(charSheetProps.charSpecies, this.#renderTraits),
    )
  }

  _i18nChanged = () => {
    this.#renderTraits()
  }

  #renderTraits = () => {
    const species = charSheetStore.getCharSpecies()
    const speciesName = charSheetStore.getCharSpeciesName()
    if (!species) {
      replaceElement(this.#descriptionElement, [
        createElement('div', t._('components.SpeciesTraits.empty'), { class: 'text-muted px-2 py-2' }),
      ])
      replaceElement(this.#traitsListElement, [])
      return
    }

    replaceElement(this.#descriptionElement, this.#buildSpeciesDescription(speciesName))

    const traitsItems = (species.traits || []).map((trait, index) => {
      const traitName = t._(`statics.traits.${trait.name}.name`)
      const traitDescription = t._(`statics.traits.${trait.name}.description`)
      const extras = []
      if (trait.atLevel) extras.push(t._('components.SpeciesTraits.meta.level', { level: trait.atLevel }))
      if (trait.distance) extras.push(t._('components.SpeciesTraits.meta.range', { range: `${trait.distance} m` }))
      if (trait.name === 'draconicAncestry' || trait.name === 'breathWeapon' || trait.name === 'damageResistance') {
        if (species.type) extras.push(t._('components.SpeciesTraits.meta.type', { type: species.type }))
      }

      const descriptionParts = []
      if (traitDescription && !traitDescription.startsWith('statics.traits.')) {
        descriptionParts.push(t.md(`statics.traits.${trait.name}.description`))
      } else {
        descriptionParts.push(document.createTextNode(t._('components.SpeciesTraits.noDescription')))
      }
      if (extras.length > 0) {
        descriptionParts.push(createElement('div', extras.join(' - '), { class: 'text-muted small mt-2' }))
      }

      return this.#createAccordionItem(`trait-${index}`, traitName, descriptionParts)
    })

    const spellItems = (species.spells || []).map(({ spell, atLevel }, index) => {
      const spellKey = spellNameByRef.get(spell)
      const spellName = spellKey ? t._(`statics.spells.${spellKey}.name`) : ''
      if (!spellName) return null
      const level = atLevel || 1
      const description = t._('components.SpeciesTraits.spellLevel', { level })
      return this.#createAccordionItem(`spell-${index}`, spellName, [document.createTextNode(description)])
    }).filter(Boolean)

    const resistanceItems = (species.resistances || []).map((resistance, index) => (
      this.#createAccordionItem(
        `resistance-${index}`,
        t._('components.SpeciesTraits.resistanceTitle'),
        [document.createTextNode(t._('components.SpeciesTraits.meta.type', { type: resistance }))],
      )
    ))

    replaceElement(this.#traitsListElement, [
      ...traitsItems,
      ...spellItems,
      ...resistanceItems,
    ])
  }

  #buildSpeciesDescription(speciesName) {
    if (!speciesName) return []
    const [baseKey, lineageKey] = speciesName.split('.')
    const elements = []

    elements.push(this.#createDescriptionBlock(`statics.species.${baseKey}`))

    if (lineageKey) {
      elements.push(this.#createDescriptionBlock(`statics.species.${baseKey}-${lineageKey}`))
    }

    return elements.filter(Boolean)
  }

  #createDescriptionBlock(path) {
    const name = t._(`${path}.name`)
    const description = t._(`${path}.description`)
    if (!name || name.startsWith('statics.species.')) return null
    const content = []
    content.push(createElement('div', name, { class: 'fw-semibold' }))
    if (description && !description.startsWith('statics.species.')) {
      content.push(t.md(`${path}.description`))
    }
    return createElement('div', content, { class: 'mb-3' })
  }

  #createAccordionItem(idSuffix, title, description) {
    const itemId = `${this._id}-${idSuffix}`
    const bodyId = `${itemId}-body`
    return createElement('div', [
      createElement('h2', [
        createElement('button', title, {
          class: 'accordion-button collapsed',
          type: 'button',
          'data-bs-toggle': 'collapse',
          'data-bs-target': `#${bodyId}`,
          'aria-expanded': 'false',
          'aria-controls': bodyId,
        }),
      ], { class: 'accordion-header', id: itemId }),
      createElement('div', [
        createElement('div', description || '', { class: 'accordion-body' }),
      ], {
        id: bodyId,
        class: 'accordion-collapse collapse',
        'aria-labelledby': itemId,
        'data-bs-parent': `#${this.#traitsListElement.id}`,
      }),
    ], { class: 'accordion-item' })
  }
}
