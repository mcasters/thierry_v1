import { GetServerSideProps } from 'next';

import prisma from '@/lib/prisma';
import Layout from '@/components/layout-components/Layout';
import ItemComponent from '@/components/item/ItemComponent';
import { Item } from '@/interfaces';
import s from '@/styles/ItemPage.module.css';

export type Props = {
  paintings: [Item];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await prisma.painting.findMany({
    include: {
      image: {
        select: {
          filename: true,
          height: true,
          width: true,
        },
      },
    },
  });
  const paintings = JSON.parse(JSON.stringify(res));
  return {
    props: {
      paintings,
    },
  };
};

export default function Peintures({ paintings: items }: Props) {
  return (
    <Layout>
      <div className={s.container}>
        <section className={s.itemListSection}>
          <h1 className="hidden">Les peintures</h1>
          {items &&
            items.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  document
                    .getElementById(`${item.id}`)
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                {item.title}
              </button>
            ))}
        </section>
        {items.map((item) => (
          <ItemComponent key={item.id} item={item} />
        ))}
      </div>
    </Layout>
  );
}
