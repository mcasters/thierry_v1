import { Label, Content } from '@prisma/client';

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
          isTextArea={true}
          textLabel="Adresse"
          withImage={false}
        />
        <ContentForm
          content={phoneContent}
          label={Label.PHONE}
          isTextArea={false}
          textLabel="Téléphone"
          withImage={false}
        />
        <ContentForm
          content={emailContent}
          label={Label.EMAIL}
          isTextArea={false}
          textLabel="E-mail"
          withImage={false}
        />
        <ContentForm
          content={textContactContent}
          label={Label.TEXT_CONTACT}
          isTextArea={true}
          textLabel="texte d'accompagnement"
          withImage={false}
        />
      </div>
    </>
  );
}
