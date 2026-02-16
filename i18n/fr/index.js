import origins from './origins.js'
import classes from './classes.js'
import classFeatures from './class-features.js'
import species from './species.js'
import speciesTraits from './species-traits.js'
import gears from './gears.js'
import spells from './spells.js'
import feats, { CATEGORY as FEAT_CATEGORY } from './feats.js'

// Remplis toutes les descriptions d’espèces dans species.js.
// - Écris en français, UTF‑8 avec accents.
// - Format: 2 à 4 paragraphes par espèce, avec retours à la ligne.
// - Contenu attendu: origines, mode de vie, présence dans D&D (où ils vivent, communautés, villes), mental/moral, place sociale, et 1 mention des apports techniques sans détailler les traits.
// - Ne décris pas les traits (ils sont ailleurs), mais cite les lignées/ascendances et explique leur importance.
// - Pour les lignées (ex: goliath, drakéide), détaille clairement leur identité et ce qu’elles apportent, y compris les dés si c’est central.
// - Style: proche du lore officiel, pas de paraphrase trop libre, pas de texte court.
// - N’éditer que species.js.

export default {
  navbar: {
    appTitle: 'Création de personnage',
    exportChar: 'Télécharger',
    importChar: 'Importer',
    debug: 'Debug',
    characters: 'Personnages',
    newCharacter: 'Nouveau personnage',
    savedCharacters: 'Personnages enregistrés',
    noCharacters: 'Aucun personnage',
    unnamedCharacter: 'Personnage sans nom',
  },
  modals: {
    jsonOutput: {
      title: 'JSON du personnage',
    },
  },
  charName: {
    label: 'Nom du personnage',
  },
  origins: {
    label: 'Origine',
  },
  classes: {
    label: 'Classe',
  },
  subClasses: {
    label: 'Sous-classe',
    select: {
      chooseOne: 'Choisir une sous-classe',
      unavailable: 'Dispo au niveau 3',
    },
  },
  level: {
    label: 'Niveau',
  },
  experiencepoints: {
    label: "XP",
  },
  abilities: {
    save: {
      label: 'Sauvegarde',
    }
  },
  armorclass: {
    label: "Classe d'armure",
  },
  sizeCategory: {
    small: 'P',
    medium: 'M',
  },
  feats: {
    title: 'Dons',
  },
  stats: {
    proficiencyBonus: 'Bonus de maîtrise',
    inspiration: 'Inspiration',
  },
  specs: {
    initiative: 'Initiative',
    speed: 'Vitesse',
    size: 'Taille',
    passivePerception: 'Perception Passive',
  },
  weaponscantrip: {
    title: 'Armes & sorts mineurs',
    weapons: {
      _select: 'Ajouter une arme',
    },
  },
  // TODO: still use ?
  species: {
    label: 'Race',
    title: `Traits d'espèce`,
  },
  components: {
    Trainings: {
      title: 'Entraînements & Maîtrises',
      armor: {
        title: 'Armures',
        light: 'Légères',
        medium: 'Intermed.',
        heavy: 'Lourdes',
      },
      shield: 'Boucliers',
      weapons: {
        title: 'Armes',
        none: 'Aucune arme maîtrisée',
        WEAPON_CATEGORY: {
          simpleMelee: {
            all: 'Armes courantes de corps à corps',
          },
          simpleRanged: {
            all: 'Armes courantes à distance',
          },
          martialMelee: {
            all: 'Armes de guerre de corps à corps',
            WEAPON_PROPERTY: {
              Light: 'Armes de guerre de corps à corps (Légères)',
            },
          },
          martialRanged: {
            all: 'Armes de guerre à distance',
            WEAPON_PROPERTY: {
              Light: 'Armes de guerre à distance (Légères)',
            },
          },
        },
      },
      tools: {
        title: 'Outils',
        none: 'Aucun outil maîtrisée',
      }
    },
    ClassFeatures: {
      title: `Capacités de classe`
    },
    ClassBase: {
      title: `Caractéristiques de classe`,
      skills: {
        title: `Maîtrises de compétence`,
        remaining: `Il reste {remaining} compétence(s) à choisir`,
        notConcerned: `Il n'y a pas de compétences à choisir`,
      },
      tools: {
        title: `Maîtrises d'outils`,
        remaining: `Il reste {remaining} outil(s) à choisir`,
        remainingGroup: `Il reste {remaining} {from} à choisir`,
        notConcerned: `Il n'y a pas de maitrîses d'outils à choisir`,
        forced: `Outils maitrîsé :`
      },
    },
    ClassFeature: {
      name: `**Nv.{level}** - {featureName}`,
      description: {
        title: `Description`
      }
    },
    ClassSelect: {
      chooseOne: `Choisir une classe`,
    },
    OriginSelect: {
      chooseOne: `Choisir une origine`,
    },
    SpeciesSelect: {
      chooseOne: `Choisir une race`,
    },
    SpeciesTraits: {
      empty: `Aucune espèce sélectionnée`,
      noDescription: `Aucune description`,
      resistanceTitle: `Résistance`,
      spellLevel: `Niveau: {level}`,
      meta: {
        level: `Niveau: {level}`,
        range: `Portée: {range}`,
        type: `Type: {type}`,
      },
    },
  },
  statics: {
    origins,
    classes,
    'class-features': classFeatures,
    species,
    traits: speciesTraits,
    armorClasses: {
      light: 'Armures légères',
      medium: 'Armures intermédiaires',
      heavy: 'Armures lourdes',
      shield: 'Boucliers',
    },
    TOOL_CATEGORY: {
      Artisan: `outils d'artisanat`,
      MusicalInstrument: `instruments de musique`,
      Other: `autres outils`,
    },
    armors: {
      padded: `Armure matelassée`,
      leather: `Armure de cuir`,
      studdedLeather: `Armure de cuir clouté`,
      hideArmor: `Armure de peaux`,
      chainShirt: `Chemise de mailles`,
      scaleMail: `Armure d'écailles`,
      breastplate: `Cuirasse`,
      halfPlate: `Demi-plate`,
      ringMail: `Broigne`,
      chainMail: `Cotte de mailles`,
      splint: `Clibanion`,
      plate: `Harnois`,
      shield: `Bouclier`,
    },
    TOOLS: {
      alchemistsSupplies: { name: `Matériel d'Alchemiste`, usage: ``, },
      brewersSupplies: { name: `Matériel de brasseur`, usage: ``, },
      calligraphersSupplies: { name: `Matériel de calligraphe`, usage: ``, },
      carpentersTools: { name: `Outils de charpentier`, usage: ``, },
      cartographersToolTools: { name: `Outils de cartographe`, usage: ``, },
      cobblersTools: { name: `Outils cordonnier`, usage: ``, },
      cooksTools: { name: `Ustensiles de cuisinier`, usage: ``, },
      glassblowersTools: { name: `Outils de souffleur de verre`, usage: ``, },
      jewelersTools: { name: `Outils joaillier`, usage: ``, },
      leatherworkersTools: { name: `Outils de tanneur`, usage: ``, },
      masonsTools: { name: `Outils de maçon`, usage: ``, },
      paintersTools: { name: `Matériel de peintre`, usage: ``, },
      pottersTools: { name: `Outils de potier`, usage: ``, },
      smithsTools: { name: `Outils de forgeron`, usage: ``, },
      tinkersTools: { name: `Outils de bricoleur`, usage: ``, },
      weaversTools: { name: `Outils de tisserand`, usage: ``, },
      woodcarversTools: { name: `Outils de menuisier`, usage: ``, },

      disguiseKit: { name: `Accessoires de déguisement`, usage: ``, },
      forgeryKit: { name: `Matériel de contrefaçon`, usage: ``, },
      gamingSet: {
        name: `Boîte de jeux`, usage: ``,
        variants: {
          dice: 'Dés',
          dragonChess: 'Échecs draconiques',
          playingCards: 'Cartes à jouer',
          threeDragonAnte: 'Jeu des dragons',
        }
      },
      herbalismKit: { name: `Matériel d'herboriste`, usage: ``, },
      bagpipes: { name: `Cornemuse`, usage: ``, },
      drum: { name: `Tambour`, usage: ``, },
      dulcimer: { name: `Tympanon`, usage: ``, },
      flute: { name: `Flûte`, usage: ``, },
      horn: { name: `Cor`, usage: ``, },
      lute: { name: `Luth`, usage: ``, },
      lyre: { name: `Lyre`, usage: ``, },
      panFlute: { name: `Flûte de Pan`, usage: ``, },
      shawm: { name: `Chalemie`, usage: ``, },
      viol: { name: `Viole`, usage: ``, },
      navigatorsTools: { name: `Instruments de navigateur`, usage: ``, },
      poisonersKit: { name: `Matériel d'empoisonneur'`, usage: ``, },
      thievesTools: { name: `Outils de voleur`, usage: ``, },
    },
    gears,
    subClasses: {
      barbarian: {
        berserker: 'Voie du Berserker',
        wildHeart: 'Voie du Coeur sauvage',
        worldTree: 'Voie de l\'Arbre-Monde',
        zealot: 'Voie du Zélateur',
      },
      bard: {
        dance: 'Collège de la Danse',
        glamour: 'Collège de la Séduction',
        lore: 'Collège du Savoir',
        valor: 'Collège de la Vaillance',
      },
      cleric: {
        life: 'Domaine de la Vie',
        light: 'Domaine de la Lumière',
        trickery: 'Domaine de la Ruse',
        war: 'Domaine de la Guerre',
      },
      druid: {
        land: 'Cercle de la Terre',
        moon: 'Cercle de la Lune',
        sea: 'Cercle des Mers',
        stars: 'Cercle des Astres',
      },
      fighter: {
        battleMaster: 'Maître de Guerre',
        champion: 'Champion',
        eldritchKnight: 'Chevalier Occulte',
        psiWarrior: 'Soldat Psi',
      },
      monk: {
        mercy: 'Credo de la Miséricorde',
        shadow: 'Credo de l\'Ombre',
        elements: 'Credo des éléments',
        openHand: 'Credo de la Paume',
      },
      paladin: {
        devotion: 'Serment de Dévotion',
        glory: 'Serment de la Gloire',
        ancients: 'Serment des Anciens',
        vengeance: 'Serment de Vengeance',
      },
      ranger: {
        beast: 'Belluaire',
        fey: 'Vagabond Féérique',
        stalker: 'Traqueur des Ténèbres',
        hunter: 'Chasseur',
      },
      rogue: {
        arcana: 'Arnaqueur Arcanique',
        assassin: 'Assassin',
        soulknife: 'Âme acérée',
        thief: 'Voleur',
      },
      sorcerer: {
        aberrant: 'Sorcellerie Aberrante',
        clockwork: 'Sorcellerie Mécanique',
        draconic: 'Sorcellerie Draconique',
        wild: 'Sorcellerie Sauvage',
      },
      warlock: {
        archfey: 'Protecteur Archifée',
        celestial: 'Protecteur Céleste',
        fiend: 'Protecteur Fiélon',
        old: 'Protecteur Grand Ancien',
      },
      wizard: {
        abjureur: 'Abjurateur',
        diviner: 'Devin',
        evoker: 'Evocateur',
        illusionist: 'Illusioniste',
      },
    },
    spells,
    feats,
    FEAT_CATEGORY,

    SKILLS: {
      acrobatics: 'Acrobaties', // Rester debout lorsque l'équilibre ou accomplir un exercice acrobatique
      animalHandling: 'Dressage', // Apaiser ou dresser un animal, ou lui faire adopter un certain comportement
      arcana: 'Arcanes', // Se souvenir de détails concernant des sorts, des objets magiques ou les plans d'existence
      athletics: 'Athlétisme', // Sauter plus loin que la normale, garder la tête hors de l'eau des flots violents ou briser quelque chose
      deception: 'Tromperie', // Mentir de manière convaincante ou se déguiser sans éveiller les soupçons
      history: 'Histoire',
      insight: 'Perspicacité',
      intimidation: 'Intimidation',
      investigation: 'Investigation',
      medicine: 'Médecine',
      nature: 'Nature',
      perception: 'Perception',
      performance: 'Représentation',
      persuasion: 'Persuasion',
      religion: 'Religion',
      sleightOfHand: 'Escamotage',
      stealth: 'Discrétion',
      survival: 'Survie',
    },

    ABILITIES: {
      strength: 'Force',
      dexterity: 'Dextérité',
      constitution: 'Constitution',
      intelligence: 'Intelligence',
      wisdom: 'Sagesse',
      charisma: 'Charisme',
    },

    WEAPON_CATEGORY: {
      simpleMelee: 'Armes courantes de corps à corps',
      simpleRanged: 'Armes courantes à distance',
      martialMelee: 'Armes de guerre de corps à corps',
      martialRanged: 'Armes de guerre à distance',
    },

    WEAPON_PROPERTY: {
      Ammunition: { name: 'Munitions', description: `` }, // TODO:
      Finesse: { name: 'Finesse', description: `` }, // TODO:
      Heavy: { name: 'Lourde', description: `` }, // TODO:
      Light: { name: 'Légère', description: `` }, // TODO:
      Loading: { name: 'Chargement', description: `` },
      Range: { name: '', description: `` }, // TODO:
      Reach: { name: 'Allonge', description: `` }, // TODO:
      Thrown: { name: 'Lancer', description: `` }, // TODO:
      TwoHanded: { name: 'Deux mains', description: `` }, // TODO:
      Versatile: { name: 'Polyvalente', description: `` }, // TODO:
    },

    WEAPON_AMMUNITION: {
      Arrows: 'flèche',
      Bolts: 'carreau',
      SlingBullets: 'Billes de fronde',
      FirearmBullets: 'Balles',
      Needles: 'dard',
    },

    WEAPON_MASTERY: {
      Cleave: {
        name: 'Enchaînement',
        description: ``, // TODO: 
      },
      Graze: {
        name: 'Écorchure',
        description: ``,
      },
      Nick: {
        name: 'Coup double',
        description: ``,
      },
      Push: {
        name: 'Poussée',
        description: ``,
      },
      Sap: {
        name: 'Sape',
        description: ``,
      },
      Slow: {
        name: 'Ralentissement',
        description: ``,
      },
      Topple: {
        name: 'Renversement',
        description: ``,
      },
      Vex: {
        name: 'Ouverture',
        description: ``,
      },
    },

    WEAPONS: {
      quarterstaff: 'Bâton de combat',
      dagger: 'Dague',
      club: 'Gourdin',
      handaxe: 'Hachette',
      javelin: 'Javeline',
      spear: 'Lance',
      lightHammer: 'Marteau léger',
      mace: 'Masse d’armes',
      greatclub: 'Massue',
      sickle: 'Serpe',
      lightCrossbow: 'Arbalète légère',
      shortbow: 'Arc court',
      dart: 'Fléchette',
      sling: 'Fronde',
      scimitar: 'Cimeterre',
      glaive: 'Coutille',
      greatSword: 'Épée à deux mains',
      shortSword: 'Épée courte',
      longSword: 'Épée longue',
      flail: 'Fléau d’armes',
      whip: 'Fouet',
      gretAxe: 'Hache à deux mains',
      battleAxe: `Hache d'armes`,
      halberd: 'Hallebarde',
      lance: 'Lance d’arçon',
      maul: 'Maillet d’armes',
      warhammer: 'Marteau de guerre',
      morningstar: 'Morgenstern',
      warPick: 'Pic de guerre',
      pike: 'Pique',
      rapier: 'Rapière',
      trident: 'Trident',
      handCrossbow: 'Arbalète de poing',
      heavyCrossbow: 'Arbalète lourde',
      longbow: 'Arc long',
      musket: 'Mousquet',
      pistol: 'Pistolet',
      blowgun: 'Sarbacane',
    },
  },
}
