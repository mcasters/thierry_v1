'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import Header from './Header';
import Main from '@/components/layout-components/Main';
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
  const pathname = usePathname();
  const isHome = pathname === ROUTES.HOME;

  return (
    <>
      <Header
        isHome={isHome}
        introduction={introduction}
        title="Thierry Casters"
        paintingCategories={paintingCategories}
        sculptureCategories={sculptureCategories}
      />
      <Main isHome={isHome}>{children}</Main>
    </>
  );
}
