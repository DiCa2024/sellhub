import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ViewTracker from "./ViewTracker";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function WholesaleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) notFound();

  const site = await prisma.wholesaleSite.findUnique({
    where: { id: numericId },
  });

  if (!site) notFound();

  const tags = site.tags
    ? site.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

   const recommendedSites = await prisma.wholesaleSite.findMany({
  take: 4,
  where: {
    NOT: { id: numericId },
  },
}); 

  return (
    <main className="min-h-screen bg-neutral-50">
      <ViewTracker id={site.id} />

      <section className="mx-auto max-w-5xl px-4 py-10">
        {/* 뒤로가기 */}
        <Link href="/wholesale" className="text-sm text-neutral-500">
          ← 목록으로 돌아가기
        </Link>

        {/* 상단 영역 */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row">
          
          {/* 이미지 (작게) */}
          <a
             href={site.website}
             target="_blank"
             rel="noreferrer"
             className="relative w-full md:w-[300px] h-[200px] rounded-xl overflow-hidden bg-neutral-100 block"
           >
         <Image
            src={site.imageUrl}
            alt={site.name}
            fill
            className="object-contain hover:scale-105 transition"
          />
          </a>

          {/* 기본 정보 */}
          <div className="flex-1">
            <div className="flex gap-2 mb-2">
              <span className="bg-black text-white text-xs px-2 py-1 rounded">
                {site.category}
              </span>
              <span className="bg-gray-200 text-xs px-2 py-1 rounded">
                {site.region}
              </span>
            </div>

            <a
               href={site.website}
               target="_blank"
               rel="noreferrer"
             >
              <h1 className="text-2xl font-bold hover:underline cursor-pointer">
              {site.name}
              </h1>
            </a>

            <p className="text-sm text-gray-500 mt-2">
              {site.shortDescription}
            </p>

            <div className="mt-4 text-sm">
              조회수: {site.views}
            </div>
          </div>
        </div>

        {/* 상세 설명 */}
        <div className="mt-8">
          <h2 className="font-semibold mb-2">사이트 설명</h2>
          <p className="text-sm text-gray-600 leading-7">
            {site.shortDescription}
          </p>
        </div>

        {/* 정보 카드 */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <InfoCard title="이용 요금" value={site.usageFee} />
          <InfoCard title="위탁 배송" value={site.dropshipping} />
          <InfoCard title="사업자 필요" value={site.businessRequired} />
          <InfoCard title="이미지 제공" value={site.imageProvided} />
        </div>

        {/* 공식 사이트 */}
        <div className="mt-6">
          <a
            href={site.website}
            target="_blank"
            className="text-blue-600 text-sm"
          >
            공식 사이트 방문하기 →
          </a>
        </div>

        {/* 태그 */}
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

        {/* 🔥 추천 영역 */}
        <RecommendSection title="추천 판매 채널" items={recommendedSites} />
        <RecommendSection title="추천 블로그" items={recommendedSites} />
        <RecommendSection title="추천 판매 도구" items={recommendedSites} />
      </section>
    </main>
  );
}

/* 정보 카드 */
function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <p className="text-xs text-gray-400">{title}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

/* 추천 영역 */
function RecommendSection({
  title,
  items,
}: {
  title: string;
  items: any[];
}) {
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {items.map((item) => (
          <Link key={item.id} href={`/wholesale/${item.id}`}>
            <div className="cursor-pointer">
              
              {/* 이미지 */}
              <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* 이름 */}
              <h3 className="mt-2 text-center font-bold text-sm">
                {item.name}
              </h3>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}