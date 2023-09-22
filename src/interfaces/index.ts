import { Painting } from '.prisma/client';
import { Label, Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export type User = {
  id: number;
  email: string;
  isAdmin: boolean;
};

export type ResponseError = {
  message: string;
};

export type Post = {
  id: number;
  title: string;
  date: Date;
  createdAt: string;
  updatedAt: string;
  content: string | null;
  published: boolean;
  viewCount: number;
  mainImage: Image;
  images: Image[];
};

export type Item = {
  type: string;
  id: number;
  title: string;
  date: Date;
  technique: string;
  description: string | null;
  height: number;
  width: number;
  length: number | null;
  createdAt: Date;
  updatedAt: Date;
  image: Image;
  images: Image[];
  isToSell: boolean;
  price: number | null;
  sold: boolean;
};

export type Image = {
  id: number;
  filename: string;
  width: number;
  height: number;
};

export async function getContentFull() {
  return await prisma.content.findMany({ include: { images: true } });
}
export type ContentFull = Prisma.PromiseReturnType<typeof getContentFull>;

export async function getPaintingFull() {
  return await prisma.painting.findMany({
    include: { image: true, category: true },
  });
}
export type PaintingFull = Prisma.PromiseReturnType<typeof getPaintingFull>;

export async function getSculptureFull() {
  return await prisma.sculpture.findMany({
    include: { images: true, category: true },
  });
}
export type SculptureFull = Prisma.PromiseReturnType<typeof getSculptureFull>;

export async function getCategoryPaintingFull() {
  return prisma.categoryPainting.findMany({
    include: { paintings: true },
  });
}
export type CategoryPaintingFull = Prisma.PromiseReturnType<
  typeof getCategoryPaintingFull
>;
