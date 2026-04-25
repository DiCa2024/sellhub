import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🔥 댓글 목록 조회
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blogId = Number(id);

    const comments = await prisma.blogComment.findMany({
      where: { blogId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error("댓글 조회 오류:", error);

    return NextResponse.json(
      { success: false, message: "댓글 조회 실패" },
      { status: 500 }
    );
  }
}

// 🔥 댓글 등록
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blogId = Number(id);

    const body = await req.json();

    const { name, text } = body;

    if (!name || !text) {
      return NextResponse.json(
        { success: false, message: "이름과 내용은 필수입니다." },
        { status: 400 }
      );
    }

    const created = await prisma.blogComment.create({
      data: {
        blogId,
        name,
        text,
      },
    });

    return NextResponse.json({
      success: true,
      data: created,
    });
  } catch (error) {
    console.error("댓글 등록 오류:", error);

    return NextResponse.json(
      { success: false, message: "댓글 등록 실패" },
      { status: 500 }
    );
  }
}