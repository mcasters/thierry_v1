import { useState } from 'react';
import Link from 'next/link';

import { PaintingCategory, SculptureCategory } from '@prisma/client';
import s from '@/styles/Nav_1.module.css';

interface Props {
  menuItems: PaintingCategory[] | SculptureCategory[];
  path: string;
  name: string;
  isActive: boolean;
}
export default function Dropdown({ menuItems, path, name, isActive }: Props) {
  const [open, setOpen] = useState(false);

  const toggle = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const openMenu = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const closeMenu = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <li className={s.dropdown}>
      <button
        onClick={toggle}
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        className={
          isActive ? `${s.link} ${s.active} buttonLink` : `${s.link} buttonLink`
        }
      >
        {name}
      </button>
      {open ? (
        <ul
          className={s.subMenu}
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          {menuItems.map((menuItem, index) => (
            <li key={index}>
              <Link
                href={`${path}/${menuItem.key}`}
                legacyBehavior={false}
                onClick={(e) => {
                  setOpen(false);
                }}
                className={s.subLink}
              >
                {menuItem.value}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
