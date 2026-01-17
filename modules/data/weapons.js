// bludgeoning: Contondant
// piercing: Perforant
// slashing: Tranchant

// mastery: Botte

export const weapons = {
  simpleMelee: {// Armes courantes de corps à corps
    quarterstaff: { damage: `1d6`, type: 'bludgeoning', properties: [`Polyvalente (1d8)`], mastery: `Renversement`, weight: `2 kg`, cost: '20 pc' },
    dagger: { damage: `1d4`, type: 'piercing', properties: [`Finesse`, `Lancer (portée 6/18)`, `Légère`], mastery: `Coup double`, weight: `0,5 kg`, cost: '200 pc' },
    club: { damage: `1d4`, type: 'bludgeoning', properties: [`Légère`], mastery: `Ralentissement`, weight: `1 kg`, cost: '10 pc' },
    handaxe: { damage: `1d6`, type: 'slashing', properties: [`Lancer (portée 6/18)`, `Légère`], mastery: `Ouverture`, weight: `1 kg`, cost: '500 pc' },
    javelin: { damage: `1d6`, type: 'piercing', properties: [`Lancer (portée 9/36)`], mastery: `Ralentissement`, weight: `1 kg`, cost: '50 pc' },
    spear: { damage: `1d6`, type: 'piercing', properties: [`Lancer (portée 6/18)`, `Polyvalente (1d8)`], mastery: `Sape`, weight: `1,5 kg`, cost: '100 pc' },
    lightHammer: { damage: `1d4`, type: 'bludgeoning', properties: [`Lancer (portée 6/18)`, `Légère`], mastery: `Coup double`, weight: `1 kg`, cost: '200 pc' },
    mace: { damage: `1d6`, type: 'bludgeoning', properties: [`—`], mastery: `Sape`, weight: `2 kg`, cost: '500 pc' },
    greatclub: { damage: `1d8`, type: 'bludgeoning', properties: [`Deux mains`], mastery: `Poussée`, weight: `5 kg`, cost: '20 pc' },
    sickle: { damage: `1d4`, type: 'slashing', properties: [`Légère`], mastery: `Coup double`, weight: `1 kg`, cost: '100 pc' },
  }, simpleRanged: {// Armes courantes à distance
    lightCrossbow: { damage: `1d8`, type: 'piercing', properties: [`Chargement`, `Deux mains, Munitions (portée 24/96 ; carreaux)`], mastery: `Ralentissement`, weight: `2,5 kg`, cost: '2500 pc' },
    shortbow: { damage: `1d6`, type: 'piercing', properties: [`Deux mains`, `Munitions (portée 24/96 ; flèches)`], mastery: `Ouverture`, weight: `1 kg`, cost: '2500 pc' },
    dart: { damage: `1d4`, type: 'piercing', properties: [`Finesse`, `Lancer (portée 6/18)`], mastery: `Ouverture`, weight: `125 g`, cost: `5 pc` },
    sling: { damage: `1d4`, type: 'bludgeoning', properties: [`Munitions (portée 9/36 ; billes)`], mastery: `Ralentissement`, weight: `—`, cost: '10 pc' },
  }, martialMelee: {// Armes de guerre de corps à corps
    scimitar: { damage: `1d6`, type: 'slashing', properties: [`Finesse`, `Légère`], mastery: `Coup double`, weight: `1,5 kg`, cost: '2500 pc' },
    glaive: { damage: `1d10`, type: 'slashing', properties: [`Allonge`, `Deux mains`, `Lourde`], mastery: `Écorchure`, weight: `3 kg`, cost: '2000 pc' },
    greatSword: { damage: `2d6`, type: 'slashing', properties: [`Deux mains`, `Lourde`], mastery: `Écorchure`, weight: `3 kg`, cost: '5000 pc' },
    shortSword: { damage: `1d6`, type: 'piercing', properties: [`Finesse`, `Légère`], mastery: `Ouverture`, weight: `1 kg`, cost: '1000 pc' },
    longSword: { damage: `1d8`, type: 'slashing', properties: [`Polyvalente (1d10)`], mastery: `Sape`, weight: `1,5 kg`, cost: '1500 pc' },
    flail: { damage: `1d8`, type: 'bludgeoning', properties: [`—`], mastery: `Sape`, weight: `1 kg`, cost: '1000 pc' },
    whip: { damage: `1d4`, type: 'slashing', properties: [`Allonge`, `Finesse`], mastery: `Ralentissement`, weight: `1,5 kg`, cost: '200 pc' },
    gretAxe: { damage: `1d12`, type: 'slashing', properties: [`Deux mains`, `Lourde`], mastery: `Enchaînement`, weight: `3,5 kg`, cost: '3000 pc' },
    battleAxe: { damage: `1d8`, type: 'slashing', properties: [`Polyvalente (1d10)`], mastery: `Renversement`, weight: `2 kg`, cost: '1000 pc' },
    halberd: { damage: `1d10`, type: 'slashing', properties: [`Allonge`, `Deux mains`, `Lourde`], mastery: `Enchaînement`, weight: `3 kg`, cost: '2000 pc' },
    lance: { damage: `1d10`, type: 'piercing', properties: [`Allonge`, `Deux mains (sauf à cheval)`, `Lourde`], mastery: `Renversement`, weight: `3 kg`, cost: '1000 pc' },
    maul: { damage: `2d6`, type: 'bludgeoning', properties: [`Deux mains`, `Lourde`], mastery: `Renversement`, weight: `5 kg`, cost: '1000 pc' },
    warhammer: { damage: `1d8`, type: 'bludgeoning', properties: [`Polyvalente (1d10)`], mastery: `Poussée`, weight: `2,5 kg`, cost: '1500 pc' },
    morningstar: { damage: `1d8`, type: 'piercing', properties: [`—`], mastery: `Sape`, weight: `2 kg`, cost: '1500 pc' },
    warPick: { damage: `1d8`, type: 'piercing', properties: [`Polyvalente (1d10)`], mastery: `Sape`, weight: `1 kg`, cost: '500 pc' },
    pike: { damage: `1d10`, type: 'piercing', properties: [`Allonge`, `Deux mains, Lourde`], mastery: `Poussée`, weight: `9 kg`, cost: '500 pc' },
    rapier: { damage: `1d8`, type: 'piercing', properties: [`Finesse`], mastery: `Ouverture`, weight: `1 kg`, cost: '2500 pc' },
    trident: { damage: `1d8`, type: 'piercing', properties: [`Lancer (portée 6/18)`, `Polyvalente (1d10)`], mastery: `Renversement`, weight: `2 kg`, cost: '500 pc' },
  }, martialRanged: {// Armes de guerre à distance
    handCrossbow: { damage: `1d6`, type: 'piercing', properties: [`Chargement`, `Légère, Munitions (portée 9/36 ; carreaux)`], mastery: `Ouverture`, weight: `1,5 kg`, cost: '7500 pc' },
    heavyCrossbow: { damage: `1d10`, type: `piercing`, properties: [`Chargement, Deux mains, Lourde, Munitions(portée 30/ 120; carreaux)`], mastery: `Poussée`, weight: `9 kg`, cost: '5000 pc' },
    longbow: { damage: `1d8`, type: 'piercing', properties: [`Deux mains`, `Lourde, Munitions (portée 45/180 ; flèches)`], mastery: `Ralentissement`, weight: `1 kg`, cost: '5000 pc' },
    musket: { damage: `1d12`, type: 'piercing', properties: [`Chargement`, `Deux mains, Munitions (portée 12/36 ; balles)`], mastery: `Ralentissement`, weight: `5 kg`, cost: '50000 pc' },
    pistol: { damage: `1d10`, type: 'piercing', properties: [`Chargement`, `Munitions (portée 9/27 ; balles)`], mastery: `Ouverture`, weight: `1,5 kg`, cost: '25000 pc' },
    blowgun: { damage: `1`, type: 'piercing', properties: [`Chargement`, `Munitions (portée 7,50/30 ; dards)`], mastery: `Ouverture`, weight: `0,5 kg`, cost: '1000 pc' },
  }
}