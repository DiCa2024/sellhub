import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 이미 데이터 있는지 체크
    const count = await prisma.wholesaleSite.count();

    if (count > 0) {
      return NextResponse.json({
        success: false,
        message: "이미 데이터가 존재합니다.",
      });
    }

    // 샘플 데이터 3개 추가
    const data = await prisma.wholesaleSite.createMany({
      data: [
        {
          category: "패션",
          name: "Korea Fashion Mall",
          region: "한국",
          imageUrl: "https://via.placeholder.com/150",
          tags: "의류,도매,패션",
          website: "https://example1.com",
          dropshipping: "가능",
          businessRequired: "필요",
          usageFee: "무료",
          imageProvided: "제공",
          shortDescription: "한국 패션 도매 사이트",
        },
        {
          category: "전자제품",
          name: "Global Tech Wholesale",
          region: "중국",
          imageUrl: "https://via.placeholder.com/150",
          tags: "전자,IT,수입",
          website: "https://example2.com",
          dropshipping: "가능",
          businessRequired: "불필요",
          usageFee: "유료",
          imageProvided: "미제공",
          shortDescription: "글로벌 전자제품 도매 플랫폼",
        },
        {
          category: "생활용품",
          name: "Daily Goods Market",
          region: "미국",
          imageUrl: "https://via.placeholder.com/150",
          tags: "생활,잡화,도매",
          website: "https://example3.com",
          dropshipping: "불가능",
          businessRequired: "필요",
          usageFee: "무료",
          imageProvided: "제공",
          shortDescription: "생활용품 전문 도매 사이트",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "샘플 데이터 추가 완료",
      insertedCount: data.count,
    });
  } catch (error) {
    console.error("SEED ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}