"use client";

import AdminColor from "@/components/admin/theme/AdminColor";
import { useState } from "react";
import s from "../../../styles/admin/AdminThemeComponent.module.css";
import { ThemeFull } from "@/app/api/theme/theme";
import toast from "react-hot-toast";
import AdminPresetColor from "@/components/admin/theme/AdminPresetColor";

interface Props {
  theme: ThemeFull;
}

export default function AdminThemeComponent({ theme }: Props) {
  const [themeToUpdate, setThemeToUpdate] = useState<ThemeFull>(theme);

  const reset = () => {
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
        <div className={s.grid}>
          <section>
            <h2 className={s.subTitle}>Général</h2>
            <AdminColor
              theme={themeToUpdate}
              label="Couleur de la ligne au top"
              colorName="lineColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur de fond"
              colorName="backgroundColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du texte"
              colorName="color"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur des liens"
              colorName="linkColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur des liens hover"
              colorName="linkHoverColor"
            />
          </section>
          <section>
            <h2 className={s.subTitle}>Page Home</h2>
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du menu 1"
              colorName="menu1HomeColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du menu 2"
              colorName="menu2HomeColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du texte du menu 1"
              colorName="menu1LinkHomeColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du texte hover du menu 1"
              colorName="menu1LinkHomeHoverColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du texte du menu 2"
              colorName="menu2LinkHomeColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du texte hover du menu 2"
              colorName="menu2LinkHomeHoverColor"
            />
          </section>
          <section>
            <h2 className={s.subTitle}>Autres pages</h2>
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du menu 1"
              colorName="menu1Color"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du menu 2"
              colorName="menu2Color"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du texte du menu 1"
              colorName="menu1LinkColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du texte hover du menu 1"
              colorName="menu1LinkHoverColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du texte du menu 2"
              colorName="menu2LinkColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du texte hover du menu 2"
              colorName="menu2LinkHoverColor"
            />
          </section>
          <section>
            <h2 className={s.subTitle}>Pages des œuvres</h2>
            <AdminColor
              theme={themeToUpdate}
              label="Couleur de fond"
              colorName="backgroundColorItem"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du texte"
              colorName="colorItem"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur des liens"
              colorName="linkItemColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur des liens hover"
              colorName="linkHoverItemColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du menu 1"
              colorName="menu1ItemColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du menu 2"
              colorName="menu2ItemColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du texte du menu 1"
              colorName="menu1LinkItemColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du texte hover du menu 1"
              colorName="menu1LinkHoverItemColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du texte du menu 2"
              colorName="menu2LinkItemColor"
            />
            <AdminColor
              theme={themeToUpdate}
              label="Couleur du texte hover du menu 2"
              colorName="menu2LinkHoverItemColor"
            />
          </section>
        </div>
        <button onClick={reset} className="adminButton">
          Thème par défaut
        </button>
      </div>
      <div className={s.themeContainer}>
        <div className={s.grid}>
          <section>
            <h2 className={s.subTitle}>Couleurs mémorisées</h2>
            <AdminPresetColor presetColors={themeToUpdate.presetColors} />
          </section>
        </div>
      </div>
    </>
  );
}
