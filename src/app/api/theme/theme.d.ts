import { Prisma } from "@prisma/client";

const ThemeLight = Prisma.validator<Prisma.ThemeDefaultArgs>()({
  omit: { id: true },
});
export type ThemeLight = Prisma.ThemeGetPayload<typeof ThemeLight>;

const PresetColorLight = Prisma.validator<Prisma.PresetColorDefaultArgs>()({
  select: { color: true, name: true },
});
export type PresetColorLight = Prisma.PresetColorGetPayload<
  typeof PresetColorLight
>;
