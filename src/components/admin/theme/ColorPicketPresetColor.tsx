"use client";

import React, { useState } from "react";
import s from "@/styles/admin/AdminTheme.module.css";
import { useAdminContext } from "@/app/context/adminProvider";
import { OnlyString } from "@/app/api/theme/theme";
import { Theme } from "@prisma/client";

interface Props {
  colorLabel: string;
  onChange: (color: string, name: string) => void;
  onSave: (colorName: string) => void;
}

export default function ColorPickerPresetColor({
  colorLabel,
  onChange,
  onSave,
}: Props) {
  const { workTheme, presetColors } = useAdminContext();
  const [currentColor, setCurrentColor] = useState<string>(
    workTheme[colorLabel as keyof OnlyString<Theme>],
  );
  const [nameToSave, setNameToSave] = useState<string>("");

  const handleSave = () => {
    onSave(nameToSave);
    setCurrentColor(nameToSave);
    setNameToSave("");
  };
  return (
    <>
      <div className={s.presetColorForm}>
        <input
          className={s.halfWidth}
          placeholder="Nom de la couleur"
          value={nameToSave}
          onChange={(e) => setNameToSave(e.target.value)}
        />
        <button
          onClick={handleSave}
          className={`${s.halfWidth} adminButton`}
          disabled={nameToSave === ""}
        >
          Mémoriser la couleur
        </button>
      </div>
      <div className={s.pickerSwatches}>
        {presetColors.map((p) => (
          <div key={p.id} className={s.presetColorContainer}>
            <button
              className={p.name === currentColor ? s.swatchFocus : s.swatch}
              style={{
                background: p.color,
              }}
              onClick={(e) => {
                e.preventDefault();
                onChange(p.color, p.name);
                setCurrentColor(p.name);
              }}
            />
            <p className={s.colorName}>{p.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}