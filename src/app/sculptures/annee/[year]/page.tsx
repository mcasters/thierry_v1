import ItemsPage from "@/components/item/itemsPage.tsx";
import { Type } from "@/lib/type";
import { Metadata } from "next";
import { getMetaMap } from "@/utils/commonUtils";
import { getMetas } from "@/app/actions/meta";
import { META } from "@/constants/admin";
import { getItemsByYear } from "@/app/actions/item-post";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const { year } = await params;
  const metas = getMetaMap(await getMetas());
  if (metas) {
    return {
      title: `${metas.get(META.DOCUMENT_TITLE_SCULPTURE)} - Année ${year}`,
      description: `${metas.get(META.DESCRIPTION_SCULPTURE)} - Année ${year}`,
      openGraph: {
        title: `${metas.get(META.DOCUMENT_TITLE_SCULPTURE)} - Année ${year}`,
        description: `${metas.get(META.DESCRIPTION_SCULPTURE)} - Année ${year}`,
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
  const { year } = await params;
  const items = await getItemsByYear(year, type);

  return <ItemsPage tag={year} items={items} type={type} />;
}
