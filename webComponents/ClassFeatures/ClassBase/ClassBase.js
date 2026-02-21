import { AbstractComponent } from '../../AbstractComponent/AbstractComponent.js'
import charSheetStore from '../../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../../modules/stores/charSheet.derived.properties.js'
import { createElement, replaceElement } from '../../../modules/domlib.js'
import { INSERTION_TYPE } from '../../../modules/data/classes.js'
import createEventBus from '../../../modules/createEventBus.js'
import { t } from '../../../modules/i18n.js'
import { createClassBaseService } from './ClassBase.service.js'

export class ClassBase extends AbstractComponent {
  static get tagName() { return 'class-base' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #baseFeatureButtonElement

  #descriptionContainerElement
  #descriptionBodyElement
  #skillsContainerElement
  #skillsActionRequiredElement
  #skillsChooseLabelElement
  #skillsListElement
  #toolsContainerElement
  #toolsActionRequiredElement
  #toolsGroupsElement

  #service

  _actionRequired = false
  eventBus = createEventBus()

  _connectedCallback() {
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

    this.#descriptionContainerElement = accordionBodyElement.querySelector('.card.description')
    this.#descriptionBodyElement = this.#descriptionContainerElement.querySelector('.card-body')

    this.#skillsContainerElement = accordionBodyElement.querySelector('.card.skills')
    this.#skillsActionRequiredElement = this.#skillsContainerElement.querySelector('.card-header > .action-required')
    this.#skillsChooseLabelElement = this.#skillsContainerElement.querySelector('.card-body > .card-title.choose')
    this.#skillsListElement = this.#skillsContainerElement.querySelector('.card-body > .list')

    this.#toolsContainerElement = baseFeatureAccordionElement.querySelector('.card.tools')
    this.#toolsActionRequiredElement = this.#toolsContainerElement.querySelector('.card-header > .action-required')
    this.#toolsGroupsElement = this.#toolsContainerElement.querySelector('.card-body > .tools-groups')

    this.#service = createClassBaseService({ charSheetStore })

    this.#renderActionsRequired()
    this.#renderDescription()
    this.#renderSkills()
    this.#renderTools()
  }

  _registerEvents() {
    this._pushEvents(
      charSheetStore.onMap({
        [charSheetProps.className]: [this.#renderDescription, this.#renderActionsRequired, this.#renderSkills, this.#renderTools],
        // TODO: listen skills here. Project to have skills with source and filter on it
        [charSheetProps.originName]: [this.#renderActionsRequired, this.#renderSkills],
        [charSheetProps.choiceSelections]: [this.#renderActionsRequired, this.#renderSkills, this.#renderTools],
      }),
    )
  }

  #renderActionsRequired = () => {
    console.info('-- ClassBase.#renderActionsRequired')

    const actionsRequired = this.#service.getActionsRequiredState()



    this._actionRequired = Object.values(actionsRequired).some(Boolean)

    this.#skillsActionRequiredElement.classList[actionsRequired.skills ? 'add' : 'remove']('show')
    this.#toolsActionRequiredElement.classList[actionsRequired.tools ? 'add' : 'remove']('show')
    this.#baseFeatureButtonElement.classList[this._actionRequired ? 'add' : 'remove']('show')

    this.eventBus.emit('actionRequired')
  }

  #renderDescription = () => {
    console.info('-- ClassBase.#renderDescription')
    const className = charSheetStore.getClassName()
    replaceElement(this.#descriptionBodyElement, className ? t.md(`statics.classes.${className}.description`) : 'TODO')
  }

  #renderSkills = () => {
    console.info('-- ClassBase.#renderSkills')
    const viewModel = this.#service.getSkillsViewModel()
    if (!viewModel.isConcerned) {
      replaceElement(this.#skillsChooseLabelElement, t.tn('components.ClassBase.skills.notConcerned',))
      this.#skillsContainerElement.classList.add('d-none')
      return
    }

    replaceElement(this.#skillsChooseLabelElement, t.tn('components.ClassBase.skills.remaining', { remaining: viewModel.remaining }))
    this.#skillsContainerElement.classList.remove('d-none')

    replaceElement(this.#skillsListElement, viewModel.options.map(({ skill, checked, disabled }) => {
      const skillId = `${skill.description}.${this._id}`
      return createElement('div', [
        createElement('input', null, {
          type: 'checkbox', class: 'btn-check', id: skillId,
          checked,
          disabled,
          eventListeners: [{
            event: 'change', callback: ({ target: { checked } }) => {
              this.#service.toggleSkill({ skill, checked })
            }
          }],
        }),
        createElement('label', t._(`statics.${skill.description}`), { class: 'btn btn-outline-primary', for: skillId }),
      ])
    }))
  }

  #renderTools = () => {
    console.info('-- ClassBase.#renderTools')

    const vm = this.#service.getToolsViewModel()
    if (!vm.visible) {
      this.#toolsContainerElement.classList.add('d-none')
      return
    }
    this.#toolsContainerElement.classList.remove('d-none')

    switch (vm.type) {
      case INSERTION_TYPE.select: {
        replaceElement(this.#toolsGroupsElement, vm.groups.map(({ category, remaining, options }) => {
          return createElement('div', [
            createElement('div', t.tn('components.ClassBase.tools.remainingGroup', {
              remaining,
              from: t._(`statics.${category.description}`)
            }), { class: 'card-title' }),
            createElement('div', options.map(({ toolName, checked, disabled, groupIndex }) => {
              const toolId = `${toolName.description}.${this._id}.tools.${groupIndex}`
              return createElement('div', [
                createElement('input', null, {
                  type: 'checkbox',
                  class: 'btn-check',
                  id: toolId,
                  checked,
                  disabled,
                  eventListeners: [{
                    event: 'change', callback: ({ target: { checked } }) => {
                      this.#service.toggleTool({ toolName, checked })
                    }
                  }]
                }),
                createElement(
                  'label',
                  t._(`statics.${toolName.description}.name`),
                  { class: 'btn btn-outline-primary', for: toolId }
                ),
              ])
            }), { class: 'd-flex flex-wrap gap-3' }),
          ])
        }))
        this.#toolsGroupsElement.classList.remove('d-none')
        break
      }
      case INSERTION_TYPE.forced: {
        replaceElement(this.#toolsGroupsElement, createElement('div', [
          createElement(
            'div',
            t.tn('components.ClassBase.tools.forced'),
            { class: 'card-title' }
          ),
          createElement('div', vm.forcedTools.map(tool => {
            const toolId = `${tool.description}.${this._id}.tools`
            return createElement('div', [
              createElement('input', null, {
                type: 'checkbox',
                class: 'btn-check',
                id: toolId,
                checked: true,
                disabled: true,
              }),
              createElement(
                'label',
                t._(`statics.${tool.description}.name`),
                { class: 'btn btn-outline-primary', for: toolId }
              ),
            ])
          }), { class: 'd-flex flex-wrap gap-3' })
        ]))
        this.#toolsGroupsElement.classList.remove('d-none')
        break
      }
      default:
        replaceElement(this.#toolsGroupsElement, null)
        this.#toolsGroupsElement.classList.add('d-none')
        break
    }
  }

  _i18nChanged = () => {
    console.info('-- ClassBase._i18nChanged')
    this.#renderDescription()
    this.#renderSkills()
    this.#renderTools()
  }
}
