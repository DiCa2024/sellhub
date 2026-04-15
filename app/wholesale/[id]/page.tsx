"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { wholesaleSites } from "../../data/wholesaleSites";

const CATEGORY_FILTERS = [
  "종합",
  "리빙",
  "식품",
  "자동차",
  "디지털/가전",
  "아동/문구",
  "반려/펫",
  "헬스케어",
  "뷰티",
  "스포츠/레저",
];

type DynamicWholesaleSite = {
  id: string;
  category?: string;
  name: string;
  imageUrl?: string;
  tags?: string[];
  website?: string;
  dropshipping?: string;
  businessRequired?: string;
  usageFee?: string;
  imageProvided?: string;
  shortDescription?: string;
  views?: string;
};

export default function WholesaleDetailPage() {
  const params = useParams();
  const id = String(params.id);
  const router = useRouter();

  const [dynamicSites, setDynamicSites] = useState<DynamicWholesaleSite[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [viewUpdated, setViewUpdated] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [displayViews, setDisplayViews] = useState("0");

  const allSites = useMemo(() => {
    return [...dynamicSites, ...wholesaleSites];
  }, [dynamicSites]);

  const site = allSites.find((item) => item.id === id);

  const handleSearchSubmit = () => {
    const keyword = searchTerm.trim();
    if (!keyword) {
      router.push("/wholesale");
      return;
    }

    router.push(`/wholesale?query=${encodeURIComponent(keyword)}`);
  };

  const handleCategoryMove = (category: string) => {
    router.push(`/wholesale?category=${encodeURIComponent(category)}`);
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("sites") || "[]");
    setDynamicSites(saved);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded || !site) return;

    const storedViewMap = JSON.parse(localStorage.getItem("siteViews") || "{}");

    if (storedViewMap[id] !== undefined) {
      setDisplayViews(String(storedViewMap[id]));
    } else {
      setDisplayViews(site.views || "0");
    }
  }, [loaded, site, id, viewUpdated]);

  useEffect(() => {
    if (!loaded || !site || viewUpdated) return;

    const storedViewMap = JSON.parse(localStorage.getItem("siteViews") || "{}");
    const nextViews = (storedViewMap[id] || parseViewCount(site.views || "0")) + 1;
    storedViewMap[id] = nextViews;
    localStorage.setItem("siteViews", JSON.stringify(storedViewMap));
    setViewUpdated(true);
  }, [loaded, site, id, viewUpdated]);

  useEffect(() => {
    const storedLikeMap = JSON.parse(localStorage.getItem("siteLikes") || "{}");
    const storedLikedIds = JSON.parse(localStorage.getItem("likedSiteIds") || "[]");

    setLikeCount(storedLikeMap[id] || 0);
    setLiked(storedLikedIds.includes(id));
  }, [id]);

  const handleLikeToggle = () => {
    const storedLikeMap = JSON.parse(localStorage.getItem("siteLikes") || "{}");
    const storedLikedIds = JSON.parse(localStorage.getItem("likedSiteIds") || "[]");

    const updatedLikeMap = { ...storedLikeMap };
    let updatedLikedIds = [...storedLikedIds];

    if (liked) {
      updatedLikeMap[id] = Math.max((updatedLikeMap[id] || 1) - 1, 0);
      updatedLikedIds = updatedLikedIds.filter((item) => item !== id);
      setLikeCount(updatedLikeMap[id]);
      setLiked(false);
    } else {
      updatedLikeMap[id] = (updatedLikeMap[id] || 0) + 1;
      if (!updatedLikedIds.includes(id)) {
        updatedLikedIds.push(id);
      }
      setLikeCount(updatedLikeMap[id]);
      setLiked(true);
    }

    localStorage.setItem("siteLikes", JSON.stringify(updatedLikeMap));
    localStorage.setItem("likedSiteIds", JSON.stringify(updatedLikedIds));
  };

  if (!loaded) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-7xl rounded-2xl border bg-white p-8 shadow-sm">
          <p className="text-neutral-600">불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (!site) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-7xl rounded-2xl border bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">도매 사이트를 찾을 수 없습니다.</h1>
          <p className="mt-3 text-neutral-600">
            등록된 사이트가 아니거나 아직 불러오지 못했습니다.
          </p>
          <a
            href="/wholesale"
            className="mt-6 inline-flex rounded-xl bg-black px-4 py-3 text-sm text-white"
          >
            도매 사이트 리스트로 돌아가기
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearchSubmit();
              }
            }}
            placeholder="도매처 찾기"
            className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-4 text-sm outline-none focus:border-black"
          />

          <button
            onClick={handleSearchSubmit}
            className="shrink-0 rounded-2xl bg-black px-5 py-4 text-sm text-white"
          >
            검색
          </button>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {CATEGORY_FILTERS.map((item) => (
            <button
              key={item}
              onClick={() => handleCategoryMove(item)}
              className="rounded-full bg-neutral-100 px-4 py-2 text-sm transition hover:bg-neutral-200"
            >
              {item}
            </button>
          ))}
        </div>

        <a
          href="/wholesale"
          className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
        >
          ← 도매 사이트 리스트로 돌아가기
        </a>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white">
              <div className="mb-6 w-full overflow-hidden rounded-2xl bg-neutral-100">
  <img
    src={site.imageUrl || "https://via.placeholder.com/1200x675?text=Wholesale"}
    alt={site.name}
    className="h-64 w-full object-cover"
  />
</div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight">{site.name}</h1>
              {site.category && (
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600">
                  {site.category}
                </span>
              )}
            </div>

            <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700">
              {site.shortDescription || "설명이 아직 등록되지 않았습니다."}
            </p>

            {Array.isArray(site.tags) && site.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {site.tags.map((tag) => (
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
              <InfoRow label="위탁 가능 여부" value={site.dropshipping || "-"} />
              <InfoRow label="사업자 필요 여부" value={site.businessRequired || "-"} />
              <InfoRow label="이용료" value={("usageFee" in site ? site.usageFee : "") || "-"} />
              <InfoRow label="이미지 제공 여부" value={site.imageProvided || "-"} />
              <InfoRow label="조회수" value={displayViews} />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleLikeToggle}
                className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100"
              >
                ♡ 좋아요
              </button>
              <span className="text-sm text-neutral-600">좋아요 {likeCount}</span>
            </div>

            {site.website && (
              <a
                href={site.website}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-4 text-sm font-semibold text-white"
              >
                공식 사이트 방문하기
              </a>
            )}
          </div>
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

function parseViewCount(value: string) {
  if (!value) return 0;
  const onlyNumber = Number(String(value).replace(/,/g, ""));
  return Number.isNaN(onlyNumber) ? 0 : onlyNumber;
}