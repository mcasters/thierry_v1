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
