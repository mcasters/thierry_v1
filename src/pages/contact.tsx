import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Label } from '@prisma/client';

import Layout from '@/components/layout-components/Layout';
import { Content } from '@/interfaces';
import s from '@/styles/contact.module.css';

interface Props {
  address: Content;
  phone: Content;
  email: Content;
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
  let address, phone, email;
  if (resAddress !== undefined)
    address = JSON.parse(JSON.stringify(resAddress));
  if (resEmail !== undefined) phone = JSON.parse(JSON.stringify(resEmail));
  if (resPhone !== undefined) email = JSON.parse(JSON.stringify(resPhone));
  return {
    props: {
      address,
      phone,
      email,
    },
  };
}
export default function contact({ address, phone, email }: Props) {
  return (
    <Layout>
      <address>
        <h1 className={s.title}>Contact</h1>
        <div className={s.contactContent}>
          {address && <Content text={address.text} />}
        </div>
        <div className={s.contactContent}>
          {phone && <Content text={phone.text} />}
        </div>
        <div className={s.contactContent}>
          {email && <Link href={`mailto:${email.text}`}>{email.text}</Link>}
        </div>
      </address>
    </Layout>
  );
}
