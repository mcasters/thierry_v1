import { useSession } from 'next-auth/react';
import { Label } from '@prisma/client';
import useSWR from 'swr';

import Layout from '@/components/layout-components/Layout';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';
import { Content } from '@/interfaces';
import AdminPresentationComponent from '@/components/admin/content/AdminPresentationComponent';
import s from '@/styles/admin.module.css';

export default function Presentation() {
  const { data: session } = useSession();
  const api = '/api/content';
  const {
    data: contents,
    error,
    isLoading,
  } = useSWR(api, (apiURL: string) => fetch(apiURL).then((res) => res.json()));
  let presentationContent;
  let demarcheContent;
  let inspirationContent;

  if (contents !== undefined)
    contents.forEach((content: Content) => {
      if (content.label === Label.PRESENTATION) presentationContent = content;
      if (content.label === Label.DEMARCHE) demarcheContent = content;
      if (content.label === Label.INSPIRATION) inspirationContent = content;
    });

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <Layout>
      <AdminNav />
      <div className={s.adminWrapper}>
        <h1 className={s.pageTitle}>Contenus de la page Présentation</h1>
        <AdminPresentationComponent
          presentationContent={presentationContent}
          demarcheContent={demarcheContent}
          inspirationContent={inspirationContent}
        />
      </div>
    </Layout>
  );
}
