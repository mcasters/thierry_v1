import { TYPE } from "@/constants";
import ItemListComponent from "@/components/admin/item/ItemListComponent";
import ItemForm from "@/components/admin/form/ItemForm";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import { getSculpturesFull } from "@/app/api/sculpture/getSculptures";
import { getSculptureCategoriesFull } from "@/app/api/sculpture/category/getCategories";
import s from "@/styles/admin/Admin.module.css";
import React from "react";

export default async function Sculptures() {
  const sculptures = await getSculpturesFull();
  const categories = await getSculptureCategoriesFull();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus des pages Sculptures</h1>
      <ItemListComponent
        type={TYPE.SCULPTURE}
        items={sculptures}
        categories={categories}
      />
      <ItemForm categories={categories} typeAdd={TYPE.SCULPTURE} />
      <CategoryComponent type={TYPE.SCULPTURE} categories={categories} />
    </>
  );
}
