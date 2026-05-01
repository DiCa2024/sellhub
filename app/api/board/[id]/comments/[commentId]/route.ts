import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> }
) {
  try {
    const { commentId } = await params;
    const body = await req.json();
    const { userEmail } = body;

    if (!userEmail) {
      return NextResponse.json(
        { success: false, message: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const comment = await prisma.blogComment.findUnique({
      where: {
        id: Number(commentId),
      },
    });

    if (!comment) {
      return NextResponse.json(
        { success: false, message: "댓글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (comment.name !== userEmail) {
      return NextResponse.json(
        { success: false, message: "본인 댓글만 삭제할 수 있습니다." },
        { status: 403 }
      );
    }

    await prisma.blogComment.delete({
      where: {
        id: Number(commentId),
      },
    });

    return NextResponse.json({
      success: true,
      message: "댓글이 삭제되었습니다.",
    });
  } catch (error) {
    console.error("댓글 삭제 오류:", error);

    return NextResponse.json(
      { success: false, message: "댓글 삭제 실패" },
      { status: 500 }
    );
  }
}