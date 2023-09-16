import { GetServerSideProps } from 'next';

import prisma from '@/lib/prisma';
import Layout from '@/components/layout-components';
import ItemComponent from '@/components/item/ItemComponent';
import { Item } from '@/interfaces';
import s from '@/styles/ItemPage.module.css';

export type Props = {
  paintings: [Item];
};

export default function Peintures({ paintings: items }: Props) {
  return (
    <Layout>
      <div className={s.container}>En construction...</div>
    </Layout>
  );
}
