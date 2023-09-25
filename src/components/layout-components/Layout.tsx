'use client';

import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import Header from './Header';
import Footer from '@/components/layout-components/Footer';
import Main from '@/components/layout-components/Main';
import s from '@/styles/Layout.module.css';
import { PaintingCategory, SculptureCategory } from '@prisma/client';

interface Props {
  introduction?: string;
  paintingCategories: PaintingCategory[];
  sculptureCategories: SculptureCategory[];
  children: ReactNode;
}

export default function Layout({
  introduction,
  paintingCategories,
  sculptureCategories,
  children,
}: Props) {
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
          paintingCategories={paintingCategories}
          sculptureCategories={sculptureCategories}
        />
      )}
      <Main isHome={isHome} headerIsFix={headerIsFix}>
        {children}
      </Main>
      <Footer />
    </div>
  );
}
