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

type StringKeys<T> = {
  [k in keyof T]: T[k] extends string ? k : never;
}[keyof T];

export type OnlyString<T> = { [k in StringKeys<T>]: boolean };
