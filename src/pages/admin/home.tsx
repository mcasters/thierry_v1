import { useSession } from 'next-auth/react';
import { Label } from '@prisma/client';

import Layout from '@/components/layout-components';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';
import HomeForm from '@/components/admin/form/HomeForm';
import React from 'react';

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <AdminNav />
      <h1>Contenus de la page d&apos;accueil</h1>
      {(Object.keys(Label) as Array<keyof typeof Label>).map((label, i) => {
        return <HomeForm key={i} label={label} />;
      })}
    </Layout>
  );
}
