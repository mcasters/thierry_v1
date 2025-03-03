import React, { ReactNode } from "react";
import s from "@/styles/ItemPage.module.css";
import { Metadata } from "next";
import { getMetaMap } from "@/utils/commonUtils";
import { getMetas } from "@/app/actions/meta";
import { META } from "@/constants/specific";

const metas = getMetaMap(await getMetas());

export const metadata: Metadata = {
  title: metas.get(META.DOCUMENT_TITLE_PRESENTATION),
  description: metas.get(META.DESCRIPTION_PRESENTATION),
  openGraph: {
    title: metas.get(META.DOCUMENT_TITLE_PRESENTATION),
    description: metas.get(META.DESCRIPTION_PRESENTATION),
    url: metas.get(META.URL),
    siteName: metas.get(META.SEO_SITE_TITLE),
    locale: "fr",
    type: "website",
  },
};

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <div className={s.container}>
      <h1 className="hidden">Présentation</h1>
      {children}
    </div>
  );
}
