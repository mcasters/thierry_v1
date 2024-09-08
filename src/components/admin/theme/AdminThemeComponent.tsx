"use client";

import React, { useEffect, useState } from "react";
import themeStyle from "../../../styles/admin/AdminTheme.module.css";
import toast from "react-hot-toast";
import AddTheme from "@/components/admin/theme/AddTheme";
import { PresetColor, Theme } from "@prisma/client";
import { THEME } from "@/constants/database";
import ColorDashboard from "@/components/admin/theme/ColorDashboard";
import { useAdminContext } from "@/app/context/adminProvider";
import UpdateTheme from "@/components/admin/theme/UpdateTheme";
import { NOTES } from "@/constants/admin";

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
  const { workTheme, setWorkTheme } = useAdminContext();

  useEffect(() => {
    const newSelectedTheme = themes.find(
      (t) => t.id.toString() === selectedThemeId,
    );

    if (newSelectedTheme) {
      setSelectedTheme(newSelectedTheme);
      setWorkTheme(newSelectedTheme);
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
        }, 1500);
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
            toast.success(`Thème "${selectedTheme.name}" supprimé`);
            setTimeout(function () {
              window.location.reload();
            }, 1500);
          }
        })
        .catch((err) => toast.error(`Erreur : ${err}`));
    }
  };

  return (
    <>
      <h1 className={themeStyle.pageTitle}>Gestion du thème</h1>
      <div className={themeStyle.themeContainer}>
        <h2>Liste des thèmes :</h2>
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
          disabled={selectedTheme?.name === THEME.BASE_THEME}
          onClick={DeleteTheme}
          className="adminButton"
        >
          Supprimer
        </button>
      </div>
      <div className={themeStyle.themeContainer}>
        <ColorDashboard
          selectedTheme={selectedTheme}
          presetColors={presetColors}
        />
      </div>
      <div className={themeStyle.themeActionContainer}>
        <UpdateTheme theme={workTheme} />
        <AddTheme newTheme={workTheme} />
      </div>
      <div className={themeStyle.noteContainer}>
        <h2>NOTES</h2>
        <div>
          <h3>Images :</h3>
          {NOTES.IMAGES}
        </div>
        <div>
          <h3>Thèmes :</h3>
          {NOTES.THEMES}
        </div>
        <div>
          <h3>Peintures et sculptures :</h3>
          {NOTES.ITEMS}
        </div>
      </div>
    </>
  );
}
