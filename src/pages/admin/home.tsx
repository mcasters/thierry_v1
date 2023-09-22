import { useSession } from 'next-auth/react';
import { Label } from '@prisma/client';
import useSWR from 'swr';

import Layout from '@/components/layout-components/Layout';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';
import { Content } from '@/interfaces';
import AdminHomeComponent from '@/components/admin/content/AdminHomeComponent';
import s from '../../styles/admin.module.css';

export default function Home() {
  const { data: session } = useSession();
  const api = '/api/content';
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

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <Layout>
      <AdminNav />
      <div className={s.adminWrapper}>
        <h1 className={s.pageTitle}>Contenus de la page d&apos;accueil</h1>
        {(Object.keys(Label) as Array<keyof typeof Label>).map((label, i) => {
          if (label === Label.INTRO || label === Label.SLIDER) {
            const content = contents.filter(
              (content: Content) => content.label === label,
            );
            console.log(content);
            return (
              <AdminHomeComponent
                key={label}
                content={content[0]}
                label={label}
              />
            );
          }
        })}
      </div>
    </Layout>
  );
}
