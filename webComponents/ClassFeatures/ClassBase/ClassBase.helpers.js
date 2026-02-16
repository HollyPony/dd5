/**
 * Compute remaining selectable entries.
 *
 * @param {number} max
 * @param {number} selectedCount
 * @returns {number}
 */
export function computeRemaining(max, selectedCount) {
  return Math.max(0, (max ?? 0) - (selectedCount ?? 0))
}

/**
 * Build the next payload for a checkbox toggle.
 *
 * @template T
 * @param {T[]} currentPayload
 * @param {T} value
 * @param {boolean} checked
 * @returns {T[]}
 */
export function buildChoicePayload(currentPayload, value, checked) {
  const nextSet = new Set(currentPayload ?? [])
  nextSet[checked ? 'add' : 'delete'](value)
  return Array.from(nextSet)
}

/**
 * Check if one class skill option must be disabled.
 *
 * @param {{
 *   skill: any,
 *   classSkills: { list?: any[], nb?: number },
 *   choicePayload: any[],
 *   skills: Record<string, { checked?: boolean }>
 * }} params
 * @returns {boolean}
 */
export function isSkillDisabled({ skill, classSkills, choicePayload, skills }) {
  const isSelected = choicePayload?.includes(skill) ?? false
  const isMaxReached = (choicePayload?.length ?? 0) >= (classSkills?.nb ?? 0)
  const isCheckedElseWhere = !classSkills?.list?.includes(skill) && Boolean(skills?.[skill]?.checked)
  return isCheckedElseWhere || (!isSelected && isMaxReached)
}

/**
 * Check if one tool option must be disabled.
 *
 * @param {{
 *   isChecked: boolean,
 *   max: number,
 *   selectedCount: number,
 *   isCheckedElseWhere?: boolean
 * }} params
 * @returns {boolean}
 */
export function isToolDisabled({ isChecked, max, selectedCount, isCheckedElseWhere = false }) {
  return Boolean(isCheckedElseWhere) || (!isChecked && computeRemaining(max, selectedCount) === 0)
}
