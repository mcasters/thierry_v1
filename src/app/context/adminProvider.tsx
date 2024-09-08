"use client";
import React, { createContext, useContext, useState } from "react";
import { Theme } from "@prisma/client";

export interface AdminContextType {
  workTheme: Theme;
  setWorkTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [workTheme, setWorkTheme] = useState<Theme>({} as Theme);
  return (
    <AdminContext.Provider value={{ workTheme, setWorkTheme }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  return useContext(AdminContext);
}
