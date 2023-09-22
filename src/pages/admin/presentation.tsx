import { useSession } from 'next-auth/react';
import { Label } from '@prisma/client';
import useSWR from 'swr';

import Layout from '@/components/layout-components/Layout';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';
import AdminPresentationComponent from '@/components/admin/content/AdminPresentationComponent';
import s from '@/styles/admin.module.css';
import { getContent } from '@/utils/common';

export default function Presentation() {
  const { data: session } = useSession();
  const { data: contents } = useSWR('/api/content', (apiURL: string) =>
    fetch(apiURL).then((res) => res.json()),
  );

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  if (contents) {
    const presentationContent = getContent(Label.PRESENTATION, contents);
    const demarcheContent = getContent(Label.DEMARCHE, contents);
    const inspirationContent = getContent(Label.INSPIRATION, contents);

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
}
