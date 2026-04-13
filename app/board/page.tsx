"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { wholesaleSites } from "../data/wholesaleSites";
import { blogPosts } from "../data/blogPosts";

const PAGE_SIZE = 10;
const ADMIN_EMAIL = "admin@gmail.com";

export default function BoardPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("boardPosts") || "[]");
    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");

    setPosts(savedPosts);
    setCurrentUser(savedUser);
  }, []);

  // 🔥 공지글 위로 올리기
  const sortedPosts = useMemo(() => {
    const notice = posts.filter(p => p.author === ADMIN_EMAIL);
    const normal = posts.filter(p => p.author !== ADMIN_EMAIL);
    return [...notice, ...normal];
  }, [posts]);

  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE);
  const pagedPosts = sortedPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: string) => {
    if (!confirm("삭제할까요?")) return;

    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    localStorage.setItem("boardPosts", JSON.stringify(updated));
  };

  const latestSites = wholesaleSites.slice(0, 3);
  const latestBlogs = blogPosts.slice(0, 3);

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div> <h1 className="text-3xl font-bold">게시판</h1>
          <p className="mt-2 text-sm text-neutral-600">
            회원들이 자유롭게 글을 작성하고 정보를 나누는 공간입니다.
          </p>
        </div>
          <a   href="/board/write"
              className="inline-flex rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-90"
          >
             글쓰기
          </a>
      </div>

        {/* 리스트형 게시판 */}
        <div className="rounded-2xl border bg-white overflow-hidden">
          <div className="grid grid-cols-12 bg-neutral-100 text-sm font-medium p-3">
            <div className="col-span-1">번호</div>
            <div className="col-span-6">제목</div>
            <div className="col-span-2">작성자</div>
            <div className="col-span-2">날짜</div>
            <div className="col-span-1">조회</div>
          </div>

          {pagedPosts.map((post, i) => {
            const isNotice = post.author === ADMIN_EMAIL;
            const isMine = currentUser?.email === post.author;

            return (
              <div key={post.id} className="grid grid-cols-12 border-t p-3 text-sm hover:bg-neutral-50">
                <div className="col-span-1">
                  {isNotice ? "공지" : sortedPosts.length - ((page - 1) * PAGE_SIZE + i)}
                </div>

                <div className="col-span-6 flex gap-2">
                  {isNotice && <span className="text-red-500">[공지]</span>}
                  <Link href={`/board/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </div>

                <div className="col-span-2">
                  {post.nickname || post.author?.split("@")[0]}
                </div>

                <div className="col-span-2">{post.date}</div>
                <div className="col-span-1">{post.views || 0}</div>

                {isMine && (
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-xs text-red-500"
                  >
                    삭제
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* 페이지네이션 */}
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(p - 1, 1))}>←</button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? "font-bold" : ""}
            >
              {i + 1}
            </button>
          ))}

          <button onClick={() => setPage(p => Math.min(p + 1, totalPages))}>→</button>
        </div>

        {/* 하단 도매 */}
        <h2 className="mt-14 text-2xl font-bold">최신 도매</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
  {latestSites.map((site) => (
    <a
      key={site.id}
      href={`/wholesale/${site.id}`}
      className="block rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="font-bold">{site.name}</div>
      <div className="mt-1 text-sm text-neutral-500">
        {site.region} · {site.category}
      </div>
      <div className="mt-2 text-sm text-neutral-600">
        {site.shortDescription}
      </div>
    </a>
  ))}
</div>

        {/* 하단 블로그 */}
        <h2 className="mt-10 text-2xl font-bold">최신 블로그</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
  {latestBlogs.map((blog) => (
    <a
      key={blog.id}
      href={`/blog/${blog.id}`}
      className="block rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="font-bold">{blog.title}</div>
      <div className="mt-1 text-sm text-neutral-500">
        {blog.category} · {blog.date}
      </div>
      <div className="mt-2 text-sm text-neutral-600">
        {blog.excerpt}
      </div>
    </a>
  ))}
</div>
  </main>
  );
}