import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();

    const brandId = body.brandId?.trim();
    const message = body.message?.trim();
    const guestName = body.guestName?.trim();
    const guestPhone = body.guestPhone?.trim();
    const guestEmail = body.guestEmail?.trim();
    const guestPassword = body.guestPassword?.trim();

    if (!brandId || !message) {
      return NextResponse.json(
        { error: "브랜드 정보와 문의 내용은 필수입니다." },
        { status: 400 }
      );
    }

    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
    });

    if (!brand) {
      return NextResponse.json(
        { error: "존재하지 않는 브랜드입니다." },
        { status: 404 }
      );
    }

    if (user) {
      const inquiry = await prisma.inquiry.create({
        data: {
          brandId,
          userId: user.id,
          isMember: true,
          message,
          name: user.email,
          email: user.email,
          brandName: brand.name,
        },
      });

      return NextResponse.json(
        { success: true, inquiry, message: "회원 문의가 정상적으로 등록되었습니다." },
        { status: 201 }
      );
    }

    if (!guestName || !guestPhone || !guestPassword) {
      return NextResponse.json(
        { error: "비회원 문의는 이름, 연락처, 비밀번호가 필요합니다." },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        brandId,
        isMember: false,
        message,
        name: guestName,
        email: guestEmail || null,
        guestPhone,
        guestPassword,
        brandName: brand.name,
      },
    });

    return NextResponse.json(
      { success: true, inquiry, message: "비회원 문의가 정상적으로 등록되었습니다." },
      { status: 201 }
    );
  } catch (error) {
    console.error("문의 등록 오류:", error);

    return NextResponse.json(
      { error: "문의 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}