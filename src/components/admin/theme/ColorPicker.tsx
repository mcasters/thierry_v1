"use client";

import { Theme } from "@prisma/client";
import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import React, { useEffect, useState } from "react";
import s from "@/styles/admin/AdminTheme.module.css";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { OnlyString } from "@/app/api/theme/theme";
import { colorNameToHex } from "@/utils/commonUtils";
import ColorPickerPresetColor from "@/components/admin/theme/ColorPicketPresetPart";
import toast from "react-hot-toast";
import { useAdminPresetColorsContext } from "@/app/context/adminPresetColorsProvider";

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
  console.log("Enter");
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const { presetColors, setPresetColors } = useAdminPresetColorsContext();
  const { isOpen, toggle } = useModal();
  const [isToSave, setIsToSave] = useState<boolean>(false);

  const [color, setColor] = useState<string>(
    colorNameToHex(
      workTheme[colorLabel as keyof OnlyString<Theme>],
      presetColors,
    ),
  );
  const [colorName, setColorName] = useState<string>(
    workTheme[colorLabel as keyof OnlyString<Theme>],
  );
  const [isPresetColor, setIsPresetColor] = useState<boolean>(
    workTheme[colorLabel as keyof OnlyString<Theme>].charAt(0) !== "#",
  );

  useEffect(() => {
    if (!isToSave) {
      setIsToSave(true);
    }
  }, [color]);

  // When close modal : save in workTheme
  useEffect(() => {
    if (!isOpen && isToSave) {
      const updatedWorkTheme = workTheme;
      updatedWorkTheme[colorLabel as keyof OnlyString<Theme>] = isPresetColor
        ? colorName
        : color;
      setWorkTheme(updatedWorkTheme);
      setIsToSave(false);
    }
  }, [isOpen]);

  // When user is changing workTheme : realtime update
  useEffect(() => {
    const _color = workTheme[colorLabel as keyof OnlyString<Theme>];
    setColor(colorNameToHex(_color, presetColors));
    setColorName(_color);
    setIsPresetColor(_color.charAt(0) !== "#");
  }, [workTheme]);

  // When user is changing presetColors : realtime update
  useEffect(() => {
    if (isPresetColor) {
      setColor(colorNameToHex(colorName, presetColors));
    }
  }, [presetColors]);

  const handleChange = (hex: string, name: string | undefined): void => {
    setColor(hex);
    setColorName(name ? name : hex);
    setIsPresetColor(!!name);
  };

  const savePresetColor = (colorName: string) => {
    fetch("admin/api/theme/preset-color/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: colorName,
        color: color,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        const updatedPresetColors = json.updatedPresetColors;
        if (updatedPresetColors) {
          setPresetColors(updatedPresetColors);
          handleChange(color, colorName);
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
              backgroundColor: color,
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
                  color={color}
                  onChange={(e) => handleChange(e, undefined)}
                />
              </div>
              <p>Couleur sélectionnée (notation hexadécimale) :</p>
              <div>
                <div
                  className={s.halfWidth}
                  style={{
                    backgroundColor: color,
                  }}
                ></div>
                <HexColorInput
                  color={color}
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
