import { Label } from '@prisma/client';

import React from 'react';
import { ContentFull } from '@/interfaces';
import ContentForm from '@/components/admin/form/ContentForm';

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
        withImage={false}
      />
      <div className="separate"></div>
      <ContentForm
        content={sliderContent}
        label={Label.SLIDER}
        isTextArea={false}
        textLabel="Slider"
        withImage={true}
      />
    </>
  );
}
