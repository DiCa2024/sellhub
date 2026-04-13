"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { wholesaleSites } from "../data/wholesaleSites";

const ITEMS_PER_PAGE = 9;

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

export default function WholesalePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryFromQuery, setSelectedCategoryFromQuery] = useState("");

  const handleCategoryQueryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const savedCompare = JSON.parse(localStorage.getItem("compareSites") || "[]");
    setCompareIds(savedCompare);

    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    setDynamicSites(savedSites);
  }, []);

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || "";

    setSearchTerm(query);
    setSelectedCategoryFromQuery(category);
    setCurrentPage(1);
  }, [searchParams]);

  const allSites = [...dynamicSites, ...wholesaleSites];

  const handleCompareToggle = (id: string) => {
    let updated: string[] = [];

    if (compareIds.includes(id)) {
      updated = compareIds.filter((item) => item !== id);
    } else {
      if (compareIds.length >= 3) {
        alert("비교는 최대 3개까지 담을 수 있어요.");
        return;
      }
      updated = [...compareIds, id];
    }

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
        ...(site.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      const searchMatch =
        keyword.length === 0 || searchTarget.includes(keyword);

      const queryCategoryMatch =
        !selectedCategoryFromQuery ||
        site.category === selectedCategoryFromQuery ||
        (Array.isArray(site.tags) &&
          site.tags.includes(selectedCategoryFromQuery));

      return queryCategoryMatch && searchMatch;
    });
  }, [allSites, selectedCategoryFromQuery, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSites.length / ITEMS_PER_PAGE)
  );

  const pagedSites = filteredSites.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
                  placeholder="도매처명, 카테고리, 특징으로 검색해보세요"
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
  <div className="mb-6 flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-4 shadow-sm">
    <div className="text-sm text-neutral-700">
      비교함에 <span className="font-semibold">{compareIds.length}</span>개 담겼어요.
    </div>

    <a
      href="/wholesale/compare"
      className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
    >
      비교하러 가기
    </a>
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
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {pagedSites.map((site) => {
                  const isSelected = compareIds.includes(site.id);

                  return (
                    <div
                      key={site.id}
                      className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
                    >
                      <div className="mb-3 h-40 w-full overflow-hidden rounded-xl bg-neutral-100">
    <img
      src={site.imageUrl}
      alt={site.name}
      className="h-full w-full object-cover"
    />
  </div>
                      <h2 className="text-lg font-bold text-neutral-900">
                        {site.name}
                      </h2>

                      <p className="mt-1 text-sm text-neutral-500">
                        {site.region} · {site.category}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {(site.tags || []).slice(0, 5).map((tag: string) => (
                          <span
                            key={tag}
                            className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="mt-3 text-sm leading-6 text-neutral-600">
                        {site.shortDescription}
                      </p>

                      <div className="mt-auto pt-4">
                        <div className="flex gap-2">
                          <a
                            href={`/wholesale/${site.id}`}
                            className="flex-1 rounded-xl border border-neutral-300 px-3 py-2 text-center text-sm text-neutral-700 transition hover:bg-neutral-100"
                          >
                            상세 보기
                          </a>

                          <button
                            onClick={() => handleCompareToggle(site.id)}
                            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition ${
                              isSelected
                                ? "bg-neutral-200 text-neutral-900"
                                : "bg-neutral-900 text-white hover:opacity-90"
                            }`}
                          >
                            비교 기능
                          </button>
                        </div>
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