import indexEventBus, { observables } from '../index.eventBus.js'

function createCustomError({ name, message, args = [] }) {
  const error = new Error(message, ...args)
  Object.setPrototypeOf(error, createCustomError.prototype)
  error.name = name
  error.stack = ''
  indexEventBus.emit(observables.ERROR_CUSTOM, error)
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

export function BadDiceError(dice, ...props) {
  return createCustomError({
    name: 'BadDiceError',
    message: `Dice '${dice}' is not does not exist`,
    data: { dice },
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

export function TechnicalError(error) {
  error.stack = ''
  console.error(error)
  indexEventBus.emit(observables.ERROR_TECHNICAL, error)
  return error
}
