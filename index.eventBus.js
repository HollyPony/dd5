import { f } from './modules/helpers.js'
import createEventBus from './modules/createEventBus.js'

export const observables = f({
  ERROR_TECHNICAL: Symbol(),
  ERROR_CUSTOM: Symbol(),
})

export default createEventBus()
