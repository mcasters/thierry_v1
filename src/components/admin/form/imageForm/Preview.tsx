"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiTrash2 } from "@react-icons/all-files/fi/FiTrash2";
import toast from "react-hot-toast";
import s from "@/components/admin/form.module.css";
import { ContentImage, Image as IImage, PostImage } from ".prisma/client";

type Props = {
  images: ContentImage[] | PostImage[] | IImage[];
  pathImage: string;
  apiForDelete?: string;
  onDelete?: (arg0: number) => void;
};

export default function Preview({
  images,
  pathImage,
  apiForDelete,
  onDelete,
}: Props) {
  const [existantFilenames, setExistantfilenames] = useState<string[]>(
    images.map((i) => i.filename),
  );

  const handleDelete = (filename: string) => {
    if (apiForDelete !== "" && confirm("Sûr de vouloir supprimer ?")) {
      fetch(`${apiForDelete}/${filename}`).then((res) => {
        if (res.ok) {
          const tab = existantFilenames.filter((f) => {
            return f !== filename;
          });
          setExistantfilenames(tab);
          if (onDelete !== undefined) onDelete(tab.length);
          toast.success("Image supprimée");
        } else toast.error("Erreur à la suppression");
      });
    }
  };

  return (
    <>
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
              <FiTrash2 />
            </button>
          )}
        </div>
      ))}
    </>
  );
}
