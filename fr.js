const fr = {
  charName: {
    label: 'Nom du personnage',
  },
  origins: {
    label: 'Origine',
  },
  classes: {
    label: 'Classe',
    select: {
      chooseOne: 'Choisir une classe',
    },
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
    trainings: {
      title: 'Entraînements & Maîtrises',
      armor: {
        title: 'Armures',
        light: 'Légères',
        medium: 'Intermed.',
        heavy: 'Lourdes',
        shields: 'Boucliers',
      },
      weapon: {
        title: 'Armes',
      },
      tool: {
        title: 'Outils',
      }
    },
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
  'class-features': {
    title: 'Capacités de classe',
  },
  species: {
    label: 'Race',
    title: `Traits d'espèce`,
  },
  statics: {
    origins: {
      acolyte: 'Acolyte',
      artisan: 'Artisan',
      charlatan: 'Charlatan',
      criminal: 'Criminel',
      entertainer: 'Artiste',
      farmer: 'Fermier',
      guard: 'Garde',
      guide: 'Guide',
      hermit: 'Ermite',
      merchant: 'Marchand',
      noble: 'Noble',
      sage: 'Sage',
      sailor: 'Marin',
      scribe: 'Scribe',
      soldier: 'Soldat',
      wayfarer: 'Voyageur',
    },
    skills: {
      'acrobatics': 'Acrobaties', // Rester debout lorsque l'équilibre ou accomplir un exercice acrobatique
      'animalHandling': 'Dressage', // Apaiser ou dresser un animal, ou lui faire adopter un certain comportement
      'arcana': 'Arcanes', // Se souvenir de détails concernant des sorts, des objets magiques ou les plans d'existence
      'athletics': 'Athlétisme', // Sauter plus loin que la normale, garder la tête hors de l'eau des flots violents ou briser quelque chose
      'deception': 'Tromperie', // Mentir de manière convaincante ou se déguiser sans éveiller les soupçons
      'history': 'Histoire',
      'insight': 'Perspicacité',
      'intimidation': 'Intimidation',
      'investigation': 'Investigation',
      'medicine': 'Médecine',
      'nature': 'Nature',
      'perception': 'Perception',
      'performance': 'Représentation',
      'persuasion': 'Persuasion',
      'religion': 'Religion',
      'sleightOfHand': 'Escamotage',
      'stealth': 'Discrétion',
      'survival': 'Survie',
    },
    classes: {
      barbarian: 'Barbare',
      bard: 'Barde',
      cleric: 'Clerc',
      druid: 'Druide',
      fighter: 'Guerrier',
      monk: 'Moine',
      paladin: 'Paladin',
      ranger: 'Rôdeur',
      rogue: 'Roublard',
      sorcerer: 'Ensorceleur',
      warlock: 'Occultiste',
      wizard: 'Magicien',
    },
    'class-features': {
      monk: {
        martialArts: {
          name: "Arts martiaux", description: `
Votre maîtrise des arts martiaux vous permet de maîtriser des styles de combats axés sur vos attaque à mains nues et vos armes de Moine, à savoir:
* Les armes courantes de corps à corps
* Les armes de guerres dotées de la propriété légères
Tant que vous combattez à mains nues ou avec des armes de Moine et que vous ne portez ni armure ni bouclier, vous recevez les bénéfices suivants.

**Attaque à mains nues supplémentaires.** Vous pouvez effectuer une attaque à mains nues par une action Bonus.

**Dé d'Arts martiaux.** Vous pouvez lancer 1d6 à la place des dégâts normaux de votre attaque à mains nues et de vos ames de Moine. Ce dé évolue à mesure que vous gagnez des niveaux de Moine, comme indiqué dans la colonne Arts Martiaux de la table Aptitudes du Moine.

**Attaques lestes.** Vous pouvez appliquer votre modificateur de Dextérité au lieu de celui de Force pour les jets d'attaque et de dégâts si vous attaquez à mains nues ou avec des armes de Moine. De plus, lorsque vous recourez à l'option Bousculade ou Lutte de votre attaque à mains nues, vous pouvez appliquer votre modificateur de Dextérité au lieu de celui de Force pour en déterminer le DD de sauvegarde.`
        },
        unarmoredDefense: {
          name: "Défense sans armure", description: "Tant que vous ne portez pas d’armure, votre classe d’armure de base est égale à 10 + vos modificateurs de Dextérité et de Sagesse."
        },
        monksFocus: {
          name: 'Credo du moine', description: `
Votre disicpline et votre formation martiale vous permettent de puiser dans la source d'énergie extraordinaire qui est en vous. Cette énergie est représentée par les points de Credo. Votre niveau de Moine détermine la nombre de points dont vous disposez, comme indiqué dans la colonnne Points de Credo de la table Aptitudes du Moine.

Vous pouvez dépenser ces points pour améliorer ou alimenter certaines aptitudes de Moine. Vous débutez en connaissant trois de ces aptitudes : Déluge de coups, Patience défensive et Porté par le vent, détaillées chacune ci-après.

Lorsque vous dépensez un point de Credo, il n'est plus disponible jusqu'à ce que vous terminiez un Repos court ou long, à l'issue duquel vous récupérez tous vos points dépensés.

Certaines aptitudes basées sur les points de Credo imposent un jet de sauvegarde à votre cible. Le DD de sauvegarde est égal à 8 plus votre modificateur de Sagesse et votre bonus de maîtrise.

**Déluge de coups.** Vous pouvez dépenser 1 point de Credo pour effectuer deux attaques à mains nues au prix d'une action Bonus.

**Patience défensive.** Vous pouvez entreprendre l'action Désengagement par une action Bonus. Vous avez aussi la possibilité, par une action Bonus et la dépense de 1 point de Credo, d'entreprendre à la fois l'action Désengagement et l'action Esquive.

**Porté par le vent.** Vous pouvez entreprendre l'action Pointe par une action Bonus. Vous avez aussi la possibilité, par une action Bonus et la dépense de 1 point de Credo, d'entreprendre à la fois l'action Désengagement et l'action Pointe, et de doubler votre distance de saut pour ce tour.`,
        },
        unarmoredMovement: {
          name: 'Déplacement sans armure', description: `
Votre Vitesse augmente de 3 m tant que vous ne portez ni armure ni bouclier. Ce bonus évolue à mesure que vous gagnez des niveaux de Moine, comme indiqué dans la table Aptitudes du Moine.`
        },
        uncannyMetabolism: {
          name: 'Métabolisme surnaturel', description: `
Lorsque vous jouez l'initiative, vous pouvez récupérer tous vos points de Credo dépensés. Ce faisant, lancez votre dé d'Arts martiaux et récupérez autant de points de vie que votre niveau de Moine plus le résultat du dé. Une fois que vous avez utilisé cette aptitude, vous devez terminer un Repos long pour pouvoir y recourir de nouveau.`,
        },
        deflectAttacks: {
          name: `Déviation d'assault`, description: `
Lorsqu'un jet d'attaque vous touche et que ses dégâts incluent des dégâts contondants, perforants ou tranchants, vous pouvez jouer une Réaction pour réduire contre vous les dégâts totaux de l'attaque. La réduction est égale à 1d10 plus votre modificateur de Dextérité et votre niveau de Moine.

Si vous réduisez ainsi les dégâts à 0, vous pouvez dépenser 1 point de Credo pour dévier une partie de l'impact à votre guise. Dans ce cas, choisissez une créature que vous voyez dans un rayon de 1,50 m si l'attaque était de corps à corps, ou une créature que vous voyez dans un rayon de 18 m et qui ne bénéfie pas d'un Abri total si l'attaque était à distance.

Cette créature doit réussir un jet de sauvegarde de Dextérité sous peine de subir des dégâts égaux à deux jets de votre dé d'Arts martiaux plus votre modificateur de Dextérité. Les dégâts sont du même type que ceux infligés par l'attaque.`,
        },
        monkSubClass: {
          name: `Sous-classe de Moine`, description: `
Vous recevez la sous-classe de Moine de votre choix. Les sous-classes Credo des Éléments, Credo de la Miséricorde, Credo de l'Ombre et Credo de la Paume sont détaillées après la description de cette classe. Une sous-classe est une spécialisation qui vous octroie des aptitudes à certains niveaux de Moine. Pour le reste de votre carrière, vous bénéficiez de chacune des aptitudes de la sous-classe choisie, à concurrence de votre niveau actuel de Moine.`,
        },
        abilityScoreImprovement: {
          name: `Amélioration de caractéristique`, description: `
Vous recevez le don Amélioration de caractéristique (cf. chapitre 5) ou un autre don de votre choix pour lequel vous remplissez les conditions. Vous recevez de nouveau cette aptitude aux niveaux de Moine, 8, 12 et 16`,
        },
        slowFall: {
          name: `Chute ralentie`, description: `
Vous pouvez jouer une Réaction pour réduire les dégâts de chute que vous subissez d'un montant égal au quintuple de votre niveau de Moine`,
        },
        extraAttack: {
          name: `Attaque supplémentaire`, description: `
Vous pouvez attaquer deux fois au lieu d'un lorsque vous entreprenez l'action Attaque à votre tour.`,
        },
        stunningStrike: {
          name: `Frappe étourdissante`, description: `
Une fois par tour, lorsque vous touchez une créature avec une arme de Moine ou à mains nues, vous pouvez dépenser 1 point de Credo pour tenter de placer une frappe étourdissante. La cible effectue un jet de sauvegarde de Constitution. En cas d'échec, la cible subit l'état Étourdi jusqu'au début de vitre tour suivant. En cas de réussite, la Vitesse de la cible est réduite de moitié jusqu'au début de votre tour suivant et le prochain jet d'attaque contre la cible dans interalle a l'Avantage.`,
        },
        empoweredStrikes: {
          name: `Frappes renforcées`, description: `
Chaque fois que vous infligez des dégâts avec une attaque à mains nues, ceux-ci sont à votre convenance des dégâts de force ou du type normal de l'attaque.`,
        },
        evasion: {
          name: `Esquive totale`, description: `
Quand vous êtes soumis à un effet qui vous permet d'effectuer un jet de sauvegarde de Dextérité pour réduire les dégâts de moitié, vous ne subissez aucun dégât en cas de sauvegarde réussie, et seulement la moitié en cas d'échec.
          
Vous ne bénéficiez pas de cette aptitude si vous subissez l'état Neutralisé.`,
        },
        acrobaticMovement: {
          name: `Décplacement acrobatique`, description: `
Tant que vous ne portez pas d'armure ni de bouclier, vous recevez la capacité de vous déplacerà votre tour le long de surfaces et à travers des liquides sans tomber.`,
        },
        heightenedFocus: {
          name: `Credo accru`, description: `
Déluge de coups, Patience défensive et Porté par le vent reçoivent respectivement les bénéfices suivans.
          
**Déluge de coups.** Vous pouvez dépenser 1 point de Credo pour recourir à Déluge de coups et effectuer trois attaques à mains nues au lieu de deux.

**Patience défensive.** Lorsque vous dépensez un point de Credo pour recourir à Patience défensive, vous recevez des points de vie temporaires éégaux à deux jets de votre dé d'Arts martiaux.

**Portée par le vent.** Lorsque vous dépensez un point de Credo pour recourir à Porté par le vent, vous pouvez choisir une créature consentante dans un rayon 1,50 m, de taille G ou inférieure. Vous déplacez la créature avec vous jusqu'à la fin de votre tour. Le déplacement de la créature ne provoque pas d'attaques d'Opportunité.`,
        },
        selfRestoration: {
          name: `Autosubsistance`, description: `
Par la seule force de l'esprit, vous pouvez vous débarrasser de l'un des états suivants à la fin de chacun de vos tours : Charmé, Effrayé ou Empoisonné.
          
De plus, vous passer de nourriture et d'eau ne vous impose pas de niveaux d'Épuisement.`,
        },
        deflectEnergy: {
          name: `Parade énergétique`, description: `
Vous pouvez désormai recourir à l'aptitude Déviation d'assaut contre les attaques qui infligent tout type de dégâts, et non plus seulement contondants, perforants ou tranchants.`,
        },
        disciplinedSurvivor: {
          name: `Survivant discipliné`, description: `
Votre discipline physique et mentale vous octroie la maîtrise de tous les jets de sauvegarde.
          
De plus, chaque fois que vous effectuez un jet de sauvegarde et ratez, vous pouvez dépenser 1 point de Credo pour le rejouer et conserver le nouveau jet.`,
        },
        perfectFocus: {
          name: `Credo parachevé`, description: `
Lorsque vous jouez l'Initiative, que vous ne recourez pas à Métabolisme surnaturel et qu'il vous reste moins de 4 points de Credo, vous en récupérez jusqu'à en avoir 4.`,
        },
        superiorDefense: {
          name: `Défense supérieure`, description: `
Au début de votre tour, vous pouvez dépenser 3 points de Credo pour consolider votre corps pendant 1 minute (l'effet prend fin si vous subissez l'état Neutralisé). Durant cet intervalle, vous bénéficiez de la Résisance à tous les dégâts hormis ceux de force.`,
        },
        epicBoon: {
          name: `Faveur épique`, description: `
Vous recevez un don de Faveur épiqque (cf. chapitre 5) ou un autre don de votre choix pour lequel vous remplissez les conditions/ Faveur d'attaque irrésistible est recommandé.`,
        },
        bodyAndMind: {
          name: `Esprit et corps`, description: `
Le développement de votre corps et de votre esprit atteint de nouveaux sommets. Vos valeurs de Dextérité et Sagesse augmentent de 4, jusqu'à un maximum de 25.`,
        },
        openHandTechnique: {
          name: 'Technique de la paume', description: `
Chaque fois que vous touchez une créature avec l'une des attaques octroyées par Déluge de coups, vous pouvez imposer l'un des effets suivants à cette cible.

**Bourrade.** La cible doit réussir un jet de sauvegarde de Force sous peine d'être repoussée de vous d'un maximum de 4,50 m.

**Hésitation.** La cible ne peut pas effectuer d'attaque d'Opportunité jusqu'au début de son tour suivant.

**Renversement.** La cible doit réussir un jet de sauvegarde de Dextérité sous peine de subit l'état À terre.`,
        },
        wholenessOfBody: {
          name: 'Plénitude physique', description: `
Vous recevez l'aptitude de vous soigner. Par une action Bonus, vous pouvez lancer votre dé d'Arts martiaux. Vous récupérez autant de points de vie que le nombre obtenu plus votre modificateur de Sagesse (minimum de 1 poit de vie récuperé).

Vous pouvez recouir à cette aptitude autant de fois que votre modificateur de Sagesse (minimum d'une fois) et vous récupérez ce quota en terminant un Repos long.`,
        },
        fleetStep: {
          name: 'Foulée preste', description: `
Lorsque vous entreprenez une action Bonus autre que Porté par le vent, vous pouvez aussi recourir à Porté par le vent aussitôt après cette action Bonus.`,
        },
        quiveringPalm: {
          name: 'Paume vibratoire', description: `
Vous apprenez à produire des vibrations potentiellement mortelles dans le corps d'autrui. Lorsque vous touchez une créature avec une attaque à mains nues, vous pouvez dépenser 4 points de Credo pour déclencher ces vibrations imperceptibles, qui persistent autant de jours que votre niveau de Moine. Ces vibrations sont inoffensives jusqu'à ce que vous consacriez une action à y mettre fin. Par ailleurs, lorsque vous entreprenez l'action Attaque à votre tour, vous pouvez renoncer à l'une des attaques pour mettre un terme aux vibrations. Pour ce faire, vous et la cible devez vous trouver sur le même plan d'existence. Quand vous mettez fin aux vibrations, la cible effectue un jet de sauvegarde de Constitution, et subit 10d12 dégâts de force en cas d'échec, la moitié en cas de réussite.

Vous ne pouvez avoir qu'une créature à la fois sous l'effet de cette aptitude. Vous pouvez aussi mettre fin aux vibrations de façon inoffensive (pas d'action requise).`,
        },
      },
    },
    ability: {
      strength: 'Force',
      dexterity: 'Dextérité',
      constitution: 'Constitution',
      intelligence: 'Intelligence',
      wisdom: 'Sagesse',
      charisma: 'Charisme',
    },
    species: {
      aasimar: 'Aasimar',
      dragonborn: 'Drakéide',
      'dragonborn-black': 'Drakéide Noir',
      'dragonborn-blue': 'Drakéide Bleu',
      'dragonborn-brass': 'Drakéide de Airain',
      'dragonborn-bronze': 'Drakéide de Bronze',
      'dragonborn-copper': 'Drakéide de Cuivre',
      'dragonborn-gold': `Drakéide d'Or`,
      'dragonborn-green': 'Drakéide Vert',
      'dragonborn-red': 'Drakéide Rouge',
      'dragonborn-silver': `Drakéide d'Argent`,
      'dragonborn-white': 'Drakéide Blanc',
      dwarf: 'Nain',
      elf: 'Elfe',
      'elf-drow': 'Drow',
      'elf-high': 'Haut-Elfe',
      'elf-wood': 'Elfe sylvestre',
      gnome: 'Gnome',
      'gnome-forest': `Gnome des Forêts`,
      'gnome-rock': `Gnome des Roches`,
      goliath: 'Goliath',
      'goliath-cloud': 'Géant des Nuages',
      'goliath-fire': 'Géant du Feu',
      'goliath-frost': 'Géant du Givre',
      'goliath-hill': 'Géant des Collines',
      'goliath-stone': 'Géant des Pierres',
      'goliath-storm': 'Géant des Tempêtes',
      halfling: 'Halfelin',
      human: 'Humain',
      orc: 'Orc',
      tiefling: 'Tieffelin',
      'tiefling-abyssal': 'Tieffelin Abyssal',
      'tiefling-chtonic': 'Tieffelin Chthonien',
      'tiefling-infernal': 'Tieffelin Infernal',
    },
    traits: {
      darkvision: `Vision dans le noir`,
      celestialResistance: `Résistance céleste`,
      healingHands: `Mains guérisseuses`,
      lightBearer: `Porte-lumière`,
      celestialRevelation: `Révélation céleste`,
      draconicAncestry: `Ascendance draconique`,
      breathWeapon: `Souffle`,
      damageResistance: `Résistance aux dégâts`,
      draconicFlight: `Vol draconique`,
      elvenLineage: `Lignage elfique`,
      feyAncestry: `Ascendance féerique`,
      keenSenses: `Sens aiguisés`,
      trance: `Transe`,
      gnomishCunning: `Ruse gnome`,
      gnomishLineage: `Lignage gnome`,
      giantAncestry: `Ascendance gigante`,
      largeForm: `Forme de géant`,
      powerfulBuild: `Forte carrure`,
      brave: `Brave`,
      halflingNimbleness: `Agilité halfeline`,
      lucky: `Chance`,
      naturallyStealthy: `Discrétion naturelle`,
      resourceful: `Ingénieux`,
      skillFul: `Compétent`,
      versatility: `Polyvalent`,
      dwarvenResilience: `Résistance naine`,
      dwarvenToughness: `Tenicaté naine`,
      stonecunning: `Connaissance de la pierres`,
      adrenalineRush: `Poussée d'adrénaline`,
      relentlessEndurance: `Acharnement`,
      fiendishLegacy: `Héritage fiélon`,
      otherworldlyPresence: `Présence d'outre-monde`,
    },
    weaponCategories: {
      WEAPON_CATEGORY: {
        simpleMelee: 'Armes courantes de corps à corps',
        simpleRanged: 'Armes courantes à distance',
        martialMelee: 'Armes de guerre de corps à corps',
        martialRanged: 'Armes de guerre à distance',
      },
    },
    weaponNames: {
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
    armorClasses: {
      light: 'Armures légères',
      medium: 'Armures intermédiaires',
      heavy: 'Armures lourdes',
      shield: 'Boucliers',
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
    gears: {
      acid: {
        name: `Acide`,
        description: `Lorsque vous effectuez l’action Attaque, vous pouvez remplacer l’une de vos attaques par le jet d’une fiole d’acide. Ciblez une créature ou un objet que vous voyez dans un rayon de 6 m. La cible doit réussir un jet de sauvegarde de Dextérité (DD égal à 8 + votre modificateur de Dextérité + votre bonus de maîtrise) sous peine de subir 2d6 dégâts d’acide.`,
      },
      antitoxin: {
        name: `Antidote`,
        description: `Par une action Bonus, vous pouvez boire le contenu d’une fiole d’antidote pour recevoir un Avantage aux jets de sauvegarde visant à éviter l’état Empoisonné pendant 1 heure ou à y mettre un terme.`
      },
      clothesFine: {
        name: `Beaux habits`,
        description: `Les beaux habits sont fabriqués dans des tissus coûteux et dotés d’ornements élaborés. Certains événements et lieux n’acceptent que les personnes portant de tels vêtements.`
      },
      ramPortable: {
        name: `Bélier portable`,
        description: `Vous pouvez utiliser un bélier portable pour enfoncer les portes. Vous recevez alors un bonus de +4 au jet de Force associé. Si un autre personnage vous aide à utiliser le bélier, vous recevez un Avantage à ce jet.`
      },
      ballBearings: {
        name: `Billes`,
        description: `Par une action Utilisation, vous pouvez déverser les billes de leur sacoche. Elles se répandent sur une surface plane de 3 m x 3 m, à une distance maximale de 3 m. Une créature qui traverse cette zone pour la première fois d’un tour doit réussir un jet de sauvegarde de Dextérité DD 10 sous peine de subir l’état À terre. 10 minutes sont nécessaires pour récupérer les billes.`
      },
      tinderbox: {
        name: `Boîte à amadou`,
        description: `Ce petit conteneur renferme silex, pierre à briquet et amorce (généralement un morceau de tissu imbibé d’huile), soit de quoi allumer un feu. L’utiliser pour allumer une bougie, une lampe, une lanterne ou une torche, ou tout autre objet dont le combustible est exposé, s’effectue par une action Bonus. Produire un autre type de flammes demande 1 minute.`
      },
      candle: {
        name: `Bougie`,
        description: `Après allumage et pendant 1 heure, une bougie produit une Lumière vive sur un rayon de 1,50 m et une Lumière faible sur 1,50 m de plus.`
      },
      bottleGlass: {
        name: `Bouteille, verre`,
        description: `Une bouteille en verre peut contenir jusqu'à 75 cl.`
      },
      lock: {
        name: `Cadenas`,
        description: `Un cadenas est livré avec une clef. Sans cette clef, une créature peut crocheter le cadenas à condition de réussir un jet de Dextérité (Escamotage) DD 15 avec des outils de voleur.`
      },
      quiver: {
        name: `Carquois`,
        description: `Un carquois peut contenir jusqu'à 20 flèches.`
      },
      map: {
        name: `Carte`,
        description: `Si vous consultez une carte précise, vous recevez un bonus de +5 aux jets de Sagesse (Survie) effectués pour trouver votre chemin dans le lieu représenté sur la carte.`
      },
      chain: {
        name: `Chaîne`,
        description: `Par une action Utilisation, vous enroulez une chaîne autour d’une créature non consentante dans un rayon de 1,50 m subissant l’état Agrippé, Entravé ou Neutralisé pour peu que vous réussissiez un jet de Force (Athlétisme) DD 13. Si la créature a les jambes enchaînées, elle subit l’état Entravé jusqu'à ce qu’elle se libère. Se libérer de la chaîne nécessite que la créature réussisse un jet de Dextérité (Acrobaties) DD 18 au prix d’une action. Briser cette chaîne nécessite de réussir un jet de Force (Athlétisme) DD 20 au prix d’une action.`
      },
      caltrops: {
        name: `Chausse-trappes`,
        description: `Par une action Utilisation, vous pouvez répandre les chausse-trappes depuis leur sac pour couvrir une zone de 1,50 m x 1,50 m à une distance maximale de 1,50 m. Une créature qui traverse cette zone pour la première fois d’un tour doit réussir un jet de sauvegarde de Dextérité DD 15 sous peine de subir 1 dégât perforant et voir sa vitesse réduite à 0 jusqu'au début de son tour suivant. 10 minutes sont nécessaires pour récupérer les chausse-trappes.`
      },
      bell: {
        name: `Cloche`,
        description: `Actionnée par une action Utilisation, une cloche produit un son audible à 18 m.`
      },
      chest: {
        name: `Coffre`,
        description: `Un coffre contient jusqu'à 0,36 m3.`
      },
      rope: {
        name: `Corde`,
        description: `Par une action Utilisation, vous pouvez nouer la corde à condition de réussir un jet de Dextérité (Escamotage) DD 10. Rompre la corde nécessite de réussir un jet de Force (Athlétisme) DD 20. Attacher une créature non consentante avec la corde nécessite que celle-ci subisse l’état Agrippé, Entravé ou Neutralisé. Si la créature a les jambes attachées, elle subit l’état Entravé jusqu'à ce qu’elle se libère. Se libérer de la corde nécessite que la créature réussisse un jet de Dextérité (Acrobaties) DD 15 au prix d’une action.`
      },
      costume: {
        name: `Costume`,
        description: `Vêtu d’un costume, vous avez l’Avantage aux jets de caractéristique visant à vous faire passer pour la personne ou le type de personne qu’il représente.`
      },
      blanket: {
        name: `Couverture`,
        description: `Enveloppé dans une couverture, vous avez l’Avantage aux jets de sauvegarde contre le froid extrême (cf. « Boîte à outils ludique »).`
      },
      jug: {
        name: `Cruche`,
        description: `Une cruche contient jusqu'à 4 litres de liquide.`
      },
      holyWater: {
        name: `Eau bénite`,
        description: `Lorsque vous effectuez l’action Attaque, vous pouvez remplacer l’une de vos attaques par le jet d’une flasque d’eau bénite. Ciblez une créature que vous voyez dans un rayon de 6 m. La cible doit réussir un jet de sauvegarde de Dextérité (DD égal à 8 + votre modificateur de Dextérité + votre bonus de maîtrise) sous peine de subir 2d8 dégâts radiants si elle est de type Fiélon ou Mort-vivant.`
      },
      ladder: {
        name: `Échelle`,
        description: `Une échelle mesure 3 m de haut. Grimper dessus permet de monter ou descendre.`
      },
      ink: {
        name: `Encre`,
        description: `Conditionnée en bouteille de 30 ml, cette quantité d’encre permet de noircir environ 500 pages.`
      },
      caseMapOrScroll: {
        name: `Étui à cartes ou à parchemins`,
        description: `L’étui à cartes ou à parchemins peut contenir 10 feuilles de papier ou 5 feuilles de parchemin.`
      },
      caseCrossbowBolt: {
        name: `Étui pour carreaux d’arbalète`,
        description: `Cet étui peut contenir 20 carreaux d’arbalète.`
      },
      alchemistsFire: {
        name: `Feu grégeois`,
        description: `Lorsque vous effectuez l’action Attaque, vous pouvez remplacer l’une de vos attaques par le jet d’une flasque de feu grégeois. Ciblez une créature ou un objet que vous voyez dans un rayon de 6 m. La cible doit réussir un jet de sauvegarde de Dextérité (DD égal à 8 + votre modificateur de Dextérité + votre bonus de maîtrise) sous peine de subir 1d4 dégâts de feu et de prendre feu.`
      },
      string: {
        name: `Ficelle`,
        description: `Cette ficelle mesure 3 m de long. Vous pouvez y faire un noeud par une action Utilisation.`
      },
      net: {
        name: `Filet`,
        description: `Lorsque vous effectuez l’action Attaque, vous pouvez remplacer l’une de vos attaques par le lancer d’un filet. Ciblez une créature que vous voyez à une distance maximale de 4,50 m. La cible doit réussir un jet de sauvegarde de Dextérité (DD égal à 8 + votre modificateur de Dextérité + votre bonus de maîtrise) sous peine de subir l’état Entravé jusqu'à sa libération. La cible réussit automatiquement si elle est de taille TG ou supérieure.

Pour être libérée, la cible (ou une créature dans un rayon de 1,50 m d’elle) doit entreprendre une action et effectuer un jet de Force (Athlétisme) DD 10, libérant la créature Entravée en cas de réussite. La destruction du filet (CA 10 ; 5 pv ; Immunité aux dégâts contondants, psychiques et de poison) libère également la cible, mettant un terme à l’effet Entravé.`
      },
      vial: {
        name: `Fiole`,
        description: `Une fiole contient 120 ml de liquide.`
      },
      flask: {
        name: `Flasque`,
        description: `Une flasque contient 0,5 litre de liquide.`
      },
      arcaneFocus: {
        name: 'Focaliseur arcanique',
        description: `Un focaliseur arcanique prend l’une des formes de la table ci-dessous et il est incrusté de pierreries ou sculpté afin de canaliser la magie arcanique. Un personnage Ensorceleur, Magicien ou Occultiste peut se servir d’un tel objet comme focaliseur d’incantation.
Focaliseur 	Poids 	Prix
Baguette 	0,5 kg 	10 po
Bâton (également bâton de combat) 	2 kg 	5 po
Cristal 	0,5 kg 	10 po
Orbe 	1,5 kg 	20 po
Sceptre 	1 kg 	10 po`,
      },
      druidicFocus: {
        name: 'Focaliseur druidique',
        description: `Un focaliseur druidique prend l’une des formes proposées dans la table ci-dessous et il est sculpté, attaché avec un ruban ou peint de façon à canaliser la magie primitive. Un Druide ou un Rôdeur peut se servir d’un tel objet comme focaliseur d’incantation.
Focaliseur 	Poids 	Prix
Baguette d’if 	0,5 kg 	10 po
Bâton en bois (également bâton de combat) 	2 kg 	5 po
Branche de houx 	— 	1 po`,
      },
      grapplingHook: {
        name: `Grappin`,
        description: `Par une action Utilisation, vous lancez le grappin sur une balustrade, un rebord ou une autre prise à une distance maximale de 15 m, et le grappin s’accroche si vous réussissez un jet de Dextérité (Acrobaties) DD 13. Si vous aviez attaché une corde au grappin, vous pouvez y grimper.`
      },
      oil: {
        name: `Huile`,
        description: `Vous pouvez asperger une créature, un objet ou un espace avec de l’huile ou l’utiliser comme combustible, comme détaillé ci-dessous.

Asperger une créature ou un objet. Lorsque vous effectuez l’action Attaque, vous pouvez remplacer l’une de vos attaques par le jet d’une flasque d’huile. Ciblez une créature ou un objet à une distance maximale de 6 m. La cible doit réussir un jet de sauvegarde de Dextérité (DD égal à 8 + votre modificateur de Dextérité + votre bonus de maîtrise) sous peine d’être couverte d’huile. Si elle subit des dégâts de feu avant que l’huile ait séché (ce qui demande 1 minute), la cible subit 5 dégâts de feu supplémentaires, provoqués par l’embrasement de l’huile.

Asperger un espace. Entreprendre l’action Utilisation permet d’étaler le contenu d’une flasque d’huile sur un sol plan et de couvrir une zone de 1,50 m de côté dans un rayon de 1,50 m. Embrasée, l’huile brûle jusqu'à la fin du tour 2 rounds après son allumage (soit pendant 12 secondes) et inflige 5 dégâts de feu à toute créature qui pénètre dans la zone ou y termine son tour. Une même créature ne peut subir ces dégâts qu’une fois par tour.

Combustible. L’huile sert de combustible pour les lampes et les lanternes. Le contenu d’une flasque d’huile embrasée brûle pendant 6 heures dans une lampe ou une lanterne. Cette durée n’est pas nécessairement consécutive ; vous pouvez éteindre l’huile (par une action Utilisation) et la rallumer jusqu’à ce qu’elle ait brûlé pendant un total de 6 heures.`
      },
      lamp: {
        name: `Lampe`,
        description: `Une lampe brûle de l’huile comme combustible et produit une Lumière vive sur un rayon de 4,50 m, ainsi qu’une Lumière faible sur 9 m de plus.`
      },
      lanternHooded: {
        name: `Lanterne à capote`,
        description: `Une lanterne à capote brûle de l’huile comme combustible et produit une Lumière vive sur un rayon de 9 m, ainsi qu’une Lumière faible sur 9 m de plus. Abaisser la capote par une action Bonus permet de réduire l’éclairage à une Lumière faible sur un rayon de 1,50 m, et la relever de rétablir la pleine lumière.`
      },
      lanternBullseye: {
        name: `Lanterne sourde`,
        description: `Une lanterne sourde brûle de l’huile comme combustible et produit une Lumière vive sur un Cône de 18 m, ainsi qu’une Lumière faible sur 18 m de plus.`
      },
      book: {
        name: `Livre`,
        description: `Un livre traite de fiction ou de non-fiction. Si vous consultez un livre de non-fiction précis sur son sujet, vous recevez un bonus de +5 aux jets d’Intelligence (Arcanes, Histoire, Nature ou Religion) que vous effectuez sur ce sujet.`
      },
      spyglass: {
        name: `Longue-vue`,
        description: `Une longue-vue permet de grossir jusqu'à deux fois les objets que vous voyez à distance.`
      },
      magnifyingGlass: {
        name: `Loupe`,
        description: `Une loupe octroie l’Avantage à tout jet de caractéristique visant à inspecter ou estimer la valeur d’un objet très détaillé. Démarrer un feu avec une loupe nécessite une lumière aussi vive que celle du soleil, que la lentille concentre sur de l’amadou, lequel s’enflamme au bout d’environ 5 minutes.`
      },
      climbersKit: {
        name: `Matériel d’escalade`,
        description: `Le matériel d’escalade comprend des crampons de chaussures, des gants, des pitons et un harnais. Par une action Utilisation, vous pouvez recourir au matériel d’escalade pour vous ancrer ; cette précaution prise, vous ne pouvez pas tomber à plus de 7,50 m du point d’ancrage, et vous ne pouvez pas vous en éloigner de plus de 7,50 m sans défaire préalablement l’ancrage par une action Bonus.`
      },
      manacles: {
        name: `Menottes`,
        description: `Par une action Utilisation, vous menottez une créature non consentante de taille P ou de taille M située dans un rayon de 1,50 m et qui subit l’état Agrippé, Entravé ou Neutralisé à condition de réussir un jet de Dextérité (Escamotage) DD 13. Tant qu’elle est menottée, la créature subit le Désavantage aux jets d’attaque, ainsi que l’état Entravé si les menottes sont attachées à une chaîne ou à un crochet fixe. Se libérer des menottes nécessite de réussir un jet de Dextérité (Escamotage) DD 20 au prix d’une action. Les briser nécessite de réussir un jet de Force (Athlétisme) DD 25 au prix d’une action.

Chaque paire de menottes est fournie avec une clef. Sans cette clef, une créature peut crocheter la serrure des menottes à condition de réussir un jet de Dextérité (Escamotage) DD 15 avec des outils de voleur.`
      },
      mirror: {
        name: `Miroir`,
        description: `Ce miroir à main en acier est pratique pour se maquiller, mais aussi pour risquer un oeil au détour d’un angle et réfléchir la lumière en guise de signal.`
      },
      ammunition: {
        name: 'Munitions',
        description: `Les munitions sont nécessaires pour toute arme dotée de la propriété Munitions. Le descriptif de l’arme indique le type de munitions qu’elle utilise. La table ci-dessous répertorie les différents types de munitions et la quantité que vous obtenez lorsque vous en achetez. Figure en outre l’objet généralement utilisé pour ranger chaque type de munitions, qui doit être acheté séparément.
Type 	Quantité 	Rangement 	Poids 	Prix
Balles d’arme à feu 	10 	Sacoche 	1 kg 	3 po
Billes de fronde 	20 	Sacoche 	750 g 	4 pc
Carreaux 	20 	Étui 	750 g 	1 po
Dards 	50 	Sacoche 	0,5 kg 	1 po
Flèches 	20 	Carquois 	0,5 kg 	1 po`
      },
      waterskin: {
        name: `Outre`,
        description: `Une outre contient 2 litres de liquide. Boire insuffisamment d’eau, c’est s’exposer à la déshydratation (cf. « Glossaire de règles »).`
      },
      blockAndTackle: {
        name: `Palan`,
        description: `Un palan vous permet de soulever jusqu'à quatre fois le poids que vous pouvez normalement soulever.`
      },
      basket: {
        name: `Panier`,
        description: `Un panier contient jusqu'à 20 kg pour un volume de 60 litres ou 0,06 m3.`
      },
      paper: {
        name: `Papier`,
        description: `Une feuille de papier peut contenir environ 250 mots écrits à la main.`
      },
      burglarsPack: {
        name: `Paquetage de cambrioleur`,
        description: `Le paquetage de cambrioleur contient les objets suivants : sac à dos, billes, boîte à amadou, 10 bougies, cloche, corde, 7 flasques d’huile, lanterne à capote, outre, pied-de-biche, 5 jours de rations.`
      },
      diplomatsPack: {
        name: `Paquetage de diplomate`,
        description: `Le paquetage de diplomate contient les objets suivants : beaux habits, boîte à amadou, coffre, encre, 2 étuis à cartes et à parchemins, 5 feuilles de papier, 5 feuilles de parchemin, 4 flasques d’huile, lampe, 5 porte-plume, parfum.`
      },
      entertainersPack: {
        name: `Paquetage d’artiste`,
        description: `Le paquetage d’artiste contient les objets suivants : sac à dos, boîte à amadou, cloche, 3 costumes, 8 flasques d’huile, 9 jours de rations, lanterne sourde, miroir, outre, sac de couchage.`
      },
      priestsPack: {
        name: `Paquetage d’ecclésiastique`,
        description: `Le paquetage d’ecclésiastique contient les objets suivants : sac à dos, boîte à amadou, couverture, eau bénite, lampe, 7 jours de rations, robe.`
      },
      scholarsPack: {
        name: `Paquetage d’érudit`,
        description: `Le paquetage d’érudit contient les objets suivants : sac à dos, boîte à amadou, encre, lampe, livre, porte-plume, 10 flasques d’huile, 10 feuilles de parchemin.`
      },
      explorersPack: {
        name: `Paquetage d’explorateur`,
        description: `Le paquetage d’explorateur contient les objets suivants : sac à dos, sac de couchage, boîte à amadou, corde, 2 flasques d’huile, 10 jours de rations, outre, 10 torches.`
      },
      dungeoneersPack: {
        name: `Paquetage d’exploration souterraine`,
        description: `Le paquetage d’exploration souterraine contient les objets suivants : sac à dos, boîte à amadou, chausse-trappes, corde, 2 flasques d’huile, 10 jours de rations, outre, pied-de-biche, 10 torches.`
      },
      parchment: {
        name: `Parchemin`,
        description: `Une feuille de parchemin peut contenir environ 250 mots écrits à la main.`,
      },
      spellScrollLevel1: {
        name: 'Parchemin de sort (1er niveau)',
        description: `Un parchemin de sort (sort mineur) ou parchemin de sort (1er niveau) est un objet magique qui porte la formule d’un sort mineur ou d’un sort du 1er niveau, respectivement, tel que défini par le créateur du parchemin. Si ce sort figure dans votre liste de sorts de classe, vous pouvez lire le parchemin pour en lancer le sort avec son temps d’incantation habituel et sans en fournir les éventuelles composantes matérielles.
    
    Si le sort nécessite un jet de sauvegarde ou un jet d’attaque, le DD de sauvegarde est de 13 et le bonus à l’attaque est de +5. Le parchemin se désintègre lorsque l’incantation est terminée.`
      },
      spellScrollCantrip: {
        name: 'Parchemin de sort (mineur)',
        description: `Un parchemin de sort (sort mineur) ou parchemin de sort (1er niveau) est un objet magique qui porte la formule d’un sort mineur ou d’un sort du 1er niveau, respectivement, tel que défini par le créateur du parchemin. Si ce sort figure dans votre liste de sorts de classe, vous pouvez lire le parchemin pour en lancer le sort avec son temps d’incantation habituel et sans en fournir les éventuelles composantes matérielles.
    
    Si le sort nécessite un jet de sauvegarde ou un jet d’attaque, le DD de sauvegarde est de 13 et le bonus à l’attaque est de +5. Le parchemin se désintègre lorsque l’incantation est terminée.`
      },
      perfume: {
        name: `Parfum`,
        description: `Le parfum est présenté dans un flacon de 120 ml. Pendant 1 heure après vous être appliqué du parfum, vous avez l’Avantage aux jets de Charisme (Persuasion) effectués afin d’influencer un Humanoïde Indifférent dans un rayon de 1,5 m.`
      },
      shovel: {
        name: `Pelle`,
        description: `Au prix de 1 heure d’efforts, une pelle permet de creuser un trou de 1,5 m de côté pour autant de profondeur dans de la terre ou tout matériau similaire.`
      },
      pole: {
        name: `Perche`,
        description: `Une perche mesure 3 m de long. Vous pouvez l’utiliser pour toucher quelque chose à une distance maximale de 3 m. Si vous effectuez un jet de Force (Athlétisme) dans le cadre d’un saut en hauteur ou en longueur, utiliser la perche pour sauter vous octroie l’Avantage à ce jet.`
      },
      crowbar: {
        name: `Pied-de-biche`,
        description: `Le pied-de-biche vous octroie l’Avantage aux jets de Force chaque fois que son effet de levier peut être pris en compte.`
      },
      huntingTrap: {
        name: `Piège à mâchoires`,
        description: `Par une action Utilisation, vous posez un piège à mâchoires, anneau d’acier en dents de scie qui se referme lorsqu'une créature marche sur la plaque de pression centrale. Le piège est ancré par une lourde chaîne à un objet immobile, comme un arbre ou une pointe enfoncée dans le sol. Une créature qui marche sur la plaque doit réussir un jet de sauvegarde de Dextérité DD 13 sous peine de subir 1d4 dégâts perforants et de voir sa Vitesse réduite à 0 jusqu'au début de son tour suivant. Par la suite et jusqu'à ce que la créature se libère du piège, son déplacement est limité par la taille de la chaîne (en règle générale 90 cm de long). Toute créature peut consacrer son action à effectuer un jet de Force (Athlétisme) DD 13 et se libère, ou en extrait une autre créature à portée d’allonge, en cas de réussite. Chaque échec au jet inflige 1 dégât perforant à la créature piégée.`
      },
      spikesIron: {
        name: `Pointes en fer`,
        description: `Les pointes en fer sont vendues par paquets de dix. Par une action Utilisation, vous pouvez recourir à un objet contondant, par exemple un marteau léger, pour enfoncer une pointe dans du bois, de la terre ou tout matériau similaire. Faire ainsi permet de bloquer une porte ou d’attacher une corde ou une chaîne à la pointe.`
      },
      poisonBasic: {
        name: `Poison standard`,
        description: `Par une action Bonus, utiliser une fiole de poison standard vous permet d’enduire une arme ou jusqu'à trois munitions. Une créature qui subit des dégâts perforants ou tranchants de l’arme ou des munitions empoisonnées subit 1d4 dégâts de poison supplémentaires. Une fois appliqué, le poison conserve sa virulence pendant 1 minute ou jusqu'à ce que ces dégâts soient infligés, selon ce qui survient en premier.`
      },
      inkPen: {
        name: `Porte-plume`,
        description: `Combiné à l’encre, le porte-plume permet d’écrire ou de dessiner.`
      },
      potIron: {
        name: `Pot en fer`,
        description: `Un pot en fer contient jusqu'à 4 litres de liquide.`
      },
      potionOfHealing: {
        name: `Potion de guérison`,
        description: `Cette potion est un objet magique. Par une action Bonus, vous pouvez boire une potion de guérison ou l’administrer à une autre créature dans un rayon de 1,50 m. La créature qui boit le liquide magique rouge contenu dans cette fiole récupère 2d4 + 2 points de vie.`
      },
      rations: {
        name: `Rations`,
        description: `Les rations sont composées d’aliments de voyage, viande séchée, fruits secs, biscuits et fruits à coque. Voir à « Malnutrition » dans le « Glossaire de règles » pour les risques liés à l’absence de nourriture.`
      },
      robe: {
        name: `Robe`,
        description: `Une robe a une signification professionnelle ou cérémonielle. Certains événements et lieux n’admettent que les personnes vêtues d’une robe d’une couleur donnée ou arborant certains symboles.`
      },
      sack: {
        name: `Sac`,
        description: `Un sac contient jusqu'à 15 kg pour un volume de 0,03 m3.`
      },
      backpack: {
        name: `Sac à dos`,
        description: `Un sac à dos contient jusqu'à 15 kg pour un volume de 30 litres ou 0,03 m3. Il peut également servir de sacoche de selle.`
      },
      bedroll: {
        name: `Sac de couchage`,
        description: `Un sac de couchage permet à une créature de taille P ou M de dormir. Dans un sac de couchage, vous réussissez automatiquement vos jets de sauvegarde contre le froid extrême (cf. « Boîte à outils ludique »).`
      },
      pouch: {
        name: `Sacoche`,
        description: `Une sacoche contient jusqu'à 3 kg pour un volume de 0,006 m3.`
      },
      componentPouch: {
        name: `Sacoche à composantes`,
        description: `Une sacoche à composantes est étanche et divisée en compartiments qui permettent d’y ranger toutes les composantes matérielles gratuites de vos sorts.`
      },
      bucket: {
        name: `Seau`,
        description: `Un seau contient 15 litres de liquide ou 0,015 m3.`
      },
      signalWhistle: {
        name: `Sifflet`,
        description: `Souffler dans le sifflet par une action Utilisation produit un son audible à 180 m.`,
      },
      holySymbol: {
        name: 'Symbole sacré',
        description: `Un symbole sacré, qui prend l’une des formes proposées dans la table ci-dessous, est serti de pierreries ou peint afin de canaliser la magie divine. Clercs et Paladins peuvent se servir d’un symbole sacré comme focaliseur d’incantation.

La table indique si un symbole sacré doit être tenu, porté ou cousu sur une étoffe, par exemple sur un tabard ou une bannière, ou fixé sur un bouclier.
Symbole 	Poids 	Prix
Amulette (portée ou tenue) 	0,5 kg 	5 po
Emblème (cousu sur une étoffe ou fixé un bouclier) 	— 	5 po
Reliquaire (tenu) 	1 kg 	5 po`
      },
      tent: {
        name: `Tente`,
        description: `Jusqu'à deux créatures de taille P ou M peuvent dormir sous la même tente.`
      },
      clothesTravelers: {
        name: `Tenue de voyage`,
        description: `La tenue de voyage comprend des vêtements résistants, conçus pour voyager dans divers environnements.`
      },
      barrel: {
        name: `Tonneau`,
        description: `Un tonneau contient jusqu'à 140 litres de liquide ou 0,12 m3 de solide.`
      },
      torch: {
        name: `Torche`,
        description: `Une torche brûle pendant 1 heure, produit une Lumière vive sur un rayon de 6 m et une Lumière faible sur 6 m de plus. Dans le cadre de l’action Attaque, vous pouvez attaquer avec la torche, en considérant celle-ci comme une arme courante de corps à corps. Si l’attaque touche, la cible subit 1 dégât de feu.`
      },
      healersKit: {
        name: `Trousse de soins`,
        description: `Une trousse de soins dispose de dix charges. Par une action Utilisation, dépenser une charge permet de stabiliser une créature avec l’état Inconscient et tombée à 0 point de vie sans passer par un jet de Sagesse (Médecine).`
      },
    },
    spells: {
      enlargeReduce: `Agrandissement/rapetissement`,
      aid: `Aide`,
      alarm: `Alarme`,
      befuddlement: `Aliénation`,
      planarAlly: `Allié planaire`,
      enhanceAbility: `Amélioration de caractéristique`,
      friends: `Amis|Faux amis`,
      animalFriendship: `Amitié avec les animaux`,
      animateDead: `Animation des morts`,
      animateObjects: `Animation des objets`,
      nondetection: `Antidétection`,
      calmEmotions: `Apaisement des émotions`,
      seeming: `Apparence trompeuse`,
      findSteed: `Appel de destrier`,
      findFamiliar: `Appel de familier`,
      callLightning: `Appel de la foudre`,
      elementalWeapon: `Arme élémentaire`,
      magicWeapon: `Arme magique`,
      spiritualWeapon: `Arme spirituelle`,
      armorOfAgathys: `Armure d'Agathys`,
      mageArmor: `Armure de mage`,
      timeStop: `Arrêt du temps`,
      acidSplash: `Aspersion d'acide`,
      phantasmalKiller: `Assassin imaginaire`,
      guidance: `Assistance`,
      augury: `Augure`,
      auraOfPurity: `Aura de pureté`,
      auraOfLife: `Aura de vie`,
      auraOfVitality: `Aura de vitalité`,
      crusadersMantle: `Aura du croisé`,
      nystulsMagicAura: `Aura magique de Nystul`,
      holyAura: `Aura sacrée`,
      antipathySympathy: `Aversion/attirance`,
      glibness: `Bagou`,
      goodberry: `Baies nourricières`,
      banishment: `Bannissement`,
      bladeBarrier: `Barrière de lames`,
      bless: `Bénédiction`,
      inflictWounds: `Blessure`,
      magicMouth: `Bouche magique`,
      shield: `Bouclier`,
      fireShield: `Bouclier de feu`,
      shieldOfFaith: `Bouclier de la foi`,
      poisonSpray: `Bouffée de poison`,
      fireball: `Boule de feu`,
      delayedBlastFireball: `Boule de feu à retardement`,
      gustOfWind: `Bourrasque`,
      cloudkill: `Brume mortelle`,
      forcecage: `Cage de force`,
      vampiricTouch: `Caresse du vampire`,
      blindnessDeafness: `Cécité/surdité`,
      circleOfDeath: `Cercle de mort`,
      circleOfPower: `Cercle de pouvoir`,
      teleportationCircle: `Cercle de téléportation`,
      magicCircle: `Cercle magique`,
      chainLightning: `Chaîne d'éclairs`,
      antimagicField: `Champ antimagie`,
      shapechange: `Changement de forme`,
      planeShift: `Changement de plan`,
      charmMonster: `Charme-monstre`,
      charmPerson: `Charme-personne`,
      blindingSmite: `Châtiment de cécité`,
      wrathfulSmite: `Châtiment de courroux`,
      searingSmite: `Châtiment de fournaise`,
      shiningSmite: `Châtiment de révélation`,
      staggeringSmite: `Châtiment de stupeur`,
      thunderousSmite: `Châtiment de tonnerre`,
      divineSmite: `Châtiment divin`,
      banishingSmite: `Châtiment du ban`,
      tashasBubblingCauldron: `Chaudron bouillonnant de Tasha`,
      mordenkainensFaithfulHound: `Chien de garde de Mordenkainen`,
      clairvoyance: `Clairvoyance`,
      blink: `Clignotement`,
      clone: `Clone`,
      leomundsSecretChest: `Coffre secret de Léomund`,
      flameStrike: `Colonne de flamme`,
      sending: `Communication à distance`,
      speakWithAnimals: `Communication avec les animaux`,
      speakWithDead: `Communication avec les morts`,
      speakWithPlants: `Communication avec les plantes`,
      commune: `Communion`,
      communeWithNature: `Communion avec la nature`,
      comprehendLanguages: `Compréhension des langues`,
      compulsion: `Compulsion`,
      coneOfCold: `Cône de froid`,
      confusion: `Confusion`,
      contactOtherPlane: `Contact avec les plans`,
      chillTouch: `Contact glacial`,
      contagion: `Contagion`,
      harm: `Contamination`,
      counterspell: `Contresort`,
      controlWater: `Contrôle de l'eau`,
      controlWeather: `Contrôle du climat`,
      summonAberration: `Convocation d'aberration`,
      summonConstruct: `Convocation d'artificiel`,
      summonElemental: `Convocation d'élémentaire`,
      summonBeast: `Convocation de bête`,
      summonCelestial: `Convocation de céleste`,
      summonDragon: `Convocation de dragon`,
      summonFey: `Convocation de fée`,
      summonFiend: `Convocation de fiélon`,
      summonUndead: `Convocation de mort-vivant`,
      drawmijsInstantSummons: `Convocations instantanées de Drawmij`,
      antilifeShell: `Coquille antivie`,
      ropeTrick: `Corde enchantée`,
      cordonOfArrows: `Cordon de flèches`,
      colorSpray: `Couleurs dansantes`,
      trueStrike: `Coup au but`,
      thunderclap: `Coup de tonnerre`,
      crownOfMadness: `Couronne du dément`,
      iceKnife: `Couteau de glace`,
      creation: `Création`,
      createUndead: `Création de mort-vivant`,
      createFoodAndWater: `Création de nourriture et d'eau`,
      createOrDestroyWater: `Création ou destruction d'eau`,
      spikeGrowth: `Croissance d'épines`,
      plantGrowth: `Croissance végétale`,
      shillelagh: `Crosse des druides`,
      ottosIrresistibleDance: `Danse irrésistible d'Otto`,
      knock: `Déblocage`,
      eldritchBlast: `Décharge occulte`,
      maze: `Dédale`,
      disguiseSelf: `Déguisement`,
      removeCurse: `Délivrance des malédictions`,
      demiplane: `Demi-plan`,
      disintegrate: `Désintégration`,
      seeInvisibility: `Détection de l'invisibilité`,
      detectMagic: `Détection de la magie`,
      detectThoughts: `Détection des pensées`,
      findTraps: `Détection des pièges`,
      detectEvilAndGood: `Détection du mal et du bien`,
      detectPoisonAndDisease: `Détection du poison et des maladies`,
      enthrall: `Discours captivant`,
      tensersFloatingDisk: `Disque flottant de Tenser`,
      sequester: `Dissimulation suprême`,
      dispelMagic: `Dissipation de la magie`,
      dispelEvilAndGood: `Dissipation du mal et du bien`,
      divination: `Divination`,
      fingerOfDeath: `Doigt de mort`,
      dominateBeast: `Domination de bête`,
      dominateMonster: `Domination de monstre`,
      dominatePerson: `Domination de personne`,
      tongues: `Don des langues`,
      mislead: `Double illusoire`,
      gentleRepose: `Doux repos`,
      druidcraft: `Druidisme`,
      compelledDuel: `Duel forcé`,
      lightningBolt: `Éclair`,
      sunburst: `Éclat du soleil`,
      elementalism: `Élémentalisme`,
      prismaticSpray: `Embruns prismatiques`,
      imprisonment: `Emprisonnement`,
      entangle: `Enchevêtrement`,
      weird: `Ennemi subconscient`,
      planarBinding: `Entrave planaire`,
      mordenkainensSword: `Épée de Mordenkainen`,
      mindSpike: `Épine mentale`,
      sorcerousBurst: `Éruption ensorcelée`,
      mindBlank: `Esprit impénétrable`,
      spiritGuardians: `Esprits gardiens`,
      feignDeath: `État cadavérique`,
      awaken: `Éveil`,
      fabricate: `Fabrication`,
      stoneShape: `Façonnage de la pierre`,
      divineFavor: `Faveur divine`,
      heroesFeast: `Festin des héros`,
      featherFall: `Feuille morte`,
      continualFlame: `Flamme éternelle`,
      sacredFlame: `Flamme sacrée`,
      produceFlame: `Flammes`,
      insectPlague: `Fléau d'insectes`,
      melfsAcidArrow: `Flèche acide de Melf`,
      lightningArrow: `Flèche de foudre`,
      blight: `Flétrissement`,
      blur: `Flou`,
      fountOfMoonlight: `Fontaine de lune`,
      phantasmalForce: `Force fantasmagorique`,
      etherealness: `Forme éthérée`,
      gaseousForm: `Forme gazeuse`,
      tashasHideousLaughter: `Fou rire de Tasha`,
      thornWhip: `Fouet épineux`,
      mistyStep: `Foulée brumeuse`,
      shatter: `Fracassement`,
      steelWindStrike: `Frappe du vent d'acier`,
      ensnaringStrike: `Frappe piégeuse`,
      meldIntoStone: `Fusion dans la pierre`,
      guardianOfFaith: `Gardien de la foi`,
      tollTheDead: `Glas`,
      moveEarth: `Glissement de terrain`,
      globeOfInvulnerability: `Globe d'invulnérabilité`,
      glyphOfWarding: `Glyphe de garde`,
      grease: `Graisse`,
      longstrider: `Grande foulée`,
      hailOfThorns: `Grêle d'épines`,
      heal: `Guérison`,
      massHeal: `Guérison de groupe`,
      haste: `Hâte`,
      heroism: `Héroïsme`,
      identify: `Identification`,
      minorIllusion: `Illusion mineure`,
      programmedIllusion: `Illusion programmée`,
      majorImage: `Image majeure`,
      mirrorImage: `Image miroir`,
      projectImage: `Image projetée`,
      silentImage: `Image silencieuse`,
      holdMonster: `Immobilisation de monstre`,
      holdPerson: `Immobilisation de personne`,
      bane: `Imprécation`,
      command: `Injonction`,
      giantInsect: `Insecte géant`,
      forbiddance: `Interdiction`,
      reverseGravity: `Inversion de la gravité`,
      invisibility: `Invisibilité`,
      greaterInvisibility: `Invisibilité suprême`,
      conjureAnimals: `Invocation d'animaux`,
      conjureElemental: `Invocation d'élémentaire`,
      conjureMinorElementals: `Invocation d'élémentaires mineurs`,
      conjureWoodlandBeings: `Invocation d'êtres sylvestres`,
      conjureCelestial: `Invocation de céleste`,
      conjureFey: `Invocation de fée`,
      conjureBarrage: `Invocation de projectiles|Hérissement`,
      conjureVolley: `Invocation de volée`,
      flameBlade: `Lame de feu`,
      slow: `Lenteur`,
      levitate: `Lévitation`,
      graspingVine: `Liane avide`,
      freedomOfMovement: `Liberté de mouvement`,
      wardingBond: `Lien de protection`,
      rarysTelepathicBond: `Lien télépathique de Rary`,
      locateAnimalsOrPlants: `Localisation d'animaux ou de plantes`,
      locateObject: `Localisation d'objet`,
      locateCreature: `Localisation de créature`,
      beaconOfHope: `Lueur d'espoir`,
      faerieFire: `Lueurs féeriques`,
      light: `Lumière`,
      daylight: `Lumière du jour`,
      dancingLights: `Lumières dansantes`,
      bigbysHand: `Main de Bigby`,
      mageHand: `Main de mage`,
      burningHands: `Mains brûlantes`,
      bestowCurse: `Malédiction`,
      hex: `Maléfice`,
      mordenkainensMagnificentMansion: `Manoir somptueux de Mordenkainen`,
      waterWalk: `Marche sur l'eau|Marche sur l'onde`,
      huntersMark: `Marque du chasseur`,
      eyebite: `Mauvais oeil`,
      message: `Message`,
      animalMessenger: `Messager animal`,
      heatMetal: `Métal brûlant`,
      polymorph: `Métamorphose`,
      animalShapes: `Métamorphose animale`,
      truePolymorph: `Métamorphose suprême`,
      mirageArcane: `Mirage`,
      alterSelf: `Modification d'apparence`,
      modifyMemory: `Modification de mémoire`,
      phantomSteed: `Monture fantôme`,
      viciousMockery: `Moquerie cruelle`,
      healingWord: `Mot de guérison`,
      massHealingWord: `Mot de guérison de groupe`,
      powerWordStun: `Mot de pouvoir étourdissant`,
      powerWordFortify: `Mot de pouvoir fortifiant`,
      powerWordHeal: `Mot de pouvoir guérisseur`,
      powerWordKill: `Mot de pouvoir mortel`,
      wordOfRadiance: `Mot de radiance`,
      wordOfRecall: `Mot de retour`,
      hypnoticPattern: `Motif hypnotique`,
      wallOfThorns: `Mur d'épines`,
      wallOfFire: `Mur de feu`,
      wallOfForce: `Mur de force`,
      wallOfIce: `Mur de glace`,
      wallOfStone: `Mur de pierre`,
      windWall: `Mur de vent`,
      prismaticWall: `Mur prismatique`,
      dissonantWhispers: `Murmures dissonants`,
      legendLore: `Mythes et légendes`,
      fogCloud: `Nappe de brouillard`,
      incendiaryCloud: `Nuage incendiaire`,
      stinkingCloud: `Nuage nauséabond`,
      cloudOfDaggers: `Nuée de dagues`,
      meteorSwarm: `Nuée de météores`,
      arcaneEye: `Oeil du mage`,
      chromaticOrb: `Orbe chromatique`,
      findThePath: `Orientation`,
      divineWord: `Parole divine`,
      treeStride: `Passage par les arbres`,
      passWithoutTrace: `Passage sans trace`,
      passwall: `Passe-muraille`,
      spiderClimb: `Pattes d'araignée`,
      barkskin: `Peau d'écorce`,
      stoneskin: `Peau de pierre`,
      beastSense: `Perception bestiale`,
      synapticStatic: `Perturbations synaptiques`,
      leomundsTinyHut: `Petite hutte de Léomund`,
      fleshToStone: `Pétrification`,
      fear: `Peur|Terreur`,
      mindSliver: `Piqûre mentale`,
      shockingGrasp: `Poigne électrique`,
      gate: `Portail`,
      arcaneGate: `Portail arcanique`,
      dimensionDoor: `Porte dimensionnelle`,
      starryWisp: `Poussière d'étoile`,
      contingency: `Préméditation`,
      foresight: `Prémonition`,
      yolandesRegalPresence: `Présence royale de Yolane`,
      prestidigitation: `Prestidigitation`,
      prayerOfHealing: `Prière de guérison`,
      magicMissile: `Projectile magique`,
      astralProjection: `Projection astrale`,
      protectionFromEnergy: `Protection contre l'énergie`,
      deathWard: `Protection contre la mort`,
      protectionFromEvilAndGood: `Protection contre le mal et le bien`,
      protectionFromPoison: `Protection contre le poison`,
      guardsAndWards: `Protections et sceaux`,
      purifyFoodAndDrink: `Purification de la nourriture et de l'eau`,
      geas: `Quête`,
      raiseDead: `Rappel à la vie`,
      rayOfEnfeeblement: `Rayon affaiblissant`,
      scorchingRay: `Rayon ardent`,
      rayOfFrost: `Rayon de givre`,
      moonbeam: `Rayon de lune`,
      sunbeam: `Rayon de soleil`,
      rayOfSickness: `Rayon empoisonné`,
      guidingBolt: `Rayon traçant`,
      regenerate: `Régénération`,
      reincarnate: `Réincarnation`,
      mending: `Réparation`,
      expeditiousRetreat: `Repli expéditif`,
      hellishRebuke: `Représailles infernales`,
      resistance: `Résistance`,
      waterBreathing: `Respiration aquatique`,
      lesserRestoration: `Restauration partielle`,
      greaterRestoration: `Restauration suprême`,
      resurrection: `Résurrection`,
      trueResurrection: `Résurrection suprême`,
      revivify: `Retour à la vie`,
      hallow: `Sanctification`,
      sanctuary: `Sanctuaire`,
      mordenkainensPrivateSanctum: `Sanctuaire privé de Mordenkainen`,
      jump: `Saut`,
      scrying: `Scrutation`,
      unseenServant: `Serviteur invisible`,
      silence: `Silence`,
      simulacrum: `Simulacre`,
      falseLife: `Simulacre de vie`,
      cureWounds: `Soins`,
      massCureWounds: `Soins de groupe`,
      sleep: `Sommeil`,
      dream: `Songe`,
      dragonsBreath: `Souffle du dragon`,
      wish: `Souhait`,
      flamingSphere: `Sphère de feu`,
      vitriolicSphere: `Sphère de vitriol`,
      otilukesFreezingSphere: `Sphère glacée d'Otiluke`,
      otilukesResilientSphere: `Sphère résiliente d'Otiluke`,
      spareTheDying: `Stabilisation`,
      suggestion: `Suggestion`,
      massSuggestion: `Suggestion de groupe`,
      symbol: `Symbole`,
      telekinesis: `Télékinésie`,
      telepathy: `Télépathie`,
      teleport: `Téléportation`,
      fireStorm: `Tempête de feu`,
      iceStorm: `Tempête de grêle`,
      sleetStorm: `Tempête de neige`,
      jallarzisStormOfRadiance: `Tempête radieuse de Jallarzi`,
      stormOfVengeance: `Tempête vengeresse`,
      darkness: `Ténèbres`,
      armsOfHadar: `Tentacules de Hadar`,
      evardsBlackTentacles: `Tentacules noirs d'Evard`,
      hallucinatoryTerrain: `Terrain hallucinatoire`,
      illusoryScript: `Texte illusoire`,
      thaumaturgy: `Thaumaturgie`,
      web: `Toile d'araignée`,
      fireBolt: `Trait de feu`,
      witchBolt: `Trait ensorcelé`,
      earthquake: `Tremblement de terre`,
      tsunami: `Tsunami`,
      magicJar: `Urne magique|Possession`,
      destructiveWave: `Vague destructrice`,
      thunderwave: `Vague tonnante`,
      windWalk: `Vent divin`,
      arcaneLock: `Verrou arcanique|Verrou magique`,
      swiftQuiver: `Vif carquois`,
      arcaneVigor: `Vigueur arcanique`,
      darkvision: `Vision dans le noir`,
      trueSeeing: `Vision suprême`,
      transportViaPlants: `Voie végétale`,
      bladeWard: `Voile défensif`,
      fly: `Vol`,
      hungerOfHadar: `Voracité de Hadar`,
      zoneOfTruth: `Zone de vérité`,
    },
  },
}