"use client";

import React, { useRef, useState } from "react";
import { parse } from "date-fns";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import ImagesForm from "@/components/admin/form/imageForm/ImagesForm";
import { PostFull } from "@/app/api/post/post";
import s from "../form.module.css";
import { getMainImage } from "@/utils/commonUtils";

interface Props {
  post?: PostFull;
  toggleModal?: () => void;
}

export default function PostForm({ post, toggleModal }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const resetMainImageRef = useRef<number>(0);
  const resetImagesRef = useRef<number>(0);
  const router = useRouter();
  const api = post ? `api/post/update` : `api/post/add`;

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
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(formRef.current);
      fetch(api, { method: "POST", body: formData }).then((res) => {
        if (res.ok) {
          toast(post ? "Post modifié" : "Post ajouté");
          toggleModal ? toggleModal() : reset();
          router.refresh();
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <div className={s.formContainer}>
      <h2>{post ? "Modifier un post" : "Ajouter un post"}</h2>
      <form ref={formRef} onSubmit={submit}>
        {post && <input type="hidden" name="id" value={post.id} />}
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre"
          name="title"
          type="text"
          value={title}
          required
        />
        <input
          onChange={(e) => {
            const date = parse(e.currentTarget.value, "yyyy", new Date());
            setDate(date);
          }}
          placeholder="Année"
          name="date"
          type="number"
          value={date.getFullYear()}
          required
        />
        <textarea
          onChange={(e) => setText(e.target.value)}
          placeholder="Texte (facultatif)"
          name="text"
          rows={5}
          value={text}
        />
        <ImagesForm
          images={mainImage ? [mainImage] : []}
          reset={resetMainImageRef.current}
          pathImage={`/images/post`}
          isMultiple={false}
          apiForDelete={"api/post/delete-image"}
          title="Image principale"
        />
        <ImagesForm
          images={post?.images.filter((i) => !i.isMain) || []}
          reset={resetImagesRef.current}
          pathImage={`/images/post`}
          isMultiple={true}
          apiForDelete={"api/post/delete-image"}
          title="Album d'images"
        />
        <div>
          <input disabled={!title || !date} type="submit" value="Enregistrer" />
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleModal ? toggleModal() : reset();
            }}
            className="adminButton"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
