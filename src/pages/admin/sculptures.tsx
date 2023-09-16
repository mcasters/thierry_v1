import { useSession } from 'next-auth/react';

import Layout from '@/components/layout-components';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';
import { TYPE } from '@/constants';
import ItemListComponent from '@/components/admin/item/ItemListComponent';
import AddItemForm from '@/components/admin/form/AddItemForm';

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
      En construction...
    </Layout>
  );
}
