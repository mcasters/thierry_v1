import prisma from '@/lib/prisma';
import { Label } from '@prisma/client';

import Layout from '@/components/layout-components/Layout';
import { Content } from '@/interfaces';
import s from '@/styles/presentation.module.css';

interface Props {
  presentation: Content;
  demarche: Content;
  inspiration: Content;
}

export async function getServerSideProps() {
  const resPresentation = await prisma.content.findFirst({
    where: {
      label: Label.PRESENTATION,
    },
  });
  const resDemarche = await prisma.content.findFirst({
    where: {
      label: Label.DEMARCHE,
    },
  });
  const resInspiration = await prisma.content.findFirst({
    where: {
      label: Label.INSPIRATION,
    },
  });
  let presentation, demarche, inspiration;
  if (resPresentation !== undefined)
    presentation = JSON.parse(JSON.stringify(resPresentation));
  if (resDemarche !== undefined)
    demarche = JSON.parse(JSON.stringify(resDemarche));
  if (resInspiration !== undefined)
    inspiration = JSON.parse(JSON.stringify(resInspiration));
  return {
    props: {
      address: presentation,
      phone: demarche,
      email: inspiration,
    },
  };
}
export default function Presentation({
  presentation,
  demarche,
  inspiration,
}: Props) {
  return (
    <Layout>
      <div className={s.presentationContainer}>
        <h1 className={s.title}>Présentation</h1>
        {presentation && <p>{presentation.text}</p>}
        {demarche && (
          <div className={s.demarche}>
            <h2>Démarche artistique</h2>
            <p>{demarche.text}</p>
          </div>
        )}
        {inspiration && (
          <div className={s.inspiration}>
            <h2>Inspirations</h2>
            <p>{inspiration.text}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
