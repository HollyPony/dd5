import { createElement, populateSelect, } from './modules/domlib.js'
import * as userData from './modules/userData.js'
import { getList as getClassesList, getSubClasses, } from './modules/data/classes.js'
import { origins, } from './modules/data/origins.js'
import { getSpeciesList, } from './modules/data/species.js'
import { getWeapons, } from './modules/data/equipments.js'
import parseMarkdown from './modules/markdown.js'

// TODO: remove mock
import { mock as storedData } from './modules/storeManager.js'
import { ABILITY, SKILLS } from './modules/data/common.js'

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
const charAlignmentElement = document.getElementsByName('alignment')[0]

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

const classFeaturesElement = document.getElementsByClassName('class-features')[0]
const weaponSelectElement = document.getElementsByName('weapons')[0]

//////////////////////////////////////////////////////////////////////
// DISPLAY HELPERS //////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function skillAsText(score) { return score > 0 ? `+${score}` : `${score}` }

// DISPLAY UPDATES

function reloadClassData() { }

function refreshCharName() {
  const charNameElement = document.getElementsByName('charName')[0]
  charNameElement.value = userData.getCharName()
}

function refreshArmorClass() {
  const armorClassElement = document.getElementsByName('armorClass')[0]
  armorClassElement.value = userData.getArmorClass()
}

function refreshProficiencyBonus() {
  const proficiencyBonus = document.getElementsByName('proficiencybonus')[0]
  proficiencyBonus.value = skillAsText(userData.getProficencyBonus())
}

function refreshHitPointMax() {
  const hitPointMaxElement = document.getElementsByName('hitPointMax')[0]
  hitPointMaxElement.value = userData.getHitPointMax()
}

function refreshHitDiceMax() {
  const hitDiceMaxElement = document.getElementsByName('hitDiceMax')[0]
  hitDiceMaxElement.value = userData.getHitDiceMax()
}

function refreshInitiative() {
  const initiative = document.getElementsByName('specs.initiative')[0]
  initiative.value = userData.getAbilityModifier(ABILITY.dexterity)
}

function refreshSpeed() {
  const speed = document.getElementsByName('specs.speed')[0]
  speed.value = userData.getCharSpeed()
}

function refreshSize() {
  const sizeCategory = document.getElementsByClassName('size-category')[0]
  const size = document.getElementsByName('specs.size')[0]

  sizeCategory.value = userData.getSizeCategory()
  size.value = userData.getSize() || ''
}

function refreshPassivePerception() {
  const passivePerception = document.getElementsByName('specs.passivePerception')[0]
  passivePerception.value = userData.getSkillScore(SKILLS.perception) + 10
}

function refreshCharAlignment() {
  charAlignmentElement.value = userData.getCharAlignment()
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
  skillElements[skill.name].score = skillAsText(userData.getSkillScore(skill))
}

function refreshAbilities() {
  Object.values(SKILLS).forEach(skill => {
    skillElements[skill.name].check.disabled = userData.isDisabledSkill(skill)
    skillElements[skill.name].check.checked = userData.isCheckedSkill(skill)
  })
}

function refreshClassFeatures() {
  // TODO: trigger on classChange & subClassChange & levelChange
  while (classFeaturesElement.firstChild) {
    classFeaturesElement.removeChild(classFeaturesElement.firstChild);
  }

  userData.getCharClass()?.features?.forEach(feature => {
    const featureElement = createElement('div', null, { class: 'accordion-item' })
    const header = featureElement.appendChild(createElement('div',
      [createElement('span',
        [document.createTextNode('Lv.' + feature.atLevel + ' - ' + i18n._(`statics.class-features.${userData.getCharClassName()}.${feature.name}.name`))],
        { class: 'input-group-text flex-grow-1', }
      )],
      { class: 'accordion-header input-group' },
    ))
    header.appendChild(createElement('button', ['btn'], { // TODO: translate btn
      class: 'btn btn-outline-secondary',
      type: 'button',
      'data-bs-toggle': 'collapse',
      'data-bs-target': `#collapse-class-features-${userData.getCharClassName()}-${feature.name}`,
      role: 'button',
    }))

    featureElement.appendChild(header)
    featureElement.appendChild(createElement('div',
      [parseMarkdown(i18n._(`statics.class-features.${userData.getCharClassName()}.${feature.name}.description`))],
      {
        id: `collapse-class-features-${userData.getCharClassName()}-${feature.name}`,
        class: 'accordion-collapse collapse',
        'data-bs-parent': '#class-features-accordion',
      },
    ))

    classFeaturesElement.appendChild(featureElement)
  })
}


function updateAbilityScore(ability) {
  refreshAbilityScore(ability)

  updateAbilityModifier(ability)
  updateAbilitySave(ability)
}

function updateAbilityModifier(ability) {
  refreshAbilityModifier(ability)

  Object.values(SKILLS).filter(skill => ability === skill.ability).forEach(skill => refreshSkillScore(skill))
}

function updateAbilitySave(ability) {
  abilityElements[ability].saveScore.textContent = skillAsText(userData.getAbilitySave(ability))
  abilityElements[ability].saveCheck.checked = userData.getCharClass()?.saves?.includes(ability)
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

function charSubClassChanged({ currentTarget: { value } }) {
  userData.setCharSubClassName(currentTarget.value)

  reloadClassData()
  // TODO:
}

function charLevelChanged({ currentTarget: { value } }) {
  userData.setCharLevel(value)

  refreshSubClassList()
  refreshHitPointMax()
  refreshHitDiceMax()
  refreshProficiencyBonus()
  Object.keys(ABILITY).forEach(updateAbilityModifier)
  Object.keys(ABILITY).forEach(updateAbilitySave)

  refreshClassFeatures()
  // Update species abilities / spells etc ...

  // TODO: userData.reloadClass
  // TODO: userData.reloadSpecies
}

function abilityScoreChanged({ currentTarget }) {
  const score = currentTarget.value
  const ability = ABILITY[currentTarget.dataset.ability]

  userData.setAttribute(ability, score)

  updateAbilityScore(ability)
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

  // Set Origins list 
  populateSelect(
    charOriginElement,
    Object.keys(origins).map((originName) => ({ value: originName, text: i18n._(`statics.origins.${originName}`), }))
  )

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
        label: i18n._(`statics.weaponCategories.${category}`),
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

  Object.values(ABILITY).forEach(updateAbilityScore)

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
