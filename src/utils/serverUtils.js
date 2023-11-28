import { mkdir, stat, unlinkSync } from "fs";
import sharp from "sharp";
import { join, parse } from "path";
import { IMAGE } from "@/constants/image";

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
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const image = sharp(buffer);
  const filename = `${parse(file.name).name}-${Date.now()}.jpeg`;
  const sharpStream = sharp({ failOn: "none" });
  let imageWidth, imageHeight;

  const promises = [];

  promises.push(
    sharpStream
      .clone()
      .resize(2000, 1200, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .on("info", function (info) {
        imageWidth = info.width;
        imageHeight = info.height;
      })
      .withMetadata({
        exif: {
          IFD0: {
            Copyright: "Thierry Casters",
          },
        },
      })
      .jpeg({ quality: 80 })
      .toFile(`${dir}/${filename}`),
  );

  promises.push(
    sharpStream
      .clone()
      .resize(IMAGE.MD_PX)
      .withMetadata({
        exif: {
          IFD0: {
            Copyright: "Thierry Casters",
          },
        },
      })
      .jpeg({ quality: 80 })
      .toFile(`${dir}/md/${filename}`),
  );

  promises.push(
    sharpStream
      .clone()
      .resize(IMAGE.SM_PX)
      .withMetadata({
        exif: {
          IFD0: {
            Copyright: "Thierry Casters",
          },
        },
      })
      .jpeg({ quality: 80 })
      .toFile(`${dir}/sm/${filename}`),
  );

  image.pipe(sharpStream);

  return Promise.all(promises)
    .then((res) => {
      const info = res[0];
      return { filename, width: info.width, height: info.height };
    })
    .catch((err) => {
      console.error("Error processing files, let's clean it up", err);
      try {
        unlinkSync(`${dir}/sm/${filename}`);
        unlinkSync(`${dir}/md/${filename}`);
        unlinkSync(`${dir}/${filename}`);
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
