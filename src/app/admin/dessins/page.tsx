import { Type } from "@/lib/type";
import s from "@/components/admin/admin.module.css";
import React from "react";
import { getAllCategories, getAllItems } from "../../actions/item-post";
import ItemLayoutForm from "@/components/admin/form/item/itemLayoutForm.tsx";
import AddButton from "@/components/admin/form/addButton.tsx";
import {
  getCategoriesFull,
  getEmptyCategoryFull,
  getEmptyItem,
} from "@/utils/commonUtils.ts";
import ListComponent from "@/components/admin/form/item/listComponent.tsx";
import { MESSAGE } from "@/constants/admin.ts";

export default async function Dessins() {
  const type = Type.DRAWING;
  const categories = await getAllCategories(type);
  const items = await getAllItems(type);

  return (
    <div className={s.container}>
      <h1 className={s.title1}>Les dessins</h1>
      <h2 className={s.title2}>Mise en page</h2>
      <ItemLayoutForm type={type} />
      <div className="separate" />
      <h2
        className={s.title2}
      >{`Gestion des dessins ( total : ${items.length} )`}</h2>
      <ListComponent items={items} categories={categories} type={type} />
      <AddButton item={getEmptyItem(type)} categories={categories} />
      <div className="separate" />
      <h2 className={s.title2}>Gestion des catégories</h2>
      <ListComponent
        items={getCategoriesFull(categories, items, type)}
        type={Type.CATEGORY}
      />
      <h5>{MESSAGE.category}</h5>
      <AddButton item={getEmptyCategoryFull(type)} />
    </div>
  );
}
