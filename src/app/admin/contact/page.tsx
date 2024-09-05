import {
  getAddress,
  getEmail,
  getPhone,
  getTextContact,
} from "@/utils/commonUtils";
import { getContentsFull } from "@/app/api/content/getContents";
import s from "@/styles/admin/Admin.module.css";
import { Label } from "@prisma/client";
import TextAreaForm from "@/components/admin/form/TextAreaForm";
import React from "react";
import InputForm from "@/components/admin/form/InputForm";

export default async function Contact() {
  const contents = await getContentsFull();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus de la page contact</h1>
      <TextAreaForm
        content={getAddress(contents)}
        label={Label.ADDRESS}
        api="api/content/update"
        textLabel="Adresse"
      />
      <InputForm
        content={getPhone(contents)}
        label={Label.PHONE}
        textLabel="Téléphone"
      />
      <InputForm
        content={getEmail(contents)}
        label={Label.EMAIL}
        textLabel="E-mail"
      />
      <TextAreaForm
        content={getTextContact(contents)}
        label={Label.TEXT_CONTACT}
        api="api/content/update"
        textLabel="Texte d'accompagnement (facultatif)"
      />
    </>
  );
}
