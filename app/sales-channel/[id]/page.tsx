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
        <div className="mx-auto max-w-7xl rounded-2xl border bg-white p-8 shadow-sm">
          <p className="text-neutral-600">불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (!channel) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-7xl rounded-2xl border bg-white p-8 shadow-sm">
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
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        <a
          href="/sales-channel"
          className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
        >
          ← 판매 채널 리스트로 돌아가기
        </a>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white">
              <div className="aspect-[16/9] w-full bg-neutral-100">
                <img
                  src={
                    channel.imageUrl ||
                    "https://via.placeholder.com/1200x675?text=Sales+Channel"
                  }
                  alt={channel.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight">
                {channel.name}
              </h1>
              {channel.region && (
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600">
                  {channel.region}
                </span>
              )}
            </div>

            <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700">
              {channel.shortDescription || "설명이 아직 등록되지 않았습니다."}
            </p>

            {Array.isArray(channel.tags) && channel.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {channel.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-base font-bold text-neutral-800">핵심 정보</div>

            <div className="mt-5 space-y-4 text-sm text-neutral-700">
              <InfoRow label="지역" value={channel.region || "-"} />
              <InfoRow label="카테고리" value={channel.category || "-"} />
              <InfoRow label="수수료" value={channel.commission || "-"} />
              <InfoRow label="정산일" value={channel.settlementDate || "-"} />
              <InfoRow label="조회수" value={String(viewCount)} />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleToggleSave}
                className={`rounded-xl px-4 py-2 text-sm ${
                  saved
                    ? "bg-neutral-200 text-neutral-900"
                    : "border border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                {saved ? "관심 채널 저장 해제" : "관심 채널 저장"}
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {channel.website && (
                <a
                  href={channel.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-4 text-sm font-semibold text-white"
                >
                  공식 사이트 방문하기
                </a>
              )}

              {channel.commissionLink && (
                <a
                  href={channel.commissionLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-neutral-300 px-5 py-4 text-sm font-medium hover:bg-neutral-100"
                >
                  수수료 안내 보기
                </a>
              )}

              {channel.settlementLink && (
                <a
                  href={channel.settlementLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-neutral-300 px-5 py-4 text-sm font-medium hover:bg-neutral-100"
                >
                  정산일 안내 보기
                </a>
              )}
            </div>
          </div>
        </div>

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
                <div className="mb-4 h-40 w-full overflow-hidden rounded-xl bg-neutral-100">
                  <img
                    src={
                      item.imageUrl ||
                      "https://via.placeholder.com/600x400?text=Sales+Channel"
                    }
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="line-clamp-2 text-lg font-bold leading-7">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {item.region} · {item.category}
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
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
              <div className="mb-4 h-40 w-full overflow-hidden rounded-xl bg-neutral-100">
                <img
                  src={
                    site.imageUrl ||
                    "https://via.placeholder.com/600x400?text=Wholesale"
                  }
                  alt={site.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="line-clamp-2 text-lg font-bold leading-7">
                {site.name}
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                {site.region} · {site.category}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
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
              <div className="mb-4 h-40 w-full overflow-hidden rounded-xl bg-neutral-100">
                <img
                  src={
                    post.imageUrl || "https://placehold.co/600x400?text=Blog"
                  }
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="line-clamp-2 text-lg font-bold leading-7">
                {post.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                {post.category} · {post.date}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
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
    <div className="flex items-center justify-between gap-4">
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