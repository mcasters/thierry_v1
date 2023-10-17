'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { ROUTES } from '@/constants/routes'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import { PaintingCategory, SculptureCategory } from '@prisma/client'
import s from '@/styles/Layout.module.css'

interface Props {
    introduction?: string
    paintingCategories: PaintingCategory[]
    sculptureCategories: SculptureCategory[]
    children: ReactNode
}

export default function Layout({
    introduction,
    paintingCategories,
    sculptureCategories,
    children,
}: Props) {
    const pathname = usePathname()
    const isHome = pathname === ROUTES.HOME

    return (
        <div className={s.wrapper}>
            <div className={s.line}></div>
            {isHome && <div className={s.gradient}></div>}
            <Header
                isHome={isHome}
                introduction={introduction}
                title="Thierry Casters"
                paintingCategories={paintingCategories}
                sculptureCategories={sculptureCategories}
            />
            <Main isHome={isHome}>{children}</Main>
            <Footer />
        </div>
    )
}
