'use client';

import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import Header from './Header';
import Footer from '@/components/layout-components/Footer';
import Main from '@/components/layout-components/Main';
import s from '@/styles/Layout.module.css';

interface Props {
  introduction?: string;
  children: ReactNode;
}

export default function Layout({ introduction, children }: Props) {
  const [headerIsFix, setHeaderIsFix] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === ROUTES.HOME;
  const isAdmin = pathname.split('/')[1] === 'admin';

  const handler = (isFix) => setHeaderIsFix(isFix);

  return (
    <div className={s.wrapper}>
      <div className={s.line}></div>
      {isHome && <div className={s.gradient}></div>}
      {!isAdmin && (
        <Header
          handler={handler}
          isHome={isHome}
          introduction={introduction}
          title="Thierry Casters"
        />
      )}
      <Main isHome={isHome} headerIsFix={headerIsFix}>
        {children}
      </Main>
      <Footer />
    </div>
  );
}
