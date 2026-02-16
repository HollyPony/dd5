import createEventBus from './modules/createEventBus.js'

// TODO: Rework proper error trigger
export const observables = Object.freeze({
  ERROR_TECHNICAL: Symbol(),
  ERROR_CUSTOM: Symbol(),
})

export default createEventBus()
