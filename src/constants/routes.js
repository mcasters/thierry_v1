export const ROUTES = {
  PRESENTATION: '/presentation',
  PAINTING: '/peintures',
  SCULPTURE: '/sculptures',
  CONTACT: '/contact',
  HOME: '/',
  ARTICLE: '/articles',
  PRIVACY: '/politique-de-confidentialite',
  ADMIN: '/admin',
  A_PAINTING: '/admin/peintures',
  A_SCULPTURE: '/admin/sculptures',
  A_HOME: '/admin/home',
  A_ARTICLE: '/admin/articles',
  A_CONTACT: '/admin/contact',
  A_PRESENTATION: '/admin/presentation',
};

export const NAMES = {
  PRESENTATION: 'Présentation',
  PAINTING: 'Peintures',
  SCULPTURE: 'Sculptures',
  HOME: 'Home',
  PRIVACY_FRENCH: 'Politique de confidentialité',
  ADMIN: 'général',
  ARTICLE: 'Articles',
  CONTACT: 'Contact',
};

export const MENU_1 = [
  {
    PATH: ROUTES.PAINTING,
    NAME: NAMES.PAINTING,
  },
  {
    PATH: ROUTES.SCULPTURE,
    NAME: NAMES.SCULPTURE,
  },
  {
    PATH: ROUTES.ARTICLE,
    NAME: NAMES.ARTICLE,
  },
];

export const MENU_2 = [
  {
    PATH: ROUTES.PRESENTATION,
    NAME: NAMES.PRESENTATION,
  },
  {
    PATH: ROUTES.HOME,
    NAME: NAMES.HOME,
  },
  {
    PATH: ROUTES.CONTACT,
    NAME: NAMES.CONTACT,
  },
];

export const ADMIN_MENU = [
  {
    PATH: ROUTES.ADMIN,
    NAME: NAMES.ADMIN,
  },
  {
    PATH: ROUTES.A_HOME,
    NAME: NAMES.HOME,
  },
  {
    PATH: ROUTES.A_PAINTING,
    NAME: NAMES.PAINTING,
  },
  {
    PATH: ROUTES.A_SCULPTURE,
    NAME: NAMES.SCULPTURE,
  },
  {
    PATH: ROUTES.A_ARTICLE,
    NAME: NAMES.ARTICLE,
  },
  {
    PATH: ROUTES.A_CONTACT,
    NAME: NAMES.CONTACT,
  },
  {
    PATH: ROUTES.A_PRESENTATION,
    NAME: NAMES.PRESENTATION,
  },
];
