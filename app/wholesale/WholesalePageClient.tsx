"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { wholesaleSites } from "../data/wholesaleSites";
import { blogPosts } from "../data/blogPosts";

const ITEMS_PER_PAGE = 20;

const CATEGORY_TAG_ITEMS = [
  "종합",
  "리빙",
  "식품",
  "자동차",
  "디지털/가전",
  "가구/인테리어",
  "패션의류",
  "패션잡화",
  "아동/문구",
  "반려/펫",
  "헬스케어",
  "뷰티",
  "스포츠/레저",
];

export default function WholesalePageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [dynamicChannels, setDynamicChannels] = useState<any[]>([]);
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryFromQuery, setSelectedCategoryFromQuery] = useState("");

  const handleCategoryQueryChange = (category: string) => {
    const params = new URLSearchParams();

    if (category) {
      params.set("category", category);
    }

    if (searchTerm.trim()) {
      params.set("query", searchTerm.trim());
    }

    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleSearchSubmit = () => {
    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set("query", searchTerm.trim());
    }

    if (selectedCategoryFromQuery) {
      params.set("category", selectedCategoryFromQuery);
    }

    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  useEffect(() => {
    const savedCompare = JSON.parse(localStorage.getItem("compareSites") || "[]");
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedChannels = JSON.parse(localStorage.getItem("salesChannels") || "[]");
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    setCompareIds(savedCompare);
    setDynamicSites(savedSites);
    setDynamicChannels(savedChannels);
    setDynamicPosts(savedPosts);
  }, []);

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || "";

    setSearchTerm(query);
    setSelectedCategoryFromQuery(category);
    setCurrentPage(1);
  }, [searchParams]);

  const allSites = [...dynamicSites, ...wholesaleSites];
  const latestChannels = dynamicChannels.slice(0, 4);
  const latestPosts = [...dynamicPosts, ...blogPosts].slice(0, 4);

  const handleCompareToggle = (id: string) => {
    let updated: string[] = [];

    if (compareIds.includes(id)) {
      updated = compareIds.filter((item) => item !== id);
    } else {
      if (compareIds.length >= 10) {
        alert("비교는 최대 10개까지 담을 수 있어요.");
        return;
      }
      updated = [...compareIds, id];
    }

    setCompareIds(updated);
    localStorage.setItem("compareSites", JSON.stringify(updated));
  };

  const handleRemoveCompare = (id: string) => {
    const updated = compareIds.filter((item) => item !== id);
    setCompareIds(updated);
    localStorage.setItem("compareSites", JSON.stringify(updated));
  };

  const resetTopFilters = () => {
    setSearchTerm("");
    setSelectedCategoryFromQuery("");
    setCurrentPage(1);
    router.push(pathname);
  };

  const filteredSites = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return allSites.filter((site) => {
      const searchTarget = [
        site.name,
        site.region,
        site.category,
        site.shortDescription,
        site.dropshipping,
        site.imageProvided,
        ...(site.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      const searchMatch = keyword.length === 0 || searchTarget.includes(keyword);

      const queryCategoryMatch =
        !selectedCategoryFromQuery ||
        site.category === selectedCategoryFromQuery ||
        (Array.isArray(site.tags) && site.tags.includes(selectedCategoryFromQuery));

      return queryCategoryMatch && searchMatch;
    });
  }, [allSites, selectedCategoryFromQuery, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredSites.length / ITEMS_PER_PAGE));

  const pagedSites = filteredSites.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const compareSites = allSites.filter((site) => compareIds.includes(site.id));

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-10 overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-white px-6 py-8 md:px-8">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600">
                Wholesale Directory
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                도매 사이트
              </h1>
              <p className="mt-3 text-sm leading-6 text-neutral-600 md:text-base">
                카테고리와 키워드로 원하는 도매처를 빠르게 찾고,
                여러 사이트를 비교하면서 내 판매 방식에 맞는 플랫폼을 골라보세요.
              </p>
            </div>
          </div>

          <div className="px-6 py-6 md:px-8">
            <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit();
                    }
                  }}
                  placeholder="도매처명, 카테고리, 특징으로 검색해보세요"
                  className="h-14 w-full rounded-2xl border border-neutral-300 bg-white px-4 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                />

                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="h-14 rounded-2xl bg-neutral-900 px-6 text-sm font-medium text-white transition hover:opacity-90 md:min-w-[120px]"
                >
                  검색
                </button>
              </div>

              <div className="mt-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-neutral-900">
                    카테고리 빠른 선택
                  </p>
                  <button
                    type="button"
                    onClick={resetTopFilters}
                    className="text-xs text-neutral-500 transition hover:text-neutral-900"
                  >
                    전체 초기화
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {CATEGORY_TAG_ITEMS.map((item) => {
                    const active = selectedCategoryFromQuery === item;

                    return (
                      <button
                        key={item}
                        onClick={() =>
                          handleCategoryQueryChange(
                            selectedCategoryFromQuery === item ? "" : item
                          )
                        }
                        className={`rounded-full border px-4 py-2 text-sm transition ${
                          active
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {compareIds.length > 0 && (
          <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-neutral-700">
                비교함에 <span className="font-semibold">{compareIds.length}</span>개 담겼어요.
                <span className="ml-1 text-neutral-500">(최대 10개)</span>
              </div>

              <a
                href="/wholesale/compare"
                className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                비교하러 가기
              </a>
            </div>

            <div className="space-y-3">
              {compareSites.map((site) => (
                <div
                  key={site.id}
                  className="flex items-center justify-between rounded-xl border border-neutral-200 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-neutral-900">
                      {site.name}
                    </div>
                    <div className="mt-1 text-xs text-neutral-500">
                      {site.category} · {site.region}
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveCompare(site.id)}
                    className="rounded-lg border border-neutral-300 px-3 py-2 text-xs hover:bg-neutral-100"
                  >
                    제거
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <section>
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-neutral-600">
              검색 결과 <span className="font-semibold">{filteredSites.length}</span>개
            </div>

            {(searchTerm.trim() || selectedCategoryFromQuery) && (
              <div className="flex flex-wrap gap-2">
                {searchTerm.trim() && (
                  <ActiveChip label={`검색: ${searchTerm.trim()}`} />
                )}
                {selectedCategoryFromQuery && (
                  <ActiveChip label={`카테고리: ${selectedCategoryFromQuery}`} />
                )}
              </div>
            )}
          </div>

          {pagedSites.length === 0 ? (
            <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-bold">조건에 맞는 도매 사이트가 없어요</h2>
              <p className="mt-3 text-sm text-neutral-600">
                카테고리나 검색어를 바꿔서 다시 확인해 보세요.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {pagedSites.map((site) => {
                  const isSelected = compareIds.includes(site.id);
                  const moveUrl = site.website || "#";

                  return (
                    <div
                      key={site.id}
                      className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 hover:bg-neutral-50"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <a href={`/wholesale/${site.id}`} className="shrink-0">
                          <div className="group h-14 w-20 overflow-hidden rounded-md bg-neutral-100">
                            <img
                              src={
                                site.imageUrl ||
                                "https://placehold.co/400x300?text=Wholesale"
                              }
                              alt={site.name}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://placehold.co/400x300?text=Wholesale";
                              }}
                            />
                          </div>
                        </a>

                        <div className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis text-sm text-neutral-800">
                          <a
                            href={`/wholesale/${site.id}`}
                            className="font-semibold text-neutral-900 hover:underline"
                          >
                            {site.name}
                          </a>

                          <span className="mx-2 text-neutral-400">·</span>
                          <span>{site.category || "-"}</span>

                          <span className="mx-2 text-neutral-400">·</span>
                          <span>{site.region || "-"}</span>

                          <span className="mx-2 text-neutral-400">·</span>
                          <span>위탁배송 {site.dropshipping || "-"}</span>

                          <span className="mx-2 text-neutral-400">·</span>
                          <span>이미지 제공 {site.imageProvided || "-"}</span>
                        </div>
                      </div>

                      <div className="ml-4 flex shrink-0 gap-2">
                        <a
                          href={moveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100"
                        >
                          이동
                        </a>

                        <button
                          onClick={() => handleCompareToggle(site.id)}
                          className={`rounded-lg px-3 py-2 text-sm font-medium ${
                            isSelected
                              ? "bg-neutral-200 text-neutral-900"
                              : "bg-black text-white"
                          }`}
                        >
                          비교
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-lg px-3 py-2 text-sm ${
                        currentPage === page
                          ? "bg-neutral-900 text-white"
                          : "border hover:bg-neutral-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
                >
                  &gt;
                </button>
              </div>
            </>
          )}
        </section>

        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">판매 채널</h2>
            <a
              href="/sales-channel"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {latestChannels.map((item) => (
              <a
                key={item.id}
                href={`/sales-channel/${item.id}`}
                className="block overflow-hidden bg-white transition hover:-translate-y-0.5"
              >
                <div className="h-40 w-full overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={
                      item.imageUrl ||
                      "https://placehold.co/600x400?text=Channel"
                    }
                    alt={item.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400?text=Channel";
                    }}
                  />
                </div>

                <div className="pt-3">
                  <h3 className="line-clamp-2 text-center text-base font-bold leading-6">
                    {item.name}
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
                    src={
                      post.imageUrl ||
                      "https://placehold.co/600x400?text=Blog"
                    }
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
      </div>
    </main>
  );
}

function ActiveChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-neutral-200 px-3 py-1 text-xs text-neutral-700">
      {label}
    </span>
  );
}