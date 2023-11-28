import { parse } from "date-fns";
import { getServerSession } from "next-auth/next";

import {
  deleteFile,
  getPaintingDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const dir = getPaintingDir();

      const formData = await req.formData();
      const id = Number(formData.get("id"));
      const oldPaint = await prisma.painting.findUnique({
        where: { id },
        include: {
          image: {
            select: {
              filename: true,
            },
          },
        },
      });

      if (oldPaint) {
        let fileInfo = null;
        let image = {};
        const newFile = formData.get("file") as File;
        if (newFile.size !== 0) {
          deleteFile(dir, oldPaint.image.filename);
          fileInfo = await resizeAndSaveImage(newFile, dir);
          if (fileInfo) {
            image = {
              create: {
                filename: fileInfo.filename,
                width: fileInfo.width,
                height: fileInfo.height,
              },
            };
          }
        }

        const category =
          formData.get("categoryId") !== ""
            ? {
                connect: {
                  id: Number(formData.get("categoryId")),
                },
              }
            : oldPaint.categoryId !== null
            ? {
                disconnect: {
                  id: oldPaint.categoryId,
                },
              }
            : {};

        await prisma.painting.update({
          where: { id: id },
          data: {
            title: formData.get("title") as string,
            date: parse(formData.get("date") as string, "yyyy", new Date()),
            technique: formData.get("technique") as string,
            description: formData.get("description") as string,
            height: Number(formData.get("height")),
            width: Number(formData.get("width")),
            isToSell: formData.get("isToSell") === "true",
            price: Number(formData.get("price")),
            category,
            image,
          },
        });
      }
      return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
