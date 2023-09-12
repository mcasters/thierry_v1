import Link from 'next/link';
import { useRouter } from 'next/router';

import { MENU } from '@/constants/routes';
import LAYOUT from '@/constants/layout';
import s from '../../styles/Nav.module.css';

export default function Nav({ navRef, isFix }) {
  const router = useRouter();

  return (
    <nav ref={navRef} className={isFix ? `${s.nav} ${s.sticky}` : `${s.nav}`}>
      <ul>
        {MENU.map((item) => {
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
