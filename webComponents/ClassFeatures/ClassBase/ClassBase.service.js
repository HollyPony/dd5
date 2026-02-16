import { MissingPathError } from '../../../modules/errors.js'
import { INSERTION_TYPE } from '../../../modules/data/classes.js'
import { EQUIPMENT_TYPE, getEquipments } from '../../../modules/data/equipments.js'
import {
  buildChoicePayload,
  computeRemaining,
  isSkillDisabled,
  isToolDisabled,
} from './ClassBase.helpers.js'

/**
 * Build ClassBase domain service.
 *
 * @param {{
 *   charSheetStore: {
 *     getCharClass: Function,
 *     getCharClassName: Function,
 *     getSkills: Function,
 *     getChoicePayload: Function,
 *     setPayloadToSelection: Function
 *   }
 * }} params
 * @returns {{
 *   getDescriptionKey: () => string,
 *   getActionsRequiredState: () => { skills: boolean, tools: boolean, any: boolean },
 *   getSkillsViewModel: () => {
 *     isConcerned: boolean,
 *     remaining: number,
 *     choice: any,
 *     options: Array<{ skill: any, checked: boolean, disabled: boolean }>
 *   },
 *   toggleSkill: ({ skill: any, checked: boolean }) => void,
 *   getToolsViewModel: () => {
 *     visible: boolean,
 *     type: any,
 *     groups: Array<{ category: any, remaining: number, options: Array<{ toolName: any, checked: boolean, disabled: boolean, groupIndex: number }> }>,
 *     forcedTools: any[]
 *   },
 *   toggleTool: ({ toolName: any, checked: boolean }) => void
 * }}
 */
export function createClassBaseService({ charSheetStore }) {
  if (!charSheetStore) throw MissingPathError('ClassBase service requires charSheetStore')

  function getDescriptionKey() {
    return `statics.classes.${charSheetStore.getCharClassName()}.description`
  }

  function getActionsRequiredState() {
    const charClass = charSheetStore.getCharClass()
    const skillsRule = charClass?.skills
    const toolRule = charClass?.toolProficiencies

    return {
      skills: skillsRule && (skillsRule?.nb - (charSheetStore?.getChoicePayload(skillsRule?.choice?.selector)?.length ?? 0) > 0),
      tools: toolRule && (toolRule?.max - (charSheetStore?.getChoicePayload(toolRule?.choice?.selector)?.length ?? 0) > 0),
    }
  }

  function getSkillsViewModel() {
    const classSkills = charSheetStore.getCharClass()?.skills
    if (!classSkills) {
      return {
        isConcerned: false,
        remaining: 0,
        choice: null,
        options: [],
      }
    }

    const choice = classSkills.choice ?? null
    const choicePayload = charSheetStore.getChoicePayload(choice?.selector) ?? []
    const skills = charSheetStore.getSkills() ?? {}

    return {
      isConcerned: true,
      remaining: classSkills.nb - choicePayload.length,
      choice,
      options: classSkills.list.map(skill => ({
        skill,
        checked: choicePayload.includes(skill),
        disabled: isSkillDisabled({
          skill,
          classSkills,
          choicePayload,
          skills,
        }),
      })),
    }
  }

  function toggleSkill({ skill, checked }) {
    const classSkills = charSheetStore.getCharClass()?.skills
    const choice = classSkills?.choice ?? null
    if (!choice) return

    const choicePayload = charSheetStore.getChoicePayload(choice.selector) ?? []
    const payload = buildChoicePayload(choicePayload, skill, checked)
    charSheetStore.setPayloadToSelection(choice, payload)
  }

  function getToolsViewModel() {
    const toolRule = charSheetStore.getCharClass()?.toolProficiencies
    if (!toolRule?.type) {
      return { visible: false, type: null, groups: [], forcedTools: [] }
    }

    if (toolRule.type === INSERTION_TYPE.forced) {
      return {
        visible: true,
        type: INSERTION_TYPE.forced,
        groups: [],
        forcedTools: toolRule.tools ?? [],
      }
    }

    if (toolRule.type !== INSERTION_TYPE.select) {
      return { visible: true, type: toolRule.type, groups: [], forcedTools: [] }
    }

    const choice = toolRule.choice ?? null
    const choicePayload = charSheetStore.getChoicePayload(choice?.selector) ?? []
    const categories = [toolRule.from].flat()
    const allTools = getEquipments({ type: EQUIPMENT_TYPE.TOOL })

    return {
      visible: true,
      type: INSERTION_TYPE.select,
      forcedTools: [],
      groups: categories.map((category, groupIndex) => {
        const tools = allTools.filter(tool => category === tool.category)
        return {
          category,
          remaining: computeRemaining(toolRule.max, choicePayload.length),
          options: tools.map(tool => {
            const isChecked = choicePayload.includes(tool.name)
            const isCheckedElseWhere = false // TODO: use global source ownership
            return {
              toolName: tool.name,
              checked: isChecked,
              disabled: isToolDisabled({
                isChecked,
                max: toolRule.max,
                selectedCount: choicePayload.length,
                isCheckedElseWhere,
              }),
              groupIndex,
            }
          }),
        }
      }),
    }
  }

  function toggleTool({ toolName, checked }) {
    const choice = charSheetStore.getCharClass()?.toolProficiencies?.choice ?? null
    if (!choice) return

    const choicePayload = charSheetStore.getChoicePayload(choice.selector) ?? []
    const payload = buildChoicePayload(choicePayload, toolName, checked)
    charSheetStore.setPayloadToSelection(choice, payload)
  }

  return {
    getDescriptionKey,
    getActionsRequiredState,
    getSkillsViewModel,
    toggleSkill,
    getToolsViewModel,
    toggleTool,
  }
}

