import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";
import { getDefaultThemeData } from "@/utils/commonUtils";
import { THEME } from "@/constants/database";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const defaultTheme = await prisma.theme.findUnique({
        where: {
          name: THEME.DEFAULT,
        },
      });

      if (!defaultTheme) {
        await prisma.theme.create({
          data: {
            ...getDefaultThemeData(),
          },
        });
      } else {
        await prisma.theme.update({
          where: {
            id: defaultTheme.id,
          },
          data: {
            ...getDefaultThemeData(),
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
