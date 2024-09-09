"use client";

import { Theme } from "@prisma/client";
import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import s from "@/styles/admin/AdminTheme.module.css";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useAdminContext } from "@/app/context/adminProvider";

interface Props {
  label: string;
  colorName: string;
  pageTypeName: string;
}

type StringKeys<T> = {
  [k in keyof T]: T[k] extends string ? k : never;
}[keyof T];
type OnlyString<T> = { [k in StringKeys<T>]: boolean };

export default function ColorPicker({ label, colorName, pageTypeName }: Props) {
  const { isOpen, toggle } = useModal();
  const { workTheme, setWorkTheme, presetColors, setPresetColors } =
    useAdminContext();
  const [presetColorName, setPresetColorName] = useState<string>("");
  const [currentColor, setCurrentColor] = useState<string>(
    workTheme[colorName as keyof OnlyString<Theme>],
  );

  useEffect(() => {
    if (!isOpen) setPresetColorName("");
  }, [isOpen]);

  useEffect(() => {
    if (workTheme) {
      setCurrentColor(workTheme[colorName as keyof OnlyString<Theme>]);
    }
  }, [workTheme]);

  useEffect(() => {
    const updatedTheme = workTheme;
    updatedTheme[colorName as keyof OnlyString<Theme>] = currentColor;
    setWorkTheme(updatedTheme);
  }, [currentColor]);

  const savePresetColor = () => {
    const presetColorToSave = {
      name: presetColorName,
      color: currentColor,
    };
    fetch("admin/api/theme/preset-color/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(presetColorToSave),
    })
      .then((res) => res.json())
      .then((presetColor) => {
        setPresetColors([...presetColors, presetColor]);
        toast.success("Couleur mémorisée");
      })
      .catch((e) => {
        console.log(e);
        toast.error(`Erreur à l'enregistrement : ${e}`);
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
              <form className={s.presetColorForm}>
                <input
                  className={s.halfWidth}
                  placeholder="Nom de la couleur"
                  value={presetColorName}
                  onChange={(e) => setPresetColorName(e.target.value)}
                />
                <button
                  className={`${s.halfWidth} adminButton`}
                  disabled={presetColorName === ""}
                  onClick={(e) => {
                    e.preventDefault();
                    savePresetColor();
                  }}
                >
                  Mémoriser la couleur
                </button>
              </form>
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
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
