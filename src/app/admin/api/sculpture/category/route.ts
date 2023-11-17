import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getSculptureCategoriesFull } from "@/app/api/sculpture/category/getCategories";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await getSculptureCategoriesFull();
    return NextResponse.json({ res });
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
