"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import s from "@/styles/admin/Admin.module.css";
import SubmitButton from "@/components/admin/form/SubmitButton";
import CancelButton from "@/components/admin/form/CancelButton";
import { Theme } from "@prisma/client";

interface Props {
  newTheme: Theme;
  api: string;
  label: string;
  textLabel: string;
}
export default function AddTheme({ newTheme, api, label, textLabel }: Props) {
  const [themeName, setThemeName] = useState<string>("");
  const [isChanged, setIsChanged] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const themeToMemorize = Object.assign({}, newTheme, {
      id: 0,
      name: themeName,
    });
    if (confirm("Tu confirmes ?")) {
      fetch(api, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(themeToMemorize),
      }).then((res) => {
        if (res.ok) {
          toast.success("Thème sauvegardé");
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        } else toast.error("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <div className={s.formContainer}>
      <form onSubmit={submit}>
        <label className={s.contentLabel}>
          {textLabel}
          <input
            placeholder={label}
            name="text"
            type="text"
            value={themeName}
            onChange={(e) => {
              setThemeName(e.target.value);
              setIsChanged(true);
            }}
          />
        </label>
        {isChanged && (
          <>
            <SubmitButton />
            <CancelButton />
          </>
        )}
      </form>
    </div>
  );
}
