import { ABILITIES, SIZE_CATEGORY } from '../common.js'
import createStore from '../createStore.js'
import createEventBus from '../createEventBus.js'
import { InvalidCharacterFieldError } from '../errors.js'
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
  [properties.size]: 170,
  [properties.hitPointCurrent]: 0,
  [properties.hitPointTemp]: 0,
  [properties.deathSaves]: {
    success: 0,
    failure: 0,
  },
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

// TODO: Move to helpers
function parseIntegerField(fieldName, value, { min = 0, max = Number.MAX_SAFE_INTEGER } = {}) {
  const parsedValue = Number.parseInt(value, 10)
  if (!Number.isInteger(parsedValue)) throw InvalidCharacterFieldError(fieldName, 'Expected an integer')
  if (parsedValue < min || parsedValue > max) throw InvalidCharacterFieldError(fieldName, `Expected value between ${min} and ${max}`)
  return parsedValue
}

function parseSizeCategory(sizeCategory) {
  if (sizeCategory)
    try {
      SIZE_CATEGORY[sizeCategory]
    } catch (e) {
      throw InvalidCharacterFieldError('sizeCategory', `Bad size category ${sizeCategory}`)
    }
  return sizeCategory || initialData[properties.sizeCategory]
}

function parseExperience(experience) {
  return parseIntegerField('experience', experience, { min: 0 })
}

function parseDeathSaves(deathSaves) {
  if (!deathSaves || typeof deathSaves !== 'object') throw InvalidCharacterFieldError('deathSaves', 'Expected an object')
  return {
    success: parseIntegerField('deathSaves.success', deathSaves.success, { min: 0, max: 3 }),
    failure: parseIntegerField('deathSaves.failure', deathSaves.failure, { min: 0, max: 3 }),
  }
}

function createCharSheetStorageStore() {
  const store = createStore(initialData, createEventBus())
  const { get, set, } = store

  function init(charData = {}) {
    const abilities = charData[properties.abilities] || initialData[properties.abilities]
    if (typeof abilities !== "object"
      || Object.getPrototypeOf(abilities) !== Object.prototype) {
      throw InvalidCharacterFieldError('abilities', 'Expected an object')
    }

    set({
      [properties.name]: charData[properties.name],
      [properties.experience]: parseExperience(charData[properties.experience]),
      [properties.originName]: charData[properties.originName],
      [properties.className]: charData[properties.className],
      [properties.subClassName]: charData[properties.subClassName],
      [properties.speciesName]: charData[properties.speciesName],
      [properties.alignment]: charData[properties.alignment],
      [properties.sizeCategory]: parseSizeCategory(charData[properties.sizeCategory]),
      [properties.size]: parseIntegerField('size', charData[properties.size], { min: 0 }),
      [properties.hitPointCurrent]: parseIntegerField('hitPointCurrent', charData[properties.hitPointCurrent], { min: 0 }),
      [properties.hitPointTemp]: parseIntegerField('hitPointTemp', charData[properties.hitPointTemp], { min: 0 }),
      [properties.deathSaves]: parseDeathSaves(charData[properties.deathSaves]),
      [properties.abilities]: Object.fromEntries(Object
        .getOwnPropertySymbols(abilities).map(ability => [
          ability,
          parseIntegerField('abilityScore', abilities[ability], { min: 1 })
        ])
      ),
      [properties.choiceSelections]: charData[properties.choiceSelections],
      [properties.equipments]: charData[properties.equipments],
    })
  }

  function reset() {
    set(initialData)
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
  function getHitPointCurrent() { return get(properties.hitPointCurrent) }
  function getHitPointTemp() { return get(properties.hitPointTemp) }
  function getDeathSaves() { return get(properties.deathSaves) }
  function getChoiceSelections() { return get(properties.choiceSelections) }
  function getAbilities() { return get(properties.abilities) }
  function getAbility(ability) { return getAbilities()[ability] }
  function getEquipments() { return get(properties.equipments) }

  function setName(name) { set({ [properties.name]: name }) }
  function setExperience(experienceValue) { set({ [properties.experience]: parseExperience(experienceValue) }) }
  function setOriginName(originName) { set({ [properties.originName]: originName }) }
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
  }
  function setAlignment(alignment) {
    set({ [properties.alignment]: alignment })
  }
  function setSizeCategory(sizeCategory) {
    set({ [properties.sizeCategory]: parseSizeCategory(sizeCategory) })
  }
  function setSize(size) {
    set({ [properties.size]: parseIntegerField('size', size, { min: 0 }) })
  }
  function setHitPointCurrent(hitPointCurrent) {
    set({ [properties.hitPointCurrent]: parseIntegerField('hitPointCurrent', hitPointCurrent, { min: 0 }) })
  }
  function setHitPointTemp(hitPointTemp) {
    set({ [properties.hitPointTemp]: parseIntegerField('hitPointTemp', hitPointTemp, { min: 0 }) })
  }
  function setDeathSaves(deathSaves) {
    set({ [properties.deathSaves]: parseDeathSaves(deathSaves) })
  }

  function setAbilityScore(ability, score) {
    set(new Map([[[properties.abilities, ability], parseIntegerField('abilityScore', score, { min: 1 })]]))
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
    getHitPointCurrent,
    getHitPointTemp,
    getDeathSaves,
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
    setAlignment,
    setSizeCategory,
    setSize,
    setHitPointCurrent,
    setHitPointTemp,
    setDeathSaves,
    setAbilityScore,
    setChoiceSelections,

    onAny: store.onAny,
    onMap: store.onMap,
  }
}

export default createCharSheetStorageStore()
