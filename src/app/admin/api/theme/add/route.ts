import { getServerSession } from "next-auth/next";

import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const theme = await req.json();
      const { presetColors, id, ...rest } = theme;

      await prisma.theme.create({
        data: {
          ...rest,
          presetColors: {
            create: presetColors,
          },
        },
      });
      return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}