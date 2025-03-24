"use client";

import React from "react";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { useAlert } from "@/app/context/alertProvider";
import { THEME } from "@/constants/admin";
import { updateTheme } from "@/app/actions/theme/admin";

export default function ThemeUpdate() {
  const { workTheme, themes, setThemes } = useAdminWorkThemeContext();
  const alert = useAlert();

  return (
    <button
      onClick={async () => {
        const res = await updateTheme(workTheme);
        if (!res.isError) {
          const updatedThemes = themes.map((t) => {
            if (t.id === workTheme.id) return workTheme;
            else return t;
          });
          setThemes(updatedThemes);
        }
        alert(res.message, res.isError);
      }}
      className="adminButton"
      disabled={workTheme.name === THEME.BASE_THEME}
    >
      {`Sauvegarder le thème "${workTheme.name}"`}
    </button>
  );
}
