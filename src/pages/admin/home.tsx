import { useSession } from 'next-auth/react';
import { Label } from '@prisma/client';

import Layout from '@/components/layout-components';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';
import React from 'react';
import useSWR from 'swr';
import AdminHome from '@/components/admin/home/AdminHome';
import s from '../../styles/admin.module.css';
import { Content } from '@/interfaces';

export default function Home() {
  const { data: session } = useSession();
  const api = '/api/home';
  const {
    data: contents,
    error,
    isLoading,
  } = useSWR(api, (apiURL: string) => fetch(apiURL).then((res) => res.json()));

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <AdminNav />
      <h1 className={s.pageTitle}>
        Contenus de la page d&apos;accueil
        <br />
        <small>(De haut en bas)</small>
      </h1>
      {(Object.keys(Label) as Array<keyof typeof Label>).map((label, i) => {
        let contentForLabel = null;
        if (contents) {
          const res = contents.filter(
            (content: Content) => content.label === label,
          );
          if (res) contentForLabel = res[0];
        }
        return <AdminHome key={i} content={contentForLabel} label={label} />;
      })}
    </Layout>
  );
}
