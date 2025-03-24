import { ReactNode } from "react";
import s from "@/components/admin/admin.module.css";
import { AdminWorkThemeProvider } from "@/app/context/adminWorkThemeProvider";
import { getPresetColors, getThemesFull } from "@/app/actions/theme";

export default async function layout({ children }: { children: ReactNode }) {
  const themes = await getThemesFull();
  const presetColors = await getPresetColors();

  return (
    <AdminWorkThemeProvider
      defaultThemes={themes}
      defaultPresetColors={presetColors}
    >
      <div className={s.adminWrapper}>{children}</div>
    </AdminWorkThemeProvider>
  );
}
