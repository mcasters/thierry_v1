"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import { FileUploaderButton } from "@/components/admin/form/imageForm/FileUploaderButton";
import s from "@/styles/admin/Admin.module.css";
import toast from "react-hot-toast";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { Label } from "@prisma/client";

type Props = {
  isMultiple: boolean;
  api: string;
  label: string;
  title?: string;
  isMain?: boolean;
};

export default function ImagesForm({
  isMultiple,
  api,
  label,
  title,
  isMain = false,
}: Props) {
  const [newImages, setNewImages] = useState<string[]>([]);
  const [toUpdate, setToUpdate] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFiles = async (filesUploaded: FileList) => {
    if (filesUploaded?.length > 0) {
      const files = Array.from(filesUploaded);
      const newFiles: string[] = [];
      let error = false;

      for await (const file of files) {
        const bmp = await createImageBitmap(file);
        const { width, height } = bmp;
        if (
          (label === Label.SLIDER && width < 2000) ||
          (label !== Label.SLIDER && width / height < 0.98 && height < 1200) ||
          (label !== Label.SLIDER && width / height >= 0.98 && width < 2000)
        ) {
          toast.error(
            `Erreur: les dimensions de l'image ${file.name} sont trop petites`,
          );
          bmp.close();
          error = true;
          break;
        } else {
          newFiles.push(URL.createObjectURL(file));
          bmp.close();
        }
      }
      if (error) return;
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
          toast.success("Contenu modifié");
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        } else toast.error("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <form ref={formRef} onSubmit={submit}>
      <input type="hidden" name="label" value={label} />
      <input type="hidden" name="isMain" value={isMain?.toString()} />
      <p className={s.imageTitle}>
        {title !== undefined ? title : isMultiple ? "Images :" : "Image :"}
      </p>
      <FileUploaderButton
        name={isMultiple ? "files" : "file"}
        handleFiles={handleFiles}
        isMultiple={isMultiple}
      />
      <div>
        {newImages.length > 0 &&
          newImages.map((src) => (
            <div key={src} className={s.imageWrapper}>
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
          ))}
      </div>
      {toUpdate && (
        <>
          <SubmitButton />
          <CancelButton />
        </>
      )}
    </form>
  );
}
