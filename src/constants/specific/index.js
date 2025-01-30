import { THEME } from "@/constants/admin";

export const TEXTS = {
  TITLE: "Thierry Casters",
  FOOTER:
    "Images and site content copyright © 2025 Thierry Casters. All rights reserved",
};

export const BASE_THEME = {
  name: THEME.BASE_THEME,
  isActive: true,
  lineColor: "#a4874f",
  backgroundColor: "#f8f8f8",
  backgroundColorItem: "#24445C",
  color: "#2e6177",
  colorItem: "#a4874f",
  titleColor: "#2e6177",

  linkColor: "#a4874f",
  linkHoverColor: "#e5ca96",
  linkItemColor: "#2e6177",
  linkHoverItemColor: "#66c3d3",

  menu1Color: "#e7e7e7",
  menu1HomeColor: "#e7e7e7",
  menu1ItemColor: "#0f1f26",
  menu1LinkColor: "#2e6177",
  menu1LinkHoverColor: "#a4874f",
  menu1LinkHomeColor: "#2e6177",
  menu1LinkHomeHoverColor: "#a4874f",
  menu1LinkItemColor: "#66c3d3",
  menu1LinkHoverItemColor: "#b5d1d5",

  menu2Color: "#f8f8f8",
  menu2HomeColor: "#f8f8f8",
  menu2ItemColor: "#13262f",
  menu2LinkColor: "#a4874f",
  menu2LinkHoverColor: "#d9bf94",
  menu2LinkHomeColor: "#a4874f",
  menu2LinkHomeHoverColor: "#d9bf94",
  menu2LinkItemColor: "#a4874f",
  menu2LinkHoverItemColor: "#d9bf94",
};

export const BASE_PRESET_COLOR = {
  name: "Prussian blue",
  color: "#24445C",
};

export const NOTES = {
  Images:
    "J'ai implémenté une gestion totale des fichiers image. L'image est redimensionnée et optimisée pour garder le" +
    " plus de qualité possible. " +
    " Il n'y a qu'une chose" +
    " à te" +
    " préoccuper, c'est de" +
    " fournir une" +
    " image qui fasse" +
    " plus de 2000 pixels de large. Néanmoins, j'ai quand même proposé une option pour enlever cette contrainte de" +
    " 2000 pixels," +
    " si jamais tu n'as pas de photo si grande, ou par exemple pour la" +
    " photo" +
    " de présentation qui n'a pas besoin d'être grande puisqu'on ne peux pas la zoomer.\n" +
    "Ne te préoccupes pas du poids du fichier, mieux vaut lui fournir trop de qualité que" +
    " pas assez.\nPar sécurité, j'ai mis une limite de 20Mo par upload, donc si tu" +
    " veux uploader plusieurs images (pour une sculpture par exemple), il faudra peut-être t'y prendre en" +
    " plusieurs fois selon le poids de tes fichiers (tu ajoutes alors la sculpture avec quelques photos et tu le" +
    " modifies" +
    " pour" +
    " ajouter les autres fichiers)\n" +
    "\nLes" +
    " fichiers pris en charge sont le jpeg (ou" +
    " jpg) et le png. Si tu en veux d'autre, dis-le.",
  Themes:
    "Pour la gestion des couleurs du site, il y a le thème de base que j'ai rendu impossible à changer. Cela te" +
    " permet d'avoir toujours cette base sur quoi partir pour modifier ensuite les couleurs et enregistrer sous un" +
    " autre thème. Tu peux créer (c'est toujours à partir d'un thème existant), modifier et supprimer autant de" +
    " thèmes que tu veux. Ainsi, il y a toujours un thème" +
    " actif (par défaut le thème de base), et tu peux avoir tout un stock d'autres thèmes que tu as" +
    " créés et qu'il suffit d'activer pour les voir appliqués dans le site. Ça permet de comparer.",
  Items:
    "Surtout n'aie pas peur de créer des items (peintures, sculptures ou post) car tu peux de toute façon à tout" +
    " moment les modifier ou les supprimer.\n" +
    "Lorsqu'il existe des catégories, si des items (peintures ou sculptures) sont créés sans être rangés dans une" +
    " catégorie, alors un" +
    " sous-menu intitulé 'sans catégorie' se crée dans le menu pour y ranger les items en question. En revanche," +
    " s'il n'existe aucune catégorie, alors aucun sous-menu ne se crée et on" +
    " accède à tous les items directement depuis le menu 'peinture' ou 'sculpture'\nTu verras par ailleurs que j'ai" +
    " ajouté dans le menu 'peinture' et 'sculpture' la possibilité d'obtenir les items selon leur année. Si un autre" +
    " type de filtre te semble pertinent, fais m'en part, c'est pas compliqué à faire !",
  Connexion:
    "Ton site n'est pas un site statique, c'est une application, c'est-à-dire que ses utilisateurs peuvent" +
    " modifier son contenu. Pour la" +
    " petite histoire, il est fabriqué de la même manière et avec les même outils que Facebook (qui sont Open" +
    " source). Simplement" +
    " la" +
    " différence, c'est que dans ton site, je n'ai laissé la possibilité d'avoir qu'un seul utilisateur. Ainsi, en" +
    " tant qu'utilisateur de cette application, tu as accès à une" +
    " partie" +
    " du site dont j'ai restreint l'accès à ce seul utilisateur, ce que j'appelle l'espace" +
    " d'administration. Cet espace" +
    " du" +
    " site permet" +
    " d'agir sur le site lui-même, à hauteur bien sûr de ce que je laisse de marge de manœuvre, en l'occurrence" +
    " ici pour" +
    " y" +
    " ajouter des peintures, des posts...\nAinsi," +
    " comme tu" +
    " l'as remarqué, j'ai" +
    " rendu le plus discret possible le lien vers cet espace d'administration (pas besoin de stimuler les gens à" +
    " essayer d'y rentrer). Une fois qu'on est connecté, il y a alors un petit encadré que je laisse" +
    " toujours en haut à gauche. Ça permet de voir que tu es connecté. De plus, ça permet de naviguer entre la" +
    " partie administration du site et la partie accessible à tous : en cliquant sur 'Home', tu sors de l'espace" +
    " d'administration tout en restant connecté, pour aller voir par exemple les modifications que tu viens de" +
    " faire. Cela te permet bien sûr de revenir à l'espace d'administration ('Administration du site'), et enfin" +
    " cela te permet de te déconnecter pour redevenir simple visiteur de ton site. Lorsque tu as finis d'administrer" +
    " ton site, pense d'ailleurs à te déconnecter, quitter ton site en restant connecté constitue en effet une faille" +
    " de" +
    " sécurité, même si je l'ai rendu mineure...",
  Surtout:
    "N'hésite pas à m'appeler quand tu t'y mets, histoire de ne pas galérer, et parce que je me" +
    " ferais un plaisir de te présenter comment ça fonctionne !! :)\n\nEt bien sûr, rapporte-moi tout problème ou" +
    " toute modification que tu aurais besoin que je fasse ! Ne t'en empêche pas car ça m'éclate de faire ce site," +
    " sans compter qu'en améliorant ton site, j'améliore aussi le mien puisqu'ils sont tous les deux construits de" +
    " la même manière.\nBises mon frérot !!",
};
