import { Item } from '@/interfaces';
import { TYPE } from '@/constants';

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
