"use client";

import s from "./PresentationComponent.module.css";
import React from "react";
import Image from "next/image";
import { DEVICE } from "@/constants/image";
import { ContentFull } from "@/app/api/content/content";

interface Props {
  presentation: ContentFull;
  demarche: ContentFull;
  inspiration: ContentFull;
}
export default function PresentationComponent({
  presentation,
  demarche,
  inspiration,
}: Props) {
  return (
    <>
      <div className={s.contentWrapper}>
        {presentation?.images.length > 0 && (
          <div className={s.imageWrap}>
            <Image
              loader={({ src, width }) => {
                const directory = width <= DEVICE.SMALL ? "sm" : "md";
                return `/images/miscellaneous/${directory}/${src}`;
              }}
              src={`${presentation.images[0].filename}`}
              sizes="(max-width: 768px) 80vw, 50vw"
              fill
              alt="Photographie de présentation de Thierry Casters"
              style={{
                objectFit: "contain",
              }}
              priority
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
