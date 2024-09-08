"use client";

import DeleteButton from "@/components/admin/form/DeleteButton";
import UpdateButton from "@/components/admin/form/UpdateButton";
import { TYPE } from "@/constants";
import s from "../../../../styles/admin/AdminList.module.css";
import { SculptureCategoryFull } from "@/app/api/sculpture/category/category";
import { PaintingCategoryFull } from "@/app/api/peinture/category/category";

interface Props {
  category: SculptureCategoryFull | PaintingCategoryFull;
  type: string;
}

export default function RowCategoryListComponent({ category, type }: Props) {
  const itemCount =
    type === TYPE.SCULPTURE
      ? category.sculptures.length
      : category.paintings.length;
  return (
    <ul className={s.item}>
      <li className={s.itemTitle}>
        <span className={s.name}>{category.value}</span>
      </li>
      <li className={s.itemInfo}>
        <span>
          {itemCount} {type}(s)
        </span>
      </li>
      <li className={s.itemIcon}>
        <UpdateButton item={category} type={type} />
      </li>
      <li className={s.itemIcon}>
        <DeleteButton
          api={`api/${type}/category/delete/${category.id}`}
          disabled={itemCount > 0}
        />
      </li>
    </ul>
  );
}
