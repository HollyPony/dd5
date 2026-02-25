import { getPathParts, resolvePath, s } from './helpers.js'

// TODO: refactor initialState as a callback returning the initialState. Then, implement an exposed reset function using this callback. finally, remove all reset functions corresponding to this behaviour
export default function createStore(initialState, eventBus) {
  const state = s({ ...initialState })
  const isEnumerable = Object.prototype.propertyIsEnumerable

  return {
    /**
     * Get a value from the store.
     *
     * If no path is provided, returns the raw state object (no copy).
     *
     * @param {string | symbol | Array<string | symbol>} [path] - Path key (dot-separated string, symbol, or segments array).
     * @returns {*} The resolved value, or the raw state when no path is provided.
     * @throws {ReferenceError} If the path is invalid.
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
     * @param {Object<string | symbol, *> | Map<string | symbol | Array<string | symbol>, *>} pathMap - Patch map where keys are paths.
     * @param {boolean} [shouldNotify=true] - Whether to notify listeners.
     * @returns {void}
     * @throws {MissingPathError} If one path key has an unsupported type.
     */
    set(pathMap, shouldNotify = true) {
      const targets = new Set()
      const entries = pathMap instanceof Map
        ? [...pathMap.entries()]
        : Reflect.ownKeys(pathMap)
          .filter(path => isEnumerable.call(pathMap, path))
          .map(path => [path, Reflect.get(pathMap, path)])

      for (const [path, value] of entries) {
        const pathParts = getPathParts(path)

        // Assign
        let currentTarget = state
        for (const part of pathParts.slice(0, -1)) currentTarget = currentTarget[part]
        Reflect.set(currentTarget, pathParts[pathParts.length - 1], value)

        // Notify
        if (eventBus && shouldNotify) {
          for (let i = 0; i < pathParts.length; i++) {
            const key = pathParts.slice(0, i + 1)
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
