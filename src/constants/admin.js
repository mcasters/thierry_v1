export const PAGE_TYPE = {
  GENERAL: "Commun à home et autres pages",
  ITEM: "Pages d'items",
  OTHERS: "Autres pages",
  HOME: "Page home",
};

export const NOTES = {
  IMAGES:
    "J'ai implémenté une gestion totale des fichiers image. L'image est redimensionnée et optimisée pour garder le" +
    " plus de qualité possible. Il n'y a qu'une chose à te préoccuper, c'est de fournir une image qui fasse" +
    " plus de 2000 pixels de large. À noter que ça prend aussi les fichiers png.",
  THEMES:
    "Pour la gestion des couleurs du site, il y a le thème de base que j'ai rendu impossible à changer. Cela te" +
    " permet d'avoir toujours cette base sur quoi partir pour modifier ensuite les couleurs et enregistrer sous un" +
    " autre thème. Tu peux créer (c'est toujours à partir d'un thème existant), modifier et supprimer autant de" +
    " thèmes que tu veux. Ça te permet par exemple de les comparer en les activant à tour de rôle.",
  ITEMS:
    "Lorsqu'il existe des catégories, si des items (peintures ou sculptures) sont créés sans être rangés dans une" +
    " catégorie, alors une" +
    " catégorie intitulée 'sans catégorie' se crée dans le menu pour y ranger les items en question. En revanche," +
    " s'il n'existe aucune catégorie, alors il n'y a pas de création automatique de catégorie," +
    " et on y accèdera directement par le menu racine (à même le menu 'peintures' ou 'sculptures').",
};
