import { AbstractComponent } from '../AbstractComponent/index.js'
import charSheetStore from '../../modules/stores/charSheet.store.js'
import charSheetObserver from '../../modules/stores/charSheet.observer.js'
import { createElement, replaceElement, } from '../../modules/domlib.js'
import { ABILITY, SKILLS, } from '../../modules/common.js'
import { signDisplay, } from '../../modules/helpers.js'
import { domSubscribe } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'

// const ModifierChangedEventName = 'Ability.modifierChanged'
// const ModifierChangedEvent = new CustomEvent(ModifierChangedEventName)

export class Ability extends AbstractComponent {
  static get tagName() { return 'ability-card' }
  static get _componentPath() { return '/components/Ability' }

  #scoreElement
  #modifierElement
  #save
  #skills
  #skillsContainer
  #labelElement

  _connectedCallback() {
    console.info('-- Ability.connectedCallback')

    this.ability = ABILITY[this.dataset.ability]

    this.#labelElement = this.querySelector('[data-wc-id]')
    this.#scoreElement = this.querySelector('.ability-score')
    this.#modifierElement = this.querySelector('.ability-modifier')
    this.#save = {
      check: this.querySelector('.save-check'),
      score: this.querySelector('.save-score'),
      label: this.querySelector('.save-label'),
    }
    this.#skillsContainer = this.querySelector('.skills')

    this.#skills = Object.values(SKILLS).filter(skill => skill.ability === this.ability)

    replaceElement(this.#labelElement, t.tn(`statics.${this.ability}`))
    replaceElement(this.#save.label, t.tn('ability.save.label'))

    this.#refreshScore()
    this.#refreshModifier()
    this.#refreshSave()
    this.#refreshSkills()
  }

  _registerEvents() {
    this._pushEvents(
      // TODO: trigger per input ?
      domSubscribe(this.#scoreElement, 'change', this.#scoreChanged),
      charSheetObserver.subscribe('charLevel', this.#levelChanged),
      charSheetObserver.subscribe('classSkills', this.#skillsChanged),
      charSheetObserver.subscribe('expertSkills', this.#skillsChanged),
    )
  }

  #refreshScore = () => {
    console.info('-- Ability.#refreshScore', this.ability)

    const score = charSheetStore.getAbilityScore(this.ability)
    this.#scoreElement.value = score
  }

  #refreshModifier = () => {
    console.info('-- Ability.#refreshModifier', this.ability)
    const modifier = charSheetStore.getAbilityModifier(this.ability)
    this.#modifierElement.value = signDisplay(modifier)
  }

  #refreshSave() {
    console.info('-- Ability.#refreshSave', this.ability)
    this.#save.score.textContent = signDisplay(charSheetStore.getAbilitySave(this.ability))
    this.#save.check.checked = charSheetStore.getCharClass()?.saves?.includes(this.ability)
  }

  #refreshSkills() {
    console.info('-- Ability.#refreshSkills', this.ability)

    this.#skillsContainer.classList[this.#skills.length > 0 ? 'add' : 'remove']('ability-card-content')
    replaceElement(this.#skillsContainer, this.#skills.map((skill) => {
      const isExpert = charSheetStore.isExpertSkill(skill)
      return createElement('div', [
        createElement('input', null, {
          name: `${skill.name}.${this._id}`,
          type: 'checkbox', class: `form-check-input checkbox-readonly skill-check${isExpert ? ' expert' : ''}`,
          tabindex: '-1',
          checked: charSheetStore.isCheckedSkill(skill),
        }),
        createElement('span', signDisplay(charSheetStore.getSkillScore(skill)), { class: 'skill-score' }),
        createElement('label', t._(`statics.${skill.name}`), {
          id: `${skill.name}.${this._id}`,
        }),
      ], { class: 'form-check' })
    }))
  }

  #scoreChanged = ({ target: { value }, isTrusted }) => {
    console.info('-- Ability.#scoreChanged', this.ability, value)

    if (isTrusted) {
      // TODO: Am I sure about that ?
      charSheetStore.setAbilityScore(this.ability, Number(value))
    }

    const modifier = charSheetStore.getAbilityModifier(this.ability)
    this.#modifierElement.value = signDisplay(modifier)

    this.#refreshSave()
    this.#refreshModifier()
    this.#refreshSave()
    this.#refreshSkills()
  }

  #levelChanged = () => {
    console.info('-- Ability.#levelChanged', this.ability)
    this.#refreshScore()
    this.#refreshModifier()
    this.#refreshSave()
    this.#refreshSkills()
  }

  #skillsChanged = () => {
    console.info('-- Ability.#skillsChanged',)
    this.#refreshSkills()
  }

  _i18nChanged = () => {
    console.info('-- Ability.#i18nChanged', this.ability)
    replaceElement(this.#labelElement, t.tn(`statics.${this.ability}`))
    replaceElement(this.#save.label, t.tn('ability.save.label'))
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
