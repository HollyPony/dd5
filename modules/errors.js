import { domOn } from './domlib.js'
import errorKeys from './errorKeys.js'

const errorListeners = []
errorListeners.push(
  domOn(window, 'pagehide', function off() {
    while (errorListeners.length) errorListeners.pop()?.()
  })
)

export function onError(callback) {
  errorListeners.push(
    domOn(window, 'error', callback, true),
    domOn(window, 'unhandledrejection', callback),
  )
}

/**
 * Create an application error with optional metadata.
 * When `code` is provided, the error is considered translatable by i18n (`errors.{code}`).
 *
 * @param {{
 *   name?: string,
 *   message?: string,
 *   args?: any[],
 *   cause?: any,
 *   code?: string,
 *   interpolations?: Object|Array,
 * }} [options={}]
 * @returns {Error & { code?: string, interpolations?: Object|Array, isAppError?: true }}
 */
export function createCustomError({
  name = 'Error',
  message,
  args = [],
  cause,
  code,
  interpolations,
} = {}) {
  const resolvedMessage = message ?? code ?? 'Error'
  const error = cause !== undefined
    ? new Error(resolvedMessage, { cause })
    : new Error(resolvedMessage, ...args)

  Object.setPrototypeOf(error, createCustomError.prototype)
  error.name = name
  if (code !== undefined) {
    error.code = code
    error.interpolations = interpolations
    error.isAppError = true
  }
  return error
}
createCustomError.prototype = Object.create(Error.prototype, { constructor: { value: createCustomError, } })

/**
 * Check whether an error carries an i18n error code.
 *
 * @param {any} error
 * @returns {boolean}
 */
export function isAppError(error) {
  return Boolean(error?.isAppError && typeof error?.code === 'string')
}

export function InvalidClassNameError(className, ...props) {
  return createCustomError({
    name: 'InvalidClassNameError',
    code: errorKeys.classes.invalidClassName,
    interpolations: { className },
    args: props,
  })
}

export function InvalidSubClassNameError(subClassName, className, ...props) {
  return createCustomError({
    name: 'InvalidSubClassNameError',
    code: errorKeys.classes.invalidSubClassName,
    interpolations: { subClassName, className },
    args: props,
  })
}

export function MissingPathError(message, ...props) {
  return createCustomError({
    name: 'MissingPathError',
    code: errorKeys.common.missingPath,
    interpolations: { message: message ?? `A 'path' is required` },
    args: props,
  })
}

export function StorageError(message, ...props) {
  return createCustomError({
    name: 'StorageError',
    code: errorKeys.storage.generic,
    interpolations: { message: message || 'Storage error' },
    args: props,
  })
}

export function InvalidCharacterFieldError(fieldName, reason = 'Invalid value', ...props) {
  return createCustomError({
    name: 'InvalidCharacterFieldError',
    code: errorKeys.character.invalidField,
    interpolations: { fieldName, reason },
    args: props,
  })
}

export { errorKeys }
