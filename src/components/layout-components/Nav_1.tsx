'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { MENU_1, ROUTES } from '@/constants/routes';
import s from '@/styles/Nav_1.module.css';
import Dropdown from '@/components/layout-components/DropDown';

interface Props {
  isHome: boolean;
  isFix: boolean;
}

const categories = [
  { name: 'catégorie 1', path: '/peinture/categorie_1' },
  { name: 'catégorie 2', path: '/peinture/categorie_2' },
  { name: 'catégorie 3', path: '/peinture/categorie_3' },
];
export default function Nav_1({ isFix, isHome }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <nav
      className={
        !isHome
          ? `${s.nav}`
          : isFix
          ? `${s.homeNav} ${s.sticky}`
          : `${s.homeNav}`
      }
    >
      <ul>
        {MENU_1.map((item) => {
          const isSubPageActive = pathname === `${item.PATH}/[category]`;
          const isActive = pathname === item.PATH || isSubPageActive;
          if (item.PATH === ROUTES.SCULPTURE || item.PATH === ROUTES.PAINTING) {
            return (
              <Dropdown
                key={item.PATH}
                menuItems={categories}
                type="painting"
                isActive={isActive}
              />
            );
          } else {
            return (
              <li key={item.NAME}>
                <Link
                  href={item.PATH}
                  key={item.NAME}
                  className={isActive ? `${s.link} ${s.active}` : `${s.link}`}
                  legacyBehavior={false}
                >
                  {item.NAME}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
}
