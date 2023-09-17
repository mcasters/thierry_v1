import { useSession } from 'next-auth/react';

import Layout from '@/components/layout-components';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';

export default function Index() {
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
      <div>
        <h1>Administration</h1>
        <br />
        <br />
        Ici, je pourrais mettre de quoi gérer les couleurs générales du site.
        Cela alourdirait pas mal le site, mais si on n'arrive pas à touver ce
        qui te plait, ça sera une solution.
        <br />
        <br />
        N'hésite pas à faire des essais, à mettre en ligne ou à modifier des
        peintures et des contenus de la page home (sculpture et articles n'étant
        pas encore implémentés), histoire de voir ce que tu veux qui change ou
        pas. C'est pour l'instant un site "test", une boite à casser, donc aucun
        risque ! J'effacerai la base de donnée ensuite pour reprendre tout au
        propre.
      </div>
    </Layout>
  );
}
