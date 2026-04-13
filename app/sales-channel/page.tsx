"use client";

import { useEffect, useMemo, useState } from "react";
import { wholesaleSites } from "../data/wholesaleSites";
import { blogPosts } from "../data/blogPosts";

const PAGE_SIZE = 6;

const REGION_FILTERS = ["전체", "한국", "아시아", "유럽", "북미", "남미"];

export default function SalesChannelPage() {
  const [channels, setChannels] = useState<any[]>([]);
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("전체");

  const [domesticPage, setDomesticPage] = useState(1);
  const [globalPage, setGlobalPage] = useState(1);

  useEffect(() => {
    const savedChannels = JSON.parse(localStorage.getItem("salesChannels") || "[]");
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    setChannels(savedChannels);
    setDynamicSites(savedSites);
    setDynamicPosts(savedPosts);
  }, []);

  const filteredChannels = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return channels.filter((item) => {
      const regionMatch =
        regionFilter === "전체" || item.region === regionFilter;

      const searchTarget = [
        item.name,
        item.region,
        item.category,
        item.shortDescription,
        ...(item.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      const searchMatch =
        keyword.length === 0 || searchTarget.includes(keyword);

      return regionMatch && searchMatch;
    });
  }, [channels, regionFilter, searchTerm]);

  const domesticChannels = useMemo(() => {
    return filteredChannels.filter((item) => item.region === "한국");
  }, [filteredChannels]);

  const globalChannels = useMemo(() => {
    return filteredChannels.filter((item) => item.region !== "한국");
  }, [filteredChannels]);

  const domesticTotalPages = Math.max(
    1,
    Math.ceil(domesticChannels.length / PAGE_SIZE)
  );
  const globalTotalPages = Math.max(
    1,
    Math.ceil(globalChannels.length / PAGE_SIZE)
  );

  const domesticPaged = domesticChannels.slice(
    (domesticPage - 1) * PAGE_SIZE,
    domesticPage * PAGE_SIZE
  );

  const globalPaged = globalChannels.slice(
    (globalPage - 1) * PAGE_SIZE,
    globalPage * PAGE_SIZE
  );

  const allSites = [...dynamicSites, ...wholesaleSites];
  const latestSites = allSites.slice(0, 3);

  const allPosts = [...dynamicPosts, ...blogPosts];
  const latestPosts = allPosts.slice(0, 3);

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
    {
      id: "vat-calculator",
      title: "부가가치세 계산기",
      description: "공급가액과 합계금액 기준으로 부가세 계산",
      href: "/sellertool/vat-calculator",
    },
    {
      id: "comprehensive-income-tax",
      title: "종합소득세 계산기",
      description: "근로·사업·이자·배당·임대·기타소득 합산 참고 계산",
      href: "/sellertool/comprehensive-income-tax",
    },
    {
      id: "capital-gains-tax",
      title: "양도소득세 계산기",
      description: "취득가, 양도가, 필요경비, 세율 기준 참고 계산",
      href: "/sellertool/capital-gains-tax",
    },
  ];

  const toolPreview = sellerTools.slice(0, 3);

  useEffect(() => {
    setDomesticPage(1);
    setGlobalPage(1);
  }, [searchTerm, regionFilter]);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">판매 채널</h1>
          <p className="mt-2 text-sm text-neutral-600">
            국내 판매 채널부터 해외 확장 채널까지 한눈에 확인하고 비교해보세요.
          </p>
        </div>

        <section className="mb-10 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="판매 채널 검색"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {REGION_FILTERS.map((region) => (
              <button
                key={region}
                onClick={() => setRegionFilter(region)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  regionFilter === region
                    ? "bg-black text-white"
                    : "bg-neutral-100 hover:bg-neutral-200"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">국내 판매 채널</h2>
            <p className="text-sm text-neutral-600">
            한국에서 먼저 테스트 판매하기 좋은 채널들을 확인할 수 있습니다.
            </p>
           </div>
           <span className="text-sm text-neutral-500">{domesticChannels.length}개</span>
           </div>

          {domesticPaged.length === 0 ? (
            <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
              <p className="text-neutral-500">조건에 맞는 국내 판매 채널이 없습니다.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-3">
                {domesticPaged.map((item) => (
                  <a
                    key={item.id}
                    href={`/sales-channel/${item.id}`}
                    className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <img
                      src={
                        item.imageUrl ||
                        "https://via.placeholder.com/600x400?text=Sales+Channel"
                      }
                      alt={item.name}
                      className="h-40 w-full rounded-xl object-cover"
                    />

                    <h3 className="mt-4 text-lg font-bold">{item.name}</h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      {item.region} · {item.category}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {(item.tags || []).slice(0, 4).map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded bg-neutral-100 px-2 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-3 text-sm leading-6 text-neutral-600">
                      {item.shortDescription}
                    </p>
                  </a>
                ))}
              </div>

              <Pagination
                page={domesticPage}
                totalPages={domesticTotalPages}
                onChange={setDomesticPage}
              />
            </>
          )}
        </section>

        <section className="mb-14">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
           <div>
           <h2 className="text-2xl font-bold">해외 판매 채널</h2>
           <p className="text-sm text-neutral-600">
           국내 판매 이후 글로벌로 확장할 때 참고할 수 있는 채널들입니다.
           </p>
          </div>
           <span className="text-sm text-neutral-500">{globalChannels.length}개</span>
          </div>

          {globalPaged.length === 0 ? (
            <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
              <p className="text-neutral-500">조건에 맞는 해외 판매 채널이 없습니다.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-3">
                {globalPaged.map((item) => (
                  <a
                    key={item.id}
                    href={`/sales-channel/${item.id}`}
                     className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <img
                      src={
                        item.imageUrl ||
                        "https://via.placeholder.com/600x400?text=Sales+Channel"
                      }
                      alt={item.name}
                      className="h-40 w-full rounded-xl object-cover"
                    />

                    <h3 className="mt-4 text-lg font-bold">{item.name}</h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      {item.region} · {item.category}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {(item.tags || []).slice(0, 4).map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded bg-neutral-100 px-2 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-3 text-sm leading-6 text-neutral-600">
                      {item.shortDescription}
                    </p>
                  </a>
                ))}
              </div>

              <Pagination
                page={globalPage}
                totalPages={globalTotalPages}
                onChange={setGlobalPage}
              />
            </>
          )}
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">최신 도매 사이트</h2>
            <a
              href="/wholesale"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {latestSites.map((site) => (
              <a
                key={site.id}
                href={`/wholesale/${site.id}`}
                className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-lg font-bold">{site.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {site.region} · {site.category}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(site.tags || []).slice(0, 4).map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded bg-neutral-100 px-2 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {site.shortDescription}
                </p>

                <div className="mt-auto pt-4">
                  <span className="block w-full rounded-xl border border-neutral-300 px-4 py-3 text-center text-sm hover:bg-neutral-100">
                    상세 보기
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">최신 블로그 글</h2>
            <a
              href="/blog"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.id}`}
                className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <img
                  src={
                    post.imageUrl ||
                    "https://via.placeholder.com/600x400?text=Blog"
                  }
                  alt={post.title}
                  className="h-44 w-full rounded-xl object-cover"
                />

                <div className="mt-4 inline-flex w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  {post.category || "블로그"}
                </div>

                <h3 className="mt-3 text-lg font-bold leading-7">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 text-xs text-neutral-500">
                  {post.author || "sellhub"} · {post.date || "-"}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Seller Tools</h2>
            <a
              href="/sellertool"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {toolPreview.map((tool) => (
              <a
                key={tool.id}
                href={tool.href}
                className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-lg font-bold">{tool.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {tool.description}
                </p>

                <div className="mt-auto pt-4">
                  <span className="block w-full rounded-xl bg-black px-4 py-3 text-center text-sm font-medium text-white hover:opacity-90">
                    도구 열기
                  </span>
                </div>
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