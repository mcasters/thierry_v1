import { getServerSession } from 'next-auth/next'

import prisma from '@/lib/prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

export async function GET(
    req: Request,
    { params }: { params: { name: string } }
) {
    const session = await getServerSession(authOptions)

    if (session) {
        try {
            const name = params.name
            await prisma.presetColor.delete({
                where: { name },
            })
            return NextResponse.json({ message: 'ok' }, { status: 200 })
        } catch (e) {
            console.log(e)
            return NextResponse.json({ error: 'Error' }, { status: 404 })
        }
    } else {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
}
