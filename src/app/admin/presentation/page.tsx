import { getContentsFull } from "@/app/api/content/getContents";
import {
  getDemarcheText,
  getInspirationText,
  getPresentationImage,
  getPresentationText,
} from "@/utils/commonUtils";
import s from "@/styles/admin/Admin.module.css";
import { Label } from "@prisma/client";
import React from "react";
import TextAreaForm from "@/components/admin/form/TextAreaForm";

export default async function Presentation() {
  const contents = await getContentsFull();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus de la page Présentation</h1>
      <TextAreaForm
        textContent={getPresentationText(contents)}
        label={Label.PRESENTATION}
        api="api/content/update"
        textLabel="Présentation"
        images={getPresentationImage(contents)}
      />
      <TextAreaForm
        textContent={getDemarcheText(contents)}
        label={Label.DEMARCHE}
        api="api/content/update"
        textLabel="Démarche artistique"
      />
      <TextAreaForm
        textContent={getInspirationText(contents)}
        label={Label.INSPIRATION}
        api="api/content/update"
        textLabel="Inspiration"
      />
    </>
  );
}
