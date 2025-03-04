import ItemTagComponent from "@/components/item/ItemTagComponent";
import s from "@/styles/ItemPage.module.css";
import { getSession } from "@/app/lib/auth";
import { getCategory, getItemsByCategory } from "@/app/actions/items";
import { Type } from "@/lib/type";
import { Metadata } from "next";
import { getMetaMap } from "@/utils/commonUtils";
import { getMetas } from "@/app/actions/meta";
import { META } from "@/constants/specific";

export async function generateMetadata({ params }): Promise<Metadata> {
  const metas = getMetaMap(await getMetas());
  const session = await getSession();
  const categoryKey = (await params).category;
  const category = await getCategory(categoryKey, Type.PAINTING, !session);

  if (metas && category) {
    const text =
      category.value === "Sans catégorie"
        ? category.value
        : `Catégorie ${category.value}`;
    return {
      title: `${metas.get(META.DOCUMENT_TITLE_SCULPTURE)} - ${text}`,
      description: `${metas.get(META.DESCRIPTION_SCULPTURE)} - ${text}`,
      openGraph: {
        title: `${metas.get(META.DOCUMENT_TITLE_SCULPTURE)} - ${text}`,
        description: `${metas.get(META.DESCRIPTION_SCULPTURE)} - ${text}`,
        url: metas.get(META.URL),
        siteName: metas.get(META.SEO_SITE_TITLE),
        locale: "fr",
        type: "website",
      },
    };
  }
}

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const categoryKey = (await params).category;
  const session = await getSession();
  const category = await getCategory(categoryKey, Type.SCULPTURE, !session);
  const items = await getItemsByCategory(categoryKey, Type.SCULPTURE, !session);

  return (
    <div className={s.sculptureContent}>
      {category && (
        <ItemTagComponent
          tag={category.value}
          category={category}
          items={items}
        />
      )}
    </div>
  );
}
