import { AbstractComponent } from '../AbstractComponent/index.js'
import charSheet from '../../modules/stores/charSheet.store.js'
import { createElement, removeAllChildren } from '../../modules/domlib.js'
import { ABILITY, SKILLS, } from '../../modules/common.js'
import { signDisplay, } from '../../modules/helpers.js'
import { i18n } from '../../modules/i18n.js'

// const ModifierChangedEventName = 'Ability.modifierChanged'
// const ModifierChangedEvent = new CustomEvent(ModifierChangedEventName)

export class Ability extends AbstractComponent {
  static get tagName() { return 'ability-card' }
  static get _componentPath() { return '/components/Ability' }

  #subscriptions = []

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

    this.#subscriptions.push(
      charSheet.subscribe('charLevel', this.#levelChanged),
      charSheet.subscribe('classSkills', this.#skillsChanged),
    )
  }

  #unregisterEvents() {
    this.#scoreElement.removeEventListener('change', this.#scoreChanged)

    document.removeEventListener('CharSheet.skillsChanged', this.#skillsChanged)

    this.#subscriptions.forEach(subscriber => subscriber())
  }

  #refreshScore = () => {
    console.info('-- Ability.#refreshScore', this.ability)

    const score = charSheet.getAbilityScore(this.ability)
    this.#scoreElement.value = score

    this.#scoreElement.dispatchEvent(new Event('change'))
  }

  #refreshSave() {
    console.info('-- Ability.#refreshSave', this.ability)
    this.#save.score.textContent = signDisplay(charSheet.getAbilitySave(this.ability))
    this.#save.check.checked = charSheet.getCharClass()?.saves?.includes(this.ability)
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
        name: `${skill.name}.${this._id}`,
        type: 'checkbox', class: 'form-check-input checkbox-readonly skill-check',
        tabindex: '-1',
        checked: charSheet.isCheckedSkill(skill),
      }),
      createElement('span', signDisplay(charSheet.getSkillScore(skill)), { class: 'skill-score' }),
      createElement('label', i18n._(`statics.${skill.name}`), {
        id: `${skill.name}.${this._id}`,
      }),
    ], { class: 'form-check' }))
  }

  #scoreChanged = ({ target: { value }, isTrusted }) => {
    console.info('-- Ability.#scoreChanged', this.ability, value)

    if (isTrusted) {
      // TODO: Am I sure about that ?
      charSheet.setAbilityScore(this.ability, Number(value))
    }

    const modifier = charSheet.getAbilityModifier(this.ability)
    this.#modifierElement.value = signDisplay(modifier)

    this.#refreshSave()
    this.#refreshSkills()
  }

  #levelChanged = () => {
    console.info('-- Ability.#levelChanged', this.ability)
    this.#refreshScore()
  }

  #skillsChanged = () => {
    console.info('-- Ability.#skillsChanged',)
    this.#refreshSkills()
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
