"use client";

import React, { useEffect, useState } from "react";
import themeStyle from "../../../styles/admin/AdminTheme.module.css";
import toast from "react-hot-toast";
import ThemeAdd from "@/components/admin/theme/ThemeAdd";
import { Theme } from "@prisma/client";
import { THEME } from "@/constants/database";
import ThemeDashboard from "@/components/admin/theme/ThemeDashboard";
import { useAdminContext } from "@/app/context/adminProvider";
import ThemeUpdate from "@/components/admin/theme/ThemeUpdate";
import { NOTES } from "@/constants/admin";
import CancelButton from "@/components/admin/form/CancelButton";

interface Props {
  themes: Theme[];
}

export default function AdminThemeComponent({ themes }: Props) {
  const { workTheme, setWorkTheme } = useAdminContext();
  const [selectedThemeId, setSelectedThemeId] = useState<string>(
    workTheme.id.toString(),
  );

  useEffect(() => {
    const selectedTheme = themes.find(
      (t) => t.id.toString() === selectedThemeId,
    );
    if (selectedTheme) setWorkTheme({ ...selectedTheme });
  }, [selectedThemeId]);

  const activateTheme = () => {
    fetch(`admin/api/theme/activate/${selectedThemeId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        toast.success(`Thème "${workTheme.name}" actif`);
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
            toast.success(`Thème "${workTheme.name}" supprimé`);
            setTimeout(function () {
              window.location.reload();
            }, 1500);
          }
        })
        .catch((err) => toast.error(`Erreur : ${err}`));
    }
  };

  const handleCancel = () => {
    const themeBeforeChange = themes.find(
      (t) => t.id.toString() === selectedThemeId,
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
        <ThemeDashboard />
      </div>
      <div className={themeStyle.themeActionContainer}>
        <ThemeUpdate theme={workTheme} />
        <CancelButton onCancel={handleCancel} text="Annuler les changements" />
      </div>
      <div className={themeStyle.themeActionContainer}>
        <ThemeAdd newTheme={workTheme} />
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
