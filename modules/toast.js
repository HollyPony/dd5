import { isAppError, onError } from './errors.js'
import { t, currentLang } from './i18n.js'

const toastContainer = document.getElementById('toastContainer')

onError(function onWindowError(event) {
  // JS runtime error (throw, syntax, etc.)
  const error = event.error || (event.reason && (event.reason instanceof Error ? event.reason : new Error(String(event.reason))))
  if (error) return showErrorToast(error)

  // Resource loading error (<script>, <img>, <link>, etc.)
  const target = event.target
  const resourceUrl = target?.currentSrc || target?.src || target?.href || ''
  if (resourceUrl) return showErrorToast(new Error(`Failed to load resource: ${resourceUrl}`))

  return showErrorToast(new Error(event.message || 'Unhandled window error'))
})

export function showToast({ title, message, variant = 'danger', delay = 5000, autohide = true } = {}) {
  if (!toastContainer) return

  const toastElement = document.createElement('div')
  toastElement.className = `toast text-bg-${variant} border-0`
  toastElement.setAttribute('role', 'alert')
  toastElement.setAttribute('aria-live', 'assertive')
  toastElement.setAttribute('aria-atomic', 'true')

  toastElement.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${title ? `<strong class="me-2">${title}</strong>` : ''}
        ${message ?? ''}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `

  toastContainer.appendChild(toastElement)

  const toast = new window.bootstrap.Toast(toastElement, { delay, autohide })
  toast.show()

  toastElement.addEventListener('hidden.bs.toast', () => {
    toastElement.remove()
  })
}

export function showErrorToast(error, options = {
  autohide: false,
}) {
  if (!error) return
  const message = (isAppError(error) && currentLang)
    ? t._(`errors.${error.code}`, error.interpolations)
    : (error.message || String(error))

  showToast({
    title: error.name || 'Error',
    message,
    variant: 'danger',
    ...options,
  })
}
