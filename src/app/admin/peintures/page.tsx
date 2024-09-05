import { TYPE } from "@/constants";
import ItemListComponent from "@/components/admin/item/ItemListComponent";
import ItemForm from "@/components/admin/form/ItemForm";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import { getPaintingsFull } from "@/app/api/peinture/getPaintings";
import { getPaintingCategoriesFull } from "@/app/api/peinture/category/getCategories";
import { getEmptyPainting } from "@/utils/commonUtils";
import s from "@/styles/admin/Admin.module.css";
import React from "react";

export default async function Peintures() {
  const paintings = await getPaintingsFull();
  const categories = await getPaintingCategoriesFull();
  const string1 =
    "** Note ** : Lorsqu'il existe des catégories, si des items sont créés sans être rangés dans une catégorie, alors une catégorie intitulée 'sans catérogie' se crée dans le menu pour y ranger les items en question. En revanche, s'il n'existe aucune catégorie, alors bien sûr, il n'y a pas de création automatique de catégorie, puisqu'on y accèdera directement par le menu racine (à même 'peintures' ou 'sculptures').";

  return (
    <>
      <h1 className={s.pageTitle}>Contenus des pages Peintures</h1>
      <ItemListComponent
        type={TYPE.PAINTING}
        items={paintings}
        categories={categories}
      />
      <ItemForm item={getEmptyPainting()} categories={categories} />
      <CategoryComponent type={TYPE.PAINTING} categories={categories} />
      <div style={{ margin: "0 20em" }}>{string1}</div>
    </>
  );
}
