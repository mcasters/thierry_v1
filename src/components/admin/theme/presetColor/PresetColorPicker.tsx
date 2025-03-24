"use client";

import s from "@/components/admin/theme/adminTheme.module.css";
import React, { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
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

interface Props {
  presetColor: PresetColor;
}

export default function PresetColorPicker({ presetColor }: Props) {
  const { setThemes, presetColors, setPresetColors, workTheme, setWorkTheme } =
    useAdminWorkThemeContext();

  const { isOpen, toggle } = useModal();
  const alert = useAlert();
  const [color, setColor] = useState<string>(presetColor.color);

  const onDeletePresetColor = async () => {
    const res = await deletePresetColor(presetColor.id);
    if (res.updatedPresetColors && res.updatedThemes) {
      setPresetColors(res.updatedPresetColors);
      setThemes(res.updatedThemes);
      const updatedWorkTheme = res.updatedThemes.find(
        (t) => t.id === workTheme.id,
      );
      setWorkTheme(updatedWorkTheme);
    }
    alert(res.message, res.isError);
  };

  const onUpdatePresetColor = async () => {
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
            backgroundColor: color,
          }}
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        />

        <Modal isOpen={isOpen} toggle={toggle}>
          <div className={s.colorPicker}>
            <h3>Modification : {presetColor.name}</h3>
            <p>
              {`S'applique à toutes les utilisations de "${presetColor.name}"`}
            </p>
            <div className={s.picker}>
              <HexColorPicker color={color} onChange={setColor} />
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
                onChange={setColor}
                prefixed={true}
                className={s.halfWidth}
              />
            </div>
            <button className={s.halfWidth} onClick={onUpdatePresetColor}>
              OK
            </button>
            <button
              onClick={() => {
                setColor(presetColor.color);
                toggle();
              }}
              className={s.halfWidth}
            >
              Annuler
            </button>
          </div>
        </Modal>
      </div>
      <button
        className="iconButton"
        aria-label="Supprimer"
        onClick={onDeletePresetColor}
        disabled={presetColor.name === BASE_PRESET_COLOR.name}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
