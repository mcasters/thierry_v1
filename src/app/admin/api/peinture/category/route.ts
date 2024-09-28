import { NextResponse } from "next/server";
import { getPaintingCategoriesFull } from "@/app/api/peinture/category/getCategories";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  if (session) {
    const res = await getPaintingCategoriesFull();
    return NextResponse.json({ res });
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
