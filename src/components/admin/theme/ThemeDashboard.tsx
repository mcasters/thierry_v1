"use client";

import React from "react";
import s from "./adminTheme.module.css";
import { PAGE_TYPE, THEME_DATAS } from "@/constants/admin";
import ColorSwatch from "@/components/admin/theme/colorSwatch";

type Props = {
  isToUpdate: boolean;
};

export default function ThemeDashboard({ isToUpdate }: Props) {
  return (
    <div className={`${s.flex} ${isToUpdate ? s.toUpdate : ""}`}>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.GENERAL}</h4>
        {Object.entries(THEME_DATAS).map(
          ([dbLabel, { label, pageType }], i) => {
            if (pageType === PAGE_TYPE.GENERAL)
              return (
                <ColorSwatch
                  key={i}
                  label={label}
                  dbLabel={dbLabel}
                  pageTypeName={pageType}
                />
              );
          },
        )}
      </section>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.HOME}</h4>
        {Object.entries(THEME_DATAS).map(
          ([colorLabel, { label, pageType }], i) => {
            if (pageType === PAGE_TYPE.HOME)
              return (
                <ColorSwatch
                  key={i}
                  label={label}
                  dbLabel={colorLabel}
                  pageTypeName={pageType}
                />
              );
          },
        )}
      </section>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.OTHERS}</h4>
        {Object.entries(THEME_DATAS).map(
          ([colorLabel, { label, pageType }], i) => {
            if (pageType === PAGE_TYPE.OTHERS)
              return (
                <ColorSwatch
                  key={i}
                  label={label}
                  dbLabel={colorLabel}
                  pageTypeName={pageType}
                />
              );
          },
        )}
      </section>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.ITEM}</h4>
        {Object.entries(THEME_DATAS).map(
          ([colorLabel, { label, pageType }], i) => {
            if (pageType === PAGE_TYPE.ITEM)
              return (
                <ColorSwatch
                  key={i}
                  label={label}
                  dbLabel={colorLabel}
                  pageTypeName={pageType}
                />
              );
          },
        )}
      </section>
      <p>* lorsque la souris survole le texte</p>
      {isToUpdate && <span>Thème modifié (à sauvegarder)</span>}
    </div>
  );
}
