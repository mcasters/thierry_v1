"use client";

import ColorPicker from "@/components/admin/theme/ColorPicker";
import React from "react";
import s from "../../../styles/admin/AdminTheme.module.css";
import PresetColorDashboard from "@/components/admin/theme/PresetColorDashboard";
import { PAGE_TYPE } from "@/constants/admin";

export default function ThemeDashboard() {
  return (
    <div className={s.grid}>
      <section>
        <h3 className={s.sectionTitle}>{PAGE_TYPE.GENERAL}</h3>
        <ColorPicker
          label="Couleur de la ligne au top"
          colorLabel="lineColor"
          pageTypeName={PAGE_TYPE.GENERAL}
        />
        <ColorPicker
          label="Couleur de fond"
          colorLabel="backgroundColor"
          pageTypeName={PAGE_TYPE.GENERAL}
        />
        <ColorPicker
          label="Couleur du texte"
          colorLabel="color"
          pageTypeName={PAGE_TYPE.GENERAL}
        />
        <ColorPicker
          label="Couleur des liens"
          colorLabel="linkColor"
          pageTypeName={PAGE_TYPE.GENERAL}
        />
        <ColorPicker
          label="Couleur des liens hover"
          colorLabel="linkHoverColor"
          pageTypeName={PAGE_TYPE.GENERAL}
        />
      </section>
      <section>
        <h3 className={s.sectionTitle}>{PAGE_TYPE.HOME}</h3>
        <ColorPicker
          label="Couleur du menu 1"
          colorLabel="menu1HomeColor"
          pageTypeName={PAGE_TYPE.HOME}
        />
        <ColorPicker
          label="Couleur du menu 2"
          colorLabel="menu2HomeColor"
          pageTypeName={PAGE_TYPE.HOME}
        />
        <ColorPicker
          label="Couleur du texte du menu 1"
          colorLabel="menu1LinkHomeColor"
          pageTypeName={PAGE_TYPE.HOME}
        />
        <ColorPicker
          label="Couleur du texte hover du menu 1"
          colorLabel="menu1LinkHomeHoverColor"
          pageTypeName={PAGE_TYPE.HOME}
        />
        <ColorPicker
          label="Couleur du texte du menu 2"
          colorLabel="menu2LinkHomeColor"
          pageTypeName={PAGE_TYPE.HOME}
        />
        <ColorPicker
          label="Couleur du texte hover du menu 2"
          colorLabel="menu2LinkHomeHoverColor"
          pageTypeName={PAGE_TYPE.HOME}
        />
      </section>
      <section>
        <h3 className={s.sectionTitle}>{PAGE_TYPE.OTHERS}</h3>
        <ColorPicker
          label="Couleur du menu 1"
          colorLabel="menu1Color"
          pageTypeName={PAGE_TYPE.OTHERS}
        />
        <ColorPicker
          label="Couleur du menu 2"
          colorLabel="menu2Color"
          pageTypeName={PAGE_TYPE.OTHERS}
        />
        <ColorPicker
          label="Couleur du texte du menu 1"
          colorLabel="menu1LinkColor"
          pageTypeName={PAGE_TYPE.OTHERS}
        />
        <ColorPicker
          label="Couleur du texte hover du menu 1"
          colorLabel="menu1LinkHoverColor"
          pageTypeName={PAGE_TYPE.OTHERS}
        />
        <ColorPicker
          label="Couleur du texte du menu 2"
          colorLabel="menu2LinkColor"
          pageTypeName={PAGE_TYPE.OTHERS}
        />
        <ColorPicker
          label="Couleur du texte hover du menu 2"
          colorLabel="menu2LinkHoverColor"
          pageTypeName={PAGE_TYPE.OTHERS}
        />
      </section>
      <section>
        <h3 className={s.sectionTitle}>{PAGE_TYPE.ITEM}</h3>
        <ColorPicker
          label="Couleur de fond"
          colorLabel="backgroundColorItem"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          label="Couleur du texte"
          colorLabel="colorItem"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          label="Couleur des liens"
          colorLabel="linkItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          label="Couleur des liens hover"
          colorLabel="linkHoverItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          label="Couleur du menu 1"
          colorLabel="menu1ItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          label="Couleur du menu 2"
          colorLabel="menu2ItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          label="Couleur du texte du menu 1"
          colorLabel="menu1LinkItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          label="Couleur du texte hover du menu 1"
          colorLabel="menu1LinkHoverItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          label="Couleur du texte du menu 2"
          colorLabel="menu2LinkItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          label="Couleur du texte hover du menu 2"
          colorLabel="menu2LinkHoverItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
      </section>
      <section></section>
      <section>
        <h3 className={s.sectionTitle}>Couleurs mémorisées</h3>
        <PresetColorDashboard />
      </section>
    </div>
  );
}
