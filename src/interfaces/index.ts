import { Painting } from '.prisma/client';

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
  length: number;
  createdAt: Date;
  updatedAt: Date;
  image: Image;
  images: Image[];
  isToSell: boolean;
  price: number | null;
  sold: boolean;
};

export type ff = Painting & { type: 'peinture' };

export type Image = {
  id: number;
  filename: string;
  width: number;
  height: number;
};

export type ResponseError = {
  message: string;
};