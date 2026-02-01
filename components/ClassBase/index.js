import { AbstractComponent } from '../AbstractComponent/index.js'
import { i18n } from '../../modules/i18n.js'
import { createElement, fillElement } from '../../modules/domlib.js'

export class ClassBase extends AbstractComponent {
  static get tagName() { return 'class-base' }
  static get _componentPath() { return '/components/ClassBase' }

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
    // this.#scoreElement.addEventListener('change', this.#scoreChanged)

    // document.addEventListener("userData.charLevelChanged", this.#refreshScore)

    document.addEventListener('userData.skillChoosedChanged', this.#skillChoosedChanged)
  }

  #unregisterEvents() {
    // this.#scoreElement.removeEventListener('change', this.#scoreChanged)

    // document.removeEventListener("userData.charLevelChanged", this.#refreshScore)
  }

  #refreshActionsRequired() {
    const actionsRequired = {
      skills: (ClassBase.charsheet.charClass.authorizedNumberSkills - ClassBase.charsheet.skillChoosed.length) > 0
    }

    this.#skillsActionRequiredElement.classList[actionsRequired.skills ? 'add' : 'remove']('show')
    this.hasActionRequired = Object.values(actionsRequired).some(i => i)
    this.#baseFeatureButtonElement.classList[this.hasActionRequired ? 'add' : 'remove']('show')

    this.dispatchEvent(new CustomEvent('action-required-changed', {
      bubbles: true,
    }))
  }

  #refreshSkillsChooseLabel() {
    fillElement(this.#skillsChooseLabel, i18n.tn('components.ClassBase.skills.remaining', {
      remaining: ClassBase.charsheet.charClass.authorizedNumberSkills - ClassBase.charsheet.skillChoosed.length
    }))
  }

  #refreshSkillsList() {
    fillElement(this.#skillsList, ClassBase.charsheet.charClass.skillProficiencies.map(skill => createElement(null, [
      createElement('input', null, {
        type: 'checkbox', class: 'btn-check', id: `${skill.name}.${this._id}`,
        checked: ClassBase.charsheet.skillChoosed.includes(skill),
        disabled: ClassBase.charsheet.isDisabledSkill(skill),
        eventListeners: {
          change: ({ target: { checked } }) => ClassBase.charsheet[checked ? 'skillChoosedAdd' : 'skillChoosedRemove'](skill)
        }
      }),
      createElement('label', i18n._(`statics.${skill.name}`), { class: 'btn btn-outline-primary', for: `${skill.name}.${this._id}` }),
    ])))
  }

  #skillChoosedChanged = () => {
    this.#refreshActionsRequired()
    this.#refreshSkillsChooseLabel()
    this.#refreshSkillsList()
  }
}
