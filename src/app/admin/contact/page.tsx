import AdminContactComponent from '@/components/admin/content/AdminContactComponent';
import { getContactContent } from '@/utils/common';
import { getContents } from '@/app/api/content/getContents';
import s from '@/styles/admin.module.css';

export default async function Contact() {
  const contents = await getContents();
  const { addressContent, phoneContent, emailContent, textContactContent } =
    getContactContent(contents);

  return (
    <>
      <h1 className={s.pageTitle}>Contenus de la page contact</h1>
      <AdminContactComponent
        addressContent={addressContent}
        phoneContent={phoneContent}
        emailContent={emailContent}
        textContactContent={textContactContent}
      />
    </>
  );
}
