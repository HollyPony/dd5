import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'

export class Spellbook extends AbstractComponent {
  static get tagName() { return 'spellbook-block' }
  static _modulePath = new URL('.', import.meta.url).pathname
}
