"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import { FileUploader } from "@/components/admin/form/imageForm/FileUploader";
import s from "@/components/admin/form.module.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  isMultiple: boolean;
  api: string;
  label: string;
  title?: string;
};

export default function ImagesForm({ isMultiple, api, label, title }: Props) {
  const [newImages, setNewImages] = useState<string[]>([]);
  const [toUpdate, setToUpdate] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleFiles = (filesUploaded: FileList) => {
    if (filesUploaded?.length > 0) {
      const files = Array.from(filesUploaded);

      const newFiles: string[] = [];
      files.forEach((file) => {
        newFiles.push(URL.createObjectURL(file));
      });
      setNewImages(newFiles);
      setToUpdate(true);
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(formRef.current);
      fetch(api, {
        method: "POST",
        body: formData,
      }).then((res) => {
        if (res.ok) {
          toast("Contenu modifié");
          setToUpdate(false);
          window.location.reload();
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <div className={s.formContainer}>
      <form ref={formRef} onSubmit={submit}>
        <input type="hidden" name="label" value={label} />
        <h4 className={s.imageTitle}>
          {title !== undefined ? title : isMultiple ? "Images :" : "Image :"}
        </h4>
        <div className={s.imageFormContainer}>
          <FileUploader
            name={isMultiple ? "files" : "file"}
            handleFiles={handleFiles}
            isMultiple={isMultiple}
          />
        </div>
        <div className={s.imageFormContainer}>
          {newImages.length > 0 &&
            newImages.map((src) => (
              <div key={src} className={s.imageWrapper}>
                <div key={src} className={s.imageContainer}>
                  <Image
                    unoptimized={true}
                    src={src}
                    width={150}
                    height={150}
                    alt="Nouvelle image de l'item"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
        {toUpdate && (
          <>
            <button className="adminButton" type="submit">
              Enregistrer
            </button>
            <button
              className="adminButton"
              onClick={(e) => {
                e.preventDefault();
                router.refresh();
                setToUpdate(false);
              }}
            >
              Annuler
            </button>
          </>
        )}
      </form>
    </div>
  );
}
