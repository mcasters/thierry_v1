import { parse } from "date-fns";
import { NextResponse } from "next/server";
import {
  createDirIfNecessary,
  getPaintingDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/db/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();

  if (session) {
    try {
      const dir = getPaintingDir();
      createDirIfNecessary(dir);
      const formData = await req.formData();
      const file = formData.get("file");
      const fileInfo = await resizeAndSaveImage(file, dir);
      if (fileInfo) {
        const newPainting = await prisma.painting.create({
          data: {
            title: formData.get("title") as string,
            date: parse(formData.get("date") as string, "yyyy", new Date()),
            technique: formData.get("technique") as string,
            description: formData.get("description") as string,
            height: Number(formData.get("height")),
            width: Number(formData.get("width")),
            isToSell: formData.get("isToSell") === "true",
            price: Number(formData.get("price")),
            imageFilename: fileInfo.filename,
            imageWidth: fileInfo.width,
            imageHeight: fileInfo.height,
            category:
              formData.get("categoryId") === ""
                ? {}
                : {
                    connect: {
                      id: Number(formData.get("categoryId")),
                    },
                  },
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
