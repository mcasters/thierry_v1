import { getContentsFull } from "@/app/api/content/getContents";
import { getIntro, getSliders } from "@/utils/commonUtils";
import { Label } from "@prisma/client";
import Preview from "@/components/admin/form/imageForm/Preview";
import s from "@/components/admin/form.module.css";
import React from "react";
import ImagesForm from "@/components/admin/form/imageForm/ImagesForm";
import TextAreaForm from "@/components/admin/form/TextAreaForm";

export default async function Home() {
  const contents = await getContentsFull();
  const sliderContent = getSliders(contents);
  return (
    <div className={s.formContainer}>
      <h2 className={s.contentLabel}>Introduction (facultatif)</h2>
      <TextAreaForm
        content={getIntro(contents)}
        label={Label.INTRO}
        api="api/content/update"
        withImage={false}
      />
      <h2 className={s.contentLabel}>Slider (une ou plusieurs images)</h2>
      <Preview
        images={sliderContent.images}
        pathImage="/images/miscellaneous"
        apiForDelete="api/content/delete-image"
      />
      <ImagesForm
        api="api/content/update"
        isMultiple={true}
        label={Label.SLIDER}
        title=""
      />
    </div>
  );
}
