import { getPathParts } from './helpers.js'

export const ANY = Symbol('*')

function createNode() {
  return {
    listeners: new Set(),
    children: new Map(),
  }
}

/**
 * Resolve a node for a path.
 *
 * @param {{ listeners: Set<Function>, children: Map<string | symbol, any> }} nodeTree - Root node.
 * @param {Array<string | symbol>} pathParts - Normalized path parts.
 * @param {boolean} [create=false] - Create missing nodes.
 * @returns {{ listeners: Set<Function>, children: Map<string | symbol, any> } | undefined}
 */
function getNode(nodeTree, pathParts, create = false) {
  let node = nodeTree
  for (const part of pathParts) {
    if (!node.children.has(part)) {
      if (!create) return undefined
      node.children.set(part, createNode())
    }
    node = node.children.get(part)
  }
  return node
}

/**
 * Emit multiple targets and de-duplicate callback execution.
 * A callback runs at most once per batch.
 *
 * @param {{ listeners: Set<Function>, children: Map<string | symbol, any> }} nodeTree - Root node.
 * @param {Array<{ key: string | symbol | Array<string | symbol>, payload?: any, params?: any[] }> | Set<{ key: string | symbol | Array<string | symbol>, payload?: any, params?: any[] }>} targets - Events to emit.
 * @returns {void}
 * @throws {TypeError} When one target key has an unsupported type.
 */
function emitBatch(nodeTree, targets) {
  const callbacks = new Set()

  for (const event of [...targets]) {
    const { key, payload, params = [] } = event
    const pathParts = getPathParts(key)
    const node = getNode(nodeTree, pathParts)
    if (!node) continue

    for (const listener of node.listeners) {
      if (callbacks.has(listener)) continue
      callbacks.add(listener)
      listener(payload, ...params)
    }
  }

  for (const listener of getNode(nodeTree, ANY)?.listeners) listener()
}

/**
 * Subscribe one callback to one key.
 *
 * @param {{ listeners: Set<Function>, children: Map<string | symbol, any> }} nodeTree - Root node.
 * @param {string | symbol | Array<string | symbol>} key - Event key/path.
 * @param {Function} callback - Listener function.
 * @returns {() => boolean} Unsubscribe function.
 * @throws {TypeError} When key has an unsupported type.
 */
function on(nodeTree, key, callback) {
  const node = getNode(nodeTree, getPathParts(key), true)
  node.listeners.add(callback)
  return () => off(nodeTree, key, callback)
}

/**
 * Subscribe one callback to multiple keys.
 *
 * @param {{ listeners: Set<Function>, children: Map<string | symbol, any> }} nodeTree - Root node.
 * @param {Array<string | symbol | Array<string | symbol>>} keys - List of event keys/paths.
 * @param {Function} callback - Listener function.
 * @returns {Array<() => boolean>} Unsubscribe functions.
 */
function onMany(nodeTree, keys, callback) {
  return [...new Set(keys)].map(key => on(nodeTree, key, callback))
}

/**
 * Subscribe callbacks by key(s).
 *
 * Supported forms:
 * - Object: { key: callback | callback[] }
 * - Map: new Map([[keyOrKeys, callbackOrCallbacks]])
 *   where keyOrKeys is string, symbol, path array, or list of string keys.
 *
 * @param {{ listeners: Set<Function>, children: Map<string | symbol, any> }} nodeTree - Root node.
 * @param {Record<string | symbol, Function | Function[]> | Map<string | symbol | Array<string | symbol> | string[], Function | Function[]>} [subscriptions={}]
 * @returns {Array<() => boolean>}
 */
function onMap(nodeTree, subscriptions = {}) {
  const isEnumerable = Object.prototype.propertyIsEnumerable
  const entries = subscriptions instanceof Map
    ? [...subscriptions.entries()]
    : Reflect.ownKeys(subscriptions)
      .filter(key => isEnumerable.call(subscriptions, key))
      .map(key => [key, Reflect.get(subscriptions, key)])

  return entries.flatMap(([keyOrKeys, cbOrCbs]) => {
    const isManyKeys = Array.isArray(keyOrKeys) && keyOrKeys.every(key => typeof key === 'string')
    const keys = isManyKeys ? keyOrKeys : [keyOrKeys]
    const callbacks = Array.isArray(cbOrCbs) ? cbOrCbs : [cbOrCbs]

    return callbacks.flatMap(callback =>
      keys.length > 1
        ? onMany(nodeTree, keys, callback)
        : on(nodeTree, keys[0], callback)
    )
  })
}

/**
 * Temporarily remove one callback from one key.
 *
 * @param {{ listeners: Set<Function>, children: Map<string | symbol, any> }} nodeTree - Root node.
 * @param {string | symbol | Array<string | symbol>} key - Event key/path.
 * @param {Function} callback - Listener function.
 * @returns {() => void} Resume function.
 */
function mute(nodeTree, key, callback) {
  off(nodeTree, key, callback)
  return function resume() { on(nodeTree, key, callback) } // Resume
}

/**
 * Suspend one callback while a function executes, then resume it.
 *
 * @param {{ listeners: Set<Function>, children: Map<string | symbol, any> }} nodeTree - Root node.
 * @param {string | symbol | Array<string | symbol>} key - Event key/path.
 * @param {Function} callback - Listener function.
 * @returns {<T>(fn: () => T) => T} Wrapper that suspends during fn execution.
 */
function muteWhile(nodeTree, key, callback) {
  return (fn) => {
    const resume = mute(nodeTree, key, callback)
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
 * @param {{ listeners: Set<Function>, children: Map<string | symbol, any> }} nodeTree - Root node.
 * @param {string | symbol | Array<string | symbol>} key - Event key/path.
 * @param {Function} callback - Listener function.
 * @returns {boolean} True when callback was removed.
 * @throws {TypeError} When key has an unsupported type.
 */
function off(nodeTree, key, callback) {
  const node = getNode(nodeTree, getPathParts(key))
  if (!node) return false
  return node.listeners.delete(callback)
}

/**
 * Create a lightweight key-based event hub.
 *
 * @returns {{
 *   emit: (key: string | symbol | Array<string | symbol>, payload?: any, params?: any[]) => void,
 *   emitBatch: (targets: Array<{ key: string | symbol | Array<string | symbol>, payload?: any, params?: any[] }>) => void,
 *   on: (key: string | symbol | Array<string | symbol>, callback: Function) => () => boolean,
 *   onMany: (keys: Array<string | symbol | Array<string | symbol>>, callback: Function) => Array<() => boolean>,
 *   onMap: (subscriptions?: Record<string | symbol, Function | Function[]> | Map<string | symbol | Array<string | symbol> | string[], Function | Function[]>) => Array<() => boolean>,
 *   onAny: (callback: Function) => { off: () => boolean, muteWhile: () => <T>(fn: () => T) => T },
 *   off: (key: string | symbol | Array<string | symbol>, callback: Function) => boolean,
 *   mute: (key: string | symbol | Array<string | symbol>, callback: Function) => () => void,
 *   muteWhile: (key: string | symbol | Array<string | symbol>, callback: Function) => <T>(fn: () => T) => T
 * }}
 */
export default function createEventBus() {
  const nodeTree = createNode()

  return {
    emit: (key, payload, params = []) => emitBatch(nodeTree, [{ key, payload, params }]),
    emitBatch: (targets) => emitBatch(nodeTree, targets),
    on: (key, callback) => on(nodeTree, key, callback),
    // Rebind onAny functions to avoid expose ANY Symbol
    onAny: (callback) => ({
      muteWhile: () => muteWhile(nodeTree, ANY, callback),
      off: on(nodeTree, ANY, callback),
    }),
    onMany: (keys, callback) => onMany(nodeTree, keys, callback),
    onMap: (subscriptions) => onMap(nodeTree, subscriptions),
    off: (key, callback) => off(nodeTree, key, callback),
    mute: (key, callback) => mute(nodeTree, key, callback),
    muteWhile: (key, callback) => muteWhile(nodeTree, key, callback),
  }
}
