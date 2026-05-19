import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { seoPostId, name, text } = body;

    if (!seoPostId || !name || !text) {
      return NextResponse.json(
        { success: false, message: "필수 항목이 비어 있습니다." },
        { status: 400 }
      );
    }

    const comment = await prisma.seoComment.create({
      data: {
        seoPostId: Number(seoPostId),
        name: name.trim(),
        text: text.trim(),
      },
    });

    return NextResponse.json({ success: true, data: comment });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "SEO 댓글 등록 실패" },
      { status: 500 }
    );
  }
}