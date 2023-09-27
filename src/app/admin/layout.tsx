import { ReactNode } from 'react';

import AdminLayout from '@/components/layout-components/AdminLayout';

export default function layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
