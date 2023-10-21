'use client'

import Link from 'next/link'
import Image from 'next/image'

import { MENU_2 } from '@/constants/routes'
import { usePathname } from 'next/navigation'
import s from '@/styles/Nav_2.module.css'
import { useTheme } from '@/app/context/themeProvider'

interface Props {
    isHome: boolean
    isFix: boolean
}

export default function Nav_2({ isHome, isFix }: Props) {
    const pathname = usePathname()
    const theme = useTheme()
    const isPainting = pathname.split('/')[1] === 'peintures'
    const isSculpture = pathname.split('/')[1] === 'sculptures'
    const isItem = isPainting || isSculpture
    const backgroundColor = isItem
        ? theme.menu2ItemColor
        : !isHome
        ? theme.menu2Color
        : isFix
        ? theme.menu2HomeColor
        : undefined

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
                {MENU_2.map((menuItem) => {
                    if (menuItem.NAME === 'Home')
                        return (
                            <li key={menuItem.NAME} className={s.liHome}>
                                <Link
                                    href={menuItem.PATH}
                                    key={menuItem.NAME}
                                    legacyBehavior={false}
                                >
                                    <Image
                                        src="/logo-100.png"
                                        alt="Signature de Thierry Casters"
                                        width={35}
                                        height={35}
                                        className={s.logo}
                                        style={{
                                            objectFit: 'contain',
                                        }}
                                        priority
                                    />
                                </Link>
                            </li>
                        )
                    return (
                        <li key={menuItem.NAME}>
                            <Link
                                href={menuItem.PATH}
                                key={menuItem.NAME}
                                legacyBehavior={false}
                                className={s.link}
                            >
                                {menuItem.NAME}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <style jsx>{`
                .homeNavFix .link {
                    color: ${theme.menu2LinkHomeColor};
                }
                .nav .link {
                    color: ${theme.menu2LinkColor};
                }
                .homeNavFix .link:hover {
                    color: ${theme.menu2LinkHomeHoverColor};
                }
                .nav .link:hover {
                    color: ${theme.menu2LinkHoverColor};
                }
                .itemNav .link {
                    color: ${theme.menu2LinkItemColor};
                }
                .itemNav .link:hover {
                    color: ${theme.menu2LinkHoverItemColor};
                }
            `}</style>
        </nav>
    )
}
