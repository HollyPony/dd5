import { domSubscribe } from './domlib.js'

const errorSubscriptions = []
errorSubscriptions.push(
  domSubscribe(window, 'pagehide', function unregisterSubscriptions() {
    while (errorSubscriptions.length) errorSubscriptions.pop()?.()
  })
)

export function onError(callback) {
  errorSubscriptions.push(
    domSubscribe(window, 'error', callback, true),
    domSubscribe(window, 'unhandledrejection', callback),
  )
}

function createCustomError({ name, message, args = [] }) {
  const error = new Error(message, ...args)
  Object.setPrototypeOf(error, createCustomError.prototype)
  error.name = name
  return error
}
createCustomError.prototype = Object.create(Error.prototype, { constructor: { value: createCustomError, } })

export function InvalidClassNameError(className, ...props) {
  return createCustomError({
    name: 'InvalidClassNameError',
    message: `Invalid Class '${className}'`,
    args: props,
  })
}

export function InvalidSubClassNameError(subClassName, className, ...props) {
  return createCustomError({
    name: 'InvalidSubClassNameError',
    message: `Invalid SubClass '${subClassName}' for '${className}'`,
    args: props,
  })
}

export function MissingPathError(message, ...props) {
  return createCustomError({
    name: 'MissingPathError',
    message: message ?? `A 'path' is required`,
    args: props,
  })
}

export function StorageError(message, ...props) {
  return createCustomError({
    name: 'StorageError',
    message: message || 'Storage error',
    args: props,
  })
}

export function InvalidCharacterFieldError(fieldName, reason = 'Invalid value', ...props) {
  return createCustomError({
    name: 'InvalidCharacterFieldError',
    message: `Invalid character field '${fieldName}': ${reason}`,
    args: props,
  })
}
