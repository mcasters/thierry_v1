import prisma from "@/lib/prisma";
import { Theme } from "@prisma/client";
import "server-only";
import { getDefaultPresetColor, getDefaultTheme } from "@/utils/commonUtils";
import { ThemeFull } from "@/app/api/theme/theme";

export async function getTheme(): Promise<Theme> {
  let theme = await prisma.theme.findFirst();
  if (!theme) {
    theme = await prisma.theme.create({
      data: {
        ...getDefaultTheme(),
        presetColors: {
          create: getDefaultPresetColor(),
        },
      },
    });
  }
  return JSON.parse(JSON.stringify(theme));
}

export async function getThemeFull(): Promise<ThemeFull> {
  let theme = await prisma.theme.findFirst({
    include: { presetColors: true },
  });
  if (!theme) {
    theme = await prisma.theme.create({
      data: {
        ...getDefaultTheme(),
        presetColors: {
          create: getDefaultPresetColor(),
        },
      },
      include: {
        presetColors: true,
      },
    });
  }
  return JSON.parse(JSON.stringify(theme));
}
