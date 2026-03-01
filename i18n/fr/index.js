import origins from './origins.js'
import classes from './classes.js'
import classFeatures from './class-features.js'
import species from './species.js'
import speciesTraits from './species-traits.js'
import GEARS from './gears.js'
import spells from './spells.js'
import feats, { CATEGORY as FEAT_CATEGORY } from './feats.js'
import errors from './errors.js'

// Remplis toutes les descriptions d’espèces dans species.js.
// - Écris en français, UTF‑8 avec accents.
// - Format: 2 à 4 paragraphes par espèce, avec retours à la ligne.
// - Contenu attendu: origines, mode de vie, présence dans D&D (où ils vivent, communautés, villes), mental/moral, place sociale, et 1 mention des apports techniques sans détailler les traits.
// - Ne décris pas les traits (ils sont ailleurs), mais cite les lignées/ascendances et explique leur importance.
// - Pour les lignées (ex: goliath, drakéide), détaille clairement leur identité et ce qu’elles apportent, y compris les dés si c’est central.
// - Style: proche du lore officiel, pas de paraphrase trop libre, pas de texte court.
// - N’éditer que species.js.

export default {
  errors,
  navbar: {
    appTitle: 'D&D Personnage',
    exportChar: 'Télécharger',
    importChar: 'Importer',
    debug: 'Debug',
    characters: 'Personnages',
    newCharacter: 'Nouveau personnage',
    savedCharacters: 'Personnages enregistrés',
    noCharacters: 'Aucun personnage',
    unnamedCharacter: 'Personnage sans nom',
    auth: {
      login: 'Connexion',
      account: 'Compte',
      logout: 'Se déconnecter',
      providers: {
        google: 'Continuer avec Google',
        facebook: 'Continuer avec Facebook',
      },
    },
  },
  modals: {
    jsonOutput: {
      title: 'JSON du personnage',
    },
    syncConflicts: {
      title: 'Conflits de synchronisation',
      entryTitle: 'Personnage: {entryId}',
      localDate: 'Local: {date}',
      remoteDate: 'Cloud: {date}',
      choices: {
        local: 'Garder local',
        remote: 'Garder distant',
        both: 'Garder les deux',
      },
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
  alignment: {
    title: 'Alignement',
    placeholder: 'Loyal Bon',
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
    cantrips: {
      title: 'Sorts mineurs',
      todo: 'Les sorts mineurs seront intégrés avec le moteur de sort en P3 (selon la classe).',
    },
    weapons: {
      title: 'Armes équipées',
      _equipSelect: 'Équiper une arme',
      none: 'Aucune arme équipée',
      unequip: 'Déséquiper',
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
      title: {
        noClass: `Choisir une classe d'abord`,
        withClass: `**{className}** - Caractéristiques`,
      },
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
    CharacterProfile: {
      title: 'Profil du personnage',
      description: 'Description',
      history: 'Histoire',
      appearance: 'Apparence',
      placeholder: 'À compléter',
    },
    Backpack: {
      title: 'Sac à dos',
      addButton: 'Ajouter un équipement',
      removeButton: 'Retirer',
      equipedBadge: 'Équipé',
      actions: {
        equip: 'Équiper',
        unequip: 'Ranger',
        attune: 'Harmoniser',
        attuned: 'Harmonisé',
      },
      empty: 'Aucun équipement possédé',
      types: {
        weapon: 'Armes',
        armor: 'Armures',
        shield: 'Boucliers',
        tool: 'Outils',
        gear: 'Équipement',
        magicItem: 'Objets magiques',
        other: 'Autres',
      },
      addModal: {
        title: 'Ajouter un équipement',
        searchPlaceholder: 'Rechercher un équipement',
        noResults: 'Aucun équipement pour ce filtre',
        add: 'Ajouter',
        cancel: 'Annuler',
      },
    },
    Vitals: {
      hitPoints: {
        title: 'Points de vie',
        current: 'Actuels',
        temp: 'Temporaires',
        max: 'Max',
      },
      hitDice: {
        title: 'Dés de vie',
        spent: 'Dépensés',
        max: 'Max',
      },
      deathSaves: {
        title: 'Jets de mort',
        successes: 'Succès',
        failures: 'Échecs',
      },
    },
  },
  statics: {
    sizeCategory: {
      small: 'P',
      medium: 'M',
    },
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
      quarterstaff: { name: `Bâton de combat`, description: `Arme simple polyvalente, souvent portée par les mages et voyageurs. Solide en mêlée et facile à manier à une ou deux mains.` },
      dagger: { name: `Dague`, description: `Lame légère de secours, discrète et facile à lancer. Excellente pour les styles reposant sur la Finesse.` },
      club: { name: `Gourdin`, description: `Arme rudimentaire contondante, simple et robuste. Peu coûteuse, elle convient bien aux combattants débutants.` },
      handaxe: { name: `Hachette`, description: `Petite hache tranchante, utile au corps à corps comme au lancer. Très polyvalente pour les aventuriers mobiles.` },
      javelin: { name: `Javeline`, description: `Lance légère conçue pour être projetée rapidement. Portée limitée, mais pratique en ouverture de combat.` },
      spear: { name: `Lance`, description: `Arme simple d’allonge modérée, efficace en mêlée et au lancer. Son usage est répandu dans toutes les armées.` },
      lightHammer: { name: `Marteau léger`, description: `Marteau compact pouvant frapper ou être lancé. Idéal pour infliger des dégâts contondants à courte distance.` },
      mace: { name: `Masse d’armes`, description: `Arme contondante classique, efficace contre les ennemis protégés. Fiable, sans technique complexe.` },
      greatclub: { name: `Massue`, description: `Gros bâton lourd qui frappe avec puissance brute. Demande de la force, mais reste très accessible.` },
      sickle: { name: `Serpe`, description: `Lame courbe légère adaptée aux frappes rapides. Modeste en portée, mais utile dans des mains agiles.` },
      lightCrossbow: { name: `Arbalète légère`, description: `Arme à distance précise et stable, appréciée des tireurs prudents. Son rechargement limite la cadence.` },
      shortbow: { name: `Arc court`, description: `Arc léger offrant une bonne cadence de tir. Très utilisé pour les déplacements rapides et les escarmouches.` },
      dart: { name: `Fléchette`, description: `Petit projectile facile à transporter et lancer. Solution simple pour attaquer à distance sans arc.` },
      sling: { name: `Fronde`, description: `Arme primitive lançant des projectiles contondants. Peu chère et discrète, mais demandant de la pratique.` },
      scimitar: { name: `Cimeterre`, description: `Lame courbe légère favorisant les frappes rapides. Convient bien aux combattants agiles en duel rapproché.` },
      glaive: { name: `Coutille`, description: `Arme d’hast longue permettant de tenir l’ennemi à distance. Redoutable pour contrôler l’espace en mêlée.` },
      greatSword: { name: `Épée à deux mains`, description: `Lame massive infligeant de lourds dégâts tranchants. Exige les deux mains mais récompense l’engagement offensif.` },
      shortSword: { name: `Épée courte`, description: `Lame légère et maniable, efficace dans les espaces étroits. Favorise les styles rapides et précis.` },
      longSword: { name: `Épée longue`, description: `Arme martiale polyvalente, utilisable à une ou deux mains. Équilibre classique entre puissance et flexibilité.` },
      flail: { name: `Fléau d’armes`, description: `Arme contondante martiale capable de frappes violentes. Son style imprévisible surprend les adversaires.` },
      whip: { name: `Fouet`, description: `Arme souple offrant une allonge inhabituelle pour sa taille. Favorise le harcèlement et le contrôle à distance courte.` },
      gretAxe: { name: `Hache à deux mains`, description: `Hache lourde de guerre conçue pour des coups dévastateurs. Très puissante, mais demande un engagement total.` },
      battleAxe: { name: `Hache d'armes`, description: `Hache martiale équilibrée pour combat rapproché. Peut être maniée de façon flexible selon la situation.` },
      halberd: { name: `Hallebarde`, description: `Arme d’hast combinant lame, pointe et crochet. Excellente pour garder la ligne et frapper à distance.` },
      lance: { name: `Lance d’arçon`, description: `Arme longue privilégiée à cheval pour les charges. Très efficace montée, plus contraignante à pied.` },
      maul: { name: `Maillet d’armes`, description: `Marteau colossal infligeant des dégâts contondants massifs. Arme de force pure contre armures et obstacles.` },
      warhammer: { name: `Marteau de guerre`, description: `Marteau militaire polyvalent, efficace contre des cibles protégées. Utilisable à une ou deux mains.` },
      morningstar: { name: `Morgenstern`, description: `Masse hérissée de pointes capable de percer et écraser. Arme simple d’emploi, brutale au contact.` },
      warPick: { name: `Pic de guerre`, description: `Pointe martiale conçue pour percer les protections lourdes. Précise et redoutable contre les armures.` },
      pike: { name: `Pique`, description: `Très longue arme d’hast, dominante à distance de mêlée. Excellente en rangs serrés et en défense.` },
      rapier: { name: `Rapière`, description: `Lame fine de duel privilégiant précision et dextérité. Arme idéale pour les combattants à Finesse.` },
      trident: { name: `Trident`, description: `Arme à trois pointes efficace en mêlée comme au lancer. Souvent associée aux marins et gardes côtiers.` },
      handCrossbow: { name: `Arbalète de poing`, description: `Arbalète compacte, facile à utiliser à courte portée. Bonne option de tir discret en combat rapproché.` },
      heavyCrossbow: { name: `Arbalète lourde`, description: `Arme de tir puissante et précise, conçue pour percer à longue portée. Rechargement lent mais impact élevé.` },
      longbow: { name: `Arc long`, description: `Arc de guerre à grande portée, excellent pour le tir soutenu. Demande de la force et de l’entraînement.` },
      musket: { name: `Mousquet`, description: `Arme à feu longue offrant de gros dégâts par tir. Précise à distance, mais contrainte par le rechargement.` },
      pistol: { name: `Pistolet`, description: `Arme à feu compacte pour engagements rapprochés. Dégâts élevés sur un tir bref, cadence limitée.` },
      blowgun: { name: `Sarbacane`, description: `Tube de tir silencieux pour dards légers. Très discret, souvent utilisé pour harcèlement ou toxines.` },
    },
    ARMORS: {
      padded: { name: `Armure matelassée`, description: `Protection légère en tissu rembourré. Accessible et discrète, mais moins résistante que les armures plus lourdes.` },
      leather: { name: `Armure de cuir`, description: `Armure légère souple offrant une bonne mobilité. Très répandue chez les éclaireurs et aventuriers.` },
      studdedLeather: { name: `Armure de cuir clouté`, description: `Cuir renforcé de rivets pour une meilleure protection légère. Bon compromis entre défense et agilité.` },
      hideArmor: { name: `Armure de peaux`, description: `Armure intermédiaire faite de peaux épaisses. Robuste et prisée dans les cultures proches de la nature.` },
      chainShirt: { name: `Chemise de mailles`, description: `Haubert court de mailles porté sous des couches de vêtement. Offre une défense intermédiaire avec une mobilité correcte.` },
      scaleMail: { name: `Armure d'écailles`, description: `Armure intermédiaire composée de plaques en écailles superposées. Bonne protection, au prix d’une discrétion réduite.` },
      breastplate: { name: `Cuirasse`, description: `Plastron rigide protégeant le torse sans couverture complète. Défense solide tout en gardant de la liberté de mouvement.` },
      halfPlate: { name: `Demi-plate`, description: `Armure intermédiaire lourde combinant plaques et protections secondaires. Très protectrice, mais plus encombrante.` },
      ringMail: { name: `Broigne`, description: `Armure lourde formée d’anneaux fixés sur du cuir. Protection correcte, mais moins performante que les mailles complètes.` },
      chainMail: { name: `Cotte de mailles`, description: `Armure lourde en mailles offrant une excellente défense. Nécessite entraînement et force pour être portée efficacement.` },
      splint: { name: `Clibanion`, description: `Armure lourde à bandes métalliques renforcées. Très résistante en première ligne, mais peu discrète.` },
      plate: { name: `Harnois`, description: `Armure lourde de plaques complètes, sommet de la protection martiale. Très coûteuse, mais redoutable en combat direct.` },
    },
    SHIELDS: {
      shield: { name: `Bouclier`, description: `Équipement défensif manié en main secondaire pour améliorer la classe d’armure. Standard chez de nombreux combattants de mêlée.` },
    },
    TOOLS: {
      alchemistsSupplies: { name: `Matériel d'Alchemiste`, usage: `Identifier une substance (DD 15), allumer un feu (DD 15).`, },
      brewersSupplies: { name: `Matériel de brasseur`, usage: `Détecter qu'une boisson est empoisonnée (DD 15), identifier un alcool (DD 10).`, },
      calligraphersSupplies: { name: `Matériel de calligraphe`, usage: `Écrire des textes avec des fioritures impressionnantes qui les prémunissent contre la contrefaçon (DD 15).`, },
      carpentersTools: { name: `Outils de charpentier`, usage: `Sceller ou forcer une porte ou un contenant (DD 20).`, },
      cartographersToolTools: { name: `Outils de cartographe`, usage: `Cartographier une petite région (DD 15).`, },
      cobblersTools: { name: `Outils cordonnier`, usage: `Modifier des chaussures afin d'octroyer un Avantage au prochain jet de Dextérité (Acrobaties) de leur porteur (DD 10).`, },
      cooksTools: { name: `Ustensiles de cuisinier`, usage: `Améliorer la saveur des aliments (DD 10), détecter si un plat est avarié ou empoisonné (DD 15).`, },
      glassblowersTools: { name: `Outils de souffleur de verre`, usage: `Déterminer ce qu'a contenu un objet en verre lors des dernières 24 heures (DD 15).`, },
      jewelersTools: { name: `Outils joaillier`, usage: `Déterminer la valeur d'une gemme (DD 15).`, },
      leatherworkersTools: { name: `Outils de tanneur`, usage: `Ajouter un motif à un objet en cuir (DD 10).`, },
      masonsTools: { name: `Outils de maçon`, usage: `Ciseler un symbole ou creuser un trou dans la pierre (DD 10).`, },
      paintersTools: { name: `Matériel de peintre`, usage: `Produire une image ressemblante de quelque chose que vous avez vu (DD 10).`, },
      pottersTools: { name: `Outils de potier`, usage: `Déterminer ce qu'a contenu un objet en céramique lors des dernières 24 heures (DD 15).`, },
      smithsTools: { name: `Outils de forgeron`, usage: `Forcer une porte ou un contenant (DD 20).`, },
      tinkersTools: { name: `Outils de bricoleur`, usage: `Assembler un objet de taille TP composé de ferraille, qui se désagrège au bout de 1 minute (DD 20).`, },
      weaversTools: { name: `Outils de tisserand`, usage: `Raccommoder une déchirure dans un vêtement (DD 10), coudre un motif de taille TP (DD 10).`, },
      woodcarversTools: { name: `Outils de menuisier`, usage: `Sculpter un motif dans le bois (DD 10).`, },

      disguiseKit: { name: `Accessoires de déguisement`, usage: `Appliquer du maquillage (DD 10).`, },
      forgeryKit: { name: `Matériel de contrefaçon`, usage: `Imiter 10 mots ou moins de l'écriture d'autrui (DD 15), reproduire un cachet de cire (DD 20).`, },
      gamingSet: {
        name: `Boîte de jeux`, usage: `Déterminer si quelqu'un triche (DD 10), gagner la partie (DD 20).`,
        variants: {
          dice: 'Dés',
          dragonChess: 'Échecs draconiques',
          playingCards: 'Cartes à jouer',
          threeDragonAnte: 'Jeu des dragons',
        }
      },
      herbalismKit: { name: `Matériel d'herboriste`, usage: `Identifier une plante (DD 10).`, },
      bagpipes: { name: `Cornemuse`, usage: `Jouer un air connu (DD 10), improviser une chanson (DD 15).`, },
      drum: { name: `Tambour`, usage: `Jouer un air connu (DD 10), improviser une chanson (DD 15).`, },
      dulcimer: { name: `Tympanon`, usage: `Jouer un air connu (DD 10), improviser une chanson (DD 15).`, },
      flute: { name: `Flûte`, usage: `Jouer un air connu (DD 10), improviser une chanson (DD 15).`, },
      horn: { name: `Cor`, usage: `Jouer un air connu (DD 10), improviser une chanson (DD 15).`, },
      lute: { name: `Luth`, usage: `Jouer un air connu (DD 10), improviser une chanson (DD 15).`, },
      lyre: { name: `Lyre`, usage: `Jouer un air connu (DD 10), improviser une chanson (DD 15).`, },
      panFlute: { name: `Flûte de Pan`, usage: `Jouer un air connu (DD 10), improviser une chanson (DD 15).`, },
      shawm: { name: `Chalemie`, usage: `Jouer un air connu (DD 10), improviser une chanson (DD 15).`, },
      viol: { name: `Viole`, usage: `Jouer un air connu (DD 10), improviser une chanson (DD 15).`, },
      navigatorsTools: { name: `Instruments de navigateur`, usage: `Tracer un cap (DD 10), déterminer sa position en observant les étoiles (DD 15).`, },
      poisonersKit: { name: `Matériel d'empoisonneur'`, usage: `Déterminer qu'un objet est empoisonné (DD 10).`, },
      thievesTools: { name: `Outils de voleur`, usage: `Crocheter une serrure (DD 15), désamorcer un piège (DD 15).`, },
    },
    GEARS,
    MAGIC_ITEMS: {
      cloakOfProtection: { name: `Cape de protection`, description: `Objet magique (peu commun), nécessite harmonisation. Tant que vous la portez, vous gagnez un bonus de +1 à la CA et aux jets de sauvegarde.` }
    }
  },
}
