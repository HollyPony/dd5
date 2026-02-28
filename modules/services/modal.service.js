import { ModalHost } from '../../webComponents/ModalHost/ModalHost.js'

/**
 * Open a generic modal shell and mount any web component inside it.
 * Expected contract on the content component:
 * - optionally `setModalProps(props)` when `contentProps` is provided
 * - optionally dispatch `modal:resolve` / `modal:reject` with `bubbles: true`
 *
 * @template T
 * @param {{
 *   contentComponent: { register: Function, tagName: string },
 *   title?: string,
 *   contentProps?: any,
 *   contentAttributes?: Record<string, string>,
 *   dialogClasses?: string[],
 *   hostAttributes?: Record<string, string>
 * }} options
 * @returns {void}
 */
function open(options) {
  const {
    contentComponent,
    title = '',
    contentProps,
    contentAttributes = {},
    dialogClasses = [],
    hostAttributes = {},
  } = options ?? {}
  if (!customElements.get(ModalHost.tagName))
    throw new Error(`Custom element '${ModalHost.tagName}' must be registered before opening a modal.`)

  contentComponent.register()

  const modalElement = document.getElementsByTagName(ModalHost.tagName)[0]
  return modalElement.openModal({
    title,
    contentTagName: contentComponent.tagName,
    contentProps,
    contentAttributes,
    dialogClasses,
    hostAttributes,
  })
}

export default {
  open,
}
