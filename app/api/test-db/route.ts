import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const created = await prisma.testConnection.create({
      data: {
        title: "DB 연결 성공!",
      },
    });

    const allData = await prisma.testConnection.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      message: "DB 정상 연결됨",
      created,
      count: allData.length,
      data: allData,
    });
  } catch (error) {
    console.error("TEST DB ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}