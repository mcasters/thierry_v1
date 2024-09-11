"use client";

import React from "react";
import { PresetColor } from "@prisma/client";
import { useAdminContext } from "@/app/context/adminProvider";
import PresetColorPicker from "@/components/admin/theme/PresetColorPicker";

export default function PresetColorDashboard() {
  const { presetColors } = useAdminContext();

  return presetColors.map((presetColor: PresetColor) => (
    <PresetColorPicker key={presetColor.id} presetColor={presetColor} />
  ));
}
