"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { PresetColor, Theme } from "@prisma/client";

export interface AdminContextType {
  workTheme: Theme;
  setWorkTheme: React.Dispatch<React.SetStateAction<Theme>>;
  presetColors: PresetColor[];
  setPresetColors: React.Dispatch<React.SetStateAction<PresetColor[]>>;
}

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

interface Props {
  defaultWorkTheme: Theme;
  defaultPresetColors: PresetColor[];
  children: ReactNode;
}

export function AdminProvider({
  children,
  defaultWorkTheme,
  defaultPresetColors,
}: Props) {
  const [workTheme, setWorkTheme] = useState<Theme>(defaultWorkTheme);
  const [presetColors, setPresetColors] =
    useState<PresetColor[]>(defaultPresetColors);

  return (
    <AdminContext.Provider
      value={{
        workTheme,
        setWorkTheme,
        presetColors,
        setPresetColors,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  return useContext(AdminContext);
}
