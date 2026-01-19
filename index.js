import { createElement, selectHelper } from './modules/domlib.js'
import * as userData from './modules/userData.js'
import { getList as getClassesList, getSubClasses, } from './modules/data/classes.js'
import { origins, } from './modules/data/origins.js'
import { getSpeciesList, } from './modules/data/species.js'
import { weapons, } from './modules/data/equipments.js'
import { abilities, getAllSkills } from './modules/data/abilities.js'
import parseMarkdown from './modules/markdown.js'

// TODO: remove mock
import { mock as storedData } from './modules/storeManager.js'

/////////////////////////////////////////////////////////////////////////
// INPUTS ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

const charNameElement = document.getElementsByName('charName')[0]
const charClassElement = document.getElementsByName('charClass')[0]
const charSubClassElement = document.getElementsByName('charSubClass')[0]
const charLevelElement = document.getElementsByName('charLevel')[0]
const charOriginElement = document.getElementsByName('charOrigin')[0]
const charRaceElement = document.getElementsByName('charRace')[0]
const charAlignmentElement = document.getElementsByName('alignment')[0]
const charExperienceElement = document.getElementsByName('experiencepoints')[0]
const armorClassElement = document.getElementsByName('armorClass')[0]

const proficiencyBonus = document.getElementsByName('proficiencybonus')[0]

const abilityElements = {}
const skillElements = {}
Object.entries(abilities).forEach(([ability, value]) => {
  const abilityElement = document.getElementsByClassName(`${ability}`)[0]

  abilityElements[ability] = {
    root: abilityElement,
    score: abilityElement.getElementsByClassName('ability-score')[0],
    modifier: abilityElement.getElementsByClassName('ability-modifier')[0],
    saveCheck: abilityElement.getElementsByClassName('save-check')[0],
    saveScore: abilityElement.getElementsByClassName('save-score')[0],
  }

  value.relatedSkills.forEach(skill =>
    skillElements[skill] = {
      check: document.getElementsByClassName(`skill-check ${skill}-check`)[0],
      score: document.getElementsByClassName(`skill-score ${skill}-score`)[0],
    }
  )
})


const classFeaturesElement = document.getElementsByClassName('class-features')[0]

// SPECS INPUTS

const specsElements = {
  initiative: document.getElementsByName('specs.initiative')[0],
  speed: document.getElementsByName('specs.speed')[0],
  sizeCategory: document.getElementsByClassName('size-category')[0],
  size: document.getElementsByName('specs.size')[0],
  passivePerception: document.getElementsByName('specs.passivePerception')[0],
}


const weaponSelectElement = document.getElementsByName('weapons')[0]

//////////////////////////////////////////////////////////////////////
// DISPLAY HELPERS //////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function skillAsText(score) { return score > 0 ? `+${score}` : `${score}` }

// DISPLAY UPDATES

function refreshSubClass() {
  if (userData.getCharClassName()) {
    selectHelper.populate(
      charSubClassElement,
      [
        { value: '', text: i18n._(userData.getCharLevel() < 3 ? `subClasses._unavailable` : `subClasses._select`) },
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
}

function refreshArmorClass() {
  armorClassElement.value = userData.getArmorClass()
}

function refreshProficiencyBonus() {
  proficiencyBonus.value = skillAsText(userData.getProficencyBonus())
}

function refreshClassFeatures() {
  // TODO: trigger on classChange & subClassChange & levelChange
  while (classFeaturesElement.firstChild) {
    classFeaturesElement.removeChild(classFeaturesElement.firstChild);
  }

  userData.getCharClass().features?.forEach(feature => {
    const featureElement = createElement('div', null, { class: 'accordion-item' })
    const header = featureElement.appendChild(createElement('div',
      createElement('span',
        document.createTextNode('Lv.' + feature.atLevel + ' - ' + i18n._(`statics.class-features.${userData.getCharClassName()}.${feature.name}.name`)), {
        class: 'input-group-text flex-grow-1',
      }),
      { class: 'accordion-header input-group' },
    ))
    header.appendChild(createElement('button', 'btn', {
      class: 'btn btn-outline-secondary',
      type: 'button',
      'data-bs-toggle': 'collapse',
      'data-bs-target': `#collapse-class-features-${userData.getCharClassName()}-${feature.name}`,
      role: 'button',
    }))

    featureElement.appendChild(header)
    featureElement.appendChild(createElement('div',
      parseMarkdown(i18n._(`statics.class-features.${userData.getCharClassName()}.${feature.name}.description`)),
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
  abilityElements[ability].score.value = userData.getAbilityScore(ability)

  updateAbilityModifier(ability)
  updateAbilitySave(ability)
}

function updateAbilityModifier(ability) {
  abilityElements[ability].modifier.value = skillAsText(userData.getAbilityModifier(ability))

  abilities[ability].relatedSkills.forEach(updateSkillScore)
}

function updateAbilitySave(ability) {
  abilityElements[ability].saveScore.textContent = skillAsText(userData.getAbilitySave(ability))
  abilityElements[ability].saveCheck.checked = userData.getCharClass()?.saves?.includes(ability)
}

function updateSkillScore(skill) {
  const skillScoreElement = skillElements[skill].score

  skillScoreElement.textContent = skillAsText(userData.getSkillScore(skill))
}

function refreshAbilities() {
  Object.entries(abilities).forEach(([abilityName, abilityValue]) => { // ability
    abilityValue.relatedSkills.forEach(skill => {
      skillElements[skill].check.disabled = userData.isDisabledSkill(skill)
      skillElements[skill].check.checked = userData.isCheckedSkill(skill)
    })

    // updateAbilityScore(abilityName)
  })
}

/////////////////////////////////////////////////////////////////////////
// EVENTS ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function charClassChanged(event) {
  userData.setCharClassName(event.currentTarget.value)
  refreshSubClass()
}

function charOriginChanged(event) {
  // TODO: alert skills lost
  userData.setCharOrigin(event.currentTarget.value)
  userData.skillChoosedClear()

  refreshAbilities()
}

function charSpeciesChanged(event) {
  userData.setCharSpeciesName(event.currentTarget.value)
  // TODO
}

function charSubClassChanged(event) {
  userData.setCharSubClassName(event.currentTarget.value)
  // TODO:
}

function charLevelChanged(event) {
  userData.setCharLevel(event.currentTarget.value)

  refreshSubClass()
  refreshProficiencyBonus()
  Object.keys(abilities).forEach(updateAbilityModifier)
  Object.keys(abilities).forEach(updateAbilitySave)
  // Update species abilities / spells etc ...

  // TODO: userData.reloadClass
  // TODO: userData.reloadSpecies
}

function abilityScoreChanged(event) {
  const score = event.currentTarget.value
  const ability = element.dataset.ability

  userData.setAttribute(ability, score)

  updateAbilityScore(ability)
  // updateAbilityModifier(ability)
}

function skillChecked(event) {
  const element = event.currentTarget

  const skill = element.name
  const skillChecked = skillElements[skill].check.checked

  userData[skillChecked ? 'skillChoosedAdd' : 'skillChoosedRemove'](skill)

  updateSkillScore(skill)

  getAllSkills().forEach((skill) => {
    skillElements[skill].check.disabled = userData.isDisabledSkill(skill)
  })
}

/////////////////////////////////////////////////////////////////////////
// INITIALIZATION ///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function init(charsheet) {
  // Set Origins list
  selectHelper.populate(
    charOriginElement,
    Object.keys(origins).map((originName) => ({ value: originName, text: i18n._(`statics.origins.${originName}`), }))
  )

  // Set Classes list
  selectHelper.populate(
    charClassElement,
    getClassesList().map(className => ({ value: className, text: i18n._(`statics.classes.${className}`), }))
  )

  // Set Races list
  selectHelper.populate(
    charRaceElement,
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

  selectHelper.populate(
    weaponSelectElement,
    [
      { value: '', text: i18n._('weaponscantrip.weapons._select') },
      ...Object.entries(weapons).map(([weaponClass, weapons]) => ({
        isGroup: true,
        label: i18n._(`weaponClasses.${weaponClass}`),
        options: Object.keys(weapons).map(weapon => ({ value: weapon, text: i18n._(`weapons.${weapon}`) })),
      })),
    ]
  )

  // Init data
  userData.init(charsheet)

  charNameElement.value = userData.getCharName()
  charClassElement.value = userData.getCharClassName()

  charOriginElement.value = userData.getCharOrigin()
  charRaceElement.value = userData.getCharSpeciesName()

  charAlignmentElement.value = userData.getCharAlignment()
  charExperienceElement.value = userData.getCharExperience()
  charLevelElement.value = userData.getCharLevel()

  const species = userData.getCharSpecies()
  specsElements.initiative.value = userData.getAbilityModifier('dexterity')
  specsElements.speed.value = species?.speed || 0 // TODO: take armor strength + update on armor change
  specsElements.sizeCategory.value = userData.getSizeCategory()
  specsElements.size.value = userData.getSize() || ''
  specsElements.passivePerception.value = userData.getSkillScore('perception') + 10

  Object.keys(abilities).forEach(abilityName => updateAbilityScore(abilityName))

  refreshSubClass()
  refreshArmorClass()
  refreshAbilities()
  refreshProficiencyBonus()
  refreshClassFeatures()
}

function setBindings() {
  charOriginElement.addEventListener('change', charOriginChanged)
  charClassElement.addEventListener('change', charClassChanged)
  charLevelElement.addEventListener('change', charLevelChanged)
  for (element of Object.values(skillElements).map(_ => _.check)) { element.addEventListener('change', skillChecked) }
  for (element of Object.values(abilityElements).map(_ => _.score)) { element.addEventListener('change', abilityScoreChanged) }
}

init(storedData)
setBindings()
