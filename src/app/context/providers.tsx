'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { ReactNode } from 'react'
import { Session } from 'next-auth'
import { ThemeProvider } from '@/app/context/themeProvider'

interface Props {
    session: Session | null
    children: ReactNode
}

export default function Providers({ children, session }: Props) {
    return (
        <SessionProvider session={session}>
            <ThemeProvider>
                <Toaster />
                {children}
            </ThemeProvider>
        </SessionProvider>
    )
}
