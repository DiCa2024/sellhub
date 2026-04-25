import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🔥 블로그 목록 조회
export async function GET() {
  try {
    const posts = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("블로그 목록 조회 오류:", error);

    return NextResponse.json(
      { success: false, message: "블로그 목록 조회 실패" },
      { status: 500 }
    );
  }
}

// 🔥 블로그 등록
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { title, category, excerpt, content, imageUrl } = body;

    if (!title || !category || !excerpt || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "제목, 카테고리, 요약, 본문은 필수입니다.",
        },
        { status: 400 }
      );
    }

    const createdPost = await prisma.blog.create({
      data: {
        title,
        category,
        excerpt,
        content,
        imageUrl: imageUrl || "",
      },
    });

    return NextResponse.json({
      success: true,
      data: createdPost,
    });
  } catch (error) {
    console.error("블로그 등록 오류:", error);

    return NextResponse.json(
      { success: false, message: "블로그 등록 실패" },
      { status: 500 }
    );
  }
}
