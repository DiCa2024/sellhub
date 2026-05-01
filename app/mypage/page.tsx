"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { wholesaleSites } from "../data/wholesaleSites";

export default function MyPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [likedSiteIds, setLikedSiteIds] = useState<string[]>([]);
  const [viewMap, setViewMap] = useState<Record<string, number>>({});

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedLikedIds = JSON.parse(localStorage.getItem("likedSiteIds") || "[]");
    const savedViewMap = JSON.parse(localStorage.getItem("siteViews") || "{}");

    setDynamicSites(savedSites);
    setLikedSiteIds(savedLikedIds.map(String));
    setViewMap(savedViewMap);
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-6xl">불러오는 중...</div>
      </main>
    );
  }

  if (!session?.user) return null;

  const currentUser = session.user;

  const allSites = [...dynamicSites, ...wholesaleSites];

  const likedSites = allSites.filter((site) =>
    likedSiteIds.includes(String(site.id))
  );

  const mostViewedSites = [...allSites]
    .map((site) => ({
      ...site,
      numericViews:
        typeof viewMap[String(site.id)] === "number"
          ? viewMap[String(site.id)]
          : Number(site.views || 0),
    }))
    .sort((a, b) => b.numericViews - a.numericViews)
    .slice(0, 5);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">마이페이지</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">내 정보</h2>
            <p className="text-sm text-neutral-600">
              이메일: {currentUser.email}
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              역할: {(currentUser as any).role || "USER"}
            </p>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">관심 도매 사이트</h2>

            {likedSites.length === 0 ? (
              <p className="text-sm text-neutral-500">
                좋아요한 사이트가 없습니다.
              </p>
            ) : (
              <div className="space-y-3">
                {likedSites.map((site) => (
                  <div key={site.id} className="rounded-xl border p-4">
                    <p className="font-bold">{site.name}</p>
                    <p className="text-sm text-neutral-500">
                      {site.region} · {site.category}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">가장 많이 본 도매 사이트</h2>

            <div className="space-y-3">
              {mostViewedSites.map((site) => (
                <div key={site.id} className="rounded-xl border p-4">
                  <p className="font-bold">{site.name}</p>
                  <p className="text-sm text-neutral-500">
                    조회수 {site.numericViews}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">내 관심 영역</h2>
            <p className="text-sm text-neutral-500">
              이 영역은 나중에 카테고리 관심 데이터와 연결할 수 있습니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}