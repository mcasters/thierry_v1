import Link from 'next/link';
import { Label } from '@prisma/client';

import { getContentFullByLabel } from '@/app/api/content/getContents';
import s from '@/styles/contact.module.css';

export default async function Contact() {
  const address = await getContentFullByLabel(Label.ADDRESS);
  const email = await getContentFullByLabel(Label.EMAIL);
  const phone = await getContentFullByLabel(Label.PHONE);
  const textContact = await getContentFullByLabel(Label.TEXT_CONTACT);

  return (
    <div className={s.contactContainer}>
      <address>
        <h1 className={s.title}>Contact</h1>
        <p>Thierry Casters</p>
        {address && <p className={s.preLine}>{address.text}</p>}
        {phone && <p>{phone.text}</p>}

        {email && <Link href={`mailto:${email.text}`}>{email.text}</Link>}
      </address>
      <div>
        {textContact && <p className={s.preLine}>{textContact.text}</p>}
      </div>
    </div>
  );
}
