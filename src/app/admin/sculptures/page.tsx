import { TYPE } from "@/constants";
import ItemListComponent from "@/components/admin/item/ItemListComponent";
import ItemForm from "@/components/admin/form/ItemForm";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import { getSculpturesFull } from "@/app/api/sculpture/getSculptures";
import { getSculptureCategoriesFull } from "@/app/api/sculpture/category/getCategories";
import { getEmptySculpture } from "@/utils/commonUtils";

export default async function Sculptures() {
  const sculptures = await getSculpturesFull();
  const categories = await getSculptureCategoriesFull();
  const string1 =
    "** Note ** : Lorsqu'il existe des catégories, si des items sont créés sans être rangés dans une catégorie, alors une catégorie intitulée 'sans catérogie' se crée dans le menu pour y ranger les items en question. En revanche, s'il n'existe aucune catégorie, alors bien sûr, il n'y a pas de création automatique de catégorie, puisqu'on y accèdera directement par le menu racine (à même 'peintures' ou 'sculptures').";

  return (
    <>
      <ItemListComponent
        type={TYPE.SCULPTURE}
        items={sculptures}
        categories={categories}
      />
      <ItemForm item={getEmptySculpture()} categories={categories} />
      <CategoryComponent type={TYPE.SCULPTURE} categories={categories} />
      <div style={{ margin: "0 20em" }}>{string1}</div>
    </>
  );
}
