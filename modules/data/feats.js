// P.200
import { f, } from '../helpers.js'

const FEAT_CATEGORY = f({
  GENERAL: Symbol('feat_category_general'),
})

export const feats = f({ // TODO:
  alert: f({
    category: FEAT_CATEGORY.GENERAL,
    benefits: f({
      initiativeBonus: 5,
      noSurprise: true,
      unseenAttackNoAdvantage: true,
    }),
  }),
})