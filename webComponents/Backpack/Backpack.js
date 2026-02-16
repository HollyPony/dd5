import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'

export class Backpack extends AbstractComponent {
  static get tagName() { return 'backpack-block' }
  static _modulePath = new URL('.', import.meta.url).pathname
}
