import prisma from '@/lib/prisma'
import { Theme } from '@prisma/client'
import 'server-only'
import { getDefaultTheme } from '@/utils/commonUtils'

export async function getTheme(): Promise<Theme> {
    const theme = await prisma.theme.findFirst()
    return !theme ? getDefaultTheme() : theme
    // return JSON.parse(JSON.stringify(res));
}
