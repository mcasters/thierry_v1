export const ROUTES = {
  PAINTING: '/peintures',
  SCULPTURE: '/sculptures',
  HOME: '/',
  ARTICLE: '/articles',
  PRIVACY: '/politique-de-confidentialite',
  ADMIN: '/admin',
  A_PAINTING: '/admin/peintures',
  A_SCULPTURE: '/admin/sculptures',
  A_HOME: '/admin/home',
  A_ARTICLE: '/admin/articles',
};

export const NAMES = {
  PRESENTATION: 'Présentation',
  PAINTING: 'Peintures',
  SCULPTURE: 'Sculptures',
  HOME: 'Home',
  PRIVACY_FRENCH: 'Politique de confidentialité',
  ADMIN: 'général',
  ARTICLE: 'Articles',
};

export const MENU = [
  {
    PATH: ROUTES.HOME,
    NAME: NAMES.HOME,
  },
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
];
