import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.boardPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("게시글 목록 조회 오류:", error);

    return NextResponse.json(
      { success: false, message: "게시글 목록 조회 실패" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { title, content, author, nickname } = body;

    if (!title || !content || !author) {
      return NextResponse.json(
        { success: false, message: "제목, 내용, 작성자는 필수입니다." },
        { status: 400 }
      );
    }

    const createdPost = await prisma.boardPost.create({
      data: {
        title,
        content,
        author,
        nickname: nickname || "",
      },
    });

    return NextResponse.json({
      success: true,
      data: createdPost,
    });
  } catch (error) {
    console.error("게시글 등록 오류:", error);

    return NextResponse.json(
      { success: false, message: "게시글 등록 실패" },
      { status: 500 }
    );
  }
}