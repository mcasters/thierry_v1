import AdminNav from '@/components/layout-components/AdminNav';
import AdminContactComponent from '@/components/admin/content/AdminContactComponent';
import { getContactContent } from '@/utils/common';
import s from '@/styles/admin.module.css';
import { getContentFull } from '@/app/api/content/getContents';

export default async function Contact() {
  const contents = await getContentFull();

  if (contents) {
    const { addressContent, phoneContent, emailContent, textContactContent } =
      getContactContent(contents);

    return (
      <>
        <AdminNav />
        <div className={s.adminWrapper}>
          <h1 className={s.pageTitle}>Contenus de la page contact</h1>
          <AdminContactComponent
            addressContent={addressContent}
            phoneContent={phoneContent}
            emailContent={emailContent}
            textContactContent={textContactContent}
          />
        </div>
      </>
    );
  }
}
