"use client";

import { Theme } from "@prisma/client";
import useModal from "@/components/admin/form/modal/useModal";
import React from "react";
import s from "@/components/admin/theme/adminTheme.module.css";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { colorNameToHex } from "@/utils/commonUtils";
import { OnlyString } from "@/lib/type";
import ColorPicker from "@/components/admin/theme/colorPicker";
import Modal from "@/components/admin/form/modal/modal";

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
  const { workTheme, presetColors } = useAdminWorkThemeContext();
  const { isOpen, toggle } = useModal();
  const color: string = workTheme[dbLabel as keyof OnlyString<Theme>];
  const isPresetColor = !color.startsWith("#");
  const hexColor = colorNameToHex(color, presetColors);

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
            label={label}
            color={color}
            onClose={toggle}
            colorLabel={dbLabel}
            pageTypeName={pageTypeName}
          />
        </Modal>
      </div>
      <p className={s.label}>{label}</p>
    </div>
  );
}
