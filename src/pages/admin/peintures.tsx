import { useSession } from 'next-auth/react';

import Layout from '@/components/layout/layout';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout/AdminNav';
import { TYPE } from '@/constants';
import AddItemComponent from '@/components/admin/item/AddItemComponent';

export default function Peintures() {
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
      <AddItemComponent type={TYPE.PAINTING} />
    </Layout>
  );
}
