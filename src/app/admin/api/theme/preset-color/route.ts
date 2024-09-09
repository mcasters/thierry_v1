import { getServerSession } from "next-auth/next";

import prisma from "@/lib/db/prisma";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";
import { getBasePresetColorData } from "@/utils/commonUtils";
import { PresetColor } from "@prisma/client";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      let res: PresetColor[];
      res = await prisma.presetColor.findMany();

      if (res.length === 0) {
        const defaultPresetColor = await prisma.presetColor.create({
          data: {
            ...getBasePresetColorData(),
          },
        });
        res.push(defaultPresetColor);
      }
      return NextResponse.json(JSON.parse(JSON.stringify(res)));
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
