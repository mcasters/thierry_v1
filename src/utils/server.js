import { mkdir, rm, stat } from 'fs';
import sharp from 'sharp';
import { join, parse } from 'path';
import { transformValueToKey } from '@/utils/common';

const serverLibraryPath = process.env.PHOTOS_PATH;

export const getPaintingImagePath = (painting) => {
  return join(
    `${serverLibraryPath}`,
    `${painting.type}`,
    `${painting.image.filename}`,
  );
};

export const getSculptureImagePaths = (sculpture) => {
  let paths = [];
  sculpture.images.forEach((image) => {
    paths.push(
      join(`${serverLibraryPath}`, `${sculpture.type}`, `${image.filename}`),
    );
  });
  return paths;
};

export const getPaintingDir = () => {
  return join(`${serverLibraryPath}`, 'peinture');
};

export const getSculptureDir = () => {
  return join(`${serverLibraryPath}`, 'sculpture');
};

export const getMiscellaneousDir = () => {
  return join(`${serverLibraryPath}`, 'miscellaneous');
};

export const getPostDir = () => {
  return join(`${serverLibraryPath}`, 'post');
};

export const createDirIfNecessary = (dir) => {
  stat(dir, (err) => {
    if (err?.code === 'ENOENT')
      mkdir(dir, { recursive: true }, (err) => {
        throw err;
      });
    else {
      throw err;
    }
  });
};

export const resizeAndSaveImage = async (title, file, dir, px) => {
  const filename = `${transformValueToKey(title)}-${Date.now()}`;
  const _px = px !== undefined ? px : 2000;
  const buffer = Buffer.from(await file.arrayBuffer());
  const image = sharp(buffer, {
    sequentialRead: true,
  });

  return image
    .resize(_px, _px, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .withMetadata({
      exif: {
        IFD0: {
          Copyright: 'Thierry Casters',
        },
      },
    })
    .webp({ quality: 80 })
    .toFile(`${dir}/${filename}`)
    .then((info) => {
      return { filename, width: info.width, height: info.height };
    })
    .catch((err) => console.log(err));
};

export const deleteFile = (path) => {
  rm(path, (err) => {
    if (err) return false;
  });
  return true;
};
