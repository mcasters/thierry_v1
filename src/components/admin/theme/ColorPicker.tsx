"use client";

import { Theme } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import s from "@/components/admin/theme/adminTheme.module.css";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { colorNameToHex } from "@/utils/commonUtils";
import { useAlert } from "@/app/context/alertProvider";
import { createPresetColor } from "@/app/actions/theme/admin";

interface Props {
  label: string;
  color: string;
  onClose: () => void;
  colorLabel: string;
  pageTypeName: string;
}

export default function ColorPicker({
  label, // what is displayed
  color,
  onClose,
  colorLabel,
  pageTypeName,
}: Props) {
  const { workTheme, setWorkTheme, presetColors, setPresetColors } =
    useAdminWorkThemeContext();
  const alert = useAlert();
  const isPresetColor = !color.startsWith("#");
  const hexColor = colorNameToHex(color, presetColors);
  const colorRef = useRef("");
  const [_nameColor, set_nameColor] = useState<string>("");
  const [isColorChanged, setIsColorChanged] = useState<boolean>(false);

  useEffect(() => {
    colorRef.current = color;
  }, []);

  useEffect(() => {
    set_nameColor(isPresetColor ? color : "");
  }, [workTheme]);

  const handleCreatePresetColor = async () => {
    const res = await createPresetColor(_nameColor, hexColor);
    if (res.newPresetColor) {
      setPresetColors([...presetColors, res.newPresetColor]);
      setWorkTheme({ ...workTheme, [colorLabel]: _nameColor } as Theme);
    }
    alert(res.message, res.isError);
  };

  const handleColorChange = (color: string) => {
    setWorkTheme({
      ...workTheme,
      [colorLabel]: color,
    } as Theme);
    if (color.startsWith("#")) {
      set_nameColor("");
      setIsColorChanged(true);
    } else setIsColorChanged(false);
  };

  return (
    <div className={s.colorPicker}>
      <h2>{pageTypeName} :</h2>
      <p className={s.subtitle}>{label}</p>
      <div className={s.picker}>
        <HexColorPicker
          color={hexColor}
          onChange={handleColorChange}
          style={{ width: "250px" }}
        />
      </div>
      <p>Couleur sélectionnée (notation hexadécimale) :</p>
      <div>
        <div
          className={s.halfWidth}
          style={{ backgroundColor: hexColor }}
        ></div>
        <HexColorInput
          color={hexColor}
          onChange={handleColorChange}
          prefixed={true}
          className={s.halfWidth}
        />
      </div>
      <div className={s.presetColorForm}>
        <input
          className={s.halfWidth}
          placeholder="Nom de la couleur"
          value={_nameColor}
          onChange={(e) => set_nameColor(e.target.value)}
        />
        <button
          onClick={handleCreatePresetColor}
          className={s.halfWidth}
          disabled={
            _nameColor === "" ||
            _nameColor === color ||
            (!isColorChanged && isPresetColor)
          }
        >
          Mémoriser la couleur
        </button>
      </div>
      <div className={s.pickerSwatches}>
        {presetColors?.map((p) => (
          <div key={p.id} className={s.presetColorContainer}>
            <button
              className={
                p.name === color ? `${s.swatch} ${s.isPresetColor}` : s.swatch
              }
              style={{
                background: p.color,
              }}
              onClick={() => handleColorChange(p.name)}
            />
            <p>{p.name}</p>
          </div>
        ))}
      </div>
      <button className={s.halfWidth} onClick={onClose}>
        OK
      </button>
      <button
        onClick={() => {
          setWorkTheme({
            ...workTheme,
            [colorLabel]: colorRef.current,
          } as Theme);
          onClose();
        }}
        className={s.halfWidth}
      >
        Annuler
      </button>
    </div>
  );
}
