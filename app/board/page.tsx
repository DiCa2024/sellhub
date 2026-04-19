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

  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const [dynamicChannels, setDynamicChannels] = useState<any[]>([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("boardPosts") || "[]");
    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedBlogPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const savedChannels = JSON.parse(localStorage.getItem("salesChannels") || "[]");

    setPosts(savedPosts);
    setCurrentUser(savedUser);
    setDynamicSites(savedSites);
    setDynamicPosts(savedBlogPosts);
    setDynamicChannels(savedChannels);
  }, []);

  const sortedPosts = useMemo(() => {
    const notice = posts.filter((p) => p.author === ADMIN_EMAIL);
    const normal = posts.filter((p) => p.author !== ADMIN_EMAIL);
    return [...notice, ...normal];
  }, [posts]);

  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE);
  const pagedPosts = sortedPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: string) => {
    if (!confirm("삭제할까요?")) return;

    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    localStorage.setItem("boardPosts", JSON.stringify(updated));
  };

  const allSites = [...dynamicSites, ...wholesaleSites];
  const allBlogs = [...dynamicPosts, ...blogPosts];

  const latestSites = allSites.slice(0, 4);
  const latestBlogs = allBlogs.slice(0, 4);

  const sellerTools = [
    {
      id: "margin-calculator",
      title: "마진 계산기",
      href: "/sellertool/margin-calculator",
    },
    {
      id: "sales-price-calculator",
      title: "판매가 계산기",
      href: "/sellertool/sales-price-calculator",
    },
    {
      id: "commission-calculator",
      title: "수수료 계산기",
      href: "/sellertool/commission-calculator",
    },
    {
      id: "memo-check-tool",
      title: "메모 / 체크 도구",
      href: "/sellertool/memo-check-tool",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">게시판</h1>
            <p className="mt-2 text-sm text-neutral-600">
              회원들이 자유롭게 글을 작성하고 정보를 나누는 공간입니다.
            </p>
          </div>

          {currentUser ? (
            <a
              href="/board/write"
              className="inline-flex rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              글쓰기
            </a>
          ) : (
            <a
              href="/login"
              className="inline-flex rounded-xl border px-4 py-3 text-sm font-medium hover:bg-neutral-100"
            >
              로그인 후 글쓰기
            </a>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white">
          <div className="grid grid-cols-12 bg-neutral-100 p-3 text-sm font-medium">
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
              <div
                key={post.id}
                className="grid grid-cols-12 border-t p-3 text-sm hover:bg-neutral-50"
              >
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

        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>←</button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? "font-bold" : ""}
            >
              {i + 1}
            </button>
          ))}

          <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>→</button>
        </div>

        <section className="mt-14">
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
                    src={site.imageUrl || "https://placehold.co/600x400?text=Wholesale"}
                    alt={site.name}
                    className="h-full w-full object-cover"
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

        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">최신 블로그</h2>
            <a
              href="/blog"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {latestBlogs.map((blog) => (
              <a
                key={blog.id}
                href={`/blog/${blog.id}`}
                className="block overflow-hidden bg-white transition hover:-translate-y-0.5"
              >
                <div className="h-40 w-full overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={blog.imageUrl || "https://placehold.co/600x400?text=Blog"}
                    alt={blog.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="pt-3">
                  <h3 className="line-clamp-2 text-center text-base font-bold leading-6">
                    {blog.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-14">
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
                className="rounded-2xl bg-neutral-100 p-6 text-center transition hover:-translate-y-0.5"
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