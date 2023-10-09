import AdminContactComponent from '@/components/admin/content/AdminContactComponent';
import {
  getAddress,
  getEmail,
  getPhone,
  getTextContact,
} from '@/utils/commonUtils';
import { getContents, getContentsFull } from '@/app/api/content/getContents';
import s from '@/styles/admin.module.css';

export default async function Contact() {
  const contents = await getContentsFull();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus de la page contact</h1>
      <AdminContactComponent
        addressContent={getAddress(contents)}
        phoneContent={getPhone(contents)}
        emailContent={getEmail(contents)}
        textContactContent={getTextContact(contents)}
      />
    </>
  );
}
