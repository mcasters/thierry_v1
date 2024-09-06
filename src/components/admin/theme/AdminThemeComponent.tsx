"use client";

import AdminColor from "@/components/admin/theme/AdminColor";
import React, { useState } from "react";
import s from "../../../styles/admin/AdminThemeComponent.module.css";
import toast from "react-hot-toast";
import AdminPresetColor from "@/components/admin/theme/AdminPresetColor";
import AddTheme from "@/components/admin/theme/AddTheme";
import { PresetColor, Theme } from "@prisma/client";

interface Props {
  themes: Theme[];
  activeTheme: Theme;
  presetColors: PresetColor[];
}

export default function AdminThemeComponent({
  themes,
  activeTheme,
  presetColors,
}: Props) {
  const [currentThemeId, setCurrentThemeId] = useState<string>(
    activeTheme.id.toString(),
  );

  const setActiveTheme = () => {
    fetch(`admin/api/theme/activate/${currentThemeId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        toast.success("Nouveau thème actif");
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else toast.error("Erreur à la mise en place du thème actif");
    });
  };

  const resetDefaultTheme = () => {
    fetch("admin/api/theme/reset", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        toast.success("Thème par défaut en place");
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else toast.error("Erreur à la mise en place du thème par défaut");
    });
  };

  return (
    <>
      <h1>Gestion du thème</h1>
      <div className={s.themeContainer}>
        <h2 className={s.subTitle}>Thème actif</h2>
        <select
          name="name"
          value={currentThemeId}
          onChange={(e) => setCurrentThemeId(e.target.value)}
        >
          {themes &&
            themes.map((t: Theme) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
        </select>
        <button onClick={setActiveTheme} className="adminButton">
          Activer
        </button>
      </div>
      <div className={s.themeContainer}>
        <div className={s.grid}>
          <section>
            <h3 className={s.sectionTitle}>Général</h3>

            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur de la ligne au top"
              colorName="lineColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur de fond"
              colorName="backgroundColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du texte"
              colorName="color"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur des liens"
              colorName="linkColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur des liens hover"
              colorName="linkHoverColor"
            />
          </section>
          <section>
            <h3 className={s.sectionTitle}>Page Home</h3>
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du menu 1"
              colorName="menu1HomeColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du menu 2"
              colorName="menu2HomeColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du texte du menu 1"
              colorName="menu1LinkHomeColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du texte hover du menu 1"
              colorName="menu1LinkHomeHoverColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du texte du menu 2"
              colorName="menu2LinkHomeColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du texte hover du menu 2"
              colorName="menu2LinkHomeHoverColor"
            />
          </section>
          <section>
            <h3 className={s.sectionTitle}>Autres pages</h3>
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du menu 1"
              colorName="menu1Color"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du menu 2"
              colorName="menu2Color"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du texte du menu 1"
              colorName="menu1LinkColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du texte hover du menu 1"
              colorName="menu1LinkHoverColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du texte du menu 2"
              colorName="menu2LinkColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du texte hover du menu 2"
              colorName="menu2LinkHoverColor"
            />
          </section>
          <section>
            <h3 className={s.sectionTitle}>Pages des œuvres</h3>
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur de fond"
              colorName="backgroundColorItem"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du texte"
              colorName="colorItem"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur des liens"
              colorName="linkItemColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur des liens hover"
              colorName="linkHoverItemColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du menu 1"
              colorName="menu1ItemColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du menu 2"
              colorName="menu2ItemColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du texte du menu 1"
              colorName="menu1LinkItemColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du texte hover du menu 1"
              colorName="menu1LinkHoverItemColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du texte du menu 2"
              colorName="menu2LinkItemColor"
            />
            <AdminColor
              currentTheme={activeTheme}
              presetColors={presetColors}
              label="Couleur du texte hover du menu 2"
              colorName="menu2LinkHoverItemColor"
            />
          </section>
          <section></section>
          <section>
            <h3 className={s.sectionTitle}>Couleurs mémorisées</h3>
            <AdminPresetColor presetColors={presetColors} />
          </section>
        </div>
      </div>
      <div className={s.themeContainer}>
        <AddTheme
          newTheme={activeTheme}
          api="admin/api/theme/add"
          label="Nom du thème"
          textLabel="Mémoriser le thème"
        />
        <button onClick={resetDefaultTheme} className="adminButton">
          Réinitialiser le thème par défaut
        </button>
      </div>
    </>
  );
}
