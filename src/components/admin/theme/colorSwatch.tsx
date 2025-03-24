"use client";

import { Theme } from "@prisma/client";
import useModal from "@/components/admin/form/modal/useModal";
import React, { useEffect, useRef } from "react";
import s from "@/components/admin/theme/adminTheme.module.css";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { colorNameToHex } from "@/utils/commonUtils";
import { OnlyString } from "@/lib/type";
import ColorPicker from "@/components/admin/theme/colorPicker";
import Modal from "@/components/admin/form/modal/modal";
import { createPresetColor } from "@/app/actions/theme/admin";
import { useAlert } from "@/app/context/alertProvider";

interface Props {
  label: string;
  dbLabel: string;
  pageTypeName: string;
}

export default function ColorSwatch({
  label, // what is displayed
  dbLabel,
  pageTypeName,
}: Props) {
  const { workTheme, setWorkTheme, presetColors, setPresetColors } =
    useAdminWorkThemeContext();
  const alert = useAlert();
  const { isOpen, toggle } = useModal();
  const colorRef = useRef("");
  const color: string = workTheme[dbLabel as keyof OnlyString<Theme>];
  const isPresetColor = !color.startsWith("#");
  const hexColor = colorNameToHex(color, presetColors);

  useEffect(() => {
    colorRef.current = color;
  }, []);

  const handleColorChange = (color: string) => {
    setWorkTheme({
      ...workTheme,
      [dbLabel]: color,
    } as Theme);
  };

  const handleCreatePresetColor = async (
    nameColor: string,
    hexColor: string,
  ) => {
    const res = await createPresetColor(nameColor, hexColor);
    if (res.newPresetColor) {
      setPresetColors([...presetColors, res.newPresetColor]);
      setWorkTheme({ ...workTheme, [dbLabel]: nameColor } as Theme);
    }
    alert(res.message, res.isError);
  };

  const handleCancel = () => {
    setWorkTheme({
      ...workTheme,
      [dbLabel]: colorRef.current,
    } as Theme);
    toggle();
  };

  return (
    <div className={s.colorContainer}>
      <div className={s.colorPickerContainer}>
        <button
          className={
            isOpen
              ? `${s.swatch} ${s.open}`
              : isPresetColor
                ? `${s.swatch} ${s.isPresetColor}`
                : s.swatch
          }
          style={{
            backgroundColor: hexColor,
          }}
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        />
        <Modal isOpen={isOpen} toggle={toggle}>
          <ColorPicker
            color={color}
            onColorChange={handleColorChange}
            onCreatePresetColor={handleCreatePresetColor}
            onClose={toggle}
            onCancel={handleCancel}
            title={`${pageTypeName} : ${label}`}
          />
        </Modal>
      </div>
      <p className={s.label}>{label}</p>
    </div>
  );
}
