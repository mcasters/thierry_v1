import AdminHomeComponent from '@/components/admin/content/AdminHomeComponent';
import { getContentsFull } from '@/app/api/content/getContents';
import { getHomeContent } from '@/utils/common';
import s from '@/styles/admin.module.css';

export default async function Home() {
  const contents = await getContentsFull();
  const { introContent, sliderContent } = getHomeContent(contents);

  return (
    <>
      <h1 className={s.pageTitle}>Contenus de la page home</h1>
      <AdminHomeComponent
        introContent={introContent}
        sliderContent={sliderContent}
      />
    </>
  );
}
