import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Label } from '@prisma/client';

import Layout from '@/components/layout-components/Layout';
import { Content } from '@/interfaces';
import s from '@/styles/contact.module.css';

interface Props {
  presentation: Content;
  demarche: Content;
  email: Content;
  textContact: Content;
}

export async function getServerSideProps() {
  const resAddress = await prisma.content.findFirst({
    where: {
      label: Label.ADDRESS,
    },
  });
  const resEmail = await prisma.content.findFirst({
    where: {
      label: Label.EMAIL,
    },
  });
  const resPhone = await prisma.content.findFirst({
    where: {
      label: Label.PHONE,
    },
  });
  const resTextContact = await prisma.content.findFirst({
    where: {
      label: Label.TEXT_CONTACT,
    },
  });
  let address, phone, email, textContact;
  if (resAddress !== undefined)
    address = JSON.parse(JSON.stringify(resAddress));
  if (resEmail !== undefined) email = JSON.parse(JSON.stringify(resEmail));
  if (resPhone !== undefined) phone = JSON.parse(JSON.stringify(resPhone));
  if (resTextContact !== undefined)
    textContact = JSON.parse(JSON.stringify(resTextContact));
  return {
    props: {
      address,
      phone,
      email,
      textContact,
    },
  };
}
export default function Contact({
  presentation,
  demarche,
  email,
  textContact,
}: Props) {
  return (
    <Layout>
      <div className={s.contactContainer}>
        <address>
          <h1 className={s.title}>Contact</h1>
          <p>Thierry Casters</p>
          {presentation && <p className={s.preLine}>{presentation.text}</p>}
          {demarche && <p>{demarche.text}</p>}

          {email && <Link href={`mailto:${email.text}`}>{email.text}</Link>}
        </address>
        <div>
          {textContact && <p className={s.preLine}>{textContact.text}</p>}
        </div>
      </div>
    </Layout>
  );
}
