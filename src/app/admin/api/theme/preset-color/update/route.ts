import { getServerSession } from "next-auth/next";

import prisma from "@/lib/db/prisma";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const presetColor = await req.json();
      const dbPresetColor = await prisma.presetColor.update({
        where: {
          id: presetColor.id,
        },
        data: {
          color: presetColor.color,
        },
      });
      return NextResponse.json({
        data: JSON.parse(JSON.stringify(dbPresetColor)),
      });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
