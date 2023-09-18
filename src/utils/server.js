import { mkdir, stat, rm } from 'fs';
import sharp from 'sharp';
import { join } from 'path';

const serverLibraryPath = process.env.PHOTOS_PATH;

export const getPaintingImagePath = (painting) => {
  return join(
    `${serverLibraryPath}`,
    `${painting.type}`,
    `${painting.image.filename}`,
  );
};

export const getPaintingDir = () => {
  return join(`${serverLibraryPath}`, 'peinture');
};

export const getMiscellaneousDir = () => {
  return join(`${serverLibraryPath}`, 'miscellaneous');
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

export const resizeAndSaveImage = async (file, dir) => {
  const px = 2000;
  const image = sharp(file.filepath);

  return image
    .resize(px, px, {
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
    .toFile(`${dir}/${file.newFilename}.webp`);
};

export const deleteAllFiles = (dir) => {
  rm(dir, { recursive: true }, (err) => {
    if (err) return false;
  });
  return true;
};

export const deleteFile = (path) => {
  rm(path, (err) => {
    if (err) return false;
  });
  return true;
};
