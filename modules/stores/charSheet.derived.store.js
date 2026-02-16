import getClass from '../data/classes.js'
import getOrigin from '../data/origins.js'
import getSpecies from '../data/species.js'
import { ABILITIES, DICE, EFFECTS, getAbilityBySkill, validateSkill, SKILLS } from '../common.js'
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
  [properties.charLevel]: 1,
  [properties.proficiencyBonus]: 0,
  [properties.skills]: {},
  [properties.initiative]: 0,
  [properties.speed]: 10,
  [properties.passivePerception]: 10,
  [properties.charClass]: null,
  [properties.charOrigin]: null,
  [properties.charSpecies]: null,
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

function computeSaves(abilities, modifiers, charClass, proficiencyBonus) {
  const isEnumerable = Object.prototype.propertyIsEnumerable
  const saves = {}

  for (const ability of Reflect.ownKeys(abilities)) {
    if (!isEnumerable.call(abilities, ability)) continue
    saves[ability] = modifiers[ability] + (charClass?.saves?.includes(ability) ? proficiencyBonus : 0)
  }

  return saves
}

// TODO: take armor strength + update on armor change
function computeCharSpeed({
  charSpecies,
  charClass,
  equiped,
  feats = [],
  strength,
}) {
  let speed = charSpecies?.speed || 0
  const equipedArmor = equiped?.[EQUIPED_CATEGORY.ARMOR]
  const equipedShield = equiped?.[EQUIPED_CATEGORY.SHIELD]

  applyEffect(charClass, EFFECTS.SpeedModifierEffect, { speed, equipedArmor, equipedShield }, result => speed = result)

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

function computeSkills(proficiencyBonus, modifiers, charOrigin, choiceSelections) {
  const originSkills = charOrigin?.skills ?? []

  const selectedSkills = Object.values(choiceSelections)
    .filter(choiceSelection => choiceSelection?.choice?.target === properties.skills)
    .map(choiceSelection => choiceSelection.payload).flat()
    .map(validateSkill)

  return s(Object.values(SKILLS).reduce((acc, skill) => {
    const isProficient = originSkills.includes(skill) || selectedSkills.includes(skill)
    const isExpert = false // TODO: derive from features/feats
    const proficiencyMultiplier = isProficient ? (isExpert ? 2 : 1) : 0
    acc[skill] = s({
      score: (modifiers?.[getAbilityBySkill(skill)] ?? 0) + (proficiencyBonus * proficiencyMultiplier),
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

  function computeCharName() {
    set({ [properties.charName]: authorityStore.getCharName() })
  }

  function computeExperience() {
    const modifiers = getModifiers()

    const charExperience = authorityStore.getCharExperience()
    const charLevel = getLevelFromExperience(charExperience)
    const proficiencyBonus = computeProficiencyBonus(charLevel)
    const charClass = getClass(authorityStore.getCharClassName(), authorityStore.getCharSubClassName(), charLevel)
    const charSpecies = getSpecies(authorityStore.getCharSpeciesName(), charLevel)
    const saves = computeSaves(authorityStore.getAbilities(), modifiers, charClass, proficiencyBonus)
    const speed = computeCharSpeed({
      charSpecies,
      charClass,
      equiped: getEquiped(),
      feats: getFeats(),
      strength: authorityStore.getAbility(ABILITIES.strength),
    })
    const skills = computeSkills(
      proficiencyBonus,
      modifiers,
      getCharOrigin(),
      getChoiceSelections(),
    )
    const passivePerception = computePassivePerception(skills)

    set({
      [properties.charExperience]: charExperience,
      [properties.charLevel]: charLevel,
      [properties.proficiencyBonus]: proficiencyBonus,
      [properties.charClass]: charClass,
      [properties.charSpecies]: charSpecies,
      [properties.saves]: saves,
      [properties.speed]: speed,
      [properties.passivePerception]: passivePerception,
      [properties.skills]: skills,
    })
  }

  function computeClass() {
    const charClass = getClass(authorityStore.getCharClassName(), authorityStore.getCharSubClassName(), getCharLevel())
    const speed = computeCharSpeed({
      charSpecies: getCharSpecies(),
      charClass,
      equiped: getEquiped(),
      feats: getFeats(),
      strength: authorityStore.getAbility(ABILITIES.strength),
    })
    set({
      [properties.charClassName]: authorityStore.getCharClassName(),
      [properties.charSubClassName]: authorityStore.getCharSubClassName(),
      [properties.charClass]: charClass,
      [properties.saves]: computeSaves(authorityStore.getAbilities(), getModifiers(), charClass, getProficiencyBonus()),
      [properties.speed]: speed,
    })
  }

  function computeSpecies() {
    const charSpecies = getSpecies(authorityStore.getCharSpeciesName(), getCharLevel())
    const speed = computeCharSpeed({
      charSpecies,
      charClass: getCharClass(),
      equiped: getEquiped(),
      feats: getFeats(),
      strength: authorityStore.getAbility(ABILITIES.strength),
    })
    set({
      [properties.charSpeciesName]: authorityStore.getCharSpeciesName(),
      [properties.charSpecies]: charSpecies,
      [properties.speed]: speed,
    })
  }

  function computeAlignment() {
    set({ [properties.charAlignment]: authorityStore.getCharAlignment() })
  }

  function computeSizeCategory() {
    set({ [properties.charSizeCategory]: authorityStore.getCharSizeCategory() })
  }

  function computeSize() {
    set({ [properties.charSize]: authorityStore.getCharSize() })
  }

  // TODO: remove and implement in each listeners
  function computeChoicesState() {
    const charLevel = getLevelFromExperience(authorityStore.getCharExperience())
    const proficiencyBonus = computeProficiencyBonus(charLevel)
    const charOrigin = getOrigin(authorityStore.getCharOriginName())
    const choiceSelections = authorityStore.getChoiceSelections()
    const skills = computeSkills(
      proficiencyBonus,
      getModifiers(),
      charOrigin,
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
    const charOrigin = getOrigin(authorityStore.getCharOriginName())
    const skills = computeSkills(
      getProficiencyBonus(),
      getModifiers(),
      charOrigin,
      getChoiceSelections(),
    )
    const passivePerception = computePassivePerception(skills)
    set({
      [properties.charOriginName]: authorityStore.getCharOriginName(),
      [properties.charOrigin]: charOrigin,
      [properties.passivePerception]: passivePerception,
      [properties.skills]: skills,
    })
  }

  function computeAbilities() {
    const abilities = authorityStore.getAbilities()
    const modifiers = computeModifiers(abilities)
    const saves = computeSaves(abilities, modifiers, getCharClass(), getProficiencyBonus())
    const initiative = modifiers[ABILITIES.dexterity]
    const speed = computeCharSpeed({
      charSpecies: getCharSpecies(),
      charClass: getCharClass(),
      equiped: getEquiped(),
      feats: getFeats(),
      strength: abilities[ABILITIES.strength],
    })
    const skills = computeSkills(
      getProficiencyBonus(),
      modifiers,
      getCharOrigin(),
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
    const speed = computeCharSpeed({
      charSpecies: getCharSpecies(),
      charClass: getCharClass(),
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
    [properties.charName]: [computeCharName],
    [properties.charExperience]: [computeExperience, computeChoicesState],
    [properties.charOriginName]: [computeOrigin, computeChoicesState],
    [properties.charClassName]: [computeClass, computeChoicesState],
    [properties.charSubClassName]: [computeClass, computeChoicesState],
    [properties.charSpeciesName]: [computeSpecies],
    [properties.charAlignment]: [computeAlignment],
    [properties.charSizeCategory]: [computeSizeCategory],
    [properties.charSize]: [computeSize],
    [properties.choiceSelections]: [computeChoicesState],
    [properties.abilities]: [computeAbilities],
    [properties.equipments]: [computeEquipments],
  });

  (function initState() {
    const charExperience = authorityStore.getCharExperience()
    const charLevel = getLevelFromExperience(charExperience)
    const charClass = getClass(authorityStore.getCharClassName(), authorityStore.getCharSubClassName(), charLevel)
    const charOrigin = getOrigin(authorityStore.getCharOriginName())
    const charSpecies = getSpecies(authorityStore.getCharSpeciesName(), charLevel)
    const modifiers = computeModifiers(authorityStore.getAbilities())
    const proficiencyBonus = computeProficiencyBonus(charLevel)
    const choiceSelections = authorityStore.getChoiceSelections()
    const saves = computeSaves(authorityStore.getAbilities(), modifiers, charClass, proficiencyBonus)
    const initiative = modifiers[ABILITIES.dexterity]
    const equiped = computeEquiped(authorityStore.getEquipments())
    const speed = computeCharSpeed({
      charSpecies,
      charClass,
      equiped,
      feats: initialData[properties.feats],
      strength: authorityStore.getAbility(ABILITIES.strength),
    })
    const skills = computeSkills(
      proficiencyBonus,
      modifiers,
      charOrigin,
      choiceSelections,
    )
    const passivePerception = computePassivePerception(skills)

    set({
      [properties.charName]: authorityStore.getCharName(),
      [properties.charExperience]: charExperience,
      [properties.charClassName]: authorityStore.getCharClassName(),
      [properties.charSubClassName]: authorityStore.getCharSubClassName(),
      [properties.charOriginName]: authorityStore.getCharOriginName(),
      [properties.charSpeciesName]: authorityStore.getCharSpeciesName(),
      [properties.charAlignment]: authorityStore.getCharAlignment(),
      [properties.charSizeCategory]: authorityStore.getCharSizeCategory(),
      [properties.charSize]: authorityStore.getCharSize(),
      [properties.abilities]: authorityStore.getAbilities(),
      [properties.choiceSelections]: choiceSelections,
      [properties.equipments]: authorityStore.getEquipments(),

      [properties.charLevel]: charLevel,
      [properties.proficiencyBonus]: proficiencyBonus,
      [properties.initiative]: initiative,
      [properties.charClass]: charClass,
      [properties.charOrigin]: charOrigin,
      [properties.charSpecies]: charSpecies,
      [properties.modifiers]: modifiers,
      [properties.saves]: saves,
      [properties.speed]: speed,
      [properties.passivePerception]: passivePerception,
      [properties.skills]: skills,
      // TODO: init feats here
      [properties.equiped]: equiped,
    })
  })()

  function getCharLevel() { return get(properties.charLevel) }
  function getProficiencyBonus() { return get(properties.proficiencyBonus) }
  function getCharClass() { return get(properties.charClass) }
  function getCharOrigin() { return get(properties.charOrigin) }
  function getCharSpecies() { return get(properties.charSpecies) }
  function getSkills() { return get(properties.skills) }
  function getSkill(skill) { return getSkills()?.[validateSkill(skill)] }
  function getChoiceSelections() { return get(properties.choiceSelections) }
  function getModifiers() { return get(properties.modifiers) }
  function getModifier(ability) { return getModifiers()[ability] }
  function getSaves() { return get(properties.saves) }
  function getSave(ability) { return getSaves()[ability] }
  function getInitiative() { return get(properties.initiative) }
  function getPassivePerception() { return get(properties.passivePerception) }

  function getEquiped(category = null) { return category ? get(properties.equiped)[category] : get(properties.equiped) }
  function getFeats() { return get(properties.feats) }

  function getCharSpeed() { return get(properties.speed) }

  function getWeaponProficiencies() { // TODO: maitrise d'armes
    const proficienciesByCategory = getCharClass()?.weaponProficiencies ?? {}
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
    const classArmorProficiencies = getCharClass()?.armorProficiencies
    applyEffects(getFeats(), EFFECTS.HasArmorProficiencyEffect, {}, result => classArmorProficiencies.push(result))
    return classArmorProficiencies
  }
  function getShieldProficiency() {
    return (getCharClass()?.shieldProficiency ?? false)
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
    applyEffects(getCharClass()?.features, EFFECTS.ACOverrideEffect, { ac, equipedArmor, equipedShield, modifiers }, result => ac = result)

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
    const hpBase = (getCharClass()?.hitPointMax.base ?? 0) + constitution // P.41
    const hpPerLevel = (getCharClass()?.hitPointMax.addPerLevel ?? 0) + constitution
    const additionalHp = hpPerLevel * (getCharLevel() - 1) // P.43
    return hpBase + additionalHp
  }

  function getHitDiceMax() { return DICE(getCharLevel(), getCharClass()?.hitDice ?? 100) }

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
    getCharName: () => get(properties.charName),
    getCharExperience: () => get(properties.charExperience),
    getCharOriginName: () => get(properties.charOriginName),
    getCharClassName: () => get(properties.charClassName),
    getCharSubClassName: () => get(properties.charSubClassName),
    getCharSpeciesName: () => get(properties.charSpeciesName),
    getCharAlignment: () => get(properties.charAlignment),
    getCharSizeCategory: () => get(properties.charSizeCategory),
    getCharSize: () => get(properties.charSize),
    getAbility: authorityStore.getAbility,

    getCharLevel,
    getProficiencyBonus,
    getCharClass,
    getCharOrigin,
    getCharSpecies,
    getChoiceSelections, getChoicePayload,
    getModifier,
    getSave,
    getSkills,
    getSkill,
    getEquiped,
    getInitiative,
    getCharSpeed,
    getPassivePerception,
    getWeaponProficiencies,
    getArmorProficiencies,
    getShieldProficiency,
    getArmorClass,
    getHitPointMax,
    getHitDiceMax,

    // TODO: Implement this later
    // setCharAlignment: savedStore.setCharAlignment,
    // setCharSizeCategory: savedStore.setCharSizeCategory,
    // setCharSize: savedStore.setCharSize,

    setCharName: authorityStore.setCharName,
    setCharExperience: authorityStore.setCharExperience,
    setCharOriginName: authorityStore.setCharOriginName,
    setCharClassName: authorityStore.setCharClassName,
    setCharSubClassName: authorityStore.setCharSubClassName,
    setCharSpeciesName: authorityStore.setCharSpeciesName,
    setAbilityScore: authorityStore.setAbilityScore,

    getChoicePayload, setPayloadToSelection,

    on: store.on,
    onMany: store.onMany,
    onMap: store.onMap,
  }
}

export default createCharSheetStore()
