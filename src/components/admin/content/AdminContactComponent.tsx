import { Label } from '@prisma/client';

import { Content } from '@/interfaces';
import Image from 'next/image';
import s from './AdminHomeComponent.module.css';
import ContentForm from '@/components/admin/form/ContentForm';

interface Props {
  addressContent: Content;
  phoneContent: Content;
  emailContent: Content;
  textContactContent: Content;
}
export default function AdminContactComponent({
  addressContent,
  phoneContent,
  emailContent,
  textContactContent,
}: Props) {
  return (
    <>
      <div>
        <ContentForm
          content={addressContent}
          label={Label.ADDRESS}
          isTextArea={false}
        />
        <ContentForm
          content={phoneContent}
          label={Label.PHONE}
          isTextArea={false}
        />
        <ContentForm
          content={emailContent}
          label={Label.EMAIL}
          isTextArea={false}
        />
        <ContentForm
          content={textContactContent}
          label={Label.TEXT_CONTACT}
          isTextArea={true}
        />
      </div>
    </>
  );
}
