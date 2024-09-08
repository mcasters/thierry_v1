export const PAGE_TYPE = {
  GENERAL: "Général",
  ITEM: "Pages d'items",
  OTHERS: "Autres pages",
  HOME: "Page home",
};

export const NOTES = {
  IMAGES:
    "J'ai implémenté une gestion totale des fichiers image. Tu n'as donc à te soucier ni de la taille du fichier ni de la dimension de l'image. C'est redimensionné de manière à garder des dimensions minimum pour l'affichage sur grand écran (2000 pixels de large) et c'est optimisé pour garder le plus de qualité possible dans cette dimension. En revanche, il est évident que si tu fournis une image plus petite que 2000 px de large ou de mauvaise qualité, ça le restera. À noter que ça prend aussi les fichiers png",
  THEMES:
    "Pour la gestion des couleurs du site, il y a le thème de base que j'ai rendu impossible à changer. Cela te permet d'avoir toujours cette base sur quoi partir pour modifier ensuite les couleurs et enregistrer sous un autre nom. Tu peux créer, modifier et supprimer autant de thème que tu veux, c'est pas un problème. Ça te permet par exemple de les comparer en les activant à tour de rôle.",
  ITEMS:
    "Lorsqu'il existe des catégories, si des items sont créés sans être rangés dans une catégorie, alors une catégorie intitulée 'sans catérogie' se crée dans le menu pour y ranger les items en question. En revanche, s'il n'existe aucune catégorie, alors bien sûr, il n'y a pas de création automatique de catégorie, puisqu'on y accèdera directement par le menu racine (à même 'peintures' ou 'sculptures').",
};
