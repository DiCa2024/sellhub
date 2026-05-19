import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await context.params;

    const body = await req.json();

    const {
      title,
      category,
      slug,
      excerpt,
      content,
      imageUrl,
    } = body;

    const updated = await prisma.seoPost.update({
      where: {
        id: Number(id),
      },
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
      data: updated,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "SEO 글 수정 실패",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await context.params;

    await prisma.seoPost.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "SEO 글 삭제 실패",
      },
      {
        status: 500,
      }
    );
  }
}