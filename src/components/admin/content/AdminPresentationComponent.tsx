import { Label } from '@prisma/client';
import { ContentFull } from '@/interfaces';

import ContentForm from '@/components/admin/form/ContentForm';

interface Props {
  presentationContent?: ContentFull;
  demarcheContent?: ContentFull;
  inspirationContent?: ContentFull;
}
export default function AdminPresentationComponent({
  presentationContent,
  demarcheContent,
  inspirationContent,
}: Props) {
  return (
    <>
      <div>
        <ContentForm
          content={presentationContent}
          label={Label.PRESENTATION}
          isTextArea={true}
          textLabel="Présentation"
          withImage={true}
        />
        <ContentForm
          content={demarcheContent}
          label={Label.DEMARCHE}
          isTextArea={true}
          textLabel="Démarche artistique"
          withImage={false}
        />
        <ContentForm
          content={inspirationContent}
          label={Label.INSPIRATION}
          isTextArea={true}
          textLabel="Inspirations"
          withImage={false}
        />
      </div>
    </>
  );
}
