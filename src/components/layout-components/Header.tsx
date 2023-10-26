"use client";

import { PaintingCategory, SculptureCategory } from "@prisma/client";
import useElementIsUpTo from "@/components/hooks/useElementIsUpTo";
import LAYOUT from "@/constants/layout";
import Nav_1 from "./Nav_1";
import Nav_2 from "@/components/layout-components/Nav_2";
import s from "../../styles/Header.module.css";
import { GENERAL } from "@/constants";
import { BASE_PATH } from "@/constants/routes";

interface Props {
  basePath: string;
  introduction?: string;
  paintingCategories: PaintingCategory[];
  sculptureCategories: SculptureCategory[];
}
export default function Header({
  basePath,
  introduction,
  paintingCategories,
  sculptureCategories,
}: Props) {
  const { isUpTo: titleDisappear, ref: titleRef } = useElementIsUpTo(
    LAYOUT.LINE_HEIGHT,
  );
  const { isUpTo: introDisappear, ref: introRef } = useElementIsUpTo(
    LAYOUT.NAV_1_HEIGHT + LAYOUT.LINE_HEIGHT,
  );
  const isHome = basePath === BASE_PATH.HOME;
  const isPainting = basePath === BASE_PATH.PAINTING;
  const isSculpture = basePath === BASE_PATH.SCULPTURE;

  const navType =
    isSculpture || isPainting
      ? LAYOUT.ITEM_NAV
      : isHome && !titleDisappear
      ? LAYOUT.HOME_NAV
      : isHome && titleDisappear
      ? LAYOUT.HOME_NAV_FIX
      : LAYOUT.NAV;

  return (
    <header className={s.container}>
      {isHome && (
        <div ref={titleRef}>
          <h1 className={s.title}>{GENERAL.SITE_TITLE}</h1>
        </div>
      )}
      <Nav_1
        navType={navType}
        basePath={basePath}
        paintingCategories={paintingCategories}
        sculptureCategories={sculptureCategories}
      />
      <div
        style={{
          display: titleDisappear ? "block" : "none",
          height: LAYOUT.NAV_1_HEIGHT,
        }}
      />
      {isHome && introduction && (
        <div ref={introRef} className={s.intro}>
          <p>{introduction}</p>
        </div>
      )}
      <Nav_2 navType={navType} />
      <div
        className={s.spaceNav2}
        style={{
          display: introDisappear ? "block" : "none",
          height: LAYOUT.NAV_2_HEIGHT,
        }}
      />
    </header>
  );
}
