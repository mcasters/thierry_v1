import { ReactNode } from "react";

import AdminLayout from "@/components/layout-components/AdminLayout";
import { Metadata } from "next";
import { DESCRIPTION, DOCUMENT_TITLE } from "@/constants/metaHtml";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE.ADMIN,
  description: DESCRIPTION.ADMIN,
};

export default function layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
