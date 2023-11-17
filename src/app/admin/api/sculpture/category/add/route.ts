import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";
import { transformValueToKey } from "@/utils/commonUtils";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const formData = await req.formData();
      const value = formData.get("text") as string;
      const key = transformValueToKey(value);

      await prisma.sculptureCategory.create({
        data: {
          key,
          value,
        },
      });
      return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
