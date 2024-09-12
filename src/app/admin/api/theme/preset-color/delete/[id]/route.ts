import { getServerSession } from "next-auth/next";

import prisma from "@/lib/db/prisma";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";
import { OnlyString } from "@/app/api/theme/theme";
import { Theme } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const id = parseInt(params.id);
      const presetColor = await prisma.presetColor.findUnique({
        where: {
          id,
        },
      });

      if (presetColor) {
        const themes = await prisma.theme.findMany();
        const themesToUpdate: Theme[] = [];

        themes.forEach((t) => {
          Object.entries(t).forEach(([key, value]) => {
            if (typeof value === "string" && value === presetColor.name) {
              t[key as keyof OnlyString<Theme>] = presetColor.color;
              themesToUpdate.push(t);
            }
          });
        });

        for await (const theme of themesToUpdate) {
          const { id, ...data } = theme;
          await prisma.theme.update({
            where: {
              id,
            },
            data: {
              ...data,
            },
          });
        }

        await prisma.presetColor.delete({
          where: { id },
        });

        const updatedThemes = await prisma.theme.findMany();
        const updatedPresetColors = await prisma.presetColor.findMany();

        return NextResponse.json({
          updatedThemes: JSON.parse(JSON.stringify(updatedThemes)),
          updatedPresetColors: JSON.parse(JSON.stringify(updatedPresetColors)),
        });
      }
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
