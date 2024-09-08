"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { Theme } from "@prisma/client";

const AdminContext = createContext<Theme>({} as Theme);

interface Props {
  children: ReactNode;
}

export function AdminProvider({ children }: Props) {
  const [workTheme, setWorkTheme] = useState({} as Theme);
  return (
    // @ts-ignore
    <AdminContext.Provider value={{ workTheme, setWorkTheme }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  return useContext(AdminContext);
}
