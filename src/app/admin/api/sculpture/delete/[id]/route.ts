import prisma from "@/lib/db/prisma";
import { deleteFile, getSculptureDir } from "@/utils/serverUtils";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (session) {
    const dir = getSculptureDir();
    try {
      const id = Number(params.id);
      const sculpture = await prisma.sculpture.findUnique({
        where: { id },
        include: {
          images: {
            select: {
              filename: true,
            },
          },
        },
      });
      if (sculpture) {
        for (const image of sculpture.images) {
          deleteFile(dir, image.filename);
          await prisma.sculptureImage.delete({
            where: {
              filename: image.filename,
            },
          });
        }
        await prisma.sculpture.delete({
          where: {
            id,
          },
        });
      }

      return NextResponse.json({ message: "ok" });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
