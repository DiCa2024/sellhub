"use client";

import { useEffect, useMemo, useState } from "react";
import { blogPosts } from "../data/blogPosts";
import { wholesaleSites } from "../data/wholesaleSites";

export default function BlogPage() {
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");

    setDynamicPosts(savedPosts);
    setDynamicSites(savedSites);
  }, []);

  const allPosts = [...dynamicPosts, ...blogPosts];
  const allSites = [...dynamicSites, ...wholesaleSites];

  const categories = useMemo(() => {
    const values = Array.from(
      new Set(allPosts.map((post) => post.category).filter(Boolean))
    );
    return ["전체", ...values];
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "전체") return allPosts;
    return allPosts.filter((post) => post.category === selectedCategory);
  }, [allPosts, selectedCategory]);

  const featuredPost = filteredPosts[0];
  const listPosts = filteredPosts.slice(1);

  const latestSites = allSites.slice(0, 3);

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

  const randomTools = useMemo(() => {
    const shuffled = [...sellerTools].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">블로그</h1>
          <p className="mt-2 text-sm text-neutral-600">
            셀러를 위한 도매, 소싱, 운영, 세금, 정산 관련 글을 모아볼 수 있습니다.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "border border-neutral-300 bg-white hover:bg-neutral-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {featuredPost ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <a
              href={`/blog/${featuredPost.id}`}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
            >
              
              <div className="p-6">
                <div className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  {featuredPost.category}
                </div>
                <h2 className="text-2xl font-bold leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-4 text-xs text-neutral-500">
                  {featuredPost.author} · {featuredPost.date}
                </div>
              </div>
            </a>

            <div className="space-y-4">
              {listPosts.slice(0, 4).map((post) => (
                <a
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="flex gap-4 rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="h-24 w-32 overflow-hidden rounded-xl bg-neutral-100">
  <img
    src={post.imageUrl || "https://via.placeholder.com/400x300?text=Blog"}
    alt={post.title}
    className="h-full w-full object-cover"
  />
</div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 inline-flex rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
                      {post.category}
                    </div>
                    <h3 className="truncate text-base font-bold">{post.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-neutral-600">
                      {post.excerpt}
                    </p>
                    <div className="mt-2 text-xs text-neutral-500">
                      {post.author} · {post.date}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ) : (
          <section className="mb-12 rounded-2xl border bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold">등록된 블로그 글이 없습니다.</h2>
          </section>
        )}

        <section className="mb-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">전체 글</h2>
            <span className="text-sm text-neutral-500">
              {filteredPosts.length}개
            </span>
          </div>

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.id}`}
                className="flex flex-col gap-4 rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md md:flex-row"
              >
                <div className="h-40 w-full overflow-hidden rounded-xl bg-neutral-100 md:h-32 md:w-48">
  <img
    src={post.imageUrl || "https://via.placeholder.com/600x400?text=Blog"}
    alt={post.title}
    className="h-full w-full object-cover"
  />
</div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold leading-7">{post.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 text-xs text-neutral-500">
                    {post.author} · {post.date}
                  </div>
                </div>
              </a>
            ))}
          </div>
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
              <div
                key={site.id}
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
                  <a
                    href={`/wholesale/${site.id}`}
                    className="block w-full rounded-xl border border-neutral-300 px-4 py-3 text-center text-sm hover:bg-neutral-100"
                  >
                    상세 보기
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">추천 Seller Tools</h2>
            <a
              href="/sellertool"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {randomTools.map((tool) => (
              <div
                key={tool.id}
                className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-lg font-bold">{tool.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {tool.description}
                </p>

                <div className="mt-auto pt-4">
                  <a
                    href={tool.href}
                    className="block w-full rounded-xl bg-black px-4 py-3 text-center text-sm font-medium text-white hover:opacity-90"
                  >
                    도구 열기
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}