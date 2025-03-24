"use client";

import React from "react";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { Theme } from "@prisma/client";

export default function ThemeCancel() {
  const { workTheme, setWorkTheme, themes } = useAdminWorkThemeContext();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setWorkTheme(themes.find((t) => t.id === workTheme.id) as Theme);
      }}
      className="adminButton"
    >
      Annuler les changements
    </button>
  );
}
