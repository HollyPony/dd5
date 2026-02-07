import { createObservable, f } from './helpers.js'

export const observables = f({
  TECHNICAL: Symbol(),
  CUSTOM: Symbol(),
})
const { notify, subscribe } = createObservable()
export { subscribe }

function createCustomError({ name, message, args = [] }) {
  const error = new Error(message, ...args)
  Object.setPrototypeOf(error, createCustomError.prototype)
  error.name = name
  error.stack = ''
  notify(observables.CUSTOM, error)
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

export function MissingPathError(...props) {
  return createCustomError({
    name: 'MissingPathError',
    message: `A 'path' is required`,
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
  console.error(error)
  notify(observables.TECHNICAL, error)
  return error
}
