export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(req: Request, { params }: Context) {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(
      { ok: false, message: "관리자만 가능합니다." },
      { status: 403 }
    );
  }

  const { id } = await params;
  const body = await req.json();
  const action = String(body.action ?? "");

  if (action !== "approve" && action !== "reject") {
    return NextResponse.json(
      { ok: false, message: "잘못된 요청입니다." },
      { status: 400 }
    );
  }

  const updated = await prisma.brand.update({
    where: { id },
    data: {
      status: action === "approve" ? "APPROVED" : "REJECTED",
    },
  });

  return NextResponse.json({ ok: true, brand: updated });
}