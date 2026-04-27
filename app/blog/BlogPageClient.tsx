"use client";

import { useMemo, useState, useEffect } from "react";

const POSTS_PER_PAGE = 5;

export default function BlogPageClient({
  initialPosts,
  initialSites,
  initialChannels,
}: {
  initialPosts: any[];
  initialSites: any[];
  initialChannels: any[];
}) {
  const [posts] = useState(initialPosts);
  const [sites] = useState(initialSites);
  const [channels] = useState(initialChannels);
  const [isLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    return [
      "전체",
      ...Array.from(
        new Set(posts.map((p) => p.category).filter(Boolean))
      ),
    ];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const keyword = searchTerm.toLowerCase();

    return posts.filter((post) => {
      const text = `${post.title} ${post.content}`.toLowerCase();

      return (
        (keyword === "" || text.includes(keyword)) &&
        (selectedCategory === "전체" || post.category === selectedCategory)
      );
    });
  }, [posts, searchTerm, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const pagedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  );

  return (
    <main className="px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">블로그</h1>

        {/* 검색 */}
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색"
          className="border px-4 py-2 w-full mb-4"
        />

        {/* 카테고리 */}
        <div className="flex gap-2 mb-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className="border px-3 py-1"
            >
              {c}
            </button>
          ))}
        </div>

        {/* 리스트 */}
        {isLoading ? (
          <div>로딩중...</div>
        ) : (
          pagedPosts.map((post) => (
            <div key={post.id} className="border p-4 mb-3">
              <h2 className="font-bold">{post.title}</h2>
              <p className="text-sm text-gray-500">{post.category}</p>
            </div>
          ))
        )}

        {/* 페이지네이션 */}
        <div className="flex gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className="border px-3 py-1"
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </main>
  );
}