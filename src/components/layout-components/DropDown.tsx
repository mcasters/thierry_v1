import { useState } from 'react';
import Link from 'next/link';

import s from '@/styles/Nav_1.module.css';
import { PaintingCategory, SculptureCategory } from '@prisma/client';

interface Props {
  menuItems: PaintingCategory[] | SculptureCategory[];
  path: string;
  name: string;
  isActive: boolean;
}
export default function Dropdown({ menuItems, path, name, isActive }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <li className={s.dropdown}>
      <button
        onClick={handleOpen}
        className={
          isActive ? `${s.link} ${s.active} buttonLink` : `${s.link} buttonLink`
        }
      >
        {name}
      </button>
      {open ? (
        <ul className={s.menu}>
          {menuItems.map((menuItem, index) => (
            <li key={index}>
              <Link
                href={`${path}/${menuItem.key}`}
                legacyBehavior={false}
                onClick={(e) => {
                  setOpen(false);
                }}
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
