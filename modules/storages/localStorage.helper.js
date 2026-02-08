import { createObservable } from '../createObservable.js'

const APP_PREFIX_KEY = 'dd5'

export function buildStorage(prefix) {
  const cache = {}
  const observable = createObservable()

  function buildKey(key) {
    return [APP_PREFIX_KEY, prefix, key].filter(_ => _).join('.')
  }

  function getItem(key) {
    const _key = buildKey(key)
    return cache[_key] ?? window.localStorage.getItem(_key)
  }

  function setItem(key, value) {
    const _key = buildKey(key)
    window.localStorage.setItem(_key, value)
    cache[_key] = value
    observable.notify(key, value)
  }

  function removeItem(key) {
    const _key = buildKey(key)
    window.localStorage.removeItem(_key)
    delete cache[_key]
  }

  function getJSONItem(key) {
    return JSON.parse(getItem(key))
  }

  function setJSONItem(key, value) {
    setItem(key, JSON.stringify(value))
  }

  return {
    getItem,
    setItem,
    removeItem,
    getJSONItem,
    setJSONItem,
    subscribe: observable.subscribe,
  }
}