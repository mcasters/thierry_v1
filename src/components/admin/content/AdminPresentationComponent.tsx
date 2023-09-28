import { Label } from '@prisma/client';

import ContentForm from '@/components/admin/form/ContentForm';
import { ContentFull } from '@/app/api/content/content';

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
      <ContentForm
        content={presentationContent}
        label={Label.PRESENTATION}
        isTextArea={true}
        textLabel="Présentation"
      />
      <ContentForm
        content={demarcheContent}
        label={Label.DEMARCHE}
        isTextArea={true}
        textLabel="Démarche artistique"
      />
      <ContentForm
        content={inspirationContent}
        label={Label.INSPIRATION}
        isTextArea={true}
        textLabel="Inspirations"
      />
    </>
  );
}
