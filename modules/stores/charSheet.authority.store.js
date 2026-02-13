import { ABILITY } from '../common.js'
import { s } from '../helpers.js'
import createStore from '../createStore.js'
import createEventBus from '../createEventBus.js'

export const properties = s({
  charName: Symbol('charName'),
  charExperience: Symbol('charExperience'),
  charClassName: Symbol('charClassName'),
  charSubClassName: Symbol('charSubClassName'),
  charOriginName: Symbol('charOriginName'),
  charSpeciesName: Symbol('charSpeciesName'),
  charAlignment: Symbol('charAlignment'),
  charSizeCategory: Symbol('charSizeCategory'),
  charSize: Symbol('charSize'),
  attributes: Symbol('attributes'),
  classSkills: Symbol('classSkills'),
  expertSkills: Symbol('expertSkills'),
  classTools: Symbol('classTools'),
  equipments: Symbol('equipments'),
})

export const initialData = {
  [properties.charName]: '',
  [properties.charExperience]: 0,
  [properties.charClassName]: '',
  [properties.charSubClassName]: null,
  [properties.charOriginName]: '',
  [properties.charSpeciesName]: '',
  [properties.charAlignment]: '',
  [properties.charSizeCategory]: '',
  [properties.charSize]: '',
  [properties.attributes]: s({
    [ABILITY.strength]: 10,
    [ABILITY.dexterity]: 10,
    [ABILITY.constitution]: 10,
    [ABILITY.wisdom]: 10,
    [ABILITY.intelligence]: 10,
    [ABILITY.charisma]: 10,
  }),
  [properties.classSkills]: [],
  [properties.expertSkills]: [],
  [properties.classTools]: [],
  [properties.equipments]: [],
}

function normalizeSavedData(source = {}) {
  const attributes = source?.attributes ?? {}
  return {
    [properties.charName]: source?.charName ?? '',
    [properties.charExperience]: source?.charExperience ?? 0,
    [properties.charClassName]: source?.charClassName ?? '',
    [properties.charSubClassName]: source?.charSubClassName ?? null,
    [properties.charOriginName]: source?.charOriginName ?? '',
    [properties.charSpeciesName]: source?.charSpeciesName ?? '',
    [properties.charAlignment]: source?.charAlignment ?? '',
    [properties.charSizeCategory]: source?.charSizeCategory ?? '',
    [properties.charSize]: source?.charSize ?? '',
    [properties.attributes]: s({
      [ABILITY.strength]: attributes[ABILITY.strength] ?? 10,
      [ABILITY.dexterity]: attributes[ABILITY.dexterity] ?? 10,
      [ABILITY.constitution]: attributes[ABILITY.constitution] ?? 10,
      [ABILITY.wisdom]: attributes[ABILITY.wisdom] ?? 10,
      [ABILITY.intelligence]: attributes[ABILITY.intelligence] ?? 10,
      [ABILITY.charisma]: attributes[ABILITY.charisma] ?? 10,
    }),
    [properties.classSkills]: (source?.classSkills ?? []).slice(),
    [properties.expertSkills]: (source?.expertSkills ?? []).slice(),
    [properties.classTools]: (source?.classTools ?? []).slice(),
    [properties.equipments]: (source?.equipments ?? []).map(equipment => ({ ...equipment })),
  }
}

function createCharSheetStorageStore() {
  const store = createStore(initialData, createEventBus())
  const { get, set, } = store

  function init(charData) {
    set(normalizeSavedData(charData))
  }

  function reset() {
    init(initialData)
  }

  function getCharName() { return get(properties.charName) }
  function getCharExperience() { return get(properties.charExperience) }
  function getCharOriginName() { return get(properties.charOriginName) }
  function getCharClassName() { return get(properties.charClassName) }
  function getCharSubClassName() { return get(properties.charSubClassName) }
  function getCharSpeciesName() { return get(properties.charSpeciesName) }
  function getCharAlignment() { return get(properties.charAlignment) }
  function getCharSizeCategory() { return get(properties.charSizeCategory) }
  function getCharSize() { return get(properties.charSize) }
  function getClassSkills() { return get(properties.classSkills) }
  function getExpertSkills() { return get(properties.expertSkills) }
  function getClassTools() { return get(properties.classTools) }
  function getAttributes() { return get(properties.attributes) }
  function getAttribute(ability) { return getAttributes()[ability] }
  function getEquipments() { return get(properties.equipments) }

  // Save this name. Test it
  function setCharName(charName) { set({ [properties.charName]: charName }) }
  function setCharExperience(charExperience) {
    const experience = parseInt(charExperience)
    if (!experience) return
    set({ [properties.charExperience]: experience })
  }
  function setCharOriginName(charOriginName) {
    set({
      [properties.charOriginName]: charOriginName,
      [properties.classSkills]: [],
      [properties.expertSkills]: [],
      [properties.classTools]: [],
    })
    // TODO: handle skill from origin ?
    // TODO: remove also classSkills choosed due to conflicts with origin ones
  }
  function setCharClassName(charClassName) {
    set({
      [properties.charClassName]: charClassName,
      [properties.charSubClassName]: null,
      [properties.classSkills]: [],
      [properties.expertSkills]: [],
      [properties.classTools]: [],
    })
  }
  function setCharSubClassName(charSubClassName) {
    set({ [properties.charSubClassName]: charSubClassName })
  }
  function setCharSpeciesName(charSpeciesName) {
    set({ [properties.charSpeciesName]: charSpeciesName })

    // // TODO: Handle what changed on species changed
  }

  function setAbilityScore(ability, score) {
    set(new Map([[[properties.attributes, ability], score]]))
  }

  function classSkillsAdd(skill) {
    set({ [properties.classSkills]: getClassSkills().concat(skill) })
  }

  function classSkillsRemove(skill) {
    set({ [properties.classSkills]: getClassSkills().filter(_skill => _skill !== skill) })
  }

  function expertSkillsAdd(skill) {
    set({ [properties.expertSkills]: getExpertSkills().concat(skill) })
  }

  function expertSkillsRemove(skill) {
    set({ [properties.expertSkills]: getExpertSkills().filter(_skill => _skill !== skill) })
  }

  function classToolsAdd(tool) {
    set({ [properties.classTools]: getClassTools().concat(tool) })
  }

  function classToolsRemove(tool) {
    set({ [properties.classTools]: getClassTools().filter(_tool => _tool !== tool) })
  }

  return {
    init,
    reset,
    get,
    getCharName,
    getCharExperience,
    getCharOriginName,
    getCharClassName,
    getCharSubClassName,
    getCharSpeciesName,
    getCharAlignment,
    getCharSizeCategory,
    getCharSize,
    getClassSkills,
    getExpertSkills,
    getClassTools,
    getAttributes,
    getAttribute,
    getEquipments,
    setCharName,
    setCharExperience,
    setCharOriginName,
    setCharClassName,
    setCharSubClassName,
    setCharSpeciesName,
    setAbilityScore,
    classSkillsAdd,
    classSkillsRemove,
    expertSkillsAdd,
    expertSkillsRemove,
    classToolsAdd,
    classToolsRemove,

    onAny: store.onAny,
    onMap: store.onMap,
  }
}

export default createCharSheetStorageStore()
