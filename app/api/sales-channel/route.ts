import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🔹 판매 채널 등록
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      category,
      region,
      imageUrl,
      website,
      settlementDate,
      shortDescription,
    } = body;

       // 필수값 체크
    if (!name || !category || !region || !shortDescription) {
      return NextResponse.json(
        { success: false, message: "필수 값이 누락되었습니다." },
        { status: 400 }
      );
    }

    const newChannel = await prisma.salesChannel.create({
   data: {
    name,
    category,
    region,
    imageUrl: imageUrl || "",
    website: website || "",
    settlementDate,
    shortDescription,
  },
});

    return NextResponse.json({
      success: true,
      data: newChannel,
    });
  } catch (error) {
    console.error("SalesChannel 생성 오류:", error);

    return NextResponse.json(
      { success: false, message: "서버 오류 발생" },
      { status: 500 }
    );
  }
}

// 🔹 판매 채널 전체 조회
export async function GET() {
  try {
    const channels = await prisma.salesChannel.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: channels,
    });
  } catch (error) {
    console.error("SalesChannel 조회 오류:", error);

    return NextResponse.json(
      { success: false, message: "서버 오류 발생" },
      { status: 500 }
    );
  }
}