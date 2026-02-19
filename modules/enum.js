const f = Object.freeze

function inferEnumName(target) {
  if (!target || typeof target !== 'object') return 'Enum'

  const symbolValue = Object.values(target).find(value =>
    typeof value === 'symbol'
    && typeof value.description === 'string'
    && value.description.includes('.')
  )
  if (symbolValue) return symbolValue.description.split('.')[0]

  const symbolKey = Reflect.ownKeys(target).find(key =>
    typeof key === 'symbol'
    && typeof key.description === 'string'
    && key.description.includes('.')
  )
  if (typeof symbolKey === 'symbol') return symbolKey.description.split('.')[0]

  return 'Enum'
}

const allowedMissingSymbolProps = f([
  Symbol.iterator,
  Symbol.asyncIterator,
  Symbol.toStringTag,
  Symbol.toPrimitive,
  Symbol.unscopables,
])

/**
 * Create a strict enum-like object.
 * Any unknown property access throws.
 *
 * @param {object} target - Object to freeze, seal, and proxy.
 * @param {string} [objectName] - Object display name used in thrown errors.
 * @returns {object} Frozen+sealed strict proxy.
 * @throws {ReferenceError} If an unknown property / target is accessed.
 */
export const Enum = (target, objectName = inferEnumName(target)) => {
  if (target === null || typeof target !== 'object') throw new ReferenceError(`Invalid object target type '${typeof target}'`)

  return new Proxy(f(target), { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    get(target, prop, receiver) { // receiver is the `this`
      if (!Object.hasOwn(target, prop)) {
        if (typeof prop === 'symbol' && allowedMissingSymbolProps.includes(prop)) return undefined
        throw new ReferenceError(`Unknown property '${String(prop)}' on '${objectName}'`)
      }
      return Reflect.get(target, prop, receiver)
    },
  })
}
