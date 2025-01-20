import { Theme } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { getBaseThemeData } from "@/utils/commonUtils";
import { THEME } from "@/constants/admin";

export const getActivatedBaseTheme = async (): Promise<Theme> => {
  let theme = await prisma.theme.findUnique({
    where: {
      name: THEME.BASE_THEME,
    },
  });

  if (!theme) {
    theme = await prisma.theme.create({
      data: {
        ...getBaseThemeData(),
      },
    });
  }

  if (!theme.isActive) {
    await activate(theme.id);
  }

  return theme;
};

export const activate = async (themeId: number): Promise<void> => {
  await prisma.theme.update({
    where: {
      id: themeId,
    },
    data: {
      isActive: true,
    },
  });

  await prisma.theme.updateMany({
    where: {
      isActive: true,
      id: { not: themeId },
    },
    data: {
      isActive: false,
    },
  });
};

type StringKeys<T> = {
  [k in keyof T]: T[k] extends string ? k : never;
}[keyof T];

export type OnlyString<T> = { [k in StringKeys<T>]: boolean };
