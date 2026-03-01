import createStore from '../createStore.js'
import createEventBus from '../createEventBus.js'
import { InvalidCharacterFieldError, createCustomError, errorKeys } from '../errors.js'
import { SELECTOR_TYPE } from '../services/choice.helper.js'
import properties from './charSheet.authority.properties.js'
import initialData from './charSheet.authority.initial.js'
import { computeEquipmentAttribute, parseDeathSaves, parseExperience, parseIntegerField, parseSizeCategory } from './charSheet.authority.helpers.js'
import { getEquipment } from '../data/equipments.js'

function createCharSheetStorageStore() {
  const store = createStore(initialData, createEventBus())
  const { get, set, } = store

  function init(charData = {}) {
    const abilities = charData[properties.abilities] || initialData[properties.abilities]
    const equipments = charData[properties.equipments] || initialData[properties.equipments]
    if (typeof abilities !== "object"
      || Object.getPrototypeOf(abilities) !== Object.prototype) {
      throw InvalidCharacterFieldError('abilities', 'Expected an object')
    }

    if (equipments.some(equipment => typeof equipment.name !== 'symbol' || !equipment.id))
      throw createCustomError({
        name: 'CharacterEquipmentsError',
        code: errorKeys.character.malformedEquipments,
      })

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
      [properties.equipments]: equipments,
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

  function setEquipments(equipments) {
    set({ [properties.equipments]: equipments })
  }

  function addEquipment(name) {
    if (!getEquipment(name)) throw InvalidCharacterFieldError('equipment.name', `Unknown equipment '${String(name)}'`)

    setEquipments(getEquipments().concat({
      id: crypto.randomUUID(),
      name,
    }))
  }

  function removeEquipment(id) {
    if (!id)
      throw InvalidCharacterFieldError('equipments.id', 'Missing id')

    if (!getEquipments().some(equipment => equipment.id === id))
      throw InvalidCharacterFieldError('equipments.id', `Unknown id '${id}'`)

    setEquipments(getEquipments().filter(equipment => equipment.id !== id))
  }

  function setEquipmentAttribute(id, attribute, value) {
    const equipments = getEquipments()
    const equipment = computeEquipmentAttribute(id, equipments, attribute, value)
    setEquipments(equipments.map(item => item.id === equipment.id ? equipment : item))
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
    addEquipment,
    removeEquipment,
    setEquipmentAttribute,

    onAny: store.onAny,
    onMap: store.onMap,
  }
}

export default createCharSheetStorageStore()
