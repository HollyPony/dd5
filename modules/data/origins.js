// P.178
import { f } from '../domlib.js'

export const origins = f({
  acolyte: f({
    skills: ['insight', 'religion'],
    feat: 'magicInitiate',
  }),
  artisan: f({
    skills: ['investigation', 'persuasion'],
    feat: 'crafter',
  }),
  charlatan: f({
    skills: ['deception', 'sleightOfHand'],
    feat: 'skilled',
  }),
  criminal: f({
    skills: ['sleightOfHand', 'stealth'],
    feat: 'alert',
  }),
  entertainer: f({
    skills: ['acrobatics', 'performance'],
    feat: 'musician',
  }),
  farmer: f({
    skills: ['animalHandling', 'nature'],
    feat: 'tough',
  }),
  guard: f({
    skills: ['athletics', 'perception'],
    feat: 'alert',
  }),
  guide: f({
    skills: ['stealth', 'survival'],
    feat: 'magicInitiate',
  }),
  hermit: f({
    skills: ['medicine', 'religion'],
    feat: 'healer',
  }),
  merchant: f({
    skills: ['animalHandling', 'persuasion'],
    feat: 'lucky',
  }),
  noble: f({
    skills: ['history', 'persuasion'],
    feat: 'skilled',
  }),
  sage: f({
    skills: ['arcana', 'history'],
    feat: 'magicInitiate',
  }),
  sailor: f({
    skills: ['acrobatics', 'perception'],
    feat: 'tavernBrawler',
  }),
  scribe: f({
    skills: ['investigation', 'perception'],
    feat: 'skilled',
  }),
  soldier: f({
    skills: ['athletics', 'intimidation'],
    feat: 'savage',
  }),
  wayfarer: f({
    skills: ['insight', 'stealth'],
    feat: 'lucky',
  }),
})