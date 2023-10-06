import { Label } from '@prisma/client';

import ContentForm from '@/components/admin/form/ContentForm';
import { ContentFull } from '@/app/api/content/content';

interface Props {
  introContent: ContentFull;
  sliderContent?: ContentFull;
}
export default function AdminHomeComponent({
  introContent,
  sliderContent,
}: Props) {
  return (
    <>
      <ContentForm
        content={introContent}
        label={Label.INTRO}
        isTextArea={true}
        textLabel="Introduction"
      />
      <ContentForm
        content={sliderContent}
        label={Label.SLIDER}
        isTextArea={false}
        textLabel="Slider"
      />
    </>
  );
}
