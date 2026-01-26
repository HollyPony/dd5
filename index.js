import { ABILITY, D, SKILLS } from './modules/common.js'
import { createElement, populateSelect, removeAllChildren, } from './modules/domlib.js'
import * as userData from './modules/userData.js'
import { getList as getClassesList, getSubClasses, } from './modules/data/classes.js'
import { origins, } from './modules/data/origins.js'
import { getSpeciesList, } from './modules/data/species.js'
import { ARMOR_CATEGORY, getWeapons, } from './modules/data/equipments.js'
import parseMarkdown from './modules/markdown.js'

// TODO: remove mock
import { mock as storedData } from './modules/storeManager.js'

/////////////////////////////////////////////////////////////////////////
// INPUTS ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

const charClassElement = document.getElementsByName('charClass')[0]
const charSubClassElement = document.getElementsByName('charSubClass')[0]
const charLevelElement = document.getElementsByName('charLevel')[0]
const charOriginElement = document.getElementsByName('charOrigin')[0]
const charSpeciesElement = document.getElementsByName('charSpecies')[0]

// TODO: Update level with experience ?
const charExperienceElement = document.getElementsByName('experiencepoints')[0]

const exportCharLink = document.getElementById("exportCharLink")

const abilityElements = Object.entries(ABILITY).reduce((acc, [key, value]) => {
  const abilityElement = document.getElementsByClassName(`${key.toLowerCase()}`)[0]

  return Object.assign(acc, {
    [value]: {
      root: abilityElement,
      score: abilityElement.getElementsByClassName('ability-score')[0],
      modifier: abilityElement.getElementsByClassName('ability-modifier')[0],
      saveCheck: abilityElement.getElementsByClassName('save-check')[0],
      saveScore: abilityElement.getElementsByClassName('save-score')[0],
    }
  })
}, {})

const skillElements = Object.entries(SKILLS).reduce((acc, [key, value]) => {
  return Object.assign(acc, {
    [value.name]: {
      check: document.getElementsByClassName(`skill-check ${key}-check`)[0],
      score: document.getElementsByClassName(`skill-score ${key}-score`)[0],
    }
  })
}, {})

const trainingsElements = {
  armorLight: document.getElementsByName('trainings-armor-light')[0],
  armorMedium: document.getElementsByName('trainings-armor-medium')[0],
  armorHeavy: document.getElementsByName('trainings-armor-heavy')[0],
  shield: document.getElementsByName('trainings-shield')[0],
  weaponsList: document.getElementsByClassName('trainings-weapons-list')[0],
  toolsList: document.getElementsByClassName('trainings-tools-list')[0],
}

const weaponSelectElement = document.getElementsByName('weapons')[0]

//////////////////////////////////////////////////////////////////////
// DISPLAY HELPERS //////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function skillAsText(score) { return score > 0 ? `+${score}` : `${score}` }

function diceToString({ number, dice }) {
  return D[dice] ? `${number}d${dice}` : 'err' // TODO:
}

// DISPLAY UPDATES

function reloadClassData() { }

function refreshCharName() {
  document.getElementsByName('charName')[0].value = userData.getCharName()
}

function refreshArmorClass() {
  document.getElementsByName('armorClass')[0].value = userData.getArmorClass()
}

function refreshProficiencyBonus() {
  document.getElementsByName('proficiencybonus')[0].value = skillAsText(userData.getProficencyBonus())
}

function refreshHitPointMax() {
  document.getElementsByName('hitPointMax')[0].value = userData.getHitPointMax()
}

function refreshHitDiceMax() {
  document.getElementsByName('hitDiceMax')[0].value = diceToString(userData.getHitDiceMax())
}

function refreshInitiative() {
  document.getElementsByName('specs.initiative')[0].value = userData.getAbilityModifier(ABILITY.dexterity)
}

function refreshSpeed() {
  document.getElementsByName('specs.speed')[0].value = userData.getCharSpeed()
}

function refreshSize() {
  document.getElementsByClassName('size-category')[0].value = userData.getSizeCategory()
  document.getElementsByName('specs.size')[0].value = userData.getSize() || ''
}

function refreshPassivePerception() {
  document.getElementsByName('specs.passivePerception')[0].value = userData.getSkillScore(SKILLS.perception) + 10
}

function refreshCharAlignment() {
  document.getElementsByName('alignment')[0].value = userData.getCharAlignment()
}

function refreshTrainings() {
  const armorProficiencies = userData.getArmorProficiencies()
  trainingsElements.armorLight.checked = armorProficiencies.includes(ARMOR_CATEGORY.Light)
  trainingsElements.armorMedium.checked = armorProficiencies.includes(ARMOR_CATEGORY.Medium)
  trainingsElements.armorHeavy.checked = armorProficiencies.includes(ARMOR_CATEGORY.Heavy)
  trainingsElements.shield.checked = userData.getShieldProficiency()
  removeAllChildren(trainingsElements.weaponsList)
  userData.getWeaponProficiencies().forEach(proficiency => {
    const proficiencySplitted = proficiency.split('.').filter(_ => !['WEAPON_CATEGORY', 'WEAPON_PROPERTY'].includes(_))
    return trainingsElements.weaponsList.appendChild(createElement('p', i18n._(['stats.trainings.weapons']
      .concat(proficiencySplitted, proficiencySplitted.length === 1 ? 'all' : [])
      .join('.')
    )))
  })

  removeAllChildren(trainingsElements.toolsList)
}

function refreshClassList() {
  populateSelect(
    charClassElement,
    [
      { value: '', text: i18n._('classes.select.chooseOne'), disabled: true },
      ...getClassesList().map(className => ({ value: className, text: i18n._(`statics.classes.${className}`), }))
    ]
  )
}

function refreshSubClassList() {
  populateSelect(
    charSubClassElement,
    [
      { value: '', text: i18n._((userData.getCharLevel() < 3 || userData.getCharClassName()) ? `subClasses.select.unavailable` : `subClasses.select.chooseOne`), disabled: true },
      ...getSubClasses(userData.getCharClassName()).map(subClassName => ({
        value: subClassName,
        text: i18n._(`statics.subClasses.${userData.getCharClassName()}.${subClassName}`),
      })),
    ],
    { clear: true }
  )

  charSubClassElement.value = userData.getCharLevel() > 2 && userData.getCharSubClassName() || ''
  charSubClassElement.disabled = userData.getCharLevel() < 3
}

function refreshAbilityScore(ability) {
  abilityElements[ability].score.value = userData.getAbilityScore(ability)
}

function refreshAbilityModifier(ability) {
  abilityElements[ability].modifier.value = skillAsText(userData.getAbilityModifier(ability))
}

function refreshSkillScore(skill) {
  skillElements[skill.name].score.textContent = skillAsText(userData.getSkillScore(skill))
}

function refreshAbilities() {
  Object.values(SKILLS).forEach(skill => {
    skillElements[skill.name].check.disabled = userData.isDisabledSkill(skill)
    skillElements[skill.name].check.checked = userData.isCheckedSkill(skill)
  })
}

function refreshAbilitySave(ability) {
  abilityElements[ability].saveScore.textContent = skillAsText(userData.getAbilitySave(ability))
  abilityElements[ability].saveCheck.checked = userData.getCharClass()?.saves?.includes(ability)
}

function refreshClassFeatures() {
  const classFeaturesElement = document.getElementsByClassName('class-features')[0]
  while (classFeaturesElement.firstChild) {
    classFeaturesElement.removeChild(classFeaturesElement.firstChild);
  }

  userData.getCharClass()?.features?.forEach(feature => {
    const featureElement = createElement('div', [
      createElement('div',
        [
          createElement('span',
            document.createTextNode('Lv.' + feature.atLevel + ' - ' + i18n._(`statics.class-features.${userData.getCharClassName()}.${feature.name}.name`)),
            { class: 'input-group-text flex-grow-1', }
          ),
          createElement('button', 'btn', { // TODO: translate btn
            class: 'btn btn-outline-secondary',
            type: 'button',
            'data-bs-toggle': 'collapse',
            'data-bs-target': `#collapse-class-features-${userData.getCharClassName()}-${feature.name}`,
            role: 'button',
          }),
        ],
        { class: 'accordion-header input-group' },
      ),
      createElement('div',
        parseMarkdown(i18n._(`statics.class-features.${userData.getCharClassName()}.${feature.name}.description`)),
        {
          id: `collapse-class-features-${userData.getCharClassName()}-${feature.name}`,
          class: 'accordion-collapse collapse',
          'data-bs-parent': '#class-features-accordion',
        },
      ),
    ], { class: 'accordion-item' })

    classFeaturesElement.appendChild(featureElement)
  })
}

/////////////////////////////////////////////////////////////////////////
// EVENTS ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function charClassChanged({ currentTarget }) {
  userData.setCharClassName(currentTarget.value)
  refreshSubClassList()
  reloadClassData()
  refreshClassFeatures()
}

function charSubClassChanged({ currentTarget: { value } }) {
  userData.setCharSubClassName(currentTarget.value)

  reloadClassData()
  refreshClassFeatures()
  // TODO:
}

function charOriginChanged({ currentTarget }) {
  // TODO: alert skills lost
  userData.setCharOrigin(currentTarget.value)
  userData.skillChoosedClear()

  refreshAbilities()
}

function charSpeciesChanged({ currentTarget }) {
  userData.setCharSpeciesName(currentTarget.value)
  // TODO
}

function charLevelChanged({ currentTarget: { value } }) {
  userData.setCharLevel(value)

  refreshSubClassList()
  refreshHitPointMax()
  refreshHitDiceMax()
  refreshProficiencyBonus()

  Object.values(ABILITY).forEach(ability => {
    refreshAbilitySave(ability)
    refreshAbilityModifier(ability)
  })

  Object.values(SKILLS).forEach(skill => refreshSkillScore(skill))

  refreshClassFeatures()
  // Update species abilities / spells etc ...

  // TODO: userData.reloadSpecies
}

function abilityScoreChanged({ currentTarget }) {
  const score = currentTarget.value
  const ability = ABILITY[currentTarget.dataset.ability]

  userData.setAttribute(ability, score)

  refreshAbilityScore(ability)


  refreshAbilityModifier(ability)

  Object.values(SKILLS).filter(skill => ability === skill.ability).forEach(skill => refreshSkillScore(skill))

  refreshAbilitySave(ability)
}

function skillChecked({ currentTarget: { name } }) {
  const skill = SKILLS[name]
  const skillChecked = skillElements[skill.name].check.checked

  userData[skillChecked ? 'skillChoosedAdd' : 'skillChoosedRemove'](skill)

  refreshSkillScore(skill)

  Object.values(SKILLS).forEach(skill => {
    skillElements[skill.name].check.disabled = userData.isDisabledSkill(skill)
  })
}

/////////////////////////////////////////////////////////////////////////
// STORAGE //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function exportJSON() {
  const baseHref = exportCharLink.href
  const baseDowload = exportCharLink.download

  const json = userData.toJSON()
  const blob = new Blob([json], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  exportCharLink.download = userData.getCharName().replace(/[^a-zA-Z0-9 ]/g, '')
  exportCharLink.href = url

  // nettoyage mémoire
  setTimeout(() => {
    exportCharLink.href = baseHref
    exportCharLink.download = baseDowload
    URL.revokeObjectURL(url)
  }, 0)
}

/////////////////////////////////////////////////////////////////////////
// INITIALIZATION ///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function init() {
  const charsheet = storedData

  function refreshCharOriginList() {
    // Set Origins list 
    populateSelect(
      charOriginElement,
      Object.keys(origins).map(originName => ({ value: originName, text: i18n._(`statics.origins.${originName}`), }))
    )
  }
  refreshCharOriginList()

  // Set Races list
  populateSelect(
    charSpeciesElement,
    getSpeciesList().map(species => (
      species.lineages ? {
        isGroup: true,
        label: i18n._(`statics.species.${species.name}`),
        options: species.lineages.map(lineage => ({
          value: `${species.name}.${lineage}`,
          text: i18n._(`statics.species.${species.name}-${lineage}`),
        })),
      } : {
        value: species.name, text: i18n._(`statics.species.${species.name}`),
      }
    ))
  )

  populateSelect(
    weaponSelectElement,
    [{ value: '', text: i18n._('weaponscantrip.weapons._select') }].concat(
      Object.entries(
        getWeapons()
          .reduce((acc, weapon) => {
            if (!acc[weapon.category]) acc[weapon.category] = []
            acc[weapon.category].push(weapon)
            return acc
          }, {})
      ).map(([category, weapons]) => ({
        isGroup: true,
        label: i18n._(`statics.${category}`),
        options: weapons.map(weapon => ({
          value: weapon, text: i18n._(`statics.weaponNames.${weapon.name}`)
        })),
      }))
    ))

  // Init data
  userData.init(charsheet)

  refreshCharName()
  refreshClassList()
  charClassElement.value = userData.getCharClassName() || ''

  charOriginElement.value = userData.getCharOrigin()
  charSpeciesElement.value = userData.getCharSpeciesName()

  charExperienceElement.value = userData.getCharExperience()
  charLevelElement.value = userData.getCharLevel()

  refreshHitPointMax()
  refreshHitDiceMax()
  refreshInitiative()
  refreshSpeed()
  refreshSize()
  refreshPassivePerception()
  refreshCharAlignment()
  refreshTrainings()

  Object.values(ABILITY).forEach(ability => {
    refreshAbilityScore(ability)
    refreshAbilityModifier(ability)
    refreshAbilitySave(ability)
  })
  Object.values(SKILLS).forEach(skill => refreshSkillScore(skill))

  refreshSubClassList()
  refreshArmorClass()
  refreshAbilities()
  refreshProficiencyBonus()
  refreshClassFeatures()

  setBindings()

  userData.toJSON()
}

function setBindings() {
  exportCharLink.addEventListener("click", exportJSON)

  charOriginElement.addEventListener('change', charOriginChanged)
  charClassElement.addEventListener('change', charClassChanged)
  charSubClassElement.addEventListener('change', charSubClassChanged)
  charSpeciesElement.addEventListener('change', charSpeciesChanged)
  charLevelElement.addEventListener('change', charLevelChanged)
  for (element of Object.values(skillElements).map(_ => _.check)) { element.addEventListener('change', skillChecked) }
  for (element of Object.values(abilityElements).map(_ => _.score)) { element.addEventListener('change', abilityScoreChanged) }
}

init()
