"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const POSTS_PER_PAGE = 6;

const categories = [
  "전체",
  "basics",
  "on-page",
  "off-page",
  "technical",
  "ai-automation",
  "case-study",
];

export default function SeoPageClient({
  posts,
}: {
  posts: any[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

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
        selectedCategory === "전체" ||
        post.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const listPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  );

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        {/* HERO */}
        <section className="mb-10 overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-white px-6 py-10 md:px-8">
            <p className="mb-3 inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600">
              SEO Learning Center
            </p>

            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              SEO를 배우고,
              <br />
              직접 성장시키는 공간
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600 md:text-base">
              검색엔진 최적화의 기본부터 콘텐츠 전략,
              기술 SEO, AI 활용법, 실제 성장 사례까지
              SEO 운영에 필요한 정보를 제공합니다.
            </p>

            {/* SEARCH */}
            <div className="mt-8 flex flex-col gap-3 md:flex-row">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="SEO 글 검색"
                className="h-14 w-full rounded-2xl border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-neutral-900"
              />

              <button
                type="button"
                className="h-14 rounded-2xl bg-neutral-900 px-6 text-sm font-medium text-white transition hover:opacity-90 md:min-w-[120px]"
              >
                검색
              </button>
            </div>

            {/* CATEGORY */}
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

        {/* POSTS */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              전체 SEO 글
            </h2>

            <span className="text-sm text-neutral-500">
              {filteredPosts.length}개
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center text-neutral-500">
              검색 결과가 없습니다.
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {listPosts.map((post) => (
                  <SeoCard key={post.id} post={post} />
                ))}
              </div>

              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onChange={setCurrentPage}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function SeoCard({ post }: { post: any }) {
  return (
    <Link
      href={`/seo/${post.category.trim()}/${post.slug.trim()}`}
      className="flex h-full flex-col rounded-[24px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-44 overflow-hidden rounded-2xl bg-neutral-100">
  <Image
    src={post.imageUrl || "https://placehold.co/600x400?text=SEO"}
    alt={post.title || "SEO"}
    fill
    sizes="(max-width: 768px) 100vw, 33vw"
    className="object-cover"
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
    </Link>
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
  if (totalPages <= 1) return null;

  const MAX_VISIBLE = 5;

  let startPage = Math.max(
    1,
    page - Math.floor(MAX_VISIBLE / 2)
  );

  let endPage = startPage + MAX_VISIBLE - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - MAX_VISIBLE + 1);
  }

  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-10 flex justify-center gap-2">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
      >
        ←
      </button>

      {pages.map((pageNumber) => (
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
      ))}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
      >
        →
      </button>
    </div>
  );
}