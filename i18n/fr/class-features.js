// TODO: AI generated descs

export default {
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
}