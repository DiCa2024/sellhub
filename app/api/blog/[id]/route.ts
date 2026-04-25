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

    const updated = await prisma.blog.update({
      where: { id: numericId },
      data: {
        title: body.title,
        category: body.category,
        excerpt: body.excerpt,
        content: body.content,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("블로그 수정 오류:", error);

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

    await prisma.blog.delete({
      where: { id: numericId },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("블로그 삭제 오류:", error);

    return NextResponse.json(
      { success: false, message: "삭제 실패" },
      { status: 500 }
    );
  }
}
// 🔥 상세 조회 + 조회수 증가
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    const post = await prisma.blog.update({
      where: { id: numericId },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("블로그 상세 조회 오류:", error);

    return NextResponse.json(
      { success: false, message: "조회 실패" },
      { status: 500 }
    );
  }
}