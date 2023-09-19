import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/routes';
import Header from './Header';
import Footer from '@/components/layout-components/Footer';
import s from '@/styles/Layout.module.css';

interface Props {
  introduction?: string;
  children: ReactNode;
}

export default function Layout({ introduction, children }: Props) {
  const router = useRouter();
  const path = router.pathname;
  const isHome = path === ROUTES.HOME;
  const isAdmin = path.split('/')[1] === 'admin';

  return (
    <>
      <div className={s.line}></div>
      {!isAdmin && <Header introduction={introduction} isHome={isHome} />}
      <main className={s.main}>{children}</main>
      <Footer />
    </>
  );
}
