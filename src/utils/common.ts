import { ContentFull, Item } from '@/interfaces';
import { Label } from '@prisma/client';

export const getDirnameFromNameOrTitle = (name: string): string => {
  return name
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

export const getPresentationContent = (contents: ContentFull[]) => {
  if (!contents || contents.length === 0) return undefined;

  let presentationContent = undefined;
  let demarcheContent = undefined;
  let inspirationContent = undefined;
  contents.forEach((c) => {
    if (c.label === Label.PRESENTATION) presentationContent = c;
    if (c.label === Label.DEMARCHE) demarcheContent = c;
    if (c.label === Label.INSPIRATION) inspirationContent = c;
  });
  return { presentationContent, demarcheContent, inspirationContent };
};
