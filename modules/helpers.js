// Shotcut for freeze function
export const f = Object.freeze

export const s = Object.seal

// Shortcut for f + O functions
// TODO:
export const Enum = f
// export const Enum = _ => O(f(_))

// Proxy object to trigger Error accessing unspecified property
export const O = target => {
  return new Proxy(target, { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    get(target, prop, _) { // receiver is the `this`
      if (!(prop in target)) {
        throw new ReferenceError(`'${prop}' is not found in Object`)
      } else {
        return Reflect.get(...arguments);
      }
    },
  })
}

const nfWithSign = new Intl.NumberFormat(undefined, {
  signDisplay: "exceptZero"
})

export function signDisplay(score) { return nfWithSign.format(score) }

/**
 * Navigates inside `obj` with `path` string,
 *
 * Usage:
 * objNavigate({a: {b: 123}}, "a.b") // returns 123
 *
 * Returns undefined if variable is not found.
 * Fails silently.
 */
export function objNavigate(obj, path) {
  const parts = path.split('.')
  let current = obj
  for (const part of parts) {
    if (current == null) return undefined
    current = current[part]
  }
  return current
  // Reduce version less efficient
  // try {
  // return path.split('.').reduce((acc, keyPath) => acc[keyPath], obj)
  // } catch {
  //   return path
  // }
}