import Link from "next/link";
import Section from "../../components/Section";
import BrandCard from "../../components/BrandCard";
import { prisma } from "@/lib/prisma";

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; budget?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams?.q ?? "";
  const budget = resolvedSearchParams?.budget ?? "";

  const brands = await prisma.brand.findMany({
    where: {
      status: "APPROVED",
      ...(query && {
        category: {
          contains: query,
        },
      }),
      ...(budget && {
        budget: {
          contains: budget,
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <Section title="브랜드" subtitle="국내·해외 프랜차이즈를 탐색">
        <div className="mb-6 space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">카테고리</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/brands" className="rounded-full border px-4 py-1 text-sm hover:bg-black hover:text-white transition">
                전체
              </Link>
              <Link
                href="/brands?q=카페"
                className="rounded-full border px-4 py-1 text-sm hover:bg-black hover:text-white transition"
              >
                카페
              </Link>
              <Link
                href="/brands?q=치킨"
                className="rounded-full border px-4 py-1 text-sm hover:bg-black hover:text-white transition"
              >
                치킨
              </Link>
              <Link
                href="/brands?q=무인"
                className="rounded-full border px-4 py-1 text-sm hover:bg-black hover:text-white transition"
              >
                무인
              </Link>
              <Link
                href="/brands?q=디저트"
                className="rounded-full border px-4 py-1 text-sm hover:bg-black hover:text-white transition"
              >
                디저트
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">예산</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/brands" className="rounded-full border px-4 py-1 text-sm hover:bg-black hover:text-white transition">
                전체 예산
              </Link>
              <Link
                href="/brands?budget=소자본"
                className="rounded-full border px-4 py-1 text-sm hover:bg-black hover:text-white transition"
              >
                소자본
              </Link>
              <Link
                href="/brands?budget=중자본"
                className="rounded-full border px-4 py-1 text-sm hover:bg-black hover:text-white transition"
              >
                중자본
              </Link>
              <Link
                href="/brands?budget=고자본"
                className="rounded-full border px-4 py-1 text-sm hover:bg-black hover:text-white transition"
              >
                고자본
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {brands.map((b) => (
            <BrandCard key={b.id} brand={b} />
          ))}
        </div>
      </Section>
    </div>
  );
}