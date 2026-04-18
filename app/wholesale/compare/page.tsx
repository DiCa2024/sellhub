"use client";

import { useEffect, useMemo, useState } from "react";
import { wholesaleSites } from "../../data/wholesaleSites";
import { blogPosts } from "../../data/blogPosts";

export default function WholesaleComparePage() {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedCompare = JSON.parse(localStorage.getItem("compareSites") || "[]");
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    setCompareIds(savedCompare);
    setDynamicSites(savedSites);
    setDynamicPosts(savedPosts);
    setLoaded(true);
  }, []);

  const allSites = [...dynamicSites, ...wholesaleSites];
  const comparedSites = useMemo(() => {
    return allSites.filter((site) => compareIds.includes(site.id));
  }, [allSites, compareIds]);

  const recommendedSites = allSites
    .filter((site) => !compareIds.includes(site.id))
    .slice(0, 4);

  const latestPosts = [...dynamicPosts, ...blogPosts].slice(0, 4);

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

  const handleRemoveCompare = (id: string) => {
    const updated = compareIds.filter((item) => item !== id);
    setCompareIds(updated);
    localStorage.setItem("compareSites", JSON.stringify(updated));
  };

  const clearCompare = () => {
    setCompareIds([]);
    localStorage.setItem("compareSites", JSON.stringify([]));
  };

  if (!loaded) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-neutral-600">불러오는 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <a
            href="/wholesale"
            className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
          >
            ← 도매 사이트로 돌아가기
          </a>

          <h1 className="mt-4 text-3xl font-bold">도매 사이트 비교</h1>
          <p className="mt-2 text-sm text-neutral-600">
            선택한 도매 사이트를 한눈에 비교해서 내 판매 방식에 맞는 곳을 골라보세요.
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm">
          <div className="text-sm text-neutral-700">
            현재 <span className="font-semibold">{comparedSites.length}</span>개 비교 중
          </div>

          {comparedSites.length > 0 && (
            <button
              onClick={clearCompare}
              className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100"
            >
              비교함 비우기
            </button>
          )}
        </div>

        {comparedSites.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold">비교할 도매 사이트가 없습니다.</h2>
            <p className="mt-3 text-sm text-neutral-600">
              도매 사이트 목록에서 비교 버튼을 눌러 추가해 주세요.
            </p>
            <a
              href="/wholesale"
              className="mt-6 inline-flex rounded-xl bg-black px-4 py-3 text-sm font-medium text-white"
            >
              도매 사이트 보러가기
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div
              className="grid min-w-[980px]"
              style={{ gridTemplateColumns: `220px repeat(${comparedSites.length}, minmax(200px, 1fr))` }}
            >
              <CompareLabelCell label="" />
              {comparedSites.map((site) => (
                <div
                  key={`head-${site.id}`}
                  className="border-b border-l border-neutral-200 px-4 py-5 text-center"
                >
                  <div className="line-clamp-2 text-base font-bold text-neutral-900">
                    {site.name}
                  </div>
                  <button
                    onClick={() => handleRemoveCompare(site.id)}
                    className="mt-3 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs hover:bg-neutral-100"
                  >
                    제거
                  </button>
                </div>
              ))}

              <CompareLabelCell label="썸네일" />
              {comparedSites.map((site) => (
                <CompareImageCell key={`img-${site.id}`} src={site.imageUrl} alt={site.name} fallback="Wholesale" />
              ))}

              <CompareLabelCell label="카테고리" />
              {comparedSites.map((site) => (
                <CompareValueCell key={`category-${site.id}`} value={site.category || "-"} />
              ))}

              <CompareLabelCell label="위탁배송 가능" />
              {comparedSites.map((site) => (
                <CompareValueCell key={`drop-${site.id}`} value={site.dropshipping || "-"} />
              ))}

              <CompareLabelCell label="이용료" />
              {comparedSites.map((site) => (
                <CompareValueCell key={`fee-${site.id}`} value={site.usageFee || "-"} />
              ))}

              <CompareLabelCell label="사업자 필요" />
              {comparedSites.map((site) => (
                <CompareValueCell key={`biz-${site.id}`} value={site.businessRequired || "-"} />
              ))}

              <CompareLabelCell label="이미지 제공" />
              {comparedSites.map((site) => (
                <CompareValueCell key={`image-${site.id}`} value={site.imageProvided || "-"} />
              ))}

              <CompareLabelCell label="태그" />
              {comparedSites.map((site) => (
                <div
                  key={`tags-${site.id}`}
                  className="border-b border-l border-neutral-200 px-4 py-5"
                >
                  <div className="flex flex-wrap justify-center gap-2">
                    {(site.tags || []).slice(0, 4).map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                    {(!site.tags || site.tags.length === 0) && (
                      <span className="text-sm text-neutral-500">-</span>
                    )}
                  </div>
                </div>
              ))}

              <CompareLabelCell label="지역" />
              {comparedSites.map((site) => (
                <CompareValueCell key={`region-${site.id}`} value={site.region || "-"} />
              ))}

              <CompareLabelCell label="바로가기" />
              {comparedSites.map((site) => (
                <div
                  key={`action-${site.id}`}
                  className="border-l border-neutral-200 px-4 py-5"
                >
                  <div className="flex flex-col gap-2">
                    <a
                      href={`/wholesale/${site.id}`}
                      className="rounded-xl border border-neutral-300 px-3 py-2 text-center text-sm hover:bg-neutral-100"
                    >
                      상세보기
                    </a>
                    <a
                      href={site.website || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-black px-3 py-2 text-center text-sm text-white hover:opacity-90"
                    >
                      사이트 이동
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">도매 사이트 추천</h2>
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
                      e.currentTarget.src = "https://placehold.co/600x400?text=Wholesale";
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
            {latestPosts.map((post) => (
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
                      e.currentTarget.src = "https://placehold.co/600x400?text=Blog";
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
                className="flex min-h-[150px] flex-col rounded-2xl bg-neutral-50 p-5 transition hover:-translate-y-0.5"
              >
                <h3 className="text-center text-lg font-bold">{tool.title}</h3>
                <div className="mt-auto pt-4 text-center text-sm text-neutral-600">
                  바로 가기 →
                </div>
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