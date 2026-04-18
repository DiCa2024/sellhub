"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { wholesaleSites } from "../../data/wholesaleSites";
import { blogPosts } from "../../data/blogPosts";

const SALES_CHANNEL_FEE_CATEGORIES = [
  { key: "fashion", label: "패션" },
  { key: "living", label: "생활용품" },
  { key: "beauty", label: "뷰티" },
  { key: "automotive", label: "자동차용품" },
  { key: "digital", label: "디지털" },
  { key: "interior", label: "인테리어" },
  { key: "stationery", label: "문구" },
  { key: "sports", label: "스포츠" },
  { key: "infants", label: "유아" },
  { key: "pet", label: "반려용품" },
];

function createEmptyFeeTable() {
  return {
    fashion: "",
    living: "",
    beauty: "",
    automotive: "",
    digital: "",
    interior: "",
    stationery: "",
    sports: "",
    infants: "",
    pet: "",
  };
}

export default function SalesChannelDetailPage() {
  const params = useParams();
  const id = String(params.id);

  const [channels, setChannels] = useState<any[]>([]);
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedChannels = JSON.parse(localStorage.getItem("salesChannels") || "[]");
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    setChannels(savedChannels);
    setDynamicSites(savedSites);
    setDynamicPosts(savedPosts);
    setLoaded(true);
  }, []);

  const channel = channels.find((item) => item.id === id);

  const feeTable = {
    ...createEmptyFeeTable(),
    ...(channel?.feeTable || {}),
  };

  const latestSites = [...dynamicSites, ...wholesaleSites].slice(0, 4);
  const latestPosts = [...dynamicPosts, ...blogPosts].slice(0, 4);

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
        <div className="mx-auto max-w-7xl">불러오는 중...</div>
      </main>
    );
  }

  if (!channel) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">판매 채널을 찾을 수 없습니다.</h1>
          <p className="mt-3 text-neutral-600">존재하지 않거나 삭제된 채널입니다.</p>
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
      <div className="mx-auto max-w-7xl">
        <a
          href="/sales-channel"
          className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
        >
          ← 판매 채널로 돌아가기
        </a>

        <section className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="overflow-hidden rounded-3xl bg-neutral-100">
              <img
                src={channel.imageUrl || "https://placehold.co/1200x700?text=Channel"}
                alt={channel.name}
                className="h-[260px] w-full object-cover md:h-[460px]"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/1200x700?text=Channel";
                }}
              />
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight">{channel.name}</h1>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700">
                {channel.category || "-"}
              </span>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700">
                {channel.region || "-"}
              </span>
            </div>

            <p className="mt-6 text-base leading-8 text-neutral-700">
              {channel.shortDescription || "설명이 없습니다."}
            </p>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">카테고리별 수수료표</h2>

              <div className="mt-5 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <div className="grid grid-cols-2 md:grid-cols-5">
                  {SALES_CHANNEL_FEE_CATEGORIES.map((item) => (
                    <div
                      key={item.key}
                      className="border-b border-r border-neutral-200 px-4 py-4 text-center last:border-r-0 md:nth-[5n]:border-r-0"
                    >
                      <div className="text-sm font-semibold text-neutral-700">
                        {item.label}
                      </div>
                      <div className="mt-2 text-base font-bold text-neutral-900">
                        {feeTable[item.key as keyof typeof feeTable] || "-"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">핵심 정보</h2>

            <div className="mt-5 space-y-4 text-sm">
              <InfoRow label="채널명" value={channel.name || "-"} />
              <InfoRow label="카테고리" value={channel.category || "-"} />
              <InfoRow label="지역" value={channel.region || "-"} />
              <InfoRow label="정산일" value={channel.settlementDate || "-"} />
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {channel.website && (
                <a
                  href={channel.website}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-black px-5 py-4 text-center text-sm font-medium text-white"
                >
                  공식 사이트 방문
                </a>
              )}

              <a
                href="/sales-channel/compare"
                className="rounded-2xl border border-neutral-300 px-5 py-4 text-center text-sm font-medium hover:bg-neutral-100"
              >
                판매 채널 비교하러 가기
              </a>
            </div>
          </aside>
        </section>

        <section className="mt-16">
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
              <a key={site.id} href={`/wholesale/${site.id}`} className="block">
                <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={site.imageUrl || "https://placehold.co/600x400?text=Wholesale"}
                    alt={site.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400?text=Wholesale";
                    }}
                  />
                </div>
                <h3 className="mt-2 text-center font-bold">{site.name}</h3>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">블로그</h2>
            <a
              href="/blog"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {latestPosts.map((post) => (
              <a key={post.id} href={`/blog/${post.id}`} className="block">
                <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={post.imageUrl || "https://placehold.co/600x400?text=Blog"}
                    alt={post.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400?text=Blog";
                    }}
                  />
                </div>
                <h3 className="mt-2 text-center font-bold">{post.title}</h3>
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

          <div className="grid gap-6 md:grid-cols-4">
            {sellerTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.href}
                className="rounded-2xl bg-neutral-100 p-6 text-center"
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
      <span className="text-neutral-500">{label}</span>
      <span className="text-right font-semibold text-neutral-900">{value}</span>
    </div>
  );
}