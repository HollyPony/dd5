import { AbstractComponent } from '../../AbstractComponent/index.js'
import charSheet from '../../../modules/stores/charSheet.store.js'
import { t, i18n } from '../../../modules/i18n.js'
import { createElement, fillElement } from '../../../modules/domlib.js'
import { EQUIPMENT_TYPE, getEquipments, } from '../../../modules/data/equipments.js'
import { INSERTION_TYPE } from '../../../modules/data/classes.js'
import { createObservable } from '../../../modules/helpers.js'

export class ClassBase extends AbstractComponent {
  static get tagName() { return 'class-base' }
  static get _componentPath() { return '/components/ClassFeatures/ClassBase' }

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
  _observable = createObservable()

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

    i18n.applyTranslations(this)
  }

  _registerEvents() {
    this._pushEvents(
      charSheet.subscribe('charClassName', this.#charClassNameChanged),
      charSheet.subscribe('classSkills', this.#skillsChanged),
      charSheet.subscribe('classTools', this.#toolsChanged),
    )
  }

  #renderActionsRequired() {
    console.info('-- ClassBase.refreshActionsRequired')

    const toolsMetaMaxTotal = charSheet.getCharClass()?.toolProficiencies
      ?.find(rule => rule.type === INSERTION_TYPE._meta && rule.totalMax)?.totalMax
    const toolsMaxTotal = toolsMetaMaxTotal
      || charSheet.getCharClass()?.toolProficiencies
        ?.filter(rule => rule.type === INSERTION_TYPE.select)
        .reduce((acc, rule) => acc + rule.max, 0)
      || 0

    const actionsRequired = {
      skills: (charSheet.getCharClass()?.skills.nb - charSheet.getClassSkills().length) > 0,
      tools: toolsMaxTotal - charSheet.getClassTools().length > 0,
    }

    this.#skillsActionRequiredElement.classList[actionsRequired.skills ? 'add' : 'remove']('show')
    this.#toolsActionRequiredElement.classList[actionsRequired.tools ? 'add' : 'remove']('show')
    const hasActionRequired = Object.values(actionsRequired).some(i => i)
    this.#baseFeatureButtonElement.classList[hasActionRequired ? 'add' : 'remove']('show')

    this._actionRequired = hasActionRequired ?? false
    this._observable.notify('actionRequired')
  }

  #renderDescription() {
    fillElement(this.#descriptionBodyElement, t.md(`statics.classes.${charSheet.getCharClassName()}.description`))
  }

  #renderSkills() {
    console.info('-- ClassBase.refreshSkills')

    if (!charSheet.getCharClass()?.skills)
      return this.#skillsContainerElement.classList.add('d-none')
    this.#skillsContainerElement.classList.remove('d-none')

    this.#refreshSkillsChooseLabel()
    this.#refreshSkillsList()
  }

  #refreshSkillsChooseLabel() {
    console.info('-- ClassBase.refreshSkillsChooseLabel')
    const classSkills = charSheet.getCharClass()?.skills
    if (classSkills) {
      const remaining = classSkills.nb - charSheet.getClassSkills().length
      fillElement(this.#skillsChooseLabelElement, t.tn('components.ClassBase.skills.remaining', { remaining }))
    } else {
      fillElement(this.#skillsChooseLabelElement, t.tn('components.ClassBase.skills.notConcerned',))
    }
  }

  #refreshSkillsList() {
    console.info('-- ClassBase.refreshSkillsList')
    fillElement(this.#skillsListElement, charSheet.getCharClass()?.skills.list.map(skill => {
      const skillId = `${skill.name}.${this._id}`
      return createElement('div', [
        createElement('input', null, {
          type: 'checkbox', class: 'btn-check', id: skillId,
          checked: charSheet.getClassSkills().includes(skill),
          disabled: charSheet.isDisabledSkill(skill),
          eventListeners: {
            change: ({ target: { checked } }) => charSheet[checked ? 'classSkillsAdd' : 'classSkillsRemove'](skill)
          }
        }),
        createElement('label', t._(`statics.${skill.name}`), { class: 'btn btn-outline-primary', for: skillId }),
      ])
    }))
  }

  #renderTools() {
    console.info('-- ClassBase.refreshTools')

    if (!charSheet.getCharClass()?.toolProficiencies?.length)
      return this.#toolsContainerElement.classList.add('d-none')
    this.#toolsContainerElement.classList.remove('d-none')

    const metaTotalMax = charSheet.getCharClass()?.toolProficiencies
      .find(rule => rule.type === INSERTION_TYPE._meta && rule.totalMax)?.totalMax
    const totalMax = metaTotalMax
      || charSheet.getCharClass()?.toolProficiencies
        .filter(rule => rule.type === INSERTION_TYPE.select)
        .reduce((acc, rule) => acc + rule.max, 0)
      || 0

    this.#refreshToolsGroups(totalMax)
  }

  #refreshToolsGroups(totalMax) {
    const classTools = charSheet.getClassTools()
    const totalSelected = classTools.length
    const totalRemaining = totalMax - totalSelected

    const groups = charSheet.getCharClass()?.toolProficiencies?.map((rule, groupIndex) => {
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
                  change: ({ target: { checked } }) => charSheet[checked ? 'classToolsAdd' : 'classToolsRemove'](tool)
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
    })
    fillElement(this.#toolsGroupsElement, groups.filter(Boolean))
    this.#toolsGroupsElement.classList[groups.length ? 'remove' : 'add']('d-none')
  }

  #charClassNameChanged = () => {
    this.#renderDescription()
  }

  #skillsChanged = () => {
    console.info('-- ClassBase.skillsChanged')
    this.#renderActionsRequired()
    this.#renderSkills()
  }

  #toolsChanged = () => {
    console.info('-- ClassBase.toolsChanged')
    this.#renderActionsRequired()
    this.#renderTools()
  }

  _i18nChanged = () => {
    console.info('-- ClassBase.i18nChanged')
    i18n.applyTranslations(this)
    this.#renderDescription()
    this.#renderSkills()
    this.#renderTools()
  }
}
