"use client";

import React, { useEffect, useState } from "react";
import themeStyle from "../../../styles/admin/AdminTheme.module.css";
import toast from "react-hot-toast";
import ThemeAdd from "@/components/admin/theme/ThemeAdd";
import { Theme } from "@prisma/client";
import { THEME } from "@/constants/database";
import ThemeDashboard from "@/components/admin/theme/ThemeDashboard";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import ThemeUpdate from "@/components/admin/theme/ThemeUpdate";
import { NOTES } from "@/constants/admin";
import CancelButton from "@/components/admin/form/CancelButton";
import { useAdminThemesContext } from "@/app/context/adminThemesProvider";

/*
SelectedTheme is the set in the workTheme (context)
activatedTheme is the one who is displayed, and it is independent to the activated theme
 */
export default function AdminThemeRoot() {
  const { themes, setThemes } = useAdminThemesContext();
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();

  const [selectedThemeId, setSelectedThemeId] = useState<string>(
    workTheme.id.toString(),
  );

  useEffect(() => {
    setSelectedThemeId(workTheme.id.toString());
  }, [workTheme]);

  useEffect(() => {
    const selectedTheme = themes.find(
      (t: Theme) => t.id.toString() === selectedThemeId,
    );
    if (selectedTheme) {
      setWorkTheme({ ...selectedTheme });
    }
  }, [selectedThemeId]);

  const activateTheme = () => {
    fetch(`admin/api/theme/activate/${selectedThemeId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const activatedTheme = json.activatedTheme;
        if (activatedTheme) {
          toast.success(`Thème "${activatedTheme.name}" actif`);
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        } else toast.error("Erreur à l'activation du thème");
      });
  };

  const DeleteTheme = () => {
    if (
      confirm(
        `As-tu vraiment confiance ??? ... Plutôt que de supprimer le thème "${workTheme.name}", ça pourrait supprimer l'intégralité du contenu de ton ordinateur !`,
      )
    ) {
      fetch(`admin/api/theme/delete/${selectedThemeId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          const updatedThemes: Theme[] = json.updatedThemes;
          if (updatedThemes) {
            setThemes(updatedThemes);
            toast.success(`Thème "${workTheme.name}" supprimé`);
            if (workTheme.isActive) {
              setTimeout(function () {
                window.location.reload();
              }, 1500);
            } else {
              const activeTheme = updatedThemes.find((t: Theme) => t.isActive);
              if (activeTheme) setWorkTheme({ ...activeTheme });
            }
          } else toast.error("Erreur à la suppression du thème");
        });
    }
  };

  const handleCancel = () => {
    const themeBeforeChange = themes.find(
      (t: Theme) => t.id.toString() === selectedThemeId,
    );
    if (themeBeforeChange) setWorkTheme({ ...themeBeforeChange });
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
              {`${t.name} ${t.isActive ? `(ACTIF)` : ""}`}
            </option>
          ))}
        </select>
        <button onClick={activateTheme} className="adminButton">
          Activer
        </button>
        <button
          disabled={workTheme.name === THEME.BASE_THEME}
          onClick={DeleteTheme}
          className="adminButton"
        >
          Supprimer
        </button>
      </div>
      <div className={themeStyle.themeContainer}>
        <h2>Thème sélectionné :</h2>
        <ThemeDashboard />
      </div>
      <div className={themeStyle.themeActionContainer}>
        <ThemeUpdate />
        <CancelButton onCancel={handleCancel} text="Annuler les changements" />
      </div>
      <div className={themeStyle.themeActionContainer}>
        <ThemeAdd />
      </div>
      <div className={themeStyle.noteContainer}>
        <h2>NOTES</h2>
        <div>
          <h3>Images :</h3>
          <p>{NOTES.IMAGES}</p>
        </div>
        <br />
        <div>
          <h3>Thèmes :</h3>
          <p>{NOTES.THEMES}</p>
        </div>
        <br />
        <div>
          <h3>Peintures et sculptures :</h3>
          <p>{NOTES.ITEMS}</p>
        </div>
      </div>
    </>
  );
}
