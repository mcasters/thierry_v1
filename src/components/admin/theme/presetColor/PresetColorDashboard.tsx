"use client";

import { PresetColor } from "@prisma/client";
import PresetColorPicker from "@/components/admin/theme/presetColor/presetColorPicker";
import s from "@/components/admin/theme/adminTheme.module.css";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";

export default function PresetColorDashboard() {
  const { presetColors } = useAdminWorkThemeContext();
  return (
    <div className={s.flex}>
      <section>
        {presetColors.map((presetColor: PresetColor) => (
          <PresetColorPicker key={presetColor.id} presetColor={presetColor} />
        ))}
      </section>
    </div>
  );
}
