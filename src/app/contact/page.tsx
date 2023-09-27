import Link from 'next/link';

import { getContents } from '@/app/api/content/getContents';
import { getContactContent } from '@/utils/common';
import s from '@/styles/contact.module.css';

export default async function Contact() {
  const contents = await getContents();
  const { addressContent, phoneContent, emailContent, textContactContent } =
    getContactContent(contents);

  return (
    <div className={s.contactContainer}>
      <address>
        <h1 className={s.title}>Contact</h1>
        <p>Thierry Casters</p>
        <p className={s.preLine}>{addressContent.text}</p>
        <p>{phoneContent.text}</p>
        <Link href={`mailto:${emailContent.text}`}>{emailContent.text}</Link>
      </address>
      <div>
        <p className={s.preLine}>{textContactContent.text}</p>
      </div>
    </div>
  );
}
