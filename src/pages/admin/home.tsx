import { useSession } from 'next-auth/react';
import { Label } from '@prisma/client';

import Layout from '@/components/layout-components';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';
import HomeForm from '@/components/admin/form/HomeForm';
import useSWR from 'swr';

export default function Home() {
  const { data: session } = useSession();
  const api = '/api/home';
  const { data: contents } = useSWR(api, (apiURL: string) =>
    fetch(apiURL).then((res) => res.json()),
  );

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
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h1>Contenus de la page d'accueil</h1>
      {(Object.keys(Label) as Array<keyof typeof Label>).map((label, i) => {
        let contentForLabel = undefined;
        if (contents) {
          const res = contents?.filter((content) => content.label === label);
          if (res) contentForLabel = res;
        }
        return <HomeForm key={i} content={contentForLabel} label={label} />;
      })}
    </Layout>
  );
}
