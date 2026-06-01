import Link from "next/link";
import { prisma } from "@/lib/prisma";

type SearchPageProps = {
  searchParams: Promise<{
    query?: string;
  }>;
};

export const revalidate = 60;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query = "" } = await searchParams;
  const keyword = query.trim();

  const [wholesaleSites, salesChannels, seoPosts, blogPosts] = keyword
    ? await Promise.all([
        prisma.wholesaleSite.findMany({
          take: 5,
          where: {
            OR: [
              { name: { contains: keyword } },
              { category: { contains: keyword } },
              { region: { contains: keyword } },
              { shortDescription: { contains: keyword } },
            ],
          },
          select: {
            id: true,
            name: true,
            category: true,
            region: true,
            shortDescription: true,
          },
        }),

        prisma.salesChannel.findMany({
          take: 5,
          where: {
            OR: [
              { name: { contains: keyword } },
              { category: { contains: keyword } },
              { region: { contains: keyword } },
              { shortDescription: { contains: keyword } },
            ],
          },
          select: {
            id: true,
            name: true,
            category: true,
            region: true,
            shortDescription: true,
          },
        }),

        prisma.seoPost.findMany({
          take: 5,
          where: {
            OR: [
              { title: { contains: keyword } },
              { category: { contains: keyword } },
              { excerpt: { contains: keyword } },
            ],
          },
          select: {
            title: true,
            slug: true,
            category: true,
            excerpt: true,
          },
        }),

        prisma.blog.findMany({
          take: 5,
          where: {
            OR: [
              { title: { contains: keyword } },
              { category: { contains: keyword } },
              { excerpt: { contains: keyword } },
            ],
          },
          select: {
            id: true,
            title: true,
            category: true,
            excerpt: true,
          },
        }),
      ])
    : [[], [], [], []];

  const totalCount =
    wholesaleSites.length +
    salesChannels.length +
    seoPosts.length +
    blogPosts.length;

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-16 text-neutral-900">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-neutral-500">통합 검색</p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
          {keyword ? `"${keyword}" 검색 결과` : "검색어를 입력해주세요"}
        </h1>

        {keyword && (
          <p className="mt-4 text-sm text-neutral-500">
            총 {totalCount}개의 결과를 찾았습니다.
          </p>
        )}

        {!keyword && (
          <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8">
            <p className="text-sm leading-7 text-neutral-600">
              메인 화면에서 도매처, 판매채널, SEO, 블로그 키워드를 검색하면
              이곳에서 통합 결과를 확인할 수 있습니다.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["도매사이트", "판매채널", "SEO", "블로그", "셀러도구"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`/search?query=${encodeURIComponent(item)}`}
                    className="rounded-full border border-neutral-200 px-4 py-2 text-sm transition hover:bg-neutral-900 hover:text-white"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </div>
        )}

        {keyword && (
          <div className="mt-10 space-y-12">
            <ResultSection title="도매 사이트">
              {wholesaleSites.map((item) => (
                <ResultItem
                  key={`wholesale-${item.id}`}
                  href={`/wholesale/${item.id}`}
                  title={item.name}
                  meta={`${item.region ?? ""} ${item.category ?? ""}`}
                  description={item.shortDescription}
                />
              ))}
            </ResultSection>

            <ResultSection title="판매 채널">
              {salesChannels.map((item) => (
                <ResultItem
                  key={`sales-${item.id}`}
                  href={`/sales-channel/${item.id}`}
                  title={item.name}
                  meta={`${item.region ?? ""} ${item.category ?? ""}`}
                  description={item.shortDescription}
                />
              ))}
            </ResultSection>

            <ResultSection title="SEO 글">
              {seoPosts.map((item) => (
                <ResultItem
                  key={`seo-${item.category}-${item.slug}`}
                  href={`/seo/${item.category}/${item.slug}`}
                  title={item.title}
                  meta={item.category}
                  description={item.excerpt}
                />
              ))}
            </ResultSection>

            <ResultSection title="블로그 글">
              {blogPosts.map((item) => (
                <ResultItem
                  key={`blog-${item.id}`}
                  href={`/blog/${item.id}`}
                  title={item.title}
                  meta={item.category}
                  description={item.excerpt}
                />
              ))}
            </ResultSection>
          </div>
        )}
      </div>
    </main>
  );
}

function ResultSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">{title}</h2>

      <div className="divide-y divide-neutral-200 rounded-3xl border border-neutral-200 bg-white">
        {children || (
          <p className="p-6 text-sm text-neutral-500">검색 결과가 없습니다.</p>
        )}
      </div>
    </section>
  );
}

function ResultItem({
  href,
  title,
  meta,
  description,
}: {
  href: string;
  title: string;
  meta?: string | null;
  description?: string | null;
}) {
  return (
    <Link href={href} className="block p-6 transition hover:bg-neutral-50">
      {meta && <p className="text-xs text-neutral-500">{meta}</p>}

      <h3 className="mt-1 text-lg font-bold text-neutral-900">{title}</h3>

      {description && (
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">
          {description}
        </p>
      )}
    </Link>
  );
}