import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    if (!Number.isInteger(numericId)) {
      return NextResponse.json(
        { success: false, message: "잘못된 게시글 ID입니다." },
        { status: 400 }
      );
    }

    const post = await prisma.boardPost.findUnique({
      where: {
        id: numericId,
      },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: "게시글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const updatedPost = await prisma.boardPost.update({
      where: {
        id: numericId,
      },
      data: {
        views: (post.views || 0) + 1,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    console.error("조회수 증가 오류:", error);

    return NextResponse.json(
      { success: false, message: "조회수 증가 실패" },
      { status: 500 }
    );
  }
}