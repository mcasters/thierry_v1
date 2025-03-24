"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { PresetColor, Theme } from "@prisma/client";

export interface AdminWorkThemeContextType {
  workTheme: Theme;
  setWorkTheme: React.Dispatch<React.SetStateAction<Theme>>;
  themes: Theme[];
  setThemes: React.Dispatch<React.SetStateAction<Theme[]>>;
  presetColors: PresetColor[];
  setPresetColors: React.Dispatch<React.SetStateAction<PresetColor[]>>;
}

const AdminWorkThemeContext = createContext<AdminWorkThemeContextType>(
  {} as AdminWorkThemeContextType,
);

interface Props {
  defaultThemes: Theme[];
  defaultPresetColors: PresetColor[];
  children: ReactNode;
}

export function AdminWorkThemeProvider({
  defaultThemes,
  defaultPresetColors,
  children,
}: Props) {
  const [themes, setThemes] = useState<Theme[]>(defaultThemes);
  const activeTheme = themes.find((t) => t.isActive);
  const [workTheme, setWorkTheme] = useState<Theme>(activeTheme);
  const [presetColors, setPresetColors] =
    useState<PresetColor[]>(defaultPresetColors);

  return (
    <AdminWorkThemeContext.Provider
      value={{
        workTheme,
        setWorkTheme,
        themes,
        setThemes,
        presetColors,
        setPresetColors,
      }}
    >
      {children}
    </AdminWorkThemeContext.Provider>
  );
}

export function useAdminWorkThemeContext() {
  return useContext(AdminWorkThemeContext);
}
