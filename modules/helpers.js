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
 * Determine whether a value is a non-null plain object (i.e., typeof "object" and not an Array).
 *
 * @param {*} value - The value to test.
 * @returns {boolean} True if the value is an object (excluding arrays and null), otherwise false.
 */
export function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value)
}
/**
 * Creates a debounced version of the provided function that delays its execution
 * until after a specified wait time has elapsed since the last time it was invoked.
 *
 * @example
 * const debouncedLog = debounce(console.info, 200)
 * debouncedLog('Hello') // Will log "Hello" after 200ms if not called again within 200ms
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} [delayMs=0] - The number of milliseconds to delay execution.
 * @returns {Function} A new debounced function.
 */
export function debounce(fn, delayMs = 0) {
  let timerId
  return (...params) => {
    clearTimeout(timerId)
    timerId = setTimeout(fn, delayMs, ...params)
  }
}

/**
 * Navigates inside `obj` with `path` string,
 *
 * @example
 * objNavigate("a.b", {a: {b: 123}}) // returns 123
 *
 * @param {object} obj - The object to resolve the path from.
 * @param {string} path - Dot-separated path (e.g. "a.b.c").
 * @param {object} [options] - Resolution options.
 * @param {boolean} [options.strict=false] - Whether to throw an error when the path is invalid.
 * @returns {*} The resolved value, or undefined if the path is invalid and strict mode is disabled.
 * @throws {ReferenceError} If strict mode is enabled and the path is invalid.
 */
export function resolvePath(obj, path, { strict = false } = {}) {
  const parts = path.split('.')
  let current = obj
  for (const part of parts) {
    if (current == null) {
      if (strict) {
        throw new ReferenceError(`Path '${path}' is invalid at '${part}'`)
      }
      return undefined
    }
    if (strict && !(part in current)) {
      throw new ReferenceError(`Path '${path}' is invalid at '${part}'`)
    }
    current = current[part]
  }
  return current
}

/**
 * Resolve a promise after given duration.
 *
 * @param {number} seconds - Wainting duration.
 * @returns {Promise<void>} Resolve after time spent.
 */
export function wait(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}
