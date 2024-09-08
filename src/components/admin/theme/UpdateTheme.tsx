"use client";

import React from "react";
import toast from "react-hot-toast";
import s from "@/styles/admin/AdminTheme.module.css";
import { Theme } from "@prisma/client";
import { THEME } from "@/constants/database";

interface Props {
  theme: Theme;
}
export default function UpdateTheme({ theme }: Props) {
  const name = theme.name;
  const isBaseTheme = name === THEME.BASE_THEME;

  const updateTheme = () => {
    fetch("admin/api/theme/update", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(theme),
    }).then((res) => {
      if (res.ok) {
        toast.success(`Thème "${name}" mis à jour`);
        setTimeout(function () {
          window.location.reload();
        }, 1500);
      } else toast.error("Erreur à l'enregistrement");
    });
  };

  return (
    <div className={s.themeActionContainer}>
      <button
        onClick={updateTheme}
        className={`${s.themeInput} "adminButton"`}
        disabled={isBaseTheme}
      >
        {`Mettre à jour "${name}"`}
      </button>
    </div>
  );
}
