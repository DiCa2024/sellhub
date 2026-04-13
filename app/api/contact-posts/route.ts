import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.contactPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ ok: true, posts });
}

export async function POST(req: Request) {
  const body = await req.json();

  const title = String(body.title ?? "").trim();
  const author = String(body.author ?? "").trim();
  const content = String(body.content ?? "").trim();

  if (!title || !author || !content) {
    return NextResponse.json(
      { ok: false, message: "모든 항목을 입력해주세요." },
      { status: 400 }
    );
  }

  const post = await prisma.contactPost.create({
    data: {
      title,
      author,
      content,
    },
  });

  return NextResponse.json({ ok: true, post });
}