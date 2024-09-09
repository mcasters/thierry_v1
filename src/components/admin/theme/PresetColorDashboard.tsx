"use client";

import s from "../../../styles/admin/AdminTheme.module.css";
import React from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "@react-icons/all-files/fi/FiTrash2";
import { PresetColor } from "@prisma/client";
import { useAdminContext } from "@/app/context/adminProvider";

export default function PresetColorDashboard() {
  const { presetColors, setPresetColors } = useAdminContext();

  const remove = (id: number) => {
    if (confirm("Sûr de vouloir supprimer ?")) {
      fetch(`admin/api/theme/preset-color/delete/${id}`).then((res) => {
        if (res.ok) {
          const newPresetColors = presetColors.filter((p) => p.id !== id);
          setPresetColors(newPresetColors);
          toast.success("supprimé");
        } else toast.error("Erreur à la suppression");
      });
    }
  };

  return (
    <div>
      {presetColors.map((presetColor: PresetColor) => (
        <div className={s.colorContainer} key={presetColor.id}>
          <p className={s.label}>{presetColor.name}</p>
          <div
            className={`${s.swatch} ${s.presetColor}`}
            style={{ backgroundColor: presetColor.color }}
          />
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
      ))}
    </div>
  );
}
