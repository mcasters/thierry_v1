import Link from 'next/link';
import Image from 'next/image';

import { MENU_2 } from '@/constants/routes';
import s from '@/styles/Nav_2.module.css';

interface Props {
  isHome: boolean;
  isFix: boolean;
}

export default function Nav_2({ isHome, isFix }: Props) {
  const style = {
    backgroundImage: "url('/shadow.png')",
  };

  return (
    <nav
      className={isFix ? `${s.secondaryNav} ${s.sticky}` : `${s.secondaryNav}`}
    >
      <ul className={isHome ? `${s.menu} ${s.home}` : `${s.menu}`}>
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
                    src="/2.jpeg"
                    alt="Signature de Thierry Casters"
                    width="70px"
                    height="70px"
                    quality={100}
                    unoptimized={true}
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
      {!isHome && <div className={s.shadow} style={style} />}
    </nav>
  );
}
