import prisma from "@/lib/db/prisma";
import { deleteFile, getPaintingDir } from "@/utils/serverUtils";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (session) {
    const dir = getPaintingDir();
    try {
      const id = Number(params.id);
      const painting = await prisma.painting.findUnique({
        where: { id },
      });
      if (painting) {
        const filename = painting.imageFilename;
        deleteFile(dir, filename);
        await prisma.painting.delete({
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
