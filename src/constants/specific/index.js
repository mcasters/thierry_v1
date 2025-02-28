import { THEME } from "../admin";

export const META = {
  SITE_TITLE: "siteTitle",
  SITE_EMAIL: "siteEmail",
  FOOTER: "footerContent",
  INSTAGRAM: "instagram",
};

export const TEXTS = {
  NOTES: {
    Date: "03 février 2025",
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
      " pas assez.\nPar sécurité, j'ai mis une limite de 30Mo par upload, donc si tu" +
      " veux uploader plusieurs images lourdes, il faudra peut-être t'y prendre en" +
      " plusieurs fois (tu ajoutes jusqu'à 30Mo et tu" +
      " modifies ensuite" +
      " pour" +
      " ajouter les autres fichiers). Mais dis-moi si ça t'embête, j'augmenterai la limite, où je l'enlèverai.\n" +
      "Les fichiers pris en charge sont le jpeg (ou" +
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
      " moment les modifier ou les supprimer. C'est d'ailleurs valable pour l'ensemble : tout est modifiable ou" +
      " supprimable.\n" +
      "Pour les peintures et les sculptures, j'ai ajouté la possibilité de les classer dans des catégories. Tu peux" +
      " avoir des items qui sont classés et d'autres pas, ou aucun qui ne sont classés, ou tous qui sont" +
      " classés.\nTu verras donc que quand on clique sur le menu 'Peintures' ou 'sculptures', on tombe maintenant sur" +
      " une page où les diverses catégories sont proposées, avec la possibilité d'ailleurs d'y faire figurer la" +
      " photo d'une des œuvres qui y sont classées, pour se faire une idée du type d'œuvres de la catégorie. Pour les" +
      " items qui ne sont pas classés, il sont alors rangés dans une pseudo catégorie intitulée" +
      " 'Sans catégorie'. Dans cette page d'accueil des peintures ou sculptures, sous cette liste de catégories, j'ai" +
      " ajouté également la possibilité de filtrer les œuvres selon leur année. On accède alors aux items non plus" +
      " classés par catégorie, mais par l'année choisie.\nSi un autre type de filtre te semble pertinent, fais m'en" +
      " part, c'est pas compliqué à faire !",
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
    Logo:
      "Comme tu peux le constater, j'ai créé un logo provisoire 'TC', lequel constitue le lien vers la page home," +
      " dans le second menu." +
      " Si cette idée te plait, alors il faudrait que tu me fournisses le dessin" +
      " de ta signature pour que je puisse en faire un fichier icon. J'utilise aussi cette image pour la fournir à" +
      " Google et aux diverses applications qui demandent l'image d'un logo. Cette icon est par exemple utilisé par" +
      " les" +
      " réseaux sociaux lorsque tu mets le lien vers ton site. Ou encore, c'est utilisé par les navigateurs : lorsque" +
      " tu es sur un site, tu as peut-être remarqué qu'il y a souvent une petite image affichée sur l'onglet. Mais ce" +
      " n'était qu'une idéé soumise, et si tu préfères autre chose, pas de problème bien sûr. On peut par exemple" +
      " mettre simplement la mention 'Home' pour ce lien, ou mettre une tout autre image.",
    Surtout:
      "N'hésite pas à m'appeler quand tu t'y mets, histoire de ne pas galérer, et parce que je me" +
      " ferais un plaisir de te présenter comment ça fonctionne !! :)\n\nEt bien sûr, rapporte-moi tout problème ou" +
      " toute modification que tu aurais besoin que je fasse ! Ne t'en empêche pas car ça m'éclate de faire ce site," +
      " sans compter qu'en améliorant ton site, j'améliore aussi le mien puisqu'ils sont tous les deux construits de" +
      " la même manière.\nBises mon frérot !!",
  },
};

export const BASE_THEME = {
  name: THEME.BASE_THEME,
  isActive: true,

  // general
  lineColor: "#a4874f",
  backgroundColor: "#f8f8f8",
  titleColor: "#2e6177",
  color: "#2e6177",
  linkColor: "#a4874f",
  linkHoverColor: "#f1d8a8",

  // item
  backgroundColorItem: "#24445C",
  colorItem: "#c4a368",
  linkItemColor: "#c4a368",
  linkHoverItemColor: "#f1d8a8",

  /*
  menu 1
   */
  // general
  menu1Color: "#e7e7e7",
  menu1LinkColor: "#2e6177",
  menu1LinkHoverColor: "#a4874f",

  // home
  menu1HomeColor: "#e7e7e7",
  menu1LinkHomeColor: "#2e6177",
  menu1LinkHomeHoverColor: "#a4874f",

  // Item
  menu1ItemColor: "#0f1f26",
  menu1LinkItemColor: "#66c3d3",
  menu1LinkHoverItemColor: "#b5d1d5",

  /*
   menu 2
   */
  // general
  menu2Color: "#f8f8f8",
  menu2LinkColor: "#a4874f",
  menu2LinkHoverColor: "#e0bf84",

  // home
  menu2HomeColor: "#f8f8f8",
  menu2LinkHomeColor: "#a4874f",
  menu2LinkHomeHoverColor: "#e0bf84",

  // item
  menu2ItemColor: "#13262f",
  menu2LinkItemColor: "#c4a368",
  menu2LinkHoverItemColor: "#f1d8a8",
};

export const BASE_PRESET_COLOR = {
  name: "Prussian blue",
  color: "#24445C",
};
