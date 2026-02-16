import { ABILITIES } from '../common.js'
import createStore from '../createStore.js'
import createEventBus from '../createEventBus.js'
import { SELECTOR_TYPE } from '../services/choice.helper.js'
import properties from './charSheet.authority.properties.js'

export const initialData = {
  [properties.name]: '',
  [properties.experience]: 0,
  [properties.className]: '',
  [properties.subClassName]: null,
  [properties.originName]: '',
  [properties.speciesName]: '',
  [properties.alignment]: '',
  [properties.sizeCategory]: '',
  [properties.size]: '',
  [properties.abilities]: {
    [ABILITIES.strength]: 10,
    [ABILITIES.dexterity]: 10,
    [ABILITIES.constitution]: 10,
    [ABILITIES.wisdom]: 10,
    [ABILITIES.intelligence]: 10,
    [ABILITIES.charisma]: 10,
  },
  [properties.choiceSelections]: {},
  [properties.equipments]: [],
}

function createCharSheetStorageStore() {
  const store = createStore(initialData, createEventBus())
  const { get, set, } = store

  function init(charData = {}) {
    set(charData)
  }

  function reset() {
    init(initialData)
  }

  function getName() { return get(properties.name) }
  function getExperience() { return get(properties.experience) }
  function getOriginName() { return get(properties.originName) }
  function getClassName() { return get(properties.className) }
  function getSubClassName() { return get(properties.subClassName) }
  function getSpeciesName() { return get(properties.speciesName) }
  function getAlignment() { return get(properties.alignment) }
  function getSizeCategory() { return get(properties.sizeCategory) }
  function getSize() { return get(properties.size) }
  function getChoiceSelections() { return get(properties.choiceSelections) }
  function getAbilities() { return get(properties.abilities) }
  function getAbility(ability) { return getAbilities()[ability] }
  function getEquipments() { return get(properties.equipments) }

  // Save this name. Test it
  function setName(name) { set({ [properties.name]: name }) }
  function setExperience(experienceValue) {
    const experience = parseInt(experienceValue)
    if (!experience) return
    set({ [properties.experience]: experience })
  }
  function setOriginName(originName) {
    set({ [properties.originName]: originName })
    // TODO: handle skill from origin ?
    // TODO: remove also classSkills choosed due to conflicts with origin ones
  }
  function setClassName(className) {
    set({
      [properties.className]: className,
      [properties.subClassName]: null,
      [properties.choiceSelections]: Object.fromEntries(
        Object.entries(getChoiceSelections())
          .filter(([_, selection]) => selection.choice?.selector?.type !== SELECTOR_TYPE.CLASS),
      )
    })
  }
  function setSubClassName(subClassName) {
    set({ [properties.subClassName]: subClassName })
  }
  function setSpeciesName(speciesName) {
    set({ [properties.speciesName]: speciesName })

    // // TODO: Handle what changed on species changed
  }

  function setAbilityScore(ability, score) {
    set(new Map([[[properties.abilities, ability], score]]))
  }

  function setChoiceSelections(choiceSelections) {
    set({ [properties.choiceSelections]: choiceSelections })
  }

  return {
    init,
    reset,
    get,
    getName,
    getExperience,
    getOriginName,
    getClassName,
    getSubClassName,
    getSpeciesName,
    getAlignment,
    getSizeCategory,
    getSize,
    getChoiceSelections,
    getAbilities,
    getAbility,
    getEquipments,
    setName,
    setExperience,
    setOriginName,
    setClassName,
    setSubClassName,
    setSpeciesName,
    setAbilityScore,
    setChoiceSelections,

    onAny: store.onAny,
    onMap: store.onMap,
  }
}

export default createCharSheetStorageStore()
