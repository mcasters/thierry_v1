"use client";

import s from "@/components/admin/theme/adminTheme.module.css";
import React from "react";
import Modal from "@/components/admin/form/modal/modal";
import useModal from "@/components/admin/form/modal/useModal";
import { PresetColor } from "@prisma/client";
import DeleteIcon from "@/components/icons/deleteIcon";
import { useAlert } from "@/app/context/alertProvider";
import {
  deletePresetColor,
  updatePresetColor,
} from "@/app/actions/theme/admin";
import { BASE_PRESET_COLOR } from "@/constants/specific";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import PresetColorPicker from "@/components/admin/theme/presetColor/presetColorPicker";

interface Props {
  presetColor: PresetColor;
}

export default function PresetColorSwatch({ presetColor }: Props) {
  const { setThemes, presetColors, setPresetColors, workTheme, setWorkTheme } =
    useAdminWorkThemeContext();
  const { isOpen, toggle } = useModal();
  const alert = useAlert();

  const handleDelete = async () => {
    const { updatedPresetColors, updatedThemes, message, isError } =
      await deletePresetColor(presetColor.id);
    if (updatedThemes && updatedPresetColors) {
      setPresetColors(updatedPresetColors);
      setThemes(updatedThemes);
      const updatedWorkTheme = updatedThemes.find((t) => t.id === workTheme.id);
      setWorkTheme(updatedWorkTheme || updatedThemes[0]);
    }
    alert(message, isError);
  };

  const handleUpdate = async (color: string) => {
    const updatedPresetColor: PresetColor = {
      ...presetColor,
      color,
    } as PresetColor;
    const res = await updatePresetColor(updatedPresetColor);
    if (!res.isError) {
      const updatedPresetColors = presetColors.map((p) => {
        if (p.id === updatedPresetColor.id) return updatedPresetColor;
        else return p;
      });
      setPresetColors(updatedPresetColors);
      if (!res.isError) toggle();
    }
    alert(res.message, res.isError);
  };

  return (
    <div className={s.colorContainer}>
      <p className={s.label}>{presetColor.name}</p>
      <div className={s.colorPickerContainer}>
        <button
          className={`${s.swatch} ${s.isPresetColor} ${s.presetColor}`}
          style={{
            backgroundColor: presetColor.color,
          }}
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        />

        <Modal isOpen={isOpen} toggle={toggle}>
          <PresetColorPicker
            presetColor={presetColor}
            onUpdate={handleUpdate}
            onCancel={toggle}
          />
        </Modal>
      </div>
      <button
        className="iconButton"
        aria-label="Supprimer"
        onClick={handleDelete}
        disabled={presetColor.name === BASE_PRESET_COLOR.name}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
