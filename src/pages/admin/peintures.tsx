import { useSession } from 'next-auth/react';

import Layout from '@/components/layout-components/Layout';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';
import { TYPE } from '@/constants';
import ItemListComponent from '@/components/admin/item/ItemListComponent';
import ItemForm from '@/components/admin/form/ItemForm';
import s from '@/styles/admin.module.css';
import CategoryComponent from '@/components/admin/item/category/CategoryComponent';

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
      <div className={s.adminWrapper}>
        <ItemListComponent type={TYPE.PAINTING} />
        <ItemForm type={TYPE.PAINTING} />
        <CategoryComponent type={TYPE.PAINTING} />
      </div>
    </Layout>
  );
}
