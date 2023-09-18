import { GetServerSideProps } from 'next';

import prisma from '@/lib/prisma';
import Layout from '@/components/layout-components/Layout';
import ItemComponent from '@/components/item/ItemComponent';
import { Item } from '@/interfaces';
import s from '@/styles/ItemPage.module.css';

export type Props = {
  sculptures: [Item];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await prisma.sculpture.findMany({
    include: {
      images: {
        select: {
          filename: true,
          height: true,
          width: true,
        },
      },
    },
  });
  const sculptures = JSON.parse(JSON.stringify(res));
  return {
    props: {
      sculptures,
    },
  };
};

export default function Sculptures({ sculptures: items }: Props) {
  return (
    <Layout>
      <div className={s.container}>
        <section className={s.itemListSection}>
          <h1 className="hidden">Les sculptures</h1>
        </section>
        {items?.map((item) => <ItemComponent key={item.id} item={item} />)}
      </div>
    </Layout>
  );
}
