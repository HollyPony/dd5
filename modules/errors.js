import { showErrorToast } from './toast.js'

function createCustomError({ name, message, data = {}, args = [] }) {
  const err = new Error(message, ...args)
  Object.setPrototypeOf(err, createCustomError.prototype)
  err.name = name
  Object.assign(err, data)
  showErrorToast(err)
  return err
}
createCustomError.prototype = Object.create(Error.prototype, { constructor: { value: createCustomError, } })

export function InvalidClassNameError(className, ...props) {
  return createCustomError({
    name: 'InvalidClassNameError',
    message: `Invalid Class '${className}'`,
    data: { className },
    args: props,
  })
}

export function InvalidSubClassNameError(subClassName, className, ...props) {
  return createCustomError({
    name: 'InvalidSubClassNameError',
    message: `Invalid SubClass '${subClassName}' for '${className}'`,
    data: { className, subClassName },
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

export function MissingPathError(...props) {
  return createCustomError({
    name: 'MissingPathError',
    message: `A 'path' is required`,
    args: props,
  })
}

export function ExportError(message, ...props) {
  return createCustomError({
    name: 'ExportError',
    message: message || 'Export failed',
    args: props,
  })
}

export function ImportError(message, ...props) {
  return createCustomError({
    name: 'ImportError',
    message: message || 'Import failed',
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
