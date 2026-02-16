import { AbstractComponent } from '../../AbstractComponent/AbstractComponent.js'
import charSheetStore from '../../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../../modules/stores/charSheet.derived.properties.js'
import { createElement, replaceElement } from '../../../modules/domlib.js'
import { INSERTION_TYPE } from '../../../modules/data/classes.js'
import createEventBus from '../../../modules/createEventBus.js'
import { EQUIPMENT_TYPE, getEquipments } from '../../../modules/data/equipments.js'
import { t } from '../../../modules/i18n.js'

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

  _actionRequired = false
  _eventBus = createEventBus()

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

    this.#renderActionsRequired()
    this.#renderDescription()
    this.#renderSkills()
    this.#renderTools()
  }

  _registerEvents() {
    this._pushEvents(
      charSheetStore.onMap({
        [charSheetProps.charClassName]: [this.#renderDescription, this.#renderActionsRequired, this.#renderSkills, this.#renderTools],
        // TODO: listen skills here. Project to have skills with source and filter on it
        [charSheetProps.charOriginName]: [this.#renderActionsRequired, this.#renderSkills],
        [charSheetProps.choiceSelections]: [this.#renderActionsRequired, this.#renderSkills, this.#renderTools],
      }),
    )
  }

  #renderActionsRequired = () => {
    console.info('-- ClassBase.#renderActionsRequired')

    const skillsRule = charSheetStore.getCharClass()?.skills
    const toolRule = charSheetStore.getCharClass()?.toolProficiencies

    const actionsRequired = {
      skills: skillsRule && (skillsRule?.nb - (charSheetStore?.getChoicePayload(skillsRule?.choice?.selector)?.length ?? 0) > 0),
      tools: toolRule && (toolRule?.max - (charSheetStore?.getChoicePayload(toolRule?.choice?.selector)?.length ?? 0) > 0),
    }

    this._actionRequired = Object.values(actionsRequired).some(i => i) ?? false

    this.#skillsActionRequiredElement.classList[actionsRequired.skills ? 'add' : 'remove']('show')
    this.#toolsActionRequiredElement.classList[actionsRequired.tools ? 'add' : 'remove']('show')
    this.#baseFeatureButtonElement.classList[this._actionRequired ? 'add' : 'remove']('show')

    this._eventBus.emit('actionRequired')
  }

  #renderDescription = () => {
    console.info('-- ClassBase.#renderDescription')
    replaceElement(this.#descriptionBodyElement, t.md(`statics.classes.${charSheetStore.getCharClassName()}.description`))
  }

  #renderSkills = () => {
    console.info('-- ClassBase.#renderSkills')
    const classSkills = charSheetStore.getCharClass()?.skills

    if (!classSkills) {
      replaceElement(this.#skillsChooseLabelElement, t.tn('components.ClassBase.skills.notConcerned',))
      this.#skillsContainerElement.classList.add('d-none')
      return
    }

    const choice = classSkills?.choice ?? null
    const choiceSelector = choice?.selector ?? null
    const choicePayload = charSheetStore?.getChoicePayload(choiceSelector) ?? []
    const remaining = classSkills.nb - choicePayload.length

    replaceElement(this.#skillsChooseLabelElement, t.tn('components.ClassBase.skills.remaining', { remaining }))
    this.#skillsContainerElement.classList.remove('d-none')

    const skills = charSheetStore.getSkills()

    function isSkillDisabled(skill) {
      const isSelected = choicePayload.includes(skill)
      const isMaxReached = choicePayload.length >= (classSkills?.nb ?? 0)
      return (!classSkills?.list?.includes(skill) && skills[skill].checked) || (!isSelected && isMaxReached)
    }

    replaceElement(this.#skillsListElement, classSkills.list.map(skill => {
      const skillId = `${skill.description}.${this._id}`
      return createElement('div', [
        createElement('input', null, {
          type: 'checkbox', class: 'btn-check', id: skillId,
          checked: choicePayload.includes(skill),
          disabled: isSkillDisabled(skill),
          eventListeners: {
            change: ({ target: { checked } }) => {
              const choiceSet = new Set(choicePayload)
              choiceSet[checked ? 'add' : 'delete'](skill)
              charSheetStore.setPayloadToSelection(choice, Array.from(choiceSet))
            }
          },
        }),
        createElement('label', t._(`statics.${skill.description}`), { class: 'btn btn-outline-primary', for: skillId }),
      ])
    }))
  }

  #renderTools = () => {
    console.info('-- ClassBase.#renderTools')

    const toolRule = charSheetStore.getCharClass()?.toolProficiencies
    if (!toolRule?.type)
      return this.#toolsContainerElement.classList.add('d-none')
    this.#toolsContainerElement.classList.remove('d-none')

    switch (toolRule.type) {
      case INSERTION_TYPE.select: {
        const choice = charSheetStore.getCharClass()?.toolProficiencies?.choice ?? null
        const choicePayload = charSheetStore.getChoicePayload(choice.selector) ?? []
        replaceElement(this.#toolsGroupsElement, [toolRule.from].flat().map((group, groupIndex) => {
          const tools = getEquipments({ type: EQUIPMENT_TYPE.TOOL })
            .filter(tool => group === tool.category)

          const groupRemaining = Math.max(0, toolRule.max - choicePayload?.length)

          return createElement('div', [
            createElement('div', t.tn('components.ClassBase.tools.remainingGroup', {
              remaining: groupRemaining, from: t._(`statics.${group.description}`)
            }), { class: 'card-title' }),
            createElement('div', tools.map(tool => {
              const toolId = `${tool.name.description}.${this._id}.tools.${groupIndex}`
              const isChecked = choicePayload?.includes(tool.name) ?? false
              const isCheckedElseWhere = false // TODO: + disable if checked from elsewhere eg. feats / origin ??
              return createElement('div', [
                createElement('input', null, {
                  type: 'checkbox',
                  class: 'btn-check',
                  id: toolId,
                  checked: isChecked,
                  disabled: isCheckedElseWhere || (!isChecked && groupRemaining === 0),
                  eventListeners: {
                    change: ({ target: { checked } }) => {
                      const choiceSet = new Set(choicePayload)
                      choiceSet[checked ? 'add' : 'delete'](tool.name)
                      charSheetStore.setPayloadToSelection(choice, Array.from(choiceSet))
                    }
                  }
                }),
                createElement(
                  'label',
                  t._(`statics.${tool.name.description}.name`),
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
          createElement('div', toolRule.tools.map(tool => {
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
