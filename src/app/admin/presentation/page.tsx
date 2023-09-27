import AdminPresentationComponent from '@/components/admin/content/AdminPresentationComponent';
import { getContentFullByLabel } from '@/app/api/content/getContents';
import { Label } from '@prisma/client';
import s from '@/styles/admin.module.css';

export default async function Presentation() {
  const presentation = await getContentFullByLabel(Label.PRESENTATION);
  const demarche = await getContentFullByLabel(Label.DEMARCHE);
  const inspiration = await getContentFullByLabel(Label.INSPIRATION);

  return (
    <>
      <h1 className={s.pageTitle}>Contenus de la page Présentation</h1>
      <AdminPresentationComponent
        presentation={presentation}
        demarche={demarche}
        inspiration={inspiration}
      />
    </>
  );
}
