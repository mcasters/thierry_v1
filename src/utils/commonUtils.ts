import { Label } from '@prisma/client';
import { ContentFull } from '@/app/api/content/content';
import { PostFull } from '@/app/api/post/post';
import { PaintingFull } from '@/app/api/peinture/painting';
import { TYPE } from '@/constants';
import { SculptureFull } from '@/app/api/sculpture/sculpture';
import { Image, PostImage } from '.prisma/client';

export const transformValueToKey = (value: string): string => {
  return value
    .toLowerCase()
    .split(' ')
    .join('_')
    .replace(/[`~!@#$%^&*()'”‘|+\-=?;:",.<>{}\[\]\\\/]/gi, '')
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

export const getMainImage = (post: PostFull | undefined) => {
  return post?.images?.filter((i: PostImage) => i.isMain)[0] || undefined;
};

export const isPaintingFull = (item: any): item is PaintingFull =>
  Object.values(item).includes(TYPE.PAINTING);

export const isSculptureFull = (item: any): item is SculptureFull =>
  Object.values(item).includes(TYPE.SCULPTURE);

export const isPostFull = (item: any): item is PostFull =>
  Object.values(item).includes(TYPE.POST);

export const getEmptyImage = (): Image => {
  return {
    id: 0,
    height: 0,
    width: 0,
    filename: '',
    isMain: false,
    sculptureId: null,
  };
};

export const getEmptyPainting = (): PaintingFull => {
  return {
    id: 0,
    type: TYPE.PAINTING,
    title: '',
    date: new Date(),
    technique: '',
    description: '',
    height: 0,
    width: 0,
    isToSell: false,
    sold: false,
    price: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    imageId: 0,
    image: getEmptyImage(),
    category: null,
    categoryId: null,
  };
};

export const getEmptySculpture = (): SculptureFull => {
  return {
    id: 0,
    type: TYPE.SCULPTURE,
    title: '',
    date: new Date(),
    technique: '',
    description: '',
    height: 0,
    width: 0,
    length: 0,
    isToSell: false,
    sold: false,
    price: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [getEmptyImage()],
    category: null,
    categoryId: null,
  };
};