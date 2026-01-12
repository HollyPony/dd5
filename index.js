const charsheet = {
  charName: 'Titus Minus',
  charClass: 'wizard',
  charLevel: 1,
  charOrigin: 'farmer',
  playerName: 'Arthur',
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
  'acrobatics': 'dexterity',
  'animalHandling': 'wisdom',
  'arcana': 'intelligence',
  'athletics': 'strength',
  'deception': 'charisma',
  'history': 'intelligence',
  'insight': 'wisdom',
  'intimidation': 'charisma',
  'investigation': 'intelligence',
  'medicine': 'wisdom',
  'nature': 'intelligence',
  'perception': 'wisdom',
  'performance': 'charisma',
  'persuasion': 'charisma',
  'religion': 'intelligence',
  'sleightOfHand': 'dexterity',
  'stealth': 'dexterity',
  'survival': 'wisdom',
}

function getPlayName() {
  return charsheet.playerName
}

function getCharName() {
  return charsheet.charName
}

function getCharClass() {
  return charsheet.charClass
}

function getCharLevel() {
  return charsheet.charLevel
}

function getCharOrigin() {
  return charsheet.charOrigin
}

function getCharRace() {
  return charsheet.charRace
}

function getCharAlignment() {
  return charsheet.charAlignment
}

function getCharExperience() {
  return charsheet.charExperience
}

function getAttributeScore(attributeName) {
  return charsheet.attributes[attributeName]
}

function setAttribute(attributeName, score) {
  charsheet.attributes[attributeName] = parseInt(score)
}

function getAttributeModifier(attributeName) {
  return Math.floor(getAttributeScore(attributeName) / 2) - 5
}

function getSkillChoosed() {
  return charsheet.skillChoosed
}

function getProficencyBonus() {
  return Math.floor(getCharLevel()/4) + 2
}

function skillAsText(score) {
  return score > 0 ? `+${score}` : `${score}`
}

// USER INTERACTIONS

function updateModifier(element, score) {
  const attributeName = element.name
  setAttribute(attributeName, score)

  const modifier = getAttributeModifier(attributeName)

  document.getElementsByName(`${attributeName}Modifier`)[0].value =
    skillAsText(modifier)
}

function skillCheck(element) {
  const skillChecked = document.getElementsByName(element.name)[0].checked
  if (skillChecked) {
    getSkillChoosed().push(element.name)
  } else {
    getSkillChoosed().splice(getSkillChoosed().indexOf(element.name), 1)
  }
  
  document.getElementsByName(`${element.name}Score`)[0].value =
    skillAsText(getAttributeModifier(skillList[element.name]) + (skillChecked ? getProficencyBonus() : 0))
  
  if (getSkillChoosed().length >= classes[getCharClass()]?.authorizedNumberSkills ?? 0) {
    Object.keys(skillList).forEach(skill => {
      document.getElementsByName(`${skill}`)[0].disabled = !getSkillChoosed().includes(skill)
    })
    document.getElementsByClassName('skills')[0].classList.remove('uncompleted')
  } else {
    Object.keys(skillList).forEach(skill => {
      document.getElementsByName(`${skill}`)[0].disabled = !classes[getCharClass()]?.authorizedSkills?.includes(skill)
    })
    document.getElementsByClassName('skills')[0].classList.add('uncompleted')
  }
}

// INITIALIZATION

function setFromData (charsheet) {
  document.getElementsByName('charname')[0].value =
    getCharName()
  document.getElementsByName('classlevel')[0].value =
    getCharClass() ? `${getCharClass()} Lv.${getCharLevel()}` : null
  document.getElementsByName('origin')[0].value =
    getCharOrigin()
  document.getElementsByName('playername')[0].value =
    getPlayName()
  document.getElementsByName('race')[0].value =
    getCharRace()
  document.getElementsByName('alignment')[0].value =
    getCharAlignment()
  document.getElementsByName('experiencepoints')[0].value =
    getCharExperience()

  Object.keys(charsheet.attributes).forEach(attributeName => {
    const score = getAttributeScore(attributeName)
    const modifier = getAttributeModifier(attributeName)
    
    document.getElementsByName(`${attributeName}`)[0].value =
      score
    document.getElementsByName(`${attributeName}Modifier`)[0].value =
      skillAsText(modifier)

    if (classes[getCharClass()]?.saves?.includes(attributeName)) {
      document.getElementsByName(`${attributeName}Save`)[0].value =
        skillAsText(modifier + getProficencyBonus())
      document.getElementsByName(`${attributeName}SaveProf`)[0].checked = true
    } else {
      document.getElementsByName(`${attributeName}Save`)[0].value =
        skillAsText(modifier)
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

    document.getElementsByName(`${skill}Score`)[0].value =
        skillAsText(getAttributeModifier(attribute) + (skillCheckbox.checked ? getProficencyBonus() : 0))
  })

  if (remainingSkills > 0) {
    document.getElementsByClassName('skills')[0].classList.add('uncompleted')
  }

  document.getElementsByName('proficiencybonus')[0].value = skillAsText(getProficencyBonus())
}

setFromData(charsheet)