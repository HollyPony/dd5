import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import charSheetStore, { properties as charSheetProps } from '../../modules/stores/charSheet.derived.store.js'
import { ABILITY, SKILLS } from '../../modules/common.js'
import { createElement, domSubscribe, replaceElement } from '../../modules/domlib.js'
import { signDisplay } from '../../modules/helpers.js'
import { t } from '../../modules/i18n.js'

export class Ability extends AbstractComponent {
  static get tagName() { return 'ability-card' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #ability
  #labelElement
  #scoreElement
  #modifierElement
  #save
  #skills
  #skillsContainer

  _connectedCallback() {
    console.info('-- Ability.connectedCallback')

    this.#ability = ABILITY[this.dataset.ability]

    this.#labelElement = this.querySelector('[data-wc-id]')
    this.#scoreElement = this.querySelector('.ability-score')
    this.#modifierElement = this.querySelector('.ability-modifier')
    this.#save = {
      check: this.querySelector('.save-check'),
      score: this.querySelector('.save-score'),
      label: this.querySelector('.save-label'),
    }
    this.#skillsContainer = this.querySelector('.skills')

    this.#skills = Object.values(SKILLS).filter(skill => skill.ability === this.#ability)

    replaceElement(this.#labelElement, t.tn(`statics.${this.#ability}`))
    replaceElement(this.#save.label, t.tn('ability.save.label'))

    this.#renderScore()
    this.#renderModifier()
    this.#renderSave()
    this.#renderSkills()
  }

  _registerEvents() {
    this._pushEvents(
      // TODO: trigger per input ?
      domSubscribe(this.#scoreElement, 'change', this.#scoreChanged),
      charSheetStore.onMap({
        [charSheetProps.attributes]: [this.#renderScore],
        [charSheetProps.modifiers]: [this.#renderModifier, this.#renderSkills],
        [charSheetProps.saves]: [this.#renderSave],
        [charSheetProps.skills]: [this.#renderSkills],
      }),
    )
  }

  #renderScore = () => {
    console.info('-- Ability.#renderScore', this.#ability)

    const score = charSheetStore.getAttribute(this.#ability)
    this.#scoreElement.value = score
  }

  #renderModifier = () => {
    console.info('-- Ability.#renderModifier', this.#ability)
    const modifier = charSheetStore.getModifier(this.#ability)
    this.#modifierElement.value = signDisplay(modifier)
  }

  #renderSave = () => {
    console.info('-- Ability.#renderSave', this.#ability)
    this.#save.score.textContent = signDisplay(charSheetStore.getSave(this.#ability))
    this.#save.check.checked = charSheetStore.getCharClass()?.saves?.includes(this.#ability)
  }

  #renderSkills = () => {
    console.info('-- Ability.#renderSkills', this.#ability)

    this.#skillsContainer.classList[this.#skills.length > 0 ? 'add' : 'remove']('ability-card-content')
    replaceElement(this.#skillsContainer, this.#skills.map((skill) => {
      const userSkill = charSheetStore.getSkill(skill)
      return createElement('div', [
        createElement('input', null, {
          name: `${skill.name}.${this._id}`,
          type: 'checkbox', class: `form-check-input checkbox-readonly skill-check${userSkill?.expert ? ' expert' : ''}`,
          tabindex: '-1',
          checked: userSkill?.checked ?? false,
        }),
        createElement('span', signDisplay(userSkill?.score ?? 0), { class: 'skill-score' }),
        createElement('label', t._(`statics.${skill.name}`), {
          id: `${skill.name}.${this._id}`,
        }),
      ], { class: 'form-check' })
    }))
  }

  #scoreChanged = ({ target: { value } }) => {
    console.info('-- Ability.#scoreChanged', this.#ability, value)

    charSheetStore.setAbilityScore(this.#ability, Number(value))
  }

  _i18nChanged = () => {
    console.info('-- Ability.#i18nChanged', this.#ability)
    replaceElement(this.#labelElement, t.tn(`statics.${this.#ability}`))
    replaceElement(this.#save.label, t.tn('ability.save.label'))
    this.#renderSkills()
  }
}
