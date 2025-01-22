"use client";

import React, { useRef } from "react";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import Images from "@/components/admin/form/imageForm/Images";
import { useAlert } from "@/app/context/AlertProvider";

type Props = {
  isMultiple: boolean;
  api: string;
  label: string;
  title?: string;
  isMain?: boolean;
  smallImage: boolean;
};

export default function ImagesForm({
  isMultiple,
  api,
  label,
  title,
  isMain = false,
  smallImage,
}: Props) {
  const alert = useAlert();
  const formRef = useRef<HTMLFormElement>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(formRef.current);
      fetch(api, {
        method: "POST",
        body: formData,
      }).then((res) => {
        if (res.ok) {
          alert("Contenu modifié", false);
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        } else alert("Erreur à l'enregistrement", true);
      });
    }
  };

  return (
    <form ref={formRef} onSubmit={submit}>
      <input type="hidden" name="label" value={label} />
      <input type="hidden" name="isMain" value={isMain?.toString()} />
      <Images isMultiple={isMultiple} title={title} smallImage={smallImage} />
      <>
        <SubmitButton />
        <CancelButton />
      </>
    </form>
  );
}
