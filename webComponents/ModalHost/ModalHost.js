import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import { domOn, replaceElement } from '../../modules/domlib.js'
import { createCustomError, errorKeys } from '../../modules/errors.js'

/**
 * Generic modal wrapper able to host any web component in its body.
 */
export class ModalHost extends AbstractComponent {
  static get tagName() { return 'modal-host' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #modalElement
  #modalDialogElement
  #modalTitleElement
  #modalBodyElement
  #modalInstance

  _connectedCallback() {
    this.#modalElement = this.querySelector('[data-modal-root]')
    this.#modalDialogElement = this.querySelector('[data-modal-dialog]')
    this.#modalTitleElement = this.querySelector('[data-modal-title]')
    this.#modalBodyElement = this.querySelector('[data-modal-body]')

    if (!globalThis.bootstrap?.Modal) throw createCustomError({
      name: 'BootstrapModalError',
      code: errorKeys.modal.bootstrapRequired,
    })

    this.#modalInstance = new globalThis.bootstrap.Modal(this.#modalElement)
  }

  _registerEvents() {
    this._pushEvents(
      domOn(this.#modalElement, 'hidden.bs.modal', this.#hidden),
    )
  }

  _disconnectedCallback() {
    this.#modalInstance.dispose()
  }

  openModal(props) {
    const {
      title = '',
      contentTagName,
      contentProps,
      contentAttributes = {},
      dialogClasses = [],
      hostAttributes = {},
    } = props

    this.#modalTitleElement.textContent = title
    this.#modalDialogElement.classList.add(...dialogClasses)

    for (const [name, value] of Object.entries(hostAttributes)) {
      this.setAttribute(name, value)
    }

    const contentElement = document.createElement(contentTagName)
    for (const [name, value] of Object.entries(contentAttributes)) {
      contentElement.setAttribute(name, value)
    }

    if (contentProps !== undefined) {
      const hasPropsApi = typeof contentElement.setModalProps === 'function'
      if (!hasPropsApi)
        throw createCustomError({
          name: 'ModalContentContractError',
          code: errorKeys.modal.contentMissingSetModalProps,
          interpolations: { contentTagName },
        })
      contentElement.setModalProps(contentProps)
    }

    replaceElement(this.#modalBodyElement, contentElement)
    this.#modalInstance.show()
  }

  closeModal() {
    this.#modalInstance.hide()
  }

  #hidden = () => {
    this.#modalTitleElement.textContent = ''
    this.#modalDialogElement.className = 'modal-dialog modal-dialog-scrollable'

    while (this.attributes.length > 0)
      this.removeAttribute(this.attributes[0].name)

    replaceElement(this.#modalBodyElement)
  }
}
