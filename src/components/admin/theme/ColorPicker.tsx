"use client";

import { Theme } from "@prisma/client";
import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import React, { useEffect, useState } from "react";
import s from "@/styles/admin/AdminTheme.module.css";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useAdminContext } from "@/app/context/adminProvider";
import { OnlyString } from "@/app/api/theme/theme";
import { colorNameToHex } from "@/utils/commonUtils";
import ColorPickerPresetColor from "@/components/admin/theme/ColorPicketPresetColor";
import toast from "react-hot-toast";

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
  const [isToSave, setIsToSave] = useState<boolean>(false);
  const { workTheme, setWorkTheme, presetColors, setPresetColors } =
    useAdminContext();
  const [currentColor, setCurrentColor] = useState<string>(
    colorNameToHex(
      workTheme[colorLabel as keyof OnlyString<Theme>],
      presetColors,
    ),
  );
  const [currentColorName, setCurrentColorName] = useState<string>(
    workTheme[colorLabel as keyof OnlyString<Theme>],
  );
  const [isPresetColor, setIsPresetColor] = useState<boolean>(
    workTheme[colorLabel as keyof OnlyString<Theme>].charAt(0) !== "#",
  );

  useEffect(() => {
    if (!isToSave) {
      setIsToSave(true);
    }
  }, [currentColor]);

  // When close modal : save in workTheme
  useEffect(() => {
    if (!isOpen && isToSave) {
      const updatedWorkTheme = workTheme;
      if (isPresetColor) {
        updatedWorkTheme[colorLabel as keyof OnlyString<Theme>] =
          currentColorName;
        setWorkTheme(updatedWorkTheme);
      } else {
        updatedWorkTheme[colorLabel as keyof OnlyString<Theme>] = currentColor;
        setWorkTheme(updatedWorkTheme);
      }
      setIsToSave(false);
    }
  }, [isOpen]);

  // When user is changing workTheme or presetColors : realtime update
  useEffect(() => {
    const _currentColor = workTheme[colorLabel as keyof OnlyString<Theme>];
    setCurrentColor(colorNameToHex(_currentColor, presetColors));
    setCurrentColorName(_currentColor);
    setIsPresetColor(_currentColor.charAt(0) !== "#");
  }, [workTheme, presetColors]);

  const handleChange = (hex: string, name: string | undefined): void => {
    setCurrentColor(hex);
    setCurrentColorName(name ? name : hex);
    setIsPresetColor(!!name);
  };

  const savePresetColor = (colorName: string) => {
    const presetColorToSave = {
      name: colorName,
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
      .then((json) => {
        if (json.data) {
          const presetColor = json.data;
          setPresetColors([...presetColors, presetColor]);
          const updatedWorkTheme = workTheme;
          updatedWorkTheme[colorLabel as keyof OnlyString<Theme>] =
            presetColor.name;
          setWorkTheme(updatedWorkTheme);
          toast.success("Couleur perso enregistrée");
        } else toast.error(`Erreur à l'enregistrement`);
      });
  };

  return (
    <div key={label}>
      <div className={s.colorContainer}>
        <p className={s.label}>{label}</p>
        <div className={s.colorPickerContainer}>
          <button
            className={
              isOpen ? s.swatchOpen : isPresetColor ? s.swatchFocus : s.swatch
            }
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
                  onChange={(e) => handleChange(e, undefined)}
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
                  onChange={(e) => handleChange(e, undefined)}
                  prefixed={true}
                  className={s.halfWidth}
                />
              </div>
              <ColorPickerPresetColor
                colorLabel={colorLabel}
                onChange={handleChange}
                onSave={savePresetColor}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
