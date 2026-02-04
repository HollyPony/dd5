export const CATEGORY = {
  ORIGINS: `Origines`,
  GENERAL: `Général`,
  FIGHTING_STYLE: `Style de combat`,
  EPIC_BOON: `Faveur épique`,
}

export default {
  elementalAdept: {
    name: `Adepte élémentaire`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Intelligence, Sagesse ou Charisme de 1,
jusqu'à un maximum de 20.

**Maîtrise des énergies**. Choisissez l'un des types de dégâts suivants : Acide, Froid, Feu,
Foudre ou Tonnerre. Les sorts que vous lancez ignorent la Résistance aux dégâts du type choisi. De plus, lorsque
vous lancez des dégâts pour un sort que vous lancez et qui inflige des dégâts de ce type, vous pouvez considérer
n'importe quel 1 sur un dé de dégâts comme un 2.

**Répétable**. Vous pouvez utiliser ce don plusieurs fois, mais vous devez choisir un type de
dégâts différent à chaque fois pour Maîtrise de l'énergie.`,
  },
  feyTouched: {
    name: `Affinité féerique`,
    description: `Votre exposition à la magie de la Féerie vous confère les avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Intelligence, Sagesse ou Charisme de 1,
jusqu'à un maximum de 20.

**Magie des fées**. Choisissez un sort de niveau 1 de l'école de magie de Divination ou
d'Enchantement. Vous avez toujours ce sort et le sort *foulée brumeuse* préparés. Vous pouvez lancer
chacun de ces sorts sans dépenser d'emplacement de sort. Une fois l'un des sorts lancé de cette manière, vous ne
pouvez plus le lancer de cette manière avant d'avoir terminé un Repos long. Vous pouvez également lancer ces
sorts en utilisant des emplacements de sorts que vous possédez du niveau approprié. La caractéristique
d'incantation de ces sorts est celle augmentée par ce don.`,
  },
  shadowTouched: {
    name: `Affinité ombreuse`,
    description: `Votre exposition à la magie de la Gisombre vous confère les avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Intelligence, Sagesse ou Charisme de 1,
jusqu'à un maximum de 20.

**Magie de l'Ombre**. Choisissez un sort de niveau 1 de l'école de magie d'Illusion ou de
Nécromancie. Vous avez toujours ce sort et le sort *invisibilité* préparés. Vous pouvez lancer
chacun de ces sorts sans dépenser d'emplacement de sort. Une fois l'un des sorts lancé de cette manière, vous ne
pouvez plus le lancer de cette manière avant d'avoir terminé un Repos long. Vous pouvez également lancer ces
sorts en utilisant des emplacements de sorts que vous possédez du niveau approprié. La caractéristique
d'incantation de ces sorts est celle augmentée par ce don.`,
  },
  abilityScoreImprovement: {
    name: `Amélioration de caractéristique`,
    description: `Augmentez une valeur de caractéristique de votre choix de 2, ou augmentez deux valeurs de
caractéristique de votre choix de 1.

Ce don ne peut pas augmenter une valeur de caractéristique au-delà de 20.

**Répétable**. Vous pouvez prendre ce don plusieurs fois.`,
  },
  archery: {
    name: `Archerie`,
    description: `Vous obtenez un bonus de +2 aux jets d'attaque effectués avec des armes à distance.`,
  },
  greatWeaponFighting: {
    name: `Arme à deux mains`,
    description: `Lorsque vous lancez les dégâts pour une attaque effectuée avec une arme de corps à corps
tenue à deux mains, vous pouvez considérer n'importe quel 1 ou 2 sur un dé de dégâts comme un 3. L'arme doit
posséder la propriété Deux mains ou Polyvalente pour obtenir cet avantage.`,
  },
  thrownWeaponFighting: {
    name: `Arme de lancer`,
    description: `Lorsque vous touchez lors d'un jet d'attaque à distance avec une arme dotée de la
propriété Lancer, vous obtenez un bonus de +2 aux dégâts.`,
  },
  athlete: {
    name: `Athlète`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force ou Dextérité de 1, jusqu'à un
maximum de 20.

**Vitesse d'escalade**. Vous gagnez une Vitesse d'escalade égale à votre Vitesse.

**Rétablissement**. Lorsque vous êtes en À terre, vous pouvez vous redresser avec seulement
1,50 mètre de mouvement.

**Saut**. Vous pouvez effectuer un saut en longueur ou en hauteur après avoir parcouru
seulement 1,50 mètre.`,
  },
  tavernBrawler: {
    name: `Bagarreur de tavernes`,
    description: `Vous bénéficiez des avantages suivants.

**Frappe à mains nues améliorée**. Lorsque vous touchez avec votre Frappe à mains nues et
infligez des dégâts, vous pouvez infliger des dégâts contondants égaux à 1d4 plus votre modificateur de Force au
lieu des dégâts normaux d'une Frappe à mains nues.

**Relancer des dégâts**. Chaque fois que vous lancez un dé de dégâts pour votre Frappe à mains
nues, vous pouvez relancer le dé si vous avez obtenu un 1, et devez utiliser le nouveau résultat.

**Armement improvisé**. Vous maîtrisez les armes improvisées.

**Bourrade**. Lorsque vous touchez une créature avec une Frappe à mains nues lors d'une action
Attaque à votre tour, vous pouvez infliger des dégâts à la cible et la repousser à 1,50 m de vous. Vous ne
pouvez utiliser cet avantage qu'une seule fois par tour.`,
  },
  crusher: {
    name: `Broyeur`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force ou Constitution de 1, jusqu'à un
maximum de 20.

**Bourrade**. Une fois par tour, lorsque vous touchez une créature avec une attaque infligeant
des dégâts contondants, vous pouvez la déplacer de 1,50 mètre vers une case libre si la cible ne fait pas plus
d'une taille de plus que vous.

**Critique renforcé**. Lorsque vous réussissez un Coup critique infligeant des dégâts
contondants à une créature, les jets d'attaque contre cette créature bénéficient d'un Avantage jusqu'au début de
votre prochain tour.`,
  },
  lucky: {
    name: `Chanceux`,
    description: `Vous bénéficiez des avantages suivants.

**Points de chance**. Vous disposez d'un nombre de points de Chance égal à votre bonus de
maîtrise et pouvez les dépenser pour les avantages ci-dessous. Vous récupérez vos points de Chance dépensés à la
fin d'un Repos long.

**Avantage**. Lorsque vous lancez un d20 pour un test de D20, vous pouvez dépenser 1 point de
Chance pour vous donner un Avantage.

**Désavantage**. Lorsqu'une créature lance un d20 pour un jet d'attaque contre vous, vous
pouvez dépenser 1 point de Chance pour lui imposer un Désavantage.`,
  },
  chef: {
    name: `Chef cuisinier`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Constitution ou Sagesse de 1, jusqu'à un
maximum de 20.

**Ustensiles de cuisinier**. Vous maîtrisez les ustensiles de cuisinier si vous ne les
maîtrisez pas déjà.

**Repas reconstituant**. Lors d'un Repos court, vous pouvez cuisiner des plats spéciaux si vous
avez des ingrédients et des ustensiles de cuisinier sous la main. Vous pouvez préparer suffisamment de
nourriture pour un nombre de créatures égal à 4 plus votre bonus de maîtrise. À la fin du Repos court, toute
créature qui mange ces plats et dépense un ou plusieurs DV pour regagner des points de vie regagne 1d8 points de
vie supplémentaires.

**Friandises galvanisantes**. Après 1 heure de travail ou lorsque vous terminez un Repos long,
vous pouvez cuisiner un nombre de friandises égal à votre bonus de maîtrise si vous avez des ingrédients et des
ustensiles de cuisinier sous la main. Ces friandises spéciales se gardent 8 heures après leur préparation. Une
créature peut utiliser une action Bonus pour en manger une et gagner un nombre de points de vie temporaires égal
à votre bonus de maîtrise.`,
  },
  twoWeaponFighting: {
    name: `Combat à deux armes`,
    description: `Lorsque vous effectuez une attaque supplémentaire grâce à une arme dotée de la propriété
Légère, vous pouvez ajouter votre modificateur de caractéristique aux dégâts de cette attaque si vous ne
l'ajoutez pas déjà.`,
  },
  unarmedFighting: {
    name: `Combat à mains nues`,
    description: `Lorsque vous touchez avec votre Frappe à mains nues et infligez des dégâts, vous pouvez
infliger des dégâts contondants égaux à 1d6 plus votre modificateur de Force au lieu des dégâts normaux d'une
Frappe à mains nues. Si vous ne tenez ni arme ni bouclier lors du jet d'attaque, le d6 devient un d8.

Au début de chacun de vos tours, vous pouvez infliger 1d4 dégâts contondants à une créature que vous
agrippez.`,
  },
  blindFighting: {
    name: `Combat en aveugle`,
    description: `Vous possédez Vision aveugle avec une portée de 3 mètres.`,
  },
  dualWielder: {
    name: `Combattant à deux armes`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force ou Dextérité de 1, jusqu'à un
maximum de 20.

**Combat à deux armes amélioré**. Lorsque vous prenez l'action Attaque pendant votre tour et
attaquez avec une arme qui possède la propriété Légère, vous pouvez effectuer une attaque supplémentaire en tant
qu'action Bonus plus tard au cours du même tour avec une arme différente, qui doit être une arme de corps à
corps sans la propriété Deux mains. Vous n'ajoutez pas votre modificateur de caractéristique aux dégâts de
l'attaque supplémentaire, sauf si ce modificateur est négatif.

**Dégainage rapide**. Vous pouvez dégainer ou ranger deux armes sans la propriété Deux mains
alors que vous ne pourriez normalement n'en dégainer ou ranger qu'une seule.`,
  },
  mountedCombatant: {
    name: `Combattant monté`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristiques**. Augmentez votre Force, Dextérité ou Sagesse de 1, jusqu'à
un maximum de 20.

**Frappe montée**. Lorsque vous êtes sur une monture, vous bénéficiez d'un Avantage aux jets
d'attaque contre toute créature non montée dans un rayon de 1,50 m autour de votre monture et dont la taille est
inférieure d'au moins une taille à celle de votre monture.

**Pas de côté**. Si votre monture est soumise à un effet qui lui permet d'effectuer un jet de
sauvegarde de Dextérité pour ne subir que la moitié des dégâts, elle ne subit aucun dégât en cas de réussite au
jet de sauvegarde et seulement la moitié en cas d'échec. Pour que votre monture bénéficie de cet avantage, vous
devez la monter et aucun de vous deux ne doit être Incapable d'agir.

**Déviation**. Lorsque vous êtes sur une monture, vous pouvez forcer une attaque qui touche
votre monture à vous toucher à la place si vous n'êtes pas Incapable d'agir.`,
  },
  actor: {
    name: `Comédien`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Charisme de 1, jusqu'à un maximum de 20.

**Imposture**. Lorsque vous êtes déguisé en une personne, qu'elle soit réelle ou fictive, vous
avez un Avantage aux jets de Charisme (Tromperie ou Représentation) pour convaincre les autres que vous êtes
bien cette personne.

**Imitation**. Vous pouvez imiter les bruits d'autres créatures, y compris la parole. Une
créature qui entend ce mimétisme doit réussir un jet de Sagesse (Intuition) pour se rendre compte qu'il s'agit
d'une imitation (DD 8 plus votre modificateur de Charisme et votre bonus de maîtrise).`,
  },
  defense: {
    name: `Défense`,
    description: `Lorsque vous portez une armure légère, intermédiaire ou lourde, vous obtenez un bonus de
+1 à la Classe d'Armure.`,
  },
  skulker: {
    name: `Discret`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Dextérité de 1, jusqu'à un maximum de 20.

**Vision aveugle**. Vous obtenez de Vision aveugle avec une portée de 3 mètres.

**Brouillard de guerre**. Vous exploitez les distractions du combat et obtenez un Avantage à
chaque jet de Dextérité (Discrétion) effectué lors de l'action Furtivité pendant le combat.

**Tireur discret**. Si vous effectuez un jet d'attaque caché et que celui-ci échoue, votre
position n'est pas révélée.`,
  },
  skilled: {
    name: `Doué`,
    description: `Vous maîtrisez n'importe quelle combinaison de trois compétences ou outils de votre
choix.

**Répétable**. Vous pouvez prendre ce don plusieurs fois.`,
  },
  dueling: {
    name: `Duel`,
    description: `Lorsque vous tenez une arme de corps à corps dans une main et aucune autre arme, vous
obtenez un bonus de +2 aux dégâts infligés avec cette arme.`,
  },
  defensiveDuelist: {
    name: `Duelliste défensif`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Dextérité de 1, jusqu'à un maximum de 20.

**Parade**. Si vous tenez une arme de Finesse et qu'une autre créature vous touche au corps à
corps, vous pouvez prendre une Réaction pour ajouter votre bonus de maîtrise à votre Classe d'Armure, ce qui
peut faire en sorte que l'attaque vous rate. Vous bénéficiez de ce bonus à votre CA contre les attaques au corps
à corps jusqu'au début de votre prochain tour.`,
  },
  piercer: {
    name: `Empaleur|Perforateur`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force ou Dextérité de 1, jusqu'à un
maximum de 20.

**Perforation**. Une fois par tour, lorsque vous touchez une créature avec une attaque
infligeant des dégâts perforants, vous pouvez relancer l'un des dés de dégâts de l'attaque et vous devez
utiliser le nouveau jet.

**Critique renforcé**. Lorsque vous réussissez un Coup critique infligeant des dégâts
perforants à une créature, vous pouvez lancer un dé de dégâts supplémentaire pour déterminer les dégâts
perforants supplémentaires subis par la cible.`,
  },
  grappler: {
    name: `Empoigneur`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force ou Dextérité de 1, jusqu'à un
maximum de 20.

**Frappe et empoignade**. Lorsque vous touchez une créature avec une Frappe à mains nues lors
de votre action Attaque pendant votre tour, vous pouvez utiliser à la fois les options Dégâts et Lutte. Vous ne
pouvez utiliser cet avantage qu'une fois par tour.

**Attaque avec Avantage**. Vous bénéficiez d'un Avantage aux jets d'attaque contre une créature
que vous agrippez.

**Lutteur rapide**. Vous n'avez pas besoin de dépenser un mouvement supplémentaire pour
déplacer une créature que vous agrippez si celle-ci est de votre taille ou plus petite.`,
  },
  poisoner: {
    name: `Empoisonneur`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Dextérité ou Intelligence de 1, jusqu'à un
maximum de 20.

**Poison virulent**. Lorsque vous effectuez un jet de dégâts infligeant des dégâts de poison,
ignorez la Résistance aux dégâts de poison.

**Préparation de poison**. Vous maîtrisez le kit d'empoisonneur. En 1 heure de travail avec ce
kit et en dépensant 50 po de matériaux, vous pouvez créer un nombre de doses de poison égal à votre bonus de
maîtrise. Par une action Bonus, vous pouvez appliquer une dose de poison sur une arme ou une munition. Une fois
appliqué, le poison conserve son efficacité pendant 1 minute ou jusqu'à ce que vous infligiez des dégâts avec
l'objet empoisonné, selon la durée la plus courte. Lorsqu'une créature subit des dégâts de l'objet empoisonné,
elle doit réussir un jet de sauvegarde de Constitution (DD 8 plus le modificateur de la caractéristique
augmentée par ce don et votre bonus de maîtrise) ou subir 2d8 dégâts de poison et avoir l'état Empoisonné
jusqu'à la fin de votre prochain tour.`,
  },
  keenMind: {
    name: `Esprit affûté`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Intelligence de 1, jusqu'à un maximum de
20.

**Érudition**. Choisissez l'une des compétences suivantes : Arcanes, Histoire, Investigation,
Nature ou Religion. Si vous ne maîtrisez pas la compétence choisie, vous la maîtrisez ; si vous la maîtrisez
déjà, vous gagnez Expertise pour celle-ci.

**Étude rapide**. Vous pouvez prendre l'action Étude en tant qu'action Bonus.`,
  },
  skillExpert: {
    name: `Expert`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez une valeur caractéristique de votre choix de 1,
jusqu'à un maximum de 20.

**Maîtrise de compétence**. Vous maîtrisez une compétence de votre choix.

**Expertise**. Choisissez une compétence que vous maîtrisez, mais pour laquelle vous n'avez pas
Expertise. Vous gagnez Expertise dans cette compétence.`,
  },
  charger: {
    name: `Expert de la charge`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force ou Dextérité de 1, jusqu'à un
maximum de 20.

**Pointe améliorée**. Lorsque vous prenez l'action Pointe, votre vitesse augmente de 3 mètres
pour cette action.

**Attaque de charge**. Si vous vous déplacez d'au moins 3 mètres en ligne droite vers une cible
juste avant de la toucher avec un jet d'attaque au corps à corps dans le cadre de l'action Attaque, choisissez
l'un des effets suivants : vous obtenez un bonus de 1d8 aux dégâts de l'attaque, ou vous repoussez la cible
jusqu'à 3 mètres si elle ne fait pas plus d'une taille de plus que vous. Vous ne pouvez utiliser cet avantage
qu'une seule fois par tour.`,
  },
  crafter: {
    name: `Façonneur`,
    description: `Vous bénéficiez des avantages suivants.

**Maîtrise d'outils**. Vous maîtrisez trois outils d'artisan différents de votre choix de la
table Fabrication rapide.

**Ristourne**. Chaque fois que vous achetez un objet non magique, vous bénéficiez d'une
réduction de 20 %.

**Façonnage rapide**. À la fin d'un Repos long, vous pouvez fabriquer une pièce d'équipement de
la table Fabrication rapide, à condition de posséder les outils d'artisan associés et de maîtriser ces outils.
L'objet dure jusqu'à ce que vous finissiez un autre Repos long, après quoi il se désagrège.

Outils d'artisan
Équipement fabriqué

Outils de bricoleur
Boîte à amadou, cloche, pelle

Outils de charpentier
Échelle, torche

Outils de forgeron
Billes, chausse-trappes, grappin, pot en fer, seau

Outils de maçon
Palan

Outils de menuisier
Gourdin, masse, bâton de combat

Outils de potier
Cruche, lampe

Outils de tanneur
Étui, sacoche

Outils de tisserand
Corde, filet, panier, tente`,
  },
  epicBoonOfIrresistibleOffense: {
    name: `Faveur d'attaque irrésistible`,
    description: `Vous recevez les bénéfices suivants.

**Augmentation de caractéristique**. Augmentez votre Force ou votre Dextérité de 1, jusqu'à un maximum de 30.

**Défenses surmontées**. Les dégâts contondants, perforants et tranchants que vous infligez ne sont pas affectées par la Résistance.

**Frappe écrasante**. Quand vous obtenez un 20 au d20 d'un jet d'attaque, vous pouvez infliger des dégâts supplémentaires à la cible à hauteur de la valeur de caractéristique augmentée par ce don. Ces dégâts supplémentaires sont du même type que celui de l'attaque.`,
  },
  epicBoonOfSkill: {
    name: `Faveur de compétence`,
    description: `Vous recevez les bénéfices suivants.

**Augmentation de caractéristique**. Une valeur de caractéristique de votre choix augmente de 1, jusqu'à un maximum de 30.

**Polyvalence totale**. Vous gagnez la maîtrise de toutes les compétences.

**Expertise**. Choisissez une compétence pour laquelle vous n'avez pas l'Expertise et gagnez l'Expertise avec elle.`,
  },
  epicBoonOfDimensionalTravel: {
    name: `Faveur de déplacement dimensionnel`,
    description: `Vous recevez les bénéfices suivants.

**Augmentation de caractéristique**. Une valeur de caractéristique de votre choix augmente de 1, jusqu'à un maximum de 30.

**Entrechats dimensionnels**. Aussitôt après avoir effectué l'action Attaque ou Magie, vous pouvez vous téléporter d'un maximum de 9 m dans un espace inoccupé que vous voyez.`,
  },
  epicBoonOfNightSpirit: {
    name: `Faveur de l'esprit nocturne`,
    description: `Vous recevez les bénéfices suivants.

**Augmentation de caractéristique**. Une valeur de caractéristique de votre choix augmente de 1, jusqu'à un maximum de 30.

**Fusion avec l'ombre**. Tant que vous êtes dans une zone de Lumière faible ou de Ténèbres, vous pouvez vous octroyer l'état Invisible par une action Bonus. Cet état prend fin aussitôt après que vous avez entrepris une action, une action Bonus ou joué votre Réaction.

**Forme ombreuse**. Tant que vous êtes dans une zone de Lumière faible ou de Ténèbres, vous avez la Résistance à tous les dégâts hormis les dégâts psychiques et radiants.`,
  },
  epicBoonOfMagicMemory: {
    name: `Faveur de mémoire magique`,
    description: `Vous recevez les bénéfices suivants.

**Augmentation de caractéristique**. Votre valeur d'Intelligence, de Sagesse ou de Charisme augmente de 1, jusqu'à un maximum de 30.

**Incantation gratuite**. Chaque fois que vous lancez un sort avec un emplacement de sort du niveau 1er au 4e, lancez 1d4. Si le chiffre obtenu est égal au niveau de l'emplacement, celui-ci n'est pas dépensé.`,
  },
  epicBoonOfMartialProwess: {
    name: `Faveur de prouesse martiale`,
    description: `Vous recevez les bénéfices suivants.

**Augmentation de caractéristique**. Une valeur de caractéristique de votre choix augmente de 1, jusqu'à un maximum de 30.

**Visée infaillible**. Quand vous ratez un jet d'attaque, vous pouvez décider que cette attaque touche. Une fois ce bénéfice utilisé, vous ne pouvez plus y recourir jusqu'au début de votre tour suivant.`,
  },
  epicBoonOfRecovery: {
    name: `Faveur de récupération`,
    description: `Vous recevez les bénéfices suivants.

**Augmentation de caractéristique**. Une valeur de caractéristique de votre choix augmente de 1, jusqu'à un maximum de 30.

**Baroud d'honneur**. Une fois par Repos long, lorsque vous tomberiez à 0 point de vie, vous pouvez décider de tombez à 1 point de vie à la place et récupérez immédiatement un nombre de points de vie égal à la moitié de votre maximum. 

**Regain de vitalité**. Vous disposez d'une réserve de 10d10. Par une action Bonus, vous pouvez dépenser un nombre de ces dés et regagner des points de vie égaux au total. Vous récupérez tous les dés dépensés à la fin d'un Repos long.`,
  },
  epicBoonOfEnergyResistance: {
    name: `Faveur de résistance aux énergies`,
    description: `Vous recevez les bénéfices suivants.

**Augmentation de caractéristique**. Une valeur de caractéristique de votre choix augmente de 1, jusqu'à un maximum de 30.

**Résistances aux énergies**. Choisissez deux types de dégâts parmi : Acide, Froid, Feu, Foudre, Nécrotique, Poison, Psychique, Radiant, Tonnerre. Vous gagnez la Résistance aux types choisis et vous pouvez changer ces choix à la fin d'un Repos long.

**Détournement d'énergie**. Lorsque vous subissez des dégâts d'un type choisi, vous pouvez utiliser une Réaction pour diriger des dégâts du même type vers une créature que vous voyez dans un rayon de 18 m, qui n'est pas derrière un Abri total. Elle doit réussir un jet de sauvegarde de Dextérité (DD 8 + modificateur de Constitution + bonus de maîtrise) ou subir 2d12 + modificateur de Constitution de dégâts du même type.`,
  },
  epicBoonOfFortitude: {
    name: `Faveur de vigueur`,
    description: `Vous recevez les bénéfices suivants.

**Augmentation de caractéristique**. Une valeur de caractéristique de votre choix augmente de 1, jusqu'à un maximum de 30.

**Santé fortifié**. Vos points de vie maximum augmentent de 40. Une fois par tour, lorsque vous regagnez des points de vie, vous pouvez regagner un nombre de points de vie supplémentaires égal à votre modificateur de Constitution.`,
  },
  epicBoonOfTruesight: {
    name: `Faveur de vision lucide`,
    description: `Vous recevez les bénéfices suivants.

**Augmentation de caractéristique**. Une valeur de caractéristique de votre choix augmente de 1, jusqu'à un maximum de 30.

**Vision lucide**. Vous obtenez la Vision lucide avec une portée de 18 m.`,
  },
  epicBoonOfSpeed: {
    name: `Faveur de vitesse`,
    description: `Vous recevez les bénéfices suivants.

**Augmentation de caractéristique**. Une valeur de caractéristique de votre choix augmente de 1, jusqu'à un maximum de 30.

**Expert en désengagement**. Vous pouvez utiliser une action Bonus pour effectuer l'action Désengagement, qui met également un terme à l'état Agrippé.

**Vitesse accrue**. Votre vitesse augmente de 9 m.`,
  },
  epicBoonOfFate: {
    name: `Faveur du destin`,
    description: `Vous recevez les bénéfices suivants.

**Augmentation de caractéristique**. Une valeur de caractéristique de votre choix augmente de 1, jusqu'à un maximum de 30.

**Destin aiguillé**. Lorsque vous ou une créature que vous voyez dans un rayon de 18 m réussit ou échoue un test de d20, vous pouvez lancer 2d4 et appliquer le total comme bonus ou malus au jet de d20. Une fois ce bénéfice utilisé, vous ne pouvez plus l'utiliser avant d'avoir lancé l'Initiative ou terminé un Repos court ou long.`,
  },
  inspiringLeader: {
    name: `Figure de proue`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Sagesse ou Charisme de 1, jusqu'à un
maximum de 20.

**Représentation galvanisante**. Lorsque vous terminez un Repos court ou long, vous pouvez
donner une représentation inspirante : un discours, un chant ou une danse. Dans ce cas, choisissez jusqu'à six
alliés (vous pouvez vous choisir) dans un rayon de 9 mètres qui assistent à la représentation. Les créatures
choisies gagnent chacune des points de vie temporaires égaux à votre niveau de personnage plus le modificateur
de la caractéristique augmentée par ce don.`,
  },
  martialWeaponTraining: {
    name: `Formation aux armes de guerre`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force ou Dextérité de 1, jusqu'à un
maximum de 20.

**Maîtrise des armes**. Vous maîtrisez les armes de guerre.`,
  },
  durable: {
    name: `Gaillard`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Constitution de 1, jusqu'à un maximum de
20.

**Trompe-la-mort**. Vous bénéficiez d'un Avantage aux jets de sauvegarde contre la mort.

**Récupération rapide**. Par une action Bonus, vous pouvez dépenser un de vos Dés de vie,
lancer le dé et regagner un nombre de points de vie égal au résultat.`,
  },
  healer: {
    name: `Guérisseur`,
    description: `Vous bénéficiez des avantages suivants.

**Soigneur de bataille**. Si vous possédez une trousse de soins, vous pouvez dépenser une
utilisation et soigner une créature à 1,50 m ou moins de vous par une action Utilisation. Cette créature peut
dépenser un de ses Dés de vie, puis vous lancez ce dé. La créature récupère un nombre de points de vie égal au
résultat du jet plus votre bonus de maîtrise.

**Retirage des soins**. Chaque fois que vous lancez un dé pour déterminer le nombre de points
de vie que vous restaurez avec un sort ou avec l'avantage Médecin de combat de ce don, vous pouvez relancer le
dé si vous avez obtenu un 1, et devez utiliser le nouveau résultat.`,
  },
  spellSniper: {
    name: `Incantateur d'élite`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Intelligence, Sagesse ou Charisme de 1,
jusqu'à un maximum de 20.

**Contournement d'abri**. Vos attaques à distance avec des sorts ignorent les Abris partiels
(1/2) et les Abris importants (3/4).

**Incantation au corps à corps**. Être à 1,50 mètre ou moins d'un ennemi n'inflige pas de
Désavantage à vos jets d'attaque avec des sorts.

**Portée améliorée**. Lorsque vous lancez un sort d'une portée d'au moins 3 mètres et qui
nécessite un jet d'attaque, vous pouvez augmenter sa portée de 18 mètres.`,
  },
  magicInitiate: {
    name: `Initié à la magie`,
    description: `Vous bénéficiez des avantages suivants.

**Deux sorts mineurs**. Vous apprenez deux sorts mineurs de votre choix parmi la liste de sorts
de Clerc, Druide ou Magicien. L'Intelligence, la Sagesse ou le Charisme est votre caractéristique d'incantation
pour les sorts de ce don (à choisir lors de la sélection de ce don).

**Sort de niveau 1**. Choisissez un sort de niveau 1 dans la liste que vous avez sélectionnée
pour les sorts mineurs de ce don. Ce sort est toujours prêt. Vous pouvez le lancer une fois sans emplacement de
sort, et vous récupérez la possibilité de le lancer de cette manière à la fin d'un Repos long. Vous pouvez
également lancer le sort en utilisant un emplacement de sort que vous possédez.

**Changement de sort**. Chaque fois que vous gagnez un niveau, vous pouvez remplacer l'un des
sorts choisis pour ce don par un autre sort de même niveau, choisi dans la liste de sorts choisis.

**Répétable**. Vous pouvez prendre ce don plusieurs fois, mais vous devez choisir une liste de
sorts différente à chaque fois.`,
  },
  interception: {
    name: `Interception`,
    description: `Lorsqu'une créature que vous pouvez voir touche une autre créature à 1,50 m ou moins de
vous lors d'un jet d'attaque, vous pouvez prendre une Réaction pour réduire les dégâts infligés à la cible de
1d10 plus votre bonus de maîtrise. Vous devez tenir un bouclier ou une arme courante ou de guerre pour utiliser
cette Réaction.`,
  },
  warCaster: {
    name: `Mage de guerre`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Intelligence, Sagesse ou Charisme de 1,
jusqu'à un maximum de 20.

**Concentration**. Vous bénéficiez d'un Avantage aux jets de sauvegarde de Constitution que
vous effectuez pour maintenir votre concentration.

**Sort réactif**. Lorsqu'une créature provoque une Attaque d'opportunité de votre part en
quittant votre allonge, vous pouvez prendre une Réaction pour lancer un sort sur elle, au lieu d'effectuer une
Attaque d'opportunité. Le sort doit avoir un temps d'incantation d'une action et ne doit cibler que cette
créature.

**Composantes somatiques**. Vous pouvez exécuter les composantes somatiques des sorts même
lorsque vous avez des armes ou un bouclier dans une ou deux mains.`,
  },
  ritualCaster: {
    name: `Magie rituelle`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Intelligence, Sagesse ou Charisme de 1,
jusqu'à un maximum de 20.

**Sorts rituels**. Choisissez un nombre de sorts de niveau 1 qui possède l'étiquette Rituel
égal à votre bonus de maîtrise. Vous avez toujours ces sorts préparés et vous pouvez les lancer avec n'importe
quel emplacement de sort dont vous disposez. La caractéristique d'incantation de ces sorts est celle augmentée
par ce don. Chaque fois que votre bonus de maîtrise augmente par la suite, vous pouvez ajouter un sort
supplémentaire de niveau 1 avec l'étiquette Rituel aux sorts toujours préparés avec cette capacité.

**Rituel rapide**. Grâce à cet avantage, vous pouvez lancer un sort Rituel que vous avez
préparé en utilisant son temps d'incantation normal plutôt que le temps prolongé d'un rituel. Cela ne nécessite
pas d'emplacement de sort. Une fois que vous avez lancé le sort de cette manière, vous ne pouvez plus utiliser
cet avantage avant d'avoir terminé un Repos long.`,
  },
  crossbowExpert: {
    name: `Maître-arbalétrier`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Dextérité de 1, jusqu'à un maximum de 20.

**Chargement rapide**. Vous ignorez la propriété Chargement de l'arbalète de poing, de
l'arbalète lourde et de l'arbalète légère (toutes appelées arbalètes par la suite dans ce don). Si vous tenez
l'une d'elles, vous pouvez charger une munition même sans main libre.

**Tir au corps à corps**. Être à 1,50 mètre ou moins d'un ennemi n'inflige pas de Désavantage à
vos jets d'attaque avec des arbalètes.

**Arbalète secondaire**. Lorsque vous effectuez l'attaque supplémentaire de la propriété
Légère, vous pouvez ajouter votre modificateur de caractéristique aux dégâts de l'attaque supplémentaire si
cette attaque est effectuée avec une arbalète qui possède la propriété Légère et que vous n'ajoutez pas déjà ce
modificateur aux dégâts.`,
  },
  weaponMaster: {
    name: `Maître d'armes`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force ou Dextérité de 1, jusqu'à un
maximum de 20.

**Propriété botte**. Votre formation aux armes vous permet d'utiliser la botte d'un type d'arme
courante ou de guerre de votre choix, à condition de maîtriser ce type d'arme. À la fin d'un Repos long, vous
pouvez changer de type d'arme pour un autre type d'arme éligible.`,
  },
  polearmMaster: {
    name: `Maître d'hast`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Dextérité ou Force de 1, jusqu'à un
maximum de 20.

**Frappe double**. Immédiatement après avoir pris l'action Attaque et attaqué avec un Bâton,
une Lance ou une arme possédant les propriétés Lourde et Allonge, vous pouvez utiliser une action Bonus pour
effectuer une attaque au corps à corps avec l'extrémité opposée de l'arme. L'arme inflige des dégâts
contondants, et le dé de dégâts de l'arme pour cette attaque est un d4.

**Frappe réactive**. Lorsque vous tenez un Bâton, une Lance ou une arme possédant les
propriétés Lourde et Allonge, vous pouvez prendre une Réaction pour effectuer une attaque au corps à corps
contre une créature qui entre dans l'allonge de cette arme.`,
  },
  heavyWeaponMaster: {
    name: `Maître des armes lourdes|Cogneur lourd`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force de 1, jusqu'à un maximum de 20.

**Expert en armes lourdes**. Lorsque vous touchez une créature avec une arme possédant la
propriété Lourde lors de l'action Attaque à votre tour, vous pouvez infliger des dégâts supplémentaires à la
cible. Ces dégâts supplémentaires sont égaux à votre bonus de maîtrise.

**Abattage**. Immédiatement après avoir réussi un Coup critique avec une arme de corps à corps
ou réduit une créature à 0 point de vie avec une telle arme, vous pouvez effectuer une attaque avec la même arme
en tant qu'action Bonus.`,
  },
  mediumArmorMaster: {
    name: `Maître des armures intermédiaires`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force ou Dextérité de 1, jusqu'à un
maximum de 20.

**Porteur agile**. Lorsque vous portez une armure intermédiaire, vous pouvez ajouter 3 au lieu
de 2 à votre CA si votre Dextérité est de 16 ou plus.`,
  },
  heavyArmorMaster: {
    name: `Maître des armures lourdes`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Constitution ou Force de 1, jusqu'à un
maximum de 20.

**Réduction des dégâts**. Lorsque vous êtes touché par une attaque alors que vous portez une
armure lourde, les dégâts contondants, perforants et tranchants infligés par cette attaque sont réduits d'un
montant égal à votre bonus de maîtrise.`,
  },
  shieldMaster: {
    name: `Maître des boucliers`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force de 1, jusqu'à un maximum de 20.

**Coup de bouclier**. Si vous attaquez une créature à 1,50 m ou moins de vous lors de l'action
Attaque et que vous la touchez avec une arme de corps à corps, vous pouvez immédiatement frapper la cible avec
votre bouclier si vous en êtes équipé, la forçant à effectuer un jet de sauvegarde de Force (DD 8 plus votre
modificateur de Force et votre bonus de maîtrise). En cas d'échec, vous pouvez repousser la cible de 1,50 m ou
la faire tomber À terre (au choix). Vous ne pouvez utiliser cet avantage qu'une seule fois par tour.

**Interposition de bouclier**. Si vous êtes soumis à un effet vous permettant d'effectuer un
jet de sauvegarde de Dextérité pour ne subir que la moitié des dégâts, vous pouvez prendre une Réaction pour ne
subir aucun dégât si vous réussissez le jet de sauvegarde et que vous portez un bouclier.`,
  },
  mobile: {
    name: `Mobile`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Dextérité ou Constitution de 1, jusqu'à un
maximum de 20.

**Vitesse améliorée**. Votre vitesse augmente de 3 mètres.

**Pointe sur Terrain difficile**. Lorsque vous prenez l'action Pointe pendant votre tour, un
terrain difficile ne vous coûte pas un mouvement supplémentaire pour le reste de ce tour.

**Déplacement agile**. Les attaques d'opportunité ont un Désavantage contre vous.`,
  },
  musician: {
    name: `Musicien`,
    description: `Vous bénéficiez des avantages suivants.

**Formation aux instruments**. Vous maîtrisez trois instruments de musique de votre choix.

**Chant d'encouragement**. À la fin d'un Repos court ou long, vous pouvez jouer une chanson
avec un instrument de musique que vous maîtrisez et donner une Inspiration héroïque aux alliés qui l'entendent.
Le nombre d'alliés que vous pouvez affecter de cette manière est égal à votre bonus de maîtrise.`,
  },
  observant: {
    name: `Observateur`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Intelligence ou Sagesse de 1, jusqu'à un
maximum de 20.

**Observateur attentif**. Choisissez l'une des compétences suivantes : Intuition, Investigation
ou Perception. Si vous ne maîtrisez pas la compétence choisie, vous la maîtrisez ; si vous la maîtrisez déjà,
vous gagnez Expertise pour celle-ci.

**Observation rapide**. Vous pouvez prendre l'action Observation en tant qu'action Bonus.`,
  },
  protection: {
    name: `Protection`,
    description: `Lorsqu'une créature que vous pouvez voir attaque une cible autre que vous située à 1,50
mètre ou moins de vous, vous pouvez prendre une Réaction pour interposer votre bouclier si vous en tenez un.
Vous infligez un Désavantage au jet d'attaque déclencheur et à tous les autres jets d'attaque contre la cible
jusqu'au début de votre prochain tour si vous restez à 1,50 mètre ou moins de la cible.`,
  },
  mediumArmorTraining: {
    name: `Protection intermédiaire`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force ou Dextérité de 1, jusqu'à un
maximum de 20.

**Formation aux armures**. Vous recevez la formation aux armures intermédiaires.`,
  },
  lightArmorTraining: {
    name: `Protection légère`,
    description: `Vous bénéficiez des avantages suivants :

**Augmentation de caractéristique**. Augmentez votre Force ou Dextérité de 1, jusqu'à un
maximum de 20.

**Formation aux armures**. Vous recevez la formation aux armures légères et aux boucliers.`,
  },
  heavyArmorTraining: {
    name: `Protection lourde`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Constitution ou Force de 1, jusqu'à un
maximum de 20.

**Formation aux armures**. Vous recevez la formation aux armures lourdes.`,
  },
  resilient: {
    name: `Résilient`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Choisissez une caractéristique pour laquelle vous ne
maîtrisez pas les jets de sauvegarde. Augmentez la caractéristique choisie de 1, jusqu'à un maximum de 20.

**Maîtrise des jets de sauvegarde**. Vous gagnez la maîtrise des jets de sauvegarde avec la
caractéristique choisie.`,
  },
  tough: {
    name: `Robuste`,
    description: `Vos points de vie maximum augmentent d'un montant égal à deux fois votre niveau de
personnage lorsque vous obtenez ce don. Chaque fois que vous gagnez un niveau de personnage par la suite, vos
points de vie maximum augmentent de 2 points de vie supplémentaires.`,
  },
  savageAttacker: {
    name: `Sauvagerie martiale`,
    description: `Vous avez été formé à infliger des coups particulièrement dévastateurs. Une fois par
tour, lorsque vous touchez une cible avec une arme, vous pouvez lancer deux fois les dés de dégâts de l'arme et
utiliser le résultat que vous souhaitez contre la cible.`,
  },
  sentinel: {
    name: `Sentinelle`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force ou Dextérité de 1, jusqu'à un
maximum de 20.

**Gardien**. Immédiatement après qu'une créature à 1,50 mètre ou moins de vous prend l'action
Désengagement ou touche une cible autre que vous avec une attaque, vous pouvez effectuer une attaque
d'opportunité contre cette créature.

**Immobilisation**. Lorsque vous touchez une créature avec une attaque d'opportunité, sa
vitesse devient 0 pour le reste du tour en cours.`,
  },
  telekinetic: {
    name: `Télékinésiste`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Intelligence, Sagesse ou Charisme de 1,
jusqu'à un maximum de 20.

**Télékinésie mineure**. Vous apprenez le sort *main de mage*. Vous pouvez le lancer sans
composantes verbale ou somatique, vous pouvez rendre la main spectrale invisible, et sa portée ainsi que la
distance à laquelle elle peut se trouver augmentent de 9 mètres lorsque vous le lancez. La caractéristique
d'incantation du sort est celle augmentée par ce don.

**Bourrade télékinétique**. Par une action Bonus, vous pouvez pousser télékinétiquement une
créature que vous pouvez voir dans un rayon de 9 mètres. Dans ce cas, la cible doit réussir un jet de sauvegarde
de Force (DD 8 plus le modificateur de la caractéristique augmentée par ce don et votre bonus de maîtrise) ou
être déplacée de 1,50 mètre vers vous ou loin de vous.`,
  },
  telepathic: {
    name: `Télépathe`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Intelligence, Sagesse ou Charisme de 1,
jusqu'à un maximum de 20.

**Parole télépathique**. Vous pouvez parler par télépathie à toute créature que vous pouvez
voir dans un rayon de 18 mètres. Vos paroles télépathiques sont dans une langue que vous connaissez, et la
créature ne vous comprend que si elle connaît cette langue. Votre communication ne lui confère pas la capacité
de vous répondre par télépathie.

**Détection des pensées**. Vous avez toujours le sort *détection des pensées* préparé. Vous
pouvez le lancer sans emplacement de sort ni composantes de sort, et vous devez terminer un Repos long avant de
pouvoir le lancer à nouveau de cette manière. Vous pouvez également le lancer en utilisant vos emplacements de
sorts du niveau approprié. Votre caractéristique d'incantation pour le sort est la caractéristique augmentée par
ce don.`,
  },
  sharpshooter: {
    name: `Tireur d'élite`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Dextérité de 1, jusqu'à un maximum de 20.

**Contournement d'abri**. Vos attaques à distance avec des armes ignorent les Abris partiels
(1/2) et les Abris importants (3/4).

**Tir au corps à corps**. Être à 1,50 mètre ou moins d'un ennemi n'inflige pas de Désavantage à
vos jets d'attaque avec des armes à distance.

**Longue portée**. Attaquer à longue portée n'inflige pas de Désavantage à vos jets d'attaque
avec des armes à distance.`,
  },
  slasher: {
    name: `Trancheur`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force ou Dextérité de 1, jusqu'à un
maximum de 20.

**Coupe-jarret**. Une fois par tour, lorsque vous touchez une créature avec une attaque
infligeant des dégâts tranchants, vous pouvez réduire la vitesse de cette créature de 3 mètres jusqu'au début de
votre prochain tour.

**Critique amélioré**. Lorsque vous réussissez un Coup critique infligeant des dégâts
tranchants à une créature, celle-ci subit un Désavantage aux jets d'attaque jusqu'au début de votre prochain
tour.`,
  },
  mageSlayer: {
    name: `Tueur de mages`,
    description: `Vous bénéficiez des avantages suivants.

**Augmentation de caractéristique**. Augmentez votre Force ou Dextérité de 1, jusqu'à un
maximum de 20.

**Briseur de concentration**. Lorsque vous infligez des dégâts à une créature en concentration,
celle-ci a un Désavantage au jet de sauvegarde qu'elle effectue pour maintenir sa Concentration.

**Esprit préservé**. Si vous ratez un jet de sauvegarde d'Intelligence, de Sagesse ou de
Charisme, vous pouvez le transformer en succès. Une fois cet avantage utilisé, vous ne pouvez plus l'utiliser
avant d'avoir terminé un Repos court ou long.`,
  },
  alert: {
    name: `Vigilant`,
    description: `Vous bénéficiez des avantages suivants.

**Maîtrise de l'Initiative**. Lorsque vous lancez l'Initiative, vous pouvez ajouter votre bonus
de maîtrise à votre jet.

**Échange d'Initiative**. Immédiatement après avoir lancé une Initiative, vous pouvez échanger
votre Initiative avec celle d'un allié consentant au cours du même combat. Cet échange est impossible si vous ou
l'allié êtes Incapable d'agir.`,
  },
}
