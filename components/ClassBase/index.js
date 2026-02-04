import { AbstractComponent } from '../AbstractComponent/index.js'
import charSheet from '../../modules/stores/charSheet.store.js'
import { t, i18n } from '../../modules/i18n.js'
import { createElement, fillElement } from '../../modules/domlib.js'

export class ClassBase extends AbstractComponent {
  static get tagName() { return 'class-base' }
  static get _componentPath() { return '/components/ClassBase' }

  #subscriptions = []

  #baseFeatureButtonElement
  #skillsActionRequiredElement
  #skillsChooseLabel
  #skillsList

  async connectedCallback() {
    await super.connectedCallback()
    console.info('-- ClassBase.connectedCallback')

    const baseFeatureElement = this.querySelector('.class-feature-base')
    this.#baseFeatureButtonElement = baseFeatureElement.querySelector('.accordion-button')
    const baseFeatureAccordionElement = baseFeatureElement.querySelector('.accordion-collapse')
    const accordionBodyElement = baseFeatureAccordionElement.querySelector('.accordion-body')

    const baseAccordionId = `accordion-base-feature-${this._id}`
    const baseAccordionItemId = `base-item-${this._id}`

    baseFeatureElement.id = baseAccordionId
    this.#baseFeatureButtonElement.dataset.bsTarget = `#${baseAccordionItemId}`
    baseFeatureAccordionElement.id = baseAccordionItemId
    baseFeatureAccordionElement.dataset.bsParent = `#${baseAccordionId}`

    const skillContainer = accordionBodyElement.querySelector('.card.skills')
    this.#skillsActionRequiredElement = skillContainer.querySelector('.card-header > .action-required')
    this.#skillsChooseLabel = skillContainer.querySelector('.card-body > .card-title.choose')
    this.#skillsList = skillContainer.querySelector('.card-body > .list')

    this.#refreshActionsRequired()
    this.#refreshSkillsChooseLabel()
    this.#refreshSkillsList()

    i18n.applyTranslations(this)
    this.#registerEvents()
  }

  disconnectedCallback() {
    this.#unregisterEvents()
  }

  #registerEvents() {
    this.#subscriptions.push(
      charSheet.subscribe('classSkills', this.#skillsChanged),
      i18n.subscribe(this.#i18nChanged),
    )

  }

  #unregisterEvents() {
    this.#subscriptions.forEach(subscriber => subscriber())
  }

  #refreshActionsRequired() {
    console.info('-- ClassBase.refreshActionsRequired')
    const actionsRequired = {
      skills: (charSheet.getCharClass()?.skills.nb - charSheet.getClassSkills().length) > 0
    }

    this.#skillsActionRequiredElement.classList[actionsRequired.skills ? 'add' : 'remove']('show')
    this.hasActionRequired = Object.values(actionsRequired).some(i => i)
    this.#baseFeatureButtonElement.classList[this.hasActionRequired ? 'add' : 'remove']('show')

    this.dispatchEvent(new CustomEvent('action-required-changed', {
      bubbles: true,
    }))
  }

  #refreshSkillsChooseLabel() {
    console.info('-- ClassBase.refreshSkillsChooseLabel')
    fillElement(this.#skillsChooseLabel, t.tn('components.ClassBase.skills.remaining', {
      remaining: charSheet.getCharClass()?.skills.nb - charSheet.getClassSkills().length
    }))
  }

  #refreshSkillsList() {
    console.info('-- ClassBase.refreshSkillsList')
    fillElement(this.#skillsList, charSheet.getCharClass()?.skills.list.map(skill => createElement('div', [
      createElement('input', null, {
        type: 'checkbox', class: 'btn-check', id: `${skill.name}.${this._id}`,
        checked: charSheet.getClassSkills().includes(skill),
        disabled: charSheet.isDisabledSkill(skill),
        eventListeners: {
          change: ({ target: { checked } }) => charSheet[checked ? 'classSkillsAdd' : 'classSkillsRemove'](skill)
        }
      }),
      createElement('label', t._(`statics.${skill.name}`), { class: 'btn btn-outline-primary', for: `${skill.name}.${this._id}` }),
    ])))
  }

  #skillsChanged = () => {
    console.info('-- ClassBase.skillsChanged')
    this.#refreshActionsRequired()
    this.#refreshSkillsChooseLabel()
    this.#refreshSkillsList()
  }

  #i18nChanged = () => {
    console.info('-- ClassBase.i18nChanged')
    i18n.applyTranslations(this)
    this.#refreshSkillsChooseLabel()
    this.#refreshSkillsList()
  }
}
