import { mkdir, stat, unlinkSync } from "fs";
import sharp from "sharp";
import { join } from "path";
import { IMAGE } from "@/constants/image";
import { transformValueToKey } from "@/utils/commonUtils";

const serverLibraryPath = process.env.PHOTOS_PATH;

export const getPaintingDir = () => {
  return join(`${serverLibraryPath}`, "peinture");
};

export const getSculptureDir = () => {
  return join(`${serverLibraryPath}`, "sculpture");
};

export const getMiscellaneousDir = () => {
  return join(`${serverLibraryPath}`, "miscellaneous");
};

export const getPostDir = () => {
  return join(`${serverLibraryPath}`, "post");
};

export const createDirIfNecessary = (dir) => {
  stat(dir, (err) => {
    if (err?.code === "ENOENT")
      mkdir(dir, { recursive: true }, (err) => {
        throw err;
      });
    else {
      throw err;
    }
  });
};

export const resizeAndSaveImage = async (file, dir) => {
  const filename = transformValueToKey(file.name);
  const newFilename = `${filename}_${Date.now()}.jpeg`;
  const maxSize = 130000;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const constraintImage = async (buffer, quality = 90, drop = 5) => {
    const done = await sharp(buffer)
      .jpeg({
        quality: Math.trunc(quality),
      })
      .toBuffer();
    if (done.byteLength > maxSize) {
      return constraintImage(buffer, quality - drop);
    }
    return done;
  };

  const imageBuffer = await sharp(buffer)
    .resize(2000, 1200, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .jpeg({ quality: 100 })
    .toBuffer();

  let lightImageBuffer = imageBuffer;
  if (imageBuffer.byteLength > maxSize)
    lightImageBuffer = await constraintImage(imageBuffer);

  const sharpStream = sharp({ failOn: "none" });
  const promises = [];

  promises.push(
    sharpStream
      .clone()
      .withMetadata({
        exif: {
          IFD0: {
            Copyright: "Thierry Casters",
          },
        },
      })
      .toFile(`${dir}/${newFilename}`),
  );

  promises.push(
    sharpStream
      .clone()
      .resize({
        width: IMAGE.MD_PX,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .withMetadata({
        exif: {
          IFD0: {
            Copyright: "Thierry Casters",
          },
        },
      })
      .toFile(`${dir}/md/${newFilename}`),
  );

  promises.push(
    sharpStream
      .clone()
      .resize({
        width: IMAGE.SM_PX,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .withMetadata({
        exif: {
          IFD0: {
            Copyright: "Thierry Casters",
          },
        },
      })
      .toFile(`${dir}/sm/${newFilename}`),
  );

  sharp(lightImageBuffer).pipe(sharpStream);

  return Promise.all(promises)
    .then((res) => {
      const info = res[0];
      return { filename: newFilename, width: info.width, height: info.height };
    })
    .catch((err) => {
      console.error(
        "Erreur à l'écriture des fichiers images, nettoyage...",
        err,
      );
      try {
        unlinkSync(`${dir}/sm/${newFilename}`);
        unlinkSync(`${dir}/md/${newFilename}`);
        unlinkSync(`${dir}/${newFilename}`);
      } catch (e) {}
    });
};

export const deleteFile = (dir, filename) => {
  try {
    unlinkSync(`${dir}/sm/${filename}`);
    unlinkSync(`${dir}/md/${filename}`);
    unlinkSync(`${dir}/${filename}`);
    return true;
  } catch (e) {
    return false;
  }
};
