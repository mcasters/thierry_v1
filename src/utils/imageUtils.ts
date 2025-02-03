import {
  ContentFull,
  Image,
  ItemFull,
  PhotoTab,
  PostFull,
  Type,
} from "@/lib/type";
import { TEXTS } from "@/constants/specific";
import { IMAGE } from "@/constants/image";
import { getSliders } from "@/utils/commonUtils";

const getPhotosFromImages = (
  images: Image[],
  folder: string,
  splitMain: boolean,
  title: string,
  date: Date = new Date(),
  alt: string = `Œuvre de ${TEXTS.TITLE}`,
): {
  mainPhotos: PhotoTab;
  photos: PhotoTab;
} => {
  const mainPhotos: PhotoTab = { sm: [], md: [], lg: [] };
  const photos: PhotoTab = { sm: [], md: [], lg: [] };

  for (const image of images) {
    const isUnderSM = image.width < IMAGE.SM_PX;
    const isUnderMD = image.width < IMAGE.MD_PX;
    const photosSM = {
      src: `/images/${folder}/sm/${image.filename}`,
      width: isUnderSM ? image.width : IMAGE.SM_PX,
      height: isUnderSM
        ? image.height
        : (image.height * IMAGE.SM_PX) / image.width,
      isMain: image.isMain,
      title,
      date,
      alt,
    };
    const photosMD = {
      src: `/images/${folder}/md/${image.filename}`,
      width: isUnderMD ? image.width : IMAGE.MD_PX,
      height: isUnderMD
        ? image.height
        : (image.height * IMAGE.MD_PX) / image.width,
      isMain: image.isMain,
      title,
      date,
      alt,
    };
    const photosLG = {
      src: `/images/${folder}/${image.filename}`,
      width: image.width,
      height: image.height,
      isMain: image.isMain,
      title,
      date,
      alt,
    };

    if (splitMain && image.isMain) {
      mainPhotos.sm.push(photosSM);
      mainPhotos.md.push(photosMD);
      mainPhotos.lg.push(photosLG);
    } else {
      photos.sm.push(photosSM);
      photos.md.push(photosMD);
      photos.lg.push(photosLG);
    }
  }
  return { mainPhotos, photos };
};
export const getSliderPhotoTab = (
  contents: ContentFull[],
): {
  mainPhotos: PhotoTab;
  photos: PhotoTab;
} => {
  const images: Image[] = getSliders(contents);
  return getPhotosFromImages(images, "miscellaneous", true, "");
};
export const getPhotoTab = (
  item: PostFull | ItemFull,
): {
  mainPhotos: PhotoTab;
  photos: PhotoTab;
} => {
  const isPost = item.type === Type.POST;
  const folder =
    item.type === Type.PAINTING
      ? "peinture"
      : item.type === Type.SCULPTURE
        ? "sculpture"
        : isPost
          ? "post"
          : "dessin";
  const alt = isPost
    ? `Photo du post "${item.title}" de ${TEXTS.TITLE}`
    : `${item.title} - ${item.type} de ${TEXTS.TITLE}`;
  return getPhotosFromImages(
    item.images,
    folder,
    isPost,
    item.title,
    item.date,
    alt,
  );
};
export const getSliderLandscapeImages = (contents: ContentFull[]): Image[] => {
  const images: Image[] = getSliders(contents);
  const tab: Image[] = [];
  images.forEach((i) => {
    if (!i.isMain) tab.push(i);
  });
  return tab;
};
export const getSliderPortraitImages = (contents: ContentFull[]): Image[] => {
  const images: Image[] = getSliders(contents);
  const tab: Image[] = [];
  images.forEach((i) => {
    if (i.isMain) tab.push(i);
  });
  return tab;
};
