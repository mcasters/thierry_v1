export const ROUTES = {
  PRESENTATION: "/presentation",
  PAINTING: "/peintures",
  SCULPTURE: "/sculptures",
  DRAWING: "/dessins",
  CONTACT: "/contact",
  HOME: "/",
  POST: "/posts",
  ADMIN: "/admin",
  LOGIN: "/login",
  A_PAINTING: "/admin/peintures",
  A_SCULPTURE: "/admin/sculptures",
  A_HOME: "/admin/home",
  A_POST: "/admin/posts",
  A_CONTACT: "/admin/contact",
  A_PRESENTATION: "/admin/presentation",
};

export const TAGS = {
  PRESENTATION: "Présentation",
  PAINTING: "Peintures",
  SCULPTURE: "Sculptures",
  DRAWING: "Dessins",
  HOME: "Home",
  PRIVACY_FRENCH: "Politique de confidentialité",
  ADMIN: "Général",
  POST: "Posts",
  CONTACT: "Contact",
};

export const MENU_1_ITEMS = {
  [TAGS.PAINTING]: {
    TAG: TAGS.PAINTING,
    ROUTE: ROUTES.PAINTING,
  },
  [TAGS.SCULPTURE]: {
    TAG: TAGS.SCULPTURE,
    ROUTE: ROUTES.SCULPTURE,
  },
  [TAGS.POST]: {
    TAG: TAGS.POST,
    ROUTE: ROUTES.POST,
  },
};

export const MENU_2 = [
  {
    TAG: TAGS.PRESENTATION,
    ROUTE: ROUTES.PRESENTATION,
  },
  {
    TAG: TAGS.HOME,
    ROUTE: ROUTES.HOME,
  },
  {
    TAG: TAGS.CONTACT,
    ROUTE: ROUTES.CONTACT,
  },
];

export const ADMIN_MENU = [
  {
    ROUTE: ROUTES.ADMIN,
    TAG: TAGS.ADMIN,
  },
  {
    ROUTE: ROUTES.A_HOME,
    TAG: TAGS.HOME,
  },
  {
    ROUTE: ROUTES.A_PAINTING,
    TAG: TAGS.PAINTING,
  },
  {
    ROUTE: ROUTES.A_SCULPTURE,
    TAG: TAGS.SCULPTURE,
  },
  {
    ROUTE: ROUTES.A_POST,
    TAG: TAGS.POST,
  },
  {
    ROUTE: ROUTES.A_PRESENTATION,
    TAG: TAGS.PRESENTATION,
  },
  {
    ROUTE: ROUTES.A_CONTACT,
    TAG: TAGS.CONTACT,
  },
];
