import AdminPresentationComponent from '@/components/admin/content/AdminPresentationComponent';
import { getContentsFull } from '@/app/api/content/getContents';
import {
  getDemarche,
  getInspiration,
  getPresentationContent,
} from '@/utils/common';
import s from '@/styles/admin.module.css';

export default async function Presentation() {
  const contents = await getContentsFull();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus de la page Présentation</h1>
      <AdminPresentationComponent
        presentationContent={getPresentationContent(contents)}
        demarcheContent={getDemarche(contents)}
        inspirationContent={getInspiration(contents)}
      />
    </>
  );
}
