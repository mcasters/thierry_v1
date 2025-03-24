"use client";

import React from "react";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { Theme } from "@prisma/client";
import { activateTheme } from "@/app/actions/theme/admin";
import { useAlert } from "@/app/context/alertProvider";

export default function ThemeActivate() {
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const alert = useAlert();

  return (
    <button
      onClick={async () => {
        setWorkTheme({ ...workTheme, isActive: true } as Theme);
        const res = await activateTheme(workTheme.id);
        alert(res.message, res.isError);
      }}
      className="adminButton"
    >
      Activer
    </button>
  );
}
