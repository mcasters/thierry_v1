'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import Footer from '@/components/layout-components/Footer';
import s from '@/styles/Layout.module.css';

interface Props {
  children: ReactNode;
}

export default function GlobalLayout({ children }: Props) {
  const pathname = usePathname();
  const isHome = pathname === ROUTES.HOME;

  return (
    <div className={s.wrapper}>
      <div className={s.line}></div>
      {isHome && <div className={s.gradient}></div>}
      {children}
      <Footer />
    </div>
  );
}
