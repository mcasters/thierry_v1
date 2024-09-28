import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (session) {
    try {
      const id = Number(params.id);

      await prisma.paintingCategory.delete({
        where: { id },
      });

      return NextResponse.json({ message: "ok" });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
