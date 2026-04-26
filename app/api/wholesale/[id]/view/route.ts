import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const updated = await prisma.wholesaleSite.update({
      where: { id: Number(id) },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("도매 조회수 증가 오류:", error);

    return NextResponse.json(
      { success: false, message: "조회수 증가 실패" },
      { status: 500 }
    );
  }
}