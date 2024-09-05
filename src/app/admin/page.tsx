import AdminThemeComponent from "@/components/admin/theme/AdminThemeComponent";
import { getThemeFull } from "@/app/api/theme/getTheme";

export default async function AdminIndex() {
  const themeFull = await getThemeFull();

  return <AdminThemeComponent theme={themeFull} />;
}
