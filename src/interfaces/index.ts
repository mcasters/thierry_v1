import { Painting } from '.prisma/client';
import { Label, Prisma } from '@prisma/client';

export type User = {
  id: number;
  email: string;
  isAdmin: boolean;
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

export type Content = {
  id: number;
  label: Label;
  title: string;
  text: string;
  images: Image[];
};

const contentWithImages = Prisma.validator<Prisma.ContentDefaultArgs>()({
  include: { images: true },
});
export type ContentFull = Prisma.ContentGetPayload<typeof contentWithImages>;

export type ResponseError = {
  message: string;
};
