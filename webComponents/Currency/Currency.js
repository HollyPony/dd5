import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'

export class Currency extends AbstractComponent {
  static get tagName() { return 'currency-block' }
  static _modulePath = new URL('.', import.meta.url).pathname
}
