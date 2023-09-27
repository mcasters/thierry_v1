import AdminPresentationComponent from '@/components/admin/content/AdminPresentationComponent';
import { getContentsFull } from '@/app/api/content/getContents';
import { getPresentationContent } from '@/utils/common';
import s from '@/styles/admin.module.css';

export default async function Presentation() {
  const contents = await getContentsFull();
  const { presentationContent, demarcheContent, inspirationContent } =
    getPresentationContent(contents);

  return (
    <>
      <h1 className={s.pageTitle}>Contenus de la page Présentation</h1>
      <AdminPresentationComponent
        presentationContent={presentationContent}
        demarcheContent={demarcheContent}
        inspirationContent={inspirationContent}
      />
    </>
  );
}
