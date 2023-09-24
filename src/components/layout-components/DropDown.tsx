import { cloneElement, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { MENU_1 } from '@/constants/routes';
import s from '@/styles/DropDown.module.css';

interface Props {
  trigger: boolean;
  menu: boolean;
}
export default function Dropdown({ trigger, menu }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <li className={s.dropdown}>
      {cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className={s.menu}>
          {menu.map((menuItem, index) => (
            <li key={index}>
              {cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
