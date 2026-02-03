import getClass from '../data/classes.js'
import getOrigin from '../data/origins.js'
import getSpecies from '../data/species.js'
import { EFFECT, ABILITY, DICE, SKILLS, } from '../common.js'
import { EQUIPED_CATEGORY, EQUIPMENT_TYPE, getEquipment, } from '../data/equipments.js'
import { s } from '../helpers.js'
import createObservableStore from './createObservableStore.js'
import * as storeManager from '../storageManager.js'

function applyEffect(item, effect, options, callback) {
  if (item?.effects?.[effect]
    && (item.effects[effect]?.condition?.call(item, options ?? true))) {
    callback(item.effects[effect].apply.call(item, options))
  }
}

function applyEffects(list, effect, options, callback) {
  list.forEach(item => applyEffect(item, effect, options, callback))
}

function computeAbilityModifier(score) {
  return Math.floor(score / 2) - 5
}

function createCharSheetStore() {
  const store = createObservableStore({
    // Raw part
    charName: '',
    charExperience: 0,
    charLevel: 1,
    charClassName: '',
    charSubClassName: null,
    charOriginName: '',
    charSpeciesName: '',
    charAlignment: '',
    charSizeCategory: '',
    charSize: '',
    attributes: s({
      [ABILITY.strength]: 10,
      [ABILITY.dexterity]: 10,
      [ABILITY.constitution]: 10,
      [ABILITY.wisdom]: 10,
      [ABILITY.intelligence]: 10,
      [ABILITY.charisma]: 10,
    }),

    // Computed part
    proficiencyBonus: 0,
    charClass: null,
    charOrigin: null,
    charSpecies: null,
    modifiers: s({
      [ABILITY.strength]: 0,
      [ABILITY.dexterity]: 0,
      [ABILITY.constitution]: 0,
      [ABILITY.wisdom]: 0,
      [ABILITY.intelligence]: 0,
      [ABILITY.charisma]: 0,
    }),
    saves: s({
      [ABILITY.strength]: 0,
      [ABILITY.dexterity]: 0,
      [ABILITY.constitution]: 0,
      [ABILITY.wisdom]: 0,
      [ABILITY.intelligence]: 0,
      [ABILITY.charisma]: 0,
    }),
    classSkills: [],
    feats: [],
    equipments: [],
    equiped: s({
      [EQUIPED_CATEGORY.WEAPON]: [],
      [EQUIPED_CATEGORY.ARMOR]: null,
      [EQUIPED_CATEGORY.SHIELD]: null,
      [EQUIPED_CATEGORY.OTHER]: [],
    }),
  })

  const { get, set, } = store

  // Compute

  function _computeProficiencyBonus(level = get('charLevel')) {
    return Math.floor((level - 1) / 4) + 2
  }

  function _computedAbilitySave(ability) {
    return get('modifiers')[ability] + (get('charClass')?.saves?.includes(ability) ? get('proficiencyBonus') : 0)
  }

  function _computeSkillScore(skill) {
    return get('modifiers')[skill.ability] + (isCheckedSkill(skill) ? get('proficiencyBonus') : 0)
  }

  function init(payload) {
    set(storeManager.toCharsheet(payload), false)
    set({
      proficiencyBonus: _computeProficiencyBonus(),
      charOrigin: getOrigin(get('charOriginName')),
      charClass: getClass(get('charClassName'), get('charSubClassName'), get('charLevel')),
      charSpecies: getSpecies(get('charSpeciesName'), get('charLevel')),
      modifiers: Object.entries(get('attributes'))
        .reduce((acc, [ability, score]) =>
          Object.assign({}, acc, { [ability]: computeAbilityModifier(score) }), {}),
      equiped: get('equipments')?.filter(equipment => equipment.equiped).reduce((acc, equipment) => {
        const equipmentComputed = Object.assign({}, getEquipment(equipment.name), equipment)

        switch (equipmentComputed.type) {
          case EQUIPMENT_TYPE.WEAPON: acc[EQUIPED_CATEGORY.WEAPON].push(equipmentComputed); break;
          case EQUIPMENT_TYPE.ARMOR: acc[EQUIPED_CATEGORY.ARMOR] = equipmentComputed; break;
          case EQUIPMENT_TYPE.SHIELD: acc[EQUIPED_CATEGORY.SHIELD] = equipmentComputed; break;
          case EQUIPMENT_TYPE.MAGIC_ITEM:
            switch (equipmentComputed.equipOn) {
              case EQUIPED_CATEGORY.WEAPON: acc[EQUIPED_CATEGORY.WEAPON].push(equipmentComputed); break;
              case EQUIPED_CATEGORY.ARMOR: acc[EQUIPED_CATEGORY.ARMOR] = equipmentComputed; break;
              case EQUIPED_CATEGORY.SHIELD: acc[EQUIPED_CATEGORY.SHIELD] = equipmentComputed; break;
              case EQUIPED_CATEGORY.OTHER: acc[EQUIPED_CATEGORY.OTHER].push(equipmentComputed); break;
            }
            break;
        }

        return acc
      }, { ...get('equiped') })
    }, false)
    set({
      saves: Object.keys(get('attributes'))
        .reduce((acc, ability) =>
          Object.assign({}, acc, { [ability]: _computedAbilitySave(ability) }), {}),
    }, false)

    // TODO: init class features

    // TODO: init species traits

    // TODO: init feats
  }

  function getEquiped(category = null) { return category ? get('equiped')[category] : get('equiped') }

  function getCharName() { return get('charName') }
  function getCharExperience() { return get('charExperience') }
  function getCharLevel() { return get('charLevel') }
  function getCharOriginName() { return get('charOriginName') }
  function getCharClassName() { return get('charClassName') }
  function getCharSubClassName() { return get('charSubClassName') }
  function getCharSpeciesName() { return get('charSpeciesName') }
  function getCharAlignment() { return get('charAlignment') }
  function getCharSizeCategory() { return get('charSizeCategory') }
  function getCharSize() { return get('charSize') }
  function getClassSkills() { return get('classSkills') }

  function getProficiencyBonus() { return get('proficiencyBonus') }
  function getCharClass() { return get('charClass') }
  function getCharSpecies() { return get('charSpecies') }

  function getHitPointMax() {
    return (getCharClass()?.hitPointMax.base + getAbilityModifier(ABILITY.constitution)) // P.41
      + ((getCharClass()?.hitPointMax.addPerLevel + getAbilityModifier(ABILITY.constitution)) * (getCharLevel() - 1)) // P.43
  }
  function getHitDiceMax() { return DICE(get('charLevel'), get('charClass')?.hitDice) }
  function getAbilityScore(ability) { return get('attributes')[ability] }
  function getAbilityModifier(ability) { return get('modifiers')[ability] }
  function getAbilitySave(ability) { return get('saves')[ability] }
  function getSkillScore(skill) { return _computeSkillScore(skill) }

  function getInitiative() {
    return getAbilityModifier(ABILITY.dexterity)
  }

  // TODO: take armor strength + update on armor change
  function getCharSpeed() {
    let speed = getCharSpecies()?.speed || 0

    const equipedArmor = getEquiped(EQUIPED_CATEGORY.ARMOR)
    const equipedShield = getEquiped(EQUIPED_CATEGORY.SHIELD)

    applyEffect(getCharClass(), EFFECT.SpeedModifierEffect, { speed, equipedArmor, equipedShield }, result => speed = result)

    // Heavy rule
    if (equipedArmor?.strength
      && !feats.find(feat => feat?.effect?.[EFFECT.ByPassArmorStrengthRequirement])
      && equipedArmor.strength > getAbilityScore(ABILITY.strength))
      speed += -3

    return speed
  }

  function getPassivePerception() {
    return getSkillScore(SKILLS.perception) + 10
  }

  function getWeaponProficiencies() { // TODO: maitrise d'armes
    return Object.entries(get('charClass')?.weaponProficiencies)?.map(([category, properties]) =>
      [].concat(category, properties)
    )
  }

  function getArmorProficiencies() {
    // TODO: armor category check ?
    // TODO: armor has malus effect if equiped without proficiency - display it
    const classArmorProficiencies = get('charClass')?.armorProficiencies
    applyEffects(get('feats'), EFFECT.HasArmorProficiencyEffect, {}, result => classArmorProficiencies.push(result))
    return classArmorProficiencies
  }
  function getShieldProficiency() {
    return (get('charClass')?.shieldProficiency ?? false)
      || (get('feats')?.some(feat => feat?.[EFFECT.HasShieldProficiencyEffect]))
  }

  function getToolProficiencies() {
    return get('charClass')?.toolProficiencies
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
    const modifiers = get('modifiers')
    const equipedArmor = getEquiped(EQUIPED_CATEGORY.ARMOR)
    const equipedShield = getEquiped(EQUIPED_CATEGORY.SHIELD)
    const hasShieldProficiency = getShieldProficiency()

    // Set default AC P.42
    let ac = 10 + modifiers[ABILITY.dexterity]

    // Apply Armors P.220
    // TODO: Test armor without override feature
    applyEffect(equipedArmor, EFFECT.ACOverride, { modifiers }, result => ac = result)

    // Apply class features effects
    applyEffects(get('charClass')?.features, EFFECT.ACOverrideEffect, { ac, equipedArmor, equipedShield, modifiers }, result => ac = result)

    // Apply feats modifier
    // TODO: Never tested
    // si armure - char has feat (don P.210) Defense = +1
    applyEffects(get('feats'), EFFECT.ACModifierEffect, { ac, equipedArmor, equipedShield, }, result => ac = result)

    // Apply Shield modifier
    // TODO: Test it
    applyEffect(equipedShield, EFFECT.ACModifierEffect, { ac, hasShieldProficiency, }, result => ac = result)

    // Apply other equiped effect
    applyEffects(getEquiped(EQUIPED_CATEGORY.OTHER), EFFECT.ACModifierEffect, { ac, equipedArmor, equipedShield, }, result => ac = result)

    return ac
  }

  const getters = {
    // Raw
    getCharName,
    getCharExperience,
    getCharLevel,
    getCharOriginName,
    getCharClassName,
    getCharSubClassName,
    getCharSpeciesName,
    getCharAlignment,
    getCharSizeCategory,
    getCharSize,
    getClassSkills,

    // Computed
    getProficiencyBonus,
    getCharClass,
    getCharSpecies,
    getHitPointMax,
    getHitDiceMax,
    getAbilityScore,
    getAbilityModifier,
    getAbilitySave,
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
  }

  // Save this name. Test it
  function setCharName(charName) { set({ charName }) }
  function setCharExperience(charExperience) { set({ charExperience }) }
  function setCharLevel(charLevel = 0) {
    set({
      charLevel: Number(charLevel),
      proficiencyBonus: _computeProficiencyBonus(),
    })
  }
  function setCharOriginName(charOriginName) {
    set({
      charOriginName,
      charOrigin: getOrigin(charOriginName),
      classSkills: [],
    })
    // TODO: handle skill from origin ?
    // TODO: remove also classSkills choosed due to conflicts with origin ones
  }
  function setCharClassName(className) {
    set({
      charClassName: className,
      charSubClassName: undefined,
      charClass: getClass(className, undefined, get('charLevel')),
      classSkills: [],
    })

    // TODO: refresh this datas with event
    // clear choose skill
    // refreshSubClassList()
    // reloadClassData()
    // refreshClassFeatures()
  }
  function setCharSubClassName(charSubClassName) {
    set({
      charSubClassName: charSubClassName,
      charClass: getClass(get('charClassName'), charSubClassName, store.get('charLevel')),
    })

    // document.dispatchEvent(new CustomEvent('userData.charSubClassChanged'))
    // TODO: refresh this datas with event
    // reloadClassData()
    // refreshClassFeatures()
  }
  function setCharSpeciesName(charSpeciesName) {
    set({ charSpeciesName })

    // document.dispatchEvent(new CustomEvent('userData.charSpeciesChanged'))
    // // TODO: Handle what changed on species changed
  }

  function setAbilityScore(ability, score) {
    set({
      [`attributes.${ability}`]: score,
      [`modifiers.${ability}`]: computeAbilityModifier(score),
    })
    set({
      [`saves.${ability}`]: _computedAbilitySave(ability),
    })
  }

  const setters = {
    setCharName,
    setCharExperience,
    setCharLevel,
    setCharOriginName,
    setCharClassName,
    setCharSubClassName,
    setCharSpeciesName,
    setAbilityScore,
  }

  function isDisabledSkill(skill) {
    return (!get('charClass')?.skills?.list.includes(skill))
      || get('charOrigin')?.skills?.includes(skill)
      || !get('classSkills').includes(skill) && (get('classSkills').length >= get('charClass')?.skills?.nb ?? 0)
  }

  function isCheckedSkill(skill) { // TODO: get from class features + get from feats
    return get('charOrigin')?.skills?.includes(skill) || get('classSkills').includes(skill)
  }

  function classSkillsAdd(skill) {
    set({ 'classSkills': get('classSkills').concat(skill) })
    // get('classSkills').push(skill)
    // document.dispatchEvent(new CustomEvent('CharSheet.skillsChanged'))
  }

  function classSkillsRemove(skill) {
    set({ 'classSkills': get('classSkills').filter(_skill => _skill !== skill) })
    // get('classSkills').splice(get('classSkills').indexOf(skill), 1)
    // document.dispatchEvent(new CustomEvent('CharSheet.skillsChanged'))
  }

  const helpers = {
    isDisabledSkill,
    isCheckedSkill,
    classSkillsAdd,
    classSkillsRemove,
    toJSON() { return storeManager.toJSON(this) }
  }

  return {
    init,
    ...getters,
    ...setters,
    ...helpers,
    subscribe: store.subscribe
  }
}

export default createCharSheetStore()
