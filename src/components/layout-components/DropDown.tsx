import { cloneElement, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { MENU_1 } from '@/constants/routes';
import s from '@/styles/DropDown.module.css';

interface Props {
  menuItems: [{ name: string; path: string }];
  name: string;
  isActive: boolean;
}
export default function Dropdown({ menuItems, name, isActive }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
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
                href={`${menuItem.path}`}
                className={s.link}
                legacyBehavior={false}
              >
                {menuItem.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
