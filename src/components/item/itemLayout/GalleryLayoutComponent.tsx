"use client";

import s from "./GalleryLayoutComponent.module.css";
import { ItemFull } from "@/lib/type";
import React, { useMemo, useState } from "react";
import { getItemPhotoTabEnhanced } from "@/utils/imageUtils";
import { useMetas } from "@/app/context/metaProvider";
import { META } from "@/constants/specific";
import Image from "next/image";
import useWindowSize from "@/components/hooks/useWindowSize";
import { DEVICE } from "@/constants/image";
import { createPortal } from "react-dom";
import { useTheme } from "@/app/context/themeProvider";
import Lightbox from "@/components/image/lightbox/Lightbox";
import ImageInfos from "@/components/image/common/ImageInfos";

interface Props {
  items: ItemFull[];
}
export default function GalleryLayoutComponent({ items }: Props) {
  const metas = useMetas();
  const theme = useTheme();
  const [index, setIndex] = useState(-1);
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;
  const photosEnhanced = useMemo(
    () =>
      getItemPhotoTabEnhanced(
        items,
        `${items[0].title} - ${items[0].type} de ${metas.get(META.SITE_TITLE)}`,
      ),
    [items],
  );
  const photosToDisplay = isSmall ? photosEnhanced.sm : photosEnhanced.md;
  const photosForLightbox = isSmall ? photosEnhanced.md : photosEnhanced.lg;

  return (
    <div className={s.container}>
      {photosToDisplay.map((p, i) => {
        return (
          <article key={i} className={s.article} onClick={() => setIndex(i)}>
            <figure>
              <Image
                defaultValue={i}
                key={p.src}
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                style={{
                  objectFit: "contain",
                }}
                className={s.image}
              />
            </figure>
            <figcaption className={s.infoContainer}>
              <ImageInfos item={p.item} isLightbox={false} />
            </figcaption>
          </article>
        );
      })}
      {index >= 0 &&
        createPortal(
          <Lightbox
            photos={photosForLightbox}
            index={index}
            onClose={() => setIndex(-1)}
            isSmall={isSmall}
          />,
          document.body,
        )}
    </div>
  );
}
