import { Theme } from "@prisma/client";
import prisma from "@/lib/prisma";
import { THEME } from "@/constants/database";
import { getDefaultThemeData } from "@/utils/commonUtils";

export const resetDefaultTheme = async (): Promise<Theme> => {
  let defaultTheme = await prisma.theme.findUnique({
    where: {
      name: THEME.DEFAULT,
    },
  });

  if (!defaultTheme) {
    defaultTheme = await prisma.theme.create({
      data: {
        ...getDefaultThemeData(),
      },
    });
  } else {
    defaultTheme = await prisma.theme.update({
      where: {
        id: defaultTheme.id,
      },
      data: {
        ...getDefaultThemeData(),
      },
    });
  }
  return defaultTheme;
};

export const getActivatedDefaultTheme = async (): Promise<Theme> => {
  let theme = await prisma.theme.findUnique({
    where: {
      name: THEME.DEFAULT,
    },
  });

  if (!theme) {
    theme = await prisma.theme.create({
      data: {
        ...getDefaultThemeData(),
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

export const setInactiveExcept = async (idToExcept: number): Promise<void> => {
  await prisma.theme.updateMany({
    where: {
      isActive: true,
      id: { not: idToExcept },
    },
    data: {
      isActive: false,
    },
  });
};
