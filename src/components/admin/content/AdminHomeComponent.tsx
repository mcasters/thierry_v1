import { Label } from '@prisma/client';

import Image from 'next/image';
import React from 'react';
import UpdateContentButton from '@/components/admin/form/UpdateContentButton';
import { ContentFull } from '@/interfaces';
import s from './AdminHomeComponent.module.css';
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
