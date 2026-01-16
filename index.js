const charsheet = {
  charName: 'Titus Minus',
  charClass: 'wizard',
  charSubClass: undefined,
  charLevel: 1,
  charOrigin: 'farmer',
  charRace: 'dwarf',
  charAlignment: 'neutralGood',
  charExperience: 200,
  attributes: {
    strength: 15,
    dexterity: 14,
    constitution: 13,
    wisdom: 10,
    intelligence: 8,
    charisma: 12,
  },
  skillChoosed: [],
}

const skillList = {
  acrobatics: 'dexterity',
  animalHandling: 'wisdom',
  arcana: 'intelligence',
  athletics: 'strength',
  deception: 'charisma',
  history: 'intelligence',
  insight: 'wisdom',
  intimidation: 'charisma',
  investigation: 'intelligence',
  medicine: 'wisdom',
  nature: 'intelligence',
  perception: 'wisdom',
  performance: 'charisma',
  persuasion: 'charisma',
  religion: 'intelligence',
  sleightOfHand: 'dexterity',
  stealth: 'dexterity',
  survival: 'wisdom',
}

// INPUTS

const charNameElement = document.getElementsByName('charName')[0]
const charClassElement = document.getElementsByName('charClass')[0]
const charSubClassElement = document.getElementsByName('charSubClass')[0]
const charLevelElement = document.getElementsByName('charLevel')[0]
const charOriginElement = document.getElementsByName('charOrigin')[0]
const charRaceElement = document.getElementsByName('charRace')[0]
const charAlignmentElement = document.getElementsByName('alignment')[0]
const charExperienceElement = document.getElementsByName('experiencepoints')[0]

const proficiencyBonus = document.getElementsByName('proficiencybonus')[0]


// ACCESSORS

function getCharName() { return charsheet.charName }
function getCharClass() { return charsheet.charClass }
function getCharSubClass() { return charsheet.charSubClass }
function getCharLevel() { return charsheet.charLevel }
function getCharOrigin() { return charsheet.charOrigin }
function getCharRace() { return charsheet.charRace }
function getCharAlignment() { return charsheet.charAlignment }
function getCharExperience() { return charsheet.charExperience }
function getAttributeScore(attributeName) { return charsheet.attributes[attributeName] }
function getSkillChoosed() { return charsheet.skillChoosed }

// COMPUTED VALUES

function setAttribute(attributeName, score) { charsheet.attributes[attributeName] = parseInt(score) }
function getAttributeModifier(attributeName) { return Math.floor(getAttributeScore(attributeName) / 2) - 5 }
function getProficencyBonus() { return Math.floor(getCharLevel() / 4) + 2 }
function skillAsText(score) { return score > 0 ? `+${score}` : `${score}` }

// UPDATE INTERFACE

function classChanged() {
  const gamerClass = classes[getCharClass()]
}

// USER INTERACTIONS

function updateModifier(element, score) {
  const attributeName = element.name
  setAttribute(attributeName, score)

  const modifier = getAttributeModifier(attributeName)

  document.getElementsByName(`${attributeName}Modifier`)[0].value = skillAsText(modifier)
}

function skillCheck(element) {
  const skillChecked = document.getElementsByName(`${element.name}`)[0].checked
  if (skillChecked) {
    getSkillChoosed().push(element.name)
  } else {
    getSkillChoosed().splice(getSkillChoosed().indexOf(element.name), 1)
  }

  document.getElementsByClassName(`${element.name}-score`)[0].textContent = skillAsText(
    getAttributeModifier(skillList[element.name]) + (skillChecked ? getProficencyBonus() : 0)
  )

  if (getSkillChoosed().length >= classes[getCharClass()]?.authorizedNumberSkills ?? 0) {
    Object.keys(skillList).forEach((skill) => {
      document.getElementsByName(`${skill}`)[0].disabled = !getSkillChoosed().includes(skill)
    })
    // document.getElementsByClassName('skills')[0].classList.remove('uncompleted')
  } else {
    Object.keys(skillList).forEach((skill) => {
      document.getElementsByName(`${skill}`)[0].disabled = !classes[getCharClass()]?.authorizedSkills?.includes(skill)
    })
    // document.getElementsByClassName('skills')[0].classList.add('uncompleted')
  }
}

// INITIALIZATION

function init() {
  lib.populateSelect(
    charOriginElement,
    Object.keys(origins).map((originName) => ({ value: originName, text: i18n._(`origins.${originName}`), }))
  )

  lib.populateSelect(
    charClassElement,
    Object.keys(classes).map((className) => ({ value: className, text: i18n._(`classes.${className}`), }))
  )

  lib.populateSelect(
    charRaceElement,
    Object.keys(races).map((raceName) => ({ value: raceName, text: i18n._(`races.${raceName}`), }))
  )
}

function setFromData(charsheet) {
  charNameElement.value = getCharName()
  charClassElement.value = getCharClass()
  if (getCharClass()) {
    lib.populateSelect(
      charSubClassElement,
      [
        { value: '', text: i18n._(getCharLevel() < 3 ? `subClasses._unavailable` : `subClasses._select`) },
        ...Object.keys(classes[getCharClass()].subClasses).map((subClassName) => ({
          value: subClassName,
          text: i18n._(`subClasses.${getCharClass()}.${subClassName}`),
        })),
      ],
      { clear: true }
    )

    charSubClassElement.value = getCharLevel() > 2 && getCharSubClass() || ''
    charSubClassElement.disabled = getCharLevel() < 3
  }
  charOriginElement.value = getCharOrigin()
  charRaceElement.value = getCharRace()

  charAlignmentElement.value = getCharAlignment()
  charExperienceElement.value = getCharExperience()

  Object.keys(charsheet.attributes).forEach((attributeName) => {
    const attributeNode = document.getElementsByClassName(`${attributeName}`)[0]

    const score = getAttributeScore(attributeName)
    const modifier = getAttributeModifier(attributeName)

    attributeNode.getElementsByClassName('ability-modifier')[0].value = skillAsText(modifier)
    attributeNode.getElementsByClassName('ability-score')[0].value = score

    if (classes[getCharClass()]?.saves?.includes(attributeName)) {
      attributeNode.getElementsByClassName('save-score')[0].textContent = skillAsText(modifier + getProficencyBonus())
      attributeNode.getElementsByClassName('save-check')[0].checked = true
    } else {
      attributeNode.getElementsByClassName('save-score')[0].textContent = skillAsText(modifier)
    }
  })

  const remainingSkills = classes[getCharClass()]?.authorizedNumberSkills ?? 0 - getSkillChoosed().length
  Object.entries(skillList).forEach(([skill, attribute]) => {
    const skillCheckbox = document.getElementsByName(`${skill}`)[0]

    const isAuthorized = classes[getCharClass()]?.authorizedSkills?.includes(skill)
    const isFromOrigin = origins[getCharOrigin()]?.skills?.includes(skill)
    const isChoosed = getSkillChoosed().includes(skill)

    skillCheckbox.disabled = remainingSkills < 1 || !isAuthorized || isFromOrigin
    skillCheckbox.checked = isFromOrigin || isChoosed

    document.getElementsByClassName(`${skill}-score`)[0].textContent = skillAsText(
      getAttributeModifier(attribute) + (skillCheckbox.checked ? getProficencyBonus() : 0)
    )
  })

  if (remainingSkills > 0) {
    // document.getElementsByClassName('skills')[0].classList.add('uncompleted')
  }

  proficiencyBonus.value = skillAsText(getProficencyBonus())
}

init()
setFromData(charsheet)
