import { f } from './modules/helpers.js';
import { createObservable } from './modules/createObservable.js';

export const observables = f({
  ERROR_TECHNICAL: Symbol(),
  ERROR_CUSTOM: Symbol(),
})

export default createObservable()