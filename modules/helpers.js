import { MissingPathError } from './errors.js'

// Shotcut for freeze function
export const f = Object.freeze

export const s = Object.seal

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
 * The returned function also exposes `cancel()` to clear any pending execution.
 *
 * @example
 * const debouncedLog = debounce(console.info, 200)
 * debouncedLog('Hello') // Will log "Hello" after 200ms if not called again within 200ms
 * debouncedLog.cancel() // Clears pending execution if any
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} [delayMs=0] - The number of milliseconds to delay execution.
 * @returns {((...params: any[]) => void) & { cancel: () => void }} A new debounced function with a `cancel` method.
 */
export function debounce(fn, delayMs = 0) {
  let timerId
  const debounced = (...params) => {
    clearTimeout(timerId)
    timerId = setTimeout(fn, delayMs, ...params)
  }

  debounced.cancel = () => {
    clearTimeout(timerId)
    timerId = undefined
  }

  return debounced
}

/**
 * Normalize a path to path parts.
 *
 * @param {string | symbol | Array<string | symbol>} path
 * @returns {Array<string | symbol>}
 * @throws {MissingPathError} If path type is not supported.
 */
export function getPathParts(path) {
  if (Array.isArray(path)) return path
  if (typeof path === 'symbol') return [path]
  if (typeof path === 'string') return path.split('.')
  throw MissingPathError(`Unsupported path type: ${typeof path}`)
}

/**
 * Navigates inside `obj` with `path` string,
 *
 * @example
 * objNavigate("a.b", {a: {b: 123}}) // returns 123
 *
 * @param {object} obj - The object to resolve the path from.
 * @param {string | symbol | Array<string | symbol>} path - Dot-separated path, symbol key, or path segments.
 * @param {object} [options] - Resolution options.
 * @param {boolean} [options.strict=false] - Whether to throw an error when the path is invalid.
 * @returns {*} The resolved value, or undefined if the path is invalid and strict mode is disabled.
 * @throws {ReferenceError} If strict mode is enabled and the path is invalid.
 */
export function resolvePath(obj, path, { strict = false } = {}) {
  const parts = Array.isArray(path)
    ? path
    : typeof path === 'symbol'
      ? [path]
      : String(path).split('.')
  let current = obj

  for (const part of parts) {
    if (current == null) {
      if (strict) throw new ReferenceError(`Path '${path.toString()}' is invalid at '${part.toString()}'`)
      return undefined
    }
    if (typeof current !== 'object' || !Reflect.has(current, part)) {
      if (strict)
        throw new ReferenceError(`Path '${path.toString()}' is invalid at '${part.toString()}'`)
      return undefined
    }
    current = Reflect.get(current, part)
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
