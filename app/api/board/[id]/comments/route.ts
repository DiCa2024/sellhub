import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const comments = await prisma.blogComment.findMany({
      where: {
        blogId: Number(id),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error("댓글 조회 실패:", error);

    return NextResponse.json(
      { success: false, message: "댓글 조회 실패" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { text, name } = body;

    if (!text) {
      return NextResponse.json(
        { success: false, message: "내용 입력 필요" },
        { status: 400 }
      );
    }

    const comment = await prisma.blogComment.create({
      data: {
        blogId: Number(id),
        text,
        name: name || "회원",
      },
    });

    return NextResponse.json({
      success: true,
      data: comment,
    });
  } catch (error) {
    console.error("댓글 작성 실패:", error);

    return NextResponse.json(
      { success: false, message: "댓글 작성 실패" },
      { status: 500 }
    );
  }
}