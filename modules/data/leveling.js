import { f } from '../helpers.js'

// D&D 5e (2024) Character Advancement table (XP thresholds per level) P.42
export const EXPERIENCE_LEVELS = f([
  { level: 1, minXp: 0 },
  { level: 2, minXp: 300 },
  { level: 3, minXp: 900 },
  { level: 4, minXp: 2700 },
  { level: 5, minXp: 6500 },
  { level: 6, minXp: 14000 },
  { level: 7, minXp: 23000 },
  { level: 8, minXp: 34000 },
  { level: 9, minXp: 48000 },
  { level: 10, minXp: 64000 },
  { level: 11, minXp: 85000 },
  { level: 12, minXp: 100000 },
  { level: 13, minXp: 120000 },
  { level: 14, minXp: 140000 },
  { level: 15, minXp: 165000 },
  { level: 16, minXp: 195000 },
  { level: 17, minXp: 225000 },
  { level: 18, minXp: 265000 },
  { level: 19, minXp: 305000 },
  { level: 20, minXp: 355000 },
])

export function getLevelFromExperience(experience) {
  for (let i = EXPERIENCE_LEVELS.length - 1; i >= 0; i -= 1) {
    if (experience >= EXPERIENCE_LEVELS[i].minXp) {
      return EXPERIENCE_LEVELS[i].level
    }
  }

  return 1
}
