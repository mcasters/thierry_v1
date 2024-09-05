"use client";

import { HexColorInput, HexColorPicker } from "react-colorful";
import React, { useCallback, useState } from "react";

import "./colorPicker.css";
import s from "./AdminThemeComponent.module.css";
import useOnClickOutside from "@/components/hooks/useOnClickOutside";
import toast from "react-hot-toast";
import { ThemeFull } from "@/app/api/theme/theme";
import CancelButton from "@/components/admin/form/CancelButton";

interface Props {
  theme: ThemeFull;
  label: string;
  colorName: string;
}

export default function AdminColor({ theme, label, colorName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState<string | any>(
    theme[colorName as keyof ThemeFull],
  );
  const [currentName, setCurrentName] = useState<string>("");

  const close = useCallback(() => setIsOpen(false), []);
  const ref = useOnClickOutside(close);

  const savePresetColor = () => {
    const presetColor = {
      themeId: theme.id,
      name: currentName,
      color: currentColor,
    };
    fetch("admin/api/theme/add-color", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(presetColor),
    }).then((res) => {
      if (res.ok) {
        toast.success("Couleur enregistrée");
      } else toast.error("Erreur à l'enregistrement");
    });
  };

  const submit = () => {
    const updatedTheme = Object.assign({}, theme, {
      [colorName]: currentColor,
    });
    fetch("admin/api/theme/update", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTheme),
    }).then((res) => {
      if (res.ok) {
        toast.success("Thème enregistré");
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else toast.error("Erreur à l'enregistrement");
    });
  };

  return (
    <div className={s.colorContainer}>
      <p className={s.label}>{label}</p>
      <div className={`${s.colorPickerContainer} colorPicker`}>
        <div
          className={s.swatch}
          // @ts-ignore
          style={{ backgroundColor: theme[colorName as keyof ThemeFull] }}
          onClick={() => setIsOpen(true)}
        />
        {isOpen && (
          <div className={s.popup} ref={ref}>
            <HexColorPicker color={currentColor} onChange={setCurrentColor} />
            <p>Couleur sélectionnée :</p>
            <div>
              <div
                className={s.halfWidth}
                style={{
                  backgroundColor: currentColor,
                }}
              ></div>
              <HexColorInput
                color={currentColor}
                onChange={setCurrentColor}
                prefixed={true}
                className={s.halfWidth}
              />
            </div>
            <div className={s.presetColorForm}>
              <input
                className={s.halfWidth}
                placeholder="Nom de la couleur"
                value={currentName}
                onChange={(e) => setCurrentName(e.target.value)}
              />
              <button
                className={`${s.halfWidth} adminButton`}
                disabled={currentName === ""}
                onClick={(e) => {
                  e.preventDefault();
                  savePresetColor();
                }}
              >
                Mémoriser la couleur
              </button>
            </div>
            <div className={s.pickerSwatches}>
              {theme.presetColors.map((presetColor) => (
                <div key={presetColor.name} className={s.presetColorContainer}>
                  <button
                    className={s.pickerSwatch}
                    style={{
                      background: presetColor.color,
                    }}
                    onClick={() => setCurrentColor(presetColor.color)}
                  />
                  <p className={s.colorName}>{presetColor.name}</p>
                </div>
              ))}
            </div>
            <button onClick={submit} className="adminButton">
              Enregistrer
            </button>
            <CancelButton />
          </div>
        )}
      </div>
    </div>
  );
}
