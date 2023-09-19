import { useSession } from 'next-auth/react';

import Layout from '@/components/layout-components/Layout';
import AccessDenied from '@/components/auth/access-denied';
import AdminNav from '@/components/layout-components/AdminNav';
import s from '@/styles/admin.module.css';

export default function Index() {
  const { data: session } = useSession();
  const string1 =
    "Ici, je pourrais mettre de quoi gérer les couleurs générales du site. Cela alourdirait pas mal le site, mais si on n'arrive pas à trouver ce qui te plait, ça sera une solution.";
  const string2 =
    'N’hésite pas à faire des essais, à mettre en ligne ou à modifier des peintures et des contenus de la page home (sculpture et articles n’étant pas encore implémentés), histoire de voir ce que tu veux qui change ou pas. C’est pour l’instant un site « test », une boite à casser, donc aucun risque ! J’effacerai la base de donnée ensuite pour reprendre tout au propre.';
  const string3 =
    'Pour la partie contact (en bas de la page home), je vais le rendre modifiable aussi, cela figurera sur la page home de l’administration.';

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
        <h1>Administration</h1>
        <br />
        <br />
        {string1}
        <br />
        <br />
        {string2}
        <br />
        <br />
        {string3}
      </div>
    </Layout>
  );
}
