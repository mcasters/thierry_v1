'use client';

import { ReactNode } from 'react';

import s from '@/styles/Main.module.css';

export type Props = {
  isHome: boolean;
  children: ReactNode;
};

export default function Main({ isHome, children }) {
  return isHome ? (
    <div className={s.wrapper}>
      <main className={s.mainHome}>{children}</main>
    </div>
  ) : (
    <main className={s.main}>{children}</main>
  );
}
