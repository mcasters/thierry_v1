import { GetServerSideProps } from 'next';

import Layout from '@/components/layout-components/Layout';
import ItemComponent from '@/components/item/ItemComponent';
import { getPaintingFull, PaintingFull } from '@/interfaces';
import s from '@/styles/ItemPage.module.css';

export type Props = {
  paintings: PaintingFull[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getPaintingFull();
  const paintings = JSON.parse(JSON.stringify(res));
  return {
    props: {
      paintings,
    },
  };
};

export default function Peintures({ paintings }: Props) {
  return (
    <Layout>
      <div className={s.container}>
        <div className={s.grid}>
          <h1 className="hidden">Les peintures</h1>
          {paintings.map((painting) => (
            <ItemComponent key={painting.id} item={painting} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
