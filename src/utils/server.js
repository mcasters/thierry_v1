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

export const resizeAndSaveImage = async (file, dir, largeWidth) => {
  const image = sharp(file.filepath);

  if (largeWidth !== undefined) {
    return image
      .resize(largeWidth, null, {
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
      .toFile(`${dir}/${file.newFilename}.webp`);
  } else {
    const px = 2000;
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
      .webp()
      .toFile(`${dir}/${file.newFilename}.webp`);
  }
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
