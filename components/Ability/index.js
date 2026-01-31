import { AbstractComponent } from '../AbstractComponent/index.js'
import { createElement, removeAllChildren } from '../../modules/domlib.js'
import { ABILITY, SKILLS, } from '../../modules/common.js'
import { signDisplay, } from '../../modules/helpers.js'
import { i18n } from '../../modules/i18n.js'
import * as userData from '../../modules/userData.js'

// const ModifierChangedEventName = 'Ability.modifierChanged'
// const ModifierChangedEvent = new CustomEvent(ModifierChangedEventName)

export class Ability extends AbstractComponent {
  static get _componentPath() {
    return '/components/Ability'
  }

  #scoreElement
  #modifierElement
  #save
  #skills
  #skillsContainer

  async connectedCallback() {
    await super.connectedCallback()
    console.info('-- Ability.connectedCallback')

    this.ability = ABILITY[this.dataset.ability]

    const labelElement = this.querySelector('[data-wc-id]')
    labelElement.appendChild(i18n.tn(`statics.${this.ability}`))

    this.#scoreElement = this.querySelector('.ability-score')
    this.#modifierElement = this.querySelector('.ability-modifier')

    this.#save = {
      check: this.querySelector('.save-check'),
      score: this.querySelector('.save-score'),
      label: this.querySelector('.save-label'),
    }

    this.#skills = Object.values(SKILLS).filter(skill => skill.ability === this.ability)
    if (this.#skills.length > 0) {
      this.#skillsContainer = this.querySelector('.skills')
      this.#skillsContainer.classList.add('ability-card-content')
    }

    this.#save.label.appendChild(i18n.tn('ability.save.label'))

    this.#registerEvents()

    this.#refreshScore()
  }

  disconnectedCallback() {
    this.#unregisterEvents()
  }

  #registerEvents() {
    // TODO: trigger per input ?
    this.#scoreElement.addEventListener('change', this.#scoreChanged)

    document.addEventListener("userData.charLevelChanged", this.#levelChanged)
  }

  #unregisterEvents() {
    this.#scoreElement.removeEventListener('change', this.#scoreChanged)

    document.removeEventListener("userData.charLevelChanged", this.#levelChanged)
  }

  #refreshScore = () => {
    console.info('-- Ability.#refreshScore', this.ability)

    const score = userData.getAbilityScore(this.ability)
    this.#scoreElement.value = score

    this.#scoreElement.dispatchEvent(new Event('change'))
  }

  #refreshSave() {
    console.info('-- Ability.#refreshSave', this.ability)
    this.#save.score.textContent = signDisplay(userData.getAbilitySave(this.ability))
    this.#save.check.checked = userData.getCharClass()?.saves?.includes(this.ability)
  }

  #refreshSkills() {
    console.info('-- Ability.#refreshSkills', this.ability)
    removeAllChildren(this.#skillsContainer)
    this.#skills.forEach(this.#appendSkill)
  }

  #appendSkill = (skill) => {
    console.info('-- Ability.#appendSkill', this.ability)
    this.#skillsContainer.appendChild(createElement('div', [
      createElement('input', null, {
        type: 'checkbox', class: 'form-check-input skill-check',
        disabled: userData.isDisabledSkill(skill), // TODO: Should be all disable
        checked: userData.isCheckedSkill(skill),
      }),
      createElement('span', signDisplay(userData.getAbilitySave(this.ability)), { class: 'skill-score' }),
      createElement('label', i18n._(`statics.${skill.name}`)),
    ], { class: 'form-check' }))
  }

  #scoreChanged = ({ target: { value }, isTrusted }) => {
    console.info('-- Ability.#scoreChanged', this.ability, value)

    if (isTrusted) {
      // TODO: Am I sure about that ?
      userData.setAttribute(this.ability, value)
    }

    const modifier = userData.getAbilityModifier(this.ability)
    this.#modifierElement.value = signDisplay(modifier)

    this.#refreshSave()
    this.#refreshSkills()
  }

  #levelChanged = () => {
    console.info('-- Ability.#levelChanged', this.ability)
    this.#refreshScore()
  }

  // static get observedAttributes() {
  //   return ['score']
  // }
  // attributeChangedCallback(name, oldValue, newValue) {
  //   console.info('-- Ability.attributeChangedCallback', name, oldValue, newValue);
  //   // this.querySelector('.ability-score').value = newValue;
  //   switch (name) {
  //     case 'score': return this.#updateScore(oldValue, newValue)
  //     case 'value': return this.#updateValue(oldValue, newValue)
  //   }
  // }
}
