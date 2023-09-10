import { useSession } from 'next-auth/react';

import Layout from '@/components/layout-components/layout';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';

const Index = () => {
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
      <h1>Administration</h1>
    </Layout>
  );
};

export default Index;
