import getClassData from '../data/classes.js'
import getOriginData from '../data/origins.js'
import getSpeciesData from '../data/species.js'
import { ABILITIES, DICE, EFFECTS, SKILL_ABILITY, SKILLS } from '../common.js'
import { EQUIPED_CATEGORY, EQUIPMENT_TYPE, getEquipment } from '../data/equipments.js'
import { getLevelFromExperience } from '../data/leveling.js'
import { s } from '../helpers.js'
import createStore from '../createStore.js'
import authorityStore, { initialData as authorityInitialData } from './charSheet.authority.store.js'
import createEventBus from '../createEventBus.js'
import { getSelectorKey } from '../services/choice.helper.js'
import properties from './charSheet.derived.properties.js'

const initialData = {
  ...authorityInitialData,
  [properties.level]: 1,
  [properties.proficiencyBonus]: 0,
  [properties.skills]: {},
  [properties.initiative]: 0,
  [properties.speed]: 10,
  [properties.passivePerception]: 10,
  [properties.class]: null,
  [properties.origin]: null,
  [properties.species]: null,
  [properties.modifiers]: s({
    [ABILITIES.strength]: 0,
    [ABILITIES.dexterity]: 0,
    [ABILITIES.constitution]: 0,
    [ABILITIES.wisdom]: 0,
    [ABILITIES.intelligence]: 0,
    [ABILITIES.charisma]: 0,
  }),
  [properties.saves]: s({
    [ABILITIES.strength]: 0,
    [ABILITIES.dexterity]: 0,
    [ABILITIES.constitution]: 0,
    [ABILITIES.wisdom]: 0,
    [ABILITIES.intelligence]: 0,
    [ABILITIES.charisma]: 0,
  }),
  [properties.feats]: [],
  [properties.equiped]: s({
    [EQUIPED_CATEGORY.WEAPON]: [],
    [EQUIPED_CATEGORY.ARMOR]: null,
    [EQUIPED_CATEGORY.SHIELD]: null,
    [EQUIPED_CATEGORY.OTHER]: [],
  }),
}

function applyEffect(item, effect, options, callback) {
  if (item?.effects?.[effect]
    && (item.effects[effect]?.condition?.call(item, options ?? true))) {
    callback(item.effects[effect].apply.call(item, options))
  }
}

function applyEffects(list, effect, options, callback) {
  list?.forEach(item => applyEffect(item, effect, options, callback))
}

function computeProficiencyBonus(level = 0) {
  return Math.floor((level - 1) / 4) + 2
}

function computeAbilityModifier(score) {
  return Math.floor(score / 2) - 5
}

function computeModifiers(abilities) {
  const isEnumerable = Object.prototype.propertyIsEnumerable
  const modifiers = {}

  for (const ability of Reflect.ownKeys(abilities)) {
    if (!isEnumerable.call(abilities, ability)) continue
    modifiers[ability] = computeAbilityModifier(abilities[ability])
  }

  return modifiers
}

function computeSaves(abilities, modifiers, classData, proficiencyBonus) {
  const isEnumerable = Object.prototype.propertyIsEnumerable
  const saves = {}

  for (const ability of Reflect.ownKeys(abilities)) {
    if (!isEnumerable.call(abilities, ability)) continue
    saves[ability] = modifiers[ability] + (classData?.saves?.includes(ability) ? proficiencyBonus : 0)
  }

  return saves
}

// TODO: take armor strength + update on armor change
function computeSpeed({
  speciesData,
  classData,
  equiped,
  feats = [],
  strength,
}) {
  let speed = speciesData?.speed || 0
  const equipedArmor = equiped?.[EQUIPED_CATEGORY.ARMOR]
  const equipedShield = equiped?.[EQUIPED_CATEGORY.SHIELD]

  applyEffect(classData, EFFECTS.SpeedModifierEffect, { speed, equipedArmor, equipedShield }, result => speed = result)

  // Heavy rule
  if (equipedArmor?.strength
    && !feats.find(feat => feat?.effects?.[EFFECTS.ByPassArmorStrengthRequirementEffect])
    && equipedArmor.strength > strength) {
    speed += -3
  }

  return speed
}

function computePassivePerception(skills = {}) {
  return (skills?.[SKILLS.perception]?.score ?? 0) + 10
}

function computeSkills(proficiencyBonus, modifiers, originData, choiceSelections) {
  const originSkills = originData?.skills ?? []

  const selectedSkills = Object.values(choiceSelections)
    .filter(choiceSelection => choiceSelection?.choice?.target === properties.skills)
    .map(choiceSelection => choiceSelection.payload).flat()

  return s(Object.values(SKILLS).reduce((acc, skill) => {
    const isProficient = originSkills.includes(skill) || selectedSkills.includes(skill)
    const isExpert = false // TODO: derive from features/feats
    const proficiencyMultiplier = isProficient ? (isExpert ? 2 : 1) : 0
    acc[skill] = s({
      score: (modifiers?.[SKILL_ABILITY[skill]] ?? 0) + (proficiencyBonus * proficiencyMultiplier),
      checked: isProficient,
      expert: isExpert,
    })
    return acc
  }, {}))
}

function computeEquiped(equipments) {
  return equipments?.filter(equipment => equipment.equiped).reduce((acc, equipment) => {
    const equipmentComputed = Object.assign({}, getEquipment(equipment.name), equipment)

    switch (equipmentComputed.type) {
      case EQUIPMENT_TYPE.WEAPON: acc[EQUIPED_CATEGORY.WEAPON].push(equipmentComputed); break
      case EQUIPMENT_TYPE.ARMOR: acc[EQUIPED_CATEGORY.ARMOR] = equipmentComputed; break
      case EQUIPMENT_TYPE.SHIELD: acc[EQUIPED_CATEGORY.SHIELD] = equipmentComputed; break
      case EQUIPMENT_TYPE.MAGIC_ITEM:
        switch (equipmentComputed.equipOn) {
          case EQUIPED_CATEGORY.WEAPON: acc[EQUIPED_CATEGORY.WEAPON].push(equipmentComputed); break
          case EQUIPED_CATEGORY.ARMOR: acc[EQUIPED_CATEGORY.ARMOR] = equipmentComputed; break
          case EQUIPED_CATEGORY.SHIELD: acc[EQUIPED_CATEGORY.SHIELD] = equipmentComputed; break
          case EQUIPED_CATEGORY.OTHER: acc[EQUIPED_CATEGORY.OTHER].push(equipmentComputed); break
        }
        break
    }

    return acc
  }, {
    [EQUIPED_CATEGORY.WEAPON]: [],
    [EQUIPED_CATEGORY.ARMOR]: null,
    [EQUIPED_CATEGORY.SHIELD]: null,
    [EQUIPED_CATEGORY.OTHER]: [],
  })
}

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

    // TODO: Implement this later
    // setAlignment: savedStore.setAlignment,
    // setSizeCategory: savedStore.setSizeCategory,
    // setSize: savedStore.setSize,

    setName: authorityStore.setName,
    setExperience: authorityStore.setExperience,
    setOriginName: authorityStore.setOriginName,
    setClassName: authorityStore.setClassName,
    setSubClassName: authorityStore.setSubClassName,
    setSpeciesName: authorityStore.setSpeciesName,
    setAbilityScore: authorityStore.setAbilityScore,

    getChoicePayload, setPayloadToSelection,

    on: store.on,
    onMany: store.onMany,
    onMap: store.onMap,
  }
}

export default createCharSheetStore()
