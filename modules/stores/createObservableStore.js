import { MissingPathError } from '../errors.js'
import { resolvePath, } from '../helpers.js'

export default function createObservableStore(initialState) {
  const state = Object.seal({ ...initialState })
  const listeners = new Map()
  // const ALL = '*'

  const pathPartsCache = new Map()
  function getPathParts(path) {
    return pathPartsCache.get(path) ?? pathPartsCache.set(path, path.split('.')).get(path)
  }

  return {
    /**
     * Get a value from the store.
     *
     * If no path is provided, returns the raw state object (no copy).
     *
     * @param {string} [path] - Dot-separated path (e.g. "a.b.c").
     * @returns {*} The resolved value, or the raw state when no path is provided.
     * @throws {ReferenceError} If the path is invalid
     */
    get(path) {
      return path ? resolvePath(state, path, { strict: true }) : state
    },

    /**
     * Apply a partial update to the state.
     *
     * Keys can be dot-separated paths. Fails fast if any segment is invalid.
     * Notifications are sent to listeners on each path segment (parent -> child).
     *
     * @param {Object<string, *>} pathMap - Patch object where keys are paths.
     * @param {boolean} [shouldNotify=true] - Whether to notify listeners.
     * @returns {void}
     * @throws {ReferenceError} If a path segment is invalid.
     */
    set(pathMap, shouldNotify = true) {
      for (const [path, value] of Object.entries(pathMap)) {
        const pathParts = getPathParts(path)
        let currentTarget = state

        // Assign
        for (const part of pathParts.slice(0, -1)) {
          currentTarget = currentTarget[part]
        }
        currentTarget[pathParts[pathParts.length - 1]] = value

        // Notify
        if (shouldNotify) {
          currentTarget = state
          let key
          for (const part of pathParts) {
            currentTarget = currentTarget[part]
            key = key ? key + '.' + part : part
            const bucket = listeners.get(key)
            if (bucket) {
              for (const listener of bucket) {
                listener(currentTarget)
              }
            }
          }
        }
      }
    },

    /**
     * Subscribe to a specific path.
     *
     * The callback receives the current value at the subscribed path
     * whenever that path (or a child path) is updated.
     *
     * @param {(value: any) => void} callback - Listener called on updates.
     * @param {string} stateKey - Dot-separated path to observe.
     * @returns {() => void} Unsubscribe function.
     * @throws {MissingPathError} If stateKey is missing or falsy.
     */
    subscribe(callback, stateKey) {
      if (!stateKey) throw new MissingPathError()
      if (!listeners.has(stateKey)) {
        listeners.set(stateKey, new Set())
      }
      listeners.get(stateKey).add(callback)
      return () => listeners.get(stateKey).delete(callback)
    },
  }
}
