import getClassData from '../data/classes.js'
import getOriginData from '../data/origins.js'
import getSpeciesData from '../data/species.js'
import { ABILITIES, DICE, EFFECTS } from '../common.js'
import { EQUIPED_CATEGORY } from '../data/equipments.js'
import { getLevelFromExperience } from '../data/leveling.js'
import createStore from '../createStore.js'
import authorityStore from './charSheet.authority.store.js'
import createEventBus from '../createEventBus.js'
import { getSelectorKey } from '../services/choice.helper.js'
import properties from './charSheet.derived.properties.js'
import initialData from './charSheet.derived.initial.js'
import {
  applyEffect, applyEffects, computeEquiped, computeModifiers,
  computePassivePerception, computeProficiencyBonus,
  computeSaves, computeSkills, computeSpeed
} from './charSheet.derived.helpers.js'

function createCharSheetStore() {
  const store = createStore(initialData, createEventBus())
  const { get, set, } = store

  function computeName() {
    set({ [properties.name]: authorityStore.getName() })
  }

  function computeExperience() {
    const modifiers = getModifiers()

    const experience = authorityStore.getExperience()
    const level = getLevelFromExperience(experience)
    const proficiencyBonus = computeProficiencyBonus(level)
    const classData = getClassData(authorityStore.getClassName(), authorityStore.getSubClassName(), level)
    const speciesData = getSpeciesData(authorityStore.getSpeciesName(), level)
    const saves = computeSaves(authorityStore.getAbilities(), modifiers, classData, proficiencyBonus)
    const speed = computeSpeed({
      speciesData,
      classData,
      equiped: getEquiped(),
      feats: getFeats(),
      strength: authorityStore.getAbility(ABILITIES.strength),
    })
    const skills = computeSkills(
      proficiencyBonus,
      modifiers,
      getOrigin(),
      getChoiceSelections(),
    )
    const passivePerception = computePassivePerception(skills)

    set({
      [properties.experience]: experience,
      [properties.level]: level,
      [properties.proficiencyBonus]: proficiencyBonus,
      [properties.class]: classData,
      [properties.species]: speciesData,
      [properties.saves]: saves,
      [properties.speed]: speed,
      [properties.passivePerception]: passivePerception,
      [properties.skills]: skills,
    })
  }

  function computeClass() {
    const classData = getClassData(authorityStore.getClassName(), authorityStore.getSubClassName(), getLevel())
    const speed = computeSpeed({
      speciesData: getSpecies(),
      classData,
      equiped: getEquiped(),
      feats: getFeats(),
      strength: authorityStore.getAbility(ABILITIES.strength),
    })
    set({
      [properties.className]: authorityStore.getClassName(),
      [properties.subClassName]: authorityStore.getSubClassName(),
      [properties.class]: classData,
      [properties.saves]: computeSaves(authorityStore.getAbilities(), getModifiers(), classData, getProficiencyBonus()),
      [properties.speed]: speed,
    })
  }

  function computeSpecies() {
    const speciesData = getSpeciesData(authorityStore.getSpeciesName(), getLevel())
    const speed = computeSpeed({
      speciesData,
      classData: getClass(),
      equiped: getEquiped(),
      feats: getFeats(),
      strength: authorityStore.getAbility(ABILITIES.strength),
    })
    set({
      [properties.speciesName]: authorityStore.getSpeciesName(),
      [properties.species]: speciesData,
      [properties.speed]: speed,
    })

    // TODO: Handle what changed on species changed
  }

  function computeAlignment() {
    set({ [properties.alignment]: authorityStore.getAlignment() })
  }

  function computeSizeCategory() {
    set({ [properties.sizeCategory]: authorityStore.getSizeCategory() })
  }

  function computeSize() {
    set({ [properties.size]: authorityStore.getSize() })
  }

  function computeHitPointCurrent() {
    set({ [properties.hitPointCurrent]: authorityStore.getHitPointCurrent() })
  }

  function computeHitPointTemp() {
    set({ [properties.hitPointTemp]: authorityStore.getHitPointTemp() })
  }

  function computeDeathSaves() {
    set({ [properties.deathSaves]: authorityStore.getDeathSaves() })
  }

  // TODO: remove and implement in each listeners
  function computeChoicesState() {
    const level = getLevelFromExperience(authorityStore.getExperience())
    const proficiencyBonus = computeProficiencyBonus(level)
    const originData = getOriginData(authorityStore.getOriginName())
    const choiceSelections = authorityStore.getChoiceSelections()
    const skills = computeSkills(
      proficiencyBonus,
      getModifiers(),
      originData,
      choiceSelections,
    )
    const passivePerception = computePassivePerception(skills)

    set({
      [properties.choiceSelections]: choiceSelections,
      [properties.passivePerception]: passivePerception,
      [properties.skills]: skills,
    })
  }

  function computeOrigin() {
    const originData = getOriginData(authorityStore.getOriginName())
    const skills = computeSkills(
      getProficiencyBonus(),
      getModifiers(),
      originData,
      getChoiceSelections(),
    )
    const passivePerception = computePassivePerception(skills)
    set({
      [properties.originName]: authorityStore.getOriginName(),
      [properties.origin]: originData,
      [properties.passivePerception]: passivePerception,
      [properties.skills]: skills,
    })

    // TODO: handle skill from origin ?
    // TODO: remove also classSkills choosed due to conflicts with origin ones
  }

  function computeAbilities() {
    const abilities = authorityStore.getAbilities()
    const modifiers = computeModifiers(abilities)
    const saves = computeSaves(abilities, modifiers, getClass(), getProficiencyBonus())
    const initiative = modifiers[ABILITIES.dexterity]
    const speed = computeSpeed({
      speciesData: getSpecies(),
      classData: getClass(),
      equiped: getEquiped(),
      feats: getFeats(),
      strength: abilities[ABILITIES.strength],
    })
    const skills = computeSkills(
      getProficiencyBonus(),
      modifiers,
      getOrigin(),
      getChoiceSelections(),
    )
    const passivePerception = computePassivePerception(skills)
    set({
      [properties.abilities]: abilities,
      [properties.modifiers]: modifiers,
      [properties.saves]: saves,
      [properties.initiative]: initiative,
      [properties.speed]: speed,
      [properties.passivePerception]: passivePerception,
      [properties.skills]: skills,
    })
  }

  function computeEquipments() {
    const equiped = computeEquiped(authorityStore.getEquipments())
    const speed = computeSpeed({
      speciesData: getSpecies(),
      classData: getClass(),
      equiped,
      feats: getFeats(),
      strength: authorityStore.getAbility(ABILITIES.strength),
    })
    set({
      [properties.equipments]: authorityStore.getEquipments(),
      [properties.equiped]: equiped,
      [properties.speed]: speed,
    })
  }

  authorityStore.onMap({
    [properties.name]: [computeName],
    [properties.experience]: [computeExperience, computeChoicesState],
    [properties.originName]: [computeOrigin, computeChoicesState],
    [properties.className]: [computeClass, computeChoicesState],
    [properties.subClassName]: [computeClass, computeChoicesState],
    [properties.speciesName]: [computeSpecies],
    [properties.alignment]: [computeAlignment],
    [properties.sizeCategory]: [computeSizeCategory],
    [properties.size]: [computeSize],
    [properties.hitPointCurrent]: [computeHitPointCurrent],
    [properties.hitPointTemp]: [computeHitPointTemp],
    [properties.deathSaves]: [computeDeathSaves],
    [properties.choiceSelections]: [computeChoicesState],
    [properties.abilities]: [computeAbilities],
    [properties.equipments]: [computeEquipments],
  });

  (function initState() {
    const experience = authorityStore.getExperience()
    const level = getLevelFromExperience(experience)
    const classData = getClassData(authorityStore.getClassName(), authorityStore.getSubClassName(), level)
    const originData = getOriginData(authorityStore.getOriginName())
    const speciesData = getSpeciesData(authorityStore.getSpeciesName(), level)
    const modifiers = computeModifiers(authorityStore.getAbilities())
    const proficiencyBonus = computeProficiencyBonus(level)
    const choiceSelections = authorityStore.getChoiceSelections()
    const saves = computeSaves(authorityStore.getAbilities(), modifiers, classData, proficiencyBonus)
    const initiative = modifiers[ABILITIES.dexterity]
    const equiped = computeEquiped(authorityStore.getEquipments())
    const speed = computeSpeed({
      speciesData,
      classData,
      equiped,
      feats: initialData[properties.feats],
      strength: authorityStore.getAbility(ABILITIES.strength),
    })
    const skills = computeSkills(
      proficiencyBonus,
      modifiers,
      originData,
      choiceSelections,
    )
    const passivePerception = computePassivePerception(skills)

    set({
      [properties.name]: authorityStore.getName(),
      [properties.experience]: experience,
      [properties.className]: authorityStore.getClassName(),
      [properties.subClassName]: authorityStore.getSubClassName(),
      [properties.originName]: authorityStore.getOriginName(),
      [properties.speciesName]: authorityStore.getSpeciesName(),
      [properties.alignment]: authorityStore.getAlignment(),
      [properties.sizeCategory]: authorityStore.getSizeCategory(),
      [properties.size]: authorityStore.getSize(),
      [properties.hitPointCurrent]: authorityStore.getHitPointCurrent(),
      [properties.hitPointTemp]: authorityStore.getHitPointTemp(),
      [properties.deathSaves]: authorityStore.getDeathSaves(),
      [properties.abilities]: authorityStore.getAbilities(),
      [properties.choiceSelections]: choiceSelections,
      [properties.equipments]: authorityStore.getEquipments(),

      [properties.level]: level,
      [properties.proficiencyBonus]: proficiencyBonus,
      [properties.initiative]: initiative,
      [properties.class]: classData,
      [properties.origin]: originData,
      [properties.species]: speciesData,
      [properties.modifiers]: modifiers,
      [properties.saves]: saves,
      [properties.speed]: speed,
      [properties.passivePerception]: passivePerception,
      [properties.skills]: skills,
      // TODO: init feats here
      [properties.equiped]: equiped,
    })
  })()

  function getLevel() { return get(properties.level) }
  function getProficiencyBonus() { return get(properties.proficiencyBonus) }
  function getClass() { return get(properties.class) }
  function getOrigin() { return get(properties.origin) }
  function getSpecies() { return get(properties.species) }
  function getSkills() { return get(properties.skills) }
  function getSkill(skill) { return getSkills()?.[skill] }
  function getChoiceSelections() { return get(properties.choiceSelections) }
  function getModifiers() { return get(properties.modifiers) }
  function getModifier(ability) { return getModifiers()[ability] }
  function getSaves() { return get(properties.saves) }
  function getSave(ability) { return getSaves()[ability] }
  function getInitiative() { return get(properties.initiative) }
  function getPassivePerception() { return get(properties.passivePerception) }

  function getEquiped(category = null) { return category ? get(properties.equiped)[category] : get(properties.equiped) }
  function getFeats() { return get(properties.feats) }

  function getSpeed() { return get(properties.speed) }

  function getWeaponProficiencies() { // TODO: move to set state
    const proficienciesByCategory = getClass()?.weaponProficiencies ?? {}
    const isEnumerable = Object.prototype.propertyIsEnumerable
    const proficiencies = []

    for (const category of Reflect.ownKeys(proficienciesByCategory)) {
      if (!isEnumerable.call(proficienciesByCategory, category)) continue
      proficiencies.push([].concat(category, proficienciesByCategory[category]))
    }

    return proficiencies
  }

  function getArmorProficiencies() {
    // TODO: armor category check ?
    // TODO: armor has malus effect if equiped without proficiency - display it
    const classArmorProficiencies = getClass()?.armorProficiencies
    applyEffects(getFeats(), EFFECTS.HasArmorProficiencyEffect, {}, result => classArmorProficiencies.push(result))
    return classArmorProficiencies
  }
  function getShieldProficiency() {
    return (getClass()?.shieldProficiency ?? false)
      || (getFeats()?.some(feat => feat?.effects?.[EFFECTS.HasShieldProficiencyEffect]))
  }

  /* TODO: update if
   *  - armor equipped
   *  - Shield equipped
   *  - levelUp ?
   *  - traits - features changed (according to levelUp or GM)
   *  - magic items equipped
   *  - magic item attuned
   */
  function getArmorClass() {
    const modifiers = getModifiers()
    const equipedArmor = getEquiped(EQUIPED_CATEGORY.ARMOR)
    const equipedShield = getEquiped(EQUIPED_CATEGORY.SHIELD)
    const hasShieldProficiency = getShieldProficiency()

    // Set default AC P.42
    let ac = 10 + modifiers[ABILITIES.dexterity]

    // Apply Armors P.220
    // TODO: Test armor without override feature
    applyEffect(equipedArmor, EFFECTS.ACOverrideEffect, { modifiers }, result => ac = result)

    // Apply class features effects
    applyEffects(getClass()?.features, EFFECTS.ACOverrideEffect, { ac, equipedArmor, equipedShield, modifiers }, result => ac = result)

    // Apply feats modifier
    // TODO: Never tested
    // si armure - char has feat (don P.210) Defense = +1
    applyEffects(getFeats(), EFFECTS.ACModifierEffect, { ac, equipedArmor, equipedShield, }, result => ac = result)

    // Apply Shield modifier
    // TODO: Test it
    applyEffect(equipedShield, EFFECTS.ACModifierEffect, { ac, hasShieldProficiency, }, result => ac = result)

    // Apply other equiped effect
    applyEffects(getEquiped(EQUIPED_CATEGORY.OTHER), EFFECTS.ACModifierEffect, { ac, equipedArmor, equipedShield, }, result => ac = result)

    return ac
  }

  function getHitPointMax() {
    const constitution = getModifier(ABILITIES.constitution)
    const hpBase = (getClass()?.hitPointMax.base ?? 0) + constitution // P.41
    const hpPerLevel = (getClass()?.hitPointMax.addPerLevel ?? 0) + constitution
    const additionalHp = hpPerLevel * (getLevel() - 1) // P.43
    return hpBase + additionalHp
  }

  function getHitDiceMax() { return DICE(getLevel(), getClass()?.hitDice ?? 100) }

  function getChoicePayload(selector) {
    return getChoiceSelections()[getSelectorKey(selector)]?.payload ?? null
  }

  function setPayloadToSelection(choice, payload) {
    const selectionKey = getSelectorKey(choice.selector)
    const selections = getChoiceSelections()

    // TODO: settings choice selection should trigger target update (emit) to refresh
    authorityStore.setChoiceSelections({
      ...selections,
      [selectionKey]: { choice, payload },
    })
  }

  return {
    getName: () => get(properties.name),
    getExperience: () => get(properties.experience),
    getOriginName: () => get(properties.originName),
    getClassName: () => get(properties.className),
    getSubClassName: () => get(properties.subClassName),
    getSpeciesName: () => get(properties.speciesName),
    getAlignment: () => get(properties.alignment),
    getSizeCategory: () => get(properties.sizeCategory),
    getSize: () => get(properties.size),
    getHitPointCurrent: () => get(properties.hitPointCurrent),
    getHitPointTemp: () => get(properties.hitPointTemp),
    getDeathSaves: () => get(properties.deathSaves),
    getAbility: authorityStore.getAbility,

    getLevel,
    getProficiencyBonus,
    getClass,
    getOrigin,
    getSpecies,
    getChoiceSelections, getChoicePayload,
    getModifier,
    getSave,
    getSkills,
    getSkill,
    getEquiped,
    getInitiative,
    getSpeed,
    getPassivePerception,
    getWeaponProficiencies,
    getArmorProficiencies,
    getShieldProficiency,
    getArmorClass,
    getHitPointMax,
    getHitDiceMax,

    setName: authorityStore.setName,
    setExperience: authorityStore.setExperience,
    setOriginName: authorityStore.setOriginName,
    setClassName: authorityStore.setClassName,
    setSubClassName: authorityStore.setSubClassName,
    setSpeciesName: authorityStore.setSpeciesName,
    setAlignment: authorityStore.setAlignment,
    setSizeCategory: authorityStore.setSizeCategory,
    setSize: authorityStore.setSize,
    setHitPointCurrent: authorityStore.setHitPointCurrent,
    setHitPointTemp: authorityStore.setHitPointTemp,
    setDeathSaves: authorityStore.setDeathSaves,
    setAbilityScore: authorityStore.setAbilityScore,

    getChoicePayload, setPayloadToSelection,

    on: store.on,
    onMany: store.onMany,
    onMap: store.onMap,
  }
}

export default createCharSheetStore()
