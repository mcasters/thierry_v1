"use client";

import s from "@/styles/admin/AdminTheme.module.css";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "@react-icons/all-files/fi/FiTrash2";
import { useAdminContext } from "@/app/context/adminProvider";
import { HexColorInput, HexColorPicker } from "react-colorful";
import Modal from "@/components/admin/form/modal/Modal";
import useModal from "@/components/admin/form/modal/useModal";
import { PresetColor, Theme } from "@prisma/client";

interface Props {
  presetColor: PresetColor;
}

export default function PresetColorPicker({ presetColor }: Props) {
  const { isOpen, toggle } = useModal();
  const { workTheme, setWorkTheme, presetColors, setPresetColors } =
    useAdminContext();
  const [currentColor, setCurrentColor] = useState<string>(presetColor.color);
  const [isToSave, setIsToSave] = useState<boolean>(false);

  useEffect(() => {
    const newPresetColors = presetColors.map((p) => {
      if (p.name === presetColor.name)
        return { id: p.id, name: p.name, color: currentColor };
      else return p;
    });
    setPresetColors(newPresetColors);
  }, [currentColor]);

  useEffect(() => {
    if (!isToSave) {
      setIsToSave(true);
    }
  }, [currentColor]);

  useEffect(() => {
    if (!isOpen && isToSave) {
      updatePresetColor();
      setIsToSave(false);
    }
  }, [isOpen]);

  const remove = (id: number) => {
    if (confirm("Sûr de vouloir supprimer ?")) {
      fetch(`admin/api/theme/preset-color/delete/${id}`)
        .then((res) => res.json())
        .then((json) => {
          const updatedThemes: Theme[] = json.updatedThemes;
          const updatedPresetColors: PresetColor[] = json.updatedPresetColors;
          if (updatedThemes && updatedPresetColors) {
            setWorkTheme(
              updatedThemes.filter((t) => t.name === workTheme.name)[0],
            );
            setPresetColors(updatedPresetColors);
            toast.success("Couleur perso supprimée");
          } else toast.error("Erreur à la suppression");
        });
    }
  };

  const updatePresetColor = () => {
    const presetColorToSave = {
      id: presetColor.id,
      color: currentColor,
    };
    fetch("admin/api/theme/preset-color/update", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(presetColorToSave),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          toast.success("Couleur perso mise à jour");
          const presetColorsUpdated = presetColors.map((p) =>
            p.id === presetColor.id ? presetColor : p,
          );
          setPresetColors(presetColorsUpdated);
        } else toast.error(`Erreur à l'enregistrement`);
      });
  };

  return (
    <div className={s.colorContainer}>
      <p className={s.label}>{presetColor.name}</p>
      <div className={s.colorPickerContainer}>
        <button
          className={`${s.swatch} ${s.presetColor}`}
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
            <h3>Modification : {presetColor.name}</h3>
            <p>(s'appliquera à toutes les couleurs perso du thème)</p>
            <div className={s.picker}>
              <HexColorPicker color={currentColor} onChange={setCurrentColor} />
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
          </div>
        </Modal>
      </div>
      <button
        className="iconButton"
        aria-label="Supprimer"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          remove(presetColor.id);
        }}
      >
        <FiTrash2 />
      </button>
    </div>
  );
}
