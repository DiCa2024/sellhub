"use client";

import { useEffect, useState } from "react";
import { wholesaleSites } from "../data/wholesaleSites";

export default function ComparePage() {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("compareSites");
    if (saved) {
      setCompareIds(JSON.parse(saved));
    }
  }, []);

  const selectedSites = wholesaleSites.filter((site) =>
    compareIds.includes(site.id)
  );

  const handleRemove = (id: string) => {
    const updated = compareIds.filter((item) => item !== id);
    setCompareIds(updated);
    localStorage.setItem("compareSites", JSON.stringify(updated));
  };

  const handleClear = () => {
    setCompareIds([]);
    localStorage.removeItem("compareSites");
  };

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">도매 사이트 비교</h1>
            <p className="mt-2 text-sm text-neutral-600">
              선택한 도매 사이트를 항목별로 한눈에 비교해 보세요.
            </p>
          </div>

          <div className="flex gap-2">
            <a
              href="/wholesale"
              className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-100"
            >
              리스트로 돌아가기
            </a>
            <button
              onClick={handleClear}
              className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              전체 비우기
            </button>
          </div>
        </div>

        {selectedSites.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold">비교함이 비어 있어요</h2>
            <p className="mt-3 text-sm text-neutral-600">
              도매 리스트 페이지에서 비교할 사이트를 먼저 담아주세요.
            </p>
            <a
              href="/wholesale"
              className="mt-6 inline-flex rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              도매 리스트 보러가기
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-neutral-100 text-left">
                  <th className="w-44 border-b border-neutral-200 px-5 py-4 text-sm font-semibold text-neutral-700">
                    비교 항목
                  </th>

                  {selectedSites.map((site) => (
                    <th
                      key={site.id}
                      className="min-w-[260px] border-b border-l border-neutral-200 px-5 py-4 align-top"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-xl font-bold">{site.name}</div>
                            <div className="mt-1 text-sm text-neutral-500">
                              {site.region} · {site.category}
                            </div>
                          </div>

                          <button
                            onClick={() => handleRemove(site.id)}
                            className="rounded-lg border border-neutral-300 px-3 py-1 text-xs font-medium hover:bg-neutral-100"
                          >
                            제거
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {site.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <a
                          href={`/wholesale/${site.id}`}
                          className="inline-flex w-fit rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-100"
                        >
                          상세 페이지 보기
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <CompareRow
  label="한 줄 설명"
  values={selectedSites.map((site) => site.shortDescription)}
/>
<CompareRow
  label="상품 가격대"
  values={selectedSites.map((site) => site.priceRange)}
/>
<CompareRow
  label="MOQ"
  values={selectedSites.map((site) => site.moq)}
/>
<CompareRow
  label="배송비"
  values={selectedSites.map((site) => site.shippingCost)}
/>
<CompareRow
  label="배송기간"
  values={selectedSites.map((site) => site.deliveryPeriod)}
/>
<CompareRow
  label="CS 대응"
  values={selectedSites.map((site) => site.csResponse)}
/>
<CompareRow
  label="위탁 가능 여부"
  values={selectedSites.map((site) => site.dropshipping)}
/>
<CompareRow
  label="사업자 필요 여부"
  values={selectedSites.map((site) => site.businessRequired)}
/>
<CompareRow
  label="초보 난이도"
  values={selectedSites.map((site) => site.beginnerLevel)}
/>
<CompareRow
  label="추천 판매 방식"
  values={selectedSites.map((site) => site.recommendedMode)}
/>
<CompareRow
  label="주요 상품 카테고리"
  values={selectedSites.map((site) => site.mainCategories)}
/>
<CompareRow
  label="플랫폼 성격"
  values={selectedSites.map((site) => site.platformType)}
/>
<CompareRow
  label="언어"
  values={selectedSites.map((site) => site.language)}
/>
<CompareRow
  label="마진 구조"
  values={selectedSites.map((site) => site.marginPotential)}
/>
<CompareRow
  label="가격 경쟁력"
  values={selectedSites.map((site) => site.priceCompetitiveness)}
/>
<CompareRow
  label="차별화 가능성"
  values={selectedSites.map((site) => site.differentiationPotential)}
/>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function CompareRow({
  label,
  values,
}: {
  label: string;
  values: string[];
}) {
  return (
    <tr className="align-top">
      <td className="border-b border-neutral-200 bg-neutral-50 px-5 py-4 text-sm font-semibold text-neutral-700">
        {label}
      </td>
      {values.map((value, index) => (
        <td
          key={`${label}-${index}`}
          className="border-b border-l border-neutral-200 px-5 py-4 text-sm leading-6 text-neutral-600"
        >
          {value}
        </td>
      ))}
    </tr>
  );
}