import AdminThemeComponent from "@/components/admin/theme/AdminThemeComponent";
import {
  getActiveTheme,
  getPresetColors,
  getThemesFull,
} from "@/app/api/theme/getTheme";

export default async function AdminIndex() {
  const themes = await getThemesFull();
  const activeTheme = await getActiveTheme();
  const presetColors = await getPresetColors();

  return (
    <AdminThemeComponent
      themes={themes}
      activeTheme={activeTheme}
      presetColors={presetColors}
    />
  );
}
