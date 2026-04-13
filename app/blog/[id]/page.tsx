"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { blogPosts } from "../../data/blogPosts";

export default function BlogDetailPage() {
  const params = useParams();
  const id = String(params.id);

  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    setDynamicPosts(savedPosts);
    setLoaded(true);
  }, []);

  const allPosts = useMemo(() => {
    return [...dynamicPosts, ...blogPosts];
  }, [dynamicPosts]);

  const post = allPosts.find((item) => item.id === id);

  const relatedPosts = allPosts
    .filter((item) => item.id !== id)
    .slice(0, 3);

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
          <h1 className="text-3xl font-bold">글을 찾을 수 없습니다.</h1>
          <p className="mt-3 text-neutral-600">
            요청한 글이 존재하지 않거나 아직 불러오지 못했습니다.
          </p>
          <a
            href="/blog"
            className="mt-6 inline-flex rounded-xl bg-black px-4 py-3 text-sm text-white"
          >
            블로그로 돌아가기
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <a
          href="/blog"
          className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
        >
          ← 블로그로 돌아가기
        </a>

        <article className="mt-6 overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="border-b bg-gradient-to-b from-neutral-50 to-white px-8 py-10 md:px-12">
            <div className="mb-4 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
              {post.category || "블로그"}
            </div>

            <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
              <span>{post.author || "sellhub"}</span>
              <span>·</span>
              <span>{post.date || "-"}</span>
            </div>
          </div>

          <div className="px-8 pt-8 md:px-12">
            <img
              src={post.imageUrl || "https://via.placeholder.com/1200x700?text=Blog"}
              alt={post.title}
              className="h-[260px] w-full rounded-2xl border object-cover md:h-[420px]"
            />
          </div>

          <div className="px-8 py-10 md:px-12">
            <div className="prose prose-neutral max-w-none">
              <div className="rounded-2xl bg-neutral-50 p-6 text-base leading-8 text-neutral-700 whitespace-pre-line">
                {post.content || post.excerpt}
              </div>
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
                  href="/sellertool"
                  className="rounded-xl border px-4 py-3 text-sm hover:bg-neutral-100"
                >
                  Seller Tools 보러가기
                </a>
                <a
                  href="/blog"
                  className="rounded-xl border px-4 py-3 text-sm hover:bg-neutral-100"
                >
                  블로그 목록 보기
                </a>
              </div>
            </div>
          </div>
        </article>

        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">관련 글</h2>
            <a
              href="/blog"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 글 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((item) => (
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
    </main>
  );
}