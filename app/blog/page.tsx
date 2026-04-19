"use client";

import { useEffect, useMemo, useState } from "react";
import { blogPosts } from "../data/blogPosts";
import { wholesaleSites } from "../data/wholesaleSites";

const POSTS_PER_PAGE = 5;

export default function BlogPage() {
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const featuredPost = allPosts[0];
  const leftBottomPosts = allPosts.slice(1, 3);   // 1,2
  const rightTopPosts = allPosts.slice(3, 8);     // 3~7 (5개)
  const rightBottomPosts = allPosts.slice(8, 10); // 8,9

  const usedTopPostsCount = 10; // 위에서 0~9까지 사용

const pagedPosts = allPosts.slice(
  usedTopPostsCount + (currentPage - 1) * POSTS_PER_PAGE,
  usedTopPostsCount + currentPage * POSTS_PER_PAGE
);

  const totalPages = Math.max(
  1,
  Math.ceil((allPosts.length - usedTopPostsCount) / POSTS_PER_PAGE)
);

  const latestSites = allSites.slice(0, 4);
  const latestChannels = channels.slice(0, 4);

  const sellerTools = [
    { id: 1, title: "마진 계산기", href: "/sellertool/margin-calculator" },
    { id: 2, title: "판매가 계산기", href: "/sellertool/sales-price-calculator" },
    { id: 3, title: "수수료 계산기", href: "/sellertool/commission-calculator" },
    { id: 4, title: "메모 / 체크", href: "/sellertool/memo-check-tool" },
  ];

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* 🔥 상단 영역 */}
        {featuredPost && (
          <section className="mb-14 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">

            {/* 왼쪽 */}
            <div>
              <a href={`/blog/${featuredPost.id}`}>
                <div className="h-64 w-full overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={featuredPost.imageUrl || "https://placehold.co/1200x700"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h2 className="mt-4 text-2xl font-bold">
                  {featuredPost.title}
                </h2>
              </a>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {leftBottomPosts.map((post) => (
                  <a key={post.id} href={`/blog/${post.id}`}>
                    <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
                      <img src={post.imageUrl} className="h-full w-full object-cover" />
                    </div>
                    <h3 className="mt-2 text-sm font-bold">{post.title}</h3>
                  </a>
                ))}
              </div>
            </div>

            {/* 오른쪽 */}
            <div className="flex flex-col gap-6">

              {/* 🔥 제목 5개 */}
              <div className="space-y-4">
                {rightTopPosts.map((post) => (
                  <a
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="block rounded-xl border border-neutral-200 px-4 py-3"
                  >
                    <h3 className="text-sm font-bold">{post.title}</h3>
                  </a>
                ))}
              </div>

              {/* 🔥 이미지 + 제목 2개 */}
              <div className="space-y-4">
                {rightBottomPosts.map((post) => (
                  <a
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="flex items-center gap-4 rounded-xl border border-neutral-200 px-3 py-3"
                  >
                    <div className="h-24 w-32 overflow-hidden rounded-lg bg-neutral-100">
                      <img src={post.imageUrl} className="h-full w-full object-cover" />
                    </div>
                    <h3 className="text-sm font-bold line-clamp-3">
                      {post.title}
                    </h3>
                  </a>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* 🔥 전체 글 복구 */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">전체 글</h2>

          <div className="space-y-4">
            {pagedPosts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.id}`}
                className="flex gap-4 rounded-2xl border border-neutral-200 p-4"
              >
                <div className="h-24 w-32 overflow-hidden rounded-lg bg-neutral-100">
                  <img src={post.imageUrl} className="h-full w-full object-cover" />
                </div>
                <h3 className="font-bold">{post.title}</h3>
              </a>
            ))}
          </div>

         <div className="mt-6 flex justify-center gap-2">
  <button
    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
    className="rounded-lg border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100"
  >
    ←
  </button>

  {[...Array(totalPages)].map((_, i) => {
    const pageNumber = i + 1;
    const isActive = currentPage === pageNumber;

    return (
      <button
        key={i}
        onClick={() => setCurrentPage(pageNumber)}
        className={`rounded-lg px-3 py-2 text-sm ${
          isActive
            ? "border border-black bg-black font-semibold text-white"
            : "border border-neutral-300 bg-white hover:bg-neutral-100"
        }`}
      >
        {pageNumber}
      </button>
    );
  })}

  <button
    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
    className="rounded-lg border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100"
  >
    →
  </button>
</div> 
        </section>

        {/* 🔥 도매 */}
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
              <a key={site.id} href={`/wholesale/${site.id}`}>
                <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
                  <img src={site.imageUrl} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-2 text-center font-bold">{site.name}</h3>
              </a>
            ))}
          </div>
        </section>

        {/* 🔥 판매채널 */}
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
              <a key={item.id} href={`/sales-channel/${item.id}`}>
                <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
                  <img src={item.imageUrl} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-2 text-center font-bold">{item.name}</h3>
              </a>
            ))}
          </div>
        </section>

        {/* 🔥 Seller Tools */}
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
          <div className="grid gap-6 md:grid-cols-4">
            {sellerTools.map((tool) => (
              <a key={tool.id} href={tool.href} className="p-6 text-center bg-neutral-100 rounded-2xl">
                <h3 className="font-bold">{tool.title}</h3>
              </a>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}