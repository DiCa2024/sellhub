"use client";

import { useEffect, useMemo, useState } from "react";

const POSTS_PER_PAGE = 6;

export default function BlogPageClient({
  initialPosts,
  initialSites,
  initialChannels,
}: {
  initialPosts: any[];
  initialSites: any[];
  initialChannels: any[];
}) {
  const [posts] = useState<any[]>(initialPosts);
  const [sites] = useState<any[]>(initialSites);
  const [channels] = useState<any[]>(initialChannels);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    return [
      "전체",
      ...Array.from(
        new Set(
          posts
            .map((post) => String(post.category || "").trim())
            .filter(Boolean)
        )
      ),
    ];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return posts.filter((post) => {
      const searchTarget = [
        post.title,
        post.category,
        post.excerpt,
        post.content,
      ]
        .join(" ")
        .toLowerCase();

      const matchSearch =
        keyword.length === 0 || searchTarget.includes(keyword);

      const matchCategory =
        selectedCategory === "전체" || post.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const featuredPost = filteredPosts[0];
  const subPosts = filteredPosts.slice(1, 3);
  const sidePosts = filteredPosts.slice(3, 8);
  const popularPosts = [...posts]
    .sort((a, b) => Number(b.views || 0) - Number(a.views || 0))
    .slice(0, 5);

  const usedTopCount = 8;

  const listPosts = filteredPosts.slice(
    usedTopCount + (currentPage - 1) * POSTS_PER_PAGE,
    usedTopCount + currentPage * POSTS_PER_PAGE
  );

  const totalPages = Math.max(
    1,
    Math.ceil(Math.max(filteredPosts.length - usedTopCount, 0) / POSTS_PER_PAGE)
  );

  const latestSites = sites.slice(0, 4);
  const latestChannels = channels.slice(0, 4);

  const sellerTools = [
    { id: 1, title: "마진 계산기", href: "/sellertool/margin-calculator" },
    { id: 2, title: "판매가 계산기", href: "/sellertool/sales-price-calculator" },
    { id: 3, title: "수수료 계산기", href: "/sellertool/commission-calculator" },
    { id: 4, title: "메모 / 체크", href: "/sellertool/memo-check-tool" },
  ];

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-white px-6 py-10 md:px-8">
            <p className="mb-3 inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600">
              Seller Blog
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              셀러를 위한 실전 블로그
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600 md:text-base">
              도매 사이트, 판매 채널, 상품 소싱, 운영 전략까지 온라인 셀러에게 필요한 정보를 한곳에서 확인하세요.
            </p>

            <div className="mt-8 flex flex-col gap-3 md:flex-row">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="제목, 카테고리, 내용으로 검색해보세요"
                className="h-14 w-full rounded-2xl border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-neutral-900"
              />
              <button
                type="button"
                className="h-14 rounded-2xl bg-neutral-900 px-6 text-sm font-medium text-white transition hover:opacity-90 md:min-w-[120px]"
              >
                검색
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((item) => {
                const active = selectedCategory === item;

                return (
                  <button
                    key={item}
                    onClick={() => setSelectedCategory(item)}
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
        </section>

        {featuredPost ? (
          <section className="mb-16 grid gap-8 lg:grid-cols-[1.35fr_0.75fr]">
            <div>
              <a
                href={`/blog/${featuredPost.id}`}
                className="group block overflow-hidden rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="h-[320px] overflow-hidden rounded-2xl bg-neutral-100 md:h-[430px]">
                  <img
                    src={
                      featuredPost.imageUrl ||
                      "https://placehold.co/1200x700?text=Blog"
                    }
                    alt={featuredPost.title}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/1200x700?text=Blog";
                    }}
                  />
                </div>

                <div className="mt-5">
                  <div className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                    {featuredPost.category}
                  </div>
                  <h2 className="text-2xl font-bold leading-tight md:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-neutral-600">
                    {featuredPost.excerpt || featuredPost.content}
                  </p>
                  <div className="mt-4 text-xs text-neutral-500">
                    조회수 {featuredPost.views ?? 0}
                  </div>
                </div>
              </a>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {subPosts.map((post) => (
                  <BlogSmallCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            <aside className="space-y-8">
              <div className="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
                <h2 className="mb-5 text-xl font-bold">인기 글 TOP 5</h2>
                <div className="space-y-4">
                  {popularPosts.map((post, index) => (
                    <a
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="flex gap-3 rounded-2xl p-2 transition hover:bg-neutral-50"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="line-clamp-2 text-sm font-bold leading-6">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-xs text-neutral-500">
                          조회수 {post.views ?? 0}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
                <h2 className="mb-5 text-xl font-bold">추천 글</h2>
                <div className="space-y-4">
                  {sidePosts.map((post) => (
                    <a
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="flex gap-4 rounded-2xl p-2 transition hover:bg-neutral-50"
                    >
                      <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                        <img
                          src={
                            post.imageUrl ||
                            "https://placehold.co/400x300?text=Blog"
                          }
                          alt={post.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/400x300?text=Blog";
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="line-clamp-3 text-sm font-bold leading-6">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-xs text-neutral-500">
                          {post.category}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </section>
        ) : (
          <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center text-neutral-500">
            조건에 맞는 글이 없습니다.
          </div>
        )}

        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">전체 글</h2>
            <span className="text-sm text-neutral-500">
              {filteredPosts.length}개
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {listPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length > usedTopCount && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onChange={setCurrentPage}
            />
          )}
        </section>

        <RecommendSection
          title="최신 도매 사이트"
          href="/wholesale"
          items={latestSites}
          type="site"
        />

        <RecommendSection
          title="판매 채널"
          href="/sales-channel"
          items={latestChannels}
          type="channel"
        />

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
              <a
                key={tool.id}
                href={tool.href}
                className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
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

function BlogSmallCard({ post }: { post: any }) {
  return (
    <a
      href={`/blog/${post.id}`}
      className="block rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
        <img
          src={post.imageUrl || "https://placehold.co/600x400?text=Blog"}
          alt={post.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x400?text=Blog";
          }}
        />
      </div>
      <h3 className="mt-3 line-clamp-2 text-base font-bold leading-6">
        {post.title}
      </h3>
    </a>
  );
}

function BlogCard({ post }: { post: any }) {
  return (
    <a
      href={`/blog/${post.id}`}
      className="flex h-full flex-col rounded-[24px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="h-44 overflow-hidden rounded-2xl bg-neutral-100">
        <img
          src={post.imageUrl || "https://placehold.co/600x400?text=Blog"}
          alt={post.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x400?text=Blog";
          }}
        />
      </div>

      <div className="mt-4 inline-flex w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
        {post.category}
      </div>

      <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-7">
        {post.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
        {post.excerpt || post.content}
      </p>

      <div className="mt-auto pt-4 text-xs text-neutral-500">
        조회수 {post.views ?? 0}
      </div>
    </a>
  );
}

function RecommendSection({
  title,
  href,
  items,
  type,
}: {
  title: string;
  href: string;
  items: any[];
  type: "site" | "channel";
}) {
  return (
    <section className="mb-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <a
          href={href}
          className="text-sm font-medium text-neutral-600 hover:text-black"
        >
          전체 보기 →
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={`/${type === "site" ? "wholesale" : "sales-channel"}/${
              item.id
            }`}
            className="block rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="h-36 overflow-hidden rounded-2xl bg-neutral-100">
              <img
                src={
                  item.imageUrl ||
                  `https://placehold.co/600x400?text=${
                    type === "site" ? "Wholesale" : "Channel"
                  }`
                }
                alt={item.name}
                className="h-full w-full object-contain bg-white p-2"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/600x400?text=${
                    type === "site" ? "Wholesale" : "Channel"
                  }`;
                }}
              />
            </div>

            <h3 className="mt-3 line-clamp-2 text-center text-sm font-bold leading-6">
              {item.name}
            </h3>
          </a>
        ))}
      </div>
    </section>
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
    <div className="mt-8 flex justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNumber = i + 1;

        return (
          <button
            key={pageNumber}
            onClick={() => onChange(pageNumber)}
            className={`rounded-lg px-3 py-2 text-sm ${
              page === pageNumber
                ? "bg-black text-white"
                : "border border-neutral-300 bg-white hover:bg-neutral-100"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}