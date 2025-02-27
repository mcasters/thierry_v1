"use client";

import React from "react";
import { Message, PresetColor, Theme } from "@prisma/client";
import Messages from "@/components/admin/messages";
import AdminTheme from "@/components/admin/theme/AdminTheme";

type Props = {
  themes: Theme[];
  presetColors: PresetColor[];
  messages: Message[];
};

export default function AdminHome({ themes, presetColors, messages }: Props) {
  return (
    <>
      <AdminTheme themes={themes} presetColors={presetColors} />
      <Messages dbMessages={messages} />
    </>
  );
}
