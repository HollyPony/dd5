import { ABILITIES } from '../common.js'
import createStore from '../createStore.js'
import createEventBus from '../createEventBus.js'
import { SELECTOR_TYPE } from '../services/choice.helper.js'
import properties from './charSheet.authority.properties.js'

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

  function getCharName() { return get(properties.charName) }
  function getCharExperience() { return get(properties.charExperience) }
  function getCharOriginName() { return get(properties.charOriginName) }
  function getCharClassName() { return get(properties.charClassName) }
  function getCharSubClassName() { return get(properties.charSubClassName) }
  function getCharSpeciesName() { return get(properties.charSpeciesName) }
  function getCharAlignment() { return get(properties.charAlignment) }
  function getCharSizeCategory() { return get(properties.charSizeCategory) }
  function getCharSize() { return get(properties.charSize) }
  function getChoiceSelections() { return get(properties.choiceSelections) }
  function getAbilities() { return get(properties.abilities) }
  function getAbility(ability) { return getAbilities()[ability] }
  function getEquipments() { return get(properties.equipments) }

  // Save this name. Test it
  function setCharName(charName) { set({ [properties.charName]: charName }) }
  function setCharExperience(charExperience) {
    const experience = parseInt(charExperience)
    if (!experience) return
    set({ [properties.charExperience]: experience })
  }
  function setCharOriginName(charOriginName) {
    set({ [properties.charOriginName]: charOriginName })
    // TODO: handle skill from origin ?
    // TODO: remove also classSkills choosed due to conflicts with origin ones
  }
  function setCharClassName(charClassName) {
    set({
      [properties.charClassName]: charClassName,
      [properties.charSubClassName]: null,
      [properties.choiceSelections]: Object.fromEntries(
        Object.entries(getChoiceSelections())
          .filter(([_, selection]) => selection.choice?.selector?.type !== SELECTOR_TYPE.CLASS),
      )
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
    set(new Map([[[properties.abilities, ability], score]]))
  }

  function setChoiceSelections(choiceSelections) {
    set({ [properties.choiceSelections]: choiceSelections })
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
    getChoiceSelections,
    getAbilities,
    getAbility,
    getEquipments,
    setCharName,
    setCharExperience,
    setCharOriginName,
    setCharClassName,
    setCharSubClassName,
    setCharSpeciesName,
    setAbilityScore,
    setChoiceSelections,

    onAny: store.onAny,
    onMap: store.onMap,
  }
}

export default createCharSheetStorageStore()
