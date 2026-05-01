import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = Number(id);

    const body = await req.json();
    const { userId } = body;

    const existing = await prisma.boardLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existing) {
      await prisma.boardLike.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });

      return NextResponse.json({ success: true, liked: false });
    }

    await prisma.boardLike.create({
      data: {
        postId,
        userId,
      },
    });

    return NextResponse.json({ success: true, liked: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = Number(id);

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const count = await prisma.boardLike.count({
      where: { postId },
    });

    let liked = false;

    if (userId) {
      const existing = await prisma.boardLike.findUnique({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });

      liked = !!existing;
    }

    return NextResponse.json({
      success: true,
      count,
      liked,
    });
  } catch (e) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}