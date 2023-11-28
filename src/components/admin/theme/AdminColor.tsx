"use client";

import { HexColorInput, HexColorPicker } from "react-colorful";
import { useCallback, useState } from "react";

import "./colorPicker.css";
import s from "./AdminThemeComponent.module.css";
import useOnClickOutside from "@/components/hooks/useOnClickOutside";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PresetColorLight } from "@/app/api/theme/theme";

interface Props {
  label: string;
  color: string;
  setColor: (arg0: string) => void;
  presetColors: PresetColorLight[];
  themeId: number;
}

export default function AdminColor({
  label,
  color,
  setColor,
  presetColors,
  themeId,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);
  const [currentName, setCurrentName] = useState("");

  const router = useRouter();
  const close = useCallback(() => setIsOpen(false), []);
  const ref = useOnClickOutside(close);

  const savePresetColor = () => {
    const presetColor = {
      themeId,
      name: currentName,
      color: currentColor,
    };
    fetch("admin/api/theme/add-color", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ presetColor }),
    }).then((res) => {
      if (res.ok) {
        toast("Couleur enregistrée");
        router.refresh();
      } else toast("Erreur à l'enregistrement");
    });
  };

  return (
    <div className={s.colorContainer}>
      <p className={s.label}>{label}</p>
      <div className={`${s.colorPickerContainer} colorPicker`}>
        <div
          className={s.swatch}
          style={{ backgroundColor: color }}
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
              {presetColors.map((presetColor) => (
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
            <button
              className={`${s.halfWidth} adminButton`}
              onClick={(e) => {
                e.preventDefault();
                setColor(currentColor);
                close();
              }}
            >
              OK
            </button>
            <button
              className={`${s.halfWidth} adminButton`}
              onClick={(e) => {
                e.preventDefault();
                close();
              }}
            >
              Annuler
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
