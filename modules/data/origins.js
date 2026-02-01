// P.178
import { f, } from '../helpers.js'
import { SKILLS } from '../common.js'

export const origins = f({
  acolyte: f({
    skills: [SKILLS.insight, SKILLS.religion],
    feat: 'magicInitiate',
  }),
  artisan: f({
    skills: [SKILLS.investigation, SKILLS.persuasion],
    feat: 'crafter',
  }),
  charlatan: f({
    skills: [SKILLS.deception, SKILLS.sleightOfHand],
    feat: 'skilled',
  }),
  criminal: f({
    skills: [SKILLS.sleightOfHand, SKILLS.stealth],
    feat: 'alert',
  }),
  entertainer: f({
    skills: [SKILLS.acrobatics, SKILLS.performance],
    feat: 'musician',
  }),
  farmer: f({
    skills: [SKILLS.animalHandling, SKILLS.nature],
    feat: 'tough',
  }),
  guard: f({
    skills: [SKILLS.athletics, SKILLS.perception],
    feat: 'alert',
  }),
  guide: f({
    skills: [SKILLS.stealth, SKILLS.survival],
    feat: 'magicInitiate',
  }),
  hermit: f({
    skills: [SKILLS.medicine, SKILLS.religion],
    feat: 'healer',
  }),
  merchant: f({
    skills: [SKILLS.animalHandling, SKILLS.persuasion],
    feat: 'lucky',
  }),
  noble: f({
    skills: [SKILLS.history, SKILLS.persuasion],
    feat: 'skilled',
  }),
  sage: f({
    skills: [SKILLS.arcana, SKILLS.history],
    feat: 'magicInitiate',
  }),
  sailor: f({
    skills: [SKILLS.acrobatics, SKILLS.perception],
    feat: 'tavernBrawler',
  }),
  scribe: f({
    skills: [SKILLS.investigation, SKILLS.perception],
    feat: 'skilled',
  }),
  soldier: f({
    skills: [SKILLS.athletics, SKILLS.intimidation],
    feat: 'savage',
  }),
  wayfarer: f({
    skills: [SKILLS.insight, SKILLS.stealth],
    feat: 'lucky',
  }),
})

export function getList() { return Object.keys(origins) }
export function getOrigin(originName) { return origins[originName] }