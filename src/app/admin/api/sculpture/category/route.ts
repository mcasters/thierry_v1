import { NextResponse } from "next/server";
import { getSculptureCategoriesFull } from "@/app/api/sculpture/category/getCategories";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  if (session) {
    const res = await getSculptureCategoriesFull();
    return NextResponse.json({ res });
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
