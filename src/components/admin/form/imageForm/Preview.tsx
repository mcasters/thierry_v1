"use client";

import React, { useState } from "react";
import Image from "next/image";
import s from "@/styles/admin/Admin.module.css";
import { Image as IImage } from "@/lib/db/item";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useAlert } from "@/app/context/AlertProvider";

type Props = {
  images: IImage[];
  pathImage: string;
  apiForDelete?: string;
  onDelete?: (arg0: number) => void;
  textLabel?: string;
};

export default function Preview({
  images,
  pathImage,
  apiForDelete,
  onDelete,
  textLabel,
}: Props) {
  const alert = useAlert();
  const [existantFilenames, setExistantFilenames] = useState<string[]>(
    images.map((i) => i.filename),
  );

  const handleDelete = (filename: string) => {
    if (apiForDelete !== "" && confirm("Sûr de vouloir supprimer ?")) {
      fetch(`${apiForDelete}/${filename}`).then((res) => {
        if (res.ok) {
          const tab = existantFilenames.filter((f) => {
            return f !== filename;
          });
          setExistantFilenames(tab);
          if (onDelete !== undefined) onDelete(tab.length);
          alert("Image supprimée");
        } else alert("Erreur à la suppression", true);
      });
    }
  };

  return (
    <>
      {textLabel && <label className={s.formLabel}>{textLabel}</label>}
      {existantFilenames.map((filename) => (
        <div key={filename} className={s.imageWrapper}>
          <div>
            <Image
              loader={({ src }) => {
                return `${pathImage}/sm/${src}`;
              }}
              src={`${filename}`}
              width={150}
              height={150}
              alt="Image de l'item"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          {apiForDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(filename);
              }}
              className="iconButton"
              aria-label="Supprimer"
            >
              <DeleteIcon />
            </button>
          )}
        </div>
      ))}
    </>
  );
}
