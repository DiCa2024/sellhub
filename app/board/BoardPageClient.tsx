"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const PAGE_SIZE = 10;
const ADMIN_EMAIL = "admin@gmail.com";

export default function BoardPageClient({
  initialPosts,
  initialSites,
  initialBlogs,
  initialChannels,
}: {
  initialPosts: any[];
  initialSites: any[];
  initialBlogs: any[];
  initialChannels: any[];
}) {

const [posts, setPosts] = useState<any[]>(initialPosts);
const [page, setPage] = useState(1);

const { data: session, status } = useSession();
const currentUser = session?.user;

const [sites] = useState<any[]>(initialSites);
const [blogs] = useState<any[]>(initialBlogs);
const [isLoading] = useState(false);

  
  const sortedPosts = useMemo(() => {
    const notice = posts.filter((p) => p.author === ADMIN_EMAIL);
    const normal = posts.filter((p) => p.author !== ADMIN_EMAIL);
    return [...notice, ...normal];
  }, [posts]);

  const totalPages = Math.max(1, Math.ceil(sortedPosts.length / PAGE_SIZE));

  const pagedPosts = sortedPosts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleDelete = async (id: string | number) => {
    if (!confirm("삭제할까요?")) return;

    try {
      const response = await fetch(`/api/board/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message || "삭제에 실패했습니다.");
        return;
      }

      setPosts((prev) => prev.filter((p) => String(p.id) !== String(id)));
    } catch (error) {
      console.error("게시글 삭제 오류:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const latestSites = sites.slice(0, 4);
  const latestBlogs = blogs.slice(0, 4);
 
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
    <main className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">게시판</h1>
            <p className="mt-2 text-sm text-neutral-600">
              회원들이 자유롭게 글을 작성하고 정보를 나누는 공간입니다.
            </p>
          </div>

         {status === "loading" ? null : currentUser ? (
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

          {isLoading ? (
            <div className="p-10 text-center text-sm text-neutral-500">
              게시글을 불러오는 중입니다.
            </div>
          ) : pagedPosts.length === 0 ? (
            <div className="p-10 text-center text-sm text-neutral-500">
              등록된 게시글이 없습니다.
            </div>
          ) : (
            pagedPosts.map((post, i) => {
              const isNotice = post.author === ADMIN_EMAIL;
              const isMine = currentUser?.email === post.author;

              return (
                <div
                  key={post.id}
                  className="grid grid-cols-12 items-center border-t p-3 text-sm hover:bg-neutral-50"
                >
                  <div className="col-span-1">
                    {isNotice
                      ? "공지"
                      : sortedPosts.length - ((page - 1) * PAGE_SIZE + i)}
                  </div>

                  <div className="col-span-6 flex gap-2">
                    {isNotice && <span className="text-red-500">[공지]</span>}
                    <Link href={`/board/${post.id}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </div>

                  <div className="col-span-2">
                    {post.nickname || post.author?.split("@")[0] || "-"}
                  </div>

                  <div className="col-span-2">
                    {post.date ||
                   (post.createdAt ? new Date(post.createdAt).toISOString().slice(0, 10) : "-")}
                  </div>

                  <div className="col-span-1">{post.views || 0}</div>

                  {isMine && (
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="col-span-12 mt-2 w-fit text-xs text-red-500 md:col-span-1 md:mt-0"
                    >
                      삭제
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
          >
            ←
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`rounded-lg px-3 py-2 text-sm ${
                page === i + 1
                  ? "bg-black text-white"
                  : "border hover:bg-neutral-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
          >
            →
          </button>
        </div>

        <section className="mt-14">
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-2xl font-bold">최신 도매 사이트</h2>
    <a href="/wholesale" className="text-sm font-medium text-neutral-600 hover:text-black">
      전체 보기 →
    </a>
  </div>

  <div className="grid gap-6 md:grid-cols-4">
    {latestSites.map((site) => (
      <a
        key={site.id}
        href={`/wholesale/${site.id}`}
        className="block rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-white">
          <img
            src={site.imageUrl || "https://placehold.co/600x400?text=Wholesale"}
            alt={site.name}
            className="h-full w-full object-contain bg-white p-2"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/600x400?text=Wholesale";
            }}
          />
        </div>

        <h3 className="mt-3 line-clamp-2 text-center text-base font-bold leading-6">
          {site.name}
        </h3>
      </a>
    ))}
  </div>
</section>


        <section className="mt-14">
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-2xl font-bold">최신 블로그</h2>
    <a href="/blog" className="text-sm font-medium text-neutral-600 hover:text-black">
      전체 보기 →
    </a>
  </div>

  <div className="grid gap-6 md:grid-cols-4">
    {latestBlogs.map((blog) => (
      <a
        key={blog.id}
        href={`/blog/${blog.id}`}
        className="block rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-white">
          <img
            src={blog.imageUrl || "https://placehold.co/600x400?text=Blog"}
            alt={blog.title}
            className="h-full w-full object-contain bg-white p-2"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/600x400?text=Blog";
            }}
          />
        </div>

        <h3 className="mt-3 line-clamp-2 text-center text-base font-bold leading-6">
          {blog.title}
        </h3>
      </a>
    ))}
  </div>
</section>

       <section className="mt-16">
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-2xl font-bold">Seller Tools</h2>
    <a href="/sellertool" className="text-sm font-medium text-neutral-600 hover:text-black">
      전체 보기 →
    </a>
  </div>

  <div className="grid gap-6 md:grid-cols-4">
    {sellerTools.map((tool) => (
      <a
        key={tool.id}
        href={tool.href}
        className="flex min-h-[150px] flex-col rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <h3 className="font-bold">{tool.title}</h3>
        {tool.description && (
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            {tool.description}
          </p>
        )}
      </a>
    ))}
  </div>
</section>
      </div>
    </main>
  );
}