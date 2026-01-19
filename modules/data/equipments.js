import { f, } from '../lib.js'

// bludgeoning: Contondant
// piercing: Perforant
// slashing: Tranchant

// mastery: Botte

export const weapons = f({
  simpleMelee: f({// Armes courantes de corps à corps
    quarterstaff: f({
      damage: `1d6`,
      type: 'bludgeoning',
      properties: f([`Polyvalente (1d8)`]),
      mastery: `Renversement`,
      weight: `2 kg`,
      cost: '20 pc'
    }),
    dagger: f({
      damage: `1d4`,
      type: 'piercing',
      properties: f([`Finesse`, `Lancer (portée 6/18)`, `Légère`]),
      mastery: `Coup double`,
      weight: `0,5 kg`,
      cost: '200 pc'
    }),
    club: f({
      damage: `1d4`,
      type: 'bludgeoning',
      properties: f([`Légère`]),
      mastery: `Ralentissement`,
      weight: `1 kg`,
      cost: '10 pc'
    }),
    handaxe: f({
      damage: `1d6`,
      type: 'slashing',
      properties: f([`Lancer (portée 6/18)`, `Légère`]),
      mastery: `Ouverture`,
      weight: `1 kg`,
      cost: '500 pc'
    }),
    javelin: f({
      damage: `1d6`,
      type: 'piercing',
      properties: f([`Lancer (portée 9/36)`]),
      mastery: `Ralentissement`,
      weight: `1 kg`,
      cost: '50 pc'
    }),
    spear: f({
      damage: `1d6`,
      type: 'piercing',
      properties: f([`Lancer (portée 6/18)`, `Polyvalente (1d8)`]),
      mastery: `Sape`,
      weight: `1,5 kg`,
      cost: '100 pc'
    }),
    lightHammer: f({
      damage: `1d4`,
      type: 'bludgeoning',
      properties: f([`Lancer (portée 6/18)`, `Légère`]),
      mastery: `Coup double`,
      weight: `1 kg`,
      cost: '200 pc'
    }),
    mace: f({
      damage: `1d6`,
      type: 'bludgeoning',
      properties: f([`—`]),
      mastery: `Sape`,
      weight: `2 kg`,
      cost: '500 pc'
    }),
    greatclub: f({
      damage: `1d8`,
      type: 'bludgeoning',
      properties: f([`Deux mains`]),
      mastery: `Poussée`,
      weight: `5 kg`,
      cost: '20 pc'
    }),
    sickle: f({
      damage: `1d4`,
      type: 'slashing',
      properties: f([`Légère`]),
      mastery: `Coup double`,
      weight: `1 kg`,
      cost: '100 pc'
    }),
  }),
  simpleRanged: f({// Armes courantes à distance
    lightCrossbow: f({
      damage: `1d8`,
      type: 'piercing',
      properties: f([`Chargement`, `Deux mains`, `Munitions (portée 24/96 ; carreaux)`]),
      mastery: `Ralentissement`,
      weight: `2,5 kg`,
      cost: '2500 pc'
    }),
    shortbow: f({
      damage: `1d6`,
      type: 'piercing',
      properties: f([`Deux mains`, `Munitions (portée 24/96 ; flèches)`]),
      mastery: `Ouverture`,
      weight: `1 kg`,
      cost: '2500 pc'
    }),
    dart: f({
      damage: `1d4`,
      type: 'piercing',
      properties: f([`Finesse`, `Lancer (portée 6/18)`]),
      mastery: `Ouverture`,
      weight: `125 g`,
      cost: `5 pc`
    }),
    sling: f({
      damage: `1d4`,
      type: 'bludgeoning',
      properties: f([`Munitions (portée 9/36 ; billes)`]),
      mastery: `Ralentissement`,
      weight: `—`,
      cost: '10 pc'
    }),
  }),
  martialMelee: f({// Armes de guerre de corps à corps
    scimitar: f({
      damage: `1d6`,
      type: 'slashing',
      properties: f([`Finesse`, `Légère`]),
      mastery: `Coup double`,
      weight: `1,5 kg`,
      cost: '2500 pc'
    }),
    glaive: f({
      damage: `1d10`,
      type: 'slashing',
      properties: f([`Allonge`, `Deux mains`, `Lourde`]),
      mastery: `Écorchure`,
      weight: `3 kg`,
      cost: '2000 pc'
    }),
    greatSword: f({
      damage: `2d6`,
      type: 'slashing',
      properties: f([`Deux mains`, `Lourde`]),
      mastery: `Écorchure`,
      weight: `3 kg`,
      cost: '5000 pc'
    }),
    shortSword: f({
      damage: `1d6`,
      type: 'piercing',
      properties: f([`Finesse`, `Légère`]),
      mastery: `Ouverture`,
      weight: `1 kg`,
      cost: '1000 pc'
    }),
    longSword: f({
      damage: `1d8`,
      type: 'slashing',
      properties: f([`Polyvalente (1d10)`]),
      mastery: `Sape`,
      weight: `1,5 kg`,
      cost: '1500 pc'
    }),
    flail: f({
      damage: `1d8`,
      type: 'bludgeoning',
      properties: f([`—`]),
      mastery: `Sape`,
      weight: `1 kg`,
      cost: '1000 pc'
    }),
    whip: f({
      damage: `1d4`,
      type: 'slashing',
      properties: f([`Allonge`, `Finesse`]),
      mastery: `Ralentissement`,
      weight: `1,5 kg`,
      cost: '200 pc'
    }),
    gretAxe: f({
      damage: `1d12`,
      type: 'slashing',
      properties: f([`Deux mains`, `Lourde`]),
      mastery: `Enchaînement`,
      weight: `3,5 kg`,
      cost: '3000 pc'
    }),
    battleAxe: f({
      damage: `1d8`,
      type: 'slashing',
      properties: f([`Polyvalente (1d10)`]),
      mastery: `Renversement`,
      weight: `2 kg`,
      cost: '1000 pc'
    }),
    halberd: f({
      damage: `1d10`,
      type: 'slashing',
      properties: f([`Allonge`, `Deux mains`, `Lourde`]),
      mastery: `Enchaînement`,
      weight: `3 kg`,
      cost: '2000 pc'
    }),
    lance: f({
      damage: `1d10`,
      type: 'piercing',
      properties: f([`Allonge`, `Deux mains (sauf à cheval)`, `Lourde`]),
      mastery: `Renversement`,
      weight: `3 kg`,
      cost: '1000 pc'
    }),
    maul: f({
      damage: `2d6`,
      type: 'bludgeoning',
      properties: f([`Deux mains`, `Lourde`]),
      mastery: `Renversement`,
      weight: `5 kg`,
      cost: '1000 pc'
    }),
    warhammer: f({
      damage: `1d8`,
      type: 'bludgeoning',
      properties: f([`Polyvalente (1d10)`]),
      mastery: `Poussée`,
      weight: `2,5 kg`,
      cost: '1500 pc'
    }),
    morningstar: f({
      damage: `1d8`,
      type: 'piercing',
      properties: f([`—`]),
      mastery: `Sape`,
      weight: `2 kg`,
      cost: '1500 pc'
    }),
    warPick: f({
      damage: `1d8`,
      type: 'piercing',
      properties: f([`Polyvalente (1d10)`]),
      mastery: `Sape`,
      weight: `1 kg`,
      cost: '500 pc'
    }),
    pike: f({
      damage: `1d10`,
      type: 'piercing',
      properties: f([`Allonge`, `Deux mains, Lourde`]),
      mastery: `Poussée`,
      weight: `9 kg`,
      cost: '500 pc'
    }),
    rapier: f({
      damage: `1d8`,
      type: 'piercing',
      properties: f([`Finesse`]),
      mastery: `Ouverture`,
      weight: `1 kg`,
      cost: '2500 pc'
    }),
    trident: f({
      damage: `1d8`,
      type: 'piercing',
      properties: f([`Lancer (portée 6/18)`, `Polyvalente (1d10)`]),
      mastery: `Renversement`,
      weight: `2 kg`,
      cost: '500 pc'
    }),
  }),
  martialRanged: f({// Armes de guerre à distance
    handCrossbow: f({
      damage: `1d6`,
      type: 'piercing',
      properties: f([`Chargement`, `Légère`, `Munitions (portée 9/36 ; carreaux)`]),
      mastery: `Ouverture`,
      weight: `1,5 kg`,
      cost: '7500 pc'
    }),
    heavyCrossbow: f({
      damage: `1d10`,
      type: `piercing`,
      properties: f([`Chargement`, `Deux mains`, `Lourde`, `Munitions(portée 30/ 120; carreaux)`]),
      mastery: `Poussée`,
      weight: `9 kg`,
      cost: '5000 pc'
    }),
    longbow: f({
      damage: `1d8`,
      type: 'piercing',
      properties: f([`Deux mains`, `Lourde`, `Munitions (portée 45/180 ; flèches)`]),
      mastery: `Ralentissement`,
      weight: `1 kg`,
      cost: '5000 pc'
    }),
    musket: f({
      damage: `1d12`,
      type: 'piercing',
      properties: f([`Chargement`, `Deux mains`, `Munitions (portée 12/36 ; balles)`]),
      mastery: `Ralentissement`,
      weight: `5 kg`,
      cost: '50000 pc'
    }),
    pistol: f({
      damage: `1d10`,
      type: 'piercing',
      properties: f([`Chargement`, `Munitions (portée 9/27 ; balles)`]),
      mastery: `Ouverture`,
      weight: `1,5 kg`,
      cost: '25000 pc'
    }),
    blowgun: f({
      damage: `1`,
      type: 'piercing',
      properties: f([`Chargement`, `Munitions (portée 7,50/30 ; dards)`]),
      mastery: `Ouverture`,
      weight: `0,5 kg`,
      cost: '1000 pc'
    }),
  }),
})

export const armors = f({
  light: f({// Armures légères
    padded: f({
      armorClass: (dex) => 11 + dex,
      strength: null,
      stealthMalus: true,
      weight: `4 kg`, // TODO: Weight
      cost: `5 po`
    }),
    leather: f({
      armorClass: (dex) => 11 + dex,
      strength: null,
      stealthMalus: false,
      weight: `5 kg`,
      cost: `10 po`
    }),
    studdedLeather: f({
      armorClass: (dex) => 12 + dex,
      strength: null,
      stealthMalus: false,
      weight: `6,5 kg`,
      cost: `45 po`
    }),
  }),
  medium: f({ // Armures intermédiaires
    hideArmor: f({
      armorClass: (dex) => 12 + Math.min(dex, 2),
      strength: null,
      stealthMalus: false,
      weight: `6 kg`,
      cost: `10 po`
    }),
    chainShirt: f({
      armorClass: (dex) => 13 + Math.min(dex, 2),
      strength: null,
      stealthMalus: false,
      weight: `10 kg`,
      cost: `50 po`
    }),
    scaleMail: f({
      armorClass: (dex) => 14 + Math.min(dex, 2),
      strength: null,
      stealthMalus: true,
      weight: `22,5 kg`,
      cost: `50 po`
    }),
    breastplate: f({
      armorClass: (dex) => 14 + Math.min(dex, 2),
      strength: null,
      stealthMalus: false,
      weight: `10 kg`,
      cost: `400 po`
    }),
    halfPlate: f({
      armorClass: (dex) => 15 + Math.min(dex, 2),
      strength: null,
      stealthMalus: true,
      weight: `20 kg`,
      cost: `750 po`
    }),
  }),
  heavy: f({ // Armures lourdes
    ringMail: f({
      armorClass: () => 14,
      strength: null,
      stealthMalus: true,
      weight: `20 kg`,
      cost: `30 po`
    }),
    chainMail: f({
      armorClass: () => 16,
      strength: 13,
      stealthMalus: true,
      weight: `27,5 kg`,
      cost: `75 po`
    }),
    splint: f({
      armorClass: () => 17,
      strength: 15,
      stealthMalus: true,
      weight: `30 kg`,
      cost: `200 po`
    }),
    plate: f({
      armorClass: () => 18,
      strength: 15,
      stealthMalus: true,
      weight: `32,5 kg`,
      cost: `1500 po`
    }),
  }),
  shield: f({ // Bouclier
    shield: f({
      name: `Bouclier`,
      armorClass: 2,
      strength: null,
      stealthMalus: false,
      weight: `3 kg`,
      cost: `10 po`
    }),
  }),
})