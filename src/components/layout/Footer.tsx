import Link from 'next/link';

import s from '@/styles/Footer.module.css';

export default function Footer() {
  return (
    <>
      <footer className={s.footer}>
        <Link href="/policy">Politique de confidentialité</Link>
        <br />
        <br />
        <Link href="/admin">Administration du site</Link>
      </footer>
    </>
  );
}
