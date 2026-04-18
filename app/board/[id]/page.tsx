"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { wholesaleSites } from "../../data/wholesaleSites";
import { blogPosts } from "../../data/blogPosts";

const BOARD_PREVIEW_PAGE_SIZE = 5;

export default function BoardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);

  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const [dynamicChannels, setDynamicChannels] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [viewUpdated, setViewUpdated] = useState(false);
  const [boardPage, setBoardPage] = useState(1);

  useEffect(() => {
    const savedBoardPosts = JSON.parse(localStorage.getItem("boardPosts") || "[]");
    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const savedChannels = JSON.parse(localStorage.getItem("salesChannels") || "[]");

    setPosts(savedBoardPosts);
    setCurrentUser(savedUser);
    setDynamicSites(savedSites);
    setDynamicPosts(savedPosts);
    setDynamicChannels(savedChannels);
    setLoaded(true);
  }, []);

  const post = posts.find((item) => item.id === id);

  useEffect(() => {
    if (!loaded || !post || viewUpdated) return;

    const updatedPosts = posts.map((item) =>
      item.id === id ? { ...item, views: (item.views || 0) + 1 } : item
    );

    localStorage.setItem("boardPosts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setViewUpdated(true);
  }, [loaded, post, posts, id, viewUpdated]);

  const handleDelete = () => {
    const ok = confirm("이 게시글을 삭제할까요?");
    if (!ok) return;

    const updatedPosts = posts.filter((item) => item.id !== id);
    localStorage.setItem("boardPosts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    router.push("/board");
  };

  const sortedBoardPosts = useMemo(() => {
    const ADMIN_EMAIL = "admin@gmail.com";
    const notice = posts.filter((p) => p.author === ADMIN_EMAIL);
    const normal = posts.filter((p) => p.author !== ADMIN_EMAIL);
    return [...notice, ...normal];
  }, [posts]);

  const boardTotalPages = Math.max(
    1,
    Math.ceil(sortedBoardPosts.length / BOARD_PREVIEW_PAGE_SIZE)
  );

  const pagedBoardPosts = sortedBoardPosts.slice(
    (boardPage - 1) * BOARD_PREVIEW_PAGE_SIZE,
    boardPage * BOARD_PREVIEW_PAGE_SIZE
  );

  const allSites = [...dynamicSites, ...wholesaleSites];
  const latestSites = allSites.slice(0, 4);

  const allBlogPosts = [...dynamicPosts, ...blogPosts];
  const latestBlogPosts = allBlogPosts.slice(0, 4);

  const latestChannels = dynamicChannels.slice(0, 4);

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

  if (!loaded) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-5xl rounded-2xl border bg-white p-8 shadow-sm">
          <p className="text-neutral-600">불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-5xl rounded-2xl border bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">게시글을 찾을 수 없습니다.</h1>
          <p className="mt-3 text-neutral-600">
            요청한 게시글이 존재하지 않거나 아직 불러오지 못했습니다.
          </p>
          <a
            href="/board"
            className="mt-6 inline-flex rounded-xl bg-black px-4 py-3 text-sm text-white"
          >
            게시판으로 돌아가기
          </a>
        </div>
      </main>
    );
  }

  const isMine = currentUser?.email && currentUser.email === post.author;
  const ADMIN_EMAIL = "admin@gmail.com";

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <a
          href="/board"
          className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
        >
          ← 게시판으로 돌아가기
        </a>

        <article className="mt-6 overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="border-b bg-gradient-to-b from-neutral-50 to-white px-8 py-10 md:px-12">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                자유 게시글
              </div>

              {isMine && (
                <div className="flex gap-2">
                  <a
                    href={`/board/edit/${post.id}`}
                    className="rounded-lg border px-3 py-2 text-xs hover:bg-neutral-100"
                  >
                    수정
                  </a>

                  <button
                    onClick={handleDelete}
                    className="rounded-lg border px-3 py-2 text-xs hover:bg-neutral-100"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>

            <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
              <span>{post.nickname || post.author?.split("@")[0] || "회원"}</span>
              <span>·</span>
              <span>{post.date || "-"}</span>
              <span>·</span>
              <span>조회수 {post.views || 0}</span>
            </div>
          </div>

          <div className="px-8 py-10 md:px-12">
            <div className="whitespace-pre-line rounded-2xl bg-neutral-50 p-6 text-base leading-8 text-neutral-700">
              {post.content}
            </div>
          </div>
        </article>

        {/* 게시판 미리보기 */}
        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">게시판</h2>
            <a
              href="/board"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 글 보기 →
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-white">
            <div className="grid grid-cols-12 bg-neutral-100 p-3 text-sm font-medium">
              <div className="col-span-1">번호</div>
              <div className="col-span-6">제목</div>
              <div className="col-span-2">작성자</div>
              <div className="col-span-2">날짜</div>
              <div className="col-span-1">조회</div>
            </div>

            {pagedBoardPosts.map((item, i) => {
              const isNotice = item.author === ADMIN_EMAIL;

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-12 border-t p-3 text-sm hover:bg-neutral-50"
                >
                  <div className="col-span-1">
                    {isNotice
                      ? "공지"
                      : sortedBoardPosts.length -
                        ((boardPage - 1) * BOARD_PREVIEW_PAGE_SIZE + i)}
                  </div>

                  <div className="col-span-6 flex gap-2">
                    {isNotice && <span className="text-red-500">[공지]</span>}
                    <Link href={`/board/${item.id}`} className="hover:underline">
                      {item.title}
                    </Link>
                  </div>

                  <div className="col-span-2">
                    {item.nickname || item.author?.split("@")[0] || "회원"}
                  </div>

                  <div className="col-span-2">{item.date || "-"}</div>
                  <div className="col-span-1">{item.views || 0}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => setBoardPage((p) => Math.max(p - 1, 1))}
              className="rounded-lg border px-3 py-2 text-sm"
            >
              ←
            </button>

            {Array.from({ length: boardTotalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setBoardPage(i + 1)}
                className={`rounded-lg px-3 py-2 text-sm ${
                  boardPage === i + 1
                    ? "bg-black text-white"
                    : "border hover:bg-neutral-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setBoardPage((p) => Math.min(p + 1, boardTotalPages))
              }
              className="rounded-lg border px-3 py-2 text-sm"
            >
              →
            </button>
          </div>
        </section>

        {/* 최신 도매 사이트 */}
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
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=Wholesale";
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

        {/* 최신 판매 채널 */}
        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">최신 판매 채널</h2>
            <a
              href="/sales-channel"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {latestChannels.map((channel) => (
              <a
                key={channel.id}
                href={`/sales-channel/${channel.id}`}
                className="block overflow-hidden bg-white transition hover:-translate-y-0.5"
              >
                <div className="h-40 w-full overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={channel.imageUrl || "https://placehold.co/600x400?text=Channel"}
                    alt={channel.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=Channel";
                    }}
                  />
                </div>

                <div className="pt-3">
                  <h3 className="line-clamp-2 text-center text-base font-bold leading-6">
                    {channel.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 최신 블로그 글 */}
        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">최신 블로그 글</h2>
            <a
              href="/blog"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {latestBlogPosts.map((item) => (
              <a
                key={item.id}
                href={`/blog/${item.id}`}
                className="block overflow-hidden bg-white transition hover:-translate-y-0.5"
              >
                <div className="h-40 w-full overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={item.imageUrl || "https://placehold.co/600x400?text=Blog"}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=Blog";
                    }}
                  />
                </div>

                <div className="pt-3">
                  <h3 className="line-clamp-2 text-center text-base font-bold leading-6">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Seller Tools */}
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
            {[
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
            ].map((tool) => (
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