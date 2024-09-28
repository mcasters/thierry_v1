import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();

  if (session) {
    try {
      const id = parseInt(params.id);
      const activatedTheme = await prisma.theme.update({
        where: {
          id,
        },
        data: {
          isActive: true,
        },
      });
      await prisma.theme.updateMany({
        where: {
          isActive: true,
          id: { not: id },
        },
        data: {
          isActive: false,
        },
      });

      return NextResponse.json({
        activatedTheme: JSON.parse(JSON.stringify(activatedTheme)),
      });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
