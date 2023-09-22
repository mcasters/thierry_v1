import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import Layout from '@/components/layout-components/Layout';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';
import AdminHomeComponent from '@/components/admin/content/AdminHomeComponent';
import { getHomeContent } from '@/utils/common';
import s from '@/styles/admin.module.css';

export default function Home() {
  const { data: session } = useSession();
  const api = '/api/content';
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

  if (contents) {
    const { introContent, sliderContent } = getHomeContent(contents);

    return (
      <Layout>
        <AdminNav />
        <div className={s.adminWrapper}>
          <h1 className={s.pageTitle}>Contenus de la page home</h1>
          <AdminHomeComponent
            introContent={introContent}
            sliderContent={sliderContent}
          />
        </div>
      </Layout>
    );
  }
}
