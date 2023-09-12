import { useSession } from 'next-auth/react';

import Layout from '@/components/layout-components';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';
import ContentForm from '@/components/admin/form/ContentForm';
import useSWR from 'swr';

export default function Home() {
  const { data: session } = useSession();
  const api = `/api/content`;
  const title = `Contenus de la page d'accueil`;
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
      <h1>title</h1>
      {contents.map((content) => (
        <ContentForm content={content} />
      ))}
    </Layout>
  );
}
