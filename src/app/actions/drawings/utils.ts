import { ItemFull, Type } from "@/lib/type";
import {
  getItemDir,
  getSculptureDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";

export const getItemData = (
  type: string,
  formData: FormData,
  oldItem?: ItemFull,
) => {
  if (type === Type.PAINTING || type === Type.DRAWING)
    return getPaintOrDrawData(type, formData, oldItem);
  if (type === Type.SCULPTURE) return getSculptData(formData, oldItem);
};

const getPaintOrDrawData = async (
  type: string,
  formData: FormData,
  oldItem?: ItemFull,
) => {
  const rawFormData = Object.fromEntries(formData);
  const file = rawFormData.file as File;
  const title = rawFormData.title as string;
  const fileInfo = await resizeAndSaveImage(file, title, getItemDir(type));
  const category = getCategoryData(rawFormData, oldItem);

  return {
    title,
    date: new Date(Number(rawFormData.date), 1),
    technique: rawFormData.technique as string,
    description: rawFormData.description as string,
    height: Number(rawFormData.height),
    width: Number(rawFormData.width),
    isToSell: rawFormData.isToSell === "true",
    price: Number(rawFormData.price),
    imageFilename: fileInfo ? fileInfo.filename : undefined,
    imageWidth: fileInfo ? fileInfo.width : undefined,
    imageHeight: fileInfo ? fileInfo.height : undefined,
    category,
  };
};

const getSculptData = async (formData: FormData, oldItem?: ItemFull) => {
  const rawFormData = Object.fromEntries(formData);
  const files = formData.getAll("files") as File[];
  const title = rawFormData.title as string;
  const images = await handleSculptImages(files, title, getSculptureDir());

  return {
    title,
    date: new Date(Number(rawFormData.date), 1),
    technique: rawFormData.technique as string,
    description: rawFormData.description as string,
    height: Number(rawFormData.height),
    width: Number(rawFormData.width),
    length: Number(rawFormData.length),
    isToSell: rawFormData.isToSell === "true",
    price: Number(rawFormData.price),
    category:
      rawFormData.categoryId === ""
        ? {}
        : {
            connect: {
              id: Number(rawFormData.categoryId),
            },
          },
    images: {
      create: images,
    },
  };
};

const handleSculptImages = async (files: File[], title, dir) => {
  let images = [];
  for (const file of files) {
    if (file.size > 0) {
      const fileInfo = await resizeAndSaveImage(file, title, dir);
      if (fileInfo)
        images.push({
          filename: fileInfo.filename,
          width: fileInfo.width,
          height: fileInfo.height,
        });
    }
  }
  return images;
};

export const getCategoryData = (rawFormData, oldItem?: ItemFull) => {
  return rawFormData.categoryId !== ""
    ? {
        connect: {
          id: Number(rawFormData.categoryId),
        },
      }
    : oldItem && oldItem.categoryId
      ? {
          disconnect: {
            id: oldItem.categoryId,
          },
        }
      : {};
};
