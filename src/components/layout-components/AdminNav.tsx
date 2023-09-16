import Link from 'next/link';

import AuthStatus from '@/components/auth/AuthStatus';
import s from '@/styles/AdminNav.module.css';

export default function AdminNav() {
  const authStatus = AuthStatus();
  return (
    <nav className={s.nav}>
      <span>Administration</span>
      <ul className={s.navItems}>
        <li className={s.navItem}>
          <Link href="/admin/actualites">Actualités</Link>
        </li>
        <li className={s.navItem}>
          <Link href="/admin/peintures">Peinture</Link>
        </li>
        <li className={s.navItem}>
          <Link href="/admin/sculptures">Sculpture</Link>
        </li>
        <li className={s.navItem}>
          <Link href="/admin/home">Home</Link>
        </li>
      </ul>
      <div className={s.authStatus}>{authStatus}</div>
    </nav>
  );
}
