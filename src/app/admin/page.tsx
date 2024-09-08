import { unstable_noStore as noStore } from "next/cache";
import AdminThemeComponent from "@/components/admin/theme/AdminThemeComponent";
import {
  getActiveTheme,
  getPresetColors,
  getThemesFull,
} from "@/app/api/theme/getTheme";
import { AdminProvider } from "@/app/context/adminProvider";

export default async function AdminIndex() {
  noStore();
  const themes = await getThemesFull();
  const activeTheme = await getActiveTheme();
  const presetColors = await getPresetColors();

  return (
    <AdminProvider>
      <AdminThemeComponent
        themes={themes}
        activeTheme={activeTheme}
        presetColors={presetColors}
      />
    </AdminProvider>
  );
}
