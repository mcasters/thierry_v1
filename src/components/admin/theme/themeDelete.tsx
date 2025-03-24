"use client";

import React from "react";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { deleteTheme } from "@/app/actions/theme/admin";
import { useAlert } from "@/app/context/alertProvider";
import { THEME } from "@/constants/admin";
import { Theme } from "@prisma/client";

export default function ThemeDelete() {
  const { workTheme, setWorkTheme, themes } = useAdminWorkThemeContext();
  const alert = useAlert();

  return (
    <button
      disabled={workTheme.name === THEME.BASE_THEME}
      onClick={async () => {
        const res = await deleteTheme(workTheme.id);
        setWorkTheme(themes.find((t) => t.isActive) as Theme);
        alert(res.message, res.isError);
      }}
      className="adminButton"
    >
      Supprimer
    </button>
  );
}
