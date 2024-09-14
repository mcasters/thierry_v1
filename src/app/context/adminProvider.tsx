"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { PresetColor, Theme } from "@prisma/client";

export interface AdminContextType {
  themes: Theme[];
  setThemes: React.Dispatch<React.SetStateAction<Theme[]>>;
  workTheme: Theme;
  setWorkTheme: React.Dispatch<React.SetStateAction<Theme>>;
  presetColors: PresetColor[];
  setPresetColors: React.Dispatch<React.SetStateAction<PresetColor[]>>;
}

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

interface Props {
  defaultThemes: Theme[];
  defaultWorkTheme: Theme;
  defaultPresetColors: PresetColor[];
  children: ReactNode;
}

export function AdminProvider({
  children,
  defaultThemes,
  defaultWorkTheme,
  defaultPresetColors,
}: Props) {
  const [themes, setThemes] = useState<Theme[]>(defaultThemes);
  const [workTheme, setWorkTheme] = useState<Theme>(defaultWorkTheme);
  const [presetColors, setPresetColors] =
    useState<PresetColor[]>(defaultPresetColors);

  return (
    <AdminContext.Provider
      value={{
        themes,
        setThemes,
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
