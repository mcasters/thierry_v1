"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import s from "@/styles/admin/AdminTheme.module.css";
import SubmitButton from "@/components/admin/form/SubmitButton";
import { Theme } from "@prisma/client";

interface Props {
  newTheme: Theme;
}
export default function ThemeAdd({ newTheme }: Props) {
  const [themeName, setThemeName] = useState<string>("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const themeToSave = Object.assign({}, newTheme, {
      name: themeName,
    });
    if (confirm("Tu confirmes ?")) {
      fetch("admin/api/theme/add", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(themeToSave),
      }).then((res) => {
        if (res.ok) {
          toast.success(`Thème "${themeName}" sauvegardé`);
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        } else toast.error("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <form onSubmit={submit} className={s.themeActionContainer}>
      <input
        required
        className={s.themeInput}
        placeholder="Nom du nouveau thème"
        name="text"
        type="text"
        value={themeName}
        onChange={(e) => {
          setThemeName(e.target.value);
        }}
      />
      <SubmitButton text="Mémoriser le thème" />
    </form>
  );
}
