import ItemPage from "@/components/item/itemPage.tsx";
import { getCategory, getItemsByCategory } from "../../actions/item-post";
import { Type } from "@/lib/type";
import { Metadata } from "next";
import { getMetaMap } from "@/lib/utils/commonUtils";
import { getMetas } from "@/app/actions/meta";
import { META } from "@/constants/admin";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const categoryKey = (await params).category;
  const metas = getMetaMap(await getMetas());
  const category = await getCategory(categoryKey, Type.SCULPTURE);

  if (metas && category) {
    const text =
      category.value === "Sans catégorie"
        ? category.value
        : `Série ${category.value}`;
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

export default async function Page({ params }: Props) {
  const type = Type.SCULPTURE;
  const categoryKey = (await params).category;
  const category = await getCategory(categoryKey, type);
  const items = await getItemsByCategory(categoryKey, type);

  return (
    <>
      {category && (
        <ItemPage
          tag={category.value}
          category={category}
          items={items}
          type={type}
        />
      )}
    </>
  );
}
