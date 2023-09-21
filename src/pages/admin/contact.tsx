import { useSession } from 'next-auth/react';
import { Label } from '@prisma/client';
import useSWR from 'swr';

import Layout from '@/components/layout-components/Layout';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';
import { Content } from '@/interfaces';
import AdminContactComponent from '@/components/admin/content/AdminContactComponent';
import s from '../../styles/admin.module.css';
import { useEffect } from 'react';

export default function Contact() {
  const { data: session } = useSession();
  const api = '/api/content';
  const { data: contents } = useSWR(api, (apiURL: string) =>
    fetch(apiURL).then((res) => res.json()),
  );
  let addressContent;
  let phoneContent;
  let emailContent;
  let textContactContent;

  if (contents !== undefined)
    contents.forEach((content: Content) => {
      if (content.label === Label.ADDRESS) addressContent = content;
      if (content.label === Label.PHONE) phoneContent = content;
      if (content.label === Label.EMAIL) emailContent = content;
      if (content.label === Label.TEXT_CONTACT) textContactContent = content;
    });

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
