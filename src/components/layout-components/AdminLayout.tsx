'use client';

import { ReactNode } from 'react';

import Main from '@/components/layout-components/Main';
import AdminNav from '@/components/layout-components/AdminNav';
import s from '@/styles/admin.module.css';

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <>
      <AdminNav />
      <Main isHome={false}>
        <div className={s.adminWrapper}>{children}</div>
      </Main>
    </>
  );
}
