import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req: NextRequest) {
  try {
    

    if (!session?.user?.email) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "관리자만 접근 가능합니다." }, { status: 403 });
    }

    const body = await req.json();

    const brand = await prisma.brand.create({
      data: {
        name: body.name,
        slug: body.slug,
        category: body.category,
        description: body.description,
        summary: body.summary,
        logoUrl: body.logoUrl,
        thumbnailUrl: body.thumbnailUrl,
        budgetMin: body.budgetMin ? Number(body.budgetMin) : null,
        budgetMax: body.budgetMax ? Number(body.budgetMax) : null,
        monthlyRevenue: body.monthlyRevenue,
        storeCount: body.storeCount ? Number(body.storeCount) : null,
        foundingYear: body.foundingYear ? Number(body.foundingYear) : null,
        headquartersName: body.headquartersName,
        contactEmail: body.contactEmail,
        contactPhone: body.contactPhone,

        introTitle: body.introTitle,
        introDescription: body.introDescription,
        competitivenessTitle: body.competitivenessTitle,
        competitivenessBody: body.competitivenessBody,
        targetCustomer: body.targetCustomer,
        operationSupport: body.operationSupport,
        startupProcess: body.startupProcess,
        recommendedLocation: body.recommendedLocation,
        cautionNote: body.cautionNote,

        isPublished: Boolean(body.isPublished),
      },
    });

    return NextResponse.json({ success: true, brand });
  } catch (error) {
    console.error("브랜드 등록 오류:", error);
    return NextResponse.json(
      { error: "브랜드 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}