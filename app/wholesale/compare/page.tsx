"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { wholesaleSites } from "../../data/wholesaleSites";

export default function ComparePage() {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);

  useEffect(() => {
    const savedCompare = JSON.parse(
      localStorage.getItem("compareSites") || "[]"
    );
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");

    setCompareIds(savedCompare);
    setDynamicSites(savedSites);
  }, []);

  const allSites = useMemo(() => {
    return [...dynamicSites, ...wholesaleSites];
  }, [dynamicSites]);

  const compareSites = allSites.filter((site) =>
    compareIds.includes(site.id)
  );

  const removeItem = (id: string) => {
    const updated = compareIds.filter((item) => item !== id);
    setCompareIds(updated);
    localStorage.setItem("compareSites", JSON.stringify(updated));
  };

  if (compareSites.length === 0) {
    return (
      <main className="min-h-screen px-6 py-10 bg-neutral-50">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-bold">비교할 사이트가 없습니다</h1>
          <p className="mt-3 text-neutral-600">
            도매 사이트에서 비교할 항목을 선택해 주세요.
          </p>

          <Link
            href="/wholesale"
            className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-white"
          >
            도매 페이지로 이동
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 bg-neutral-50">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-3xl font-bold mb-8">도매 사이트 비교</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {compareSites.map((site) => (
            <div
              key={site.id}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              {/* 이미지 */}
              <div className="mb-4 h-40 w-full overflow-hidden rounded-xl bg-neutral-100">
                <img
                  src={
                    site.imageUrl ||
                    "https://via.placeholder.com/400x300?text=Wholesale"
                  }
                  alt={site.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* 이름 */}
              <h2 className="text-lg font-bold">{site.name}</h2>

              {/* 기본 정보 */}
              <p className="text-sm text-neutral-500 mt-1">
                {site.region} · {site.category}
              </p>

              {/* 설명 */}
              <p className="mt-3 text-sm text-neutral-600">
                {site.shortDescription}
              </p>

              {/* 상세 정보 */}
              <div className="mt-4 space-y-2 text-sm">
                <InfoRow label="위탁배송" value={site.dropshipping} />
                <InfoRow label="사업자 필요" value={site.businessRequired} />
                <InfoRow label="이용료" value={site.usageFee} />
                <InfoRow label="이미지 제공" value={site.imageProvided} />
              </div>

              {/* 버튼 */}
              <div className="mt-5 flex gap-2">
                <Link
                  href={`/wholesale/${site.id}`}
                  className="flex-1 rounded-xl border px-3 py-2 text-center text-sm hover:bg-neutral-100"
                >
                  상세 보기
                </Link>

                <button
                  onClick={() => removeItem(site.id)}
                  className="flex-1 rounded-xl bg-black px-3 py-2 text-sm text-white hover:opacity-90"
                >
                  제거
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium">{value || "-"}</span>
    </div>
  );
}