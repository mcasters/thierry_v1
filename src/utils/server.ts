import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { mkdir, stat, rm, rename } from "fs";
import sharp from "sharp";
import { getDirnameFromNameOrTitle } from "@/utils/commonUtils";
import { join } from "path";

const serverLibraryPath = process.env.PHOTOS_PATH;

export const parseFormData = async (
  req: NextApiRequest & { files?: any },
  res: NextApiResponse
) => {
  const storage = multer.memoryStorage();
  const multerUpload = multer({ storage });
  const multerFiles = multerUpload.any();
  await new Promise((resolve, reject) => {
    multerFiles(req as any, res as any, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
  return {
    fields: req.body,
    files: req.files,
  };
};

export const getActuPath = (title: string) => {
  const dirName = getDirnameFromNameOrTitle(title);
  return join(`${serverLibraryPath}`, "actu", `${dirName}`);
};

export const getHorsePath = (name: string) => {
  const dirName = getDirnameFromNameOrTitle(name);
  return join(`${serverLibraryPath}`, "chevaux", `${dirName}`);
};

export const createDir = (dir: string) => {
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

export const renameDir = (oldPath: string, newPath: string) => {
  rename(oldPath, newPath, (err) => {
    throw err;
  });
};

export const resizeAndSaveImage = async (file: Buffer, filepath: string) => {
  const px = 400;
  // const bufferFile = Buffer.from(await file.arrayBuffer());
  const image = sharp(file);

  return image
    .resize(px, px, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .withMetadata({
      exif: {
        IFD0: {
          Copyright: "Alizée Roussel",
        },
      },
    })
    .toFormat("jpeg")
    .toFile(filepath);
};

export const deleteAllFiles = (dir: string) => {
  rm(dir, { recursive: true }, (err) => {
    if (err) return false;
  });
  return true;
};

export const deleteFile = (path: string) => {
  rm(path, (err) => {
    if (err) return false;
  });
  return true;
};
