import Link from 'next/link';

import s from '@/styles/Footer.module.css';
import AuthStatus from '@/components/auth/AuthStatus';

export default function Footer() {
  const authStatus = AuthStatus();
  return (
    <>
      <footer className={s.footer}>
        <div className={s.center}>
          <Link href="/policy">Politique de confidentialité</Link>
          {authStatus}
        </div>
      </footer>
    </>
  );
}
