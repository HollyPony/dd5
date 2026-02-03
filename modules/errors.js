export function InvalidClassNameError(className, ...props) {
  const message = `Invalid Class '${className}'`
  const err = new Error(message, ...props)
  Object.setPrototypeOf(err, InvalidClassNameError.prototype)
  err.name = "InvalidClassNameError"
  err.className = className

  return err
}
InvalidClassNameError.prototype = Object.create(Error.prototype, { constructor: { value: InvalidClassNameError, } })

export function InvalidSubClassNameError(subClassName, className, ...props) {
  const message = `Invalid SubClass '${subClassName}' for '${className}'`
  const err = new Error(message, ...props)
  Object.setPrototypeOf(err, InvalidSubClassNameError.prototype)
  err.name = "InvalidSubClassNameError"
  err.className = className
  err.subClassName = subClassName

  return err
}
InvalidSubClassNameError.prototype = Object.create(Error.prototype, { constructor: { value: InvalidSubClassNameError, } })

export function BadDiceError(dice, ...props) {
  const message = `Dice '${dice}' is not does not exist`
  const err = new Error(message, ...props)
  Object.setPrototypeOf(err, BadDiceError.prototype)
  err.name = "BadDiceError"
  err.dice = dice

  return err
}
BadDiceError.prototype = Object.create(Error.prototype, { constructor: { value: MissingPathError, } })

export function MissingPathError(...props) {
  const message = `A 'path' is required`
  const err = new Error(message, ...props)
  Object.setPrototypeOf(err, MissingPathError.prototype)
  err.name = "MissingPathError"

  return err
}
MissingPathError.prototype = Object.create(Error.prototype, { constructor: { value: MissingPathError, } })