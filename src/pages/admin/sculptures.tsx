import { useSession } from 'next-auth/react';

import Layout from '@/components/layout-components/Layout';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';
import { TYPE } from '@/constants';
import ItemListComponent from '@/components/admin/item/ItemListComponent';
import ItemForm from '@/components/admin/form/ItemForm';
import s from '@/styles/admin.module.css';

export default function Sculptures() {
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
      <div className={s.adminWrapper}>
        <ItemListComponent type={TYPE.SCULPTURE} />
        <ItemForm type={TYPE.SCULPTURE} />
      </div>
    </Layout>
  );
}
