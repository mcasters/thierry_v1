import Image from "next/image";
import React from "react";
import { getContentsFull } from "@/app/api/content/getContents";
import {
  getDemarche,
  getInspiration,
  getPresentation,
} from "@/utils/commonUtils";
import s from "@/styles/presentation.module.css";

export default async function Presentation() {
  const contents = await getContentsFull();
  const presentation = getPresentation(contents);
  const demarche = getDemarche(contents);
  const inspiration = getInspiration(contents);

  return (
    <>
      <div className={s.contentWrapper}>
        {presentation?.images.length > 0 && (
          <div className={s.imageContainer}>
            <Image
              src={`/images/miscellaneous/sm/${presentation.images[0].filename}`}
              width={300}
              height={300}
              alt="Photographie de présentation de Thierry Casters"
              style={{
                objectFit: "contain",
              }}
              unoptimized={true}
            />
          </div>
        )}
        <p>{presentation?.text}</p>
      </div>

      {demarche && (
        <div className={s.contentWrapper}>
          <h2>Démarche artistique</h2>
          <p>{demarche.text}</p>
        </div>
      )}
      {inspiration && (
        <div className={s.contentWrapper}>
          <h2>Inspirations</h2>
          <p>{inspiration.text}</p>
        </div>
      )}
    </>
  );
}
