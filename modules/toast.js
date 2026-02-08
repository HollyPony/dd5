import observer, { observables as errors } from '../index.observer.js'

const toastContainer = document.getElementById('toastContainer')

observer.subscribe(errors.ERROR_TECHNICAL, showErrorToast)
observer.subscribe(errors.ERROR_CUSTOM, showErrorToast)

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
  showToast({
    title: error.name || 'Error',
    message: error.message || String(error),
    variant: 'danger',
    ...options,
  })
}
