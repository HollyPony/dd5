import { ABILITY } from '../common.js'
import { f } from '../helpers.js'
import createStore from '../createStore.js'
import createEventBus from '../createEventBus.js'

export const properties = f({
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
  classTools: Symbol('classTools'),
  equipments: Symbol('equipments'),
})

export const initialData = f({
  [properties.charName]: '',
  [properties.charExperience]: 0,
  [properties.charClassName]: '',
  [properties.charSubClassName]: null,
  [properties.charOriginName]: '',
  [properties.charSpeciesName]: '',
  [properties.charAlignment]: '',
  [properties.charSizeCategory]: '',
  [properties.charSize]: '',
  [properties.attributes]: f({
    [ABILITY.strength]: 10,
    [ABILITY.dexterity]: 10,
    [ABILITY.constitution]: 10,
    [ABILITY.wisdom]: 10,
    [ABILITY.intelligence]: 10,
    [ABILITY.charisma]: 10,
  }),
  [properties.classSkills]: [],
  [properties.classTools]: [],
  [properties.equipments]: [],
})

function createCharSheetStorageStore() {
  const store = createStore(initialData, createEventBus())
  const { get, set, } = store

  function init(charData = {}) {
    set(charData)
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
    classToolsAdd,
    classToolsRemove,

    onAny: store.onAny,
    onMap: store.onMap,
  }
}

export default createCharSheetStorageStore()
