import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ViewTracker from "./ViewTracker";

export async function generateMetadata({ params }: any) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    return {
      title: "판매 채널 정보 | sellhub",
      description: "판매 채널별 수수료, 정산일, 특징을 비교해보세요.",
    };
  }

  const channel = await prisma.salesChannel.findUnique({
    where: { id: numericId },
  });

  if (!channel) {
    return {
      title: "판매 채널 정보 | sellhub",
      description: "판매 채널별 수수료, 정산일, 특징을 비교해보세요.",
    };
  }

  return {
    title: `${channel.name} | 판매 채널 분석`,
    description: channel.shortDescription,
    openGraph: {
      title: `${channel.name} | 판매 채널 분석`,
      description: channel.shortDescription,
      images: [{ url: channel.imageUrl, width: 1200, height: 800 }],
    },
  };
}

type PageProps = {
  params: Promise<{ id: string }>;
};

const FEE_LABELS: Record<string, string> = {
  fashion: "패션",
  living: "생활용품",
  beauty: "뷰티",
  automotive: "자동차용품",
  digital: "디지털",
  interior: "인테리어",
  stationery: "문구",
  sports: "스포츠",
  infants: "유아",
  pet: "반려용품",
};

const sellerTools = [
  { id: 1, name: "마진 계산기", imageUrl: "https://placehold.co/600x400?text=Tool", link: "/sellertool/margin-calculator" },
  { id: 2, name: "판매가 계산기", imageUrl: "https://placehold.co/600x400?text=Tool", link: "/sellertool/sales-price-calculator" },
  { id: 3, name: "수수료 계산기", imageUrl: "https://placehold.co/600x400?text=Tool", link: "/sellertool/commission-calculator" },
  { id: 4, name: "메모 도구", imageUrl: "https://placehold.co/600x400?text=Tool", link: "/sellertool/memo-check-tool" },
];

export default async function SalesChannelDetailPage({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const channel = await prisma.salesChannel.findUnique({
    where: { id: numericId },
    include: {
      feeTables: true,
    },
  });

  if (!channel) {
    notFound();
  }

  const recommendedChannels = await prisma.salesChannel.findMany({
    take: 4,
    where: {
      NOT: { id: numericId },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const wholesaleSites = await prisma.wholesaleSite.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  const blogPosts = await prisma.blog.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  const feeTable = Object.fromEntries(
    channel.feeTables.map((item) => [item.category, item.fee])
  );

  const feeEntries = Object.entries(FEE_LABELS)
    .map(([key, label]) => ({
      key,
      label,
      value: String(feeTable[key] || ""),
    }))
    .filter((item) => item.value.trim() !== "");

  const firstFee = feeEntries[0]?.value || "-";

  return (
    <main className="min-h-screen bg-neutral-50">
      <ViewTracker id={channel.id} />

      <section className="mx-auto max-w-5xl px-4 py-10">
        <Link href="/sales-channel" className="text-sm text-neutral-500">
          ← 판매 채널 목록으로 돌아가기
        </Link>

        <div className="mt-6 flex flex-col gap-6 md:flex-row">
          <a
            href={channel.website}
            target="_blank"
            rel="noreferrer"
            className="relative block h-[200px] w-full overflow-hidden rounded-xl bg-neutral-100 md:w-[300px]"
          >
            <Image
              src={channel.imageUrl || "https://placehold.co/600x400?text=Sales+Channel"}
              alt={channel.name}
              fill
              className="object-contain transition hover:scale-105"
            />
          </a>

          <div className="flex-1">
            <div className="mb-2 flex gap-2">
              <span className="rounded bg-black px-2 py-1 text-xs text-white">
                {channel.category}
              </span>
              <span className="rounded bg-gray-200 px-2 py-1 text-xs">
                {channel.region}
              </span>
            </div>

            <a href={channel.website} target="_blank" rel="noreferrer">
              <h1 className="cursor-pointer text-2xl font-bold hover:underline">
                {channel.name}
              </h1>
            </a>

            <p className="mt-2 text-sm text-gray-500">
              {channel.shortDescription}
            </p>

            <div className="mt-4 text-sm text-neutral-600">
              대표 수수료: {firstFee}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-2 font-semibold">채널 설명</h2>
          <p className="text-sm leading-7 text-gray-600">
            {channel.shortDescription}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <InfoCard title="지역" value={channel.region} />
          <InfoCard title="카테고리" value={channel.category} />
          <InfoCard title="정산일" value={channel.settlementDate || "-"} />
          <InfoCard title="대표 수수료" value={firstFee} />
        </div>

        <div className="mt-10">
          <h2 className="mb-4 font-semibold">카테고리별 수수료표</h2>

          {feeEntries.length === 0 ? (
            <div className="rounded-xl border bg-white p-4 text-sm text-gray-500">
              등록된 수수료 정보가 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {feeEntries.map((item) => (
                <div key={item.key} className="rounded-xl border bg-white p-4">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="text-sm font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6">
          <a href={channel.website} target="_blank" rel="noreferrer" className="text-sm text-blue-600">
            공식 사이트 방문하기 →
          </a>
        </div>

        <RecommendSection title="추천 판매 채널" items={recommendedChannels} />

        <SimpleSection
          title="도매 사이트"
          href="/wholesale"
          items={wholesaleSites.map((item) => ({
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            link: `/wholesale/${item.id}`,
          }))}
        />

        <SimpleSection
          title="블로그"
          href="/blog"
          items={blogPosts.map((item) => ({
            id: item.id,
            name: item.title,
            imageUrl: item.imageUrl,
            link: `/blog/${item.id}`,
          }))}
        />

        <SellerToolSection title="판매 도구" href="/sellertool" items={sellerTools} />
      </section>
    </main>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="text-xs text-gray-400">{title}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

function RecommendSection({
  title,
  items,
}: {
  title: string;
  items: { id: number; name: string; imageUrl: string }[];
}) {
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">추천 채널이 아직 없습니다.</p>
        ) : (
          items.map((item) => (
            <Link key={item.id} href={`/sales-channel/${item.id}`}>
              <div className="cursor-pointer">
                <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
                  <Image
                    src={item.imageUrl || "https://placehold.co/600x400?text=Sales+Channel"}
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
          ))
        )}
      </div>
    </section>
  );
}

function SimpleSection({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: { id: number; name: string; imageUrl: string; link: string }[];
}) {
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>

        <Link href={href} className="text-sm text-neutral-500">
          전체 보기 →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">표시할 항목이 없습니다.</p>
        ) : (
          items.map((item) => (
  <Link key={item.id} href={item.link}>
    <div className="cursor-pointer">
      <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
        <Image
          src={item.imageUrl || "https://placehold.co/600x400?text=Item"}
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
))
        )}
      </div>
    </section>
  );
}
function SellerToolSection({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: { id: number; name: string; link: string }[];
}) {
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>

        <Link href={href} className="text-sm text-neutral-500">
          전체 보기 →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">표시할 항목이 없습니다.</p>
        ) : (
          items.map((item) => (
            <Link key={item.id} href={item.link}>
              <div className="cursor-pointer rounded-2xl border bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <h3 className="text-base font-bold">{item.name}</h3>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}