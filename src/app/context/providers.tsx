"use client";

import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import { ThemeProvider } from "@/app/context/themeProvider";
import { Theme } from "@prisma/client";
import { SessionProvider } from "@/app/context/sessionProvider";
import { Session } from "@/lib/db/item";

interface Props {
  session: Session | null;
  theme: Theme;
  children: ReactNode;
}

export default function Providers({ children, theme, session }: Props) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Toaster />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
