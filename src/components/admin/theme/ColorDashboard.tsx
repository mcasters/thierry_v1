"use client";

import ColorPicker from "@/components/admin/theme/ColorPicker";
import React from "react";
import s from "../../../styles/admin/AdminTheme.module.css";
import AdminPresetColor from "@/components/admin/theme/AdminPresetColor";
import { PresetColor, Theme } from "@prisma/client";
import { PAGE_TYPE } from "@/constants/admin";

interface Props {
  selectedTheme: Theme;
  presetColors: PresetColor[];
}

export default function ColorDashboard({ selectedTheme, presetColors }: Props) {
  return (
    <div className={s.grid}>
      <section>
        <h3 className={s.sectionTitle}>{PAGE_TYPE.GENERAL}</h3>
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur de la ligne au top"
          colorName="lineColor"
          pageTypeName={PAGE_TYPE.GENERAL}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur de fond"
          colorName="backgroundColor"
          pageTypeName={PAGE_TYPE.GENERAL}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du texte"
          colorName="color"
          pageTypeName={PAGE_TYPE.GENERAL}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur des liens"
          colorName="linkColor"
          pageTypeName={PAGE_TYPE.GENERAL}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur des liens hover"
          colorName="linkHoverColor"
          pageTypeName={PAGE_TYPE.GENERAL}
        />
      </section>
      <section>
        <h3 className={s.sectionTitle}>{PAGE_TYPE.HOME}</h3>
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du menu 1"
          colorName="menu1HomeColor"
          pageTypeName={PAGE_TYPE.HOME}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du menu 2"
          colorName="menu2HomeColor"
          pageTypeName={PAGE_TYPE.HOME}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du texte du menu 1"
          colorName="menu1LinkHomeColor"
          pageTypeName={PAGE_TYPE.HOME}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du texte hover du menu 1"
          colorName="menu1LinkHomeHoverColor"
          pageTypeName={PAGE_TYPE.HOME}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du texte du menu 2"
          colorName="menu2LinkHomeColor"
          pageTypeName={PAGE_TYPE.HOME}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du texte hover du menu 2"
          colorName="menu2LinkHomeHoverColor"
          pageTypeName={PAGE_TYPE.HOME}
        />
      </section>
      <section>
        <h3 className={s.sectionTitle}>{PAGE_TYPE.OTHERS}</h3>
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du menu 1"
          colorName="menu1Color"
          pageTypeName={PAGE_TYPE.OTHERS}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du menu 2"
          colorName="menu2Color"
          pageTypeName={PAGE_TYPE.OTHERS}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du texte du menu 1"
          colorName="menu1LinkColor"
          pageTypeName={PAGE_TYPE.OTHERS}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du texte hover du menu 1"
          colorName="menu1LinkHoverColor"
          pageTypeName={PAGE_TYPE.OTHERS}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du texte du menu 2"
          colorName="menu2LinkColor"
          pageTypeName={PAGE_TYPE.OTHERS}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du texte hover du menu 2"
          colorName="menu2LinkHoverColor"
          pageTypeName={PAGE_TYPE.OTHERS}
        />
      </section>
      <section>
        <h3 className={s.sectionTitle}>{PAGE_TYPE.ITEM}</h3>
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur de fond"
          colorName="backgroundColorItem"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du texte"
          colorName="colorItem"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur des liens"
          colorName="linkItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur des liens hover"
          colorName="linkHoverItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du menu 1"
          colorName="menu1ItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du menu 2"
          colorName="menu2ItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du texte du menu 1"
          colorName="menu1LinkItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du texte hover du menu 1"
          colorName="menu1LinkHoverItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du texte du menu 2"
          colorName="menu2LinkItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
        <ColorPicker
          selectedTheme={selectedTheme}
          presetColors={presetColors}
          label="Couleur du texte hover du menu 2"
          colorName="menu2LinkHoverItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
        />
      </section>
      <section></section>
      <section>
        <h3 className={s.sectionTitle}>Couleurs mémorisées</h3>
        <AdminPresetColor presetColors={presetColors} />
      </section>
    </div>
  );
}
