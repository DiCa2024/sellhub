import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🔹 수정 (PATCH)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    const body = await req.json();

    const updated = await prisma.salesChannel.update({
      where: { id: numericId },
      data: {
        name: body.name,
        imageUrl: body.imageUrl,
        region: body.region,
        category: body.category,
        settlementDate: body.settlementDate,
        website: body.website,
        shortDescription: body.shortDescription,
        feeTable: body.feeTable,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("수정 오류:", error);

    return NextResponse.json(
      { success: false, message: "수정 실패" },
      { status: 500 }
    );
  }
}

// 🔹 삭제 (DELETE)
 export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    await prisma.salesChannel.delete({
     where: { id: numericId },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("삭제 오류:", error);

    return NextResponse.json(
      { success: false, message: "삭제 실패" },
      { status: 500 }
    );
  }
}