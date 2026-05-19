import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.seoPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "SEO 글 목록 조회 실패",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      category,
      slug,
      excerpt,
      content,
      imageUrl,
    } = body;

    if (
      !title ||
      !category ||
      !slug ||
      !excerpt ||
      !content
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "필수 항목이 비어 있습니다.",
        },
        {
          status: 400,
        }
      );
    }

    const existing = await prisma.seoPost.findUnique({
      where: {
        slug,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "이미 존재하는 slug입니다.",
        },
        {
          status: 400,
        }
      );
    }

    const post = await prisma.seoPost.create({
      data: {
        title,
        category,
        slug,
        excerpt,
        content,
        imageUrl,
      },
    });

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "SEO 글 등록 실패",
      },
      {
        status: 500,
      }
    );
  }
}