import { Content, Label } from '@prisma/client';
import { ContentFull } from '@/app/api/content/content';
import { ContentImage } from '.prisma/client';

export const transformValueToKey = (value: string): string => {
  return value
    .toLowerCase()
    .split(' ' || "'")
    .join('_')
    .replace(/[`~!@#$%^&*()”‘|+\-=?;:",.<>\{\}\[\]\\\/]/gi, '')
    .replace(/à/gi, 'a')
    .replace(/é/gi, 'e')
    .replace(/è/gi, 'e')
    .replace(/ê/gi, 'e')
    .replace(/ù/gi, 'u')
    .replace(/ç/gi, 'c')
    .replace(/î/gi, 'i')
    .replace(/ë/gi, 'e');
};

export const getSrcItem = (type: string, filename: string) =>
  `/images/${type}/${filename}`;

export const getSrcMisc = (filename: string) =>
  `/images/miscellaneous/${filename}`;

export const getSrcPost = (filename: string) => `/images/post/${filename}`;

export const getPresentationContent = (
  contents: ContentFull[],
): ContentFull => {
  return contents?.filter((c) => c.label === Label.PRESENTATION)[0] || null;
};

export const getDemarche = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.DEMARCHE)[0] || null;
};

export const getInspiration = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.INSPIRATION)[0] || null;
};

export const getIntro = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.INTRO)[0] || null;
};

export const getSliders = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.SLIDER)[0] || null;
};

export const getAddress = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.ADDRESS)[0] || null;
};

export const getPhone = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.PHONE)[0] || null;
};

export const getEmail = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.EMAIL)[0] || null;
};

export const getTextContact = (contents: ContentFull[]): ContentFull => {
  return contents?.filter((c) => c.label === Label.TEXT_CONTACT)[0] || null;
};
