"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

import { ContentFull } from "@/app/api/content/content";
import { Label } from "@prisma/client";
import s from "../form.module.css";
import Images from "@/components/admin/form/imageForm/Images";
import Preview from "@/components/admin/form/imageForm/Preview";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";

interface Props {
  label: Label;
  content: ContentFull;
  api: string;
  textLabel?: string;
  withImage?: boolean;
}
export default function TextAreaForm({
  label,
  content,
  api,
  textLabel,
  withImage = false,
}: Props) {
  const [text, setText] = useState<ContentFull>(content);
  const [isChanged, setIsChanged] = useState(false);
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
          toast.success("Contenu modifié");
          setIsChanged(false);
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <div className={s.formContainer}>
      <form ref={formRef} onSubmit={submit}>
        <input type="hidden" name="label" value={label} />
        <label className={s.contentLabel}>
          {textLabel}
          <textarea
            name="text"
            value={text?.text}
            onChange={(e) => {
              setText(
                Object.assign({}, text, {
                  text: e.target.value,
                }),
              );
              setIsChanged(true);
            }}
          />
        </label>
        {withImage && (
          <>
            <Preview
              images={text?.images}
              pathImage="/images/miscellaneous"
              apiForDelete="api/content/delete-image"
            />
            <Images
              onAdd={(count) => setIsChanged(count === 1)}
              isMultiple={false}
              title=""
            />
          </>
        )}
        {isChanged && (
          <>
            <SubmitButton />
            <CancelButton />
          </>
        )}
      </form>
    </div>
  );
}
