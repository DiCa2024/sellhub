"use client";

import { useEffect, useMemo, useState } from "react";
import { wholesaleSites } from "../data/wholesaleSites";
import { blogPosts } from "../data/blogPosts";

const ITEMS_PER_PAGE = 20;

const REGION_ITEMS = ["전체", "국내", "해외"];

function createEmptyFeeTable() {
  return {
    fashion: "",
    living: "",
    beauty: "",
    automotive: "",
    digital: "",
    interior: "",
    stationery: "",
    sports: "",
    infants: "",
    pet: "",
  };
}

export default function SalesChannelPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("전체");

  const [channels, setChannels] = useState<any[]>([]);
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedChannels = JSON.parse(localStorage.getItem("salesChannels") || "[]");
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const savedCompare = JSON.parse(
      localStorage.getItem("compareSalesChannels") || "[]"
    );

    setChannels(savedChannels);
    setDynamicSites(savedSites);
    setDynamicPosts(savedPosts);
    setCompareIds(savedCompare);
  }, []);

  const filteredChannels = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return channels.filter((channel) => {
      const searchTarget = [
        channel.name,
        channel.category,
        channel.region,
        channel.settlementDate,
      ]
        .join(" ")
        .toLowerCase();

      const searchMatch =
        keyword.length === 0 || searchTarget.includes(keyword);

      const regionText = String(channel.region || "").trim().toLowerCase();

      const regionMatch =
        selectedRegion === "전체" ||
        (selectedRegion === "국내" &&
          (regionText === "국내" ||
            regionText === "한국" ||
            regionText === "대한민국")) ||
        (selectedRegion === "해외" &&
          !(
            regionText === "국내" ||
            regionText === "한국" ||
            regionText === "대한민국"
          ));

      return searchMatch && regionMatch;
    });
  }, [channels, searchTerm, selectedRegion]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredChannels.length / ITEMS_PER_PAGE)
  );

  const pagedChannels = filteredChannels.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const compareChannels = channels.filter((channel) =>
    compareIds.includes(channel.id)
  );

  const latestSites = [...dynamicSites, ...wholesaleSites].slice(0, 4);
  const latestPosts = [...dynamicPosts, ...blogPosts].slice(0, 4);

  const sellerTools = [
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRegion]);

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
    localStorage.setItem("compareSalesChannels", JSON.stringify(updated));
  };

  const handleRemoveCompare = (id: string) => {
    const updated = compareIds.filter((item) => item !== id);
    setCompareIds(updated);
    localStorage.setItem("compareSalesChannels", JSON.stringify(updated));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedRegion("전체");
    setCurrentPage(1);
  };

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-white px-6 py-8 md:px-8">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600">
                Sales Channel Directory
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                판매 채널
              </h1>
              <p className="mt-3 text-sm leading-6 text-neutral-600 md:text-base">
                판매 채널을 검색하고 비교하면서 내 판매 방식에 맞는 플랫폼을 골라보세요.
              </p>
            </div>
          </div>

          <div className="px-6 py-6 md:px-8">
            <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="채널명, 카테고리, 정산일 검색"
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
                    지역 빠른 선택
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
                  {REGION_ITEMS.map((item) => {
                    const active = selectedRegion === item;

                    return (
                      <button
                        key={item}
                        onClick={() => setSelectedRegion(item)}
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
                href="/sales-channel/compare"
                className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                비교하러 가기
              </a>
            </div>

            <div className="space-y-3">
              {compareChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="flex items-center justify-between rounded-xl border border-neutral-200 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-neutral-900">
                      {channel.name}
                    </div>
                    <div className="mt-1 text-xs text-neutral-500">
                      {channel.category || "-"} · {channel.region || "-"} · 정산일{" "}
                      {channel.settlementDate || "-"}
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveCompare(channel.id)}
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
          <div className="mb-4 text-sm text-neutral-600">
            검색 결과 <span className="font-semibold">{filteredChannels.length}</span>개
          </div>

          {pagedChannels.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
              조건에 맞는 판매 채널이 없습니다.
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {pagedChannels.map((channel) => {
                  const isSelected = compareIds.includes(channel.id);
                  const feeTable = {
                    ...createEmptyFeeTable(),
                    ...(channel.feeTable || {}),
                  };

                  const feeSummary =
                    Object.values(feeTable).find(
                      (value) => String(value).trim() !== ""
                    ) || "-";

                  return (
                    <div
                      key={channel.id}
                      className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 hover:bg-neutral-50"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <a href={`/sales-channel/${channel.id}`} className="shrink-0">
                          <div className="h-14 w-20 overflow-hidden rounded-md bg-neutral-100">
                            <img
                              src={channel.imageUrl || "https://placehold.co/400x300?text=Channel"}
                              alt={channel.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://placehold.co/400x300?text=Channel";
                              }}
                            />
                          </div>
                        </a>

                        <div className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis text-sm text-neutral-800">
                          <a
                            href={`/sales-channel/${channel.id}`}
                            className="font-semibold text-neutral-900 hover:underline"
                          >
                            {channel.name}
                          </a>

                          <span className="mx-2 text-neutral-400">·</span>
                          <span>{channel.category || "-"}</span>

                          <span className="mx-2 text-neutral-400">·</span>
                          <span>{channel.region || "-"}</span>

                          <span className="mx-2 text-neutral-400">·</span>
                          <span>수수료 {feeSummary}</span>

                          <span className="mx-2 text-neutral-400">·</span>
                          <span>정산일 {channel.settlementDate || "-"}</span>
                        </div>
                      </div>

                      <div className="ml-4 flex shrink-0 gap-2">
                        <a
                          href={`/sales-channel/${channel.id}`}
                          className="rounded-lg border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100"
                        >
                          상세
                        </a>

                        <button
                          onClick={() => handleCompareToggle(channel.id)}
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

              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onChange={setCurrentPage}
              />
            </>
          )}
        </section>

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
            {latestSites.map((site) => (
              <a
                key={site.id}
                href={`/wholesale/${site.id}`}
                className="block overflow-hidden bg-white transition hover:-translate-y-0.5"
              >
                <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
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
                <h3 className="mt-2 text-center font-bold">{site.name}</h3>
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
                <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
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
                <h3 className="mt-2 text-center font-bold">{post.title}</h3>
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
                className="rounded-2xl bg-neutral-50 p-6 text-center transition hover:-translate-y-0.5"
              >
                <h3 className="font-bold">{tool.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {tool.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onChange(Math.max(page - 1, 1))}
        className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
      >
        ←
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => onChange(pageNumber)}
            className={`rounded-lg px-3 py-2 text-sm ${
              page === pageNumber
                ? "bg-black text-white"
                : "border hover:bg-neutral-100"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(Math.min(page + 1, totalPages))}
        className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
      >
        →
      </button>
    </div>
  );
}