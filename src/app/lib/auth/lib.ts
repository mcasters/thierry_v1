"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { User } from ".prisma/client";

const secretKey = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("4h")
    .sign(key);
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function setCookie(user: User) {
  const expires = new Date(Date.now() + 60 * 60 * 4 * 1000); // 4h
  const session = await encrypt({ user, expires });

  const cookieStore = await cookies();
  cookieStore.set("adminSession", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires,
    path: "/",
  });
}

export async function removeCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("adminSession");
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("adminSession")?.value;
  return session ? await decrypt(session) : null;
}

export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("adminSession")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 60 * 60 * 4 * 1000); // 4h
  const res = NextResponse.next();
  res.cookies.set({
    name: "adminSession",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
