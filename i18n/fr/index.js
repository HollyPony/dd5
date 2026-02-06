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
    characters: 'Personnages',
    newCharacter: 'Nouveau personnage',
    savedCharacters: 'Personnages enregistrés',
    noCharacters: 'Aucun personnage',
    unnamedCharacter: 'Personnage sans nom',
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
  ability: {
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
        WEAPON_CATEGORY_simpleMelee: {
          all: 'Armes courantes de corps à corps',
        },
        WEAPON_CATEGORY_simpleRanged: {
          all: 'Armes courantes à distance',
        },
        WEAPON_CATEGORY_martialMelee: {
          all: 'Armes de guerre de corps à corps',
          WEAPON_PROPERTY_Light: 'Armes de guerre de corps à corps (Légères)',
        },
        WEAPON_CATEGORY_martialRanged: {
          all: 'Armes de guerre à distance',
          WEAPON_PROPERTY_Light: 'Armes de guerre à distance (Légères)',
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
    TOOL_CATEGORY_Artisan: `outils d'artisanat`,
    TOOL_CATEGORY_MusicalInstrument: `instruments de musique`,
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

    SKILLS_acrobatics: 'Acrobaties', // Rester debout lorsque l'équilibre ou accomplir un exercice acrobatique
    SKILLS_animalHandling: 'Dressage', // Apaiser ou dresser un animal, ou lui faire adopter un certain comportement
    SKILLS_arcana: 'Arcanes', // Se souvenir de détails concernant des sorts, des objets magiques ou les plans d'existence
    SKILLS_athletics: 'Athlétisme', // Sauter plus loin que la normale, garder la tête hors de l'eau des flots violents ou briser quelque chose
    SKILLS_deception: 'Tromperie', // Mentir de manière convaincante ou se déguiser sans éveiller les soupçons
    SKILLS_history: 'Histoire',
    SKILLS_insight: 'Perspicacité',
    SKILLS_intimidation: 'Intimidation',
    SKILLS_investigation: 'Investigation',
    SKILLS_medicine: 'Médecine',
    SKILLS_nature: 'Nature',
    SKILLS_perception: 'Perception',
    SKILLS_performance: 'Représentation',
    SKILLS_persuasion: 'Persuasion',
    SKILLS_religion: 'Religion',
    SKILLS_sleightOfHand: 'Escamotage',
    SKILLS_stealth: 'Discrétion',
    SKILLS_survival: 'Survie',

    ABILITY_strength: 'Force',
    ABILITY_dexterity: 'Dextérité',
    ABILITY_constitution: 'Constitution',
    ABILITY_intelligence: 'Intelligence',
    ABILITY_wisdom: 'Sagesse',
    ABILITY_charisma: 'Charisme',

    WEAPON_CATEGORY_simpleMelee: 'Armes courantes de corps à corps',
    WEAPON_CATEGORY_simpleRanged: 'Armes courantes à distance',
    WEAPON_CATEGORY_martialMelee: 'Armes de guerre de corps à corps',
    WEAPON_CATEGORY_martialRanged: 'Armes de guerre à distance',

    WEAPON_PROPERTY_Ammunition: { name: 'Munitions', description: `` }, // TODO:
    WEAPON_PROPERTY_Finesse: { name: 'Finesse', description: `` }, // TODO:
    WEAPON_PROPERTY_Heavy: { name: 'Lourde', description: `` }, // TODO:
    WEAPON_PROPERTY_Light: { name: 'Légère', description: `` }, // TODO:
    WEAPON_PROPERTY_Loading: { name: 'Chargement', description: `` },

    WEAPON_PROPERTY_Range: { name: '', description: `` }, // TODO:

    WEAPON_PROPERTY_Reach: { name: 'Allonge', description: `` }, // TODO:
    WEAPON_PROPERTY_Thrown: { name: 'Lancer', description: `` }, // TODO:
    WEAPON_PROPERTY_TwoHanded: { name: 'Deux mains', description: `` }, // TODO:
    WEAPON_PROPERTY_Versatile: { name: 'Polyvalente', description: `` }, // TODO:

    WEAPON_AMMUNITION_Arrows: 'flèche',
    WEAPON_AMMUNITION_Bolts: 'carreau',
    WEAPON_AMMUNITION_Bullets: 'Billes de fronde',
    WEAPON_AMMUNITION_Needles: 'dard',

    WEAPON_MASTERY_Cleave: {
      name: 'Enchaînement',
      description: ``, // TODO: 
    },
    WEAPON_MASTERY_Graze: {
      name: 'Écorchure',
      description: ``,
    },
    WEAPON_MASTERY_Nick: {
      name: 'Coup double',
      description: ``,
    },
    WEAPON_MASTERY_Push: {
      name: 'Poussée',
      description: ``,
    },
    WEAPON_MASTERY_Sap: {
      name: 'Sape',
      description: ``,
    },
    WEAPON_MASTERY_Slow: {
      name: 'Ralentissement',
      description: ``,
    },
    WEAPON_MASTERY_Topple: {
      name: 'Renversement',
      description: ``,
    },
    WEAPON_MASTERY_Vex: {
      name: 'Ouverture',
      description: ``,
    },

    WEAPONS_quarterstaff: 'Bâton de combat',
    WEAPONS_dagger: 'Dague',
    WEAPONS_club: 'Gourdin',
    WEAPONS_handaxe: 'Hachette',
    WEAPONS_javelin: 'Javeline',
    WEAPONS_spear: 'Lance',
    WEAPONS_lightHammer: 'Marteau léger',
    WEAPONS_mace: 'Masse d’armes',
    WEAPONS_greatclub: 'Massue',
    WEAPONS_sickle: 'Serpe',
    WEAPONS_lightCrossbow: 'Arbalète légère',
    WEAPONS_shortbow: 'Arc court',
    WEAPONS_dart: 'Fléchette',
    WEAPONS_sling: 'Fronde',
    WEAPONS_scimitar: 'Cimeterre',
    WEAPONS_glaive: 'Coutille',
    WEAPONS_greatSword: 'Épée à deux mains',
    WEAPONS_shortSword: 'Épée courte',
    WEAPONS_longSword: 'Épée longue',
    WEAPONS_flail: 'Fléau d’armes',
    WEAPONS_whip: 'Fouet',
    WEAPONS_gretAxe: 'Hache à deux mains',
    WEAPONS_battleAxe: `Hache d'armes`,
    WEAPONS_halberd: 'Hallebarde',
    WEAPONS_lance: 'Lance d’arçon',
    WEAPONS_maul: 'Maillet d’armes',
    WEAPONS_warhammer: 'Marteau de guerre',
    WEAPONS_morningstar: 'Morgenstern',
    WEAPONS_warPick: 'Pic de guerre',
    WEAPONS_pike: 'Pique',
    WEAPONS_rapier: 'Rapière',
    WEAPONS_trident: 'Trident',
    WEAPONS_handCrossbow: 'Arbalète de poing',
    WEAPONS_heavyCrossbow: 'Arbalète lourde',
    WEAPONS_longbow: 'Arc long',
    WEAPONS_musket: 'Mousquet',
    WEAPONS_pistol: 'Pistolet',
    WEAPONS_blowgun: 'Sarbacane',
  },
}
