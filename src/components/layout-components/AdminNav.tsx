import Link from 'next/link';

import s from '@/styles/AdminNav.module.css';

export default function AdminNav() {
  return (
    <nav className={s.nav}>
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
    </nav>
  );
}
