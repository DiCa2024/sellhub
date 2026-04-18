"use client";

import { useEffect, useMemo, useState } from "react";
import { blogPosts } from "../data/blogPosts";
import { wholesaleSites } from "../data/wholesaleSites";

export default function BlogPage() {
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedChannels = JSON.parse(localStorage.getItem("salesChannels") || "[]");

    setDynamicPosts(savedPosts);
    setDynamicSites(savedSites);
    setChannels(savedChannels);
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
  const leftBottomPosts = filteredPosts.slice(1, 3);
  const rightTopPosts = filteredPosts.slice(3, 8);
  const rightBottomPosts = filteredPosts.slice(8, 10);

  const latestSites = allSites.slice(0, 4);
  const latestChannels = channels.slice(0, 4);

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
          <section className="mb-14 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <a
                href={`/blog/${featuredPost.id}`}
                className="block overflow-hidden bg-white transition hover:-translate-y-0.5"
              >
                <div className="h-64 w-full overflow-hidden rounded-2xl bg-neutral-100 md:h-80">
                  <img
                    src={
                      featuredPost.imageUrl ||
                      "https://placehold.co/1200x700?text=Blog"
                    }
                    alt={featuredPost.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/1200x700?text=Blog";
                    }}
                  />
                </div>

                <div className="pt-4">
                  <h2 className="line-clamp-2 text-2xl font-bold leading-tight">
                    {featuredPost.title}
                  </h2>
                </div>
              </a>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {leftBottomPosts.map((post) => (
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
                      <h3 className="line-clamp-2 text-base font-bold leading-6">
                        {post.title}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="space-y-3">
                {rightTopPosts.map((post) => (
                  <a
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="block bg-white px-1 py-1 transition hover:-translate-y-0.5"
                  >
                    <h3 className="line-clamp-2 text-sm font-bold leading-6 text-neutral-900">
                      {post.title}
                    </h3>
                  </a>
                ))}
              </div>

              <div className="space-y-4">
                {rightBottomPosts.map((post) => (
                  <a
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="flex gap-4 bg-white transition hover:-translate-y-0.5"
                  >
                    <div className="h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                      <img
                        src={
                          post.imageUrl ||
                          "https://placehold.co/400x300?text=Blog"
                        }
                        alt={post.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/400x300?text=Blog";
                        }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-3 text-sm font-bold leading-6 text-neutral-900">
                        {post.title}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="mb-12 p-10 text-center">
            <h2 className="text-2xl font-bold">등록된 블로그 글이 없습니다.</h2>
          </section>
        )}

        <section className="mb-16">
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
                <div className="h-40 w-full overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={
                      site.imageUrl ||
                      "https://placehold.co/600x400?text=Wholesale"
                    }
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

        <section className="mb-16">
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

          <div className="grid gap-6 md:grid-cols-4">
            {sellerTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.href}
                className="flex min-h-[150px] flex-col rounded-2xl bg-neutral-50 p-5 transition hover:-translate-y-0.5"
              >
                <h3 className="text-center text-lg font-bold">{tool.title}</h3>
                <p className="mt-3 text-center text-sm leading-6 text-neutral-600">
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