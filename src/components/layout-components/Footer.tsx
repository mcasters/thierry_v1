'use client';

import Link from 'next/link';

import AuthStatus from '@/components/auth/AuthStatus';
import s from '@/styles/Footer.module.css';

export default function Footer() {
  const authStatus = AuthStatus();
  return (
    <>
      <footer className={s.footer}>
        <div className={s.center}>
          <Link href="/policy">Politique de confidentialité</Link>
          <br />
          <br />
          {authStatus}
        </div>
      </footer>
    </>
  );
}
