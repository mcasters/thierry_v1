"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

import s from "@/styles/admin/Admin.module.css";
import { PaintingCategory, SculptureCategory } from "@prisma/client";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { useRouter } from "next/navigation";

interface Props {
  category?: PaintingCategory | SculptureCategory;
  type: string;
  toggleModal?: () => void;
}
export default function CategoryForm({ category, type, toggleModal }: Props) {
  const router = useRouter();
  const isUpdate = category !== undefined;
  const [text, setText] = useState<string>(category?.value || "");
  const formRef = useRef<HTMLFormElement>(null);
  const api = isUpdate
    ? `api/${type}/category/update`
    : `api/${type}/category/add`;
  const title = isUpdate ? "Modifier une catégorie" : "Ajouter une catégorie";

  const reset = () => (toggleModal ? toggleModal() : setText(""));
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(formRef.current);
      fetch(api, { method: "POST", body: formData }).then((res) => {
        if (res.ok) {
          reset();
          toast.success(isUpdate ? "Catégorie modifiée" : "Catégorie ajoutée");
          router.refresh();
        } else toast.error("Erreur à l'enregistrement");
      });
    }
  };
  return (
    <div className={isUpdate ? s.wrapperModal : s.formContainer}>
      <h2>{title}</h2>
      <form ref={formRef} onSubmit={submit}>
        {isUpdate && <input type="hidden" name="id" value={category.id} />}
        <input
          placeholder="catégorie"
          name="text"
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <SubmitButton />
        <CancelButton handleCancel={reset} />
      </form>
    </div>
  );
}
