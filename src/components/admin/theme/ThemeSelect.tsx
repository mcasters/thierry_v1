"use client";

import React from "react";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { Theme } from "@prisma/client";

export default function ThemeSelect() {
  const { workTheme, setWorkTheme, themes } = useAdminWorkThemeContext();

  return (
    <select
      name="name"
      value={workTheme.id}
      onChange={(e) => {
        setWorkTheme(
          themes.find((t) => t.id?.toString() === e.target.value) as Theme,
        );
      }}
    >
      {themes &&
        themes.map((t: Theme) => (
          <option key={t.id} value={t.id}>
            {`${t.name} ${t.isActive ? `(ACTIF)` : ""}`}
          </option>
        ))}
    </select>
  );
}
