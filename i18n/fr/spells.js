export default {
  enlargeReduce: {
    name: `Agrandissement/rapetissement`,
    description: `Pendant
la durée du sort, le sort agrandit ou réduit une créature ou un objet
que vous pouvez voir à portée (voir l'effet choisi ci-dessous). L'objet
ciblé ne doit pas être porté. Si la cible est une créature non
consentante, elle peut effectuer un jet de sauvegarde de Constitution.
En cas de jet de sauvegarde réussi, le sort est sans effet.
Tout ce
que porte la créature ciblée change de taille avec elle. Tout objet
qu'elle laisse tomber reprend immédiatement sa taille normale. Une arme
de jet ou une munition reprend sa taille normale immédiatement après
avoir touché ou manqué une cible.
**Agrandissement**. La
taille de la cible augmente d'une catégorie, de Moyenne à Grande, par
exemple. La cible bénéficie également d'un Avantage aux jets de Force et
aux jets de sauvegarde de Force. Les attaques de la cible avec ses
armes agrandies ou ses Frappes à mains nues infligent 1d4 dégâts
supplémentaires en cas de succès.
**Rapetissement**. La
taille de la cible diminue d'une catégorie, de Moyenne à Petite, par
exemple. La cible bénéficie également d'un Désavantage aux jets de Force
et aux jets de sauvegarde de Force. Les attaques de la cible avec ses
armes réduites ou ses Frappes à mains nues infligent 1d4 dégâts de moins
quand elles touchent (cela ne peut pas réduire les dégâts en dessous de
1).`,
  },
  aid: {
    name: `Aide`,
    description: `Choisissez
jusqu'à trois créatures à portée. Les points de vie maximum et actuels
de chaque cible augmentent de 5 pendant la durée.
***Emplacement de niveau supérieur***.
Les points de vie de chaque cible augmentent de 5 pour chaque niveau d'emplacement de sort supérieur à 2.`,
  },
  alarm: {
    name: `Alarme`,
    description: `Vous
mettez en place une alarme contre les intrusions. Choisissez une porte,
une fenêtre ou une zone à portée ne dépassant pas un Cube de 6 mètres
de côté. Jusqu'à la fin du sort, une alarme vous alerte dès qu'une
créature touche ou pénètre dans la zone protégée. Lorsque vous lancez le
sort, vous pouvez désigner des créatures qui ne déclencheront pas
l'alarme. Vous pouvez également choisir si l'alarme est sonore ou
mentale :
**Alarme sonore**. L'alarme produit le
son d'une clochette qui s'entend dans un rayon de 18 mètres autour de la
zone protégée pendant 10 secondes.
**Alarme mentale**.
Vous êtes alerté par un signal mental si vous vous trouvez à moins de
1,5 km de la zone protégée. Ce signal vous réveille si vous dormez.`,
  },
  befuddlement: {
    name: `Aliénation`,
    description: ``,
  },
  planarAlly: {
    name: `Allié planaire`,
    description: ``,
  },
  enhanceAbility: {
    name: `Amélioration de caractéristique`,
    description: `Vous
touchez une créature et choisissez entre Force, Dextérité,
Intelligence, Sagesse ou Charisme. Pendant toute la durée du sort, la
cible obtient un Avantage aux jets de caractéristique utilisant la
caractéristique choisie.
***Emplacement de niveau supérieur***.
Vous pouvez cibler une créature supplémentaire pour chaque niveau
d'emplacement de sort supérieur à 2. Vous pouvez choisir une
caractéristique différente pour chaque cible.`,
  },
  friends: {
    name: `Amis|Faux amis`,
    description: `Vous
émettez magiquement un sentiment d'amitié envers une créature que vous
pouvez voir à portée. La cible doit réussir un jet de sauvegarde de
Sagesse ou subir l'état Charmé pendant toute la durée du sort. La cible
réussit automatiquement si elle n'est pas humanoïde, si vous la
combattez ou si vous avez lancé ce sort sur elle au cours des dernières
24 heures.
Le sort prend fin prématurément si la cible subit des
dégâts, si vous effectuez un jet d'attaque, infligez des dégâts ou
forcez quelqu'un à effectuer un jet de sauvegarde. À la fin du sort, la
cible sait que vous l'avez charmée.`,
  },
  animalFriendship: {
    name: `Amitié avec les animaux`,
    description: `Ciblez
une bête que vous pouvez voir à portée. La cible doit réussir un jet de
sauvegarde de Sagesse ou subir l'état Charmé pendant toute la durée du
sort. Si vous ou l'un de vos alliés infligez des dégâts à la cible, le
sort prend fin.
***Emplacement de niveau supérieur***. Vous pouvez cibler une bête
supplémentaire pour chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  animateDead: {
    name: `Animation des morts`,
    description: `Choisissez
un tas d'os ou le cadavre d'un humanoïde de taille M ou S à portée. La
cible devient une créature morte-vivante : un **squelette** si vous choisissez des os ou un
**zombi** si vous choisissez un cadavre.
À
chacun de vos tours, vous pouvez prendre une action Bonus pour
commander mentalement toute créature créée avec ce sort si elle se
trouve dans un rayon de 18 mètres autour de vous (si vous contrôlez
plusieurs créatures, vous pouvez les toutes commander simultanément, en
leur donnant le même ordre). Vous décidez de l'action que la créature
effectuera et de son mouvement lors de son prochain tour, ou vous pouvez
lui donner un ordre général, comme garder une chambre ou un couloir. Si
vous ne donnez aucun ordre, la créature prend l'action Esquive et se
déplace uniquement pour éviter d'être blessée. Une fois l'ordre donné,
la créature continue de l'exécuter jusqu'à ce que sa tâche soit
accomplie.
La créature est sous votre contrôle pendant 24 heures,
après quoi elle cesse d'obéir à vos ordres. Pour conserver le contrôle
de la créature pendant 24 heures supplémentaires, vous devez relancer ce
sort sur elle avant la fin de la période de 24 heures en cours. Cette
utilisation du sort rétablit votre contrôle sur un maximum de quatre
créatures animées avec ce sort, au lieu d'en animer une nouvelle.
***Emplacement de niveau
supérieur***.
Vous animez ou rétablissez le contrôle sur deux morts-vivants
supplémentaires pour chaque niveau d'emplacement de sort supérieur à 3.
Chaque créature doit provenir d'un cadavre ou d'un tas d'ossements
différent.`,
  },
  animateObjects: {
    name: `Animation des objets`,
    description: `Les
objets s'animent à votre commande. Choisissez un nombre d'objets non
magiques à portée qui ne soient pas portés, pas fixés à une surface et
pas de taille Gig. Le nombre maximal d'objets est égal à votre
modificateur de caractéristique d'incantation ; pour ce nombre, une
cible de taille M ou inférieure compte pour un objet, une cible de
taille G compte pour deux et une cible de taille TG compte pour trois.
Chaque cible s'anime, se voit pousser
des jambes et devient un Artificiel utilisant le profil d'**objet animé** ;
cette créature est sous votre contrôle jusqu'à la fin du sort ou
jusqu'à ce que ses points de vie soient réduits à 0. Chaque créature
créée avec ce sort est votre allié et celui de vos alliés. En combat,
elle partage votre Initiative et joue son tour immédiatement après le
vôtre. Jusqu'à la fin du sort, vous pouvez prendre une action Bonus pour
commander mentalement toute créature créée avec ce sort si elle se
trouve dans un rayon de 150 mètres (si vous contrôlez plusieurs
créatures, vous pouvez commander n'importe laquelle d'entre elles
simultanément, en leur donnant le même ordre). Si vous ne donnez aucun
ordre, la créature prend l'action Esquive et se déplace uniquement pour
éviter d'être blessée. Lorsque la créature tombe à 0 point de vie, elle
reprend sa forme d'objet et les dégâts restants sont reportés sur cette
forme.
***Emplacement de niveau supérieur***. Les
dégâts de Coup de la créature augmentent de 1d4 (taille M ou
inférieure), 1d6 (taille G) ou 1d12 (taille TG) pour chaque niveau
d'emplacement de sort supérieur à 5.`,
  },
  nondetection: {
    name: `Antidétection`,
    description: `Pendant
la durée du sort, vous protégez une cible que vous touchez des sorts de
divination. La cible peut être une créature consentante, ou un lieu ou
un objet mesurant moins de 3 mètres de large, quelle que soit sa
dimension. La cible ne peut alors être ciblée par aucun sort de
Divination ni détectée par des capteurs de scrutation magique.`,
  },
  calmEmotions: {
    name: `Apaisement des émotions`,
    description: `Tout
humanoïde dans une Sphère de 6 mètres de rayon centrée sur un point de
votre choix à portée doit réussir un jet de sauvegarde de Charisme ou
être affecté par l'un des effets suivants (à choisir pour chaque
créature) :
- La créature est immunisée contre les états Charmé
et Effrayé jusqu'à la fin du sort. Si la créature était déjà charmée ou
effrayée, ces conditions sont supprimées pendant la durée du sort.
- 
La créature devient indifférente aux créatures de votre choix envers
lesquelles elle est hostile. Cette indifférence prend fin si la cible
subit des dégâts ou voit ses alliés subir des dégâts. À la fin du sort,
l'attitude de la créature redevient normale.`,
  },
  seeming: {
    name: `Apparence trompeuse`,
    description: `Vous
donnez une apparence illusoire à toute créature de votre choix que vous
pouvez voir à portée. Une cible non consentante peut effectuer un jet
de sauvegarde de Charisme et, en cas de réussite, elle n'est pas
affectée par ce sort.
Vous pouvez donner la même apparence ou des
apparences différentes aux cibles. Le sort peut modifier l'apparence du
corps et de l'équipement des cibles. Vous pouvez faire paraître chaque
créature plus petite ou plus grande de 30 cm, plus lourde ou plus
légère. La nouvelle apparence d'une cible doit avoir la même disposition
de membres que la cible, mais l'étendue de l'illusion est à votre
discrétion.
Les changements apportés par ce sort ne résistent pas à
une inspection physique. Par exemple, si vous utilisez ce sort pour
ajouter un chapeau à la tenue d'une créature, les objets passent à
travers le chapeau.
Une créature qui prend l'action Étude pour
examiner une cible peut effectuer un jet d'Intelligence (Investigation)
contre le DD de sauvegarde de votre sort. En cas de réussite, elle se
rend compte que la cible est déguisée.`,
  },
  findSteed: {
    name: `Appel de destrier`,
    description: `Vous
invoquez un être surnaturel qui apparaît comme un destrier fidèle dans
une case libre de votre choix à portée. Cette créature utilise le profil
de la **monture
d'Outremonde**. Si vous possédez déjà un destrier grâce à ce sort, il est remplacé par ce
nouveau.
Le
destrier ressemble à un animal de taille G de votre choix, comme un
cheval, un chameau, un loup sanguinaire ou un élan. Chaque fois que vous
lancez ce sort, choisissez le type de créature du
destrier (Céleste, Fée ou Fiélon), qui détermine certains traits du
profil.
**Combat**. Le destrier est votre allié et
celui de vos alliés. En combat, il partage votre Initiative et
fonctionne comme une monture contrôlée lorsque vous le montez (comme
défini dans les règles du combat monté). Si vous avez l'état Incapable
d'agir, le destrier prend son tour immédiatement après le vôtre et agit
seul, se concentrant sur votre protection.
**Disparition de la monture**.
Le destrier disparaît s'il tombe à 0 point de vie ou si vous mourez.
Lorsqu'il disparaît, il laisse derrière lui tout ce qu'il portait. Si
vous relancez ce sort, vous décidez si vous invoquez le destrier disparu
ou un autre.
***Emplacement de niveau supérieur***. Utilisez le niveau de l'emplacement
de sort pour le niveau du sort dans le profil.`,
  },
  findFamiliar: {
    name: `Appel de familier`,
    description: `Vous obtenez les services d'un familier, un esprit qui prend une forme animale de votre
choix : **chauve-souris, chat, grenouille, faucon, lézard, pieuvre, chouette, rat, corbeau, araignée, belette**
ou autre Bête dont le FP est de 0. Il apparait dans une case libre à
portée et possède le profil de la forme choisie, mais est du type
Céleste, Fée ou Fiélon (selon votre choix) au lieu de Bête. Votre
familier agit indépendamment de vous, mais obéit à vos ordres.
**Lien télépathique**.
Tant que votre familier est dans un rayon de 30 mètres autour de vous,
vous pouvez communiquer avec lui par télépathie. De plus, par une action
Bonus, vous pouvez voir à travers les yeux du familier et entendre ce
qu'il entend jusqu'au début de votre prochain tour, bénéficiant ainsi
des avantages de ses sens spéciaux. Enfin, lorsque vous lancez un sort
dont la portée est de contact, votre familier peut appliquer le contact.
Votre familier doit se trouver dans un rayon de 30 mètres et doit
prendre une Réaction pour appliquer le contact lorsque vous lancez le
sort.
**Combat**. Le familier est votre allié et celui
de vos alliés. Il lance sa propre Initiative et agit à son tour. Un
familier ne peut pas attaquer mais peut effectuer d'autres actions
normalement.
**Disparition du familier**. Lorsque le
familier tombe à 0 point de vie, il disparaît. Il réapparaît si vous
lancez ce sort à nouveau. Par une action Magie, vous pouvez renvoyer
temporairement le familier dans une niche dimensionnelle. Vous pouvez
également le renvoyer définitivement. Par une action Magie, tant qu'il
est temporairement renvoyé, vous pouvez le faire réapparaître dans un
espace inoccupé dans un rayon de 9 mètres. Chaque fois que le familier
tombe à 0 point de vie ou disparaît dans la niche dimensionnelle, il
laisse derrière lui tout ce qu'il portait.
**Un seul familier**.
Vous ne pouvez pas avoir plus d'un familier à la fois. Si vous lancez
ce sort alors que vous avez un familier, il adopte une nouvelle forme
valide.`,
  },
  callLightning: {
    name: `Appel de la foudre`,
    description: `Un
nuage d'orage apparaît à un point visible au-dessus de vous. Il prend
la forme d'un Cylindre de 3 mètres de haut et de 18 mètres de rayon.
Lorsque
vous lancez le sort, choisissez un point visible sous le nuage. Un
éclair jaillit du nuage jusqu'à ce point. Toute créature dans un rayon
de 1,50 mètre effectue un jet de sauvegarde de Dextérité, subissant 3d10
dégâts de foudre en cas d'échec ou la moitié de ces dégâts en cas de
réussite.
Jusqu'à la fin du sort, vous pouvez prendre une action
Magie pour invoquer à nouveau la foudre de cette manière, en ciblant le
même point ou un autre.
Si vous êtes à l'extérieur sous un orage
lorsque vous lancez ce sort, celui-ci vous donne le contrôle de cet
orage au lieu d'en créer un nouveau. Dans ces conditions, les dégâts du
sort augmentent de 1d10.
***Emplacement de niveau supérieur***. Les dégâts augmentent de
1d10 pour chaque niveau d'emplacement de sort supérieur à 3.`,
  },
  elementalWeapon: {
    name: `Arme élémentaire`,
    description: `Une
arme non magique que vous touchez devient une arme magique. Choisissez
l'un des types de dégâts suivants : acide, froid, feu, foudre ou
tonnerre. Pendant la durée du sort, l'arme bénéficie d'un bonus de +1
aux jets d'attaque et inflige 1d4 dégâts supplémentaires du type choisi
lorsqu'elle touche.
***Emplacement de niveau supérieur***.
Si vous utilisez un emplacement de sort de niveau 5 ou 6, le bonus aux
jets d'attaque passe à +2 et les dégâts supplémentaires à 2d4. Si vous
utilisez un emplacement de sort de niveau 7 ou supérieur, le bonus passe
à +3 et les dégâts supplémentaires à 3d4.`,
  },
  magicWeapon: {
    name: `Arme magique`,
    description: `Vous
touchez une arme non magique. Jusqu'à la fin du sort, cette arme
devient une arme magique avec un bonus de +1 aux jets d'attaque et de
dégâts. Le sort prend fin prématurément si vous le relancez.
***Emplacement de niveau
supérieur***.
Le bonus passe à +2 avec un emplacement de sort de niveau 3 à 5. Le
bonus passe à +3 avec un emplacement de sort de niveau 6 ou supérieur.`,
  },
  spiritualWeapon: {
    name: `Arme spirituelle`,
    description: `Vous créez une force spectrale flottante ressemblant à une arme de votre choix et qui
dure toute la durée du sort.
La
force apparaît à portée, dans un espace de votre choix, et vous pouvez
immédiatement effectuer une attaque de sort au corps à corps contre une
créature à 1,50 mètre ou moins de la force. Si l'attaque touche, la
cible subit des dégâts de force égaux à 1d8, plus le modificateur de
votre caractéristique d'incantation.
Par une action Bonus lors de vos
tours suivants, vous pouvez déplacer la force jusqu'à 6 mètres et
répéter l'attaque contre une créature à 1,50 mètre ou moins.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d8 pour chaque niveau d'emplacement de sort supérieur à
2.`,
  },
  armorOfAgathys: {
    name: `Armure d'Agathys`,
    description: `Un
givre magique protecteur vous enveloppe. Vous gagnez 5 points de vie
temporaires. Si une créature vous touche avec un jet d'attaque au corps à
corps avant la fin du sort, elle subit 5 dégâts de froid. Le sort prend
fin prématurément si vous n'avez plus de points de vie temporaires.
***Emplacement de niveau
supérieur***. Les points de vie temporaires et les dégâts de froid augmentent de 5 pour chaque
niveau d'emplacement de sort supérieur à 1.`,
  },
  mageArmor: {
    name: `Armure de mage`,
    description: `Vous
touchez une créature consentante qui ne porte pas d'armure. Jusqu'à la
fin du sort, la CA de base de la cible passe à 13, plus son modificateur
de Dextérité. Le sort prend fin prématurément si la cible enfile une
armure.`,
  },
  timeStop: {
    name: `Arrêt du temps`,
    description: ``,
  },
  acidSplash: {
    name: `Aspersion d'acide`,
    description: `Vous
créez une bulle acide en un point à portée, où elle explose dans une
Sphère de 1,50 mètre de rayon. Toute créature dans cette Sphère doit
réussir un jet de sauvegarde de Dextérité ou subir 1d6 dégâts d'acide.
***Amélioration de sort
mineur***. Les dégâts augmentent de 1d6 lorsque vous atteignez les niveaux 5 (2d6), 11 (3d6) et
17 (4d6).`,
  },
  phantasmalKiller: {
    name: `Assassin imaginaire`,
    description: `Vous
sondez les cauchemars d'une créature que vous pouvez voir à portée et
créez une illusion de ses peurs les plus profondes, visible uniquement
par cette créature. La cible effectue un jet de sauvegarde de Sagesse.
En cas d'échec, elle subit 4d10 dégâts psychiques et subit un
Désavantage aux jets de caractéristique et d'attaque pendant toute la
durée du sort. En cas de réussite, elle subit seulement la moitié des
dégâts et le sort prend fin.
Pendant toute la durée du sort, la cible
effectue un jet de sauvegarde de Sagesse à la fin de chacun de ses
tours. En cas d'échec, elle subit à nouveau les dégâts psychiques. En
cas de réussite, le sort prend fin.
***Emplacement de niveau supérieur***. Les dégâts
augmentent de 1d10 pour chaque niveau d'emplacement de sort supérieur à 4.`,
  },
  guidance: {
    name: `Assistance`,
    description: `Vous
touchez une créature consentante et choisissez une compétence. Jusqu'à
la fin du sort, la créature ajoute 1d4 à tout jet de caractéristique
utilisant la compétence choisie.`,
  },
  augury: {
    name: `Augure`,
    description: `Vous
recevez un présage d'une entité surnaturelle concernant les résultats
d'une action que vous prévoyez d'entreprendre dans les 30 prochaines
minutes. Le MD choisit le présage dans la table suivantes.

Présage
Pour une issue qui s'annonce...

Fortune
Favorable

Misère
Défavorable

Fortune et misère
Favorable et défavorable

Indifférence
Ni favorable ni défavorable

Le
sort ne tient pas compte des circonstances, telles que d'autres sorts,
qui pourraient modifier les résultats. Si vous lancez le sort plus d'une
fois avant de terminer un Repos long, il y a 25 % de chances
cumulatives pour chaque lancement après le premier que vous n'obteniez
aucune réponse.`,
  },
  auraOfPurity: {
    name: `Aura de pureté`,
    description: `Une
aura rayonne autour de vous sous forme d'Émanation de 9 mètres pendant
toute la durée du sort. Tant que vous êtes dans l'aura, vous et vos
alliés bénéficiez d'une résistance aux dégâts de poison et d'un Avantage
aux jets de sauvegarde pour éviter ou mettre fin aux états Aveuglé,
Charmé, Assourdi, Effrayé, Paralysé, Empoisonné ou Étourdi.`,
  },
  auraOfLife: {
    name: `Aura de vie`,
    description: `Une
aura rayonne autour de vous sous forme d'Émanation de 9 mètres pendant
toute la durée du sort. Tant que vous êtes dans l'aura, vous et vos
alliés bénéficiez d'une résistance aux dégâts nécrotiques, et vos points
de vie maximum ne peuvent pas être réduits. Si un allié avec 0 point de
vie commence son tour dans l'aura, il récupère 1 point de vie.`,
  },
  auraOfVitality: {
    name: `Aura de vitalité`,
    description: `Une
aura rayonne autour de vous sous forme d'Émanation de 9 mètres pour
toute la durée du sort. Lorsque vous créez l'aura et au début de chacun
de vos tours tant qu'elle persiste, vous pouvez restaurer 2d6 points de
vie à une créature qui s'y trouve.`,
  },
  crusadersMantle: {
    name: `Aura du croisé`,
    description: `Une
aura magique rayonne autour de vous sous forme d'Émanation de 9 mètres.
Dans cette aura, vous et vos alliés infligez chacun 1d4 points de
dégâts radiants supplémentaires lorsque vous touchez avec une arme ou
avec une frappe à mains nues.`,
  },
  nystulsMagicAura: {
    name: `Aura magique de Nystul`,
    description: `D'un
simple contact, vous placez une illusion sur une créature consentante
ou sur un objet qui n'est pas porté. Une créature bénéficie de l'effet
Masque et un objet de l'effet Aura factice (voir ci-dessous). L'effet
dure toute la durée du sort. Si vous lancez le sort sur la même cible
chaque jour pendant 30 jours, l'illusion persiste jusqu'à dissipation.
**Masque (créature)**.
Choisissez un type de créature différent du type réel de la cible. Les
sorts et autres effets magiques traitent la cible comme si elle était
une créature du type choisi.
**Aura factice (objet)**. Vous modifiez l'apparence de la cible aux
sorts et effets magiques qui détectent les auras magiques, comme *détection de la magie*.
Vous pouvez donner à un objet non magique une apparence magique, à un
objet magique une apparence non magique, ou modifier l'aura de l'objet
pour qu'il semble appartenir à l'école de magie de votre choix.`,
  },
  holyAura: {
    name: `Aura sacrée`,
    description: ``,
  },
  antipathySympathy: {
    name: `Aversion/attirance`,
    description: ``,
  },
  glibness: {
    name: `Bagou`,
    description: ``,
  },
  goodberry: {
    name: `Baies nourricières`,
    description: `Dix
baies imprégnées de magie pendant toute la durée du sort apparaissent
dans votre main. Une créature peut prendre une action Bonus pour en
manger une. Manger une baie restaure 1 point de vie et fournit
suffisamment de nourriture pour nourrir une créature pendant une
journée.
Les baies non consommées disparaissent à la fin du sort.`,
  },
  banishment: {
    name: `Bannissement`,
    description: `Une
créature que vous pouvez voir à portée doit réussir un jet de
sauvegarde de Charisme ou être transportée sur un demi-plan inoffensif
pendant la durée du sort. Là, la cible subit l'état Incapable d'agir. À
la fin du sort, la cible réapparaît dans la case qu'elle a quittée ou
dans la case libre la plus proche si cette case est occupée.
Si la
cible est une aberration, un céleste, un élémentaire, une fée ou un
fiélon, elle ne revient pas si le sort dure 1 minute. Elle est
transportée vers un emplacement aléatoire sur un plan (au choix du MD)
associé à son type de créature.
***Emplacement de niveau supérieur***. Vous pouvez cibler
une créature supplémentaire pour chaque niveau d'emplacement de sort supérieur à 4.`,
  },
  bladeBarrier: {
    name: `Barrière de lames`,
    description: ``,
  },
  bless: {
    name: `Bénédiction`,
    description: `Vous
bénissez jusqu'à trois créatures à portée. Chaque fois qu'une cible
effectue un jet d'attaque ou de sauvegarde avant la fin du sort, elle
ajoute 1d4 à son jet d'attaque ou de sauvegarde.
***Emplacement de niveau supérieur***.
Vous pouvez cibler une créature supplémentaire pour chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  inflictWounds: {
    name: `Blessure`,
    description: `Une
créature que vous touchez effectue un jet de sauvegarde de Constitution
et subit 2d10 dégâts nécrotiques en cas d'échec, ou la moitié de ces
dégâts en cas de réussite.
***Emplacement de niveau supérieur***. Les dégâts augmentent
de 1d10 pour chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  magicMouth: {
    name: `Bouche magique`,
    description: `Vous
implantez un message dans un objet à portée. Ce message est prononcé
lorsqu'une condition de déclenchement est remplie. Choisissez un objet
que vous pouvez voir et qui n'est pas porté par une autre créature.
Prononcez ensuite le message, qui doit comporter 25 mots maximum,
mais peut durer jusqu'à 10 minutes. Enfin, déterminez la
circonstance qui déclenchera le sort.
Lorsque ce déclencheur se
produit, une bouche magique apparaît sur l'objet et récite le message
avec votre voix et au même volume que vous avez parlé. Si l'objet choisi
possède une bouche ou quelque chose qui ressemble à une bouche (par
exemple, la bouche d'une statue), la bouche magique apparaît à cet
endroit, de sorte que les mots semblent provenir de la bouche de
l'objet. Lorsque vous lancez ce sort, vous pouvez le faire cesser après
avoir délivré son message, ou le faire répéter chaque fois que le
déclencheur se produit.
Le déclencheur peut être aussi général ou
détaillé que vous le souhaitez, mais il doit être basé sur des
conditions visuelles ou sonores se produisant à 9 mètres ou moins de
l'objet. Par exemple, vous pouvez ordonner à la bouche de parler
lorsqu'une créature se déplace à moins de 9 mètres de l'objet ou
lorsqu'une clochette argentée sonne à moins de 9 mètres de celui-ci.`,
  },
  shield: {
    name: `Bouclier`,
    description: `Une
barrière imperceptible de force magique vous protège. Jusqu'au début de
votre prochain tour, vous bénéficiez d'un bonus de +5 à la CA, y
compris contre l'attaque déclenchante, et vous ne subissez aucun dégât
de *projectile magique*.`,
  },
  fireShield: {
    name: `Bouclier de feu`,
    description: `Des
flammes vaporeuses enveloppent votre corps pendant toute la durée du
sort, projetant une Lumière vive sur un rayon de 3 mètres et une Lumière
faible sur 3 mètres supplémentaires.
Les flammes vous confèrent un
bouclier chaud ou glacial, au choix. Le bouclier chaud vous confère une
résistance aux dégâts de froid, et le bouclier glacial une résistance
aux dégâts de feu.
De plus, lorsqu'une créature dans un rayon de 1,50
mètre vous touche lors d'un jet d'attaque au corps à corps, le bouclier
s'embrase. L'attaquant subit 2d8 dégâts de feu pour un bouclier chaud
ou 2d8 dégâts de froid pour un bouclier glacial.`,
  },
  shieldOfFaith: {
    name: `Bouclier de la foi`,
    description: `Un
champ scintillant entoure une créature de votre choix à portée, lui
accordant un bonus de +2 à la CA pendant la durée du sort.`,
  },
  poisonSpray: {
    name: `Bouffée de poison`,
    description: `Vous
projetez une brume toxique sur une créature à portée. Effectuez une
attaque de sort à distance contre la cible. Si l'attaque touche, la
cible subit 1d12 dégâts de poison.
***Amélioration de sort mineur***. Les dégâts
augmentent de 1d12 aux niveaux 5 (2d12), 11 (3d12) et 17 (4d12).`,
  },
  fireball: {
    name: `Boule de feu`,
    description: `Une
traînée lumineuse jaillit de vous jusqu'à un point que vous choisissez à
portée, puis explose ardemment dans un grondement sourd. Toute créature
dans une Sphère de 6 mètres de rayon centrée sur ce point effectue un
jet de sauvegarde de Dextérité, subissant 8d6 dégâts de feu en cas
d'échec, ou la moitié de ces dégâts en cas de réussite.
Les objets inflammables dans la zone qui ne sont pas
portés commencent à brûler.
***Emplacement de niveau supérieur***. Les dégâts augmentent
de 1d6 pour chaque niveau d'emplacement de sort supérieur à 3.`,
  },
  delayedBlastFireball: {
    name: `Boule de feu à retardement`,
    description: ``,
  },
  gustOfWind: {
    name: `Bourrasque`,
    description: `Une
Ligne de vent violent de 18 mètres de long et 3 mètres de large souffle
depuis vous dans la direction de votre choix pendant toute la durée du
sort. Toute créature sur la Ligne doit réussir un jet de sauvegarde de
Force ou être repoussée de 4,50 mètres dans la direction de la Ligne.
Une créature qui termine son tour dans la Ligne doit effectuer le même
jet de sauvegarde.
Toute créature sur la Ligne doit dépenser le double de mouvement pour chaque mètre
parcouru si elle se rapproche de vous.
La
rafale disperse du gaz ou de la vapeur, et éteint les bougies et autres
flammes similaires non protégées dans la zone. Les flammes protégées,
comme celles des lanternes, ont 50 % de chances de s'éteindre.
Par une action Bonus lors de vos tours
suivants, vous pouvez modifier la direction dans laquelle le vent souffle depuis vous.`,
  },
  cloudkill: {
    name: `Brume mortelle`,
    description: `Vous
créez une Sphère de brouillard jaune-vert de 6 mètres de rayon centrée
sur un point à portée. Le brouillard persiste pendant toute la durée du
sort ou jusqu'à ce qu'un vent fort (comme celui créé par *bourrasque*) le disperse, mettant fin au sort. Sa
zone a une Visibilité nulle.
Toute
créature dans la Sphère effectue un jet de sauvegarde de Constitution,
subissant 5d8 dégâts de poison en cas d'échec, ou la moitié de ces
dégâts en cas de réussite. Une créature doit également réussir ce jet de
sauvegarde lorsque la Sphère entre dans son emplacement et lorsqu'elle y
pénètre ou y termine son tour. Une créature n'effectue ce jet qu'une
seule fois par tour.
La Sphère s'éloigne de 3 mètres de vous au début de chacun de vos
tours.
***Emplacement de niveau supérieur***. Les dégâts augmentent de 1d8 pour chaque
niveau d'emplacement de sort supérieur à 5.`,
  },
  forcecage: {
    name: `Cage de force`,
    description: ``,
  },
  vampiricTouch: {
    name: `Caresse du vampire`,
    description: `Le
contact de votre main enveloppée d'ombre peut siphonner la force vitale
des autres pour soigner vos blessures. Effectuez une attaque de sort au
corps à corps contre une créature à portée. Si l'attaque touche, la
cible subit 3d6 dégâts nécrotiques et vous récupérez des points de vie
égaux à la moitié des dégâts nécrotiques infligés.
Jusqu'à la fin du
sort, vous pouvez relancer l'attaque à chacun de vos tours par une
action Magie, en ciblant la même créature ou une autre.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d6 pour chaque niveau d'emplacement de sort supérieur à
3.`,
  },
  blindnessDeafness: {
    name: `Cécité/surdité`,
    description: `Une
créature que vous pouvez voir à portée doit réussir un jet de
sauvegarde de Constitution, ou subir l'état Aveuglé ou Assourdi (selon
votre choix) pendant toute la durée du sort. À la fin de chacun de ses
tours, la cible renouvelle son jet de sauvegarde, mettant fin au sort
sur elle-même en cas de réussite.
***Emplacement de niveau supérieur***. Vous pouvez
cibler une créature supplémentaire pour chaque niveau d'emplacement de sort supérieur à 2.`,
  },
  circleOfDeath: {
    name: `Cercle de mort`,
    description: ``,
  },
  circleOfPower: {
    name: `Cercle de pouvoir`,
    description: `Une
aura rayonne autour de vous sous forme d'Émanation de 9 mètres pendant
toute la durée du sort. Tant que vous êtes dans l'aura, vous et vos
alliés bénéficiez d'un Avantage aux jets de sauvegarde contre les sorts
et autres effets magiques. Lorsqu'une créature affectée effectue un jet
de sauvegarde contre un sort ou un effet magique pour ne subir que la
moitié des dégâts, elle ne subit aucun dégât si elle réussit son jet.`,
  },
  teleportationCircle: {
    name: `Cercle de téléportation`,
    description: `En
lançant le sort, vous dessinez au sol un cercle de 1,50 mètre de rayon,
gravé de sceaux qui relient votre position à un cercle de téléportation
permanent de votre choix, dont vous connaissez la séquence de sceaux et
qui se trouve sur le même plan d'existence que vous. Un portail
scintillant s'ouvre à l'intérieur du cercle dessiné et reste ouvert
jusqu'à la fin de votre prochain tour. Toute créature qui pénètre dans
le portail apparaît instantanément 1,50 mètre ou moins du cercle de
destination ou dans l'emplacement libre le plus proche si cet
emplacement est occupé.
De nombreux temples, guilde et autres lieux
importants possèdent des cercles de téléportation permanents. Chaque
cercle comprend une séquence de sceaux unique : une suite de runes
disposées selon un motif particulier.
Lorsque vous obtenez la
capacité de lancer ce sort, vous connaissez les séquences de sceaux de
deux destinations sur le plan Matériel, déterminées par le MD. Vous
pourrez apprendre d'autres séquences de sceaux au cours de vos
aventures. Vous pouvez mémoriser une nouvelle séquence de sceaux après
l'avoir étudiée pendant 1 minute.
Vous pouvez créer un cercle de téléportation permanent en lançant ce sort
au même endroit chaque jour pendant 365 jours.`,
  },
  magicCircle: {
    name: `Cercle magique`,
    description: `Vous
créez un Cylindre d'énergie magique de 3 mètres de rayon et 6 mètres de
haut, centré sur un point au sol que vous pouvez voir à portée. Des
runes lumineuses apparaissent à chaque intersection du cylindre avec le
sol ou une autre surface.
Choisissez un ou plusieurs des types de
créatures suivants : célestes, élémentaires, fées, fiélons ou
morts-vivants. Le cercle affecte une créature du type choisi des
manières suivantes :
- La créature ne peut pas entrer
volontairement dans le cylindre par des moyens non magiques. Si elle
tente d'utiliser la téléportation ou le voyage interplanaire pour y
parvenir, elle doit d'abord réussir un jet de sauvegarde de Charisme.
- La créature a un Désavantage aux jets
d'attaque contre les cibles situées dans le Cylindre.
- 
Les cibles situées dans le Cylindre ne peuvent pas être possédées par
la créature ni subir l'état Charmé ou Effrayé de sa part.
Chaque fois
que vous lancez ce sort, vous pouvez inverser sa magie, empêchant une
créature du type spécifié de quitter le Cylindre et protégeant les
cibles situées à l'extérieur.
***Emplacement de niveau supérieur***. La durée augmente
d'une heure pour chaque niveau d'emplacement de sort supérieur à 3.`,
  },
  chainLightning: {
    name: `Chaîne d'éclairs`,
    description: ``,
  },
  antimagicField: {
    name: `Champ antimagie`,
    description: ``,
  },
  shapechange: {
    name: `Changement de forme`,
    description: ``,
  },
  planeShift: {
    name: `Changement de plan`,
    description: ``,
  },
  charmMonster: {
    name: `Charme-monstre`,
    description: `Une
créature que vous pouvez voir à portée effectue un jet de sauvegarde de
Sagesse. Elle a un Avantage si vous ou vos alliés la combattez. En cas
d'échec, la cible subit l'état Charmé jusqu'à la fin du sort ou jusqu'à
ce que vous ou vos alliés la blessiez. La créature charmée est amicale
envers vous. À la fin du sort, la cible sait que vous l'avez charmée.
***Emplacement de niveau
supérieur***. Vous pouvez cibler une créature supplémentaire pour chaque niveau d'emplacement de
sort supérieur à 4.`,
  },
  charmPerson: {
    name: `Charme-personne`,
    description: `Un
humanoïde que vous pouvez voir à portée effectue un jet de sauvegarde
de Sagesse. Il le fait avec un Avantage si vous ou vos alliés le
combattez. En cas d'échec, la cible subit l'état Charmé jusqu'à la fin
du sort ou jusqu'à ce que vous ou vos alliés lui infligiez des dégâts.
La créature charmée est amicale envers vous. À la fin du sort, la cible
sait que vous l'avez charmée.
***Emplacement de niveau supérieur***. Vous pouvez cibler
une créature supplémentaire pour chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  blindingSmite: {
    name: `Châtiment de cécité`,
    description: `La
cible touchée subit 3d8 dégâts radiants supplémentaires et subit l'état
Aveuglé jusqu'à la fin du sort. À la fin de chacun de ses tours, la
cible aveuglée effectue un jet de sauvegarde de Constitution, mettant
fin au sort en cas de réussite.
***Emplacement de niveau supérieur***. Les dégâts
supplémentaires augmentent de 1d8 pour chaque niveau d'emplacement de sort supérieur à 3.`,
  },
  wrathfulSmite: {
    name: `Châtiment de courroux`,
    description: `La
cible subit 1d6 dégâts nécrotiques supplémentaires suite à l'attaque,
et doit réussir un jet de sauvegarde de Sagesse ou subir l'état Effrayé
jusqu'à la fin du sort. À la fin de chacun de ses tours, la cible
effrayée renouvelle son jet de sauvegarde, mettant fin au sort sur
elle-même en cas de réussite.
***Emplacement de niveau supérieur***. Les dégâts
augmentent de 1d6 pour chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  searingSmite: {
    name: `Châtiment de fournaise`,
    description: `Lorsque
vous touchez la cible, elle subit 1d6 dégâts de feu supplémentaires. Au
début de chacun de ses tours jusqu'à la fin du sort, la cible subit 1d6
dégâts de feu, puis effectue un jet de sauvegarde de Constitution. En
cas d'échec, le sort continue. En cas de réussite, le sort prend fin.
***Emplacement de niveau
supérieur***. Tous les dégâts augmentent de 1d6 pour chaque niveau d'emplacement de sort
supérieur à 1.`,
  },
  shiningSmite: {
    name: `Châtiment de révélation`,
    description: `La
cible touchée subit 2d6 dégâts radiants supplémentaires. Jusqu'à la fin
du sort, la cible projette une Lumière vive sur un rayon de 1,50 mètre.
Les jets d'attaque contre elle bénéficient d'un Avantage et elle ne
peut bénéficier de l'état Invisible.
***Emplacement de niveau supérieur***. Les dégâts
augmentent de 1d6 pour chaque niveau d'emplacement de sort supérieur à 2.`,
  },
  staggeringSmite: {
    name: `Châtiment de stupeur`,
    description: `La
cible subit 4d6 dégâts psychiques supplémentaires suite à l'attaque, et
doit réussir un jet de sauvegarde de Sagesse ou subir l'état Étourdi
jusqu'à la fin de votre prochain tour.
***Emplacement de niveau supérieur***. Les dégâts
supplémentaires augmentent de 1d6 pour chaque niveau d'emplacement de sort supérieur à 4.`,
  },
  thunderousSmite: {
    name: `Châtiment de tonnerre`,
    description: `Votre
coup retentit comme le tonnerre dans un rayon de 90 mètres, et la cible
subit 2d6 dégâts de tonnerre supplémentaires. De plus, si la cible est
une créature, elle doit réussir un jet de sauvegarde de Force ou être
repoussée à 3 mètres de vous et subir l'état À terre.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d6 pour chaque niveau d'emplacement de sort supérieur à
1.`,
  },
  divineSmite: {
    name: `Châtiment divin`,
    description: `La
cible subit 2d8 dégâts radiants supplémentaires suite à l'attaque. Les
dégâts augmentent de 1d8 si la cible est un fiélon ou un mort-vivant.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d8 pour chaque niveau d'emplacement de sort supérieur à
1.`,
  },
  banishingSmite: {
    name: `Châtiment du ban`,
    description: `La
cible touchée par le jet d'attaque subit 5d10 points de dégâts de force
supplémentaires. Si l'attaque réduit la cible à 50 points de vie ou
moins, celle-ci doit réussir un jet de sauvegarde de Charisme ou être
transportée dans un demi-plan inoffensif pour la durée du sort. Là, la
cible subit l'état Incapable d'agir. À la fin du sort, la cible
réapparaît dans la case qu'elle a quittée ou dans la case inoccupée la
plus proche si celle-ci est occupée.`,
  },
  tashasBubblingCauldron: {
    name: `Chaudron bouillonnant de Tasha`,
    description: ``,
  },
  mordenkainensFaithfulHound: {
    name: `Chien de garde de Mordenkainen`,
    description: `Vous
invoquez un chien de garde fantôme dans un espace libre que vous pouvez
voir à portée. Le chien reste là pendant toute la durée du sort ou
jusqu'à ce que vous soyez à plus de 90 mètres l'un de l'autre.
Personne
d'autre que vous ne peut voir le chien, et il est intangible et
invulnérable. Lorsqu'une créature de taille P ou supérieure s'approche à
9 mètres ou moins de lui sans prononcer au préalable le mot de passe
spécifié lors du lancement du sort, le chien se met à aboyer bruyamment.
Il possède Vision véritable avec une portée de 9 mètres.
Au début de
chacun de vos tours, le chien de garde tente de mordre un ennemi dans
un rayon de 1,50 mètre. Cet ennemi doit réussir un jet de sauvegarde de
Dextérité ou subir 4d8 dégâts de Force.
Lors de vos tours suivants, vous pouvez prendre une action Magie pour
déplacer le chien jusqu'à 9 mètres.`,
  },
  clairvoyance: {
    name: `Clairvoyance`,
    description: `Vous
créez un capteur invisible à portée, dans un lieu familier (un endroit
que vous avez déjà visité ou vu) ou dans un lieu évident qui vous est
inconnu (comme derrière une porte, au coin d'un couloir ou dans un
bosquet). Le capteur intangible et invulnérable reste en place pendant
toute la durée du sort.
Lorsque vous lancez le sort, choisissez la
vue ou l'ouïe. Vous pouvez utiliser le sens choisi à travers le capteur
comme si vous étiez dans son espace. Par une action Bonus, vous pouvez
alterner entre la vue et l'ouïe.
Une créature qui voit le capteur (comme une créature bénéficiant de *détection de l'invisibilité* ou de
Vision véritable) voit un orbe lumineux de la taille de votre poing.`,
  },
  blink: {
    name: `Clignotement`,
    description: `Lancez
1d6 à la fin de chacun de vos tours pendant toute la durée du sort. Sur
un résultat de 4 à 6, vous disparaissez de votre plan d'existence
actuel et réapparaissez dans le plan Éthéré (le sort prend fin
instantanément si vous vous y trouvez déjà). Sur le plan Éthéré, vous
pouvez percevoir le plan que vous avez quitté, qui apparait en nuances
de gris, mais vous ne pouvez rien voir à plus de 18 mètres. Vous ne
pouvez affecter ou être affecté que par d'autres créatures du plan
Éthéré, et les créatures de l'autre plan ne peuvent vous percevoir que
si elles possèdent une capacité spéciale leur permettant de percevoir
les choses sur le plan Éthéré.
Vous retournez sur l'autre plan au
début de votre prochain tour si à la fin du sort vous êtes sur le plan
Éthéré. Vous retournez sur une case inoccupée de votre choix que vous
pouvez voir à 3 mètres ou moins de la case que vous avez quittée. Si
aucune case inoccupée n'est disponible à cette distance, vous
réapparaissez sur la case inoccupée la plus proche.`,
  },
  clone: {
    name: `Clone`,
    description: ``,
  },
  leomundsSecretChest: {
    name: `Coffre secret de Léomund`,
    description: `Vous
cachez un coffre et tout son contenu sur le plan Éthéré. Vous devez
toucher le coffre et la réplique miniature qui servent de composantes
matérielles au sort. Le coffre peut contenir jusqu'à un cube de 90 cm x
60 cm x 60 cm de matière inerte.
Tant que le coffre reste sur le plan
Éthéré, vous pouvez prendre une action Magie et toucher la réplique
pour le rappeler. Il apparaît dans un espace libre au sol dans un rayon
de 1,50 mètre. Vous pouvez renvoyer le coffre sur le plan Éthéré en
prenant une action Magie pour toucher le coffre et la réplique.
Après
60 jours, le sort a 5 % de chances cumulées à la fin de chaque journée
de se terminer. Il prend également fin si vous le lancez à nouveau ou si
la réplique miniature du coffre est détruite. Si le sort prend fin et
que le coffre plus grand se trouve sur le plan Éthéré, le coffre y
reste. À vous ou à quelqu'un d'autre de le trouver.`,
  },
  flameStrike: {
    name: `Colonne de flamme`,
    description: `Une
colonne verticale de feu fulgurant tombe du ciel. Toute créature dans
un Cylindre de 3 mètres de rayon et 12 mètres de haut centré sur un
point à portée effectue un jet de sauvegarde de Dextérité, subissant 5d6
dégâts de feu et 5d6 dégâts radiants en cas d'échec, ou la moitié de
ces dégâts en cas de réussite.
***Emplacement de niveau supérieur***. Les dégâts de feu
et radiants augmentent de 1d6 pour chaque niveau d'emplacement de sort supérieur à 5.`,
  },
  sending: {
    name: `Communication à distance`,
    description: `Vous
envoyez un court message de 25 mots maximum à une créature que vous
avez rencontrée ou qui vous a été décrite par quelqu'un qui l'a
rencontrée. La cible entend le message dans son esprit, vous reconnaît
comme en étant l'expéditeur si elle vous connaît, et peut répondre
immédiatement de la même manière. Le sort permet aux cibles de
comprendre le sens de votre message.
Vous pouvez envoyer le message à
n'importe quelle distance et même vers d'autres plans d'existence, mais
si la cible se trouve sur un plan différent du vôtre, il y a 5 % de
chances que le message n'arrive pas. Vous savez si la livraison échoue.
À
la réception de votre message, une créature peut bloquer votre capacité
à l'atteindre à nouveau avec ce sort pendant 8 heures. Si vous essayez
d'envoyer un autre message pendant ce temps, vous savez que vous êtes
bloqué et le sort échoue.`,
  },
  speakWithAnimals: {
    name: `Communication avec les animaux`,
    description: `Pendant
toute la durée du sort, vous pouvez comprendre et communiquer
verbalement avec des bêtes, et utiliser avec elles toutes les
compétences de l'action Influencer.
La plupart des bêtes ont peu de
choses à dire sur des sujets autres que la survie ou la camaraderie,
mais au minimum, une bête peut vous donner des informations sur les
lieux et les monstres à proximité, y compris tout ce qu'elle a perçu au
cours de la dernière journée.`,
  },
  speakWithDead: {
    name: `Communication avec les morts`,
    description: `Vous
accordez un semblant de vie à un cadavre de votre choix à portée, lui
permettant de répondre à vos questions. Le cadavre doit avoir une
bouche, et ce sort échoue si la créature décédée était un mort-vivant au
moment de sa mort. Il échoue également si le cadavre a déjà été la
cible de ce sort au cours des 10 derniers jours.
Jusqu'à la fin du
sort, vous pouvez poser au cadavre jusqu'à cinq questions. Le cadavre ne
connaît que ce qu'il savait de son vivant, y compris les langues qu'il
connaissait. Les réponses sont généralement brèves, cryptiques ou
répétitives, et le cadavre n'est pas tenu de donner une réponse honnête
si vous lui êtes hostile ou s'il vous reconnaît comme un ennemi. Ce sort
ne rend pas l'âme de la créature à son corps, seulement son esprit.
Ainsi, le cadavre ne peut pas apprendre de nouvelles informations, ne
comprend rien de ce qui s'est passé depuis sa mort et ne peut pas
spéculer sur les événements futurs.`,
  },
  speakWithPlants: {
    name: `Communication avec les plantes`,
    description: `Vous
imprégnez les plantes dans une Émanation immobile de 9 mètres d'une
conscience et d'une animation limitées, leur permettant de communiquer
avec vous et d'obéir à des ordres simples. Vous pouvez interroger les
plantes sur les événements survenus dans la zone d'effet du sort au
cours de la journée écoulée, obtenant ainsi des informations sur les
créatures qui sont passées par là, la météo et d'autres circonstances.
Vous
pouvez également transformer un Terrain difficile créé par la
croissance de plantes (comme les fourrés et les sous-bois) en terrain
ordinaire pendant toute la durée du sort. Vous pouvez également
transformer un terrain ordinaire où se trouvent des plantes en Terrain
difficile pendant toute la durée du sort.
Le sort ne permet pas aux
plantes de se déraciner et de se déplacer, mais elles peuvent déplacer
leurs branches et leurs tiges pour vous.
Si une créature du type
plante se trouve dans la zone, vous pouvez communiquer avec elle comme
si vous partagiez une langue commune.`,
  },
  commune: {
    name: `Communion`,
    description: `Vous
contactez une divinité ou un mandataire divin et lui posez jusqu'à
trois questions auxquelles on peut répondre par oui ou par non. Vous
devez poser vos questions avant la fin du sort. Vous recevez une réponse
correcte pour chaque question.
Les êtres divins ne sont pas
nécessairement omniscients ; ils pourraient donc répondre
« imprécis » si une question porte sur des informations qui
échappent à la connaissance de la divinité. Si une réponse en un seul
mot risque d'être trompeuse ou contraire aux intérêts de la divinité, le
MD peut proposer une courte phrase.
Si vous lancez le sort plusieurs
fois avant la fin d'un Repos long, vous avez 25 % de chances
cumulées pour chaque incantation après la première de ne pas obtenir de
réponse.`,
  },
  communeWithNature: {
    name: `Communion avec la nature`,
    description: `Vous
communiez avec les esprits de la nature et acquérez des connaissances
sur les environs. En extérieur, le sort vous permet de connaître la zone
dans un rayon de 4,5 km autour de vous. Dans les grottes et autres
environnements souterrains naturels, le rayon est limité à 90 mètres. Le
sort ne fonctionne pas là où la nature a été remplacée par des
constructions, comme dans les châteaux et les bourgs.
Choisissez trois des informations suivantes ; vous
en prendrez connaissance en fonction de la zone d'effet du sort :
- Position des peuplements
- 
Position des portails vers d'autres plans d'existence
- Position d'une créature de FP 10 ou plus (au choix du
MD) et du type Céleste, Élémentaire, Fée, Fiélon ou Mort-vivant
- L'espèce de plante, minéral ou bête la plus
répandue (choisissez celle que vous souhaitez apprendre)
- Position des étendues d'eau
Par
exemple, vous pouvez déterminer l'emplacement d'un monstre puissant
dans la zone, l'emplacement des étendues d'eau et l'emplacement des
peuplements.`,
  },
  comprehendLanguages: {
    name: `Compréhension des langues`,
    description: `Pendant
toute la durée du sort, vous comprenez le sens littéral de toute langue
que vous entendez ainsi que le langage des signes. Vous comprenez
également toute langue écrite que vous voyez, mais vous devez toucher la
surface sur laquelle les mots sont écrits. Il faut environ une minute
pour lire une page de texte. Ce sort ne décode pas les symboles ni les
messages secrets.`,
  },
  compulsion: {
    name: `Compulsion`,
    description: `Toute
créature de votre choix que vous pouvez voir à portée doit réussir un
jet de sauvegarde de Sagesse ou subir l'état Charmé jusqu'à la fin du
sort.
Pendant la durée du sort, vous pouvez prendre une action Bonus
pour désigner une direction horizontale. Chaque cible charmée doit
utiliser autant de mouvement que possible pour se déplacer dans cette
direction lors de son prochain tour, en empruntant l'itinéraire le plus
sûr. Après ce mouvement, la cible renouvelle son jet de sauvegarde,
mettant fin au sort sur elle-même en cas de réussite.`,
  },
  coneOfCold: {
    name: `Cône de froid`,
    description: `Vous
libérez un souffle d'air froid. Toute créature dans un Cône de 18
mètres émanant de vous effectue un jet de sauvegarde de Constitution,
subissant 8d8 dégâts de froid en cas d'échec, ou la moitié de ces dégâts
en cas de réussite. Une créature tuée par ce sort devient une statue de
glace jusqu'à ce qu'elle dégèle.
***Emplacement de niveau supérieur***. Les dégâts
augmentent de 1d8 pour chaque niveau d'emplacement de sort supérieur à 5.`,
  },
  confusion: {
    name: `Confusion`,
    description: `Chaque
créature dans une Sphère de 3 mètres de rayon centrée sur un point que
vous choisissez à portée doit réussir un jet de sauvegarde de Sagesse,
sinon cette cible ne peut pas prendre d'actions Bonus ou de Réactions et
doit lancer 1d10 au début de chacun de ses tours pour déterminer son
comportement pour ce tour, en consultant la table ci-dessous.

1d10
Comportement pour le tour

1
La
cible ne prend aucune action et utilise tout son mouvement pour se
déplacer. Lancez 1d4 pour la direction : 1=nord, 2=est,
3=sud ou 4=ouest.

2–6
La cible ne bouge pas et ne prend aucune action.

7–8
La
cible ne bouge pas et prend l'action Attaque pour effectuer une attaque
au corps à corps contre une créature aléatoire à sa portée. Si aucune
créature n'est à sa portée, la cible ne prend aucune action.

9–10
La cible choisit son comportement.

À
la fin de chacun de ses tours, une cible affectée refait son jet de
sauvegarde, mettant fin au sort sur elle-même en cas de réussite.
***Emplacement de niveau
supérieur***. Le rayon de la Sphère augmente de 1,50 mètre pour chaque niveau d'emplacement de
sort supérieur à 4.`,
  },
  contactOtherPlane: {
    name: `Contact avec les plans`,
    description: `Vous
contactez mentalement un demi-dieu, l'esprit d'un sage mort depuis
longtemps ou une autre entité érudite venue d'un autre plan. Contacter
cette intelligence surnaturelle peut vous briser l'esprit. Lorsque vous
lancez ce sort, effectuez un jet de sauvegarde d'Intelligence DD 15. En
cas de réussite, vous pouvez poser jusqu'à cinq questions à l'entité.
Vous devez poser vos questions avant la fin du sort. Le MD répond à
chaque question par un mot, tel que « oui »,
« non », « peut-être », « jamais »,
« hors sujet » ou « peu clair » (si l'entité ne
connaît pas la réponse). Si une réponse en un seul mot est trompeuse, le
MD peut proposer une courte phrase.
En cas d'échec, vous subissez 6d6 dégâts psychiques et l'état Incapable
d'agir jusqu'à la fin d'un Repos long. Un sort de *restauration suprême* lancé sur vous met
fin à cet effet.`,
  },
  chillTouch: {
    name: `Contact glacial`,
    description: `Canalisant
le froid de la tombe, effectuez une attaque de corps à corps avec un
sort contre une cible à portée. Si l'attaque touche, la cible subit 1d10
dégâts nécrotiques et ne peut pas regagner de points de vie avant la
fin de votre prochain tour.
***Amélioration de sort mineur***. Les dégâts augmentent de
1d10 lorsque vous atteignez les niveaux 5 (2d10), 11 (3d10) et 17 (4d10).`,
  },
  contagion: {
    name: `Contagion`,
    description: `Votre
contact inflige une contagion magique. La cible doit réussir un jet de
sauvegarde de Constitution ou subir 11d8 dégâts nécrotiques et l'état
Empoisonné. Choisissez également une caractéristique au moment du
lancement du sort. Tant qu'elle est empoisonnée, la cible subit un
Désavantage aux jets de sauvegarde effectués avec la caractéristique
choisie.
La cible doit refaire ce jet de sauvegarde à la fin de
chacun de ses tours jusqu'à obtenir trois réussites ou échecs. Si elle
réussit trois de ces jets, le sort prend fin. Si elle échoue trois de
ces jets, le sort dure 7 jours.
Chaque fois que la cible empoisonnée
subit un effet qui mettrait fin à son état Empoisonné, elle doit réussir
un jet de sauvegarde de Constitution pour ne plus être empoisonnée.`,
  },
  harm: {
    name: `Contamination`,
    description: ``,
  },
  counterspell: {
    name: `Contresort`,
    description: `Vous
tentez d'interrompre une créature en train de lancer un sort. La
créature doit effectuer un jet de sauvegarde de Constitution. En cas
d'échec, le sort se dissipe sans effet, et l'action, l'action Bonus ou
la Réaction utilisée pour le lancer est perdue. Si ce sort a été lancé
avec un emplacement de sort, celui-ci n'est pas dépensé.`,
  },
  controlWater: {
    name: `Contrôle de l'eau`,
    description: `Jusqu'à
la fin du sort, vous contrôlez toute eau se trouvant dans une zone de
votre choix dans un Cube mesurant jusqu'à 30 mètres de côté, grâce à
l'un des effets suivants. Par une action Magie lors de vos tours
suivants, vous pouvez répéter le même effet ou en choisir un autre.
**Crue**.
Vous faites monter le niveau de toutes les eaux stagnantes de la zone
jusqu'à 6 mètres. Si vous choisissez une zone dans une grande étendue
d'eau, vous créez une vague de 6 mètres de haut qui se propage d'un côté
à l'autre de la zone avant de s'écraser. Tous les véhicules de taille
TG ou inférieure sur la trajectoire de la vague sont emportés avec elle
de l'autre côté. Tout véhicule de taille TG ou inférieure touché par la
vague a 25 % de chances de chavirer.
Le niveau de l'eau reste élevé
jusqu'à la fin du sort ou jusqu'à ce que vous choisissiez un autre
effet. Si cet effet a produit une vague, celle-ci se répète au début de
votre prochain tour tant que l'effet de crue dure.
**Séparation des eaux**.
Vous séparez l'eau de la zone et créez une tranchée. La tranchée
s'étend sur toute la zone d'effet du sort, et l'eau séparée forme un mur
de chaque côté. La tranchée subsiste jusqu'à la fin du sort ou jusqu'à
ce que vous choisissiez un autre effet. L'eau la remplit ensuite
lentement au cours du tour suivant jusqu'à ce que le niveau normal de
l'eau soit rétabli.
**Contrôle du courant**. Vous
déplacez l'eau de la zone dans la direction de votre choix, même si elle
doit s'écouler par-dessus des obstacles, des murs ou dans d'autres
directions improbables. L'eau de la zone se déplace selon vos
instructions, mais une fois sortie de la zone d'effet, elle reprend son
cours en fonction du terrain. L'eau continue de se déplacer dans la
direction choisie jusqu'à la fin du sort ou jusqu'à ce que vous
choisissiez un autre effet.
**Tourbillon**. Vous
provoquez la formation d'un tourbillon au centre de la zone, qui doit
mesurer au moins 15 mètres de côté et 7,50 mètres de profondeur. Le
tourbillon persiste jusqu'à ce que vous choisissiez un autre effet ou
jusqu'à la fin du sort. Le tourbillon mesure 1,50 mètre de large à la
base, jusqu'à 15 mètres de large au sommet pour une hauteur de 7,50
mètres. Toute créature se trouvant dans l'eau et dans un rayon de 7,50
mètres du tourbillon est attirée de 3 mètres vers lui. Lorsqu'une
créature entre dans le tourbillon pour la première fois lors d'un tour
ou y termine son tour, elle effectue un jet de sauvegarde de Force. En
cas d'échec, elle subit 2d8 dégâts contondants. En cas de réussite, elle
subit seulement la moitié des dégâts. Une créature ne peut s'éloigner
du tourbillon à la nage que si elle prend d'abord une action pour s'en
éloigner et réussit un jet de Force (Athlétisme) contre le DD de
sauvegarde de votre sort.`,
  },
  controlWeather: {
    name: `Contrôle du climat`,
    description: ``,
  },
  summonAberration: {
    name: `Convocation d'aberration`,
    description: `Vous
invoquez l'esprit d'une aberration. Celui-ci se manifeste dans un
espace libre que vous pouvez voir à portée et utilise le profil de l'**esprit aberrant**.
Lorsque vous lancez le sort, choisissez entre tyrannoeillidé, slaad ou
flagelleur mental. La créature ressemble à une Aberration de ce type, ce
qui détermine certains détails de son profil. La créature disparaît
lorsqu'elle tombe à 0 point de vie ou à la fin du sort.
Cette
créature est votre alliée et celle de vos alliés. En combat, elle
partage votre Initiative, mais son tour commence immédiatement après le
vôtre. Elle obéit à vos ordres verbaux (aucune action requise). Si vous
n'en donnez pas, elle prend l'action Esquive et utilise son mouvement
pour éviter le danger.
***Emplacement de niveau supérieur***. Utilisez le niveau de
l'emplacement de sort pour le niveau du sort dans le profil.`,
  },
  summonConstruct: {
    name: `Convocation d'artificiel`,
    description: `Vous
invoquez l'esprit d'un artificiel. Celui-ci se manifeste dans un espace
libre que vous pouvez voir à portée et utilise le profil de l'**esprit artificielle**.
Lorsque vous lancez le sort, choisissez un matériau : argile,
métal ou pierre. La créature ressemble à une statue animée (vous
déterminez son apparence) faite du matériau choisi, ce qui détermine
certains détails de son profil. La créature disparaît lorsqu'elle tombe à
0 point de vie ou à la fin du sort.
Cette créature est votre alliée
et celle de vos alliés. En combat, elle partage votre Initiative, mais
son tour commence immédiatement après le vôtre. Elle obéit à vos ordres
verbaux (aucune action requise). Si vous n'en donnez pas, elle effectue
l'action Esquive et utilise son mouvement pour éviter le danger.
Emplacement de sort supérieur. Utilisez le
niveau de l'emplacement de sort pour le niveau du sort dans le profil.`,
  },
  summonElemental: {
    name: `Convocation d'élémentaire`,
    description: `Vous
invoquez l'esprit d'un élémentaire. Celui-ci se manifeste dans un
espace libre que vous pouvez voir à portée et utilise le profil de l'**esprit élémentaire**.
Lorsque vous lancez le sort, choisissez un élément : Air, Terre,
Feu ou Eau. La créature ressemble à une forme bipède enveloppée dans
l'élément choisi, ce qui détermine certains détails de son profil. La
créature disparaît lorsqu'elle tombe à 0 point de vie ou à la fin
du sort.
Cette créature est votre alliée et celle de vos alliés. En
combat, elle partage votre Initiative, mais son tour commence
immédiatement après le vôtre. Elle obéit à vos ordres verbaux (aucune
action requise). Si vous n'en donnez pas, elle prend l'action Esquive et
utilise son mouvement pour éviter le danger.
***Emplacement de niveau supérieur***.
Utilisez le niveau de l'emplacement de sort pour le niveau du sort dans le profil.`,
  },
  summonBeast: {
    name: `Convocation de bête`,
    description: `Vous
invoquez l'esprit d'une bête. Celui-ci se manifeste dans un espace
libre que vous pouvez voir à portée et utilise le profil de l'**esprit bestial**.
Lorsque vous lancez le sort, choisissez un environnement entre
air, terre ou eau. La créature ressemble à un animal de votre choix
originaire de l'environnement choisi, ce qui détermine certains détails
de son profil. La créature disparaît lorsqu'elle tombe à 0 point de
vie ou à la fin du sort.
Cette créature est votre alliée et celle de
vos alliés. En combat, elle partage votre Initiative, mais son tour
commence immédiatement après le vôtre. Elle obéit à vos ordres verbaux
(aucune action requise). Si vous n'en donnez pas, elle prend l'action
Esquive et utilise son mouvement pour éviter le danger.
***Emplacement de niveau
supérieur***. Utilisez le niveau de l'emplacement de sort pour le niveau du sort dans le
profil.`,
  },
  summonCelestial: {
    name: `Convocation de céleste`,
    description: `Vous
invoquez l'esprit d'un céleste. Celui-ci se manifeste sous une forme
angélique dans un espace libre que vous pouvez voir à portée et utilise
le profil de l'**esprit céleste**.
Lorsque vous lancez le sort, choisissez entre Vengeur et Défenseur, ce
qui détermine certains détails de son profil. La créature disparaît
lorsqu'elle tombe à 0 point de vie ou à la fin du sort.
Cette
créature est votre alliée et celle de vos alliés. En combat, elle
partage votre Initiative, mais son tour commence immédiatement après le
vôtre. Elle obéit à vos ordres verbaux (aucune action requise). Si vous
n'en donnez pas, elle prend l'action Esquive et utilise son mouvement
pour éviter le danger.
***Emplacement de niveau supérieur***. Utilisez le niveau de
l'emplacement de sort pour le niveau du sort dans le profil.`,
  },
  summonDragon: {
    name: `Convocation de dragon`,
    description: `Vous
invoquez l'esprit d'un dragon. Celui-ci se manifeste dans un espace
libre que vous pouvez voir à portée et utilise le profil de l'**esprit draconique**. La créature
disparaît lorsqu'elle tombe à 0 point de vie ou à la fin du sort.
Cette
créature est votre alliée et celle de vos alliés. En combat, elle
partage votre Initiative, mais son tour commence immédiatement après le
vôtre. Elle obéit à vos ordres verbaux (aucune action requise). Si vous
n'en donnez pas, elle prend l'action Esquive et utilise son mouvement
pour éviter le danger.
***Emplacement de niveau supérieur***. Utilisez le niveau de
l'emplacement de sort pour le niveau du sort dans le profil.`,
  },
  summonFey: {
    name: `Convocation de fée`,
    description: `Vous
invoquez l'esprit d'un être féerique. Celui-ci se manifeste dans un
espace libre que vous pouvez voir à portée et utilise le profil de l'**esprit féerique**.
Lorsque vous lancez le sort, choisissez une humeur : furibonde,
rieuse ou espiègle. La créature ressemble à une créature féerique de
votre choix, marquée par l'humeur choisie, qui détermine certains
détails de son profil. La créature disparaît lorsqu'elle tombe à 0 point
de vie ou à la fin du sort.
Cette créature est votre alliée et celle
de vos alliés. En combat, elle partage votre Initiative, mais son tour
commence immédiatement après le vôtre. Elle obéit à vos ordres verbaux
(aucune action requise). Si vous n'en donnez pas, elle prend l'action
Esquive et utilise son mouvement pour éviter le danger.
***Emplacement de niveau
supérieur***. Utilisez le niveau de l'emplacement de sort pour le niveau du sort dans le
profil.`,
  },
  summonFiend: {
    name: `Convocation de fiélon`,
    description: ``,
  },
  summonUndead: {
    name: `Convocation de mort-vivant`,
    description: `Vous
invoquez l'esprit d'un mort-vivant. Celui-ci se manifeste dans un
espace libre que vous pouvez voir à portée et utilise le profil de l'**esprit mort-vivant**.
Lorsque vous lancez le sort, choisissez la forme de la créature :
fantomatique, putride ou squelettique. La créature ressemble à un
Mort-vivant de la forme choisie, qui détermine certains détails de son
profil. La créature disparaît lorsqu'elle tombe à 0 point de vie ou à la
fin du sort.
Cette créature est votre alliée et celle de vos alliés.
En combat, elle partage votre Initiative, mais son tour commence
immédiatement après le vôtre. Elle obéit à vos ordres verbaux (aucune
action requise). Si vous n'en donnez pas, elle prend l'action Esquive et
utilise son mouvement pour éviter le danger.
***Emplacement de niveau supérieur***.
Utilisez le niveau de l'emplacement de sort pour le niveau du sort dans le profil.`,
  },
  drawmijsInstantSummons: {
    name: `Convocations instantanées de Drawmij`,
    description: ``,
  },
  antilifeShell: {
    name: `Coquille antivie`,
    description: `Une
aura s'étend autour de vous sous forme d'Émanation de 3 mètres pendant
toute la durée du sort. Elle empêche les créatures autres que les
créatures artificielles et les morts-vivants de la traverser. Une
créature affectée peut lancer des sorts ou effectuer des attaques avec
des armes à distance ou à allonge à travers la barrière.
Si vous vous déplacez de manière à forcer une
créature affectée à traverser la barrière, le sort prend fin.`,
  },
  ropeTrick: {
    name: `Corde enchantée`,
    description: `Vous
touchez une corde. Une extrémité se dresse vers le haut jusqu'à ce
qu'elle soit perpendiculaire au sol ou atteigne le plafond. À son
extrémité supérieure, un portail invisible de 90 cm sur 1,50 mètre
s'ouvre sur un espace extradimensionnel qui perdure jusqu'à la fin du
sort. Cet espace est accessible en grimpant à la corde, qui peut être
tirée ou lâchée. Cet espace peut accueillir jusqu'à huit créatures de
taille M ou inférieure. Les attaques, sorts et autres effets ne peuvent y
pénétrer ni en sortir, mais les créatures à l'intérieur peuvent voir à
travers le portail. Tout ce qui se trouve à l'intérieur tombe à la fin
du sort.`,
  },
  cordonOfArrows: {
    name: `Cordon de flèches`,
    description: `Vous
touchez jusqu'à quatre flèches ou carreaux non magiques et les plantez
dans le sol de votre espace. Jusqu'à la fin du sort, les munitions ne
peuvent pas être physiquement déracinées, et chaque fois qu'une créature
autre que vous pénètre dans un espace dans un rayon de 9 mètres des
munitions pour la première fois au cours d'un tour ou y termine son
tour, une munition s'envole pour la frapper. La créature doit réussir un
jet de sauvegarde de Dextérité sous peine de subir 2d4 dégâts
perforants. La munition est alors détruite. Le sort prend fin lorsqu'il
ne reste plus aucune munition plantée dans le sol.
Lorsque vous lancez ce sort, vous pouvez désigner les
créatures de votre choix, et le sort les ignore.
***Emplacement de niveau supérieur***.
La quantité de munitions pouvant être affectée augmente de deux pour chaque niveau d'emplacement de sort
supérieur à 2.`,
  },
  colorSpray: {
    name: `Couleurs dansantes`,
    description: `Vous
lancez un faisceau éblouissant de lumières scintillantes et colorées.
Toute créature dans un Cône de 4,50 mètres émanant de vous doit réussir
un jet de sauvegarde de Constitution ou subir l'état Aveuglé jusqu'à la
fin de votre prochain tour.`,
  },
  trueStrike: {
    name: `Coup au but`,
    description: `Guidé
par un éclair magique, vous effectuez une attaque avec l'arme utilisée
pour lancer le sort. L'attaque utilise votre caractéristique
d'incantation pour les jets d'attaque et de dégâts, au lieu d'utiliser
la Force ou la Dextérité. Si l'attaque inflige des dégâts, ceux-ci
peuvent être radiants ou du type de dégâts normal de l'arme (selon votre
choix).
***Amélioration de sort mineur***. Que
vous infligiez des dégâts radiants ou du type de dégâts normal de
l'arme, l'attaque inflige des dégâts radiants supplémentaires aux
niveaux 5 (1d6), 11 (2d6) et 17 (3d6).`,
  },
  thunderclap: {
    name: `Coup de tonnerre`,
    description: `Toute
créature dans une Émanation de 1,50 mètre provenant de vous doit
réussir un jet de sauvegarde de Constitution ou subir 1d6 dégâts de
tonnerre. Le son tonitruant du sort peut être entendu jusqu'à 30 mètres.
***Amélioration de sort
mineur***. Les dégâts augmentent de 1d6 lorsque vous atteignez les niveaux 5 (2d6), 11 (3d6) et
17 (4d6).`,
  },
  crownOfMadness: {
    name: `Couronne du dément`,
    description: `Une
créature que vous pouvez voir à portée doit réussir un jet de
sauvegarde de Sagesse ou subir l'état Charmé pendant toute la durée du
sort. La créature réussit automatiquement si elle n'est pas humanoïde.
Une
couronne spectrale apparaît sur la tête de la cible charmée, et elle
doit prendre son action avant de se déplacer à chacun de ses tours pour
effectuer une attaque au corps à corps contre une créature autre
qu'elle-même, choisie mentalement. La cible peut agir normalement à son
tour si vous ne choisissez aucune créature ou si aucune créature n'est à
sa portée. La cible refait son jet de sauvegarde à la fin de chacun de
ses tours, mettant fin au sort sur elle-même en cas de réussite.
Lors de vos tours suivants, vous devez
prendre l'action Magie pour conserver le contrôle de la cible, sinon le sort prend fin.`,
  },
  iceKnife: {
    name: `Couteau de glace`,
    description: `Vous
créez un éclat de glace et le lancez sur une créature à portée.
Effectuez une attaque de sort à distance contre la cible. Si l'attaque
touche, la cible subit 1d10 dégâts perforants. Que l'attaque soit
réussie ou non, l'éclat explose. La cible et tout créature dans un rayon
de 1,50 mètre doivent réussir un jet de sauvegarde de Dextérité ou
subir 2d6 dégâts de froid.
***Emplacement de niveau supérieur***. Les dégâts de froid
augmentent de 1d6 pour chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  creation: {
    name: `Création`,
    description: `Vous
extrayez des volutes de matière d'ombre de Gisombre pour créer un objet
à portée. Il peut s'agir d'un objet végétal (matière souple, corde,
bois, etc) ou minéral (pierre, cristal, métal, etc). L'objet ne doit pas
dépasser un cube de 1,50 mètre de côté, et sa forme et sa matière
doivent être connues.
La durée du sort dépend de la matière de
l'objet, comme indiqué dans la table ci-dessous. Si l'objet est composé
de plusieurs matériaux, utilisez la durée la plus courte. Utiliser un
objet créé par ce sort comme matière d'un autre sort entraîne l'échec de
ce dernier.

Matière
Durée

Matière végétale
24 heures

Pierre ou cristal
12 heures

Métal précieux
1 heure

Gemme
10 minutes

Adamantium ou mithral
1 minute

***Emplacement de niveau supérieur***. La taille du cube augmente de
1,50 mètre pour chaque niveau d'emplacement de sort supérieur à 5.`,
  },
  createUndead: {
    name: `Création de mort-vivant`,
    description: ``,
  },
  createFoodAndWater: {
    name: `Création de nourriture et d'eau`,
    description: `Vous
préparez 22,5 kg de nourriture et 120 litres d'eau douce, au sol ou
dans des récipients à portée, utiles pour prévenir les risques de
malnutrition et de déshydratation. La nourriture est fade mais
nourrissante et ressemble à celle de votre choix, et l'eau est propre.
La nourriture se gâte au bout de 24 heures si elle n'est pas consommée.`,
  },
  createOrDestroyWater: {
    name: `Création ou destruction d'eau`,
    description: `Vous effectuez l'une des actions suivantes :
**Création d'eau**.
Vous créez jusqu'à 40 litres d'eau propre à portée dans un récipient
ouvert. L'eau peut aussi tomber sous forme de pluie dans un Cube de 9
mètres de côté à portée, éteignant les flammes.
**Destruction d'eau**.
Vous détruisez jusqu'à 40 litres d'eau dans un récipient ouvert à
portée. Vous pouvez aussi détruire le brouillard dans un Cube de 9
mètres ce côté à portée.
***Emplacement de niveau supérieur***.
Vous créez ou détruisez 40 litres d'eau supplémentaires, ou la taille
du Cube augmente de 1,50 mètre, pour chaque niveau d'emplacement de sort
supérieur à 1.`,
  },
  spikeGrowth: {
    name: `Croissance d'épines`,
    description: `Le
sol d'une Sphère de 6 mètres de rayon centrée sur un point à portée est
recouvert de piques et d'épines dures. La zone devient un Terrain
difficile pendant toute la durée du sort. Lorsqu'une créature pénètre
dans la zone, elle subit 2d4 dégâts perforants par tranche de 1,50 mètre
parcourue.
La transformation du sol est camouflée pour un aspect
naturel. Toute créature qui ne voit pas la zone au moment du lancement
du sort doit prendre une action Étude et réussir un jet de Sagesse
(Perception ou Survie) contre le DD de sauvegarde de son sort pour se
rendre compte que le terrain est dangereux avant d'y pénétrer.`,
  },
  plantGrowth: {
    name: `Croissance végétale`,
    description: `Ce
sort canalise la vitalité dans des plantes. Le temps d'incantation
utilisé détermine si le sort a l'effet Embroussaillement ou
Fertilisation (voir ci-dessous).
**Embroussaillement**.
Choisissez un point à portée. Toutes les plantes normales dans une
Sphère de 30 mètres de rayon centrée sur ce point deviennent denses et
envahissantes. Une créature se déplaçant dans cette zone doit dépenser 4
mètres de déplacement pour chaque mètre parcouru. Vous pouvez exclure
une ou plusieurs zones de n'importe quelle taille dans la zone d'effet
du sort.
**Fertilisation**. Toutes les plantes dans un
rayon de 750 mètres centré sur un point à portée sont enrichies pendant
365 jours. Les plantes produisent deux fois plus de nourriture que
normalement lorsqu'elles sont récoltées. Elles ne peuvent bénéficier que
d'une seule *croissance végétale* par an.`,
  },
  shillelagh: {
    name: `Crosse des druides`,
    description: `Le
gourdin ou le bâton que vous tenez est imprégné de la puissance de la
nature. Pour la durée du sort, vous pouvez utiliser votre
caractéristique d'incantation au lieu de la Force pour les jets
d'attaque et de dégâts des attaques au corps à corps avec cette arme, et
le dé de dégâts de l'arme devient un d8. Si l'attaque inflige des
dégâts, ceux-ci peuvent être de Force ou du type de dégâts normal de
l'arme (selon votre choix).
Le sort prend fin prématurément si vous le relancez ou si vous lâchez
l'arme.
***Amélioration de sort mineur***. Le dé de dégâts de l'arme change lorsque vous
atteignez les niveaux 5 (d10), 11 (d12) et 17 (2d6).`,
  },
  ottosIrresistibleDance: {
    name: `Danse irrésistible d'Otto`,
    description: ``,
  },
  knock: {
    name: `Déblocage`,
    description: `Choisissez
un objet visible à portée. Il peut s'agir d'une porte, d'une boîte,
d'un coffre, de menottes, d'un cadenas ou de tout autre objet contenant
un moyen ordinaire ou magique empêchant un accès.
Une cible maintenue
par un verrou ordinaire, coincée ou barrée, devient déverrouillée,
débloquée ou libérée. Si l'objet possède plusieurs verrous, un seul est
déverrouillé.
Si la cible est maintenue par *verrou arcanique*, ce sort est supprimé pendant
10 minutes, pendant lesquelles la cible peut être ouverte et fermée.
Lorsque vous lancez le sort, un coup
puissant qui émane de la cible retentit dans un rayon de 90 mètres.`,
  },
  eldritchBlast: {
    name: `Décharge occulte`,
    description: `Vous
lancez un rayon d'énergie crépitante. Effectuez une attaque à distance
contre une créature ou un objet à portée. Si l'attaque touche, la cible
subit 1d10 dégâts de force.
***Amélioration de sort mineur***.
Le sort crée deux rayons au niveau 5, trois au niveau 11 et quatre au
niveau 17. Vous pouvez diriger les rayons vers une même cible ou vers
des cibles différentes. Effectuez un jet d'attaque distinct pour chaque
rayon.`,
  },
  maze: {
    name: `Dédale`,
    description: ``,
  },
  disguiseSelf: {
    name: `Déguisement`,
    description: `Vous
vous transformez (vêtements, armure, armes et autres effets personnels
inclus) jusqu'à la fin du sort. Vous pouvez paraître plus petit ou plus
grand de 30 cm, et paraître plus lourd ou plus léger. Vous devez adopter
une forme dont la disposition des membres est identique à la vôtre. Mis
à part cela, l'ampleur de l'illusion dépend de vous.
Les changements
apportés par ce sort ne résistent pas à une inspection physique. Par
exemple, si vous utilisez ce sort pour ajouter un chapeau à votre tenue,
les objets le traversent et quiconque le touche ne ressent rien.
Pour
discerner que vous êtes déguisé, une créature doit prendre l'action
Étude pour inspecter votre apparence et réussir un jet d'Intelligence
(Investigation) contre le DD de sauvegarde de votre sort.`,
  },
  removeCurse: {
    name: `Délivrance des malédictions`,
    description: `À
votre contact, toutes les malédictions affectant une créature ou un
objet disparaissent. Si l'objet est un objet magique maudit, sa
malédiction demeure, mais le sort brise le lien de son propriétaire avec
l'objet, ce qui permet de le retirer ou de l'écarter.`,
  },
  demiplane: {
    name: `Demi-plan`,
    description: ``,
  },
  disintegrate: {
    name: `Désintégration`,
    description: ``,
  },
  seeInvisibility: {
    name: `Détection de l'invisibilité`,
    description: `Pendant
la durée du sort, vous voyez les créatures et objets qui ont l'état
Invisible comme s'ils étaient visibles, et vous pouvez voir dans le plan
Éthéré. Les créatures et objets qui s'y trouvent apparaissent
fantomatiques.`,
  },
  detectMagic: {
    name: `Détection de la magie`,
    description: `Pendant
la durée du sort, vous ressentez la présence d'effets magiques dans un
rayon de 9 mètres autour de vous. Si vous ressentez ces effets, vous
pouvez utiliser l'action Magie pour voir une faible aura autour de toute
créature ou objet visible dans la zone qui porte la magie. Si un effet a
été créé par un sort, vous connaissez l'école de magie du sort.
Le sort est bloqué par 30 cm de pierre, de
terre ou de bois, par 2,50 cm de métal, ou par une fine feuille de plomb.`,
  },
  detectThoughts: {
    name: `Détection des pensées`,
    description: `Vous
activez l'un des effets ci-dessous. Jusqu'à la fin du sort, vous pouvez
activer l'un ou l'autre par une action Magie lors de vos prochains
tours.
**Perception des pensées**. Vous percevez la
présence de pensées appartenant à des créatures qui connaissent des
langues ou sont télépathes dans un rayon de 9 mètres. Vous ne lisez pas
ces pensées, mais vous savez qu'une créature pensante est présente.
Le sort est bloqué par 30 cm de pierre,
de terre ou de bois, par 2,50 cm de métal, ou par une fine feuille de plomb.
**Lecture des
pensées**.
Ciblez une créature que vous pouvez voir dans un rayon de 9 mètres ou
une créature dans un rayon de 9 mètres détectée avec l'option Perception
des pensées. Vous savez ce qui préoccupe le plus la cible à ce moment
précis. Si la cible ne connaît aucune langue et n'est pas télépathe,
vous n'apprenez rien.
Par une action Magie lors de votre prochain
tour, vous pouvez tenter d'explorer plus profondément l'esprit de la
cible. Dans ce cas, la cible effectue un jet de sauvegarde de Sagesse.
En cas d'échec, vous discernez le raisonnement et les émotions de la
cible, ainsi qu'une préoccupation majeure (comme une inquiétude, de
l'amour ou de la haine). En cas de réussite, le sort prend fin. Dans
tous les cas, la cible sait que vous sondez son esprit, et tant que vous
ne détournez pas votre attention de son esprit, elle peut effectuer un
jet d'Intelligence (Arcanes) contre le DD de votre sauvegarde de sort,
mettant fin au sort en cas de réussite.`,
  },
  findTraps: {
    name: `Détection des pièges`,
    description: `Vous
détectez tout piège à portée qui se trouve dans votre champ de vision.
Un piège, pour ce sort, inclut tout objet ou mécanisme créé pour causer
des dégâts ou tout autre danger. Ainsi, le sort peut détecter les sorts *alarme* ou *glyphe de
garde*, ou un piège mécanique, mais ne révélerait pas une faiblesse naturelle du sol, un plafond instable
ou un gouffre caché.
Ce
sort révèle la présence d'un piège, mais pas son emplacement. Vous
apprenez la nature générale du danger que représente un piège détecté.`,
  },
  detectEvilAndGood: {
    name: `Détection du mal et du bien`,
    description: `Pendant
la durée du sort, vous détectez l'emplacement de toute aberration,
céleste, élémentaire, fée, fiélon ou mort-vivant dans un rayon de 9
mètres autour de vous. Vous détectez également si le sort *sanctification* est actif par ici et, si oui,
où.
Le sort est bloqué par 30 cm de pierre, de terre ou de bois, par 2,50 cm de métal, ou par une fine
feuille de plomb.`,
  },
  detectPoisonAndDisease: {
    name: `Détection du poison et des maladies`,
    description: `Pendant
la durée du sort, vous détectez l'emplacement des poisons, des
créatures venimeuses ou toxiques, et des contagions magiques dans un
rayon de 9 mètres autour de vous. Vous détectez le type de poison, de
créature ou de contagion dans chaque cas.
Le sort est bloqué par 30 cm de pierre, de terre ou de bois, par
2,50 cm de métal, ou par une fine feuille de plomb.`,
  },
  enthrall: {
    name: `Discours captivant`,
    description: `Vous
vous lancez dans un discours distrayant, obligeant les créatures de
votre choix que vous pouvez voir à portée à effectuer un jet de
sauvegarde de Sagesse. Toute créature que vous ou vos compagnons
combattez réussit automatiquement ce jet. En cas d'échec, la cible subit
un malus de -10 aux jets de Sagesse (Perception) et de Perception
passive jusqu'à la fin du sort.`,
  },
  tensersFloatingDisk: {
    name: `Disque flottant de Tenser`,
    description: `Ce
sort crée un plan de force circulaire et horizontal, de 90 cm de
diamètre et 2,50 cm d'épaisseur, flottant à 90 cm du sol dans un espace
libre de votre choix que vous pouvez voir et à portée. Le disque reste
en place pendant toute la durée du sort et peut supporter jusqu'à 250
kg. Si un poids supplémentaire est placé dessus, le sort prend fin et
tout ce qui se trouve sur le disque tombe au sol.
Le disque est
immobile tant que vous n'êtes pas à plus de 6 mètres de lui. Si vous
vous en éloignez de plus de 6 mètres, le disque vous suit et reste à 6
mètres ou moins de vous. Il peut se déplacer sur un terrain accidenté,
monter ou descendre des escaliers, des pentes, etc, mais il ne peut pas
franchir un dénivelé de 3 mètres ou plus. Par exemple, le disque ne peut
pas franchir une fosse de 3 mètres de profondeur, ni en sortir s'il
avait été créé au fond.
Si vous vous éloignez de plus de 30 mètres du
disque (généralement parce qu'il ne peut pas contourner un obstacle
pour vous suivre), le sort prend fin.`,
  },
  sequester: {
    name: `Dissimulation suprême`,
    description: ``,
  },
  dispelMagic: {
    name: `Dissipation de la magie`,
    description: `Choisissez
une créature, un objet ou un effet magique à portée. Tout sort en cours
de niveau 3 ou inférieur sur la cible prend fin. Pour chaque sort en
cours de niveau 4 ou supérieur sur la cible, effectuez un jet de
caractéristique en utilisant votre caractéristique d'incantation (DD 10
plus le niveau du sort). En cas de réussite, le sort prend fin.
***Emplacement de niveau
supérieur***.
Vous mettez automatiquement fin à un sort sur la cible si son niveau
est égal ou inférieur à celui de l'emplacement de sort utilisé.`,
  },
  dispelEvilAndGood: {
    name: `Dissipation du mal et du bien`,
    description: `Pendant
toute la durée du sort, les Célestes, Élémentaires, Fées, Fiélons et
Morts-vivants ont un Désavantage aux jets d'attaque contre vous. Vous
pouvez mettre fin prématurément au sort en utilisant l'une des fonctions
spéciales suivantes :
**Annulation d'enchantement**.
Par une action Magie, vous touchez une créature possédée par ou qui
subit l'état Charmé ou Effrayé par une ou plusieurs créatures des types
précités. La cible n'est plus possédée, charmée ou effrayée par ces
créatures.
**Renvoi**. Par une action Magie, vous ciblez
une créature que vous pouvez voir dans un rayon de 1,50 mètre et
qui possède l'un des types précités. La cible doit réussir un jet de
sauvegarde de Charisme ou être renvoyée sur son plan d'origine si elle
ne s'y trouve pas déjà. S'ils ne sont pas sur leur plan d'origine, les
Morts-vivants sont envoyés en Gisombre et les Fées en Féerie.`,
  },
  divination: {
    name: `Divination`,
    description: `Ce
sort vous met en contact avec un dieu ou ses serviteurs. Vous posez une
question concernant un objectif, un événement ou une activité
spécifique devant se produire dans les 7 prochains jours. Le MD vous
donne une réponse sincère, qui peut être une courte phrase ou une prose
cryptique. Le sort ne tient pas compte des circonstances susceptibles de
modifier la réponse, comme l'incantation d'autres sorts.
Si vous
lancez le sort plusieurs fois avant la fin d'un Repos long, vous avez 25
% de chances cumulées pour chaque incantation après la première de ne
pas obtenir de réponse.`,
  },
  fingerOfDeath: {
    name: `Doigt de mort`,
    description: ``,
  },
  dominateBeast: {
    name: `Domination de bête`,
    description: `Une
bête que vous pouvez voir à portée doit réussir un jet de sauvegarde de
Sagesse ou subir l'état Charmé pendant toute la durée du sort. La cible
bénéficie d'un Avantage pour ce jet si vous ou vos alliés la combattez.
Chaque fois que la cible subit des dégâts, elle renouvelle le jet de
sauvegarde, mettant fin au sort en cas de réussite.
Vous disposez
d'un lien télépathique avec la cible charmée tant que vous êtes sur le
même plan d'existence. À votre tour, vous pouvez utiliser ce lien pour
lui donner des ordres (aucune action requise), tels que « Attaque
cette créature », « Va là-bas » ou « Récupère cet
objet ». La cible fait de son mieux pour obéir pendant son tour. Si
elle exécute un ordre et ne reçoit aucune autre instruction de votre
part, elle agit et se déplace à sa guise, se concentrant sur sa
protection.
Vous pouvez ordonner à la cible de prendre une Réaction, mais vous devez prendre votre propre
Réaction pour cela.
***Emplacement de niveau supérieur***.
Votre concentration peut durer plus longtemps avec un emplacement de
sort de niveau 5 (jusqu'à 10 minutes), 6 (jusqu'à 1 heure) ou 7 ou plus
(jusqu'à 8 heures).`,
  },
  dominateMonster: {
    name: `Domination de monstre`,
    description: ``,
  },
  dominatePerson: {
    name: `Domination de personne`,
    description: `Un
humanoïde que vous pouvez voir à portée doit réussir un jet de
sauvegarde de Sagesse ou subir l'état Charmé pendant toute la durée du
sort. La cible bénéficie d'un Avantage sur ce jet si vous ou vos alliés
la combattez. Chaque fois que la cible subit des dégâts, elle renouvelle
le jet de sauvegarde, mettant fin au sort en cas de réussite.
Vous
disposez d'un lien télépathique avec la cible charmée tant que vous êtes
sur le même plan d'existence. À votre tour, vous pouvez utiliser ce
lien pour lui donner des ordres (aucune action requise), tels que
« Attaque cette créature », « Va là-bas » ou
« Récupère cet objet ». La cible fait de son mieux pour obéir
pendant son tour. Si elle exécute un ordre et ne reçoit aucune autre
instruction de votre part, elle agit et se déplace à sa guise, se
concentrant sur sa protection.
Vous pouvez ordonner à la cible de prendre une Réaction, mais vous devez
prendre votre propre Réaction pour cela.
***Emplacement de niveau supérieur***.
Votre concentration peut durer plus longtemps avec un emplacement de
sort de niveau 6 (jusqu'à 10 minutes), 7 (jusqu'à 1 heure) ou 8+
(jusqu'à 8 heures).`,
  },
  tongues: {
    name: `Don des langues`,
    description: `Ce
sort confère à la créature que vous touchez la capacité de comprendre
toute langue parlée qu'elle entend ainsi que le langage des signes. De
plus, lorsque la cible communique par la parole ou par des signes, toute
créature connaissant au moins une langue peut la comprendre si elle
peut entendre la parole ou voir les signes.`,
  },
  mislead: {
    name: `Double illusoire`,
    description: `Vous
obtenez l'état Invisible au moment où un double illusoire apparaît à
votre place. Ce double dure toute la durée du sort, mais l'invisibilité
prend fin immédiatement si vous effectuez un jet d'attaque, infligez des
dégâts ou lancez un sort.
Par une action Magie, vous pouvez déplacer
le double illusoire jusqu'à deux fois votre Vitesse et lui faire faire
des gestes, le faire parler et le faire se comporter comme vous le
souhaitez. Il est intangible et invulnérable.
Vous pouvez voir à travers ses yeux et entendre à travers ses
oreilles comme si vous étiez à sa place.`,
  },
  gentleRepose: {
    name: `Doux repos`,
    description: `Vous
touchez un cadavre ou d'autres restes. Pendant la durée du sort, la
cible est protégée de la décomposition et ne peut pas devenir un
mort-vivant.
Ce sort prolonge également le délai de résurrection de
la cible, car les jours passés sous son influence ne sont pas décomptés
du délai de résurrection de sorts tels que *rappel à
la vie*.`,
  },
  druidcraft: {
    name: `Druidisme`,
    description: `En chuchotant aux esprits de la nature, vous créez l'un des effets suivants à
portée.
**Capteur climatique**.
Vous créez un effet sensoriel inoffensif de taille TP qui prédit le
temps qu'il fera à votre emplacement pour les prochaines 24 heures. Cet
effet peut se manifester par un orbe doré pour un ciel dégagé, un nuage
pour la pluie, des flocons de neige pour la neige, etc. Cet effet
persiste pendant 1 round.
**Floraison**. Vous faites instantanément éclore une fleur, ouvrir une
gousse ou éclore un bourgeon.
**Effet sensoriel**.
Vous créez un effet sensoriel inoffensif, comme des feuilles qui
tombent, des fées dansantes spectrales, une légère brise, le bruit d'un
animal ou la faible odeur d'une mouffette. L'effet doit tenir dans un
Cube de 1,50 mètre de côté.
**Jeu avec le feu**. Vous allumez ou éteignez une bougie, une torche
ou un feu de camp.`,
  },
  compelledDuel: {
    name: `Duel forcé`,
    description: `Vous
tentez de forcer une créature à se battre en duel. Une créature que
vous pouvez voir à portée effectue un jet de sauvegarde de Sagesse. En
cas d'échec, la cible subit un Désavantage aux jets d'attaque contre
d'autres créatures que vous, et ne peut pas se déplacer volontairement
vers une case située à plus de 9 mètres de vous.
Le sort prend fin si
vous effectuez un jet d'attaque contre une créature autre que la cible,
si vous lancez un sort sur un ennemi autre que la cible, si un de vos
alliés inflige des dégâts à la cible ou si vous terminez votre tour à
plus de 9 mètres de la cible.`,
  },
  lightningBolt: {
    name: `Éclair`,
    description: `Un
éclair formant une Ligne de 30 mètres de long et 1,50 mètre de large
jaillit de vous dans la direction de votre choix. Toute créature sur la
Ligne effectue un jet de sauvegarde de Dextérité, subissant 8d6 dégâts
de foudre en cas d'échec, ou la moitié de ces dégâts en cas de réussite.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d6 pour chaque niveau d'emplacement de sort supérieur à
3.`,
  },
  sunburst: {
    name: `Éclat du soleil`,
    description: ``,
  },
  elementalism: {
    name: `Élémentalisme`,
    description: `Vous avez un contrôle sur les éléments, produisant un des effets suivants, dans les
limites de la portée :
**Appel d'air**.
Vous créez une brise assez forte pour faire onduler du tissu, soulever
la poussière, faire bruisser les feuilles d'un arbre et fermer une porte
ouverte ou des volets, dans un Cube de 1,50 mètre de côté.
**Appel de terre**.
Vous créez un fin voile de poussière ou de sable qui recouvre les
surfaces dans une zone de 1,50 mètre de côté. Ou sinon, vous pouvez
faire apparaitre un seul mot, avec votre écriture, dans la terre ou le
sable.
**Appel de feu**. Vous créez un fin nuage composé
de braises et de fumée colorée et parfumée (mais inoffensive) dans un
Cube de 1,50 mètre de côté. Vous choisissez la couleur et l'odeur de la
fumée, et les braises peuvent allumer bougies, torches et lampes dans la
zone du sort. L'odeur de la fumée persiste pendant 1 minute.
**Appel d'eau**.
Vous créez une bruine de brume fraiche qui humidifie légèrement les
créatures et les objets dans un Cube de 1,50 mètre de côté. Vous pouvez
aussi choisir de créer 20 cl d'eau potable, soit dans un récipient
ouvert, soit au sol. L'eau ainsi créée s'évapore en 1 minute.
**Façonnage élémentaire**.
Vous utilisez la poussière, le sable, le feu, la fumée, la brume ou
l'eau qui tiennent dans un Cube de 30 cm de côté pour former une forme
grossière (comme celle d'une créature ou d'un objet) pour 1 heure.`,
  },
  prismaticSpray: {
    name: `Embruns prismatiques`,
    description: ``,
  },
  imprisonment: {
    name: `Emprisonnement`,
    description: ``,
  },
  entangle: {
    name: `Enchevêtrement`,
    description: `Des
plantes agrippantes surgissent du sol dans un carré de 6 mètres de côté
à portée. Pendant la durée du sort, ces plantes transforment le sol de
la zone en Terrain difficile. Elles disparaissent à la fin du sort.
Toute
créature (autre que vous) présente dans la zone au moment du lancement
du sort doit réussir un jet de sauvegarde de Force ou subir l'état
Entravé jusqu'à la fin du sort. Une créature entravée peut effectuer un
jet de Force (Athlétisme) contre le DD de sauvegarde de votre sort. En
cas de réussite, elle se libère des plantes agrippantes et n'est plus
entravée par elles.`,
  },
  weird: {
    name: `Ennemi subconscient`,
    description: ``,
  },
  planarBinding: {
    name: `Entrave planaire`,
    description: `Vous
tentez de lier un Céleste, un Élémentaire, une Fée ou un Fiélon à votre
service. La créature doit être à portée pendant toute la durée du sort
(en général, la créature est d'abord invoquée au centre de la version
inversée du sort *cercle-magique*
pour la piéger pendant l'incantation). À la fin de l'incantation, la
cible doit réussir un jet de sauvegarde de Charisme ou être liée à votre
service pendant toute la durée du sort. Si la créature a été invoquée
ou créée par un autre sort, la durée de ce dernier est prolongée pour
correspondre à celle de ce sort.
Une créature liée doit obéir à vos
ordres du mieux qu'elle peut. Vous pouvez lui ordonner de vous
accompagner dans une aventure, de garder un lieu ou de délivrer un
message. Si la créature est Hostile, elle s'efforce de déformer vos
ordres pour atteindre ses propres objectifs. Si elle exécute entièrement
vos ordres avant la fin du sort, elle se rend à vous pour vous le
signaler si vous êtes sur le même plan d'existence. Si vous êtes sur un
autre plan, elle retourne à l'endroit où vous l'avez lié et y reste
jusqu'à la fin du sort.
***Emplacement de niveau supérieur***. La durée augmente avec un
emplacement de sort de niveau 6 (10 jours), 7 (30 jours), 8 (180 jours) et 9 (366 jours).`,
  },
  mordenkainensSword: {
    name: `Épée de Mordenkainen`,
    description: ``,
  },
  mindSpike: {
    name: `Épine mentale`,
    description: `Vous
envoyez une décharge d'énergie psionique dans l'esprit d'une créature
que vous pouvez voir à portée. La cible effectue un jet de sauvegarde de
Sagesse et subit 3d8 dégâts psychiques en cas d'échec, ou la moitié en
cas de réussite. En cas d'échec, vous connaissez toujours l'emplacement
de la cible jusqu'à la fin du sort, à condition d'être sur le même plan
d'existence qu'elle. Tant que vous avez cette connaissance, la cible ne
peut pas se cacher de vous, et si elle subit l'état Invisible, elle ne
bénéficie d'aucun avantage de cet état contre vous.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d8 pour chaque niveau d'emplacement de sort supérieur à
2.`,
  },
  sorcerousBurst: {
    name: `Éruption ensorcelée`,
    description: `Vous
lancez une énergie ensorcelée sur une créature ou un objet à portée.
Effectuez un jet d'attaque à distance contre la cible. Si l'attaque
touche, la cible subit 1d8 dégâts du type de votre choix : acide,
froid, feu, foudre, poison, psychique ou tonnerre.
Si vous obtenez un
8 sur un d8 pour ce sort, vous pouvez lancer un autre d8 et l'ajouter
aux dégâts. Lorsque vous lancez ce sort, le nombre maximal de d8 que
vous pouvez ajouter aux dégâts du sort est égal à votre modificateur de
caractéristique d'incantation.
***Amélioration de sort mineur***. Ces dégâts augmentent
de 1d8 lorsque vous atteignez les niveaux 5 (2d8), 11 (3d8) et 17 (4d8).`,
  },
  mindBlank: {
    name: `Esprit impénétrable`,
    description: ``,
  },
  spiritGuardians: {
    name: `Esprits gardiens`,
    description: `Des
esprits protecteurs vous entourent dans une Émanation de 4,50 mètres
pendant toute la durée du sort. Si vous êtes bon ou neutre, leur forme
spectrale apparaît angélique ou féerique (selon votre choix). Si vous
êtes mauvais, ils apparaissent comme des fiélons.
Lorsque vous lancez
ce sort, vous pouvez désigner des créatures qui ne seront pas
affectées. La Vitesse de toute autre créature est divisée par deux dans
l'Émanation, et chaque fois que l'Émanation entre dans l'espace d'une
créature ou qu'une créature y entre ou y termine son tour, elle doit
effectuer un jet de sauvegarde de Sagesse. En cas d'échec, la créature
subit 3d8 dégâts radiants (si vous êtes bon ou neutre) ou 3d8 dégâts
nécrotiques (si vous êtes mauvais). En cas de réussite, la créature
subit seulement la moitié des dégâts. Une créature n'effectue ce jet
qu'une seule fois par tour.
***Emplacement de niveau supérieur***. Les dégâts augmentent
de 1d8 pour chaque niveau d'emplacement de sort supérieur à 3.`,
  },
  feignDeath: {
    name: `État cadavérique`,
    description: `Vous touchez une créature consentante et la plongez dans un état cataleptique impossible
à distinguer de la mort.
Pendant
la durée du sort, la cible paraît morte à une inspection extérieure et
aux sorts utilisés pour déterminer son état. Elle subit les états
Aveuglé et Incapable d'agir, et sa Vitesse est de 0.
Elle bénéficie également d'une résistance à tous les
dégâts, sauf les dégâts psychiques, et d'une immunité à l'état Empoisonné.`,
  },
  awaken: {
    name: `Éveil`,
    description: `Vous
passez le temps d'incantation à tracer des chemins magiques dans une
pierre précieuse, puis vous touchez la cible. La cible doit être une
créature du type Bête ou Plante avec une Intelligence de 3 ou moins, ou
une plante naturelle qui n'est pas une créature. La cible gagne une
Intelligence de 10 et la capacité de parler une langue que vous
connaissez. Si la cible est une plante naturelle, elle devient une
créature de type plante et acquiert la capacité de bouger ses membres,
ses racines, ses lianes, etc, ainsi que des sens similaires à ceux d'un
humain. Le MD choisit le profil approprié pour la plante éveillée, comme
celles de l'**arbuste éveillé** ou de l'**arbre éveillé**.
La
cible éveillée a l'état Charmé pendant 30 jours ou jusqu'à ce que vous
ou vos alliés lui infligiez des blessures. Lorsque cet état prend fin,
la créature éveillée choisit son attitude envers vous.`,
  },
  fabricate: {
    name: `Fabrication`,
    description: `Vous
transformez des matières premières en produits du même matériau. Par
exemple, vous pouvez fabriquer un pont en bois à partir d'un bosquet
d'arbres, une corde à partir d'un morceau de chanvre, ou des vêtements
avec du lin ou de la laine.
Choisissez des matières premières que
vous pouvez voir à portée. Vous pouvez fabriquer un objet de taille TG
ou inférieure (un Cube de 3 mètres de côté ou huit Cubes de 1,50 mètre
reliés) avec une quantité suffisante de matériau. Cependant, si vous
travaillez le métal, la pierre ou tout autre substance minérale, l'objet
fabriqué ne peut pas être d'une taille supérieure à M (un Cube de 1,50
mètre de côté). La qualité de tout objet fabriqué dépend de la qualité
des matières premières.
Ce sort ne permet pas de créer des créatures
ni des objets magiques. Vous ne pouvez pas non plus l'utiliser pour
créer des objets nécessitant un haut niveau de compétence, comme des
armes et des armures, à moins de maîtriser les outils d'artisan utilisés
pour fabriquer ces objets.`,
  },
  stoneShape: {
    name: `Façonnage de la pierre`,
    description: `Vous
touchez un objet en pierre de taille M ou inférieure, ou un morceau de
pierre ne dépassant pas 1,50 mètre, et lui donnez la forme de votre
choix. Par exemple, vous pouvez façonner une grosse pierre en arme,
statue ou coffre, ou percer un petit passage à travers un mur de 1,50
mètre d'épaisseur. Vous pouvez également façonner une porte en pierre ou
son cadre pour la fermer hermétiquement. L'objet ainsi créé peut
comporter jusqu'à deux charnières et un loquet, mais aucun mécanisme
plus précis n'est possible.`,
  },
  divineFavor: {
    name: `Faveur divine`,
    description: `Jusqu'à la fin du sort, vos attaques avec des armes infligent 1d4 dégâts radiants
supplémentaires si vous touchez.`,
  },
  heroesFeast: {
    name: `Festin des héros`,
    description: ``,
  },
  featherFall: {
    name: `Feuille morte`,
    description: `Choisissez
jusqu'à cinq créatures à portée qui sont en chute libre. La vitesse de
chute d'une créature est réduite à 18 mètres par round jusqu'à la fin du
sort. Si une créature atterrit avant la fin du sort, elle ne subit
aucun dégât de la chute et le sort prend fin pour elle.`,
  },
  continualFlame: {
    name: `Flamme éternelle`,
    description: `Une
flamme jaillit d'un objet que vous touchez. L'effet projette une
Lumière vive sur un rayon de 6 mètres et une Lumière faible sur 6 mètres
supplémentaires. Elle ressemble à une flamme normale, mais ne produit
pas de chaleur et ne consomme pas de combustible. La flamme peut être
recouverte ou dissimulée, mais elle ne peut être ni étouffée ni éteinte.`,
  },
  sacredFlame: {
    name: `Flamme sacrée`,
    description: `Une
lueur semblable à une flamme s'abat sur une créature que vous pouvez
voir à portée. La cible doit réussir un jet de sauvegarde de Dextérité
ou subir 1d8 dégâts radiants. La cible ne bénéficie pas d'un Abri
partiel (1/2) ni d'un Abri important (3/4) pour ce jet de sauvegarde.
***Amélioration de sort
mineur***. Les dégâts augmentent de 1d8 aux niveaux 5 (2d8), 11 (3d8) et 17 (4d8).`,
  },
  produceFlame: {
    name: `Flammes`,
    description: `Une
flamme vacillante apparaît dans votre main et y reste pendant toute la
durée du sort. Tant qu'elle est là, elle n'émet aucune chaleur,
n'enflamme rien, et projette une Lumière vive sur un rayon de 6 mètres
et une Lumière faible sur 6 mètres supplémentaires. Le sort prend fin si
vous le relancez.
Jusqu'à la fin du sort, vous pouvez prendre une
action Magie pour lancer du feu sur une créature ou un objet dans un
rayon de 18 mètres. Effectuez une attaque de sort à distance. Si
l'attaque touche, la cible subit 1d8 dégâts de feu.
***Amélioration de sort mineur***.
Les dégâts augmentent de 1d8 lorsque vous atteignez les niveaux 5 (2d8), 11 (3d8) et 17 (4d8).`,
  },
  insectPlague: {
    name: `Fléau d'insectes`,
    description: `Des
essaims de sauterelles remplissent une Sphère de 6 mètres de rayon
centrée sur un point que vous choisissez à portée. La Sphère reste en
place pendant toute la durée du sort, sa zone a une visibilité réduite
et elle est considérée comme un Terrain difficile.
Lorsque l'essaim
apparaît, toute créature qu'il contient effectue un jet de sauvegarde de
Constitution, subissant 4d10 dégâts perforants en cas d'échec, ou la
moitié de ces dégâts en cas de réussite. Une créature effectue également
ce jet de sauvegarde lorsqu'elle entre dans la zone d'effet du sort
pour la première fois au cours d'un tour ou y termine son tour. Une
créature n'effectue ce jet qu'une seule fois par tour.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d10 pour chaque niveau d'emplacement de sort supérieur à
5.`,
  },
  melfsAcidArrow: {
    name: `Flèche acide de Melf`,
    description: `Une
flèche verte scintillante fonce vers une cible à portée et explose dans
un jet d'acide. Effectuez une attaque de sort à distance contre la
cible. Si l'attaque touche, la cible subit 4d4 dégâts d'acide, puis 2d4
dégâts d'acide à la fin de son prochain tour. En cas d'échec, la flèche
éclabousse la cible d'acide, lui infligeant la moitié des dégâts
initiaux.
***Emplacement de niveau supérieur***. Les dégâts (initiaux et ultérieurs)
augmentent de 1d4 pour chaque niveau d'emplacement de sort supérieur à 2.`,
  },
  lightningArrow: {
    name: `Flèche de foudre`,
    description: `Lorsque
votre attaque touche ou rate la cible, l'arme ou la munition utilisée
se transforme en éclair. Au lieu de subir les dégâts ou autres effets de
l'attaque, la cible subit 4d8 dégâts de foudre si l'attaque touche ou
la moitié de ces dégâts si elle rate. Chaque créature dans un rayon de 3
mètres autour de la cible effectue alors un jet de sauvegarde de
Dextérité, subissant 2d8 dégâts de foudre en cas d'échec ou la moitié de
ces dégâts en cas de réussite.
L'arme ou la munition reprend alors sa forme
normale.
***Emplacement de niveau supérieur***. Les dégâts des deux effets du sort
augmentent de 1d8 pour chaque niveau d'emplacement de sort supérieur à 3.`,
  },
  blight: {
    name: `Flétrissement`,
    description: `Une
créature que vous pouvez voir à portée effectue un jet de sauvegarde de
Constitution et subit 8d8 dégâts nécrotiques en cas d'échec, ou la
moitié de ces dégâts en cas de réussite. Une créature du type plante
rate automatiquement le jet de sauvegarde.
Vous pouvez également
cibler une plante non magique qui n'est pas une créature, comme un arbre
ou un arbuste. Celle-ci ne lance pas de jet de sauvegarde ; elle
se fane et meurt.
***Emplacement de niveau supérieur***. Les dégâts augmentent de 1d8
pour chaque niveau d'emplacement de sort supérieur à 4.`,
  },
  blur: {
    name: `Flou`,
    description: `Votre
corps devient flou. Pendant la durée du sort, toutes les créatures ont
un Désavantage aux jets d'attaque contre vous. Un attaquant est immunisé
contre cet effet s'il vous perçoit avec Vision aveugle ou Vision
véritable.`,
  },
  fountOfMoonlight: {
    name: `Fontaine de lune`,
    description: `Une
lumière froide enveloppe votre corps pendant toute la durée du sort,
émettant une Lumière vive dans un rayon de 6 mètres et une Lumière
faible sur 6 mètres supplémentaires.
Jusqu'à la fin du sort, vous
bénéficiez d'une Résistance aux dégâts radiants, et vos attaques de
corps à corps infligent 2d6 dégâts radiants supplémentaires si elles
touchent.
De plus, immédiatement après avoir subi des dégâts d'une
créature que vous pouvez voir dans un rayon de 18 mètres, vous pouvez
prendre une Réaction pour forcer la créature à effectuer un jet de
sauvegarde de Constitution. En cas d'échec, la créature subit l'état
Aveuglé jusqu'à la fin de votre prochain tour.`,
  },
  phantasmalForce: {
    name: `Force fantasmagorique`,
    description: `Vous
tentez de créer une illusion dans l'esprit d'une créature que vous
pouvez voir à portée. La cible effectue un jet de sauvegarde
d'Intelligence. En cas d'échec, vous créez un objet, une créature ou
tout autre phénomène fantasmatique ne dépassant pas un Cube de 3 mètres
de côté qui est perceptible uniquement par la cible pendant la durée du
sort. Le fantasme inclut du son, de la température et d'autres stimuli.
La
cible peut prendre une action Étude pour examiner le fantasme avec un
jet d'Intelligence (Investigation) contre le DD de sauvegarde de votre
sort. En cas de réussite, la cible réalise que le fantasme est une
illusion et le sort prend fin.
Sous l'effet du sort, la cible traite
le fantasme comme s'il était réel et rationalise toute conséquence
illogique de son interaction avec lui. Par exemple, si la cible traverse
un pont fantasmatique et survit à sa chute, elle croit que le pont
existe et que quelque chose d'autre a provoqué sa chute.
Une cible
affectée peut même subir des dégâts de l'illusion si le fantasme
représente une créature dangereuse ou un danger. À chacun de vos tours,
un tel fantasme peut infliger 2d8 dégâts psychiques à la cible si elle
se trouve dans sa zone ou dans un rayon de 1,50 mètre. La cible perçoit
les dégâts comme étant d'un type approprié à l'illusion.`,
  },
  etherealness: {
    name: `Forme éthérée`,
    description: ``,
  },
  gaseousForm: {
    name: `Forme gazeuse`,
    description: `Une
créature consentante que vous touchez se transforme, ainsi que tout ce
qu'elle porte, en un nuage brumeux pendant la durée du sort. Le sort
prend fin sur la cible si elle tombe à 0 point de vie ou si elle prend
une action Magie pour mettre fin au sort sur elle-même.
Sous cette
forme, la cible ne peut se déplacer qu'à une Vitesse de vol de 3 mètres
et peut faire un vol stationnaire. Elle peut entrer et occuper l'espace
d'une autre créature. Elle bénéficie d'une résistance aux dégâts
contondants, perforants et tranchants, d'une immunité à l'état À terre,
et d'un Avantage aux jets de sauvegarde de Force, de Dextérité et de
Constitution. Elle peut traverser des ouvertures étroites, mais traite
les liquides comme des surfaces solides.
La cible ne peut ni parler
ni manipuler des objets, et les objets qu'elle portait ne peuvent être
lâchés ou utilisés d'une quelconque manière. Enfin, elle ne peut ni
attaquer ni lancer des sorts.
***Emplacement de niveau supérieur***. Vous pouvez cibler
une créature supplémentaire pour chaque niveau d'emplacement de sort supérieur à 3.`,
  },
  tashasHideousLaughter: {
    name: `Fou rire de Tasha`,
    description: `Une
créature de votre choix que vous pouvez voir à portée effectue un jet
de sauvegarde de Sagesse. En cas d'échec, elle subit les états À
terre et Incapable d'agir pendant toute la durée du sort. Pendant
ce temps, elle rit de manière incontrôlable si elle en est capable, et
elle ne peut pas mettre fin à son état À terre.
À la fin de chacun de
ses tours et à chaque fois qu'elle subit des dégâts, elle effectue un
nouveau jet de sauvegarde de Sagesse. La cible bénéficie d'un Avantage
pour ce jet si celui-ci est déclenché par des dégâts. En cas de
réussite, le sort prend fin.
***Emplacement de niveau supérieur***. Vous pouvez cibler
une créature supplémentaire pour chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  thornWhip: {
    name: `Fouet épineux`,
    description: `Vous
créez un fouet semblable à une liane couverte d'épines qui s'abat à
votre ordre sur une créature à portée. Effectuez une attaque de sort au
corps à corps contre la cible. Si l'attaque touche, la cible subit 1d6
dégâts perforants, et si elle est de taille G ou inférieure, vous pouvez
la rapprocher de vous jusqu'à 3 mètres.
***Amélioration de sort mineur***. Les dégâts
augmentent de 1d6 aux niveaux 5 (2d6), 11 (3d6) et 17 (4d6).`,
  },
  mistyStep: {
    name: `Foulée brumeuse`,
    description: `Brièvement entouré d'une brume argentée, vous vous téléportez jusqu'à 9 mètres dans un
espace inoccupé que vous pouvez voir.`,
  },
  shatter: {
    name: `Fracassement`,
    description: `Un
bruit sourd retentit depuis un point de votre choix à portée. Toute
créature dans une Sphère de 3 mètres de rayon centrée sur ce point
effectue un jet de sauvegarde de Constitution, subissant 3d8 dégâts de
Tonnerre en cas d'échec ou la moitié de ces dégâts en cas de réussite.
Une créature artificielle a un Désavantage au jet.
Un objet non magique non porté subit également les dégâts
s'il se trouve dans la zone d'effet du sort.
***Emplacement de niveau supérieur***. Les
dégâts augmentent de 1d8 pour chaque niveau d'emplacement de sort supérieur à 2.`,
  },
  steelWindStrike: {
    name: `Frappe du vent d'acier`,
    description: `Vous
brandissez l'arme utilisée pour l'incantation, puis disparaissez pour
frapper comme le vent. Choisissez jusqu'à cinq créatures que vous pouvez
voir à portée. Effectuez une attaque de sort au corps à corps contre
chaque cible. En cas de succès, la cible subit 6d10 dégâts de force.
Vous vous téléportez ensuite dans un espace libre que vous pouvez voir
dans un rayon de 1,50 mètre autour de l'une des cibles.`,
  },
  ensnaringStrike: {
    name: `Frappe piégeuse`,
    description: `Lorsque
vous touchez la cible, des lianes avides apparaissent sur elle. Elle
effectue alors un jet de sauvegarde de Force. Une créature de taille G
ou supérieure bénéficie d'un Avantage pour ce jet de sauvegarde. En cas
d'échec, la cible subit l'état Entravé jusqu'à la fin du sort. En cas de
réussite, les lianes se dessèchent et le sort prend fin.
Tant
qu'elle est entravée, la cible subit 1d6 dégâts perforants au début de
chacun de ses tours. La cible ou une créature à sa portée peut prendre
une action pour effectuer un jet de Force (Athlétisme) contre le DD de
votre jet de sauvegarde de sort. En cas de réussite, le sort prend fin.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d6 pour chaque niveau d'emplacement de sort supérieur à
1.`,
  },
  meldIntoStone: {
    name: `Fusion dans la pierre`,
    description: `Vous
pénétrez dans un objet ou une surface en pierre suffisamment grand pour
contenir entièrement votre corps, vous fusionnant avec votre équipement
dans la pierre pendant la durée du sort. Vous devez toucher la pierre
pour ce faire. Rien de votre présence ne reste visible ou détectable par
des sens non magiques.
Aussi longtemps que vous fusionnez avec la
pierre, vous ne pouvez pas voir ce qui se passe à l'extérieur, et tous
les jets de Sagesse (Perception) que vous effectuez pour entendre les
sons extérieurs sont effectués avec un Désavantage. Vous restez
conscient du temps qui passe et pouvez lancer des sorts sur vous-même.
Vous pouvez utiliser 1,50 mètre de mouvement pour quitter la pierre à
l'endroit où vous y êtes entré, ce qui met fin au sort. Vous ne pouvez
pas bouger autrement.
Des dégâts physiques mineurs infligés à la
pierre ne vous blessent pas, mais sa destruction partielle ou une
modification de sa forme (au point que vous ne puissiez plus y entrer)
vous expulse et vous inflige 6d6 points de dégâts de force. La
destruction complète de la pierre (ou sa transmutation en une autre
substance) vous expulse et vous inflige 50 points de dégâts de force. Si
vous êtes expulsé, vous vous déplacez dans un espace inoccupé le plus
proche de l'endroit où vous êtes entré pour la première fois et subissez
l'état À terre.`,
  },
  guardianOfFaith: {
    name: `Gardien de la foi`,
    description: `Un
gardien spectral de taille G apparaît et flotte dans un espace libre
que vous pouvez voir à portée pendant la durée du sort. Le gardien
occupe cet espace, est invulnérable, et apparait sous une forme adaptée à
votre divinité ou à votre panthéon.
Tout ennemi qui se déplace dans
un rayon de 3 mètres autour du gardien pour la première fois au cours
d'un tour, ou qui y commence son tour, effectue un jet de sauvegarde de
Dextérité, subissant 20 dégâts radiants en cas d'échec, ou la moitié de
ces dégâts en cas de réussite. Le gardien disparaît après avoir infligé
un total de 60 dégâts.`,
  },
  tollTheDead: {
    name: `Glas`,
    description: `Vous
pointez une créature que vous pouvez voir à portée, et le son d'une
cloche douloureuse retentit jusqu'à 3 mètres de la cible. Celle-ci doit
réussir un jet de sauvegarde de Sagesse ou subir 1d8 dégâts nécrotiques.
Si elle n'a plus tous ses points de vie, elle subit 1d12 dégâts
nécrotiques au lieu de cela.
***Amélioration de sort mineur***. Les dégâts augmentent
d'un dé aux niveaux 5 (2d8 ou 2d12), 11 (3d8 ou 3d12) et 17 (4d8 ou 4d12).`,
  },
  moveEarth: {
    name: `Glissement de terrain`,
    description: ``,
  },
  globeOfInvulnerability: {
    name: `Globe d'invulnérabilité`,
    description: ``,
  },
  glyphOfWarding: {
    name: `Glyphe de garde`,
    description: `Vous
inscrivez un glyphe qui déclenche ensuite un effet magique. Vous
l'inscrivez soit sur une surface (comme une table ou un morceau de sol),
soit dans un objet pouvant être fermé (comme un livre ou un coffre)
pour le dissimuler. Le glyphe peut couvrir une zone ne dépassant pas 3
mètres de diamètre. Si la surface ou l'objet est déplacé à plus de 3
mètres de l'endroit où vous avez lancé le sort, le glyphe est brisé et
le sort prend fin sans être déclenché.
Le glyphe est presque
imperceptible et nécessite un jet de Sagesse (Perception) réussi contre
le DD de sauvegarde de votre sort pour le remarquer.
Lorsque vous
inscrivez le glyphe, vous définissez son déclencheur et choisissez s'il
s'agit d'une rune explosive ou d'un glyphe à sort, comme expliqué
ci-dessous.
**Déclencheur**. Vous décidez ce qui
déclenche le glyphe lorsque vous lancez le sort. Pour les glyphes
inscrits sur une surface, les déclencheurs courants incluent le fait de
toucher ou de marcher dessus, de retirer un autre objet le recouvrant ou
de s'en approcher à une certaine distance. Pour les glyphes inscrits
dans un objet, les déclencheurs courants incluent l'ouverture de cet
objet ou la vue du glyphe. Une fois le glyphe déclenché, le sort prend
fin.
Vous pouvez affiner le déclencheur afin que seules les créatures
de certains types l'activent (par exemple, le glyphe pourrait être
configuré pour affecter les Aberrations). Vous pouvez également définir
des conditions pour les créatures qui ne déclenchent pas le glyphe,
comme celles qui prononcent un mot de passe particulier.
**Rune explosive**.
Lorsqu'il est déclenché, une énergie magique jaillit du glyphe en une
Sphère de 6 mètres de rayon centrée sur le glyphe. Chaque créature dans
la zone effectue un jet de sauvegarde de Dextérité. Une créature subit
5d8 dégâts d'acide, de froid, de feu, de foudre ou de tonnerre (au choix
lors de la création du glyphe) en cas d'échec, ou la moitié de ces
dégâts en cas de réussite.
**Glyphe à sort**. Vous
pouvez stocker un sort préparé de niveau 3 ou inférieur dans le glyphe
en le lançant lors de la création du glyphe. Le sort doit cibler une
seule créature ou une zone. Le sort stocké n'a pas d'effet immédiat
lorsqu'il est lancé de cette manière.
Lorsque le glyphe est
déclenché, le sort stocké prend effet. Si le sort a une cible, il cible
la créature qui a déclenché le glyphe. Si le sort affecte une zone, la
zone est centrée sur cette créature. Si le sort invoque des créatures
hostiles ou crée des objets ou des pièges nuisibles, celles-ci
apparaissent au plus près de l'intrus et l'attaquent. Si le sort
requiert de la Concentration, il dure jusqu'à la fin de sa durée totale.
***Emplacement de niveau
supérieur***.
Les dégâts d'une rune explosive augmentent de 1d8 pour chaque niveau
d'emplacement de sort supérieur à 3. Si vous créez un glyphe de sort,
vous pouvez stocker n'importe quel sort jusqu'à un niveau identique à
celui de l'emplacement de sort utilisé pour le *glyphe de garde*.`,
  },
  grease: {
    name: `Graisse`,
    description: `De
la graisse ininflammable recouvre le sol sur une surface carrée de 3
mètres de côté centrée sur un point à portée et le transforme en Terrain
difficile pendant toute la durée du sort.
Lorsque la graisse
apparaît, toute créature se trouvant dans sa zone doit réussir un jet de
sauvegarde de Dextérité ou subir l'état À terre. Une créature qui entre
dans la zone ou y termine son tour doit également réussir ce jet de
sauvegarde ou subir l'état À terre.`,
  },
  longstrider: {
    name: `Grande foulée`,
    description: `Vous touchez une créature. La Vitesse de la cible augmente de 3 mètres jusqu'à la fin du
sort.
***Emplacement de niveau supérieur***. Vous pouvez cibler une créature
supplémentaire pour chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  hailOfThorns: {
    name: `Grêle d'épines`,
    description: `Lorsque
vous touchez la créature, ce sort crée une pluie d'épines qui jaillit
de votre arme à distance ou de vos munitions. La cible de l'attaque et
toute créature dans un rayon de 1,50 mètre autour d'elle effectuent un
jet de sauvegarde de Dextérité, subissant 1d10 dégâts perforants en cas
d'échec ou la moitié de ces dégâts en cas de réussite.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d10 pour chaque niveau d'emplacement de sort supérieur à
1.`,
  },
  heal: {
    name: `Guérison`,
    description: ``,
  },
  massHeal: {
    name: `Guérison de groupe`,
    description: ``,
  },
  haste: {
    name: `Hâte`,
    description: `Choisissez
une créature consentante que vous pouvez voir à portée. Jusqu'à la fin
du sort, la Vitesse de la cible est doublée, elle gagne un bonus de +2 à
la Classe d'Armure, bénéficie d'un Avantage aux jets de sauvegarde de
Dextérité et obtient une action supplémentaire à chacun de ses tours.
Cette action peut être utilisée uniquement pour prendre les actions
Attaque (une seule attaque), Pointe, Désengagement, Furtivité ou
Utilisation.
Lorsque le sort prend fin, la cible subit l'état
Incapable d'agir et sa Vitesse est de 0 jusqu'à la fin de son prochain
tour, tandis qu'une vague de léthargie la submerge.`,
  },
  heroism: {
    name: `Héroïsme`,
    description: `Une
créature consentante que vous touchez est imprégnée de bravoure.
Jusqu'à la fin du sort, elle est immunisée contre l'état Effrayé et
gagne des points de vie temporaires égaux au modificateur de votre
caractéristique d'incantation au début de chacun de ses tours.
***Emplacement de niveau
supérieur***. Vous pouvez cibler une créature supplémentaire pour chaque niveau d'emplacement de
sort supérieur à 1.`,
  },
  identify: {
    name: `Identification`,
    description: `Vous
touchez un objet pendant l'incantation du sort. S'il s'agit d'un objet
magique, vous connaissez ses propriétés et son utilisation, si un lien
est nécessaire et combien de charges il possède, le cas échéant. Vous
savez si des sorts en cours affectent l'objet et lesquels. Si l'objet a
été créé par un sort, vous connaissez le nom de ce sort.
Si par contre vous touchez une créature pendant
l'incantation, vous savez quels sorts l'affectent, le cas échéant.`,
  },
  minorIllusion: {
    name: `Illusion mineure`,
    description: `Vous
créez un son ou l'image d'un objet, à portée, qui se maintient pendant
toute la durée du sort. Voir les descriptions ci-dessous pour les
différents effets. L'illusion disparait si vous relancez ce sort.
Si
une créature entreprend l'action Étudier pour examiner le son ou
l'image, elle peut reconnaitre qu'il s'agit d'une illusion en
réussissant un jet d'Intelligence (Investigation) contre votre DD de
sauvegarde des sorts. Si une créature reconnait ainsi l'illusion pour ce
qu'elle est, la perçoit toujours, mais amoindrie.
**Son**.
Si vous créez un son, son intensité peut aller du chuchotement au cri.
Cela peut être votre voix, la voix de quelqu'un d'autre, un rugissement
de lion, un battement de tambour ou tout autre son de votre choix. Le
son se poursuit sans faiblir pendant toute la durée du sort, ou vous
pouvez choisir de faire différents sons individuels, à différents
intervalles, jusqu'à la fin du sort.
**Image**. Si vous
créez l'image d'un objet (comme une chaise, des empreintes boueuses ou
un petit coffre), cela ne peut pas être plus grand qu'un Cube de 1,50
mètre de côté. L'image ne produit ni son, ni lumière, ni odeur, ni autre
effet sensoriel. Interagir physiquement avec l'illusion révèle sa
nature, car elle est intangible.`,
  },
  programmedIllusion: {
    name: `Illusion programmée`,
    description: ``,
  },
  majorImage: {
    name: `Image majeure`,
    description: `Vous
créez l'image d'un objet, d'une créature ou d'un autre phénomène
visible ne dépassant pas un Cube de 6 mètres de côté. L'image apparaît à
un endroit que vous pouvez voir à portée et persiste pendant toute la
durée du sort. Elle semble réelle, incluant les sons, les odeurs et la
température appropriés à l'objet représenté, mais elle ne peut infliger
de dégâts ni provoquer d'états.
Si vous êtes à portée de l'illusion,
vous pouvez prendre une action Magie pour déplacer l'image vers un autre
endroit à portée. Lorsque l'image change d'emplacement, vous pouvez
modifier son apparence afin que ses mouvements paraissent naturels. Par
exemple, si vous créez l'image d'une créature et la déplacez, vous
pouvez la modifier pour qu'elle semble marcher. De même, vous pouvez
faire en sorte que l'illusion émette différents sons à différents
moments, voire lui faire tenir une conversation, par exemple.
L'interaction
physique avec l'image révèle qu'il s'agit d'une illusion, car des
objets peuvent la traverser. Une créature qui prend une action Étude
pour examiner l'image peut déterminer qu'il s'agit d'une illusion en
réussissant un jet d'Intelligence (Investigation) contre le DD de votre
sauvegarde de sort. Si une créature discerne l'illusion, elle peut voir à
travers l'image et ses autres capacités sensorielles s'évanouissent.
***Emplacement de niveau
supérieur***.
Le sort dure jusqu'à sa dissipation, sans nécessiter de concentration,
s'il est lancé avec un emplacement de sort de niveau 4 ou supérieur.`,
  },
  mirrorImage: {
    name: `Image miroir`,
    description: `Trois
copies illusoires de vous-même apparaissent dans votre espace. Jusqu'à
la fin du sort, les copies se déplacent avec vous et imitent vos
actions, changeant de position de sorte qu'il est impossible de
déterminer laquelle est réelle.
Chaque fois qu'une créature vous
touche avec un jet d'attaque pendant la durée du sort, lancez un d6 pour
chacune de vos copies restantes. Si au moins l'une des copies obtient 3
ou plus, une copie est touchée à votre place et détruite. Sinon, les
copies ignorent tous les autres dégâts et effets. Le sort prend fin
lorsque les trois copies sont détruites.
Une créature n'est pas affectée par ce sort si elle a l'état
Aveuglé, Vision aveugle ou Vision véritable.`,
  },
  projectImage: {
    name: `Image projetée`,
    description: ``,
  },
  silentImage: {
    name: `Image silencieuse`,
    description: `Vous
créez l'image d'un objet, d'une créature ou d'un autre phénomène
visible ne dépassant pas un Cube de 4,50 mètres de côté. L'image
apparaît à un endroit à portée et persiste pendant toute la durée du
sort. L'image est purement visuelle ; elle n'est accompagnée
d'aucun son, odeur ou autre effet sensoriel.
Par une action Magie,
vous pouvez déplacer l'image n'importe où à portée. Lorsque l'image
change d'emplacement, vous pouvez modifier son apparence afin que ses
mouvements paraissent naturels. Par exemple, si vous créez l'image d'une
créature et que vous la déplacez, vous pouvez la modifier pour qu'elle
semble marcher.
Une interaction physique avec l'image révèle qu'il
s'agit d'une illusion, car des objets peuvent la traverser. Une créature
qui prend l'action Étude pour examiner l'image peut déterminer qu'il
s'agit d'une illusion en réussissant un jet d'Intelligence
(Investigation) contre le DD de sauvegarde de votre sort. Si une
créature perçoit l'illusion pour ce qu'elle est, elle peut voir à
travers l'image.`,
  },
  holdMonster: {
    name: `Immobilisation de monstre`,
    description: `Choisissez
une créature que vous pouvez voir à portée. La cible doit réussir un
jet de sauvegarde de Sagesse ou subir l'état Paralysé pendant toute la
durée du sort. À la fin de chacun de ses tours, la cible renouvelle son
jet de sauvegarde, mettant fin au sort sur elle-même en cas de réussite.
***Emplacement de niveau
supérieur***. Vous pouvez cibler une créature supplémentaire pour chaque niveau d'emplacement de
sort supérieur à 5.`,
  },
  holdPerson: {
    name: `Immobilisation de personne`,
    description: `Choisissez
un humanoïde que vous pouvez voir à portée. La cible doit réussir un
jet de sauvegarde de Sagesse ou subir l'état Paralysé pendant toute la
durée du sort. À la fin de chacun de ses tours, la cible renouvelle son
jet de sauvegarde, mettant fin au sort sur elle-même en cas de réussite.
***Emplacement de niveau
supérieur***. Vous pouvez cibler un humanoïde supplémentaire pour chaque niveau d'emplacement de
sort supérieur à 2.`,
  },
  bane: {
    name: `Imprécation`,
    description: `Jusqu'à
trois créatures de votre choix que vous pouvez voir à portée doivent
chacune effectuer un jet de sauvegarde de Charisme. Lorsqu'une cible qui
rate ce jet de sauvegarde effectue un jet d'attaque ou de sauvegarde
avant la fin du sort, elle doit soustraire 1d4 à son jet d'attaque ou de
sauvegarde.
***Emplacement de niveau supérieur***. Vous pouvez cibler une créature
supplémentaire pour chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  command: {
    name: `Injonction`,
    description: `Vous
donnez un ordre d'un seul mot à une créature que vous pouvez voir à
portée. La cible doit réussir un jet de sauvegarde de Sagesse ou suivre
l'ordre à son prochain tour. Choisissez l'ordre parmi ces options :
**Approche**.
La cible se dirige vers vous par le chemin le plus court et le plus
direct, mettant fin à son tour si elle se trouve à 1,50 mètre ou
moins de vous.
**Lâche**. La cible laisse tomber ce qu'elle tient et termine son
tour.
**Fuis**. La cible passe son tour à s'éloigner de vous par le moyen le plus
rapide.
**Rampe**. La cible a l'état À terre et termine son tour.
**Halte**. À
son tour, la cible ne bouge pas et n'effectue aucune action ni action Bonus.
***Emplacement de
niveau supérieur***. Vous pouvez affecter une créature supplémentaire pour chaque niveau
d'emplacement de sort supérieur à 1.`,
  },
  giantInsect: {
    name: `Insecte géant`,
    description: `Vous
invoquez un mille-pattes, une araignée ou une guêpe géante (choisie
lors du lancement du sort). L'insecte se manifeste dans un espace libre
que vous pouvez voir à portée et utilise le profil de l'**insecte géant**.
La forme choisie détermine certains détails de son profil. La créature
disparaît lorsqu'elle tombe à 0 point de vie ou à la fin du sort.
Cette
créature est votre alliée et celle de vos alliés. En combat, elle
partage votre Initiative, mais son tour commence immédiatement après le
vôtre. Elle obéit à vos ordres verbaux (aucune action requise). Si vous
n'en donnez pas, elle prend l'action Esquive et utilise son mouvement
pour éviter le danger.
***Emplacement de niveau supérieur***. Utilisez le niveau de
l'emplacement de sort pour le niveau du sort dans le profil.`,
  },
  forbiddance: {
    name: `Interdiction`,
    description: ``,
  },
  reverseGravity: {
    name: `Inversion de la gravité`,
    description: ``,
  },
  invisibility: {
    name: `Invisibilité`,
    description: `Une
créature que vous touchez obtient l'état Invisible jusqu'à la fin du
sort. Le sort prend fin prématurément si la cible effectue un jet
d'attaque, inflige des dégâts ou lance un sort.
***Emplacement de niveau supérieur***.
Vous pouvez cibler une créature supplémentaire pour chaque niveau d'emplacement de sort supérieur à 2.`,
  },
  greaterInvisibility: {
    name: `Invisibilité suprême`,
    description: `Une créature que vous touchez obtient l'état Invisible jusqu'à la fin du sort.`,
  },
  conjureAnimals: {
    name: `Invocation d'animaux`,
    description: `Vous
invoquez des esprits de la nature qui apparaissent comme une grande
meute d'animaux spectraux et intangibles dans un espace libre que vous
pouvez voir à portée. La meute reste durant toute la durée du sort et
vous choisissez la forme animale des esprits, comme un loup, un serpent
ou un oiseau.
Vous bénéficiez d'un Avantage aux jets de sauvegarde de
Force tant que vous êtes à 1,50 mètre ou moins de la meute, et lorsque
vous vous déplacez pendant votre tour, vous pouvez également déplacer la
meute jusqu'à 9 mètres vers un espace libre que vous pouvez voir.
Chaque fois que la meute se déplace à 3 mètres ou moins d'une créature
que vous pouvez voir, ou qu'une créature que vous pouvez voir entre dans
un rayon de 3 mètres autour de la meute ou y termine son tour, vous
pouvez forcer cette créature à effectuer un jet de sauvegarde de
Dextérité. En cas d'échec, la créature subit 3d10 dégâts tranchants. Une
créature n'effectue ce jet qu'une seule fois par tour.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d10 pour chaque niveau d'emplacement de sort supérieur à
3.`,
  },
  conjureElemental: {
    name: `Invocation d'élémentaire`,
    description: `Vous
invoquez un esprit intangible de taille G, issu des plans élémentaires,
qui apparaît dans un espace libre à portée. Choisissez l'élément de
l'esprit, qui détermine le type de dégâts : air (foudre), terre
(tonnerre), feu (feu) ou eau (froid). L'esprit persiste pendant toute la
durée du sort.
Chaque fois qu'une créature que vous pouvez voir
entre dans l'espace de l'esprit ou commence son tour à 1,50 m ou
moins de lui, vous pouvez la forcer à effectuer un jet de sauvegarde de
Dextérité si l'esprit n'a entravée aucune autre créature. En cas
d'échec, la cible subit 8d8 dégâts du type de l'esprit et subit aussi
l'état Entravée jusqu'à la fin du sort. Au début de chacun de ses tours,
la cible entravée refait son jet de sauvegarde. En cas d'échec, la
cible subit 4d8 dégâts du type de l'esprit. En cas de réussite, la cible
n'est plus entravée par l'esprit.
***Emplacement de niveau supérieur***. Les dégâts
augmentent de 1d8 pour chaque niveau d'emplacement de sort supérieur à 5.`,
  },
  conjureMinorElementals: {
    name: `Invocation d'élémentaires mineurs`,
    description: `Vous
invoquez des esprits des plans élémentaires qui voltigent autour de
vous sous forme d'Émanation de 4,50 mètres pendant toute la durée du
sort. Jusqu'à la fin du sort, chaque attaque que vous effectuez inflige
2d8 dégâts supplémentaires lorsque vous touchez une créature dans
l'Émanation. Ces dégâts sont d'acide, de froid, de feu ou de foudre (au
choix lors de l'attaque). De plus, le sol de l'Émanation est un terrain
difficile pour vos ennemis.
***Emplacement de niveau supérieur***. Les dégâts augmentent
de 1d8 pour chaque niveau d'emplacement de sort supérieur à 4.`,
  },
  conjureWoodlandBeings: {
    name: `Invocation d'êtres sylvestres`,
    description: `Vous
invoquez des esprits de la nature qui voltigent autour de vous sous
forme d'Émanation de 3 mètres pendant la durée du sort. Chaque fois que
l'Émanation pénètre dans l'espace d'une créature que vous pouvez voir,
ou chaque fois qu'une créature que vous pouvez voir y pénètre ou y
termine son tour, vous pouvez forcer cette créature à effectuer un jet
de sauvegarde de Sagesse. La créature subit 5d8 dégâts de Force en cas
d'échec, ou la moitié de ces dégâts en cas de réussite. Une créature
n'effectue ce jet qu'une seule fois par tour.
De plus, vous pouvez prendre l'action Désengagement comme
action Bonus pendant la durée du sort.
***Emplacement de niveau supérieur***. Les dégâts
augmentent de 1d8 pour chaque niveau d'emplacement de sort supérieur à 4.`,
  },
  conjureCelestial: {
    name: `Invocation de céleste`,
    description: ``,
  },
  conjureFey: {
    name: `Invocation de fée`,
    description: ``,
  },
  conjureBarrage: {
    name: `Invocation de projectiles|Hérissement`,
    description: `Vous
brandissez l'arme utilisée pour lancer le sort et invoquez des armes
spectrales similaires (ou des munitions adaptées à l'arme) qui se
projettent vers l'avant puis disparaissent. Chaque créature de votre
choix que vous pouvez voir dans un Cône de 18 mètres effectue un jet de
sauvegarde de Dextérité, subissant 5d8 dégâts de Force en cas d'échec ou
la moitié de ces dégâts en cas de réussite.
***Emplacement de niveau supérieur***. Les
dégâts augmentent de 1d8 pour chaque niveau d'emplacement de sort supérieur à 3.`,
  },
  conjureVolley: {
    name: `Invocation de volée`,
    description: `Vous
brandissez l'arme utilisée pour lancer le sort et choisissez un point à
portée. Des centaines d'armes spectrales similaires (ou de munitions
adaptées) tombent en une volée puis disparaissent.
Chaque créature de
votre choix que vous pouvez voir dans un Cylindre de 12 mètres de rayon
et de 6 mètres de haut centré sur ce point effectue un jet de
sauvegarde de Dextérité. Une créature subit 8d8 dégâts de force en cas
d'échec, ou la moitié de ces dégâts en cas de réussite.`,
  },
  flameBlade: {
    name: `Lame de feu`,
    description: `Vous
invoquez une lame ardente dans votre main libre. La lame, de taille et
de forme similaires à celles d'un cimeterre, reste active pendant toute
la durée du sort. Si vous la lâchez, elle disparaît, mais vous pouvez la
réinvoquer par une action Bonus.
Par une action Magie, vous pouvez
effectuer une attaque de sort au corps à corps avec la lame ardente. Si
l'attaque touche, la cible subit des dégâts de feu égaux à 3d6, plus le
modificateur de votre caractéristique d'incantation.
La lame ardente projette une Lumière vive sur un rayon
de 3 mètres et une Lumière faible sur 3 mètres supplémentaires.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d6 pour chaque niveau d'emplacement de sort supérieur à
2.`,
  },
  slow: {
    name: `Lenteur`,
    description: `Vous
modifiez le temps pour un maximum de six créatures de votre choix dans
un Cube de 12 mètres de côté à portée. Chaque cible doit réussir un jet
de sauvegarde de Sagesse ou être affectée pendant toute la durée du
sort.
La Vitesse de la cible affectée est divisée par deux, elle
subit un malus de -2 à la CA et à ses jets de sauvegarde de Dextérité,
et elle ne peut pas prendre de Réactions. À chacun de ses tours, elle
peut prendre soit une action, soit une action Bonus, mais pas les deux,
et elle ne peut effectuer qu'une seule attaque si elle prend l'action
Attaque. Si elle lance un sort à composante somatique, il y a 25 % de
chances que le sort échoue car la cible effectue les gestes du sort trop
lentement.
Une cible affectée refait son jet de sauvegarde à la fin
de chacun de ses tours, mettant fin au sort sur elle-même en cas de
réussite.`,
  },
  levitate: {
    name: `Lévitation`,
    description: `Une
créature ou un objet mobile de votre choix, que vous pouvez voir à
portée, s'élève verticalement jusqu'à 6 mètres et reste suspendu pendant
toute la durée du sort. Le sort peut faire léviter un objet pesant
jusqu'à 250 kg. Une créature non consentante qui réussit un jet de
sauvegarde de Constitution n'est pas affectée.
La cible ne peut se
déplacer qu'en s'appuyant contre un objet ou une surface fixe à portée
(comme un mur ou un plafond), ce qui lui permet de se déplacer comme si
elle grimpait. Vous pouvez modifier l'altitude de la cible jusqu'à 6
mètres dans les deux sens pendant votre tour. Si vous êtes la cible,
vous pouvez vous déplacer vers le haut ou vers le bas. Sinon, vous
pouvez prendre une action Magie pour déplacer la cible, qui doit rester à
portée du sort.
À la fin du sort, la cible retombe doucement au sol si elle est toujours en l'air.`,
  },
  graspingVine: {
    name: `Liane avide`,
    description: `Vous
invoquez une liane qui pousse sur une surface dans un espace libre que
vous pouvez voir à portée. La liane persiste pour toute la durée du
sort.
Effectuez une attaque de sort au corps à corps contre une
créature dans un rayon de 9 mètres autour de la liane. Si l'attaque
touche, la cible subit 4d8 dégâts contondants et la liane l'attire de
jusqu'à 9 mètres vers elle ; si la cible est de taille G ou
inférieure, elle subit l'etat Agrippé (évasion DD égal au DD de
sauvegarde de votre sort). La liane ne peut agripper qu'une seule
créature à la fois, et vous pouvez lui faire libérer une créature
agrippée (aucune action requise).
Par une action Bonus lors de vos
tours suivants, vous pouvez répéter l'attaque contre une créature dans
un rayon de 9 mètres autour de la liane.
***Emplacement de niveau supérieur***. Le nombre
de créatures que la liane peut agripper augmente de un pour chaque niveau d'emplacement de sort supérieur à
4.`,
  },
  freedomOfMovement: {
    name: `Liberté de mouvement`,
    description: `Vous
touchez une créature consentante. Pendant la durée du sort, les
mouvements de la cible ne sont pas affectés par un Terrain difficile, et
les sorts et autres effets magiques ne peuvent ni réduire sa Vitesse ni
lui infliger les états Paralysé ou Entravé. La cible a également une
Vitesse de nage égale à sa Vitesse.
De plus, la cible peut utiliser
1,50 mètre de mouvement pour s'échapper automatiquement des entraves non
magiques, comme des menottes ou une créature lui imposant l'état
Agrippé.
***Emplacement de niveau supérieur***. Vous pouvez cibler une créature
supplémentaire pour chaque niveau d'emplacement de sort supérieur à 4.`,
  },
  wardingBond: {
    name: `Lien de protection`,
    description: `Vous
touchez une autre créature consentante et créez une connexion mystique
entre vous et la cible jusqu'à la fin du sort. Tant que la cible est
dans un rayon de 18 mètres autour de vous, elle bénéficie d'un bonus de
+1 à la CA et aux jets de sauvegarde, et d'une résistance à tous les
dégâts. Par contre, chaque fois qu'elle subit des dégâts, vous subissez
le même montant.
Le sort prend fin si vous tombez à 0 point de vie ou
si vous et la cible êtes séparés de plus de 18 mètres. Il prend
également fin si le sort est lancé à nouveau sur l'une des créatures
connectées.`,
  },
  rarysTelepathicBond: {
    name: `Lien télépathique de Rary`,
    description: `Vous
créez un lien télépathique entre un maximum de huit créatures
consentantes de votre choix à portée, reliant psychiquement chaque
créature à toutes les autres pendant la durée du sort. Les créatures qui
ne peuvent communiquer dans aucune langue ne sont pas affectées par ce
sort.
Jusqu'à la fin du sort, les cibles peuvent communiquer
télépathiquement grâce au lien, qu'elles partagent ou non une langue. La
communication est possible à n'importe quelle distance, mais ne peut
s'étendre à d'autres plans d'existence.`,
  },
  locateAnimalsOrPlants: {
    name: `Localisation d'animaux ou de plantes`,
    description: `Décrivez
ou nommez une créature de type bête ou plante, ou une plante non
magique. Vous connaissez la direction et la distance entre vous et la
créature ou plante correspondante la plus proche dans un rayon de 7,5
km, le cas échéant.`,
  },
  locateObject: {
    name: `Localisation d'objet`,
    description: `Décrivez
ou nommez un objet qui vous est familier. Vous percevez la direction de
l'objet s'il se trouve dans un rayon de 300 mètres autour de vous. S'il
est en mouvement, vous savez dans quelle direction il se dirige.
Le
sort peut localiser un objet spécifique que vous connaissez si vous
l'avez vu de près (à 9 mètres ou moins) au moins une fois. Il peut
également localiser l'objet le plus proche d'un type particulier, comme
un vêtement, un bijou, un meuble, un outil ou une arme.
Ce sort ne peut localiser un objet si une épaisseur
de plomb bloque un chemin direct entre vous et l'objet.`,
  },
  locateCreature: {
    name: `Localisation de créature`,
    description: `Décrivez
ou nommez une créature qui vous est familière. Vous sentez la direction
dans laquelle se trouve la créature si elle est à 300 mètres ou moins
de vous. Si la créature se déplace, vous avec conscience de la direction
de son mouvement.
Le sort peut localiser une créature spécifique que
vous connaissez ou la créature la plus proche d'une espèce spécifique
(comme un humain ou une licorne) si vous en avez vu une de près (à 9
mètres ou moins) au moins une fois. Si la créature que vous avez décrite
ou nommée est sous une forme différente, par exemple sous l'effet d'un
sort de *pétrification* ou de *métamorphose*, ce sort ne la localise pas.
Ce sort ne peut
localiser une créature si une épaisseur de plomb bloque un chemin direct entre vous et elle.`,
  },
  beaconOfHope: {
    name: `Lueur d'espoir`,
    description: `Choisissez
autant de créatures que vous le souhaitez à portée. Pendant toute la
durée du sort, chaque cible bénéficie d'un Avantage aux jets de
sauvegarde de Sagesse et aux jets de sauvegarde contre la Mort, et elle
récupère le maximum de points de vie possible lors de soins.`,
  },
  faerieFire: {
    name: `Lueurs féeriques`,
    description: `Les
objets situés dans un Cube de 6 mètres de côté à portée sont entourés
d'une lumière bleue, verte ou violette (selon votre choix). Toute
créature présente dans le Cube est également délimitée si elle rate un
jet de sauvegarde de Dextérité. Pendant la durée du sort, les objets et
les créatures affectées émettent une Lumière faible sur un rayon de 3
mètres et ne peuvent pas bénéficier de l'état Invisible.
Les jets d'attaque contre une créature ou un objet
affecté ont un Avantage si l'attaquant peut le voir.`,
  },
  light: {
    name: `Lumière`,
    description: `Vous
touchez un objet de taille G ou inférieure qui n'est pas porté par
quelqu'un d'autre. Jusqu'à la fin du sort, l'objet émet une Lumière vive
sur un rayon de 6 mètres et une Lumière faible sur 6 mètres
supplémentaires. La lumière peut être colorée à votre guise. Recouvrir
l'objet par quelque chose d'opaque bloque la lumière. Le sort prend fin
si vous le relancez.`,
  },
  daylight: {
    name: `Lumière du jour`,
    description: `Pendant
la durée du sort, une lumière solaire se propage depuis un point à
portée et remplit une Sphère de 18 mètres de rayon. La zone d'effet est
dans une Lumière vive et diffuse une Lumière faible sur 18 mètres
supplémentaires.
Vous pouvez également lancer le sort sur un objet
non porté. Dans ce cas la lumière solaire remplit une Émanation de 18
mètres provenant de cet objet. Recouvrir cet objet avec quelque chose
d'opaque, comme un bol ou un casque, bloque la lumière solaire.
Si
une partie de la zone d'effet de ce sort chevauche une zone de Ténèbres
créée par un sort de niveau 3 ou inférieur, cet autre sort est dissipé.`,
  },
  dancingLights: {
    name: `Lumières dansantes`,
    description: `Vous
créez jusqu'à quatre lumières de la taille d'une torche à portée, les
faisant apparaître comme des torches, des lanternes ou des orbes
lumineuses flottant pendant la durée du sort. Vous pouvez également
combiner les quatre lumières pour former une silhouette de taille M
vaguement humaine. Quelle que soit la forme choisie, chaque lumière
diffuse une Lumière faible sur un rayon de 3 mètres.
Par une action
Bonus, vous pouvez déplacer les lumières jusqu'à 18 mètres vers un
espace à portée. Une lumière doit se trouver à 6 mètres ou moins d'une
autre lumière créée par ce sort. Elle disparaît si elle dépasse la
portée du sort.`,
  },
  bigbysHand: {
    name: `Main de Bigby`,
    description: `Vous
créez une main de taille G d'énergie magique scintillante dans un
espace libre, que vous pouvez voir et à portée. La main reste active
pendant toute la durée du sort et se déplace à votre guise, imitant les
mouvements de votre propre main.
La main est un objet doté d'une CA
de 20 et de points de vie égaux à votre maximum de points de vie. Si
elle tombe à 0, le sort prend fin. La main n'occupe pas son espace.
Lorsque
vous lancez le sort et par une action Bonus lors de vos tours suivants,
vous pouvez déplacer la main jusqu'à 18 mètres et provoquer l'un des
effets suivants :
**Poing serré**. La main frappe
une cible dans un rayon de 1,50 mètre. Effectuez une attaque de sort au
corps à corps. Si l'attaque touche, la cible subit 5d8 dégâts de force.
**Main impérieuse**.
La main tente de pousser une créature de taille TG ou inférieure dans
un rayon de 1,50 mètre. La cible doit réussir un jet de sauvegarde de
Force, ou la main la pousse jusqu'à 1,50 mètre plus 1,5 fois votre
modificateur de caractéristique d'incantation. La main se déplace avec
la cible, restant dans un rayon de 1,50 mètre autour d'elle.
**Main agrippeuse**.
La main tente d'agripper une créature de taille TG ou inférieure dans
un rayon de 1,50 mètre. La cible doit réussir un jet de sauvegarde de
Dextérité, ou elle est agrippée, avec un DD d'évasion égal à votre DD de
sauvegarde des sorts. Tant que la main agrippe la cible, vous pouvez
prendre une action Bonus pour l'écraser, infligeant à la cible des
dégâts contondants égaux à 4d6 plus votre modificateur de
caractéristique d'incantation.
**Main interposée**. La
main vous confère un Abri partiel contre les attaques et autres effets
provenant de son emplacement ou le traversant. De plus, son emplacement
est considéré comme un Terrain difficile pour vos ennemis.
Utilisation
d'un niveau supérieur. Les dégâts de Poing serré augmentent de 2d8 et
les dégâts de Main agrippeuse augmentent de 2d6 pour chaque niveau
d'emplacement de sort supérieur à 5.`,
  },
  mageHand: {
    name: `Main de mage`,
    description: `Une
main spectrale et flottante apparaît à un endroit que vous choisissez à
portée. La main reste active pendant toute la durée du sort. Elle
disparaît si elle s'éloigne de vous de plus de 9 mètres ou si vous
relancez ce sort.
Lorsque vous lancez ce sort, vous pouvez utiliser
la main pour manipuler un objet, ouvrir une porte ou un contenant
déverrouillé, ranger ou récupérer un objet d'un contenant ouvert, ou
vider le contenu d'une fiole.
Par une action Magie lors de vos tours
ultérieurs, vous pouvez continuer de contrôler la main ainsi. Cette
action vous permet de déplacer la main jusqu'à 9 mètres.
La main ne peut pas attaquer, ni activer des objets
magiques, ni porter plus de 5 kg.`,
  },
  burningHands: {
    name: `Mains brûlantes`,
    description: `Une
fine nappe de flammes jaillit de vous. Toute créature dans un Cône de
4,50 mètres effectue un jet de sauvegarde de Dextérité, subissant 3d6
dégâts de feu en cas d'échec, ou la moitié de ces dégâts en cas de
réussite.
Les objets inflammables dans le Cône qui ne sont pas portés commencent à
brûler.
***Emplacement de niveau supérieur***. Les dégâts augmentent de 1d6 pour chaque
niveau d'emplacement de sort supérieur à 1.`,
  },
  bestowCurse: {
    name: `Malédiction`,
    description: `Vous
touchez une créature, qui doit réussir un jet de sauvegarde de Sagesse
ou être maudite pendant toute la durée du sort. Jusqu'à la fin de la
malédiction, la cible subit l'un des effets suivants, au choix :
- 
Choisissez une caractéristique. La cible a un Désavantage aux jets de
caractéristique et aux jets de sauvegarde effectués avec cette
caractéristique.
- La cible a un Désavantage aux jets d'attaque contre vous.
- 
En combat, la cible doit réussir un jet de sauvegarde de Sagesse au
début de chacun de ses tours ou être forcée de prendre l'action Esquive
durant ce tour.
- Si vous infligez des dégâts à la cible avec un jet d'attaque ou un sort, elle subit 1d8
dégâts nécrotiques supplémentaires.
***Emplacement de niveau supérieur***.
Si vous lancez ce sort avec un emplacement de sort de niveau 4, vous
pouvez maintenir votre concentration pendant 10 minutes maximum. Si
vous utilisez un emplacement de sort de niveau 5 ou supérieur, le sort
ne nécessite pas de concentration et sa durée passe à 8 heures
(emplacement de niveau 5 ou 6) ou 24 heures (emplacement de niveau 7 ou
8). Si vous utilisez un emplacement de sort de niveau 9, le sort dure
jusqu'à sa dissipation.`,
  },
  hex: {
    name: `Maléfice`,
    description: `Vous
jetez une malédiction sur une créature que vous pouvez voir à portée.
Jusqu'à la fin du sort, vous infligez 1d6 dégâts nécrotiques
supplémentaires à la cible à chaque jet d'attaque. Choisissez également
une caractéristique lorsque vous lancez le sort. La cible subit un
désavantage aux jets de caractéristique effectués avec la
caractéristique choisie.
Si la cible tombe à 0 point de vie avant la
fin du sort, vous pouvez utiliser une action Bonus lors d'un tour
ultérieur pour maudire une nouvelle créature.
***Emplacement de niveau supérieur***.
Votre concentration peut durer plus longtemps avec un emplacement de
sort de niveau 2 (jusqu'à 4 heures), 3 ou 4 (jusqu'à 8 heures) ou 5 ou
supérieur (jusqu'à 24 heures).`,
  },
  mordenkainensMagnificentMansion: {
    name: `Manoir somptueux de Mordenkainen`,
    description: ``,
  },
  waterWalk: {
    name: `Marche sur l'eau|Marche sur l'onde`,
    description: `Ce
sort confère la capacité de se déplacer sur toute surface liquide (eau,
acide, boue, neige, sables mouvants ou lave) comme s'il s'agissait d'un
sol inoffensif (les créatures traversant la lave en fusion peuvent
néanmoins subir des dégâts de chaleur). Jusqu'à dix créatures
consentantes de votre choix à portée bénéficient de cette capacité
pendant la durée du sort.
Une cible affectée doit prendre une action
Bonus pour passer de la surface du liquide au liquide, et vice versa. Si
la cible tombe dans le liquide, elle traverse la surface pour rejoindre
le liquide en dessous.`,
  },
  huntersMark: {
    name: `Marque du chasseur`,
    description: `Vous
marquez magiquement une créature que vous pouvez voir à portée comme
votre proie. Jusqu'à la fin du sort, vous infligez 1d6 points de dégâts
de force supplémentaires à la cible pour chaque jet d'attaque réussi.
Vous bénéficiez également d'un Avantage à tout jet de Sagesse
(Perception ou Survie) effectué pour la trouver.
Si la cible tombe à 0
point de vie avant la fin du sort, vous pouvez utiliser une action
Bonus pour marquer une nouvelle créature que vous pouvez voir à portée.
***Emplacement de niveau
supérieur***.
Votre concentration peut durer plus longtemps avec un emplacement de
sort de niveau 3 ou 4 (jusqu'à 8 heures) ou 5 ou supérieur (jusqu'à 24
heures).`,
  },
  eyebite: {
    name: `Mauvais oeil`,
    description: ``,
  },
  message: {
    name: `Message`,
    description: `Vous
pointez une créature à portée et murmurez un message. La cible (et elle
seule) entend le message et peut répondre par un murmure que vous seul
pouvez entendre.
Vous pouvez lancer ce sort à travers des objets
solides si vous connaissez la cible et savez qu'elle se trouve au-delà
de la barrière. Un silence magique, 30 cm de pierre, de métal ou de
bois, ou une fine feuille de plomb bloquent le sort.`,
  },
  animalMessenger: {
    name: `Messager animal`,
    description: `Une
bête de taille TP de votre choix que vous pouvez voir à portée doit
réussir un jet de sauvegarde de Charisme ou tenter de transmettre un
message pour vous (si le FP de la cible est supérieur à 0, elle réussit
automatiquement). Vous indiquez un lieu que vous avez visité et un
destinataire par une description générale, comme « une personne
vêtue de l'uniforme de la garde » ou « un nain roux coiffé
d'un chapeau pointu ». Vous communiquez également un message de
vingt-cinq mots maximum. La bête se déplace pendant la durée du sort
vers le lieu spécifié, parcourant environ 40 km en 24 heures,
ou 80 km si elle peut voler.
À son arrivée, la bête transmet
votre message à la créature que vous avez décrite, imitant votre
communication. Si la bête n'atteint pas sa destination avant la fin du
sort, le message est perdu et la bête retourne là où vous avez lancé le
sort.
***Emplacement de niveau supérieur***. La durée du sort augmente de 48 heures
pour chaque niveau d'emplacement de sort supérieur à 2.`,
  },
  heatMetal: {
    name: `Métal brûlant`,
    description: `Choisissez
un objet métallique manufacturé, comme une arme en métal ou une armure
lourde ou moyenne, que vous pouvez voir à portée. Vous le faites briller
d'un rougeoiement intense. Toute créature en contact physique avec
l'objet subit 2d8 dégâts de feu lorsque vous lancez le sort. Jusqu'à la
fin du sort, vous pouvez prendre une action Bonus à chacun de vos tours
suivants pour infliger à nouveau ces dégâts si l'objet est à portée.
Si
une créature tient ou porte l'objet et subit des dégâts, elle doit
réussir un jet de sauvegarde de Constitution ou laisser tomber l'objet
si elle le peut. Si elle ne le laisse pas tomber, elle subit un
Désavantage aux jets d'attaque et de caractéristique jusqu'au début de
votre prochain tour.
***Emplacement de niveau supérieur***. Les dégâts augmentent de 1d8
pour chaque niveau d'emplacement de sort supérieur à 2.`,
  },
  polymorph: {
    name: `Métamorphose`,
    description: `Vous
tentez de transformer une créature que vous pouvez voir à portée en
bête. La cible doit réussir un jet de sauvegarde de Sagesse ou se
métamorphoser en bête pendant toute la durée du sort. Cette forme peut
être n'importe quelle bête de votre choix dont le FP est égal ou
inférieur à celui de la cible (ou à son niveau si elle n'en a pas). Les
statistiques de jeu de la cible sont remplacées par le profil de la bête
choisie, mais la cible conserve son alignement, sa personnalité, son
type de créature, ses points de vie et ses dés de vie.
La cible gagne
un nombre de points de vie temporaires égal aux points de vie de la
bête. Ces points de vie temporaires disparaissent s'il en reste à la fin
du sort. Le sort prend fin prématurément sur la cible si elle n'a plus
de points de vie temporaires.
Les actions de la cible sont limitées par l'anatomie de sa nouvelle forme, et
elle ne peut ni parler ni lancer des sorts.
L'équipement de la cible se fond dans la nouvelle forme. La
créature ne peut ni utiliser ni bénéficier de cet équipement.`,
  },
  animalShapes: {
    name: `Métamorphose animale`,
    description: ``,
  },
  truePolymorph: {
    name: `Métamorphose suprême`,
    description: ``,
  },
  mirageArcane: {
    name: `Mirage`,
    description: ``,
  },
  alterSelf: {
    name: `Modification d'apparence`,
    description: `Vous
modifiez votre forme physique. Choisissez l'une des options suivantes.
Ses effets durent toute la durée du sort, pendant laquelle vous pouvez
prendre une action Magie pour remplacer l'option choisie par une autre.
**Adaptation
aquatique**.
Vous vous faites pousser des branchies et vos mains deviennent palmée.
Vous pouvez respirer sous l'eau et obtenez une Vitesse de nage égale à
votre Vitesse.
**Changement d'aspect**. Vous modifiez
votre aspect. Vous décidez de votre apparence, notamment de votre
taille, de votre poids, des traits de votre visage, du son de votre
voix, de la longueur de vos cheveux, de votre couleur de peau et
d'autres caractéristiques distinctives. Vous pouvez vous faire passer
pour un membre d'une autre espèce, mais vos statistiques restent
inchangées. Vous ne pouvez pas apparaître comme une créature d'une
taille différente et votre silhouette reste la même ; par exemple,
si vous êtes bipède, vous ne pouvez pas utiliser ce sort pour devenir
quadrupède. Pendant la durée du sort, vous pouvez prendre une action
Magie pour modifier à nouveau votre apparence de cette manière.
**Armes naturelles**.
Vous faites pousser des griffes (tranchants), des crocs (perforants),
des cornes (perforants) ou des sabots (contondants). Lorsque vous
utilisez votre Frappe à mains nues pour infliger des dégâts avec ces
nouveaux appendices, celle-ci inflige 1d6 dégâts du type indiqué entre
parenthèses au lieu des dégâts normaux de votre Frappe à mains nues, et
vous utilisez votre modificateur de caractéristique d'invocation pour
les jets d'attaque et de dégâts plutôt que la Force.`,
  },
  modifyMemory: {
    name: `Modification de mémoire`,
    description: `Vous
tentez de remodeler les souvenirs d'une autre créature. Une créature
que vous pouvez voir à portée effectue un jet de sauvegarde de Sagesse.
Si vous la combattez, elle a un Avantage au jet. En cas d'échec, la
cible a l'état Charmé pendant toute la durée du sort. Tant qu'elle est
charmée, elle a aussi l'état Incapable d'agir et n'a pas conscience de
son environnement, bien qu'elle puisse vous entendre. Si elle subit des
dégâts ou est ciblée par un autre sort, celui-ci prend fin et aucun
souvenir n'est modifié.
Pendant la durée de ce charme, vous pouvez
affecter le souvenir par la cible d'un événement survenu au cours des
dernières 24 heures et n'ayant pas duré plus de 10 minutes. Vous pouvez
effacer définitivement tout souvenir de cet événement, permettre à la
cible de s'en souvenir avec une clarté parfaite, modifier ses souvenirs
des détails de l'événement ou créer un souvenir d'un autre événement.
Vous
devez parler à la cible pour lui décrire comment ses souvenirs sont
affectés, et elle doit comprendre votre langage pour que les souvenirs
modifiés prennent racine. Son esprit comble les lacunes de votre
description. Si le sort prend fin avant que vous ayez terminé de décrire
les souvenirs modifiés, la mémoire de la créature n'est pas altérée.
Sinon, les souvenirs modifiés prennent effet à la fin du sort.
Un
souvenir modifié n'affecte pas nécessairement le comportement d'une
créature, surtout s'il contredit ses inclinations naturelles, son
alignement ou ses croyances. Un souvenir modifié illogique, comme un
faux souvenir du plaisir qu'elle a pris à nager dans l'acide, est
considéré comme un mauvais rêve. Le MD pourrait juger un souvenir
modifié trop absurde pour affecter une créature.
Un sort de *délivrance des malédiction* ou de *restauration suprême* lancé sur la cible
restaure sa véritable mémoire.
***Emplacement de niveau supérieur***.
Vous pouvez modifier les souvenirs de la cible d'un événement survenu
il y a 7 jours maximum (emplacement de niveau 6), 30 jours (emplacement
de niveau 7), 365 jours (emplacement de niveau 8) ou à n'importe quel
moment du passé de la créature (emplacement de niveau 9).`,
  },
  phantomSteed: {
    name: `Monture fantôme`,
    description: `Une
créature de taille G, quasi réelle et semblable à un cheval, apparaît
au sol dans un espace libre de votre choix à portée. Vous choisissez son
apparence et elle est équipée d'une selle, d'un mors et d'une bride.
Tout équipement créé par le sort disparaît dans un nuage de fumée s'il
est porté à plus de 3 mètres de la monture.
Pendant la durée du sort, vous ou une créature de votre choix
pouvez monter la monture. Celle-ci utilise le profil du **cheval de selle**,
mais sa Vitesse est de 30 mètres et elle peut parcourir 20 kilomètres
en une heure. À la fin du sort, la monture disparaît progressivement,
laissant 1 minute au cavalier pour en descendre. Le sort prend fin
prématurément si la monture subit des dégâts.`,
  },
  viciousMockery: {
    name: `Moquerie cruelle`,
    description: `Vous
lancez une salve d'insultes mêlée à de subtils enchantements sur une
créature que vous pouvez voir ou entendre à portée. La cible doit
réussir un jet de sauvegarde de Sagesse ou subir 1d6 dégâts psychiques.
Elle obtient de plus un Désavantage lors de son prochain jet d'attaque
avant la fin de son prochain tour.
***Amélioration de sort mineur***. Les dégâts
augmentent de 1d6 lorsque vous atteignez le niveau 5 (2d6), le niveau 11 (3d6) et le niveau 17 (4d6).`,
  },
  healingWord: {
    name: `Mot de guérison`,
    description: `Une
créature de votre choix que vous pouvez voir à portée récupère 2d4
points de vie plus le modificateur de votre caractéristique
d'incantation.
***Emplacement de niveau supérieur***. Les soins augmentent de 2d4 pour
chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  massHealingWord: {
    name: `Mot de guérison de groupe`,
    description: `Jusqu'à
six créatures de votre choix que vous pouvez voir à portée regagnent
des points de vie équivalents à 2d4 plus le modificateur de votre
caractéristique d'incantations.
***Emplacement de niveau supérieur***. Les soins
augmentent de 1d4 pour chaque niveau d'emplacement de sort supérieur à 3.`,
  },
  powerWordStun: {
    name: `Mot de pouvoir étourdissant`,
    description: ``,
  },
  powerWordFortify: {
    name: `Mot de pouvoir fortifiant`,
    description: ``,
  },
  powerWordHeal: {
    name: `Mot de pouvoir guérisseur`,
    description: ``,
  },
  powerWordKill: {
    name: `Mot de pouvoir mortel`,
    description: ``,
  },
  wordOfRadiance: {
    name: `Mot de radiance`,
    description: `Une
radiance brûlante jaillit de vous sous forme d'Émanation de 1,50 mètre.
Chaque créature de votre choix que vous pouvez voir doit réussir un jet
de sauvegarde de Constitution ou subir 1d6 dégâts radiants.
***Amélioration de sort
mineur***. Les dégâts augmentent de 1d6 aux niveaux 5 (2d6), 11 (3d6) et 17 (4d6).`,
  },
  wordOfRecall: {
    name: `Mot de retour`,
    description: ``,
  },
  hypnoticPattern: {
    name: `Motif hypnotique`,
    description: `Vous
créez un motif coloré tourbillonnant dans un Cube de 9 mètres à portée.
Le motif apparaît un instant puis disparaît. Toute créature présente
dans la zone et pouvant le voir doit réussir un jet de sauvegarde de
Sagesse ou subir l'état Charmé pendant toute la durée du sort. Tant
qu'elle est charmée, la créature est Incapable d'agir et sa Vitesse est
de 0.
Le sort prend fin pour la créature affectée si elle subit des
dégâts ou si quelqu'un d'autre utilise une action pour la sortir de sa
torpeur.`,
  },
  wallOfThorns: {
    name: `Mur d'épines`,
    description: ``,
  },
  wallOfFire: {
    name: `Mur de feu`,
    description: `Vous
créez un mur de feu sur une surface solide à portée. Vous pouvez créer
un mur mesurant jusqu'à 18 mètres de long, 6 mètres de haut et 30 cm
d'épaisseur, ou un mur encerclé mesurant jusqu'à 6 mètres de diamètre, 6
mètres de haut et 30 cm d'épaisseur. Le mur est opaque et reste en
place pendant toute la durée du sort.
Lorsque le mur apparaît, Toute
créature dans sa zone effectue un jet de sauvegarde de Dextérité,
subissant 5d8 dégâts de Feu en cas d'échec, ou la moitié de ces dégâts
en cas de réussite.
Un côté du mur, que vous choisissez lors du
lancement de ce sort, inflige 5d8 dégâts de feu à toute créature qui
termine son tour à 3 mètres ou moins de ce côté ou à l'intérieur du mur.
Une créature subit les mêmes dégâts lorsqu'elle pénètre dans le mur
pour la première fois au cours d'un tour ou y termine son tour. L'autre
côté du mur n'inflige aucun dégât.
***Emplacement de niveau supérieur***. Les dégâts
augmentent de 1d8 pour chaque niveau d'emplacement de sort supérieur à 4.`,
  },
  wallOfForce: {
    name: `Mur de force`,
    description: `Un
mur de force invisible apparaît à l'endroit que vous choisissez et à
portée. Le mur apparaît dans l'orientation de votre choix :
barrière horizontale, verticale ou inclinée. Il peut flotter librement
ou reposer sur une surface solide. Vous pouvez lui donner la forme d'un
dôme hémisphérique ou d'un globe d'un rayon maximal de 3 mètres, ou
encore d'une surface plane composée de dix panneaux de 3 mètres
sur 3 mètres. Chaque panneau doit être contigu à un autre. Quelle
que soit sa forme, le mur a une épaisseur de 6 mm et dure toute la durée
du sort. Si le mur traverse l'espace d'une créature lors de son
apparition, celle-ci est repoussée d'un côté (selon votre choix).
Rien ne peut physiquement traverser le mur.
Il est immunisé contre tous les dégâts et ne peut être dissipé par *dissipation de la magie*. Un sort de
*désintégration*
détruit cependant le mur instantanément. Le mur s'étend également dans
le plan Éthéré et bloque le voyage éthéré à travers le mur.`,
  },
  wallOfIce: {
    name: `Mur de glace`,
    description: ``,
  },
  wallOfStone: {
    name: `Mur de pierre`,
    description: `Un
mur de pierre solide et non magique apparaît à l'endroit que vous
choisissez et à portée. Ce mur a une épaisseur de 15 cm et est composé
de dix panneaux de 3 mètres sur 3 mètres. Chaque panneau doit être
contigu à un autre. Vous pouvez également créer des panneaux de 3 mètres
sur 6 mètres de seulement 7,50 cm d'épaisseur.
Si le mur traverse
l'espace d'une créature lors de son apparition, celle-ci est repoussée
d'un côté du mur (selon votre choix). Si une créature est entourée de
tous côtés par le mur (ou par le mur et une autre surface solide), elle
peut effectuer un jet de sauvegarde de Dextérité. En cas de réussite,
elle peut utiliser sa Réaction pour se déplacer jusqu'à sa Vitesse et
ainsi sortir du mur.
Le mur peut prendre la forme de votre choix,
mais il ne peut pas occuper le même espace qu'une créature ou un objet.
Il n'est pas nécessaire qu'il soit vertical ni qu'il repose sur des
fondations solides. Il doit cependant fusionner avec de la pierre
existante et être solidement soutenu par elle. Vous pouvez donc utiliser
ce sort pour combler un gouffre ou créer une rampe.
Si vous créez
une portée supérieure à 6 mètres de long, vous devez diviser par deux la
taille de chaque panneau pour créer des supports. Vous pouvez façonner
grossièrement le mur pour créer des créneaux, etc.
Le mur est un
objet en pierre qui peut être endommagé et donc percé. Chaque panneau a
une CA de 15, 30 points de vie par tranche de 2,50 cm d'épaisseur, et
est immunisé contre le poison et les dégâts psychiques. Réduire un
panneau à 0 point de vie le détruit et peut provoquer l'effondrement des
panneaux connectés, à la discrétion du MD.
Si vous maintenez votre
concentration sur ce sort pendant toute sa durée, le mur devient
permanent et ne peut être dissipé. Sinon, il disparaît à la fin du sort.`,
  },
  windWall: {
    name: `Mur de vent`,
    description: `Un
mur de vent violent s'élève du sol à un point de votre choix à portée.
Vous pouvez construire un mur mesurant jusqu'à 15 mètres de long, 4,50
mètres de haut et 30 cm d'épaisseur. Vous pouvez façonner le mur comme
vous le souhaitez, à condition qu'il trace un chemin continu le long du
sol. Le mur dure toute la durée du sort.
Lorsque le mur apparaît,
chaque créature dans sa zone effectue un jet de sauvegarde de Force,
subissant 4d8 dégâts contondants en cas d'échec, ou la moitié de ces
dégâts en cas de réussite.
Le vent violent maintient le brouillard,
la fumée et autres gaz à distance. Les créatures ou objets volants de
taille P ou inférieure ne peuvent pas traverser le mur. Les matériaux
légers et meubles introduits dans le mur volent vers le haut. Les
flèches, carreaux et autres projectiles ordinaires lancés sur des cibles
derrière le mur sont déviés vers le haut et manquent automatiquement
leur cible. Les rochers lancés par des géants ou des engins de siège,
ainsi que les projectiles similaires, ne sont pas affectés. Les
créatures sous forme gazeuse ne peuvent pas le traverser.`,
  },
  prismaticWall: {
    name: `Mur prismatique`,
    description: ``,
  },
  dissonantWhispers: {
    name: `Murmures dissonants`,
    description: `Une
créature de votre choix que vous pouvez voir portée entend une mélodie
discordante dans son esprit. La cible effectue un jet de sauvegarde de
Sagesse. En cas d'échec, elle subit 3d6 dégâts psychiques et doit
immédiatement utiliser sa Réaction, si elle en a une, pour s'éloigner le
plus loin possible de vous, en empruntant le chemin le plus sûr. En cas
de réussite, la cible subit seulement la moitié des dégâts.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d6 pour chaque niveau d'emplacement de sort supérieur à
1.`,
  },
  legendLore: {
    name: `Mythes et légendes`,
    description: `Nommez
ou décrivez une personne, un lieu ou un objet célèbre. Le sort vous
donne un bref résumé des informations importantes concernant cet objet,
telles que décrites par le MD.
Ces informations peuvent contenir des
détails importants, des révélations amusantes, voire des secrets
inconnus du grand public. Plus vous en savez sur cet objet, plus les
informations reçues sont précises et détaillées. Ces informations sont
exactes, mais peuvent être formulées au moyen d'un langage figuratif ou
poétique, selon le choix du MD.
Si l'objet célèbre que vous avez
choisi n'est pas réellement célèbre, vous entendez des notes de musique
tristes jouées au trombone, et le sort échoue.`,
  },
  fogCloud: {
    name: `Nappe de brouillard`,
    description: `Vous
créez une Sphère de brouillard de 6 mètres de rayon centrée sur un
point à portée. La Sphère est une zone de Visibilité nulle. Elle se
maintient pendant toute la durée du sort ou jusqu'à ce qu'un vent fort
(comme celui créé par *bourrasque*) la
disperse.
***Emplacement de niveau supérieur***. Le rayon du brouillard augmente de 6
mètres pour chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  incendiaryCloud: {
    name: `Nuage incendiaire`,
    description: ``,
  },
  stinkingCloud: {
    name: `Nuage nauséabond`,
    description: `Vous
créez une Sphère de 6 mètres de rayon remplie d'un gaz jaune nauséabond
et centrée sur un point à portée. Le nuage est une zone à Visibilité
nulle. Il persiste dans l'air pendant toute la durée du sort ou jusqu'à
ce qu'un vent fort (comme celui créé par *bourrasque*) le disperse.
Toute
créature qui commence son tour dans la Sphère doit réussir un jet de
sauvegarde de Constitution ou subir l'état Empoisonné jusqu'à la fin du
tour en cours. Tant qu'elle est empoisonnée de cette manière, la
créature ne peut effectuer aucune action ni action Bonus.`,
  },
  cloudOfDaggers: {
    name: `Nuée de dagues`,
    description: `Vous
invoquez des dagues tournoyantes dans un Cube de 1,50 mètres centré sur
un point à portée. Chaque créature dans cette zone subit 4d4 dégâts
tranchants. Une créature subit également ces dégâts si elle entre dans
le Cube, y termine son tour ou si le Cube se déplace dans son
emplacement. Une créature ne subit ces dégâts qu'une fois par tour.
Lors de vos tours suivants, vous pouvez
prendre une action Magie pour téléporter le Cube jusqu'à 9 mètres.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 2d4 pour chaque niveau d'emplacement de sort supérieur à
2.`,
  },
  meteorSwarm: {
    name: `Nuée de météores`,
    description: ``,
  },
  arcaneEye: {
    name: `Oeil du mage`,
    description: `Vous
créez un œil invisible et invulnérable à portée, qui flotte pendant
toute la durée du sort. Vous recevez mentalement des informations
visuelles de l'œil, qui peut voir dans toutes les directions. Il possède
également Vision dans le noir avec une portée de 9 mètres.
Par une
action Bonus, vous pouvez déplacer l'œil jusqu'à 9 mètres dans n'importe
quelle direction. Une barrière solide bloque le mouvement de l'œil,
mais celui-ci peut passer à travers une ouverture de 2,50 cm de
diamètre.`,
  },
  chromaticOrb: {
    name: `Orbe chromatique`,
    description: `Vous
lancez un orbe d'énergie sur une cible à portée. Choisissez acide,
froid, feu, foudre, poison ou tonnerre comme type d'orbe, puis effectuez
une attaque de sort à distance contre la cible. Si l'attaque touche, la
cible subit 3d8 dégâts du type choisi.
Si vous obtenez le même
résultat sur deux d8 ou plus, l'orbe bondit vers une autre cible de
votre choix dans un rayon de 9 mètres de la cible. Effectuez un jet
d'attaque contre la nouvelle cible, puis un nouveau jet de dégâts.
L'orbe ne peut pas bondir à nouveau, sauf si vous lancez le sort avec un
emplacement de sort de niveau 2 ou supérieur.
***Emplacement de niveau supérieur***.
Les dégâts augmentent de 1d8 pour chaque niveau d'emplacement de sort
supérieur à 1. L'orbe peut bondir un nombre maximal de fois égal au
niveau de l'emplacement dépensé, et une créature ne peut être ciblée
qu'une seule fois par lancement de ce sort.`,
  },
  findThePath: {
    name: `Orientation`,
    description: ``,
  },
  divineWord: {
    name: `Parole divine`,
    description: ``,
  },
  treeStride: {
    name: `Passage par les arbres`,
    description: `Vous
pouvez entrer dans un arbre et vous déplacer dans un autre arbre de la
même espèce dans un rayon de 150 mètres. Les deux arbres doivent être
vivants et au moins de la même taille que vous. Vous devez utiliser 1,50
mètre de mouvement pour entrer dans un arbre. Vous connaissez
instantanément l'emplacement de tous les autres arbres de la même espèce
dans un rayon de 150 mètres et, grâce au mouvement utilisé pour entrer
dans l'arbre, vous pouvez soit passer dans l'un de ces arbres, soit en
sortir. Vous apparaissez à l'endroit de votre choix dans un rayon de
1,50 mètre de l'arbre de destination, ce qui nécessite un mouvement
supplémentaire de 1,50 mètre. S'il ne vous reste plus de mouvement, vous
apparaissez dans un rayon de 1,50 mètre de l'arbre par lequel vous êtes
entré.
Vous ne pouvez utiliser cette capacité de transport qu'une seule fois par tour. Vous devez terminer
chaque tour hors d'un arbre.`,
  },
  passWithoutTrace: {
    name: `Passage sans trace`,
    description: `Une
aura de dissimulation rayonne autour de vous sous forme d'Émanation de 9
mètres pendant toute la durée du sort. Tant que vous êtes dans l'aura,
vous et Toute créature que vous choisissez bénéficiez d'un bonus de +10
aux jets de Dextérité (Discrétion) et ne laissez aucune trace.`,
  },
  passwall: {
    name: `Passe-muraille`,
    description: `Un
passage apparaît à un endroit que vous pouvez voir sur une surface en
bois, en plâtre ou en pierre (comme un mur, un plafond ou un sol) à
portée et persiste pendant toute la durée du sort. Vous choisissez les
dimensions de l'ouverture : jusqu'à 1,50 m de large,
2,50 m de haut et 6 m de profondeur. Le passage ne crée aucune
instabilité dans la structure environnante.
Lorsque l'ouverture
disparaît, toutes les créatures ou objets encore présents dans le
passage créé par le sort sont éjectés en toute sécurité vers un espace
libre proche de la surface sur laquelle vous avez lancé le sort.`,
  },
  spiderClimb: {
    name: `Pattes d'araignée`,
    description: `Jusqu'à
la fin du sort, une créature consentante que vous touchez acquiert la
capacité de monter, descendre ou traverser des surfaces verticales et
longer des plafonds, tout en gardant les mains libres. La cible gagne
également une Vitesse d'escalade égale à sa Vitesse.
***Emplacement de niveau
supérieur***. Vous pouvez cibler une créature supplémentaire pour chaque niveau d'emplacement de
sort supérieur à 2.`,
  },
  barkskin: {
    name: `Peau d'écorce`,
    description: `Vous
touchez une créature consentante. Jusqu'à la fin du sort, la peau de la
cible prend une apparence d'écorce, et sa CA est de 17 si elle était
inférieure.`,
  },
  stoneskin: {
    name: `Peau de pierre`,
    description: `Jusqu'à
la fin du sort, une créature consentante que vous touchez obtient la
résistance aux dégâts contondants, perforants et tranchants.`,
  },
  beastSense: {
    name: `Perception bestiale`,
    description: `Vous
touchez une Bête consentante. Pendant la durée du sort, vous pouvez
percevoir grâce à ses sens et vos propres sens. En percevant grâce à ses
sens, vous bénéficiez de ses sens spéciaux.`,
  },
  synapticStatic: {
    name: `Perturbations synaptiques`,
    description: `Vous
faites jaillir de l'énergie psychique en un point à portée. Chaque
créature dans une Sphère de 6 mètres de rayon centrée sur ce point
effectue un jet de sauvegarde d'Intelligence, subissant 8d6 dégâts
psychiques en cas d'échec, ou seulement la moitié des dégâts en cas de
réussite. En cas d'échec, la cible est également perturbée pendant 1
minute. Pendant ce temps, elle soustrait 1d6 à tous ses jets d'attaque
et de caractéristique, ainsi qu'à ses jets de sauvegarde de Constitution
pour maintenir sa Concentration. La cible effectue un jet de sauvegarde
d'Intelligence à la fin de chacun de ses tours, mettant fin à l'effet
en cas de réussite.`,
  },
  leomundsTinyHut: {
    name: `Petite hutte de Léomund`,
    description: `Une
Émanation de 3 mètres de diamètre apparaît autour de vous et reste
immobile pendant toute la durée du sort. Le sort échoue si l'Émanation
n'est pas suffisamment grande pour englober toutes les créatures
présentes.
Les créatures et objets présents dans l'Émanation peuvent
la traverser librement au moment où vous lancer le sort. Les autres
créatures et objets ne le peuvent pas. Les sorts de niveau 3 ou
inférieur ne peuvent pas être lancés à travers elle, et leurs effets ne
peuvent pas s'y propager.
L'atmosphère à l'intérieur de l'Émanation
est confortable et sèche, quelle que soit la météo extérieure. Jusqu'à
la fin du sort, vous pouvez commander à l'intérieur une Lumière faible
ou des Ténèbres (aucune action requise). L'Émanation est opaque de
l'extérieur et de la couleur de votre choix, mais elle est transparente
de l'intérieur.
Le sort prend fin prématurément si vous quittez l'Émanation ou si vous le relancez.`,
  },
  fleshToStone: {
    name: `Pétrification`,
    description: ``,
  },
  fear: {
    name: `Peur|Terreur`,
    description: `Toute
créature dans un Cône de 9 mètres doit réussir un jet de sauvegarde de
Sagesse ou lâcher ce qu'elle tient et subir l'état Effrayé pendant toute
la durée du sort. Une créature effrayée prend l'action Pointe et
s'éloigne de vous par le chemin le plus sûr à chacun de ses tours, sauf
si elle n'a aucun endroit où se déplacer. Si la créature termine son
tour dans une case où elle n'a pas de ligne de vue vers vous, elle
effectue un jet de sauvegarde de Sagesse. En cas de réussite, le sort
prend fin sur cette créature.`,
  },
  mindSliver: {
    name: `Piqûre mentale`,
    description: `Vous
essayez de rompre temporairement l'esprit d'une créature que vous
pouvez voir à portée. La cible doit réussir un jet de sauvegarde
d'Intelligence ou subir 1d6 dégâts psychiques et soustraire 1d4 du
prochain jet de sauvegarde qu'elle effectue avant la fin de votre
prochain tour.
***Amélioration de sort mineur***. Les dégâts augmentent de 1d6 lorsque
vous atteignez les niveaux 5 (2d6), 11 (3d6) et 17 (4d6).`,
  },
  shockingGrasp: {
    name: `Poigne électrique`,
    description: `La
foudre jaillit de vous vers une créature que vous tentez de toucher.
Effectuez une attaque de sort au corps à corps contre la cible. Si
l'attaque touche, la cible subit 1d8 dégâts de foudre et ne peut
effectuer d'attaques d'opportunité avant le début de son prochain tour.
***Amélioration de sort
mineur***. Les dégâts augmentent de 1d8 lorsque vous atteignez les niveaux 5 (2d8), 11 (3d8) et
17 (4d8).`,
  },
  gate: {
    name: `Portail`,
    description: ``,
  },
  arcaneGate: {
    name: `Portail arcanique`,
    description: ``,
  },
  dimensionDoor: {
    name: `Porte dimensionnelle`,
    description: `Vous
vous téléportez vers un lieu à portée. Vous arrivez exactement à
l'endroit souhaité. Il peut s'agir d'un lieu que vous pouvez voir,
visualisable, ou décrit en indiquant la distance et la direction, par
exemple « 60 mètres vers le bas » ou « 90 mètres vers le
nord-ouest à un angle de 45 degrés ».
Vous pouvez également
téléporter une créature consentante. Cette créature doit se trouver dans
un rayon de 1,50 mètre autour de vous lorsque vous vous téléportez, et
elle se téléporte vers une case située dans un rayon de 1,50 mètre
autour de votre case de destination.
Si vous, l'autre créature, ou
les deux, arrivez dans une case occupée par une créature ou entièrement
remplie par un ou plusieurs objets, vous et toute créature voyageant
avec vous subissez chacun 4d6 dégâts de Force, et la téléportation
échoue.`,
  },
  starryWisp: {
    name: `Poussière d'étoile`,
    description: `Vous
lancez un rayon de lumière sur une créature ou un objet à portée.
Effectuez une attaque avec un sort à distance contre la cible. Si
l'attaque touche, la cible subit 1d8 dégâts radiants et, jusqu'à la fin
de votre prochain tour, émet une Lumière faible dans un rayon de 3
mètres et ne peut bénéficier de l'état Invisibilité.
***Amélioration de sort mineur***.
Les dégâts augmentent de 1d8 aux niveaux 5 (2d8), 11 (3d8) et 17 (4d8).`,
  },
  contingency: {
    name: `Préméditation`,
    description: ``,
  },
  foresight: {
    name: `Prémonition`,
    description: ``,
  },
  yolandesRegalPresence: {
    name: `Présence royale de Yolane`,
    description: `Vous
vous entourez d'une majesté surnaturelle sous forme d'une Émanation de 3
mètres. Chaque fois que l'Émanation pénètre dans l'espace d'une
créature que vous pouvez voir, et chaque fois qu'une créature que vous
pouvez voir y pénètre ou y termine son tour, vous pouvez la forcer à
effectuer un jet de sauvegarde de Sagesse. En cas d'échec, la cible
subit 4d6 dégâts psychiques et l'état À terre, et vous pouvez la
repousser jusqu'à 3 mètres. En cas de réussite, la cible subit seulement
la moitié des dégâts. Une créature n'effectue ce jet qu'une seule fois
par tour.`,
  },
  prestidigitation: {
    name: `Prestidigitation`,
    description: `Vous
créez un effet magique dans la portée du sort. Choisissez l'effet dans
les options ci-dessous. Si vous lancez ce sort plusieurs fois, vous
pouvez garder actif jusqu'à trois de ses effets non instantanés
simultanément.
**Effet sensoriel**. Vous créez
instantanément un effet sensoriel inoffensif, comme une pluie
d'étincelles, un souffle de vent, des notes de musique tenues ou une
odeur étrange.
**Jeu avec le feu**. Vous allumez ou soufflez instantanément une bougie, une
torche ou un petit feu de camp.
**Nettoyage ou maculage**. Vous nettoyez ou souillez
instantanément un objet ne mesurant pas plus que 0,03 m3 (30 litres).
**Sensation mineure**.
Vous refroidissez, réchauffez ou parfumez au maximum 0,03 m3 (30 litres) de matière inerte pour 1
heure.
**Marque magique**. Vous faites apparaitre une couleur, une petite marque ou un symbole
sur un objet ou une surface, pendant 1 heure.
**Création mineure**.
Vous créez une babiole non magique, ou une image illusoire, qui peut
tenir dans votre main. Il dure jusqu'à la fin de votre prochain tour.
Une babiole ne peut pas infliger de dommage et n'a aucune valeur.`,
  },
  prayerOfHealing: {
    name: `Prière de guérison`,
    description: `Jusqu'à
cinq créatures de votre choix restant à portée pendant toute la durée
du sort bénéficient d'un Repos court et récupèrent 2d8 points de vie.
Une créature ne peut plus être affectée par ce sort avant d'avoir
terminé un Repos long.
***Emplacement de niveau supérieur***. Les soins augmentent de 1d8
pour chaque niveau d'emplacement de sort supérieur à 2.`,
  },
  magicMissile: {
    name: `Projectile magique`,
    description: `Vous
créez trois fléchettes lumineuses de force magique. Chaque fléchette
touche une créature de votre choix que vous pouvez voir et à portée. Une
fléchette inflige 1d4 + 1 point de dégâts de force à sa cible. Les
fléchettes frappent toutes simultanément, et vous pouvez les diriger
pour toucher une ou plusieurs créatures.
***Emplacement de niveau supérieur***. Le sort
crée une fléchette supplémentaire pour chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  astralProjection: {
    name: `Projection astrale`,
    description: ``,
  },
  protectionFromEnergy: {
    name: `Protection contre l'énergie`,
    description: `Pendant
la durée du sort, la créature consentante que vous touchez obtient une
résistance à un type de dégâts de votre choix : acide, froid, feu,
foudre ou tonnerre.`,
  },
  deathWard: {
    name: `Protection contre la mort`,
    description: `Vous
touchez une créature et lui accordez une certaine protection contre la
mort. La première fois que la cible aurait dû tomber à 0 point de vie
avant la fin du sort, elle tombe à 1 point de vie et le sort prend fin.
Si
le sort est toujours actif lorsque la cible subit un effet qui la
tuerait instantanément sans lui infliger de dégâts, cet effet est annulé
et le sort prend fin.`,
  },
  protectionFromEvilAndGood: {
    name: `Protection contre le mal et le bien`,
    description: `Jusqu'à
la fin du sort, une créature consentante que vous touchez est protégée
contre les aberrations, célestes, élémentaires, fées, fiélons et
morts-vivants. Cette protection confère plusieurs avantages. Ces
créatures ont un Désavantage aux jets d'attaque contre la cible. De
plus, la cible ne peut pas être possédée par ces créatures ni subir les
états Charmé ou Effrayé. Si la cible est déjà possédée, charmée ou
effrayée par de telles créatures, elle bénéficie d'un Avantage à tout
nouveau jet de sauvegarde contre l'effet concerné.`,
  },
  protectionFromPoison: {
    name: `Protection contre le poison`,
    description: `Vous
touchez une créature et mettez fin à l'état Empoisonné sur elle.
Pendant toute la durée du sort, la cible bénéficie d'un Avantage aux
jets de sauvegarde pour éviter ou mettre fin à l'état Empoisonné, et
d'une résistance aux dégâts de poison.`,
  },
  guardsAndWards: {
    name: `Protections et sceaux`,
    description: ``,
  },
  purifyFoodAndDrink: {
    name: `Purification de la nourriture et de l'eau`,
    description: `Vous
éliminez le poison et la pourriture des aliments et boissons non
magiques dans une sphère de 1,50 mètre de rayon centrée sur un point à
portée.`,
  },
  geas: {
    name: `Quête`,
    description: `Vous
donnez un ordre verbal à une créature que vous pouvez voir à portée,
lui ordonnant d'accomplir un service ou de s'abstenir d'une action ou
d'une activité, selon votre choix. La cible doit réussir un jet de
sauvegarde de Sagesse ou subir l'état Charmé pendant toute la durée du
sort. La cible réussit automatiquement si elle ne comprend pas votre
ordre.
Tant qu'elle est charmée, la créature subit 5d10 dégâts
psychiques si elle agit d'une manière contraire à votre ordre. Elle ne
subit ces dégâts qu'une fois par jour.
Vous pouvez donner l'ordre de
votre choix, sauf s'il s'agit d'une activité qui entraînerait une mort
certaine. Si vous donnez un ordre suicidaire, le sort prend fin.
Un sort *délivrance des malédictions, restauration suprême* ou *souhait*
met fin à ce sort.
***Emplacement de niveau supérieur***.
Si vous utilisez un emplacement de sort de niveau 7 ou 8, la durée est
de 365 jours. Si vous utilisez un emplacement de sort de niveau 9, le
sort dure jusqu'à ce qu'il soit interrompu par l'un des sorts mentionnés
ci-dessus.`,
  },
  raiseDead: {
    name: `Rappel à la vie`,
    description: `D'un
simple contact, vous ressuscitez une créature morte depuis au plus 10
jours et qui n'était pas un mort-vivant au moment de sa mort.
La
créature revient à la vie avec 1 point de vie. Ce sort neutralise
également les poisons qui l'ont affectée au moment de sa mort.
Ce
sort guérit toutes les blessures mortelles, mais ne restaure pas les
parties du corps manquantes. Si la créature ne possède plus des parties
de son corps ou des organes essentiels à sa survie (sa tête, par
exemple), le sort échoue automatiquement.
Revenir d'entre les morts
est une épreuve. La cible subit un malus de -4 à ses jets de d20. Chaque
fois que la cible termine un Repos long, le malus est réduit de 1
jusqu'à atteindre 0.`,
  },
  rayOfEnfeeblement: {
    name: `Rayon affaiblissant`,
    description: `Un
rayon d'énergie grinçante émane de vous vers une créature à portée. La
cible doit effectuer un jet de sauvegarde de Constitution. En cas de
réussite, elle subit un Désavantage à son prochain jet d'attaque
jusqu'au début de votre prochain tour.
En cas d'échec, elle subit un
Désavantage aux jets de d20 basés sur la Force pendant toute la durée du
sort. Pendant ce temps, elle soustrait également 1d8 à tous ses jets de
dégâts. La cible refait ce jet de sauvegarde à la fin de chacun de ses
tours, mettant fin au sort en cas de réussite.`,
  },
  scorchingRay: {
    name: `Rayon ardent`,
    description: `Vous
lancez trois rayons de feu. Vous pouvez les lancer sur une cible à
portée ou sur plusieurs. Effectuez une attaque de sort à distance pour
chaque rayon. Si l'attaque touche, la cible subit 2d6 dégâts de Feu.
***Emplacement de niveau
supérieur***. Vous créez un rayon supplémentaire pour chaque niveau d'emplacement de sort
supérieur à 2.`,
  },
  rayOfFrost: {
    name: `Rayon de givre`,
    description: `Un
rayon de lumière glaciale bleu-blanc s'abat sur une créature à portée.
Effectuez une attaque de sort à distance contre la cible. Si l'attaque
touche, elle subit 1d8 dégâts de froid et sa Vitesse est réduite de 3
mètres jusqu'au début de votre prochain tour.
***Amélioration de sort mineur***. Les
dégâts augmentent de 1d8 aux niveaux 5 (2d8), 11 (3d8) et 17 (4d8).`,
  },
  moonbeam: {
    name: `Rayon de lune`,
    description: `Un
rayon de lumière pâle et argentée éclaire un Cylindre de 1,50 mètre de
rayon et 12 mètres de haut, centré sur un point à portée. Jusqu'à la fin
du sort, une Lumière faible emplit le Cylindre, et vous pouvez prendre
une action Magie lors des tours suivants pour le déplacer jusqu'à 18
mètres. Lorsque le Cylindre apparaît, Toute créature à l'intérieur
effectue un jet de sauvegarde de Constitution. En cas d'échec, la
créature subit 2d10 dégâts radiants, et si elle a changé de forme (par
exemple grâce au sort *métamorphose*), elle reprend sa forme
véritable et ne peut plus se métamorphoser tant qu'elle se trouve dans
le cylindre. En cas de réussite, la créature subit seulement la moitié
des dégâts. Une créature effectue également ce jet de sauvegarde lorsque
la zone du sort se déplace dans son espace et lorsqu'elle y pénètre ou y
termine son tour. Une créature n'effectue ce jet qu'une seule fois par
tour.
***Emplacement de niveau supérieur***. Les dégâts augmentent de 1d10 pour chaque
niveau d'emplacement de sort supérieur à 2.`,
  },
  sunbeam: {
    name: `Rayon de soleil`,
    description: ``,
  },
  rayOfSickness: {
    name: `Rayon empoisonné`,
    description: `Vous
tirez un rayon verdâtre sur une créature à portée. Effectuez une
attaque de sort à distance contre la cible. Si l'attaque touche, la
cible subit 2d8 dégâts de poison et l'état Empoisonné jusqu'à la fin de
votre prochain tour.
***Emplacement de niveau supérieur***. Les dégâts augmentent de 1d8
pour chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  guidingBolt: {
    name: `Rayon traçant`,
    description: `Vous
lancez un éclair de lumière vers une créature à portée. Effectuez une
attaque de sort à distance contre la cible. Si l'attaque touche, elle
subit 4d6 dégâts radiants et le prochain jet d'attaque effectué contre
elle avant la fin de votre prochain tour bénéficie d'un Avantage.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d6 pour chaque niveau d'emplacement de sort supérieur à
1.`,
  },
  regenerate: {
    name: `Régénération`,
    description: ``,
  },
  reincarnate: {
    name: `Réincarnation`,
    description: `Vous
touchez un humanoïde mort ou des restes de celui-ci. Si la créature
n'est pas morte depuis plus de 10 jours, le sort lui crée un nouveau
corps et appelle l'âme à y entrer. Lancez 1d10 et consultez la table
ci-dessous pour déterminer l'espèce du corps, ou le MD choisira une
autre espèce jouable.

1d10
Espèce

1
Aasimar

2
Drakéide

3
Nain

4
Elfe

5
Gnome

6
Goliath

7
Halfelin

8
Humain

9
Orc

10
Tieffelin

La
créature réincarnée fait tous les choix proposés par la description de
son espèce, et se souvient de sa vie antérieure. Elle conserve les
capacités qu'elle possédait sous sa forme d'origine, mais perd les
traits de son espèce précédente et acquiert ceux de sa nouvelle espèce.`,
  },
  mending: {
    name: `Réparation`,
    description: `Ce
sort répare une cassure ou une déchirure sur un objet que vous touchez,
comme un maillon de chaîne brisé, les deux moitiés d'une clé cassée,
une cape déchirée ou une outre qui fuit. Tant que la déchirure ne
dépasse pas 30 cm dans une dimension, vous la réparez et ne laissez
aucune trace du dommage initial.
Ce sort peut réparer physiquement un objet magique, mais il ne peut pas
restaurer sa magie.`,
  },
  expeditiousRetreat: {
    name: `Repli expéditif`,
    description: `Vous prenez l'action Pointe et, jusqu'à la fin du sort, vous pouvez prendre de nouveau
cette action en tant qu'action Bonus.`,
  },
  hellishRebuke: {
    name: `Représailles infernales`,
    description: `La
créature qui vous a blessé est momentanément entourée de flammes
vertes. Elle effectue un jet de sauvegarde de Dextérité et subit 2d10
dégâts de feu en cas d'échec, ou la moitié en cas de réussite.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d10 pour chaque niveau d'emplacement de sort supérieur à
1.`,
  },
  resistance: {
    name: `Résistance`,
    description: `Vous
touchez une créature consentante et choisissez un type de dégâts :
acide, contondant, froid, feu, foudre, nécrotique, perforant, poison,
radiant, tranchant ou tonnerre. Si la créature subit des dégâts du type
choisi avant la fin du sort, elle réduit le total des dégâts subis de
1d4. Une créature ne peut bénéficier de ce sort qu'une seule fois par
tour.`,
  },
  waterBreathing: {
    name: `Respiration aquatique`,
    description: `Ce
sort confère à un maximum de dix créatures consentantes de votre choix à
portée la capacité de respirer sous l'eau jusqu'à la fin du sort. Les
créatures affectées conservent également leur respiration normale.`,
  },
  lesserRestoration: {
    name: `Restauration partielle`,
    description: `Vous touchez une créature et mettez fin à un état sur elle : Aveuglé, Assourdi, Paralysé
ou Empoisonné.`,
  },
  greaterRestoration: {
    name: `Restauration suprême`,
    description: `Vous touchez une créature et lui retirez magiquement l'un des effets suivants :
- 
1 niveau d'Épuisement
- L'état Charmé ou Pétrifié
- Une malédiction, y compris le lien de la cible avec un
objet magique maudit
- Toute réduction d'une des valeurs de caractéristique de la cible
- Toute réduction
du maximum de points de vie de la cible`,
  },
  resurrection: {
    name: `Résurrection`,
    description: ``,
  },
  trueResurrection: {
    name: `Résurrection suprême`,
    description: ``,
  },
  revivify: {
    name: `Retour à la vie`,
    description: `Vous
touchez une créature morte dans la dernière minute. Cette créature
ressuscite avec 1 point de vie. Ce sort ne peut pas ressusciter une
créature morte de vieillesse, ni restaurer les parties manquantes de son
corps.`,
  },
  hallow: {
    name: `Sanctification`,
    description: `Vous
touchez un point et imprégnez une zone environnante de puissance sacrée
ou impie. La zone peut avoir un rayon maximal de 18 mètres, et le sort
échoue si le rayon inclut une zone déjà sous l'effet de *sanctification*. La zone affectée a les effets
suivants :
***Barrière sacrée***.
Choisissez un ou plusieurs des types de créatures suivants :
Aberration, Céleste, Élémentaire, Fée, Fiélon ou Mort-vivant. Les
créatures des types choisis ne peuvent pas entrer volontairement dans la
zone, et toute créature possédée par ces créatures ou souffrant de
l'état Charmé ou Effrayé par elles n'est ni possédée, ni charmée, ni
effrayée par celles-ci tant qu'elles se trouvent dans la zone.
***Effet
supplémentaire***. Vous liez un effet supplémentaire à la zone parmi la liste
ci-dessous :
**Courage**. Les créatures des types choisis ne peuvent avoir l'état
Effrayé tant qu'elles se trouvent dans la zone.
**Ténèbres**.
Les Ténèbres emplissent la zone. La lumière normale, ainsi que la
lumière magique créée par des sorts d'un niveau inférieur à celui-ci, ne
peuvent pas éclairer la zone.
**Lumière du jour**.
Une Lumière vive emplit la zone. Les Ténèbres magiques créées par des
sorts d'un niveau inférieur à celui-ci ne peuvent pas éteindre la
lumière.
**Repos paisible**. Les cadavres enterrés dans la zone ne peuvent pas être
transformés en morts-vivants.
**Interférence extradimensionnelle**. Les créatures des
types choisis ne peuvent entrer ou sortir de la zone par téléportation ou voyage interplanaire.

**Peur**. Les créatures des types choisis ont l'état Effrayé lorsqu'elles se trouvent dans la
zone.
**Résistance**. Les créatures des types choisis ont une Résistance à un type de
dégâts de votre choix lorsqu'elles se trouvent dans la zone.
**Silence**. Aucun son ne
peut émaner de la zone, et aucun son ne peut l'atteindre.
**Don des langues**.
Les créatures des types choisis peuvent communiquer avec n'importe
quelle autre créature dans la zone, même si elles ne partagent pas la
même langue.
**Vulnérabilité**. Les créatures des
types choisis ont une Vulnérabilité à un type de dégâts de votre choix
lorsqu'elles se trouvent dans la zone.`,
  },
  sanctuary: {
    name: `Sanctuaire`,
    description: `Vous
protégez une créature à portée. Jusqu'à la fin du sort, toute créature
qui cible la créature protégée avec un jet d'attaque ou un sort qui
inflige des dégâts doit réussir un jet de sauvegarde de Sagesse ou soit
choisir une nouvelle cible, soit perdre l'attaque ou le sort. Ce sort ne
protège pas la créature protégée des zones d'effet.
Le sort prend fin si la créature protégée effectue un jet
d'attaque, lance un sort ou inflige des dégâts.`,
  },
  mordenkainensPrivateSanctum: {
    name: `Sanctuaire privé de Mordenkainen`,
    description: `Vous
sécurisez magiquement une zone à portée. Cette zone est un Cube dont
les dimensions peuvent varier de 1,50 mètre à 30 mètres de côté.
Lorsque vous lancez le sort, vous décidez du
niveau de sécurité qu'il offre en choisissant l'une des propriétés suivantes :
- Le son ne peut pas
traverser la barrière du périmètre de la zone protégée.
- 
La barrière de la zone protégée apparaît sombre et brumeuse, empêchant
toute vision (y compris par Vision dans le noir) à travers elle.
- 
Les capteurs créés par les sorts de Divination ne peuvent pas apparaître
à l'intérieur de la zone protégée ni traverser la barrière de son
périmètre.
- Les créatures présentes dans la zone ne peuvent pas être ciblées par des sorts de
Divination.
- Rien ne peut se téléporter vers ou hors de la zone protégée.
- Un voyage interplanaire est
bloqué dans la zone protégée.
Lancer ce sort au même endroit chaque jour pendant 365 jours le fait durer
jusqu'à sa dissipation.
***Emplacement de niveau supérieur***. Vous pouvez augmenter la
taille du Cube de 30 mètres pour chaque niveau d'emplacement de sort supérieur supérieur à 4.`,
  },
  jump: {
    name: `Saut`,
    description: `Vous
touchez une créature consentante. Une fois à chacun de ses tours
jusqu'à la fin du sort, cette créature peut sauter jusqu'à 9 mètres en
dépensant 3 mètres de mouvement.
***Emplacement de niveau supérieur***. Vous pouvez
cibler une créature supplémentaire pour chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  scrying: {
    name: `Scrutation`,
    description: `Vous
pouvez voir et entendre une créature de votre choix qui se trouve sur
le même plan d'existence que vous. La cible effectue un jet de
sauvegarde de Sagesse, qui est modifié (voir les tables ci-dessous) par
votre connaissance de la cible et le type de connexion physique que vous
entretenez avec elle. La cible ne sait pas contre quoi elle effectue ce
jet de sauvegarde, juste qu'elle ressent un malaise.

Votre connaissance de la cible est...
Modificateur au JdS

Indirecte (vous avez entendu parler d'elle)
+5

Direct (vous l'avez rencontrée)
+0

Intime (vous la connaissez bien)
−5

Vous disposez...
Modificateur au JdS

De son portrait ou autre représentation
−2

D'un vêtement ou autre bien personnel
−4

D'une partie de son corps, mèche de cheveux ou bout d'ongle
−10

En cas de sauvegarde réussie, la cible n'est pas affectée et vous ne pouvez plus utiliser ce sort
sur elle pendant 24 heures.
En
cas d'échec, le sort crée un capteur invisible et intangible dans un
rayon de 3 mètres autour de la cible. Vous pouvez voir et entendre à
travers le capteur comme si vous y étiez. Le capteur se déplace avec la
cible et reste à 3 mètres ou moins d'elle pendant toute la durée du
sort. Si quelque chose peut voir le capteur, il apparaît comme un orbe
lumineux de la taille de votre poing.
Au lieu de cibler une créature,
vous pouvez cibler un lieu que vous avez vu. Dans ce cas, le capteur
apparaît à cet endroit et reste immobile.`,
  },
  unseenServant: {
    name: `Serviteur invisible`,
    description: `Ce
sort crée une force invisible, inerte et informe de taille M qui
accomplit des tâches simples à votre demande jusqu'à la fin du sort. Le
serviteur apparaît dans un espace libre au sol, à portée. Il a une CA de
10, 1 point de vie, une force de 2, et ne peut pas attaquer. S'il tombe
à 0 point de vie, le sort prend fin.
Une fois par tour, par une
action Bonus, vous pouvez ordonner mentalement au serviteur de se
déplacer jusqu'à 4,50 mètres et d'interagir avec un objet. Le serviteur
peut effectuer des tâches simples qu'un humain pourrait effectuer, comme
aller chercher des objets, nettoyer, raccommoder, plier des vêtements,
allumer du feu, servir à manger et à boire. Une fois l'ordre donné, le
serviteur exécute la tâche au mieux de ses capacités jusqu'à ce qu'il
l'ait accomplie, puis attend votre prochain ordre.
Si vous ordonnez au serviteur d'effectuer une tâche qui
l'éloignerait de plus de 18 mètres de vous, le sort prend fin.`,
  },
  silence: {
    name: `Silence`,
    description: `Pendant
toute la durée du sort, aucun son ne peut être émis depuis ni traverser
une Sphère de 6 mètres de rayon centrée sur un point de votre choix à
portée. Toute créature ou objet entièrement à l'intérieur de la Sphère
est immunisé aux dégâts de tonnerre, et les créatures ont l'état
Assourdi tant qu'elles y sont entièrement. Il est impossible de lancer
un sort comportant une composante verbale dans la zone.`,
  },
  simulacrum: {
    name: `Simulacre`,
    description: ``,
  },
  falseLife: {
    name: `Simulacre de vie`,
    description: `Vous gagnez 2d4 + 4 points de vie temporaires.
***Emplacement de niveau
supérieur***. Vous gagnez 5 points de vie temporaires supplémentaires pour chaque niveau
d'emplacement de sort supérieur à 1.`,
  },
  cureWounds: {
    name: `Soins`,
    description: `Une
créature que vous touchez récupère un nombre de points de vie égal à
2d8 plus le modificateur de votre caractéristique d'incantation.
***Emplacement de niveau
supérieur***. Les soins augmentent de 2d8 pour chaque niveau d'emplacement de sort supérieur à
1.`,
  },
  massCureWounds: {
    name: `Soins de groupe`,
    description: `Une
vague d'énergie curative jaillit d'un point visible à portée.
Choisissez jusqu'à six créatures dans une Sphère de 9 mètres de rayon
centrée sur ce point. Chaque cible récupère un nombre de points de vie
égal à 5d8 plus le modificateur de votre caractéristique d'incantation.
***Emplacement de niveau
supérieur***. Les soins augmentent de 1d8 pour chaque niveau d'emplacement de sort supérieur à
5.`,
  },
  sleep: {
    name: `Sommeil`,
    description: `Toute
créature de votre choix dans une sphère de 1,50 mètre de rayon centrée
sur un point à portée doit réussir un jet de sauvegarde de Sagesse ou
subir l'état Incapable d'agir jusqu'à la fin de son prochain tour, après
quoi elle doit refaire le jet. Si la cible rate le deuxième jet de
sauvegarde, elle subit l'état Inconscient pendant toute la durée du
sort. Le sort prend fin si une cible subit des dégâts ou si une personne
dans un rayon de 1,50 mètre entreprend une action pour la libérer de
l'effet du sort.
Les créatures qui ne dorment pas, comme les elfes,
ou qui sont immunisées contre l'état Épuisement réussissent
automatiquement leurs jets de sauvegarde contre ce sort.`,
  },
  dream: {
    name: `Songe`,
    description: `Vous
ciblez une créature que vous connaissez sur le même plan d'existence.
Vous, ou une créature consentante que vous touchez, entrez en transe
pour agir comme messager onirique. Pendant cette transe, le messager
subit l'état Incapable d'agir et a une Vitesse de 0.
Si la cible
dort, le messager apparaît dans ses rêves et peut converser avec elle
tant qu'elle reste endormie, pendant toute la durée du sort. Il peut
également façonner l'environnement du rêve, créant des paysages, des
objets et d'autres images. Il peut sortir de transe à tout moment,
mettant fin au sort. La cible se souvient parfaitement du rêve à son
réveil.
Si la cible est éveillée lorsque vous lancez le sort, le
messager le sait et peut soit mettre fin à la transe (et au sort), soit
attendre qu'elle s'endorme, auquel cas il entre dans ses rêves.
Vous
pouvez rendre le messager terrifiant pour la cible. Dans ce cas, le
messager peut délivrer un message de dix mots maximum, après quoi la
cible effectue un jet de sauvegarde de Sagesse. En cas d'échec au jet de
sauvegarde, la cible ne tire aucun avantage de son repos et subit 3d6
dégâts psychiques lorsqu'elle se réveille.`,
  },
  dragonsBreath: {
    name: `Souffle du dragon`,
    description: `Vous
touchez une créature consentante et choisissez acide, froid, feu,
foudre ou poison. Jusqu'à la fin du sort, la cible peut prendre une
action Magie pour souffler un Cône de 4,50 mètres. Toute créature dans
cette zone effectue un jet de sauvegarde de Dextérité, subissant 3d6
dégâts du type choisi en cas d'échec, ou la moitié de ces dégâts en cas
de réussite.
***Emplacement de niveau supérieur***. Les dégâts augmentent de 1d6 pour
chaque niveau d'emplacement de sort supérieur à 2.`,
  },
  wish: {
    name: `Souhait`,
    description: ``,
  },
  flamingSphere: {
    name: `Sphère de feu`,
    description: `Vous
créez une Sphère de feu de 1,50 mètre de diamètre dans un espace libre
au sol à portée. Elle dure toute la durée du sort. Toute créature qui
termine son tour dans un rayon de 1,50 mètre autour de la sphère
effectue un jet de sauvegarde de Dextérité, subissant 2d6 dégâts de feu
en cas d'échec, ou la moitié de ces dégâts en cas de réussite.
Par
une action Bonus, vous pouvez déplacer la sphère jusqu'à 9 mètres et la
faire rouler au sol. Si vous déplacez la sphère dans l'espace d'une
créature, cette dernière effectue son jet de sauvegarde contre la
sphère, et la sphère s'immobilise pour le tour.
Lorsque vous déplacez
la sphère, vous pouvez la diriger par-dessus des barrières jusqu'à 1,50
mètre de haut et la faire sauter par-dessus des fosses jusqu'à 3 mètres
de large. Les objets inflammables non portés commencent à brûler au
contact de la sphère, qui diffuse une Lumière vive sur un rayon de 6
mètres et une Lumière faible sur 6 mètres supplémentaires.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d6 pour chaque niveau d'emplacement de sort supérieur à
2.`,
  },
  vitriolicSphere: {
    name: `Sphère de vitriol`,
    description: `Vous
pointez un endroit à portée, et une boule d'acide brillante de 30 cm de
diamètre y jaillit avant d'exploser dans une Sphère de 6 mètres de
rayon. Toute créature dans cette zone effectue un jet de sauvegarde de
Dextérité. En cas d'échec, la créature subit 10d4 dégâts d'Acide, puis
5d4 supplémentaires à la fin de son prochain tour. En cas de réussite,
la créature subit seulement la moitié des dégâts initiaux.
***Emplacement de niveau
supérieur***. Les dégâts initiaux augmentent de 2d4 pour chaque niveau d'emplacement de sort
supérieur à 4.`,
  },
  otilukesFreezingSphere: {
    name: `Sphère glacée d'Otiluke`,
    description: ``,
  },
  otilukesResilientSphere: {
    name: `Sphère résiliente d'Otiluke`,
    description: `Une
sphère scintillante enferme une créature ou un objet de taille G ou
inférieure à portée. Une créature réticente doit réussir un jet de
sauvegarde de Dextérité ou rester enfermée pendant toute la durée du
sort.
Rien, ni des objets physiques, ni de l'énergie, ni d'autres
effets de sorts, ne peut traverser la barrière, ni entrer ni sortir,
bien qu'une créature dans la sphère puisse y respirer. La sphère est
immunisée contre tous les dégâts, et une créature ou un objet à
l'intérieur ne peut être blessé par des attaques ou des effets de
l'extérieurs, ni endommager quoi que ce soit à l'extérieur.
La sphère
est légère et juste assez grande pour contenir la créature ou l'objet
qu'elle contient. Une créature enfermée peut prendre une action pour
pousser les parois de la sphère et ainsi faire rouler la sphère à une
vitesse pouvant atteindre la moitié de sa Vitesse. De même, le globe
peut être soulevé et déplacé par d'autres créatures.
Un sort de *désintégration* ciblant le globe le
détruit sans blesser quoi que ce soit à l'intérieur.`,
  },
  spareTheDying: {
    name: `Stabilisation`,
    description: `Choisissez une créature à portée qui est à 0 point de vie et qui n'est pas morte. La
créature se stabilise.
***Amélioration de sort mineur***. La portée est doublée aux
niveaux 5 (9 mètres), 11 (18 mètres) et 17 (36 mètres).`,
  },
  suggestion: {
    name: `Suggestion`,
    description: `Vous
suggérez une activité (décrite en 25 mots maximum) à une créature que
vous pouvez voir à portée, capable de vous entendre et de vous
comprendre. La suggestion doit paraître réalisable et ne pas impliquer
d'actions susceptibles d'infliger des dégâts à la cible ou à ses alliés.
Par exemple, vous pourriez dire « Va chercher la clé du
coffre du trésor du culte et donne-la-moi» ou encore « Arrête
de te battre, quitte cette bibliothèque paisiblement et ne revient pas
».
La cible doit réussir un jet de sauvegarde de Sagesse ou subir
l'état Charmé pendant toute la durée du sort, ou jusqu'à ce que vous ou
vos alliés lui infligiez des dégâts. La cible charmée suit la suggestion
du mieux qu'elle peut. L'activité suggérée peut se poursuivre pendant
toute la durée du sort, mais si elle peut être réalisée plus rapidement,
le sort prend fin pour la cible dès sa réalisation.`,
  },
  massSuggestion: {
    name: `Suggestion de groupe`,
    description: ``,
  },
  symbol: {
    name: `Symbole`,
    description: ``,
  },
  telekinesis: {
    name: `Télékinésie`,
    description: `Vous
obtenez la capacité de déplacer ou de manipuler des créatures ou des
objets par la pensée. Lorsque vous lancez le sort, et par une action
Magie lors de vos derniers tours avant la fin du sort, vous pouvez
exercer votre volonté sur une créature ou un objet que vous pouvez voir à
portée, provoquant l'effet approprié ci-dessous. Vous pouvez affecter
la même cible round après round ou en choisir une nouvelle à tout
moment. Si vous changez de cible, la cible précédente n'est plus
affectée par le sort.
**Créature**. Vous pouvez tenter
de déplacer une créature de taille TG ou inférieure. La cible doit
réussir un jet de sauvegarde de Force, ou vous la déplacez jusqu'à 9
mètres dans n'importe quelle direction à portée du sort. Jusqu'à la fin
de votre prochain tour, la créature a l'état Entravé, et si vous la
soulevez dans les airs, elle y reste suspendue. Elle retombe à la fin de
votre prochain tour, sauf si vous utilisez à nouveau cette option et
qu'elle échoue à son jet de sauvegarde.
**Objet**. Vous
pouvez tenter de déplacer un objet de taille TG ou inférieure. Si
l'objet n'est pas porté, vous le déplacez automatiquement jusqu'à 9
mètres dans n'importe quelle direction à portée du sort.
Si l'objet
est porté par une créature, celle-ci doit réussir un jet de sauvegarde
de Force, sinon vous éloignez l'objet et le déplacez jusqu'à 9 mètres
dans n'importe quelle direction à portée du sort.
Vous pouvez exercer
un contrôle précis sur les objets grâce à votre prise télékinétique,
comme manipuler un outil simple, ouvrir une porte ou un contenant,
ranger ou récupérer un objet d'un contenant ouvert, ou verser le contenu
d'une fiole.`,
  },
  telepathy: {
    name: `Télépathie`,
    description: ``,
  },
  teleport: {
    name: `Téléportation`,
    description: ``,
  },
  fireStorm: {
    name: `Tempête de feu`,
    description: ``,
  },
  iceStorm: {
    name: `Tempête de grêle`,
    description: `La
grêle tombe dans un Cylindre de 6 mètres de rayon et 12 mètres de haut,
centré sur un point à portée. Toute créature dans le Cylindre effectue
un jet de sauvegarde de Dextérité. Une créature subit 2d10 dégâts
contondants et 4d6 dégâts de froid en cas d'échec, ou la moitié de ces
dégâts en cas de réussite.
Les grêlons transforment le sol du Cylindre en Terrain difficile jusqu'à la fin de
votre prochain tour.
***Emplacement de niveau supérieur***. Les dégâts contondants
augmentent de 1d10 pour chaque niveau d'emplacement de sort supérieur à 4.`,
  },
  sleetStorm: {
    name: `Tempête de neige`,
    description: `Jusqu'à
la fin du sort, de la neige tombe dans un Cylindre de 12 mètres de haut
et 6 mètres de rayon centré sur un point que vous choisissez à portée.
La zone a une Visibilité nulle et les flammes exposées sont éteintes. Le
sol du Cylindre est un Terrain difficile. Lorsqu'une créature pénètre
dans le Cylindre pour la première fois au cours d'un tour ou y commence
son tour, elle doit réussir un jet de sauvegarde de Dextérité ou subir
l'état À terre et perdre sa concentration.`,
  },
  jallarzisStormOfRadiance: {
    name: `Tempête radieuse de Jallarzi`,
    description: `Vous
déchaînez une tempête d'éclats lumineux et de tonnerre dans un Cylindre
de 3 mètres de rayon et 12 mètres de haut, centré sur un point que vous
pouvez voir à portée. Dans cette zone, les créatures subissent les
états Aveuglé et Assourdi, et ne peuvent pas lancer de sorts à
composante verbale.
Lorsqu'elle apparaît, chaque créature dans la
tempête effectue un jet de sauvegarde de Constitution, subissant 2d10
dégâts radiants et 2d10 dégâts de tonnerre en cas d'échec, ou seulement
la moitié de ces dégâts en cas de réussite. Une créature effectue
également ce jet de sauvegarde lorsqu'elle entre dans la zone du sort
pour la première fois au cours d'un tour ou si elle y termine son tour.
Une créature n'effectue ce jet qu'une seule fois par tour.
***Emplacement de niveau
supérieur***. Les dégâts radiants et de tonnerre augmentent de 1d10 pour chaque niveau
d'emplacement de sort supérieur à 5.`,
  },
  stormOfVengeance: {
    name: `Tempête vengeresse`,
    description: ``,
  },
  darkness: {
    name: `Ténèbres`,
    description: `Pendant
la durée du sort, des Ténèbres magiques se propagent depuis un point à
portée et remplissent une Sphère de 4,50 mètres de rayon. Vision dans le
noir ne peut la traverser, et la lumière non magique ne peut
l'illuminer.
Vous pouvez également lancer le sort sur un objet non
porté, ce qui fait que les Ténèbres remplissent une Émanation de 4,50
mètres provenant de cet objet. Recouvrir cet objet d'un objet opaque,
comme un bol ou un casque, bloque les Ténèbres.
Si une partie de la
zone d'effet de ce sort chevauche une zone de Lumière vive ou de Lumière
faible créée par un sort de niveau 2 ou inférieur, cet autre sort est
dissipé.`,
  },
  armsOfHadar: {
    name: `Tentacules de Hadar`,
    description: `En
invoquant Hadar, vous faites jaillir des vrilles de votre corps. Chaque
créature dans une Émanation de 3 mètres provenant de vous effectue un
jet de sauvegarde de Force. En cas d'échec, la cible subit 2d6 dégâts
nécrotiques et ne peut plus prendre de Réactions avant le début de son
prochain tour. En cas de réussite, la cible subit seulement la moitié
des dégâts.
***Emplacement de niveau supérieur***. Les dégâts augmentent de 1d6 pour
chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  evardsBlackTentacles: {
    name: `Tentacules noirs d'Evard`,
    description: `Des
tentacules noirs se tortillant occupent une zone de 6 mètres de côté
que vous pouvez voir à portée. Pendant la durée du sort, ces tentacules
transforment le sol de cette zone en Terrain difficile.
Toute
créature présente dans cette zone effectue un jet de sauvegarde de
Force. En cas d'échec, elle subit 3d6 dégâts contondants et l'état
Entravé jusqu'à la fin du sort. Une créature effectue également ce jet
de sauvegarde si elle entre dans la zone ou y termine son tour. Une
créature n'effectue ce jet qu'une seule fois par tour.
Une créature
entravée peut effectuer un jet de Force (Athlétisme) contre le DD de
sauvegarde de votre sort, mettant fin à son état en cas de réussite.`,
  },
  hallucinatoryTerrain: {
    name: `Terrain hallucinatoire`,
    description: `Vous
créez un terrain naturel dans un Cube de 45 mètres de côté à portée,
avec l'apparence, le son et l'odeur d'un autre type de terrain naturel.
Ainsi, des champs ouverts ou une route peuvent ressembler à un marais,
une colline, une crevasse ou tout autre terrain difficile ou
impraticable. Un étang peut ressembler à une prairie herbeuse, un
précipice à une pente douce, ou un ravin rocailleux à une route large et
lisse. Les structures, l'équipement et les créatures présents dans la
zone restent inchangés.
Les caractéristiques tactiles du terrain
restent également inchangées ; les créatures qui y pénètrent sont
donc susceptibles de remarquer l'illusion. Si la différence n'est pas
visible au toucher, une créature examinant l'illusion peut prendre
l'action Étude pour effectuer un jet d'Intelligence (Investigation)
contre le DD de sauvegarde de votre sort pour découvrir la supercherie.
Si une créature perçoit que le terrain est illusoire, elle voit une
image floue superposée au terrain réel.`,
  },
  illusoryScript: {
    name: `Texte illusoire`,
    description: `Vous
écrivez sur du parchemin, du papier ou un autre support approprié et
l'imprégnez d'une illusion qui dure toute la durée du sort. Pour vous et
les créatures que vous désignez lors du lancement du sort, l'écriture
paraît normale, semble écrite de votre main et transmet le sens que vous
aviez prévu. Pour tous les autres, l'écriture apparaît comme étant d'un
alphabet inconnu ou magique, et est inintelligible. L'illusion peut
également altérer le sens, l'écriture et la langue du texte, à condition
que cette langue soit connue.
Si le sort est dissipé, l'écriture originale et l'illusion
disparaissent.
Une créature dotée de Vision véritable peut lire le message caché.`,
  },
  thaumaturgy: {
    name: `Thaumaturgie`,
    description: `Vous
engendrez un petit miracle dans la portée du sort. Choisissez l'effet
dans les options ci-dessous. Si vous lancez ce sort plusieurs fois, vous
pouvez garder actif jusqu'à trois de ses effets d'une minute
simultanément.
**Yeux modifiés**. Vous modifiez l'apparence de vos yeux pendant 1
minute.
**Voix retentissante**.
Votre voix résonne jusqu'à trois fois plus fort que d'habitude pendant 1
minute. Pendant cette durée, vous obtenez un Avantage aux jets de
Charisme (Intimidation).
**Jeu avec le feu**. Vous faites scintiller, s'intensifier, s'atténuer
ou changer de couleur des flammes pendant 1 minute.
**Main invisible**. Vous ouvrez ou fermez
instantanément une porte ou une fenêtre non verrouillée.
**Bruit fantôme**.
Vous créez un son bref provenant d'un point de votre choix à portée,
comme un grondement de tonnerre, le cri d'un corbeau ou des murmures
inquiétants.
**Secousse**. Vous provoquez un tremblement de terre inoffensif pendant 1
minute.`,
  },
  web: {
    name: `Toile d'araignée`,
    description: `Vous
invoquez une masse de toile collante à un point à portée. Les toiles
remplissent un Cube de 6 mètres de côté pendant toute la durée du sort.
Les toiles sont un Terrain difficile et la zone à l'intérieur a une
visibilité réduite.
Si les toiles ne sont pas ancrées entre deux
masses solides (comme des murs ou des arbres) ou superposées sur un sol,
un mur ou un plafond, elles s'effondrent sur elles-mêmes et le sort
prend fin au début de votre prochain tour. Les toiles superposées sur
une surface plane ont une profondeur de 1,50 mètre.
La première fois
qu'une créature pénètre dans les toiles au cours d'un tour ou y commence
son tour, elle doit réussir un jet de sauvegarde de Dextérité ou subir
l'état Entravé tant qu'elle est dans les toiles ou jusqu'à ce qu'elle se
libère.
Une créature retenue par les toiles peut effectuer un jet de
Force (Athlétisme) contre le DD de sauvegarde de votre sort. En cas de
réussite, elle n'est plus entravée.
Les toiles sont inflammables.
Tout Cube de toiles de 1,50 mètre de côté exposé au feu brûle en 1
round, infligeant 2d4 dégâts de feu à toute créature qui commence son
tour dans le feu.`,
  },
  fireBolt: {
    name: `Trait de feu`,
    description: `Vous
lancez une particule de feu sur une créature ou un objet à portée.
Effectuez une attaque de sort à distance contre la cible. Si l'attaque
touche, la cible subit 1d10 dégâts de feu. Un objet inflammable touché
par ce sort commence à brûler s'il n'est pas porté.
***Amélioration de sort mineur***.
Les dégâts augmentent de 1d10 lorsque vous atteignez les niveaux 5 (2d10), 11 (3d10) et 17 (4d10).`,
  },
  witchBolt: {
    name: `Trait ensorcelé`,
    description: `Un
rayon d'énergie crépitante se dirige vers une créature à portée,
formant un arc de foudre entre vous et la cible. Effectuez une attaque
de sort à distance contre elle. Si l'attaque touche, la cible subit 2d12
dégâts de foudre.
À chacun de vos tours suivants, vous pouvez
prendre une action Bonus pour infliger automatiquement 1d12 dégâts de
foudre à la cible, même si la première attaque a échoué. Le sort prend
fin si la cible se trouve hors de portée du sort ou si elle bénéficie
d'un Abri total contre vous.
***Emplacement de niveau supérieur***. Les dégâts initiaux
augmentent de 1d12 pour chaque niveau d'emplacement de sort supérieur à 1.`,
  },
  earthquake: {
    name: `Tremblement de terre`,
    description: ``,
  },
  tsunami: {
    name: `Tsunami`,
    description: ``,
  },
  magicJar: {
    name: `Urne magique|Possession`,
    description: ``,
  },
  destructiveWave: {
    name: `Vague destructrice`,
    description: `Une
énergie destructrice se propage autour de vous dans une Émanation de 9
mètres. Chaque créature choisie dans l'Émanation effectue un jet de
sauvegarde de Constitution. En cas d'échec, la cible subit 5d6 dégâts de
tonnerre et 5d6 dégâts radiants ou nécrotiques (selon votre choix)
ainsi que l'état À terre. En cas de réussite, la cible subit seulement
la moitié des dégâts.`,
  },
  thunderwave: {
    name: `Vague tonnante`,
    description: `Vous
déchaînez une vague d'énergie tonitruante. Toute créature dans un Cube
de 4,50 mètres de côté provenant de vous effectue un jet de sauvegarde
de Constitution. En cas d'échec, une créature subit 2d8 dégâts de
tonnerre et est repoussée de 3 mètres. En cas de réussite, elle subit
seulement la moitié des dégâts.
De plus, les objets non sécurisés
entièrement à l'intérieur du Cube sont repoussés de 3 mètres, et un
grondement tonitruant retentit dans un rayon de 90 mètres.
***Emplacement de niveau
supérieur***. Les dégâts augmentent de 1d8 pour chaque niveau d'emplacement de sort supérieur à
1.`,
  },
  windWalk: {
    name: `Vent divin`,
    description: ``,
  },
  arcaneLock: {
    name: `Verrou arcanique|Verrou magique`,
    description: `Vous
touchez une porte, une fenêtre, un portail, un conteneur ou une trappe
fermée et la verrouillez magiquement pour la durée du sort. Ce verrou ne
peut être déverrouillé par aucun moyen non magique. Vous et les
créatures que vous désignez lors du lancement du sort pouvez ouvrir et
fermer l'objet malgré le verrou. Vous pouvez également définir un mot de
passe qui, prononcé à 1,50 mètre ou moins de l'objet, le déverrouille
pendant 1 minute.`,
  },
  swiftQuiver: {
    name: `Vif carquois`,
    description: `Lorsque
vous lancez le sort et par une action Bonus jusqu'à sa fin, vous pouvez
effectuer deux attaques avec une arme tirant des flèches ou des
carreaux, comme un arc long ou une arbalète légère. Le sort crée
magiquement les projectiles nécessaires à chaque attaque. Chaque flèche
ou carreau produit inflige des dégâts comme le même projectile non
magique et se désintègre immédiatement après avoir touché ou manqué sa
cible.`,
  },
  arcaneVigor: {
    name: `Vigueur arcanique`,
    description: `Vous
puisez dans votre force vitale pour vous soigner. Lancez un ou deux de
vos dés de vie non dépensés et récupérez un nombre de points de vie égal
au total du jet, plus votre modificateur de caractéristique
d'incantation. Ces dés sont ensuite dépensés.
***Emplacement de niveau supérieur***.
Le nombre de dés de vie non dépensés que vous pouvez lancer augmente de
un pour chaque niveau d'emplacement de sort supérieur à 2.`,
  },
  darkvision: {
    name: `Vision dans le noir`,
    description: `Pendant
toute la durée du sort, une créature consentante que vous touchez
obtient Vision dans le noir avec une portée de 45 mètres.`,
  },
  trueSeeing: {
    name: `Vision suprême`,
    description: ``,
  },
  transportViaPlants: {
    name: `Voie végétale`,
    description: ``,
  },
  bladeWard: {
    name: `Voile défensif`,
    description: `Chaque fois qu'une créature vous attaque avant la fin du sort, l'attaquant soustrait 1d4
à son jet d'attaque.`,
  },
  fly: {
    name: `Vol`,
    description: `Vous
touchez une créature consentante. Pendant la durée du sort, la cible
gagne une Vitesse de vol de 18 mètres et réaliser un vol stationnaire. À
la fin du sort, la cible tombe si elle est encore en l'air, à moins
qu'elle ne puisse arrêter sa chute.
***Emplacement de niveau supérieur***. Vous pouvez
cibler une créature supplémentaire pour chaque niveau d'emplacement de sort supérieur à 3.`,
  },
  hungerOfHadar: {
    name: `Voracité de Hadar`,
    description: `Vous
ouvrez un portail vers le Royaume Lointain, une région infestée
d'horreurs innomables. Une Sphère de Ténèbres de 6 mètres de rayon
apparaît, centrée sur un point à portée et pour la durée du sort. La
Sphère est un Terrain difficile emplie d'étranges murmures et de bruits
de succion, audibles jusqu'à 9 mètres. Aucune lumière, magique ou autre,
ne peut éclairer la zone, et les créatures qui s'y trouvent entièrement
ont l'état Aveuglé.
Toute créature qui commence son tour dans la
zone subit 2d6 dégâts de froid. Toute créature qui y termine son tour
doit réussir un jet de sauvegarde de Dextérité sous peine de subir 2d6
dégâts d'acide infligés par des tentacules d'Outremonde.
***Emplacement de niveau
supérieur***. Les dégâts de froid ou d'acide (selon votre choix) augmentent de 1d6 pour chaque
niveau d'emplacement de sort supérieur à 3.`,
  },
  zoneOfTruth: {
    name: `Zone de vérité`,
    description: `Vous
créez une zone magique qui protège contre la tromperie dans une Sphère
de 4,50 mètres de rayon centrée sur un point à portée. Jusqu'à la fin du
sort, toute créature qui entre dans la zone d'effet du sort pour la
première fois lors d'un tour ou qui y commence son tour effectue un jet
de sauvegarde de Charisme. En cas d'échec, une créature ne peut pas
mentir délibérément tant qu'elle se trouve dans la zone. Vous savez si
une créature réussit ou échoue ce jet.
Une créature affectée est
consciente du sort et peut éviter de répondre aux questions auxquelles
elle répondrait normalement par un mensonge. Une telle créature peut
être évasive, mais doit être honnête.`,
  },
}
