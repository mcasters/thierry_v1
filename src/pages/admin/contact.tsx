import { useSession } from 'next-auth/react';

import Layout from '@/components/layout-components/Layout';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';
import AdminContactComponent from '@/components/admin/content/AdminContactComponent';
import { getContactContent } from '@/utils/common';
import s from '@/styles/admin.module.css';

export default function Contact() {
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
    const { addressContent, phoneContent, emailContent, textContactContent } =
      getContactContent(contents);

    return (
      <Layout>
        <AdminNav />
        <div className={s.adminWrapper}>
          <h1 className={s.pageTitle}>Contenus de la page contact</h1>
          <AdminContactComponent
            addressContent={addressContent}
            phoneContent={phoneContent}
            emailContent={emailContent}
            textContactContent={textContactContent}
          />
        </div>
      </Layout>
    );
  }
}
