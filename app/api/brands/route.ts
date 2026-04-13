export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

function toNullableString(value: unknown) {
  const str = String(value ?? "").trim();
  return str === "" ? null : str;
}

function toNullableInt(value: unknown) {
  const str = String(value ?? "").trim();
  if (str === "") return null;

  const num = Number(str);
  if (Number.isNaN(num)) return null;

  return num;
}

export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (user.role !== "HQ") {
    return NextResponse.json(
      { ok: false, message: "Only HQ accounts can register brands." },
      { status: 403 }
    );
  }

  const body = await req.json();

  const name = String(body.name ?? "").trim();
  const country = String(body.country ?? "").trim();
  const category = String(body.category ?? "").trim();
  const oneLiner = String(body.oneLiner ?? "").trim();
  const budget = String(body.budget ?? "").trim();
  const tags = String(body.tags ?? "").trim();
  const summary = String(body.summary ?? "").trim();
  const imageUrl = String(body.imageUrl ?? "").trim();

  const budgetMin = toNullableInt(body.budgetMin);
  const budgetMax = toNullableInt(body.budgetMax);
  const storeCount = toNullableInt(body.storeCount);
  const foundingYear = toNullableInt(body.foundingYear);
  const monthlyRevenue = toNullableString(body.monthlyRevenue);

  const storesSeoul = toNullableInt(body.storesSeoul);
  const storesGyeonggi = toNullableInt(body.storesGyeonggi);
  const storesIncheon = toNullableInt(body.storesIncheon);
  const storesBusan = toNullableInt(body.storesBusan);
  const storesGwangju = toNullableInt(body.storesGwangju);
  const storesDaegu = toNullableInt(body.storesDaegu);

  if (!name || !country || !category || !oneLiner || !budget || !tags || !summary) {
    return NextResponse.json(
      { ok: false, message: "All required fields must be filled in." },
      { status: 400 }
    );
  }

  const brand = await prisma.brand.create({
    data: {
      name,
      country,
      category,
      oneLiner,
      budget,
      tags,
      summary,
      imageUrl: imageUrl || null,
      budgetMin,
      budgetMax,
      storeCount,
      foundingYear,
      monthlyRevenue,
      storesSeoul,
      storesGyeonggi,
      storesIncheon,
      storesBusan,
      storesGwangju,
      storesDaegu,
      ownerId: user.id,
      status: "PENDING",
    },
  });

  return NextResponse.json({
    ok: true,
    brand,
  });
}