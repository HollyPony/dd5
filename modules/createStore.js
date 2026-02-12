import { resolvePath } from './helpers.js'

export default function createStore(initialState, eventBus) {
  const state = Object.seal({ ...initialState })

  function getPathParts(path) {
    if (Array.isArray(path)) return path
    if (typeof path === 'string') return path.split('.')
    // TODO: Custom Error
    throw new TypeError(`Unsupported path type: ${typeof path}`)
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
     * When multiple paths are updated in a single set, callbacks are de-duplicated
     * and invoked once per update (no value is passed).
     *
     * @param {Object<string, *>} pathMap - Patch object where keys are paths.
     * @param {boolean} [shouldNotify=true] - Whether to notify listeners.
     * @returns {void}
     * @throws {ReferenceError} If a path segment is invalid.
     */
    set(pathMap, shouldNotify = true) {
      const targets = new Set()

      for (const [path, value] of Object.entries(pathMap)) {
        const pathParts = getPathParts(path)
        let currentTarget = state

        // Assign
        for (const part of pathParts.slice(0, -1)) currentTarget = currentTarget[part]
        currentTarget[pathParts[pathParts.length - 1]] = value

        // Notify
        if (eventBus && shouldNotify) {
          let key
          for (const part of pathParts) {
            key = key ? `${key}.${part}` : part
            targets.add({ key, payload: value })
          }
        }
      }

      if (eventBus && shouldNotify) {
        eventBus.emitBatch(targets)
      }
    },

    on: eventBus.on,
    onAny: eventBus.onAny,
    onMany: eventBus.onMany,
    onMap: eventBus.onMap,
    off: eventBus.off,
    mute: eventBus.mute,
    muteWhile: eventBus.muteWhile,
  }
}
