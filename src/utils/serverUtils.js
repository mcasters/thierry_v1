import { mkdir, rm, stat } from 'fs';
import sharp from 'sharp';
import { join, parse } from 'path';

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

export const resizeAndSaveImage = async (file, dir, largeWidth) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const image = sharp(buffer);
  const filename = `${parse(file.name).name}-${Date.now()}.webp`;

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
      .toFile(`${dir}/${filename}`)
      .then((info) => {
        return { filename, width: info.width, height: info.height };
      })
      .catch((err) => console.log(err));
  } else {
    return image
      .resize(2000, 1200, {
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
  }
};

export const getOptimizedImage = async (path, width) => {
  return await sharp(path, {
    sequentialRead: true,
  })
    .rotate()
    .resize(parseInt(width), undefined, {
      withoutEnlargement: true,
    })
    .toBuffer();
};

export const deleteFile = (path) => {
  rm(path, (err) => {
    if (err) return false;
  });
  return true;
};
