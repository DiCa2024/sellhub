"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { wholesaleSites } from "../../data/wholesaleSites";
import { blogPosts } from "../../data/blogPosts";

export default function SalesChannelDetailPage() {
  const params = useParams();
  const id = String(params.id);

  const [channels, setChannels] = useState<any[]>([]);
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [viewUpdated, setViewUpdated] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedChannels = JSON.parse(localStorage.getItem("salesChannels") || "[]");
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const savedInterested = JSON.parse(
      localStorage.getItem("interestedSalesChannelIds") || "[]"
    );

    setChannels(savedChannels);
    setDynamicSites(savedSites);
    setDynamicPosts(savedPosts);
    setSaved(savedInterested.includes(id));
    setLoaded(true);
  }, [id]);

  const channel = channels.find((item) => item.id === id);

  useEffect(() => {
    if (!loaded || !channel || viewUpdated) return;

    const storedViews = JSON.parse(
      localStorage.getItem("salesChannelViews") || "{}"
    );
    const nextViews = (storedViews[id] || 0) + 1;
    storedViews[id] = nextViews;
    localStorage.setItem("salesChannelViews", JSON.stringify(storedViews));
    setViewUpdated(true);
  }, [loaded, channel, id, viewUpdated]);

  const handleToggleSave = () => {
    const stored = JSON.parse(
      localStorage.getItem("interestedSalesChannelIds") || "[]"
    );

    let updated: string[] = [];

    if (stored.includes(id)) {
      updated = stored.filter((item: string) => item !== id);
      setSaved(false);
    } else {
      updated = [...stored, id];
      setSaved(true);
    }

    localStorage.setItem("interestedSalesChannelIds", JSON.stringify(updated));
  };

  const viewCount = useMemo(() => {
    const storedViews = JSON.parse(
      localStorage.getItem("salesChannelViews") || "{}"
    );
    return storedViews[id] || 0;
  }, [id, viewUpdated]);

  const relatedChannels = useMemo(() => {
    if (!channel) return [];
    return channels
      .filter((item) => item.id !== id && item.region === channel.region)
      .slice(0, 3);
  }, [channels, channel, id]);

  const latestSites = [...dynamicSites, ...wholesaleSites].slice(0, 3);
  const latestPosts = [...dynamicPosts, ...blogPosts].slice(0, 3);

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
  ];

  if (!loaded) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-6xl rounded-2xl border bg-white p-8 shadow-sm">
          <p className="text-neutral-600">불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (!channel) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-6xl rounded-2xl border bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">판매 채널을 찾을 수 없습니다.</h1>
          <p className="mt-3 text-neutral-600">
            요청한 판매 채널이 없거나 아직 등록되지 않았습니다.
          </p>
          <a
            href="/sales-channel"
            className="mt-6 inline-flex rounded-xl bg-black px-4 py-3 text-sm text-white"
          >
            판매 채널 목록으로 돌아가기
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <a
          href="/sales-channel"
          className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
        >
          ← 판매 채널 목록으로 돌아가기
        </a>

        <article className="mt-6 overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="border-b bg-gradient-to-b from-neutral-50 to-white px-8 py-10 md:px-12">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                {channel.region}
              </span>
              {channel.commission && (
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  수수료 {channel.commission}
                </span>
              )}
            </div>

            <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              {channel.name}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600">
              {channel.shortDescription}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
              <span>조회수 {viewCount}</span>
            </div>
          </div>

          <div className="grid gap-8 px-8 py-8 md:px-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <img
                src={
                  channel.imageUrl ||
                  "https://via.placeholder.com/1200x700?text=Sales+Channel"
                }
                alt={channel.name}
                className="h-[260px] w-full rounded-2xl border object-cover md:h-[420px]"
              />

              <div className="mt-6 rounded-2xl bg-neutral-50 p-6">
                <h2 className="text-lg font-bold">채널 요약</h2>
                <div className="mt-4 space-y-3 text-sm text-neutral-700">
                  <InfoRow label="채널명" value={channel.name} />
                  <InfoRow label="지역" value={channel.region || "-"} />
                  <InfoRow label="수수료" value={channel.commission || "-"} />
                </div>

                {Array.isArray(channel.tags) && channel.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {channel.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded bg-white px-3 py-1 text-xs border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="rounded-2xl border bg-neutral-50 p-6">
                <h2 className="text-lg font-bold">이 채널을 보면 좋은 이유</h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-600">
                  <li>• 판매 지역 기준으로 채널을 비교할 수 있습니다.</li>
                  <li>• 공식 사이트로 이동하기 전에 핵심 정보를 먼저 확인할 수 있습니다.</li>
                  <li>• 관련 도매 사이트와 블로그, 셀러 도구로 바로 이어질 수 있습니다.</li>
                </ul>
              </div>

              <div className="mt-6 rounded-2xl border bg-white p-6">
                <h2 className="text-lg font-bold">바로 이동</h2>
                <div className="mt-4 flex flex-col gap-3">
                  <button
                    onClick={handleToggleSave}
                    className={`rounded-xl px-4 py-3 text-sm ${
                      saved
                        ? "bg-neutral-200 text-neutral-900"
                        : "border hover:bg-neutral-100"
                    }`}
                  >
                    {saved ? "관심 채널 저장 해제" : "관심 채널 저장"}
                  </button>

                  <a
                    href={channel.website}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-black px-4 py-3 text-center text-sm text-white"
                  >
                    공식 사이트 방문하기
                  </a>
                  <a
                    href="/wholesale"
                    className="rounded-xl border px-4 py-3 text-center text-sm hover:bg-neutral-100"
                  >
                    도매 리스트 보러가기
                  </a>
                  <a
                    href="/blog"
                    className="rounded-xl border px-4 py-3 text-center text-sm hover:bg-neutral-100"
                  >
                    블로그 보러가기
                  </a>
                  <a
                    href="/sellertool"
                    className="rounded-xl border px-4 py-3 text-center text-sm hover:bg-neutral-100"
                  >
                    Seller Tools 보러가기
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        <SectionTitle title="같은 지역의 다른 판매 채널" href="/sales-channel" />
        <div className="grid gap-6 md:grid-cols-3">
          {relatedChannels.length === 0 ? (
            <div className="rounded-2xl border bg-white p-6 text-sm text-neutral-500">
              관련 판매 채널이 없습니다.
            </div>
          ) : (
            relatedChannels.map((item) => (
              <a
                key={item.id}
                href={`/sales-channel/${item.id}`}
                className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">{item.region}</p>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {item.shortDescription}
                </p>
              </a>
            ))
          )}
        </div>

        <SectionTitle title="최신 도매 사이트" href="/wholesale" />
        <div className="grid gap-6 md:grid-cols-3">
          {latestSites.map((site) => (
            <a
              key={site.id}
              href={`/wholesale/${site.id}`}
              className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-bold">{site.name}</h3>
              <p className="mt-1 text-sm text-neutral-500">
                {site.region} · {site.category}
              </p>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {site.shortDescription}
              </p>
            </a>
          ))}
        </div>

        <SectionTitle title="최신 블로그 글" href="/blog" />
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.id}`}
              className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="mt-1 text-sm text-neutral-500">
                {post.category} · {post.date}
              </p>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {post.excerpt}
              </p>
            </a>
          ))}
        </div>

        <SectionTitle title="Seller Tools" href="/sellertool" />
        <div className="grid gap-6 md:grid-cols-3">
          {sellerTools.map((tool) => (
            <a
              key={tool.id}
              href={tool.href}
              className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-bold">{tool.title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {tool.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span>{label}</span>
      <span className="text-right font-semibold">{value}</span>
    </div>
  );
}

function SectionTitle({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-6 mt-14 flex items-center justify-between">
      <h2 className="text-2xl font-bold">{title}</h2>
      <a
        href={href}
        className="text-sm font-medium text-neutral-600 hover:text-black"
      >
        전체 보기 →
      </a>
    </div>
  );
}