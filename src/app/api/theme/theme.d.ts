import { Prisma } from '@prisma/client'

const ThemeFull = Prisma.validator<Prisma.ThemeDefaultArgs>()({
    include: {
        presetColors: {
            select: {
                id: true,
                color: true,
                name: true,
                themeId: true,
            },
        },
    },
})

export type ThemeFull = Prisma.ThemeGetPayload<typeof ThemeFull>

const PresetColorLight = Prisma.validator<Prisma.PresetColorDefaultArgs>()({
    select: { color: true, name: true },
})

export type PresetColorLight = Prisma.PresetColorGetPayload<
    typeof PresetColorLight
>
