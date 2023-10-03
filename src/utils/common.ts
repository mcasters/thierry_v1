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

export const getPresentationContent = (contents: ContentFull[]) => {
  if (!contents || contents.length === 0) return undefined;

  let presentationContent;
  let demarcheContent;
  let inspirationContent;
  contents.forEach((c: ContentFull) => {
    if (c.label === Label.PRESENTATION) presentationContent = c;
    if (c.label === Label.DEMARCHE) demarcheContent = c;
    if (c.label === Label.INSPIRATION) inspirationContent = c;
  });
  return { presentationContent, demarcheContent, inspirationContent };
};

export const getIntro = (contents) => {
  return contents?.filter((c) => c.label === Label.INTRO)[0].text || '';
};

export const getSliders = (contents) => {
  return contents?.filter((c) => c.label === Label.SLIDER)[0].images || [];
};

export const getContactContent = (contents: Content[]) => {
  if (!contents || contents.length === 0) return undefined;

  let addressContent;
  let phoneContent;
  let emailContent;
  let textContactContent;

  contents.forEach((c: Content) => {
    if (c.label === Label.ADDRESS) addressContent = c;
    if (c.label === Label.PHONE) phoneContent = c;
    if (c.label === Label.EMAIL) emailContent = c;
    if (c.label === Label.TEXT_CONTACT) textContactContent = c;
  });
  return { addressContent, phoneContent, emailContent, textContactContent };
};
