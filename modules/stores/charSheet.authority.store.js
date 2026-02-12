import { ABILITY } from '../common.js'
import { s } from '../helpers.js'
import createStore from '../createStore.js'
import createEventBus, { ANY } from '../createEventBus.js'

export const properties = s({
  charName: 'charName', // Sym ?
  charExperience: 'charExperience', // Sym ?
  charClassName: 'charClassName', // Sym ?
  charSubClassName: 'charSubClassName', // Sym ?
  charOriginName: 'charOriginName', // Sym ?
  charSpeciesName: 'charSpeciesName', // Sym ?
  charAlignment: 'charAlignment', // Sym ?
  charSizeCategory: 'charSizeCategory', // Sym ?
  charSize: 'charSize', // Sym ?
  attributes: 'attributes', // Sym ?
  classSkills: 'classSkills', // Sym ?
  expertSkills: 'expertSkills', // Sym ?
  classTools: 'classTools', // Sym ?
  equipments: 'equipments', // Sym ?
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
    charExperience: source?.charExperience ?? 0,
    charClassName: source?.charClassName ?? '',
    charSubClassName: source?.charSubClassName ?? null,
    charOriginName: source?.charOriginName ?? '',
    charSpeciesName: source?.charSpeciesName ?? '',
    charAlignment: source?.charAlignment ?? '',
    charSizeCategory: source?.charSizeCategory ?? '',
    charSize: source?.charSize ?? '',
    attributes: s({
      [ABILITY.strength]: attributes[ABILITY.strength] ?? 10,
      [ABILITY.dexterity]: attributes[ABILITY.dexterity] ?? 10,
      [ABILITY.constitution]: attributes[ABILITY.constitution] ?? 10,
      [ABILITY.wisdom]: attributes[ABILITY.wisdom] ?? 10,
      [ABILITY.intelligence]: attributes[ABILITY.intelligence] ?? 10,
      [ABILITY.charisma]: attributes[ABILITY.charisma] ?? 10,
    }),
    classSkills: (source?.classSkills ?? []).slice(),
    expertSkills: (source?.expertSkills ?? []).slice(),
    classTools: (source?.classTools ?? []).slice(),
    equipments: (source?.equipments ?? []).map(equipment => ({ ...equipment })),
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
  function setCharName(charName) { set({ charName }) }
  function setCharExperience(charExperience) {
    const experience = parseInt(charExperience)
    if (!experience) return
    set({ charExperience: experience })
  }
  function setCharOriginName(charOriginName) {
    set({
      charOriginName,
      classSkills: [],
      expertSkills: [],
      classTools: [],
    })
    // TODO: handle skill from origin ?
    // TODO: remove also classSkills choosed due to conflicts with origin ones
  }
  function setCharClassName(charClassName) {
    set({
      charClassName,
      charSubClassName: null,
      classSkills: [],
      expertSkills: [],
      classTools: [],
    })
  }
  function setCharSubClassName(charSubClassName) {
    set({ charSubClassName })
  }
  function setCharSpeciesName(charSpeciesName) {
    set({ charSpeciesName })

    // // TODO: Handle what changed on species changed
  }

  function setAbilityScore(ability, score) {
    set({ [`attributes.${ability}`]: score })
  }

  function classSkillsAdd(skill) {
    set({ 'classSkills': getClassSkills().concat(skill) })
  }

  function classSkillsRemove(skill) {
    set({ 'classSkills': getClassSkills().filter(_skill => _skill !== skill) })
  }

  function expertSkillsAdd(skill) {
    set({ 'expertSkills': getExpertSkills().concat(skill) })
  }

  function expertSkillsRemove(skill) {
    set({ 'expertSkills': getExpertSkills().filter(_skill => _skill !== skill) })
  }

  function classToolsAdd(tool) {
    set({ 'classTools': getClassTools().concat(tool) })
  }

  function classToolsRemove(tool) {
    set({ 'classTools': getClassTools().filter(_tool => _tool !== tool) })
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
