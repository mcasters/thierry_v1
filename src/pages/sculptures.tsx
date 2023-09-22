import { GetServerSideProps } from 'next';

import Layout from '@/components/layout-components/Layout';
import ItemComponent from '@/components/item/ItemComponent';
import { getSculptureFull, SculptureFull } from '@/interfaces';
import s from '@/styles/ItemPage.module.css';

export type Props = {
  sculptures: SculptureFull;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getSculptureFull();
  const sculptures = JSON.parse(JSON.stringify(res));
  return {
    props: {
      sculptures,
    },
  };
};

export default function Sculptures({ sculptures }: Props) {
  return (
    <Layout>
      <div className={s.container}>
        <div className={s.grid}>
          <h1 className="hidden">Les sculptures</h1>
          {sculptures?.map((sculpture) => (
            <ItemComponent key={sculpture.id} item={sculpture} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
