import ItemTagComponent from "@/components/item/ItemTagComponent";
import s from "@/styles/ItemPage.module.css";
import { getSession } from "@/app/lib/auth";
import { getItemsByYear } from "@/app/actions/items";
import { Type } from "@/lib/type";
import { Metadata } from "next";
import { getMetaMap } from "@/utils/commonUtils";
import { getMetas } from "@/app/actions/meta";
import { META } from "@/constants/specific";

export async function generateMetadata({ params }): Promise<Metadata> {
  const metas = getMetaMap(await getMetas());
  const year = (await params).year;
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

type Props = {
  params: Promise<{ year: string }>;
};

export default async function Page({ params }: Props) {
  const year = (await params).year;
  const session = await getSession();
  const items = await getItemsByYear(year, Type.SCULPTURE, !session);

  return (
    <div className={s.sculptureContent}>
      <ItemTagComponent tag={year} items={items} />
    </div>
  );
}
