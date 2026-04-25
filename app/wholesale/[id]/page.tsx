import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ViewTracker from "./ViewTracker";

type PageProps = {
  params: Promise<{ id: string }>;
};

const recommendedTools = [
  {
    id: "margin-calculator",
    name: "마진 계산기",
    imageUrl: "https://placehold.co/600x400?text=Margin+Calculator",
    href: "/sellertool/margin-calculator",
  },
  {
    id: "sales-price-calculator",
    name: "판매가 계산기",
    imageUrl: "https://placehold.co/600x400?text=Sales+Price",
    href: "/sellertool/sales-price-calculator",
  },
  {
    id: "commission-calculator",
    name: "수수료 계산기",
    imageUrl: "https://placehold.co/600x400?text=Commission",
    href: "/sellertool/commission-calculator",
  },
  {
    id: "memo-check-tool",
    name: "메모 / 체크 도구",
    imageUrl: "https://placehold.co/600x400?text=Memo+Tool",
    href: "/sellertool/memo-check-tool",
  },
];

export default async function WholesaleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) notFound();

  const site = await prisma.wholesaleSite.findUnique({
    where: { id: numericId },
  });

  if (!site) notFound();

  const tags = site.tags
    ? site.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const recommendedChannels = await prisma.salesChannel.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  const recommendedBlogs = await prisma.blog.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-neutral-50">
      <ViewTracker id={site.id} />

      <section className="mx-auto max-w-5xl px-4 py-10">
        <Link href="/wholesale" className="text-sm text-neutral-500">
          ← 목록으로 돌아가기
        </Link>

        <div className="mt-6 flex flex-col gap-6 md:flex-row">
          <a
            href={site.website}
            target="_blank"
            rel="noreferrer"
            className="relative block h-[200px] w-full overflow-hidden rounded-xl bg-neutral-100 md:w-[300px]"
          >
            <Image
              src={site.imageUrl || "https://placehold.co/600x400?text=Wholesale"}
              alt={site.name}
              fill
              className="object-contain transition hover:scale-105"
            />
          </a>

          <div className="flex-1">
            <div className="mb-2 flex gap-2">
              <span className="rounded bg-black px-2 py-1 text-xs text-white">
                {site.category}
              </span>
              <span className="rounded bg-gray-200 px-2 py-1 text-xs">
                {site.region}
              </span>
            </div>

            <a href={site.website} target="_blank" rel="noreferrer">
              <h1 className="cursor-pointer text-2xl font-bold hover:underline">
                {site.name}
              </h1>
            </a>

            <p className="mt-2 text-sm text-gray-500">
              {site.shortDescription}
            </p>

            <div className="mt-4 text-sm">조회수: {site.views}</div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-2 font-semibold">사이트 설명</h2>
          <p className="text-sm leading-7 text-gray-600">
            {site.shortDescription}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <InfoCard title="이용 요금" value={site.usageFee} />
          <InfoCard title="위탁 배송" value={site.dropshipping} />
          <InfoCard title="사업자 필요" value={site.businessRequired} />
          <InfoCard title="이미지 제공" value={site.imageProvided} />
        </div>

        <div className="mt-6">
          <a
            href={site.website}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600"
          >
            공식 사이트 방문하기 →
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded bg-gray-100 px-2 py-1 text-xs">
              #{tag}
            </span>
          ))}
        </div>

        <RecommendSection
          title="추천 판매 채널"
          items={recommendedChannels}
          basePath="/sales-channel"
          nameKey="name"
        />

        <RecommendSection
          title="추천 블로그"
          items={recommendedBlogs}
          basePath="/blog"
          nameKey="title"
        />

        <RecommendToolSection title="추천 판매 도구" items={recommendedTools} />
      </section>
    </main>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="text-xs text-gray-400">{title}</p>
      <p className="text-sm font-semibold">{value || "-"}</p>
    </div>
  );
}

function RecommendSection({
  title,
  items,
  basePath,
  nameKey,
}: {
  title: string;
  items: any[];
  basePath: string;
  nameKey: "name" | "title";
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {items.map((item) => (
          <Link key={item.id} href={`${basePath}/${item.id}`}>
            <div className="cursor-pointer">
              <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src={item.imageUrl || "https://placehold.co/600x400?text=Item"}
                  alt={item[nameKey]}
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="mt-2 text-center text-sm font-bold">
                {item[nameKey]}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RecommendToolSection({
  title,
  items,
}: {
  title: string;
  items: {
    id: string;
    name: string;
    imageUrl: string;
    href: string;
  }[];
}) {
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {items.map((item) => (
          <Link key={item.id} href={item.href}>
            <div className="cursor-pointer">
              <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="mt-2 text-center text-sm font-bold">
                {item.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}