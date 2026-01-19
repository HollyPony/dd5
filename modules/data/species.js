// P.187
import { f, } from '../lib.js'
import { spells, } from './spells.js'

const species = f({
  aasimar: f({ // P.187
    size: f({
      min: 60, max: 215,
      categories: f(['small', 'medium']),
    }),
    speed: 9,
    traits: f([
      f({ name: 'darkvision', atLevel: 1, distance: 18, }),
      f({ name: 'celestialResistance', atLevel: 1, }),
      f({ name: 'healingHands', atLevel: 1, }), // TODO: reset on long rest
      f({ name: 'lightBearer', atLevel: 1, }), // TODO: add light cantrip
      f({ name: 'celestialRevelation', atLevel: 3, }), // TODO: reset on long rest - Show popup for available transformations
    ]),
  }),
  dragonborn: f({ // P.188
    size: f({
      min: 150, max: 215,
      categories: f(['medium']),
    }),
    speed: 9,
    traits: f([
      f({ name: 'draconicAncestry', atLevel: 1, }),
      f({ name: 'breathWeapon', atLevel: 1, }), // TODO: one per proficiency bonus - related to ancestry - reset on long rest
      f({ name: 'damageResistance', atLevel: 1, }), // TODO: related to ancestry
      f({ name: 'darkvision', atLevel: 1, }),
      f({ name: 'draconicFlight', atLevel: 5, }), // TODO: is bonus action
    ]),
    lineages: f({
      black: f({ type: 'acid' }),
      blue: f({ type: 'lightning' }),
      brass: f({ type: 'fire' }),
      bronze: f({ type: 'lightning' }),
      copper: f({ type: 'acid' }),
      gold: f({ type: 'fire' }),
      green: f({ type: 'poison' }),
      red: f({ type: 'fire' }),
      silver: f({ type: 'cold' }),
      white: f({ type: 'cold' }),
    }),
  }),
  dwarf: f({ // P.195
    size: f({
      min: 120, max: 150,
      categories: f(['medium']),
    }),
    speed: 9,
    traits: f([
      f({ name: 'darkvision', atLevel: 1, distance: 36, }),
      f({ name: 'dwarvenResilience', atLevel: 1, }),
      f({ name: 'dwarvenToughness', atLevel: 1, }), // TODO: +1 HP per level
      f({ name: 'stonecunning', atLevel: 1, }), // TODO: one per proficiency bonus - reset on long rest
    ]),
  }),
  elf: f({ // P.189
    size: f({
      min: 150, max: 185,
      categories: f(['medium']),
    }),
    speed: 9,
    traits: f([
      f({ name: 'darkvision', atLevel: 1, distance: 18, }),
      f({ name: 'elvenLineage', atLevel: 1, }),
      f({ name: 'feyAncestry', atLevel: 1, }),
      f({ name: 'keenSenses', atLevel: 1, }), // TODO: +1 choosen skill intiution, perception, survival
      f({ name: 'trance', atLevel: 1, }),
    ]),
    lineages: f({
      drow: f({
        traits: f([
          f({ name: 'darkvision', atLevel: 1, distance: 36 }),
        ]),
        spells: f([
          f({ spell: spells.dancingLights, atLevel: 1, }),
          f({ spell: spells.faerieFire, atLevel: 3, }),
          f({ spell: spells.darkness, atLevel: 5, }),
        ]),
      }),
      high: f({
        traits: f([
          f({ name: 'chooseCanTrip', atLevel: 1, }), // TODO: choose one from Wizard spell list, default to prestidigitation
        ]),
        spells: f([
          f({ spell: spells.detectMagic, atLevel: 3, }),
          f({ spell: spells.mistyStep, atLevel: 5, }),
        ]),
      }),
      wood: f({
        speed: 10.5,
        spells: f([
          f({ spell: spells.druidcraft, atLevel: 1, }),
          f({ spell: spells.longstrider, atLevel: 3, }),
          f({ spell: spells.passWithoutTrace, atLevel: 5, }),
        ]),
      }),
    }),
  }),
  gnome: f({ // P.191
    size: f({
      min: 90, max: 120,
      categories: f(['small']),
    }),
    speed: 9,
    traits: f([
      f({ name: 'darkvision', atLevel: 1, distance: 18, }),
      f({ name: 'gnomishCunning', atLevel: 1, }),
      f({ name: 'gnomishLineage', atLevel: 1, }),
    ]),
    lineages: f({
      forest: f({
        traits: f([
          f({ name: 'forst-gnome-speakWithAnimals' }), // TODO: always prepared - per proficiency bonus - reset on long rest
        ]),
        spells: f([
          f({ spell: spells.minorIllusion, atLevel: 1, }),
          f({ spell: spells.speakWithAnimals, atLevel: 1, }),
        ]),
      }),
      rock: f({
        traits: f([
          f({ name: 'rock-gnome-prestidigitation' }), // TODO: see manual
        ]),
        spells: f([
          f({ spell: spells.mending, atLevel: 1, }),
          f({ spell: spells.prestidigitation, atLevel: 1, }),
        ]),
      }),
    }),
  }),
  goliath: f({ // P.192
    size: f({
      min: 215, max: 245,
      categories: f(['medium']),
    }),
    speed: 10.5,
    traits: f([
      f({ name: 'giantAncestry', atLevel: 1, }), // TODO: specify giant type
      f({ name: 'largeForm', atLevel: 5, }),
      f({ name: 'powerfulBuild', atLevel: 1, }),
    ]),
    lineages: f({
      cloud: {},
      fire: {},
      frost: {},
      hill: {},
      stone: {},
      storm: {},
    }),
  }),
  halfling: f({ // P.193
    size: f({
      min: 60, max: 90,
      categories: f(['small']),
    }),
    speed: 9,
    traits: f([
      f({ name: 'brave', atLevel: 1, }),
      f({ name: 'halflingNimbleness', atLevel: 1, }),
      f({ name: 'lucky', atLevel: 1, }),
      f({ name: 'naturallyStealthy', atLevel: 1, }),
    ]),
  }),
  human: f({ // P. 194
    size: f({
      min: 60, max: 215,
      categories: f(['small', 'medium']),
    }),
    speed: 9,
    traits: f([
      f({ name: 'resourceful', atLevel: 1, }),
      f({ name: 'skillFul', atLevel: 1, }), // TODO: +1 numberskill (any)
      f({ name: 'versatility', atLevel: 1, }), // TODO: +1 Origin gift (Don) available
    ]),
  }),
  orc: f({ // P. 196
    size: f({
      min: 180, max: 215,
      categories: f(['medium']),
    }),
    speed: 9,
    traits: f([
      f({ name: 'adrenalineRush', atLevel: 1, }), // TODO: one per proficiency bonus - reset on long rest
      f({ name: 'darkvision', atLevel: 1, distance: 36, }),
      f({ name: 'relentlessEndurance', atLevel: 1, }),
    ]),
  }),
  tiefling: f({ // P. 197
    size: f({
      min: 90, max: 215,
      categories: f(['small', 'medium']),
    }),
    speed: 9,
    traits: f([
      f({ name: 'darkvision', atLevel: 1, distance: 18, }),
      f({ name: 'fiendishLegacy', atLevel: 1, }), // TODO: legacies
      f({ name: 'otherworldlyPresence', atLevel: 1, }),
    ]),
    lineages: f({
      abyssal: f({
        resistances: f(['poison']),
        spells: f([
          f({ spell: spells.poisonSpray, atLevel: 1, }),
          f({ spell: spells.rayOfSickness, atLevel: 3, }),
          f({ spell: spells.holdPerson, atLevel: 5, }),
        ]),
      }),
      chtonic: f({
        resistances: f(['necrotic']),
        spells: f([
          f({ spell: spells.chillTouch, atLevel: 1, }),
          f({ spell: spells.falseLife, atLevel: 3, }),
          f({ spell: spells.rayOfEnfeeblement, atLevel: 5, }),
        ]),
      }),
      infernal: f({
        resistances: f(['fire']),
        spells: f([
          f({ spell: spells.fireBolt, atLevel: 1, }),
          f({ spell: spells.hellishRebuke, atLevel: 3, }),
          f({ spell: spells.darkness, atLevel: 5, }),
        ]),
      }),
    }),
  }),
})

export function getSpeciesList() {
  return Object.entries(species).map(([speciesName, speciesValue]) => ({
    name: speciesName,
    lineages: speciesValue.lineages ? Object.keys(speciesValue.lineages) : null
  }))
}

export default function getSpecies(speciesName) {
  const [speciesBaseName, lineageName] = speciesName.split('.')
  const { lineages, ...speciesBase } = species[speciesBaseName]
  if (!lineageName) {
    return speciesBase
  }
  const lineage = lineages?.[lineageName]
  if (!lineage) {
    console.warn(`Lineage ${lineageName} not found for species ${speciesBaseName}`)
    return speciesBase
  }

  return f({
    ...speciesBase,
    ...lineage,
    traits: [...(speciesBase?.traits || []), ...(lineage?.traits || []),],
    spells: [...(speciesBase?.spells || []), ...(lineage?.spells || []),],
  })
}