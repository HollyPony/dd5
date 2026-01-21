// Shotcut for freeze function
export const f = Object.freeze

// Shortcut for f + O functions
export const Of = _ => O(f(_))

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