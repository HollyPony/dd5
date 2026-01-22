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