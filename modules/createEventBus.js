import { MissingPathError } from './errors.js'

export const ANY = '*'

/**
 * Ensure a listener bucket exists for a key, then return it.
 *
 * @param {Map<string, Set<Function>>} listenersMap - Internal key->listeners registry.
 * @param {string} key - Event key/path.
 * @returns {Set<Function>} Listener set bound to the key.
 * @throws {MissingPathError} When key is missing or falsy.
 */
function getListeners(listenersMap, key) {
  if (!key) throw new MissingPathError()
  if (!listenersMap.has(key)) listenersMap.set(key, new Set())
  return listenersMap.get(key)
}

/**
 * Emit multiple targets and de-duplicate callback execution.
 * A callback runs at most once per batch.
 *
 * @param {Map<string, Set<Function>>} listenersMap - Internal key->listeners registry.
 * @param {Array<{ key: string, payload?: any, params?: any[] }>} targets - Events to emit.
 * @returns {void}
 * @throws {MissingPathError} When one target key is missing or falsy.
 */
function emitBatch(listenersMap, targets) {
  const callbacks = new Set()

  for (const event of targets) {
    const { key, payload, params = [] } = event
    if (!key) throw new MissingPathError(`${key}`)

    if (!listenersMap.has(key)) continue
    for (const listener of listenersMap.get(key)) {
      if (callbacks.has(listener)) continue
      callbacks.add(listener)
      listener(payload, ...params)
    }
  }

  if (listenersMap.has(ANY))
    for (const listener of listenersMap.get(ANY)) {
      listener()
    }
}

/**
 * Subscribe one callback to one key.
 *
 * @param {Map<string, Set<Function>>} listenersMap - Internal key->listeners registry.
 * @param {string} key - Event key/path.
 * @param {Function} callback - Listener function.
 * @returns {() => boolean} Unsubscribe function.
 * @throws {MissingPathError} When key is missing or falsy.
 */
function on(listenersMap, key, callback) {
  getListeners(listenersMap, key).add(callback)
  return () => off(listenersMap, key, callback)
}

/**
 * Subscribe one callback to multiple keys.
 *
 * @param {Map<string, Set<Function>>} listenersMap - Internal key->listeners registry.
 * @param {string[]} keys - List of event keys/paths.
 * @param {Function} callback - Listener function.
 * @returns {Array<() => boolean>} Unsubscribe functions.
 */
function onMany(listenersMap, keys, callback) {
  return [...new Set(keys)].map(key => on(listenersMap, key, callback))
}

/**
 * Subscribe callbacks by key(s).
 *
 * Supported forms:
 * - Object: { key: callback | callback[] }
 * - Map: new Map([[keyOrKeys, callbackOrCallbacks]])
 *   where keyOrKeys is string or string[].
 *
 * @param {Map<string, Set<Function>>} listenersMap
 * @param {Record<string, Function | Function[]> | Map<string | string[], Function | Function[]>} [subscriptions={}]
 * @returns {Array<() => boolean>}
 */
function onMap(listenersMap, subscriptions = {}) {
  const entries = subscriptions instanceof Map ? [...subscriptions.entries()] : Object.entries(subscriptions)
  return entries.flatMap(([keyOrKeys, cbOrCbs]) => {
    const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys]
    const callbacks = Array.isArray(cbOrCbs) ? cbOrCbs : [cbOrCbs]

    return callbacks.flatMap(callback =>
      keys.length > 1
        ? onMany(listenersMap, keys, callback)
        : on(listenersMap, keys[0], callback)
    )
  })
}

/**
 * Temporarily remove one callback from one key.
 *
 * @param {Map<string, Set<Function>>} listenersMap - Internal key->listeners registry.
 * @param {string} key - Event key/path.
 * @param {Function} callback - Listener function.
 * @returns {() => void} Resume function.
 */
function mute(listenersMap, key, callback) {
  off(listenersMap, key, callback)
  return function resume() { on(listenersMap, key, callback) } // Resume
}

/**
 * Suspend one callback while a function executes, then resume it.
 *
 * @param {Map<string, Set<Function>>} listenersMap - Internal key->listeners registry.
 * @param {string} key - Event key/path.
 * @param {Function} callback - Listener function.
 * @returns {<T>(fn: () => T) => T} Wrapper that suspends during fn execution.
 */
function muteWhile(listenersMap, key, callback) {
  return (fn) => {
    const resume = mute(listenersMap, key, callback)
    try {
      return fn()
    } finally {
      resume()
    }
  }
}

/**
 * Unsubscribe one callback from one key.
 *
 * @param {Map<string, Set<Function>>} listenersMap - Internal key->listeners registry.
 * @param {string} key - Event key/path.
 * @param {Function} callback - Listener function.
 * @returns {boolean} True when callback was removed.
 * @throws {MissingPathError} When key is missing or falsy.
 */
function off(listenersMap, key, callback) {
  return getListeners(listenersMap, key).delete(callback)
}

/**
 * Create a lightweight key-based event hub.
 *
 * @returns {{
 *   emit: (key: string, payload?: any, params?: any[]) => void,
 *   emitBatch: (targets: Array<{ key: string, payload?: any, params?: any[] }>) => void,
 *   on: (key: string, callback: Function) => () => boolean,
 *   onMany: (keys: string[], callback: Function) => Array<() => boolean>,
 *   onMap: (subscriptions?: Record<string, Function | Function[]>) => Array<() => boolean>,
 *   off: (key: string, callback: Function) => boolean,
 *   mute: (key: string, callback: Function) => () => void,
 *   muteWhile: (key: string, callback: Function) => <T>(fn: () => T) => T
 * }}
 */
export default function createEventBus(eventBusName) {
  const listenersMap = new Map()

  return {
    emit: (key, payload, params = []) => emitBatch(listenersMap, [{ key, payload, params }]),
    emitBatch: (targets) => emitBatch(listenersMap, targets),
    on: (key, callback) => on(listenersMap, key, callback),
    onAny: (callback) => ({
      muteWhile: () => muteWhile(listenersMap, ANY, callback),
      off: on(listenersMap, ANY, callback),
    }),
    onMany: (keys, callback) => onMany(listenersMap, keys, callback),
    onMap: (subscriptions) => onMap(listenersMap, subscriptions),
    off: (key, callback) => off(listenersMap, key, callback),
    mute: (key, callback) => mute(listenersMap, key, callback),
    muteWhile: (key, callback) => muteWhile(listenersMap, key, callback),
  }
}
