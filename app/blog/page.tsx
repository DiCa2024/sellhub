"use client";

import { useEffect, useMemo, useState } from "react";

const POSTS_PER_PAGE = 5;

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        const [blogRes, siteRes, channelRes] = await Promise.all([
          fetch("/api/blog", { cache: "no-store" }),
          fetch("/api/wholesale", { cache: "no-store" }),
          fetch("/api/sales-channel", { cache: "no-store" }),
        ]);

        const blogData = await blogRes.json();
        const siteData = await siteRes.json();
        const channelData = await channelRes.json();

        setPosts(blogData.success ? blogData.data : []);
        setSites(siteData.success ? siteData.data : []);
        setChannels(channelData.success ? channelData.data : []);
      } catch (error) {
        console.error("블로그 페이지 DB 데이터 로딩 오류:", error);
        setPosts([]);
        setSites([]);
        setChannels([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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
  const leftBottomPosts = filteredPosts.slice(1, 3);
  const rightTopPosts = filteredPosts.slice(3, 8);
  const rightBottomPosts = filteredPosts.slice(8, 10);

  const usedTopPostsCount = 10;

  const pagedPosts = filteredPosts.slice(
    usedTopPostsCount + (currentPage - 1) * POSTS_PER_PAGE,
    usedTopPostsCount + currentPage * POSTS_PER_PAGE
  );

  const totalPages = Math.max(
    1,
    Math.ceil(
      Math.max(filteredPosts.length - usedTopPostsCount, 0) / POSTS_PER_PAGE
    )
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
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">블로그</h1>
          <p className="mt-2 text-sm text-neutral-600">
            셀러를 위한 도매, 판매 채널, 운영 팁, 실전 노하우를 한눈에 확인할 수 있습니다.
          </p>
        </div>

        <section className="mb-10 overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-white px-6 py-8 md:px-8">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600">
                Blog Directory
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                블로그 글 검색
              </h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600 md:text-base">
                카테고리와 키워드로 원하는 블로그 글을 빠르게 찾고,
                셀러 운영에 필요한 정보만 골라서 확인해보세요.
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
                  placeholder="제목, 카테고리, 내용으로 검색해보세요"
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
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("전체");
                    }}
                    className="text-xs text-neutral-500 transition hover:text-neutral-900"
                  >
                    전체 초기화
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
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
            </div>
          </div>
        </section>

        {isLoading ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
            블로그 데이터를 불러오는 중입니다.
          </div>
        ) : (
          <>
            {featuredPost && (
              <section className="mb-14 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
                <div>
                  <a href={`/blog/${featuredPost.id}`} className="block">
                    <div className="h-64 w-full overflow-hidden rounded-2xl bg-neutral-100">
                      <img
                        src={
                          featuredPost.imageUrl ||
                          "https://placehold.co/1200x700?text=Blog"
                        }
                        alt={featuredPost.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/1200x700?text=Blog";
                        }}
                      />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold">
                      {featuredPost.title}
                    </h2>
                  </a>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {leftBottomPosts.map((post) => (
                      <a key={post.id} href={`/blog/${post.id}`} className="block">
                        <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
                          <img
                            src={
                              post.imageUrl ||
                              "https://placehold.co/600x400?text=Blog"
                            }
                            alt={post.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://placehold.co/600x400?text=Blog";
                            }}
                          />
                        </div>
                        <h3 className="mt-2 text-sm font-bold">{post.title}</h3>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
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

                  <div className="space-y-4">
                    {rightBottomPosts.map((post) => (
                      <a
                        key={post.id}
                        href={`/blog/${post.id}`}
                        className="flex items-center gap-4 rounded-xl border border-neutral-200 px-3 py-3"
                      >
                        <div className="h-24 w-32 overflow-hidden rounded-lg bg-neutral-100">
                          <img
                            src={
                              post.imageUrl ||
                              "https://placehold.co/600x400?text=Blog"
                            }
                            alt={post.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://placehold.co/600x400?text=Blog";
                            }}
                          />
                        </div>
                        <h3 className="line-clamp-3 text-sm font-bold">
                          {post.title}
                        </h3>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <section className="mb-16">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">전체 글</h2>
                <span className="text-sm text-neutral-500">
                  {Math.max(filteredPosts.length - usedTopPostsCount, 0)}개
                </span>
              </div>

              <div className="space-y-4">
                {pagedPosts.length === 0 ? (
                  <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center text-neutral-500">
                    조건에 맞는 글이 없습니다.
                  </div>
                ) : (
                  pagedPosts.map((post) => (
                    <a
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4"
                    >
                      <div className="h-24 w-32 overflow-hidden rounded-lg bg-neutral-100">
                        <img
                          src={
                            post.imageUrl ||
                            "https://placehold.co/600x400?text=Blog"
                          }
                          alt={post.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/600x400?text=Blog";
                          }}
                        />
                      </div>
                      <h3 className="font-bold">{post.title}</h3>
                    </a>
                  ))
                )}
              </div>

              <div className="mt-6 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 disabled:opacity-40"
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
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 disabled:opacity-40"
                >
                  →
                </button>
              </div>
            </section>
          </>
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
              <a key={site.id} href={`/wholesale/${site.id}`} className="block">
                <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={
                      site.imageUrl ||
                      "https://placehold.co/600x400?text=Wholesale"
                    }
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
              <a key={item.id} href={`/sales-channel/${item.id}`} className="block">
                <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={
                      item.imageUrl ||
                      "https://placehold.co/600x400?text=Channel"
                    }
                    alt={item.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=Channel";
                    }}
                  />
                </div>
                <h3 className="mt-2 text-center font-bold">{item.name}</h3>
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

          <div className="grid gap-6 md:grid-cols-4">
            {sellerTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.href}
                className="rounded-2xl bg-neutral-100 p-6 text-center"
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