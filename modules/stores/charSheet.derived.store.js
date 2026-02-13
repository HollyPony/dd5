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
  charLevel: Symbol('charLevel'),
  proficiencyBonus: Symbol('proficiencyBonus'),
  initiative: Symbol('initiative'),
  speed: Symbol('speed'),
  passivePerception: Symbol('passivePerception'),
  charClass: Symbol('charClass'),
  charOrigin: Symbol('charOrigin'),
  charSpecies: Symbol('charSpecies'),
  modifiers: Symbol('modifiers'),
  saves: Symbol('saves'),
  feats: Symbol('feats'),
  equiped: Symbol('equiped'),
}, authorityProperties))

const initialData = {
  ...authorityInitialData,
  [properties.charLevel]: 1,
  [properties.proficiencyBonus]: 0,
  [properties.initiative]: 0,
  [properties.speed]: 10,
  [properties.passivePerception]: 10,
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
  const isEnumerable = Object.prototype.propertyIsEnumerable
  const modifiers = {}

  for (const ability of Reflect.ownKeys(attributes)) {
    if (!isEnumerable.call(attributes, ability)) continue
    modifiers[ability] = computeAbilityModifier(attributes[ability])
  }

  return modifiers
}

function computeSaves(attributes, modifiers, charClass, proficiencyBonus) {
  const isEnumerable = Object.prototype.propertyIsEnumerable
  const saves = {}

  for (const ability of Reflect.ownKeys(attributes)) {
    if (!isEnumerable.call(attributes, ability)) continue
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

  applyEffect(charClass, EFFECT.SpeedModifierEffect, { speed, equipedArmor, equipedShield }, result => speed = result)

  // Heavy rule
  if (equipedArmor?.strength
    && !feats.find(feat => feat?.effect?.[EFFECT.ByPassArmorStrengthRequirement])
    && equipedArmor.strength > strength) {
    speed += -3
  }

  return speed
}

function computePassivePerception({
  modifiers,
  proficiencyBonus,
  originSkills = [],
  classSkills = [],
  expertSkills = [],
}) {
  const perception = SKILLS.perception
  // TODO
  //   const isProficient = isCheckedSkill(skill)
  // const isExpert = isExpertSkill(skill)
  const isProficient = originSkills.includes(perception) || classSkills.includes(perception)
  const isExpert = expertSkills.includes(perception)
  const proficiencyMultiplier = isProficient ? (isExpert ? 2 : 1) : 0
  const modifier = modifiers?.[perception.ability] ?? 0
  return modifier + (proficiencyBonus * proficiencyMultiplier) + 10
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
    const speed = computeCharSpeed({
      charSpecies,
      charClass,
      equiped: getEquiped(),
      feats: getFeats(),
      strength: authorityStore.getAttribute(ABILITY.strength),
    })
    const passivePerception = computePassivePerception({
      modifiers: getModifiers(),
      proficiencyBonus,
      originSkills: getCharOrigin()?.skills ?? [],
      classSkills: authorityStore.getClassSkills(),
      expertSkills: authorityStore.getExpertSkills(),
    })

    set({
      [properties.charExperience]: charExperience,
      [properties.charLevel]: charLevel,
      [properties.proficiencyBonus]: proficiencyBonus,
      [properties.charClass]: charClass,
      [properties.charSpecies]: charSpecies,
      [properties.saves]: saves,
      [properties.speed]: speed,
      [properties.passivePerception]: passivePerception,
    })
  }

  function computeClass() {
    const charClass = getClass(authorityStore.getCharClassName(), authorityStore.getCharSubClassName(), getCharLevel())
    const speed = computeCharSpeed({
      charSpecies: getCharSpecies(),
      charClass,
      equiped: getEquiped(),
      feats: getFeats(),
      strength: authorityStore.getAttribute(ABILITY.strength),
    })
    set({
      [properties.charClassName]: authorityStore.getCharClassName(),
      [properties.charSubClassName]: authorityStore.getCharSubClassName(),
      [properties.charClass]: charClass,
      [properties.saves]: computeSaves(authorityStore.getAttributes(), getModifiers(), charClass, getProficiencyBonus()),
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
      strength: authorityStore.getAttribute(ABILITY.strength),
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

  function computeClassSkills() {
    const classSkills = authorityStore.getClassSkills()
    const passivePerception = computePassivePerception({
      modifiers: getModifiers(),
      proficiencyBonus: getProficiencyBonus(),
      originSkills: getCharOrigin()?.skills ?? [],
      classSkills,
      expertSkills: authorityStore.getExpertSkills(),
    })
    set({
      [properties.classSkills]: classSkills,
      [properties.passivePerception]: passivePerception,
    })
  }

  function computeExpertSkills() {
    const expertSkills = authorityStore.getExpertSkills()
    const passivePerception = computePassivePerception({
      modifiers: getModifiers(),
      proficiencyBonus: getProficiencyBonus(),
      originSkills: getCharOrigin()?.skills ?? [],
      classSkills: authorityStore.getClassSkills(),
      expertSkills,
    })
    set({
      [properties.expertSkills]: expertSkills,
      [properties.passivePerception]: passivePerception,
    })
  }

  function computeClassTools() {
    set({ [properties.classTools]: authorityStore.getClassTools() })
  }

  function computeOrigin() {
    const charOrigin = getOrigin(authorityStore.getCharOriginName())
    const passivePerception = computePassivePerception({
      modifiers: getModifiers(),
      proficiencyBonus: getProficiencyBonus(),
      originSkills: charOrigin?.skills ?? [],
      classSkills: authorityStore.getClassSkills(),
      expertSkills: authorityStore.getExpertSkills(),
    })
    set({
      [properties.charOriginName]: authorityStore.getCharOriginName(),
      [properties.charOrigin]: charOrigin,
      [properties.passivePerception]: passivePerception,
    })
  }

  function computeAttributes() {
    const attributes = authorityStore.getAttributes()
    const modifiers = computeModifiers(attributes)
    const saves = computeSaves(attributes, modifiers, getCharClass(), getProficiencyBonus())
    const initiative = modifiers[ABILITY.dexterity]
    const speed = computeCharSpeed({
      charSpecies: getCharSpecies(),
      charClass: getCharClass(),
      equiped: getEquiped(),
      feats: getFeats(),
      strength: attributes[ABILITY.strength],
    })
    const passivePerception = computePassivePerception({
      modifiers,
      proficiencyBonus: getProficiencyBonus(),
      originSkills: getCharOrigin()?.skills ?? [],
      classSkills: authorityStore.getClassSkills(),
      expertSkills: authorityStore.getExpertSkills(),
    })
    set({
      [properties.attributes]: attributes,
      [properties.modifiers]: modifiers,
      [properties.saves]: saves,
      [properties.initiative]: initiative,
      [properties.speed]: speed,
      [properties.passivePerception]: passivePerception,
    })
  }

  function computeEquipments() {
    const equiped = computeEquiped(authorityStore.getEquipments())
    const speed = computeCharSpeed({
      charSpecies: getCharSpecies(),
      charClass: getCharClass(),
      equiped,
      feats: getFeats(),
      strength: authorityStore.getAttribute(ABILITY.strength),
    })
    set({
      [properties.equipments]: authorityStore.getEquipments(),
      [properties.equiped]: equiped,
      [properties.speed]: speed,
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
    const charOrigin = getOrigin(authorityStore.getCharOriginName())
    const charSpecies = getSpecies(authorityStore.getCharSpeciesName(), charLevel)
    const modifiers = computeModifiers(authorityStore.getAttributes())
    const proficiencyBonus = computeProficiencyBonus(charLevel)
    const saves = computeSaves(authorityStore.getAttributes(), modifiers, charClass, proficiencyBonus)
    const initiative = modifiers[ABILITY.dexterity]
    const equiped = computeEquiped(authorityStore.getEquipments())
    const speed = computeCharSpeed({
      charSpecies,
      charClass,
      equiped,
      feats: initialData[properties.feats],
      strength: authorityStore.getAttribute(ABILITY.strength),
    })
    const passivePerception = computePassivePerception({
      modifiers,
      proficiencyBonus,
      originSkills: charOrigin?.skills ?? [],
      classSkills: authorityStore.getClassSkills(),
      expertSkills: authorityStore.getExpertSkills(),
    })

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
      [properties.charOrigin]: charOrigin,
      [properties.charSpecies]: charSpecies,
      [properties.modifiers]: modifiers,
      [properties.saves]: saves,
      [properties.speed]: speed,
      [properties.passivePerception]: passivePerception,
      // TODO: init feats here
      [properties.equiped]: equiped,
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
