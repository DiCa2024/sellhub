import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sites = await prisma.wholesaleSite.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: sites,
    });
  } catch (error) {
    console.error("도매사이트 목록 조회 오류:", error);

    return NextResponse.json(
      { success: false, message: "도매사이트 목록 조회 실패" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      category,
      name,
      region,
      imageUrl,
      tags,
      website,
      dropshipping,
      businessRequired,
      usageFee,
      imageProvided,
      shortDescription,
    } = body;

    if (!category || !name || !region || !shortDescription) {
      return NextResponse.json(
        {
          success: false,
          message: "카테고리, 사이트명, 지역, 설명은 필수입니다.",
        },
        { status: 400 }
      );
    }

    const createdSite = await prisma.wholesaleSite.create({
      data: {
        category,
        name,
        region,
        imageUrl: imageUrl || "",
        tags: Array.isArray(tags) ? tags.join(",") : tags || "",
        website: website || "",
        dropshipping: dropshipping || "",
        businessRequired: businessRequired || "",
        usageFee: usageFee || "",
        imageProvided: imageProvided || "",
        shortDescription,
      },
    });

    return NextResponse.json({
      success: true,
      data: createdSite,
    });
  } catch (error) {
    console.error("도매사이트 등록 오류:", error);

    return NextResponse.json(
      { success: false, message: "도매사이트 등록 실패" },
      { status: 500 }
    );
  }
}