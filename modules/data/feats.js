// P.200
import { f, } from '../lib.js'

export const feats = f({ // TODO:
  alert: f({
    category: 'general',
    description: 'Always on the lookout for danger, you gain the following benefits: You gain a +5 bonus to initiative. You can\'t be surprised while you are conscious. Other creatures don\'t gain advantage on attack rolls against you as a result of being unseen by you.',
    benefits: f({
      initiativeBonus: 5,
      noSurprise: true,
      unseenAttackNoAdvantage: true,
    }),
  }),
})