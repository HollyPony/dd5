import { createElement } from '../../modules/domlib.js'
import charSheetService from '../../modules/services/charSheet.service.js'
import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'

export class DebugJsonModalContent extends AbstractComponent {
  static get tagName() { return 'debug-json-modal-content' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #defaultOpenLevels = 2
  #outputElement

  _connectedCallback() {
    this.#outputElement = this.querySelector('[data-debug-output]')
    this.#render()
  }

  #renderJsonTree(value, keyLabel, level = 0) {
    const type = Array.isArray(value) ? 'array' : (value === null ? 'null' : typeof value)

    if (type === 'object' || type === 'array') {
      const container = level === 0
        ? createElement()
        : createElement('div', null, { style: 'padding-left: 1rem;' })

      const entries = type === 'array' ? value.entries() : Object.entries(value)
      for (const [k, v] of entries) {
        container.appendChild(this.#renderJsonTree(v, String(k), level + 1))
      }

      return level === 0
        ? createElement(null, container)
        : createElement('details', [
          createElement('summary', keyLabel ? `${keyLabel} (${type})` : type),
          container,
        ], { open: this.#defaultOpenLevels > level })
    }

    const leaf = document.createElement('div')
    leaf.textContent = keyLabel ? `${keyLabel}: ${JSON.stringify(value)}` : JSON.stringify(value)
    return leaf
  }

  #render() {
    this.#outputElement.replaceChildren(this.#renderJsonTree(JSON.parse(charSheetService.getCurrentRawEntry())))
  }
}

