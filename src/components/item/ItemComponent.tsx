"use client";

import ImageLightbox from "@/components/image/ImageLightbox";
import { SculptureFull } from "@/app/api/sculpture/sculpture";
import { PaintingFull } from "@/app/api/peinture/painting";
import s from "./ItemComponent.module.css";
import { isSculptureFull } from "@/utils/commonUtils";

interface Props {
  item: SculptureFull | PaintingFull;
}
export default function ItemComponent({ item }: Props) {
  const isSculpture = isSculptureFull(item);

  return (
    <article id={`${item.id}`} className={s.article}>
      <figure>
        <ImageLightbox
          images={isSculpture ? item.images : [item.image]}
          alt={`${item.title} - ${item.type} de Thierry Casters`}
          type={item.type}
        />
      </figure>
      <figcaption className={s.infoContainer}>
        <h2>{item.title}</h2>
        <div className={s.info}>
          <p>
            <time>{new Date(item.date).getFullYear()}</time>
            {", "}
            {item.technique}
            {","}
            <br />
            {!isSculpture ? `${item.height} x ${item.width} cm` : ""}
            {isSculpture
              ? `${item.height} x ${item.width} x ${item.length} cm`
              : ""}
          </p>
          {item.description !== "" && (
            <>
              <br />
              <p>{item.description}</p>
            </>
          )}
          {item.isToSell && (
            <>
              <br />
              <p>
                {`prix : ${item.price} euros`}
                {item.sold ? "vendu" : ""}
              </p>
            </>
          )}
        </div>
      </figcaption>
    </article>
  );
}
