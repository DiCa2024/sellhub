import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ViewTracker from "./ViewTracker";

export async function generateMetadata({ params }: any) {
  const { id } = await params;

  const site = await prisma.wholesaleSite.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!site) {
    return {
      title: "도매 사이트 정보 | globalsellershop",
      description: "도매 사이트 정보를 확인하고 비교해보세요.",
    };
  }

  return {
    title: `${site.name} | 도매 사이트 분석`,
    description: site.shortDescription,
    openGraph: {
      title: `${site.name} | 도매 사이트 분석`,
      description: site.shortDescription,
      images: [
        {
          url: site.imageUrl,
          width: 1200,
          height: 800,
        },
      ],
    },
  };
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 60;

const PLACEHOLDER = "https://placehold.co/1200x800?text=Image";

const recommendedTools = [
  {
    id: "margin-calculator",
    title: "마진 계산기",
    description: "매입가, 배송비, 수수료, 판매가 기준으로 순이익과 마진율 계산",
    href: "/sellertool/margin-calculator",
  },
  {
    id: "sales-price-calculator",
    title: "판매가 계산기",
    description: "목표 마진율 기준으로 적정 판매가 계산",
    href: "/sellertool/sales-price-calculator",
  },
  {
    id: "commission-calculator",
    title: "수수료 계산기",
    description: "플랫폼 수수료와 차감 금액 계산",
    href: "/sellertool/commission-calculator",
  },
  {
    id: "memo-check-tool",
    title: "메모 / 체크 도구",
    description: "소싱 메모, 체크리스트 정리",
    href: "/sellertool/memo-check-tool",
  },
];

export default async function WholesaleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) notFound();

  const [site, recommendedChannels, recommendedBlogs] = await Promise.all([
    prisma.wholesaleSite.findUnique({
      where: { id: numericId },
    }),
    prisma.salesChannel.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        imageUrl: true,
      },
    }),
    prisma.blog.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        imageUrl: true,
      },
    }),
  ]);

  if (!site) notFound();

  const tags = site.tags
    ? site.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-neutral-50">
      <ViewTracker id={site.id} />

      <section className="mx-auto max-w-5xl px-4 py-10">
        <Link href="/wholesale" prefetch className="text-sm text-neutral-500">
          ← 목록으로 돌아가기
        </Link>

        <div className="mt-6 flex flex-col gap-6 md:flex-row">
          <a
            href={site.website}
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden rounded-xl bg-white shadow-sm md:w-[320px]"
          >
           <Image
            src={
                   site.imageUrl &&
                site.imageUrl.startsWith("http")
                ? site.imageUrl
              : PLACEHOLDER
             }
              alt={site.name}
              width={1200}
              height={800}
              priority
              sizes="(max-width: 768px) 100vw, 320px"
              className="aspect-[3/2] h-auto w-full object-contain p-4 transition hover:scale-105"
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

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {site.shortDescription}
            </p>

            <div className="mt-4 text-sm text-neutral-600">
              조회수: {site.views}
            </div>
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
            className="text-sm font-medium text-blue-600"
          >
            공식 사이트 방문하기 →
          </a>
        </div>

        {tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded bg-gray-100 px-2 py-1 text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}

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
    <div className="rounded-xl border bg-white p-4 shadow-sm">
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
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>

      <div className="grid gap-6 md:grid-cols-4">
        {items.map((item) => (
          <Link key={item.id} href={`${basePath}/${item.id}`} prefetch>
            <div className="cursor-pointer">
              <ImageCard
                src={item.imageUrl || PLACEHOLDER}
                alt={item[nameKey]}
              />

              <h3 className="mt-2 line-clamp-2 text-center text-sm font-bold">
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
    title: string;
    description: string;
    href: string;
  }[];
}) {
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          href="/sellertool"
          prefetch
          className="text-sm font-medium text-neutral-600 hover:text-black"
        >
          전체 보기 →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            prefetch
            className="flex min-h-[150px] flex-col rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 className="font-bold">{item.title}</h3>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        sizes="(max-width: 768px) 50vw, 25vw"
        className="aspect-[3/2] h-auto w-full object-contain p-3"
      />
    </div>
  );
}