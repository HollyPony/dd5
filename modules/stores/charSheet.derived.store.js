import getClass from '../data/classes.js'
import getOrigin from '../data/origins.js'
import getSpecies from '../data/species.js'
import { ABILITY, DICE, EFFECT, SKILLS } from '../common.js'
import { EQUIPED_CATEGORY, EQUIPMENT_TYPE, getEquipment } from '../data/equipments.js'
import { getLevelFromExperience } from '../data/leveling.js'
import { s } from '../helpers.js'
import createStore from '../createStore.js'
import authorityStore, { initialData as authorityInitialData, properties as authorityProperties } from './charSheet.authority.store.js'
import createEventBus from '../createEventBus.js'

export const properties = s(Object.assign({
  charLevel: 'charLevel', // Sym ?
  proficiencyBonus: 'proficiencyBonus', // Sym ?
  initiative: 'initiative', // Sym ?
  charClass: 'charClass', // Sym ?
  charOrigin: 'charOrigin', // Sym ?
  charSpecies: 'charSpecies', // Sym ?
  modifiers: 'modifiers', // Sym ?
  saves: 'saves', // Sym ?
  feats: 'feats', // Sym ?
  equiped: 'equiped', // Sym ?
}, authorityProperties))

const initialData = {
  ...authorityInitialData,
  [properties.charLevel]: 1,
  [properties.proficiencyBonus]: 0,
  [properties.initiative]: 0,
  [properties.charClass]: null,
  [properties.charOrigin]: null,
  [properties.charSpecies]: null,
  [properties.modifiers]: s({
    [ABILITY.strength]: 0,
    [ABILITY.dexterity]: 0,
    [ABILITY.constitution]: 0,
    [ABILITY.wisdom]: 0,
    [ABILITY.intelligence]: 0,
    [ABILITY.charisma]: 0,
  }),
  [properties.saves]: s({
    [ABILITY.strength]: 0,
    [ABILITY.dexterity]: 0,
    [ABILITY.constitution]: 0,
    [ABILITY.wisdom]: 0,
    [ABILITY.intelligence]: 0,
    [ABILITY.charisma]: 0,
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

function computeModifiers(attributes) {
  return Object.entries(attributes)
    .reduce((acc, [ability, score]) =>
      Object.assign({}, acc, { [ability]: computeAbilityModifier(score) }), {})
}

function computeSaves(attributes, modifiers, charClass, proficiencyBonus) {
  return Object.keys(attributes)
    .reduce((acc, ability) =>
      Object.assign({}, acc, {
        [ability]: modifiers[ability] + (charClass?.saves?.includes(ability) ? proficiencyBonus : 0)
      }), {})
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

  function _computeSkillScore(skill) {
    const isProficient = isCheckedSkill(skill)
    const isExpert = isExpertSkill(skill)
    const proficiencyMultiplier = isProficient ? (isExpert ? 2 : 1) : 0
    return getModifier(skill.ability) + (getProficiencyBonus() * proficiencyMultiplier)
  }

  function computeCharName() {
    set({ [properties.charName]: authorityStore.getCharName() })
  }

  function computeExperience() {
    const charExperience = authorityStore.getCharExperience()
    const charLevel = getLevelFromExperience(charExperience)
    const proficiencyBonus = computeProficiencyBonus(charLevel)
    const charClass = getClass(authorityStore.getCharClassName(), authorityStore.getCharSubClassName(), charLevel)
    const charSpecies = getSpecies(authorityStore.getCharSpeciesName(), charLevel)
    const saves = computeSaves(authorityStore.getAttributes(), getModifiers(), charClass, proficiencyBonus)

    set({
      [properties.charExperience]: charExperience,
      [properties.charLevel]: charLevel,
      [properties.proficiencyBonus]: proficiencyBonus,
      [properties.charClass]: charClass,
      [properties.charSpecies]: charSpecies,
      [properties.saves]: saves,
    })
  }

  function computeClass() {
    const charClass = getClass(authorityStore.getCharClassName(), authorityStore.getCharSubClassName(), getCharLevel())
    set({
      [properties.charClassName]: authorityStore.getCharClassName(),
      [properties.charSubClassName]: authorityStore.getCharSubClassName(),
      [properties.charClass]: charClass,
      [properties.saves]: computeSaves(authorityStore.getAttributes(), getModifiers(), charClass, getProficiencyBonus()),
    })
  }

  function computeSpecies() {
    set({
      [properties.charSpeciesName]: authorityStore.getCharSpeciesName(),
      [properties.charSpecies]: getSpecies(authorityStore.getCharSpeciesName(), getCharLevel())
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

  function computeClassSkills() {
    set({ [properties.classSkills]: authorityStore.getClassSkills() })
  }

  function computeExpertSkills() {
    set({ [properties.expertSkills]: authorityStore.getExpertSkills() })
  }

  function computeClassTools() {
    set({ [properties.classTools]: authorityStore.getClassTools() })
  }

  function computeOrigin() {
    set({
      [properties.charOriginName]: authorityStore.getCharOriginName(),
      [properties.charOrigin]: getOrigin(authorityStore.getCharOriginName())
    })
  }

  function computeAttributes() {
    const attributes = authorityStore.getAttributes()
    const modifiers = computeModifiers(attributes)
    const saves = computeSaves(attributes, modifiers, getCharClass(), getProficiencyBonus())
    const initiative = modifiers[ABILITY.dexterity]
    set({
      [properties.attributes]: attributes,
      [properties.modifiers]: modifiers,
      [properties.saves]: saves,
      [properties.initiative]: initiative
    })
  }

  function computeEquipments() {
    set({
      [properties.equipments]: authorityStore.getEquipments(),
      [properties.equiped]: computeEquiped(authorityStore.getEquipments())
    })
  }

  authorityStore.onMap({
    [properties.charName]: [computeCharName],
    [properties.charExperience]: [computeExperience],
    [properties.charOriginName]: [computeOrigin],
    [properties.charClassName]: [computeClass],
    [properties.charSubClassName]: [computeClass],
    [properties.charSpeciesName]: [computeSpecies],
    [properties.charAlignment]: [computeAlignment],
    [properties.charSizeCategory]: [computeSizeCategory],
    [properties.charSize]: [computeSize],
    [properties.classSkills]: [computeClassSkills],
    [properties.expertSkills]: [computeExpertSkills],
    [properties.classTools]: [computeClassTools],
    [properties.attributes]: [computeAttributes],
    [properties.equipments]: [computeEquipments],
  });

  (function initState() {
    const charLevel = getLevelFromExperience(authorityStore.getCharExperience())
    const charClass = getClass(authorityStore.getCharClassName(), authorityStore.getCharSubClassName(), charLevel)
    const modifiers = computeModifiers(authorityStore.getAttributes())
    const proficiencyBonus = computeProficiencyBonus(charLevel)
    const saves = computeSaves(authorityStore.getAttributes(), modifiers, charClass, proficiencyBonus)
    const initiative = modifiers[ABILITY.dexterity]

    set({
      [properties.charName]: authorityStore.getCharName(),
      [properties.charExperience]: authorityStore.getCharExperience(),
      [properties.charClassName]: authorityStore.getCharClassName(),
      [properties.charSubClassName]: authorityStore.getCharSubClassName(),
      [properties.charOriginName]: authorityStore.getCharOriginName(),
      [properties.charSpeciesName]: authorityStore.getCharSpeciesName(),
      [properties.charAlignment]: authorityStore.getCharAlignment(),
      [properties.charSizeCategory]: authorityStore.getCharSizeCategory(),
      [properties.charSize]: authorityStore.getCharSize(),
      [properties.attributes]: authorityStore.getAttributes(),
      [properties.classSkills]: authorityStore.getClassSkills(),
      [properties.expertSkills]: authorityStore.getExpertSkills(),
      [properties.classTools]: authorityStore.getClassTools(),
      [properties.equipments]: authorityStore.getEquipments(),

      [properties.charLevel]: charLevel,
      [properties.proficiencyBonus]: proficiencyBonus,
      [properties.initiative]: initiative,
      [properties.charClass]: charClass,
      [properties.charOrigin]: getOrigin(authorityStore.getCharOriginName()),
      [properties.charSpecies]: getSpecies(authorityStore.getCharSpeciesName(), charLevel),
      [properties.modifiers]: modifiers,
      [properties.saves]: saves,
      // TODO: init feats here
      [properties.equiped]: computeEquiped(authorityStore.getEquipments()),
    })
  })()

  function getCharLevel() { return get(properties.charLevel) }
  function getProficiencyBonus() { return get(properties.proficiencyBonus) }
  function getCharClass() { return get(properties.charClass) }
  function getCharOrigin() { return get(properties.charOrigin) }
  function getCharSpecies() { return get(properties.charSpecies) }
  function getModifiers() { return get(properties.modifiers) }
  function getModifier(ability) { return getModifiers()[ability] }
  function getSaves() { return get(properties.saves) }
  function getSave(ability) { return getSaves()[ability] }
  function getSkillScore(skill) { return _computeSkillScore(skill) }
  function getInitiative() { return get(properties.initiative) }
  function getPassivePerception() { return getSkillScore(SKILLS.perception) + 10 }

  function getEquiped(category = null) { return category ? get(properties.equiped)[category] : get(properties.equiped) }
  function getFeats() { return get(properties.feats) }

  // TODO: take armor strength + update on armor change
  function getCharSpeed() {
    let speed = getCharSpecies()?.speed || 0

    const equipedArmor = getEquiped(EQUIPED_CATEGORY.ARMOR)
    const equipedShield = getEquiped(EQUIPED_CATEGORY.SHIELD)
    const feats = getFeats() ?? []

    applyEffect(getCharClass(), EFFECT.SpeedModifierEffect, { speed, equipedArmor, equipedShield }, result => speed = result)

    // Heavy rule
    if (equipedArmor?.strength
      && !feats.find(feat => feat?.effect?.[EFFECT.ByPassArmorStrengthRequirement])
      && equipedArmor.strength > authorityStore.getAttribute(ABILITY.strength))
      speed += -3

    return speed
  }

  function getWeaponProficiencies() { // TODO: maitrise d'armes
    return Object.entries(getCharClass()?.weaponProficiencies ?? {})?.map(([category, properties]) =>
      [].concat(category, properties)
    )
  }

  function getArmorProficiencies() {
    // TODO: armor category check ?
    // TODO: armor has malus effect if equiped without proficiency - display it
    const classArmorProficiencies = getCharClass()?.armorProficiencies
    applyEffects(getFeats(), EFFECT.HasArmorProficiencyEffect, {}, result => classArmorProficiencies.push(result))
    return classArmorProficiencies
  }
  function getShieldProficiency() {
    return (getCharClass()?.shieldProficiency ?? false)
      || (getFeats()?.some(feat => feat?.[EFFECT.HasShieldProficiencyEffect]))
  }

  function getToolProficiencies() {
    const classTools = authorityStore.getClassTools() ?? []
    const forced = (getCharClass()?.toolProficiencies ?? [])
      .reduce((acc, rule) => acc.concat(rule?.type === 'INSERTION_TYPE.forced' ? rule.tools : []), [])
    return Array.from(new Set([].concat(forced, classTools)))
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
    let ac = 10 + modifiers[ABILITY.dexterity]

    // Apply Armors P.220
    // TODO: Test armor without override feature
    applyEffect(equipedArmor, EFFECT.ACOverride, { modifiers }, result => ac = result)

    // Apply class features effects
    applyEffects(getCharClass()?.features, EFFECT.ACOverrideEffect, { ac, equipedArmor, equipedShield, modifiers }, result => ac = result)

    // Apply feats modifier
    // TODO: Never tested
    // si armure - char has feat (don P.210) Defense = +1
    applyEffects(getFeats(), EFFECT.ACModifierEffect, { ac, equipedArmor, equipedShield, }, result => ac = result)

    // Apply Shield modifier
    // TODO: Test it
    applyEffect(equipedShield, EFFECT.ACModifierEffect, { ac, hasShieldProficiency, }, result => ac = result)

    // Apply other equiped effect
    applyEffects(getEquiped(EQUIPED_CATEGORY.OTHER), EFFECT.ACModifierEffect, { ac, equipedArmor, equipedShield, }, result => ac = result)

    return ac
  }

  function getHitPointMax() {
    const constitution = getModifier(ABILITY.constitution)
    const hpBase = (getCharClass()?.hitPointMax.base ?? 0) + constitution // P.41
    const hpPerLevel = (getCharClass()?.hitPointMax.addPerLevel ?? 0) + constitution
    const additionalHp = hpPerLevel * (getCharLevel() - 1) // P.43
    return hpBase + additionalHp
  }

  function getHitDiceMax() { return DICE(getCharLevel(), getCharClass()?.hitDice ?? 100) }

  function isDisabledSkill(skill) {
    return (!getCharClass()?.skills?.list.includes(skill))
      || getCharOrigin()?.skills?.includes(skill)
      || !authorityStore.getClassSkills().includes(skill) && (authorityStore.getClassSkills().length >= getCharClass()?.skills?.nb ?? 0)
  }

  function isCheckedSkill(skill) { // TODO: get from class features + get from feats
    return getCharOrigin()?.skills?.includes(skill)
      || authorityStore.getClassSkills()?.includes(skill)
  }

  function isExpertSkill(skill) { // TODO: expertSkills should not come from savedStore but computed class / feats
    return authorityStore.getExpertSkills()?.includes(skill)
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
    getClassSkills: () => get(properties.classSkills),
    getExpertSkills: () => get(properties.expertSkills),
    getClassTools: () => get(properties.classTools),
    getAttribute: authorityStore.getAttribute,

    getCharLevel,
    getProficiencyBonus,
    getCharClass,
    getCharOrigin,
    getCharSpecies,
    getModifier,
    getSave,
    getEquiped,
    getSkillScore,
    getInitiative,
    getCharSpeed,
    getPassivePerception,
    getWeaponProficiencies,
    getArmorProficiencies,
    getShieldProficiency,
    getToolProficiencies,
    getArmorClass,
    getHitPointMax,
    getHitDiceMax,
    isDisabledSkill,
    isCheckedSkill,
    isExpertSkill,

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

    classSkillsAdd: authorityStore.classSkillsAdd,
    classSkillsRemove: authorityStore.classSkillsRemove,
    expertSkillsAdd: authorityStore.expertSkillsAdd,
    expertSkillsRemove: authorityStore.expertSkillsRemove,
    classToolsAdd: authorityStore.classToolsAdd,
    classToolsRemove: authorityStore.classToolsRemove,

    on: store.on,
    onMany: store.onMany,
    onMap: store.onMap,
  }
}

export default createCharSheetStore()
