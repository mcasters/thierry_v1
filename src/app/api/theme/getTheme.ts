import prisma from '@/lib/prisma'
import { Theme } from '@prisma/client'
import 'server-only'
import { getDefaultTheme } from '@/utils/commonUtils'
import { ThemeFull } from '@/app/api/theme/theme'

export async function getTheme(): Promise<Theme> {
    const theme = await prisma.theme.findFirst()
    return !theme ? getDefaultTheme() : theme
    // return JSON.parse(JSON.stringify(res));
}

export async function getThemeFull(): Promise<ThemeFull> {
    const theme = await prisma.theme.findFirst({
        include: { presetColors: true },
    })
    const res = !theme ? getDefaultTheme() : theme
    return JSON.parse(JSON.stringify(res))
}
