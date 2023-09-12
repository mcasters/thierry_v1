export const ROUTES = {
  PAINTING: '/peintures',
  SCULPTURE: '/sculptures',
  HOME: '/',
  PRIVACY: '/politique-de-confidentialite',
  SIGNOUT: '/signout',
  SIGNIN: '/signin',
  ADMIN: '/admin',
  A_PAINTING: '/admin/peintures',
  A_SCULPTURE: '/admin/sculptures',
  A_HOME: '/admin/accueil',
};

export const NAMES = {
  PRESENTATION: 'Présentation',
  PAINTING: 'Peintures',
  SCULPTURE: 'Sculptures',
  HOME: 'Home',
  PRIVACY_FRENCH: 'Politique de confidentialité',
  ADMIN: 'Admin',
  SIGNOUT: 'Admin out',
  SIGNIN: 'Admin in',
};

export const MENU = [
  {
    PATH: ROUTES.PAINTING,
    NAME: NAMES.PAINTING,
  },
  {
    PATH: ROUTES.SCULPTURE,
    NAME: NAMES.SCULPTURE,
  },
];
