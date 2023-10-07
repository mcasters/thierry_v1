'use client';

import Link from 'next/link';
import Image from 'next/legacy/image';

import { MENU_2 } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import s from '@/styles/Nav_2.module.css';

interface Props {
  isHome: boolean;
  isFix: boolean;
}

export default function Nav_2({ isHome, isFix }: Props) {
  const pathname = usePathname();
  const isPainting = pathname.split('/')[1] === 'peintures';
  const isSculpture = pathname.split('/')[1] === 'sculptures';

  return (
    <nav
      className={
        isPainting || isSculpture
          ? s.itemNav
          : !isHome
          ? s.nav
          : isFix
          ? `${s.homeNav} ${s.sticky}`
          : s.homeNav
      }
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
                  <img
                    src="/logo-100.png"
                    alt="Signature de Thierry Casters"
                    width={35}
                    height={35}
                    className={s.logo}
                  />
                </Link>
              </li>
            );
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
          );
        })}
      </ul>
    </nav>
  );
}
