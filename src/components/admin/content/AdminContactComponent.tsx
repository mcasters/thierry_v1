'use client';

import { Label } from '@prisma/client';

import ContentForm from '@/components/admin/form/ContentForm';
import { ContentFull } from '@/app/api/content/content';

interface Props {
  addressContent: ContentFull;
  phoneContent: ContentFull;
  emailContent: ContentFull;
  textContactContent: ContentFull;
}
export default function AdminContactComponent({
  addressContent,
  phoneContent,
  emailContent,
  textContactContent,
}: Props) {
  return (
    <>
      <ContentForm
        content={addressContent}
        label={Label.ADDRESS}
        isTextArea={true}
        textLabel="Adresse"
      />
      <ContentForm
        content={phoneContent}
        label={Label.PHONE}
        isTextArea={false}
        textLabel="Téléphone"
      />
      <ContentForm
        content={emailContent}
        label={Label.EMAIL}
        isTextArea={false}
        textLabel="E-mail"
      />
      <ContentForm
        content={textContactContent}
        label={Label.TEXT_CONTACT}
        isTextArea={true}
        textLabel="texte d'accompagnement (facultatif)"
      />
    </>
  );
}
