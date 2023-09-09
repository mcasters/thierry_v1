import Link from 'next/link';

import s from '@/styles/Footer.module.css';
import AuthStatus from '@/components/auth/auth-status';

export default function Footer() {
  const authStatus = AuthStatus();
  return (
    <>
      <footer className={s.footer}>
        <Link href="/policy">Politique de confidentialité</Link>
        {authStatus}
      </footer>
    </>
  );
}
