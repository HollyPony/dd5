import getClass from './data/classes.js'
import { EFFECT, ABILITY, DICE, } from './common.js'
import { EQUIPED_CATEGORY, EQUIPMENT_TYPE, getEquipment, } from './data/equipments.js'
import { getOrigin, } from './data/origins.js'
import getSpecies from './data/species.js'
import { s } from './helpers.js'
import * as storeManager from './storeManager.js'

export class CharSheet {
  static #instance
  static getInstance() {
    if (!CharSheet.#instance) {
      CharSheet.#instance = new CharSheet()
    }
    return CharSheet.#instance
  }

  charName = ''
  charClass = null
  charClassName = ''
  charSubClassName = null
  charLevel = 1
  charOrigin = null
  charOriginName = ''
  charSpecies = null
  charSpeciesName = ''
  charAlignment = ''
  charExperience = 0
  charSizeCategory = ''
  charSize = ''
  attributes = s({
    [ABILITY.strength]: 10,
    [ABILITY.dexterity]: 10,
    [ABILITY.constitution]: 10,
    [ABILITY.wisdom]: 10,
    [ABILITY.intelligence]: 10,
    [ABILITY.charisma]: 10,
  })
  modifiers = s({
    [ABILITY.strength]: 0,
    [ABILITY.dexterity]: 0,
    [ABILITY.constitution]: 0,
    [ABILITY.wisdom]: 0,
    [ABILITY.intelligence]: 0,
    [ABILITY.charisma]: 0,
  })
  classSkills = []
  feats = []
  equipments = []
  equiped = s({
    [EQUIPED_CATEGORY.WEAPON]: [],
    [EQUIPED_CATEGORY.ARMOR]: null,
    [EQUIPED_CATEGORY.SHIELD]: null,
    [EQUIPED_CATEGORY.OTHER]: [],
  })

  constructor() {
  }

  init(source) {
    // Values set from source
    Object.assign(this, storeManager.toCharsheet(source))

    // Values set from charsheet
    this.charOrigin = getOrigin(this.charOriginName)
    this.charClass = getClass(this.charClassName, this.charSubClassName, this.charLevel)
    this.charSpecies = getSpecies(this.charSpeciesName)

    Object.keys(this.modifiers).forEach(ability => {
      this.modifiers[ability] = CharSheet.abilityScoreToModifier(this.attributes[ability])
    })

    this.equipments?.filter?.(equipment => equipment.equiped).forEach(equipment => {
      const equipmentComputed = Object.assign({}, getEquipment(equipment.name), equipment)

      switch (equipmentComputed.type) {
        case EQUIPMENT_TYPE.WEAPON: this.equiped[EQUIPED_CATEGORY.WEAPON].push(equipmentComputed); break;
        case EQUIPMENT_TYPE.ARMOR: this.equiped[EQUIPED_CATEGORY.ARMOR] = equipmentComputed; break;
        case EQUIPMENT_TYPE.SHIELD: this.equiped[EQUIPED_CATEGORY.SHIELD] = equipmentComputed; break;
        case EQUIPMENT_TYPE.MAGIC_ITEM: (magicItem => {
          switch (magicItem.equipOn) {
            case EQUIPED_CATEGORY.WEAPON: this.equiped[EQUIPED_CATEGORY.WEAPON].push(magicItem); break;
            case EQUIPED_CATEGORY.ARMOR: this.equiped[EQUIPED_CATEGORY.WEAPON] = magicItem; break;
            case EQUIPED_CATEGORY.SHIELD: this.equiped[EQUIPED_CATEGORY.SHIELD] = magicItem; break;
            case EQUIPED_CATEGORY.OTHER: this.equiped[EQUIPED_CATEGORY.OTHER].push(magicItem); break;
          }
        })(equipmentComputed); break;
      }
    })

    // TODO: init class features

    // TODO: init species traits

    // TODO: init feats
  }

  // HELPERS

  static applyEffect(item, effect, options, callback) {
    if (item?.effects?.[effect]
      && (item.effects[effect]?.condition?.call(item, options ?? true))) {
      callback(item.effects[effect].apply.call(item, options))
    }
  }

  static applyEffects(list, effect, options, callback) {
    list.forEach(item => CharSheet.applyEffect(item, effect, options, callback))
  }

  // COMPUTE VALUE
  static abilityScoreToModifier(score) {
    return Math.floor(score / 2) - 5
  }

  // COMPUTED VALUES

  // getCharFeats() { return this.feats } // TODO: get from class + species human?

  // TODO getter
  get weaponProficiencies() { // TODO: maitrise d'armes
    return Object.entries(this.charClass.weaponProficiencies).map(([category, properties]) =>
      [].concat(category, properties).join('.')
    )
  }

  get armorProficiencies() {
    // TODO: armor category check ?
    // TODO: armor has malus effect if equiped without proficiency - display it
    const classArmorProficiencies = this.charClass?.armorProficiencies
    CharSheet.applyEffects(this.feats, EFFECT.HasArmorProficiencyEffect, {}, result => classArmorProficiencies.concat(result))
    return classArmorProficiencies
  }

  get shieldProficiency() {
    return (this.charClass?.shieldProficiency ?? false)
      || (this.feats?.includes(feat => feat?.[EFFECT.HasShieldProficiencyEffect]))
  }

  get toolProficiencies() {
    return this.charClass?.toolProficiencies
  }

  /* TODO: update if
   *  - armor equipped
   *  - Shield equipped
   *  - levelUp ?
   *  - traits - features changed (according to levelUp or GM)
   *  - magic items equipped
   *  - magic item attuned
   */
  get armorClass() {
    const modifiers = this.modifiers
    const equipedArmor = this.getEquiped(EQUIPED_CATEGORY.ARMOR)
    const equipedShield = this.getEquiped(EQUIPED_CATEGORY.SHIELD)
    const hasShieldProficiency = this.shieldProficiency

    // Set default AC P.42
    let ac = 10 + modifiers[ABILITY.dexterity]

    // Apply Armors P.220
    // TODO: Test armor without override feature
    CharSheet.applyEffect(equipedArmor, EFFECT.ACOverride, { modifiers }, result => ac = result)

    // Apply class features effects
    CharSheet.applyEffects(this.charClass?.features, EFFECT.ACOverrideEffect, { ac, equipedArmor, equipedShield, modifiers }, result => ac = result)

    // Apply feats modifier
    // TODO: Never tested
    // si armure - char has feat (don P.210) Defense = +1
    CharSheet.applyEffects(this.feats, EFFECT.ACModifierEffect, { ac, equipedArmor, equipedShield, }, result => ac = result)

    // Apply Shield modifier
    // TODO: Test it
    CharSheet.applyEffect(equipedShield, EFFECT.ACModifierEffect, { ac, hasShieldProficiency, }, result => ac = result)

    // Apply other equiped effect
    CharSheet.applyEffects(this.getEquiped(EQUIPED_CATEGORY.OTHER), EFFECT.ACModifierEffect, { ac, equipedArmor, equipedShield, }, result => ac = result)

    return ac
  }

  get hitPointMax() {
    return (this.charClass?.hitPointMax.base + this.getAbilityModifier(ABILITY.constitution)) // P.41
      + ((this.charClass?.hitPointMax.addPerLevel + this.getAbilityModifier(ABILITY.constitution)) * (this.charLevel - 1)) // P.43
  }

  get hitDiceMax() {
    return DICE(this.charLevel, this.charClass?.hitDice)
  }

  get proficencyBonus() {
    let proficiencyBonus = Math.floor(this.charLevel / 4) + 2

    // TODO: update on equipped / unequipped / attuned / on scores changes
    // TODO: test application
    CharSheet.applyEffects(this.getEquiped(EQUIPED_CATEGORY.OTHER), EFFECT.PBModifierEffect, { proficiencyBonus }, result => proficiencyBonus = result)

    return proficiencyBonus
  }

  // TODO: take armor strength + update on armor change
  get charSpeed() {
    let speed = this.charSpecies?.speed || 0

    const equipedArmor = this.getEquiped(EQUIPED_CATEGORY.ARMOR)
    const equipedShield = this.getEquiped(EQUIPED_CATEGORY.SHIELD)

    CharSheet.applyEffect(this.charClass, EFFECT.SpeedModifierEffect, { speed, equipedArmor, equipedShield }, result => speed = result)

    // Heavy rule
    if (equipedArmor?.strength
      && !feats.find(feat => feat?.effect?.[EFFECT.ByPassArmorStrengthRequirement])
      && equipedArmor.strength > this.getAbilityScore(ABILITY.strength))
      speed += -3

    return speed
  }

  // TODO: ??
  get initiative() {
    return this.getAbilityModifier(ABILITY.dexterity)
  }

  getAbilityScore(attributeName) { return this.attributes[attributeName] }
  getAbilityModifier(ability) { return this.modifiers[ability] }
  getAbilitySave(ability) {
    return this.charClass?.saves?.includes(ability)
      ? this.getAbilityModifier(ability) + this.proficencyBonus
      : this.getAbilityModifier(ability)
  }
  getEquiped(category = null) { return category ? this.equiped[category] : this.equiped }

  isCheckedSkill(skill) { // TODO: get from class features + get from feats
    return this.charOrigin?.skills?.includes(skill) || this.classSkills.includes(skill)
  }

  isDisabledSkill(skill) {
    return (!this.charClass?.skills?.list.includes(skill))
      || this.charOrigin?.skills?.includes(skill)
      || !this.classSkills.includes(skill) && (this.classSkills.length >= this.charClass?.skills?.nb ?? 0)
  }

  getSkillScore(skill) {
    return this.getAbilityModifier(skill.ability) + (this.isCheckedSkill(skill) ? this.proficencyBonus : 0)
  }


  // SETTERS - user interactions to character

  // TODO: save it ! Never call
  setCharName(charName) { this.charName = charName }
  set charClassName(charClassName) {
    this.charClassName = charClassName
    this.charSubClassName = undefined
    this.charClass = getClass(this.charClassName, this.charSubClassName, this.charLevel)

    document.dispatchEvent(new CustomEvent('userData.charClassChanged'))

    // TODO: refresh this datas with event
    // clear choose skill
    // refreshSubClassList()
    // reloadClassData()
    // refreshClassFeatures()
  }
  set charSubClassName(charSubClassName) {
    this.charSubClassName = charSubClassName
    this.charClass = getClass(this.charClassName, this.charSubClassName, this.charLevel)

    document.dispatchEvent(new CustomEvent('userData.charSubClassChanged'))

    // TODO: refresh this datas with event
    // reloadClassData()
    // refreshClassFeatures()
  }
  set charLevel(charLevel) {
    this.charLevel = charLevel
    this.charClass = getClass(this.charClassName, this.charSubClassName, this.charLevel)
    this.charSpecies = getSpecies(this.charSpeciesName, this.charLevel)

    document.dispatchEvent(new CustomEvent('userData.charLevelChanged'))
  }
  set charOrigin(charOriginName) {
    this.charOriginName = charOriginName
    this.charOrigin = getOrigin(this.charOriginName)
    document.dispatchEvent(new CustomEvent('userData.charOriginChanged')) // TODO: maybe useless
    // TODO: handle skill from origin ?
    // TODO: remove also choosedSkill due to conflicts
  }
  set charSpeciesName(charSpecies) {
    this.charSpeciesName = charSpecies

    document.dispatchEvent(new CustomEvent('userData.charSpeciesChanged'))
    // TODO: Handle what changed on species changed
  }
  set charAlignment(charAlignment) { this.charAlignment = charAlignment }
  set charExperience(charExperience) { this.charExperience = charExperience }

  setAttribute(attributeName, score) {
    this.attributes[attributeName] = parseInt(score)
    this.modifiers[attributeName] = CharSheet.abilityScoreToModifier(this.attributes[attributeName])
  }
  classSkillsAdd(skill) {
    this.classSkills.push(skill)
    document.dispatchEvent(new CustomEvent('CharSheet.skillsChanged'))
  }
  classSkillsRemove(skill) {
    this.classSkills.splice(this.classSkills.indexOf(skill), 1)
    document.dispatchEvent(new CustomEvent('CharSheet.skillsChanged'))
  }
  classSkillsClear() {
    this.classSkills.lentgh = 0
    document.dispatchEvent(new CustomEvent('CharSheet.skillsChanged'))
  }
  // STORAGE

  toJSON() { return storeManager.toJSON(this) }
}

