"use client";

import AdminColor from "@/components/admin/theme/AdminColor";
import React, { useEffect, useState } from "react";
import s from "../../../styles/admin/AdminThemeComponent.module.css";
import toast from "react-hot-toast";
import AdminPresetColor from "@/components/admin/theme/AdminPresetColor";
import AddTheme from "@/components/admin/theme/AddTheme";
import { PresetColor, Theme } from "@prisma/client";
import { THEME } from "@/constants/database";

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
  const [selectedThemeId, setSelectedThemeId] = useState<string>(
    activeTheme?.id.toString(),
  );
  const [selectedTheme, setSelectedTheme] = useState<Theme>(activeTheme);

  useEffect(() => {
    const newSelectedTheme = themes.find(
      (t) => t.id.toString() === selectedThemeId,
    );

    if (newSelectedTheme) {
      setSelectedTheme(newSelectedTheme);
    }
  }, [selectedThemeId, themes]);

  const activateTheme = () => {
    fetch(`admin/api/theme/activate/${selectedThemeId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        toast.success(`Thème "${selectedTheme.name}" actif`);
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else toast.error("Erreur à la mise en place du thème actif");
    });
  };

  const DeleteTheme = () => {
    if (confirm("Tu confirmes ?")) {
      fetch(`admin/api/theme/delete/${selectedThemeId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Thème supprimé");
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          }
        })
        .catch((err) => toast.error(`Erreur : ${err}`));
    }
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
        <h2 className={s.subTitle}>Liste des thèmes :</h2>
        <select
          name="name"
          value={selectedThemeId}
          onChange={(e) => setSelectedThemeId(e.target.value)}
        >
          {themes.map((t: Theme) => (
            <option key={t.id} value={t.id}>
              {`${t.name} ${t.isActive ? "(ACTIF)" : ""}`}
            </option>
          ))}
        </select>
        <button onClick={activateTheme} className="adminButton">
          Activer
        </button>
        <button
          disabled={selectedTheme?.name === THEME.DEFAULT}
          onClick={DeleteTheme}
          className="adminButton"
        >
          Supprimer
        </button>
      </div>
      <div className={s.themeContainer}>
        <div className={s.grid}>
          <section>
            <h3 className={s.sectionTitle}>Général</h3>

            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur de la ligne au top"
              colorName="lineColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur de fond"
              colorName="backgroundColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du texte"
              colorName="color"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur des liens"
              colorName="linkColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur des liens hover"
              colorName="linkHoverColor"
            />
          </section>
          <section>
            <h3 className={s.sectionTitle}>Page Home</h3>
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du menu 1"
              colorName="menu1HomeColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du menu 2"
              colorName="menu2HomeColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du texte du menu 1"
              colorName="menu1LinkHomeColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du texte hover du menu 1"
              colorName="menu1LinkHomeHoverColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du texte du menu 2"
              colorName="menu2LinkHomeColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du texte hover du menu 2"
              colorName="menu2LinkHomeHoverColor"
            />
          </section>
          <section>
            <h3 className={s.sectionTitle}>Autres pages</h3>
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du menu 1"
              colorName="menu1Color"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du menu 2"
              colorName="menu2Color"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du texte du menu 1"
              colorName="menu1LinkColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du texte hover du menu 1"
              colorName="menu1LinkHoverColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du texte du menu 2"
              colorName="menu2LinkColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du texte hover du menu 2"
              colorName="menu2LinkHoverColor"
            />
          </section>
          <section>
            <h3 className={s.sectionTitle}>Pages des œuvres</h3>
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur de fond"
              colorName="backgroundColorItem"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du texte"
              colorName="colorItem"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur des liens"
              colorName="linkItemColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur des liens hover"
              colorName="linkHoverItemColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du menu 1"
              colorName="menu1ItemColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du menu 2"
              colorName="menu2ItemColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du texte du menu 1"
              colorName="menu1LinkItemColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du texte hover du menu 1"
              colorName="menu1LinkHoverItemColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
              presetColors={presetColors}
              label="Couleur du texte du menu 2"
              colorName="menu2LinkItemColor"
            />
            <AdminColor
              selectedTheme={selectedTheme}
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
          newTheme={selectedTheme}
          api="admin/api/theme/add"
          label="Nom du thème"
          textLabel="Mémoriser le thème sous un nom"
        />
        <button onClick={resetDefaultTheme} className="adminButton">
          Réinitialiser le thème par défaut
        </button>
      </div>
    </>
  );
}
