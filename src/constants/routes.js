export const ROUTES = {
  PAINTING: '/peintures',
  SCULPTURE: '/sculptures',
  HOME: '/',
  PRIVACY: '/politique-de-confidentialite',
  ADMIN: '/admin',
  A_PAINTING: '/admin/peintures',
  A_SCULPTURE: '/admin/sculptures',
  A_HOME: '/admin/home',
};

export const NAMES = {
  PRESENTATION: 'Présentation',
  PAINTING: 'Peintures',
  SCULPTURE: 'Sculptures',
  HOME: 'Home',
  PRIVACY_FRENCH: 'Politique de confidentialité',
  ADMIN: 'Admin',
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
];

export const ADMIN_MENU = [
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
];
