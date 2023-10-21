'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PaintingCategory, SculptureCategory } from '@prisma/client'
import { MENU_1, ROUTES } from '@/constants/routes'
import Dropdown from '@/components/layout-components/DropDown'
import s from '@/styles/Nav_1.module.css'
import { useTheme } from '@/app/context/themeProvider'

interface Props {
    isHome: boolean
    isFix: boolean
    paintingCategories: PaintingCategory[]
    sculptureCategories: SculptureCategory[]
}

export default function Nav_1({
    isFix,
    isHome,
    paintingCategories,
    sculptureCategories,
}: Props) {
    const pathname = usePathname()
    const theme = useTheme()
    const isPainting = pathname.split('/')[1] === 'peintures'
    const isSculpture = pathname.split('/')[1] === 'sculptures'
    const isItem = isPainting || isSculpture
    const backgroundColor = isItem
        ? theme.menu1ItemColor
        : !isHome
        ? theme.menu1Color
        : isFix
        ? theme.menu1HomeColor
        : undefined
    const nav = isFix ? 'homeNavFix' : 'homeNav'

    return (
        <nav
            className={
                isItem
                    ? s.itemNav
                    : isHome && !isFix
                    ? s.homeNav
                    : isHome && isFix
                    ? s.homeNavFix
                    : s.nav
            }
            style={{ backgroundColor }}
        >
            <ul className={s.menu}>
                {MENU_1.map((menuItem) => {
                    if (
                        menuItem.PATH === ROUTES.PAINTING &&
                        paintingCategories.length > 0
                    ) {
                        return (
                            <Dropdown
                                key={menuItem.NAME}
                                menuItems={paintingCategories}
                                path={menuItem.PATH}
                                name={menuItem.NAME}
                                isActive={isPainting}
                            />
                        )
                    } else if (
                        menuItem.PATH === ROUTES.SCULPTURE &&
                        sculptureCategories.length > 0
                    ) {
                        return (
                            <Dropdown
                                key={menuItem.NAME}
                                menuItems={sculptureCategories}
                                path={menuItem.PATH}
                                name={menuItem.NAME}
                                isActive={isSculpture}
                            />
                        )
                    }
                    const isActive = pathname === menuItem.PATH
                    return (
                        <li key={menuItem.NAME}>
                            <Link
                                href={menuItem.PATH}
                                key={menuItem.NAME}
                                className={
                                    isActive
                                        ? `${s.link} ${s.active}`
                                        : `${s.link}`
                                }
                                legacyBehavior={false}
                            >
                                {menuItem.NAME}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <style jsx>{`
                .homeNavFix .link {
                    color: ${theme.menu1LinkHomeColor};
                }
                .nav .link {
                    color: ${theme.menu1LinkColor};
                }
                .homeNavFix .link:hover {
                    color: ${theme.menu1LinkHomeHoverColor};
                }
                .nav .link:hover {
                    color: ${theme.menu1LinkHoverColor};
                }
                .nav .link.active {
                    border-bottom-color: ${theme.menu1LinkHoverColor};
                }
                .itemNav .link {
                    color: ${theme.menu1LinkItemColor};
                }
                .itemNav .link:hover {
                    color: ${theme.menu1LinkHoverItemColor};
                }
                .itemNav .link.active {
                    color: ${theme.menu1LinkHoverItemColor};
                    border-bottom-color: ${theme.menu1LinkHoverItemColor};
                }
            `}</style>
        </nav>
    )
}
