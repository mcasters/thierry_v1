import Link from 'next/link';
import { useRouter } from 'next/router';

import { MENU_1, ROUTES } from '@/constants/routes';
import s from '@/styles/Nav_1.module.css';
import Dropdown from '@/components/layout-components/DropDown';
import { cloneElement, useState } from 'react';

interface Props {
  isHome: boolean;
  isFix: boolean;
}

const categories = ['catégorie 1', 'catégorie 2', 'catégorie 3'];
export default function Nav_1({ isFix, isHome }: Props) {
  const router = useRouter();
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
          const isSubPageActive = router.pathname === `${item.PATH}/[category]`;
          const isActive = router.pathname === item.PATH || isSubPageActive;
          if (item.PATH === ROUTES.SCULPTURE || item.PATH === ROUTES.PAINTING) {
            return (
              <li key={item.NAME} className={s.dropdown}>
                <button
                  onClick={handleOpen}
                  className={
                    isActive
                      ? `${s.link} ${s.active} buttonLink`
                      : `${s.link} buttonLink`
                  }
                >
                  {item.NAME}
                </button>
                {open ? (
                  <ul className={s.menu}>
                    {categories.map((category, index) => (
                      <li key={index}>
                        <Link
                          href={`${item.PATH}/${category}`}
                          key={category}
                          className={
                            isActive ? `${s.link} ${s.active}` : `${s.link}`
                          }
                          legacyBehavior={false}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
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
