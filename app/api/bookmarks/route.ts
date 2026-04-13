export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { ok: false, message: "로그인이 필요합니다." },
      { status: 401 }
    );
  }

  const body = await req.json();
  const brandId = String(body.brandId ?? "").trim();

  if (!brandId) {
    return NextResponse.json(
      { ok: false, message: "brandId가 필요합니다." },
      { status: 400 }
    );
  }

  const existing = await prisma.bookmark.findUnique({
    where: {
      userId_brandId: {
        userId: user.id,
        brandId,
      },
    },
  });

  if (existing) {
    await prisma.bookmark.delete({
      where: {
        userId_brandId: {
          userId: user.id,
          brandId,
        },
      },
    });

    return NextResponse.json({ ok: true, bookmarked: false });
  }

  await prisma.bookmark.create({
    data: {
      userId: user.id,
      brandId,
    },
  });

  return NextResponse.json({ ok: true, bookmarked: true });
}