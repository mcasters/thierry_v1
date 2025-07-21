"use client";

import React from "react";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { useAlert } from "@/app/context/alertProvider";
import { THEME } from "@/constants/admin";
import { updateTheme } from "@/app/actions/theme/admin";

export default function ThemeUpdate() {
  const { workTheme, isChanged, setIsChanged, themes, setThemes } =
    useAdminWorkThemeContext();
  const alert = useAlert();

  const handleUpdate = async () => {
    const res = await updateTheme(workTheme);
    if (!res.isError) {
      const updatedThemes = themes.map((t) =>
        t.id === workTheme.id ? workTheme : t,
      );
      setThemes(updatedThemes);
      setIsChanged(true);
    }
    alert(res.message, res.isError);
  };

  return (
    <button
      onClick={handleUpdate}
      className="adminButton"
      disabled={workTheme.name === THEME.BASE_THEME || isChanged}
    >
      {`Sauvegarder le thème "${workTheme.name}"`}
    </button>
  );
}
