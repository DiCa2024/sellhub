import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const post = await prisma.boardPost.findUnique({
      where: {
        id: Number(id),
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
        id: Number(id),
      },
      data: {
        views: post.views + 1,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    console.error("게시글 상세 조회 오류:", error);

    return NextResponse.json(
      { success: false, message: "게시글 상세 조회 실패" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.boardPost.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "게시글이 삭제되었습니다.",
    });
  } catch (error) {
    console.error("게시글 삭제 오류:", error);

    return NextResponse.json(
      { success: false, message: "게시글 삭제 실패" },
      { status: 500 }
    );
  }
}