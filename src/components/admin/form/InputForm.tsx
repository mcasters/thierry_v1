"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { ContentFull } from "@/app/api/content/content";
import { Label } from "@prisma/client";
import s from "../form.module.css";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";

interface Props {
  label: Label;
  content?: ContentFull;
  textLabel?: string;
}
export default function InputForm({ label, content, textLabel }: Props) {
  const [text, setText] = useState<string>(content?.text || "");
  const [isChanged, setIsChanged] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(formRef.current);
      fetch("api/content/update", {
        method: "POST",
        body: formData,
        cache: "reload",
      }).then((res) => {
        if (res.ok) {
          toast.success("Contenu modifié");
          setIsChanged(false);
        } else toast.error("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <div className={s.formContainer}>
      <form ref={formRef} onSubmit={submit}>
        <input type="hidden" name="label" value={label} />
        <label className={s.contentLabel}>
          {textLabel}
          <input
            placeholder={label}
            name="text"
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setIsChanged(true);
            }}
          />
        </label>
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
