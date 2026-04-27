"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type HomeClientProps = {
  latestSites: any[];
  popularSites: any[];
  channels: any[];
  latestPosts: any[];
};

export default function HomeClient({
  latestSites,
  popularSites,
  channels,
  latestPosts,
}: HomeClientProps) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
  router.prefetch("/wholesale");
  router.prefetch("/sales-channel");
  router.prefetch("/blog");
}, []);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(savedUser);
  }, []);

  const getTagArray = (tags: string | string[] | undefined) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;

    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  };

  const handleSearch = () => {
    const keyword = searchTerm.trim();

    if (keyword) {
      router.push(`/wholesale?query=${encodeURIComponent(keyword)}`);
    } else {
      router.prefetch("/wholesale");
    }
  };

  const handleQuickSearch = (keyword: string) => {
    router.push(`/wholesale?query=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main>
        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-4 inline-flex rounded-full border border-neutral-200 bg-neutral-100 px-4 py-1 text-sm font-medium text-neutral-700">
              글로벌 셀러를 위한 도매 탐색 플랫폼
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              도매처를 찾고 판매 채널까지 연결해보세요
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
              카테고리별 도매 사이트를 탐색하고, 판매 채널과 셀러 운영 정보까지 한곳에서 확인할 수 있습니다.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="도매처찾기"
                className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-900"
              />

              <button
                onClick={handleSearch}
                className="rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                도매처 찾기
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-500">
              {[
                "종합",
                "리빙",
                "식품",
                "자동차",
                "디지털/가전",
                "아동/문구",
                "반려/펫",
                "헬스케어",
                "뷰티",
                "스포츠/레저",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => handleQuickSearch(item)}
                  className="rounded-full bg-neutral-100 px-3 py-1 transition hover:bg-neutral-200"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <WholesaleSection
          title="최신 등록 도매 사이트"
          href="/wholesale"
          hrefText="전체 보기 →"
          sites={latestSites}
          getTagArray={getTagArray}
        />

        <WholesaleSection
          title="인기 도매 사이트"
          href="/wholesale"
          hrefText="더 보기 →"
          sites={popularSites}
          getTagArray={getTagArray}
          popular
        />

        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">최신 판매 채널</h2>
              <p className="mt-2 text-sm text-neutral-600">
                새로 등록된 판매 채널을 확인해보세요.
              </p>
            </div>

            <Link
              href="/sales-channel"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((item) => (
              <div
                key={item.id}
                className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <Link
                  href={`/sales-channel/${item.id}`}
                  className="mb-4 block overflow-hidden rounded-2xl bg-neutral-100"
                >
                  <img
                    src={
                      item.imageUrl ||
                      "https://placehold.co/600x400?text=Sales+Channel"
                    }
                    alt={item.name}
                    className="h-32 w-full bg-white object-contain p-2 transition hover:scale-105"
                  />
                </Link>

                <h3 className="line-clamp-2 text-lg font-bold leading-7">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                  {item.region} · {item.category}
                </p>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
                  {item.shortDescription}
                </p>

                <div className="mt-auto pt-5">
                  <div className="flex gap-2">
                    <Link
                      href={`/sales-channel/${item.id}`}
                      className="flex-1 rounded-xl border border-neutral-300 px-3 py-2.5 text-center text-sm font-medium transition hover:bg-neutral-100"
                    >
                      상세 보기
                    </Link>

                    {item.website ? (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 rounded-xl bg-neutral-900 px-3 py-2.5 text-center text-sm font-medium text-white transition hover:opacity-90"
                      >
                        채널 이동
                      </a>
                    ) : (
                      <div className="flex-1 rounded-xl bg-neutral-200 px-3 py-2.5 text-center text-sm font-medium text-neutral-500">
                        링크 없음
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">최신 블로그 글</h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <div
                key={post.id}
                className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <Link
                  href={`/blog/${post.id}`}
                  className="mb-4 block overflow-hidden rounded-2xl bg-neutral-100"
                >
                  <img
                    src={post.imageUrl || "https://placehold.co/600x400?text=Blog"}
                    alt={post.title}
                    className="h-32 w-full bg-white object-contain p-2 transition hover:scale-105"
                  />
                </Link>

                <div className="mb-3 inline-flex w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  {post.category}
                </div>

                <h3 className="line-clamp-2 text-lg font-bold leading-7">
                  {post.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-5">
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-medium transition hover:bg-neutral-100"
                  >
                    글 보기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Seller Tools</h2>
            <Link
              href="/sellertool"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 도구 보기 →
            </Link>
          </div>

          <p className="mb-6 max-w-3xl text-sm leading-6 text-neutral-600">
            셀러 운영에 자주 쓰는 실전 도구를 빠르게 사용할 수 있습니다. 마진 계산, 판매가 계산,
            수수료 계산, 메모 정리까지 한곳에서 관리해보세요.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <ToolCard
              title="마진 계산기"
              description="매입가, 배송비, 수수료, 판매가를 넣고 예상 순이익과 마진율을 계산합니다."
              href="/sellertool/margin-calculator"
            />
            <ToolCard
              title="판매가 계산기"
              description="원하는 마진율을 기준으로 적정 판매가를 계산할 수 있습니다."
              href="/sellertool/sales-price-calculator"
            />
            <ToolCard
              title="수수료 계산기"
              description="플랫폼 수수료와 기타 비용을 반영해 실제 차감 금액을 계산합니다."
              href="/sellertool/commission-calculator"
            />
            <ToolCard
              title="메모 / 체크 도구"
              description="소싱 검토 내용, 체크리스트, 아이디어를 정리할 수 있는 간단한 도구입니다."
              href="/sellertool/memo-check-tool"
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-6 md:grid-cols-3">
            <BottomLink
              href="/wholesale"
              title="도매처 찾기"
              description="카테고리와 태그를 기준으로 원하는 도매 사이트를 빠르게 찾을 수 있습니다."
            />
            <BottomLink
              href="/sales-channel"
              title="판매 채널"
              description="상품 유형에 맞는 국내 판매 채널과 확장 방향을 확인할 수 있습니다."
            />
            <BottomLink
              href="/blog"
              title="셀러 가이드"
              description="도매, 소싱, 세금, 운영 팁 등 셀러를 위한 실전 정보를 모아볼 수 있습니다."
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function WholesaleSection({
  title,
  href,
  hrefText,
  sites,
  getTagArray,
  popular = false,
}: {
  title: string;
  href: string;
  hrefText: string;
  sites: any[];
  getTagArray: (tags: string | string[] | undefined) => string[];
  popular?: boolean;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <a href={href} className="text-sm font-medium text-neutral-600 hover:text-black">
          {hrefText}
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sites.map((site) => (
          <div
            key={site.id}
            className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Link
              href={`/wholesale/${site.id}`}
              className="mb-4 block overflow-hidden rounded-2xl bg-neutral-100"
            >
              <img
                src={site.imageUrl || "https://placehold.co/600x400?text=Wholesale"}
                alt={site.name}
                className="h-32 w-full bg-white object-contain p-2 transition hover:scale-105"
              />
            </Link>

            {popular && (
              <div className="mb-3 inline-flex w-fit rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white">
                인기
              </div>
            )}

            {popular && (
              <p className="text-xs text-neutral-500">조회수 {site.views ?? 0}</p>
            )}

            <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-7">
              {site.name}
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              {site.region} · {site.category}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {getTagArray(site.tags).slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
              {site.shortDescription}
            </p>

            <div className="mt-auto pt-5">
              <div className="flex gap-2">
                <Link
                  href={`/wholesale/${site.id}`}
                  className="flex-1 rounded-xl border border-neutral-300 px-3 py-2.5 text-center text-sm font-medium transition hover:bg-neutral-100"
                >
                  상세 보기
                </Link>

                <a
                  href={site.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-xl bg-neutral-900 px-3 py-2.5 text-center text-sm font-medium text-white transition hover:opacity-90"
                >
                  사이트 이동
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ToolCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-neutral-600">{description}</p>
      <div className="mt-auto pt-5">
        <a
          href={href}
          className="block w-full rounded-xl bg-black px-4 py-3 text-center text-sm font-medium text-white transition hover:opacity-90"
        >
          바로가기
        </a>
      </div>
    </div>
  );
}

function BottomLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-neutral-600">{description}</p>
    </a>
  );
}