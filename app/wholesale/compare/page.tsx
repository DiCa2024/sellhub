"use client";

import { useEffect, useMemo, useState } from "react";
import { wholesaleSites } from "../../data/wholesaleSites";
import { blogPosts } from "../../data/blogPosts";

const QUICK_FILTERS = [
  { key: "dropshipping-yes", label: "위탁배송 가능" },
  { key: "dropshipping-no", label: "위탁배송 불가" },
  { key: "usage-free", label: "이용료 무료" },
  { key: "usage-paid", label: "이용료 유료" },
  { key: "image-free", label: "이미지 무료" },
  { key: "image-paid", label: "이미지 유료" },
];

export default function WholesaleComparePage() {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const [dynamicChannels, setDynamicChannels] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuickFilters, setSelectedQuickFilters] = useState<string[]>([]);
  
  useEffect(() => {
    const savedCompare = JSON.parse(localStorage.getItem("compareSites") || "[]");
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const savedChannels = JSON.parse(localStorage.getItem("salesChannels") || "[]");

    setCompareIds(savedCompare);
    setDynamicSites(savedSites);
    setDynamicPosts(savedPosts);
    setDynamicChannels(savedChannels);
    setLoaded(true);
  }, []);

  const allSites = [...dynamicSites, ...wholesaleSites];
  const allBlogPosts = [...dynamicPosts, ...blogPosts];

  const comparedSites = useMemo(() => {
    return allSites.filter((site) => compareIds.includes(site.id));
  }, [allSites, compareIds]);

const filteredComparedSites = useMemo(() => {
  const keyword = searchTerm.trim().toLowerCase();

  return comparedSites.filter((site) => {
    const searchTarget = [
      site.name,
      site.category,
      site.region,
      site.dropshipping,
      site.usageFee,
      site.imageProvided,
      site.shortDescription,
      ...(site.tags || []),
    ]
      .join(" ")
      .toLowerCase();

    const matchSearch =
      keyword.length === 0 || searchTarget.includes(keyword);

    const matchQuickFilter = selectedQuickFilters.every((filter) => {
      if (filter === "dropshipping-yes") {
        return String(site.dropshipping || "").includes("가능");
      }

      if (filter === "dropshipping-no") {
        return (
          String(site.dropshipping || "").includes("불가") ||
          String(site.dropshipping || "").includes("불가능")
        );
      }

      if (filter === "usage-free") {
        return String(site.usageFee || "").includes("무료");
      }

      if (filter === "usage-paid") {
        return (
          !String(site.usageFee || "").includes("무료") &&
          String(site.usageFee || "").trim() !== "" &&
          String(site.usageFee || "").trim() !== "-"
        );
      }

      if (filter === "image-free") {
        return String(site.imageProvided || "").includes("무료");
      }

      if (filter === "image-paid") {
        return (
          !String(site.imageProvided || "").includes("무료") &&
          (String(site.imageProvided || "").includes("유료") ||
            String(site.imageProvided || "").includes("제공"))
        );
      }

      return true;
    });

    return matchSearch && matchQuickFilter;
  });
}, [comparedSites, searchTerm, selectedQuickFilters]);




  const recommendedSites = allSites
    .filter((site) => !compareIds.includes(site.id))
    .slice(0, 4);

  const latestBlogPosts = allBlogPosts.slice(0, 4);

  const sellerTools = [
    {
      id: "margin-calculator",
      title: "마진 계산기",
      href: "/sellertool/margin-calculator",
    },
    {
      id: "sales-price-calculator",
      title: "판매가 계산기",
      href: "/sellertool/sales-price-calculator",
    },
    {
      id: "commission-calculator",
      title: "수수료 계산기",
      href: "/sellertool/commission-calculator",
    },
    {
      id: "memo-check-tool",
      title: "메모 / 체크 도구",
      href: "/sellertool/memo-check-tool",
    },
  ];

  const clearCompare = () => {
    setCompareIds([]);
    localStorage.setItem("compareSites", JSON.stringify([]));
  };

  const resetFilters = () => {
  setSearchTerm("");
  setSelectedQuickFilters([]);
};

  const removeCompare = (id: string) => {
    const updated = compareIds.filter((item) => item !== id);
    setCompareIds(updated);
    localStorage.setItem("compareSites", JSON.stringify(updated));
  };

  if (!loaded) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">불러오는 중...</div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <a
          href="/wholesale"
          className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
        >
          ← 도매 사이트로 돌아가기
        </a>

        <div className="mt-4">
          <h1 className="text-3xl font-bold">도매 사이트 비교</h1>
          <p className="mt-2 text-sm text-neutral-600">
            원하는 조건으로 도매 사이트를 비교해보세요.
          </p>
        </div>

        {/* 검색 + 빠른 필터 */}
        <section className="mt-8 overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm">
          <div className="px-6 py-6 md:px-8">
            <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="사이트명, 카테고리, 지역, 위탁배송, 이용료, 이미지 제공으로 검색"
                  className="h-14 w-full rounded-2xl border border-neutral-300 bg-white px-4 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                />

                <button
                  type="button"
                  className="h-14 rounded-2xl bg-neutral-900 px-6 text-sm font-medium text-white transition hover:opacity-90 md:min-w-[120px]"
                >
                  검색
                </button>
              </div>

              <div className="mt-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-neutral-900">
                    빠른 필터
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs text-neutral-500 transition hover:text-neutral-900"
                  >
                    전체 초기화
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                {QUICK_FILTERS.map((item) => {
  
  return (
    <button
      key={item.key}
      onClick={() => {
        setSelectedQuickFilters((prev) => {
          if (prev.includes(item.key)) {
            return prev.filter((f) => f !== item.key);
          }
          return [...prev, item.key];
        });
      }}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active
          ? "border-neutral-900 bg-neutral-900 text-white"
          : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100"
      }`}
    >
      {item.label}
    </button>
  );
})}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 비교표 */}
        {filteredComparedSites.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
            {compareIds.length === 0 ? (
              <>
                <h2 className="text-2xl font-bold">비교할 도매 사이트가 없습니다.</h2>
                <p className="mt-3 text-sm text-neutral-600">
                  도매 사이트 목록에서 비교 버튼을 눌러 추가해 주세요.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">조건에 맞는 비교 대상이 없습니다.</h2>
                <p className="mt-3 text-sm text-neutral-600">
                  검색어 또는 빠른 필터를 바꿔서 다시 확인해 주세요.
                </p>
              </>
            )}

            <div className="mt-6 flex justify-center gap-3">
              <a
                href="/wholesale"
                className="rounded-xl bg-black px-4 py-3 text-sm text-white"
              >
                도매 사이트 보러가기
              </a>

              {compareIds.length > 0 && (
                <button
                  onClick={clearCompare}
                  className="rounded-xl border px-4 py-3 text-sm hover:bg-neutral-100"
                >
                  비교함 비우기
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="mt-10 flex items-center justify-between">
              <div className="text-sm text-neutral-600">
                비교 중인 사이트 <span className="font-semibold">{filteredComparedSites.length}</span>개
              </div>

              <button
                onClick={clearCompare}
                className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100"
              >
                비교함 비우기
              </button>
            </div>

            <div className="mt-4 overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div
                className="grid min-w-[980px]"
                style={{
                  gridTemplateColumns: `220px repeat(${filteredComparedSites.length}, minmax(200px, 1fr))`,
                }}
              >
                <CompareLabelCell label="" />
                {filteredComparedSites.map((site) => (
                  <div
                    key={`head-${site.id}`}
                    className="border-b border-l border-neutral-200 px-4 py-5 text-center"
                  >
                    <div className="line-clamp-2 text-base font-bold text-neutral-900">
                      {site.name}
                    </div>

                    <button
                      onClick={() => removeCompare(site.id)}
                      className="mt-3 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs hover:bg-neutral-100"
                    >
                      제거
                    </button>
                  </div>
                ))}

                <CompareLabelCell label="썸네일" />
                {filteredComparedSites.map((site) => (
                  <CompareImageCell
                    key={`img-${site.id}`}
                    src={site.imageUrl}
                    alt={site.name}
                    fallback="Wholesale"
                  />
                ))}

                <CompareLabelCell label="카테고리" />
                {filteredComparedSites.map((site) => (
                  <CompareValueCell
                    key={`category-${site.id}`}
                    value={site.category || "-"}
                  />
                ))}

                <CompareLabelCell label="지역" />
                {filteredComparedSites.map((site) => (
                  <CompareValueCell
                    key={`region-${site.id}`}
                    value={site.region || "-"}
                  />
                ))}

                <CompareLabelCell label="위탁배송 가능 여부" />
                {filteredComparedSites.map((site) => (
                  <CompareValueCell
                    key={`drop-${site.id}`}
                    value={site.dropshipping || "-"}
                  />
                ))}

                <CompareLabelCell label="이용료" />
                {filteredComparedSites.map((site) => (
                  <CompareValueCell
                    key={`usage-${site.id}`}
                    value={site.usageFee || "-"}
                  />
                ))}

                <CompareLabelCell label="이미지 제공 여부" />
                {filteredComparedSites.map((site) => (
                  <CompareValueCell
                    key={`image-${site.id}`}
                    value={site.imageProvided || "-"}
                  />
                ))}

                <CompareLabelCell label="공식 사이트" />
                {filteredComparedSites.map((site) => (
                  <div
                    key={`website-${site.id}`}
                    className="border-l border-neutral-200 px-4 py-5 text-center"
                  >
                    {site.website ? (
                      <a
                        href={site.website}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
                      >
                        이동
                      </a>
                    ) : (
                      <span className="text-sm text-neutral-500">-</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 최신 도매 사이트 */}
        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">최신 도매 사이트</h2>
            <a
              href="/wholesale"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {recommendedSites.map((site) => (
              <a
                key={site.id}
                href={`/wholesale/${site.id}`}
                className="block overflow-hidden bg-white transition hover:-translate-y-0.5"
              >
                <div className="h-40 w-full overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={site.imageUrl || "https://placehold.co/600x400?text=Wholesale"}
                    alt={site.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=Wholesale";
                    }}
                  />
                </div>

                <div className="pt-3">
                  <h3 className="line-clamp-2 text-center text-base font-bold leading-6">
                    {site.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 블로그 */}
        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">블로그</h2>
            <a
              href="/blog"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {latestBlogPosts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.id}`}
                className="block overflow-hidden bg-white transition hover:-translate-y-0.5"
              >
                <div className="h-40 w-full overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={post.imageUrl || "https://placehold.co/600x400?text=Blog"}
                    alt={post.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=Blog";
                    }}
                  />
                </div>

                <div className="pt-3">
                  <h3 className="line-clamp-2 text-center text-base font-bold leading-6">
                    {post.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Seller Tools */}
        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Seller Tools</h2>
            <a
              href="/sellertool"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {sellerTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.href}
                className="rounded-2xl bg-neutral-100 p-6 text-center transition hover:-translate-y-0.5"
              >
                <h3 className="font-bold">{tool.title}</h3>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function CompareLabelCell({ label }: { label: string }) {
  return (
    <div className="border-b border-neutral-200 bg-neutral-50 px-5 py-5 text-sm font-semibold text-neutral-700">
      {label}
    </div>
  );
}

function CompareValueCell({ value }: { value: string }) {
  return (
    <div className="border-b border-l border-neutral-200 px-4 py-5 text-center text-sm text-neutral-800">
      {value}
    </div>
  );
}

function CompareImageCell({
  src,
  alt,
  fallback,
}: {
  src?: string;
  alt: string;
  fallback: string;
}) {
  return (
    <div className="border-b border-l border-neutral-200 px-4 py-5">
      <div className="mx-auto h-28 w-full max-w-[160px] overflow-hidden rounded-xl bg-neutral-100">
        <img
          src={src || `https://placehold.co/600x400?text=${fallback}`}
          alt={alt}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/600x400?text=${fallback}`;
          }}
        />
      </div>
    </div>
  );
}