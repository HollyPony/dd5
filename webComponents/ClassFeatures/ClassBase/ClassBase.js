import { AbstractComponent } from '../../AbstractComponent/AbstractComponent.js'
import charSheetStore, { properties as charSheetProps } from '../../../modules/stores/charSheet.derived.store.js'
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
        [charSheetProps.charClassName]: [this.#renderDescription],
        [charSheetProps.classSkills]: [this.#renderActionsRequired, this.#renderSkills],
        [charSheetProps.classTools]: [this.#renderActionsRequired, this.#renderTools],
      }),
    )
  }

  #renderActionsRequired = () => {
    console.info('-- ClassBase.#renderActionsRequired')

    const toolsMetaMaxTotal = charSheetStore.getCharClass()?.toolProficiencies
      ?.find(rule => rule.type === INSERTION_TYPE._meta && rule.totalMax)?.totalMax
    const toolsMaxTotal = toolsMetaMaxTotal
      || charSheetStore.getCharClass()?.toolProficiencies
        ?.filter(rule => rule.type === INSERTION_TYPE.select)
        .reduce((acc, rule) => acc + rule.max, 0)
      || 0

    const actionsRequired = {
      skills: (charSheetStore.getCharClass()?.skills.nb - charSheetStore.getClassSkills().length) > 0,
      tools: toolsMaxTotal - charSheetStore.getClassTools().length > 0,
    }

    this.#skillsActionRequiredElement.classList[actionsRequired.skills ? 'add' : 'remove']('show')
    this.#toolsActionRequiredElement.classList[actionsRequired.tools ? 'add' : 'remove']('show')
    const hasActionRequired = Object.values(actionsRequired).some(i => i)
    this.#baseFeatureButtonElement.classList[hasActionRequired ? 'add' : 'remove']('show')

    this._actionRequired = hasActionRequired ?? false
    this._eventBus.emit('actionRequired')
  }

  #renderDescription = () => {
    console.info('-- ClassBase.#renderDescription')
    replaceElement(this.#descriptionBodyElement, t.md(`statics.classes.${charSheetStore.getCharClassName()}.description`))
  }

  #renderSkills = () => {
    console.info('-- ClassBase.#renderSkills')

    if (!charSheetStore.getCharClass()?.skills)
      return this.#skillsContainerElement.classList.add('d-none')
    this.#skillsContainerElement.classList.remove('d-none')

    this.#renderSkillsChooseLabel()

    replaceElement(this.#skillsListElement, charSheetStore.getCharClass()?.skills.list.map(skill => {
      const skillId = `${skill.name}.${this._id}`
      return createElement('div', [
        createElement('input', null, {
          type: 'checkbox', class: 'btn-check', id: skillId,
          checked: charSheetStore.getClassSkills().includes(skill),
          disabled: charSheetStore.isDisabledSkill(skill),
          eventListeners: {
            change: ({ target: { checked } }) => charSheetStore[checked ? 'classSkillsAdd' : 'classSkillsRemove'](skill)
          }
        }),
        createElement('label', t._(`statics.${skill.name}`), { class: 'btn btn-outline-primary', for: skillId }),
      ])
    }))
  }

  #renderSkillsChooseLabel() {
    console.info('-- ClassBase.#renderSkillsChooseLabel')
    const classSkills = charSheetStore.getCharClass()?.skills
    if (classSkills) {
      const remaining = classSkills.nb - charSheetStore.getClassSkills().length
      replaceElement(this.#skillsChooseLabelElement, t.tn('components.ClassBase.skills.remaining', { remaining }))
    } else {
      replaceElement(this.#skillsChooseLabelElement, t.tn('components.ClassBase.skills.notConcerned',))
    }
  }

  #renderTools = () => {
    console.info('-- ClassBase.#renderTools')

    if (!charSheetStore.getCharClass()?.toolProficiencies?.length)
      return this.#toolsContainerElement.classList.add('d-none')
    this.#toolsContainerElement.classList.remove('d-none')

    const metaTotalMax = charSheetStore.getCharClass()?.toolProficiencies
      .find(rule => rule.type === INSERTION_TYPE._meta && rule.totalMax)?.totalMax
    const totalMax = metaTotalMax
      || charSheetStore.getCharClass()?.toolProficiencies
        .filter(rule => rule.type === INSERTION_TYPE.select)
        .reduce((acc, rule) => acc + rule.max, 0)
      || 0

    const classTools = charSheetStore.getClassTools()
    const totalSelected = classTools.length
    const totalRemaining = totalMax - totalSelected

    const groups = charSheetStore.getCharClass()?.toolProficiencies?.map((rule, groupIndex) => {
      const groupChildren = []

      switch (rule.type) {
        case INSERTION_TYPE.select: {
          const tools = getEquipments({ type: EQUIPMENT_TYPE.TOOL })
            .filter(tool => tool.category === rule.from)
            .map(tool => tool.name)

          const groupSelected = classTools.filter(tool => tools.includes(tool))
          const groupRemaining = Math.max(0, rule.max - groupSelected.length)
          const remaining = Math.min(totalRemaining, groupRemaining)

          groupChildren.push(createElement('div', t.tn('components.ClassBase.tools.remainingGroup', {
            remaining, from: t._(`statics.${rule.from}`)
          }), { class: 'card-title' }))
          groupChildren.push(createElement('div', tools.map(tool => {
            const toolId = `${tool}.${this._id}.tools.${groupIndex}`
            const isChecked = groupSelected.includes(tool)
            const isCheckedElseWhere = false // TODO: + check is checked from elsewhere eg. feats
            return createElement('div', [
              createElement('input', null, {
                type: 'checkbox',
                class: 'btn-check',
                id: toolId,
                checked: isChecked,
                disabled: isCheckedElseWhere || (!isChecked && remaining === 0),
                eventListeners: {
                  change: ({ target: { checked } }) => charSheetStore[checked ? 'classToolsAdd' : 'classToolsRemove'](tool)
                }
              }),
              createElement(
                'label',
                t._(`statics.TOOLS.${tool.replace('TOOLS_', '')}.name`),
                { class: 'btn btn-outline-primary', for: toolId }
              ),
            ])
          }), { class: 'd-flex flex-wrap gap-3' }))
          return createElement('div', groupChildren, { class: 'tools-group' })
        }
        case INSERTION_TYPE.forced: {
          groupChildren.push(createElement(
            'div',
            t.tn('components.ClassBase.tools.forced'),
            { class: 'card-title' }
          ))
          groupChildren.push(createElement('div', rule.tools.map(tool => {
            const toolId = `${tool}.${this._id}.tools.${groupIndex}`
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
                t._(`statics.TOOLS.${tool.replace('TOOLS_', '')}.name`),
                { class: 'btn btn-outline-primary', for: toolId }
              ),
            ])
          }), { class: 'd-flex flex-wrap gap-3' }))

          return createElement('div', groupChildren, { class: 'tools-group' })
        }
      }
    }) ?? []
    replaceElement(this.#toolsGroupsElement, groups.filter(Boolean))
    this.#toolsGroupsElement.classList[groups.length ? 'remove' : 'add']('d-none')
  }

  _i18nChanged = () => {
    console.info('-- ClassBase._i18nChanged')
    this.#renderDescription()
    this.#renderSkillsChooseLabel()
    this.#renderSkills()
    this.#renderTools()
  }
}
