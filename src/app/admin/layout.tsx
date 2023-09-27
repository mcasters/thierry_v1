import AdminLayout from '@/components/layout-components/AdminLayout';

export default function layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
