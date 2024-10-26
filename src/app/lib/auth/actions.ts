"use server";

import { removeCookie, setCookie } from "@/app/lib/auth/lib";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

export async function loginAction(prevState, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) return { message: "Erreur d'authentification" };
  const res = await bcrypt.compare(password, user.password);
  if (!res) return { message: "Erreur d'authentification" };

  await setCookie(user);
  redirect("/admin");
  return { message: "Authentification" };
}

export async function logoutAction() {
  await removeCookie();
  redirect("/");
}
