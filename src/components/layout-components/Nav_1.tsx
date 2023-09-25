'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MENU_1, ROUTES } from '@/constants/routes';
import s from '@/styles/Nav_1.module.css';
import Dropdown from '@/components/layout-components/DropDown';
import { PaintingCategory, SculptureCategory } from '@prisma/client';

interface Props {
  isHome: boolean;
  isFix: boolean;
  paintingCategories: PaintingCategory[];
  sculptureCategories: SculptureCategory[];
}

export default function Nav_1({
  isFix,
  isHome,
  paintingCategories,
  sculptureCategories,
}: Props) {
  const pathname = usePathname();

  console.log(paintingCategories);

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
        {MENU_1.map((menuItem) => {
          let isActive = pathname === menuItem.PATH;
          if (
            menuItem.PATH === ROUTES.PAINTING &&
            paintingCategories.length > 0
          ) {
            isActive = pathname.split('/')[1] === 'peintures';
            return (
              <Dropdown
                key={menuItem.NAME}
                menuItems={paintingCategories}
                path={menuItem.PATH}
                name={menuItem.NAME}
                isActive={isActive}
              />
            );
          } else if (
            menuItem.PATH === ROUTES.SCULPTURE &&
            sculptureCategories.length > 0
          ) {
            isActive = pathname.split('/')[1] === 'sculptures';
            return (
              <Dropdown
                key={menuItem.NAME}
                menuItems={sculptureCategories}
                path={menuItem.PATH}
                name={menuItem.NAME}
                isActive={isActive}
              />
            );
          }
          return (
            <li key={menuItem.NAME}>
              <Link
                href={menuItem.PATH}
                key={menuItem.NAME}
                className={isActive ? `${s.link} ${s.active}` : `${s.link}`}
                legacyBehavior={false}
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
