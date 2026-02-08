import { MissingPathError } from './errors.js';

// TODO: Move to own file

export function createObservable() {
  const listenersMap = new Map()

  function getListeners(key) {
    if (!key) throw new MissingPathError()
    if (!listenersMap.has(key)) listenersMap.set(key, new Set())
    return listenersMap.get(key)
  }

  function notify(key, ...params) {
    if (listenersMap.has(key))
      for (const listener of listenersMap.get(key) ?? []) listener(...params)
  }

  /**
   * Subscribe to a specific path.
   *
   * The callback is triggered whenever that path (or a child path) is updated.
   * Pass `ALL` (`'*'`) to listen to any update.
   *
   * @param {string} stateKey - Dot-separated path to observe or `ALL`.
   * @param {() => void} callback - Listener called on updates (no value passed).
   * @returns {() => void} Unsubscribe function.
   * @throws {MissingPathError} If stateKey is missing or falsy.
   */
  function subscribe(key, callback) {
    getListeners(key).add(callback)
    return () => unsubscribe(key, callback)
  }

  function subscribeMany(keys, callback) {
    let scheduled = false
    return keys.map(key => subscribe(key, (...params) => {
      if (!scheduled) {
        scheduled = true
        queueMicrotask(() => {
          scheduled = false
          callback(...params)
        })
      }
    }))
  }

  function subscribes(subscriptions = {}) {
    const reverseSubscriptions = new Map()
    for (const [key, callbacks] of Object.entries(subscriptions)) {
      for (const callback of callbacks) {
        if (!reverseSubscriptions.has(callback)) reverseSubscriptions.set(callback, [])
        reverseSubscriptions.get(callback).push(key)
      }
    }

    const unregisterers = []
    for (const [callback, keys] of reverseSubscriptions.entries()) {
      keys.length === 1
        ? unregisterers.push(subscribe(keys[0], callback))
        : unregisterers.push(...subscribeMany(keys, callback))
    }

    return unregisterers
  }

  function pause(key, callback) {
    unsubscribe(key, callback)
    return function resume() { subscribe(key, callback) } // Resume
  }

  function suspendWhile(key, callback) {
    return (fn) => {
      const resume = pause(key, callback)
      try {
        return fn()
      } finally {
        resume()
      }
    }
  }

  function unsubscribe(key, callback) {
    return getListeners(key).delete(callback)
  }

  return {
    getListeners,
    notify,
    subscribe,
    subscribeMany,
    subscribes,
    unsubscribe,
    pause,
    suspendWhile
  }
}
