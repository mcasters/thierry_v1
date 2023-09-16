import Link from 'next/link';

import AuthStatus from '@/components/auth/AuthStatus';
import s from '@/styles/AdminNav.module.css';
import { ADMIN_MENU } from '@/constants/routes';
import { router } from 'next/client';

export default function AdminNav() {
  const authStatus = AuthStatus();
  return (
    <nav className={s.nav}>
      <span>Administration</span>
      <ul className={s.navItems}>
        {ADMIN_MENU.map((item) => {
          const isActive = router.pathname === item.PATH;

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
      <div className={s.authStatus}>{authStatus}</div>
    </nav>
  );
}
