"use client";

import { PresetColor, Theme } from "@prisma/client";
import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import s from "@/styles/admin/AdminTheme.module.css";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  selectedTheme: Theme;
  label: string;
  colorName: string;
  pageTypeName: string;
  presetColors: PresetColor[];
}

export default function ColorPickers({
  selectedTheme,
  label,
  colorName,
  pageTypeName,
  presetColors,
}: Props) {
  const { isOpen, toggle } = useModal();
  const [currentColor, setCurrentColor] = useState<string | any>(
    selectedTheme[colorName as keyof Theme],
  );
  const [currentName, setCurrentName] = useState<string>("");

  useEffect(() => {
    if (selectedTheme) setCurrentColor(selectedTheme[colorName as keyof Theme]);
  }, [selectedTheme]);

  const savePresetColor = () => {
    const presetColor = {
      name: currentName,
      color: currentColor,
    };
    fetch("admin/api/theme/add-preset-color", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(presetColor),
    }).then((res) => {
      if (res.ok) {
        toast.success("Couleur mémorisée");
      } else toast.error("Erreur à l'enregistrement");
    });
  };

  const saveColor = () => {
    const updatedTheme = Object.assign({}, selectedTheme, {
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
        toast.success("Couleur enregistrée dans le thème");
        toggle();
      } else toast.error("Erreur à l'enregistrement");
    });
  };

  return (
    <>
      <div className={s.colorContainer}>
        <p className={s.label}>{label}</p>
        <div className={s.colorPickerContainer}>
          <button
            className={s.swatch}
            style={{
              backgroundColor: currentColor,
            }}
            onClick={(e) => {
              e.preventDefault();
              toggle();
            }}
          />
          <Modal isOpen={isOpen} toggle={toggle}>
            <div className={s.colorPicker}>
              <h3>
                {pageTypeName} : {label}
              </h3>
              <div className={s.picker}>
                <HexColorPicker
                  color={currentColor}
                  onChange={setCurrentColor}
                />
              </div>
              <p>Couleur sélectionnée (notation hexadécimale) :</p>
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
                  <div
                    key={presetColor.name}
                    className={s.presetColorContainer}
                  >
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
              <button onClick={saveColor} className="adminButton">
                Enregistrer
              </button>
              <button className="adminButton" onClick={toggle}>
                Annuler
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
