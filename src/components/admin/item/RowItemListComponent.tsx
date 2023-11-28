"use client";

import Image from "next/image";

import DeleteButton from "@/components/admin/form/DeleteButton";
import UpdateButton from "@/components/admin/form/UpdateButton";
import s from "../ListComponent.module.css";
import { PaintingCategoryFull } from "@/app/api/peinture/category/category";
import { SculptureCategoryFull } from "@/app/api/sculpture/category/category";
import { PaintingFull } from "@/app/api/peinture/painting";
import { SculptureFull } from "@/app/api/sculpture/sculpture";
import { isSculptureFull } from "@/utils/commonUtils";

interface Props {
  item: PaintingFull | SculptureFull;
  categories: PaintingCategoryFull[] | SculptureCategoryFull[];
}

export default function RowItemListComponent({ item, categories }: Props) {
  const filename = isSculptureFull(item)
    ? item.images[0].filename
    : item.image.filename;
  return (
    <ul className={s.item}>
      <li className={s.itemTitle}>
        <span className={s.name}>{item.title}</span>
      </li>
      <li className={s.itemImage}>
        <Image
          loader={({ src, width, quality }) => {
            return `/images/${item.type}/sm/${src}`;
          }}
          src={filename}
          alt="Image principale de l'item"
          height={50}
          width={50}
          style={{
            objectFit: "contain",
          }}
        />
      </li>
      <li className={s.itemIcon}>
        <UpdateButton item={item} type={item.type} categories={categories} />
      </li>
      <li className={s.itemIcon}>
        <DeleteButton api={`api/${item.type}/delete/${item.id}`} />
      </li>
    </ul>
  );
}
