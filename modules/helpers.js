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

export function createObservable() {
  const listenersMap = new Map()

  function getDefault(key) {
    if (!listenersMap.has(key)) listenersMap.set(key, new Set())
    return listenersMap.get(key)
  }

  function notify(key, ...params) {
    if (listenersMap.has(key))
      for (const listener of listenersMap.get(key)) listener(...params)
  }

  function subscribe(key, callback) {
    getDefault(key).add(callback)
    return () => listenersMap.get(key).delete(callback)
  }

  return {
    notify,
    subscribe,
  }
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

export function debounce(fn, delayMs = 0) {
  let timerId
  return (...args) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => fn(...args), delayMs)
  }
}

/**
 * Navigates inside `obj` with `path` string,
 *
 * Usage:
 * objNavigate({a: {b: 123}}, "a.b") // returns 123
 *
 * Returns undefined if variable is not found.
 * Fails silently.
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


