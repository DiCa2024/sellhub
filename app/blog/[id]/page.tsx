"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { blogPosts } from "../../data/blogPosts";
import { wholesaleSites } from "../../data/wholesaleSites";

export default function BlogDetailPage() {
  const params = useParams();
  const id = String(params.id);

  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [showAllLatestPosts, setShowAllLatestPosts] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedChannels = JSON.parse(localStorage.getItem("salesChannels") || "[]");
    const savedComments = JSON.parse(localStorage.getItem(`blogComments-${id}`) || "[]");

    setDynamicPosts(savedPosts);
    setDynamicSites(savedSites);
    setChannels(savedChannels);
    setComments(savedComments);
    setLoaded(true);
  }, [id]);

  const allPosts = useMemo(() => {
    return [...dynamicPosts, ...blogPosts];
  }, [dynamicPosts]);

  const allSites = useMemo(() => {
    return [...dynamicSites, ...wholesaleSites];
  }, [dynamicSites]);

  const post = allPosts.find((item) => item.id === id);

  const latestPosts = useMemo(() => {
    return allPosts.filter((item) => item.id !== id).slice(0, 7);
  }, [allPosts, id]);

  const visibleLatestPosts = showAllLatestPosts
    ? latestPosts
    : latestPosts.slice(0, 5);

  const visibleComments = showAllComments
    ? comments
    : comments.slice(0, 5);

  const latestWholesaleSites = allSites.slice(0, 4);
  const latestSalesChannels = channels.slice(0, 4);

  const sellerTools = [
    {
      id: "margin-calculator",
      title: "마진 계산기",
      description: "매입가, 배송비, 수수료, 판매가 기준으로 순이익과 마진율을 계산합니다.",
      href: "/sellertool/margin-calculator",
    },
    {
      id: "sales-price-calculator",
      title: "판매가 계산기",
      description: "목표 마진율을 기준으로 적정 판매가를 계산합니다.",
      href: "/sellertool/sales-price-calculator",
    },
    {
      id: "commission-calculator",
      title: "수수료 계산기",
      description: "플랫폼 수수료와 차감 금액을 간단히 계산합니다.",
      href: "/sellertool/commission-calculator",
    },
    {
      id: "memo-check-tool",
      title: "메모 / 체크 도구",
      description: "소싱 메모와 체크리스트를 빠르게 정리할 수 있습니다.",
      href: "/sellertool/memo-check-tool",
    },
  ];

  const handleAddComment = () => {
    if (!commentName.trim() || !commentText.trim()) {
      alert("이름과 댓글 내용을 입력해 주세요.");
      return;
    }

    const newComment = {
      id: `comment-${Date.now()}`,
      name: commentName.trim(),
      text: commentText.trim(),
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`blogComments-${id}`, JSON.stringify(updatedComments));
    setCommentName("");
    setCommentText("");
  };

  if (!loaded) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-white px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-neutral-600">불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-white px-6 py-10">
        <div className="mx-auto max-w-7xl">
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
    <main className="min-h-[calc(100vh-80px)] bg-white px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        <a
          href="/blog"
          className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
        >
          ← 블로그로 돌아가기
        </a>

        <section className="mt-6 grid gap-10 lg:grid-cols-[1.65fr_0.75fr]">
          <div>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              {post.title}
            </h1>

            <div className="mt-5 border-b border-neutral-200" />

            <div className="mt-8 overflow-hidden rounded-2xl bg-neutral-100">
              <img
                src={post.imageUrl || "https://placehold.co/1200x700?text=Blog"}
                alt={post.title}
                className="h-[260px] w-full object-cover md:h-[520px]"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/1200x700?text=Blog";
                }}
              />
            </div>

            <div className="mt-8 whitespace-pre-line text-[17px] leading-9 text-neutral-800">
              {post.content || post.excerpt}
            </div>
          </div>

          <aside>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">최신 글</h2>
            </div>

            <div className="space-y-4">
              {visibleLatestPosts.map((item) => (
                <a
                  key={item.id}
                  href={`/blog/${item.id}`}
                  className="flex gap-4"
                >
                  <div className="h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    <img
                      src={item.imageUrl || "https://placehold.co/400x300?text=Blog"}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/400x300?text=Blog";
                      }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-3 text-base font-bold leading-6 text-neutral-900">
                      {item.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>

            {latestPosts.length > 5 && (
              <div className="mt-5">
                <button
                  onClick={() => setShowAllLatestPosts((prev) => !prev)}
                  className="text-sm font-medium text-neutral-600 hover:text-black"
                >
                  {showAllLatestPosts ? "접기" : "더보기"}
                </button>
              </div>
            )}
          </aside>
        </section>

        <section className="mt-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">댓글</h2>
          </div>

          <div className="rounded-2xl bg-neutral-50 p-5">
            <div className="grid gap-3 md:grid-cols-[180px_1fr]">
              <input
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="이름"
                className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-900"
              />
              <div className="flex gap-3">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="댓글을 입력해 주세요"
                  className="flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-900"
                />
                <button
                  onClick={handleAddComment}
                  className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
                >
                  등록
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {visibleComments.length === 0 ? (
              <div className="rounded-2xl bg-neutral-50 px-5 py-6 text-sm text-neutral-500">
                아직 댓글이 없습니다.
              </div>
            ) : (
              visibleComments.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-neutral-50 px-5 py-5"
                >
                  <div className="text-sm font-semibold text-neutral-900">
                    {item.name}
                  </div>
                  <div className="mt-2 whitespace-pre-line text-sm leading-7 text-neutral-700">
                    {item.text}
                  </div>
                </div>
              ))
            )}
          </div>

          {comments.length > 5 && (
            <div className="mt-5">
              <button
                onClick={() => setShowAllComments((prev) => !prev)}
                className="text-sm font-medium text-neutral-600 hover:text-black"
              >
                {showAllComments ? "댓글 접기" : "댓글 더보기"}
              </button>
            </div>
          )}
        </section>

        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">도매 사이트</h2>
            <a
              href="/wholesale"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {latestWholesaleSites.map((site) => (
              <a
                key={site.id}
                href={`/wholesale/${site.id}`}
                className="block overflow-hidden rounded-2xl bg-white transition hover:-translate-y-0.5"
              >
                <div className="h-40 w-full overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={site.imageUrl || "https://placehold.co/600x400?text=Wholesale"}
                    alt={site.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400?text=Wholesale";
                    }}
                  />
                </div>

                <div className="pt-3">
                  <h3 className="line-clamp-2 text-base font-bold leading-6">
                    {site.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">판매 채널</h2>
            <a
              href="/sales-channel"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {latestSalesChannels.map((item) => (
              <a
                key={item.id}
                href={`/sales-channel/${item.id}`}
                className="block overflow-hidden rounded-2xl bg-white transition hover:-translate-y-0.5"
              >
                <div className="h-40 w-full overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={item.imageUrl || "https://placehold.co/600x400?text=Channel"}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400?text=Channel";
                    }}
                  />
                </div>

                <div className="pt-3">
                  <h3 className="line-clamp-2 text-base font-bold leading-6">
                    {item.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Seller Tools</h2>
            <a
              href="/sellertool"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {sellerTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.href}
                className="flex min-h-[150px] flex-col rounded-2xl bg-neutral-50 p-5 transition hover:-translate-y-0.5"
              >
                <h3 className="text-lg font-bold">{tool.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {tool.description}
                </p>
                <div className="mt-auto pt-4 text-sm font-medium text-neutral-800">
                  바로 가기 →
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}