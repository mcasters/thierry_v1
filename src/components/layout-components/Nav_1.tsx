import Link from 'next/link';
import { useRouter } from 'next/router';

import { MENU_1 } from '@/constants/routes';
import s from '../../styles/Nav_1.module.css';

interface Props {
  isHome: boolean;
  isFix: boolean;
}
export default function Nav_1({ isFix, isHome }: Props) {
  const router = useRouter();

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
          const isSubPageActive = router.pathname === `${item.PATH}/[year]`;
          const isActive = router.pathname === item.PATH || isSubPageActive;

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
        })}
      </ul>
    </nav>
  );
}
