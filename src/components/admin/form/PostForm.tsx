"use client";

import React, { useRef, useState } from "react";
import { parse } from "date-fns";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Images from "@/components/admin/form/imageForm/Images";
import { PostFull } from "@/app/api/post/post";
import s from "@/styles/admin/Admin.module.css";
import { getMainImage } from "@/utils/commonUtils";
import Preview from "@/components/admin/form/imageForm/Preview";
import CancelButton from "@/components/admin/form/CancelButton";
import SubmitButton from "@/components/admin/form/SubmitButton";

interface Props {
  post?: PostFull;
  toggleModal?: () => void;
}

export default function PostForm({ post, toggleModal }: Props) {
  const isUpdate = post !== undefined;
  const formRef = useRef<HTMLFormElement>(null);
  const resetMainImageRef = useRef<number>(0);
  const resetImagesRef = useRef<number>(0);
  const router = useRouter();
  const api = isUpdate ? `api/post/update` : `api/post/add`;

  const [title, setTitle] = useState<string>(post?.title || "");
  const [date, setDate] = useState<Date>(
    post?.date ? new Date(post.date) : new Date(),
  );
  const [text, setText] = useState<string>(post?.text || "");
  const mainImage = getMainImage(post);

  const reset = () => {
    setTitle("");
    setDate(new Date());
    setText("");
    resetMainImageRef.current = resetMainImageRef.current + 1;
    resetImagesRef.current = resetImagesRef.current + 1;
    if (toggleModal) toggleModal();
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(formRef.current);
      fetch(api, { method: "POST", body: formData }).then((res) => {
        if (res.ok) {
          reset();
          toast.success(isUpdate ? "Post modifié" : "Post ajouté");
          router.refresh();
        } else toast.error("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <div className={isUpdate ? s.wrapperModal : s.formContainer}>
      <h2>{isUpdate ? "Modifier un post" : "Ajouter un post"}</h2>
      <form ref={formRef} onSubmit={submit}>
        {isUpdate && <input type="hidden" name="id" value={post.id} />}
        <label className={s.formLabel}>
          Titre
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
            value={title}
            required
          />
        </label>
        <label className={s.formLabel}>
          Année
          <input
            onChange={(e) => {
              const date = parse(e.currentTarget.value, "yyyy", new Date());
              setDate(date);
            }}
            name="date"
            type="number"
            value={date.getFullYear()}
            required
          />
        </label>
        <label className={s.formLabel}>
          Texte (facultatif)
          <textarea
            onChange={(e) => setText(e.target.value)}
            name="text"
            rows={5}
            value={text}
          />
        </label>

        <div className={s.imageFormContainer}>
          {isUpdate && (
            <Preview
              images={mainImage ? [mainImage] : []}
              pathImage="/images/post"
              apiForDelete="api/post/delete-image"
            />
          )}
        </div>
        <Images
          isMultiple={false}
          title="Image principale (facultative)"
          reset={resetMainImageRef.current}
        />
        <div className={s.imageFormContainer}>
          {isUpdate && (
            <Preview
              images={post.images.filter((i) => !i.isMain) || []}
              pathImage="/images/post"
              apiForDelete="api/post/delete-image"
            />
          )}
          <Images
            isMultiple={true}
            title={"Album d'images (facultatif)"}
            reset={resetImagesRef.current}
          />
        </div>
        <div className={s.buttonSection}>
          <SubmitButton disabled={!title || !date} />
          <CancelButton handleCancel={reset} />
        </div>
      </form>
    </div>
  );
}
