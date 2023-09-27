import { Label } from '@prisma/client';

import ContentForm from '@/components/admin/form/ContentForm';
import { ContentFull } from '@/app/api/content/content';

interface Props {
  presentation?: ContentFull;
  demarche?: ContentFull;
  inspiration?: ContentFull;
}
export default function AdminPresentationComponent({
  presentation,
  demarche,
  inspiration,
}: Props) {
  return (
    <>
      <ContentForm
        content={presentation}
        label={Label.PRESENTATION}
        isTextArea={true}
        textLabel="Présentation"
        withImage={true}
      />
      <ContentForm
        content={demarche}
        label={Label.DEMARCHE}
        isTextArea={true}
        textLabel="Démarche artistique"
        withImage={false}
      />
      <ContentForm
        content={inspiration}
        label={Label.INSPIRATION}
        isTextArea={true}
        textLabel="Inspirations"
        withImage={false}
      />
    </>
  );
}
