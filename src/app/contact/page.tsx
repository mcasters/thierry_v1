import Link from 'next/link';

import { getContentsFull } from '@/app/api/content/getContents';
import s from '@/styles/contact.module.css';
import { SiInstagram } from 'react-icons/si';
import {
  getAddress,
  getEmail,
  getPhone,
  getTextContact,
} from '@/utils/commonUtils';

export default async function Contact() {
  const contents = await getContentsFull();
  const email = getEmail(contents);

  return (
    <div className={s.contactContainer}>
      <address>
        <h1 className={s.title}>Contacter Thierry Casters</h1>
        <p>Thierry Casters</p>
        <p className={s.preLine}>{getAddress(contents)?.text}</p>
        <p>{getPhone(contents)?.text}</p>
      </address>
      <Link className={s.email} href={`mailto:${email?.text}`}>
        {email?.text}
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
        <p className={s.preLine}>{getTextContact(contents)?.text}</p>
      </div>
    </div>
  );
}
