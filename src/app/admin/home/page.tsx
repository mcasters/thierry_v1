import AdminHomeComponent from '@/components/admin/content/AdminHomeComponent';
import { getContentsFull } from '@/app/api/content/getContents';
import { getIntro, getSliders } from '@/utils/commonUtils';
import s from '@/styles/admin.module.css';

export default async function Home() {
  const contents = await getContentsFull();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus de la page home</h1>
      <AdminHomeComponent
        introContent={getIntro(contents)}
        sliderContent={getSliders(contents)}
      />
    </>
  );
}
