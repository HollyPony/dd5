import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'

export class CharacterProfile extends AbstractComponent {
  static get tagName() { return 'character-profile-block' }
  static _modulePath = new URL('.', import.meta.url).pathname
}
