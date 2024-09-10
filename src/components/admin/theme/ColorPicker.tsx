"use client";

import { Theme } from "@prisma/client";
import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import s from "@/styles/admin/AdminTheme.module.css";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useAdminContext } from "@/app/context/adminProvider";
import { OnlyString } from "@/app/api/theme/theme";
import { colorNameToHex } from "@/utils/commonUtils";

interface Props {
  label: string;
  colorLabel: string;
  pageTypeName: string;
}

export default function ColorPicker({
  label,
  colorLabel,
  pageTypeName,
}: Props) {
  const { isOpen, toggle } = useModal();
  const { workTheme, setWorkTheme, presetColors, setPresetColors } =
    useAdminContext();
  const [currentColorName, setCurrentColorName] = useState<string>("");
  const [currentColorHex, setCurrentColorHex] = useState<string>("");
  const [isPresetColor, setIsPresetColor] = useState<boolean>(false);
  const [presetColorNameToSave, setPresetColorNameToSave] =
    useState<string>("");
  const [presetColorColorName, setPresetColorColorName] = useState<string>(
    workTheme[colorLabel as keyof OnlyString<Theme>],
  );

  useEffect(() => {
    if (!isOpen) setPresetColorNameToSave("");
  }, [isOpen]);

  // When selecting theme
  useEffect(() => {
    const _currentColorName = workTheme[colorLabel as keyof OnlyString<Theme>];
    setCurrentColorName(_currentColorName);
    setCurrentColorHex(colorNameToHex(_currentColorName, presetColors));
    setIsPresetColor(_currentColorName.charAt(0) !== "#");
  }, [workTheme]);

  // When changing color
  useEffect(() => {
    const updatedTheme = workTheme;
    if (isPresetColor) {
      updatedTheme[colorLabel as keyof OnlyString<Theme>] = currentColorName;
      setWorkTheme(updatedTheme);
    } else {
      updatedTheme[colorLabel as keyof OnlyString<Theme>] = currentColorHex;
      setWorkTheme(updatedTheme);
    }
  }, [currentColorHex]);

  const handleChangeInHex = (value: string): void => {
    setIsPresetColor(false);
    setCurrentColorHex(value);
    setCurrentColorName(value);
  };

  const handleChangeInPresetColor = (hex: string, name: string): void => {
    setIsPresetColor(true);
    setCurrentColorHex(hex);
    setCurrentColorName(name);
  };

  const savePresetColor = () => {
    const presetColorToSave = {
      name: presetColorNameToSave,
      color: currentColorName,
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
              backgroundColor: currentColorHex,
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
                  color={currentColorHex}
                  onChange={handleChangeInHex}
                />
              </div>
              <p>Couleur sélectionnée (notation hexadécimale) :</p>
              <div>
                <div
                  className={s.halfWidth}
                  style={{
                    backgroundColor: currentColorHex,
                  }}
                ></div>
                <HexColorInput
                  color={currentColorHex}
                  onChange={handleChangeInHex}
                  prefixed={true}
                  className={s.halfWidth}
                />
              </div>
              <form className={s.presetColorForm}>
                <input
                  className={s.halfWidth}
                  placeholder="Nom de la couleur"
                  value={presetColorNameToSave}
                  onChange={(e) => setPresetColorNameToSave(e.target.value)}
                />
                <button
                  className={`${s.halfWidth} adminButton`}
                  disabled={presetColorNameToSave === ""}
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
                    className={
                      isPresetColor && presetColor.name === currentColorName
                        ? s.presetColorContainerFocus
                        : s.presetColorContainer
                    }
                  >
                    <button
                      className={s.pickerSwatch}
                      style={{
                        background: presetColor.color,
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleChangeInPresetColor(
                          presetColor.color,
                          presetColor.name,
                        );
                      }}
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
