import Link from 'next/link';

import { getContents } from '@/app/api/content/getContents';
import { getContactContent } from '@/utils/common';
import s from '@/styles/contact.module.css';
import { SiInstagram } from 'react-icons/si';

export default async function Contact() {
  const contents = await getContents();
  const { addressContent, phoneContent, emailContent, textContactContent } =
    getContactContent(contents);

  return (
    <div className={s.contactContainer}>
      <address>
        <h1 className={s.title}>Contacter Thierry Casters</h1>
        <p>Thierry Casters</p>
        <p className={s.preLine}>{addressContent.text}</p>
        <p>{phoneContent.text}</p>
      </address>
      <Link className={s.email} href={`mailto:${emailContent.text}`}>
        {emailContent.text}
      </Link>
      <a
        href="https://www.instagram.com/thierrycasters/"
        className={s.instagram}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiInstagram />
      </a>
      <div className={s.text}>
        <p className={s.preLine}>{textContactContent.text}</p>
      </div>
    </div>
  );
}
