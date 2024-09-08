import { ReactNode } from "react";

import AdminLayout from "@/components/layout-components/AdminLayout";
import { Metadata } from "next";
import { DESCRIPTION, DOCUMENT_TITLE } from "@/constants/metaHtml";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE.ADMIN,
  description: DESCRIPTION.ADMIN,
};

interface Props {
  children: ReactNode;
}

export default function layout({ children }: Props) {
  return <AdminLayout>{children}</AdminLayout>;
}
