import { Type } from "@/lib/type";
import prisma from "@/lib/prisma";
import { deleteFile, getDir, resizeAndSaveImage } from "@/utils/serverUtils";

export const getItemModel = (type: Type) => {
  switch (type) {
    case Type.PAINTING:
      return prisma.painting;
    case Type.SCULPTURE:
      return prisma.sculpture;
    case Type.DRAWING:
      return prisma.drawing;
    case Type.POST:
      return prisma.post;
  }
};

export const deleteImages = async (filenamesToDelete: string, type: Type) => {
  const dir = getDir(type);

  if (!filenamesToDelete || filenamesToDelete === "") return;

  for await (const filename of filenamesToDelete.split(",")) {
    deleteFile(dir, filename);
    if (type === Type.SCULPTURE)
      await prisma.sculptureImage.delete({
        where: { filename },
      });
    if (type === Type.POST)
      await prisma.postImage.delete({
        where: { filename },
      });
  }
};

export const getFilenameList = (images: [{ filename: string }]): string => {
  let string = "";
  images.forEach((image, i) => {
    if (i === 0) string = image.filename;
    else string += `,${image.filename}`;
  });
  return string;
};

export const getData = async (type: Type, formData: FormData) => {
  const rawFormData = Object.fromEntries(formData);

  await deleteImages(rawFormData.filenamesToDelete as string, type);
  const newImages = await addImages(formData, type);

  if (type === Type.POST)
    return {
      title: rawFormData.title as string,
      date: new Date(Number(rawFormData.date), 1),
      text: rawFormData.text as string,
      images: newImages
        ? {
            create: newImages,
          }
        : undefined,
    };
  else {
    const isSculpture = type === Type.SCULPTURE;
    return {
      title: rawFormData.title as string,
      date: new Date(Number(rawFormData.date), 1),
      technique: rawFormData.technique as string,
      description: rawFormData.description as string,
      height: Number(rawFormData.height),
      width: Number(rawFormData.width),
      length: isSculpture ? Number(rawFormData.length) : undefined,
      isToSell: rawFormData.isToSell === "on",
      price: Number(rawFormData.price),
      category: getCategory(formData),
      imageFilename:
        !isSculpture && newImages ? newImages[0].filename : undefined,
      imageWidth: !isSculpture && newImages ? newImages[0].width : undefined,
      imageHeight: !isSculpture && newImages ? newImages[0].height : undefined,
      images:
        isSculpture && newImages
          ? {
              create: newImages,
            }
          : undefined,
    };
  }
};

type FileInfo = {
  filename: string;
  width: number;
  height: number;
  isMain: boolean;
};

const addImages = async (
  formData: FormData,
  type: Type,
): Promise<FileInfo[] | null> => {
  const tab: FileInfo[] = [];
  const title = formData.get("title") as string;
  const file = formData.get("file") as File;
  const files = formData.getAll("files") as File[];
  const dir = getDir(type);

  if (file && file.size > 0) {
    tab.push(
      <FileInfo>await resizeAndSaveImage(file, title, dir, type === Type.POST),
    );
  }
  if (files.length > 0) {
    for await (const file of files) {
      if (file.size > 0) {
        tab.push(<FileInfo>await resizeAndSaveImage(file, title, dir));
      }
    }
  }
  return tab.length > 0 ? tab : null;
};

const getCategory = (formData: FormData) => {
  const id = Number(formData.get("categoryId"));
  const oldId = Number(formData.get("oldCategoryId"));

  return id !== 0
    ? {
        connect: {
          id,
        },
      }
    : oldId
      ? {
          disconnect: {
            id: oldId,
          },
        }
      : {};
};
