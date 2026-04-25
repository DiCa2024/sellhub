import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🔥 수정
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    const body = await req.json();

    const updated = await prisma.wholesaleSite.update({
      where: { id: numericId },
      data: {
        category: body.category,
        name: body.name,
        region: body.region,
        imageUrl: body.imageUrl,
        tags: Array.isArray(body.tags)
          ? body.tags.join(",")
          : body.tags || "",
        website: body.website,
        dropshipping: body.dropshipping,
        businessRequired: body.businessRequired,
        usageFee: body.usageFee,
        imageProvided: body.imageProvided,
        shortDescription: body.shortDescription,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("도매 수정 오류:", error);

    return NextResponse.json(
      { success: false, message: "수정 실패" },
      { status: 500 }
    );
  }
}

// 🔥 삭제
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    await prisma.wholesaleSite.delete({
      where: { id: numericId },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("도매 삭제 오류:", error);

    return NextResponse.json(
      { success: false, message: "삭제 실패" },
      { status: 500 }
    );
  }
}