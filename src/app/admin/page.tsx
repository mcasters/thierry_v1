import AdminThemeComponent from "@/components/admin/theme/AdminThemeComponent";
import { getPresetColors, getThemesFull } from "@/app/api/theme/getTheme";
import { AdminProvider } from "@/app/context/adminProvider";
import { getActivatedBaseTheme } from "@/lib/db/theme";

export const dynamic = "force-dynamic";

export default async function AdminIndex() {
  const themes = await getThemesFull();
  let activeTheme = themes.filter((t) => t.isActive)[0];
  if (!activeTheme) activeTheme = await getActivatedBaseTheme();
  const presetColors = await getPresetColors();

  return (
    <AdminProvider
      defaultWorkTheme={activeTheme}
      defaultPresetColors={presetColors}
    >
      <AdminThemeComponent themes={themes} activeTheme={activeTheme} />
    </AdminProvider>
  );
}
