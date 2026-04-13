"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { wholesaleSites } from "../../data/wholesaleSites";
import { blogPosts } from "../../data/blogPosts";

export default function BoardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);

  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [viewUpdated, setViewUpdated] = useState(false);
 

  useEffect(() => {
    const savedBoardPosts = JSON.parse(localStorage.getItem("boardPosts") || "[]");
    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    setPosts(savedBoardPosts);
    setCurrentUser(savedUser);
    setDynamicSites(savedSites);
    setDynamicPosts(savedPosts);
    setLoaded(true);
  }, []);

  const post = posts.find((item) => item.id === id);
  const isMine = currentUser?.email && post && currentUser.email === post.author;

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

  const relatedBoardPosts = useMemo(() => {
    return posts.filter((item) => item.id !== id).slice(0, 3);
  }, [posts, id]);

  const allSites = [...dynamicSites, ...wholesaleSites];
  const latestSites = allSites.slice(0, 3);

  const allBlogPosts = [...dynamicPosts, ...blogPosts];
  const latestBlogPosts = allBlogPosts.slice(0, 3);

  if (!loaded) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-8 shadow-sm">
          <p className="text-neutral-600">불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-8 shadow-sm">
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

  const isMyPost = currentUser?.email && currentUser.email === post.author;

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
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
            <div className="rounded-2xl bg-neutral-50 p-6 text-base leading-8 text-neutral-700 whitespace-pre-line">
              {post.content}
            </div>

            <div className="mt-10 rounded-2xl border bg-neutral-50 p-6">
              <h2 className="text-lg font-bold">이 글과 함께 보면 좋은 이동</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="/wholesale"
                  className="rounded-xl bg-black px-4 py-3 text-sm text-white"
                >
                  도매 리스트 보러가기
                </a>
                <a
                  href="/blog"
                  className="rounded-xl border px-4 py-3 text-sm hover:bg-neutral-100"
                >
                  블로그 보러가기
                </a>
                <a
                  href="/sellertool"
                  className="rounded-xl border px-4 py-3 text-sm hover:bg-neutral-100"
                >
                  Seller Tools 보러가기
                </a>
              </div>
            </div>
          </div>
        </article>

        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">관련 게시글</h2>
            <a
              href="/board"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 글 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedBoardPosts.map((item) => (
              <a
                key={item.id}
                href={`/board/${item.id}`}
                className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-3 inline-flex w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  자유 게시글
                </div>

                <h3 className="text-lg font-bold leading-7">{item.title}</h3>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-600 whitespace-pre-line">
                  {item.content}
                </p>

                <div className="mt-auto pt-4 text-xs text-neutral-500">
                  {item.nickname || item.author?.split("@")[0] || "회원"} · {item.date || "-"}
                </div>
              </a>
            ))}
          </div>
        </section>

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

          <div className="grid gap-6 md:grid-cols-3">
            {latestSites.map((site) => (
              <div
                key={site.id}
                className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-lg font-bold">{site.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {site.region} · {site.category}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(site.tags || []).slice(0, 4).map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded bg-neutral-100 px-2 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {site.shortDescription}
                </p>

                <div className="mt-auto pt-4">
                  <a
                    href={`/wholesale/${site.id}`}
                    className="block w-full rounded-xl border border-neutral-300 px-4 py-3 text-center text-sm hover:bg-neutral-100"
                  >
                    상세 보기
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

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

          <div className="grid gap-6 md:grid-cols-3">
            {latestBlogPosts.map((item) => (
              <a
                key={item.id}
                href={`/blog/${item.id}`}
                className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <img
                  src={item.imageUrl || "https://via.placeholder.com/600x400?text=Blog"}
                  alt={item.title}
                  className="h-44 w-full rounded-xl object-cover"
                />

                <div className="mt-4 inline-flex w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  {item.category || "블로그"}
                </div>

                <h3 className="mt-3 text-lg font-bold leading-7">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {item.excerpt}
                </p>

                <div className="mt-auto pt-4 text-xs text-neutral-500">
                  {item.author || "sellhub"} · {item.date || "-"}
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
      {isMine && (
  <a href={`/board/edit/${post.id}`} className="border px-3 py-2">
    수정
  </a>
)}
    </main>
  );
}