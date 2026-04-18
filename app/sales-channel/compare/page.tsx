"use client";

import { useEffect, useMemo, useState } from "react";

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

export default function SalesChannelComparePage() {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedCompare = JSON.parse(localStorage.getItem("compareSalesChannels") || "[]");
    const savedChannels = JSON.parse(localStorage.getItem("salesChannels") || "[]");

    setCompareIds(savedCompare);
    setChannels(savedChannels);
    setLoaded(true);
  }, []);

  const comparedChannels = useMemo(() => {
    return channels.filter((item) => compareIds.includes(item.id));
  }, [channels, compareIds]);

  const clearCompare = () => {
    setCompareIds([]);
    localStorage.setItem("compareSalesChannels", JSON.stringify([]));
  };

  const removeCompare = (id: string) => {
    const updated = compareIds.filter((item) => item !== id);
    setCompareIds(updated);
    localStorage.setItem("compareSalesChannels", JSON.stringify(updated));
  };

  if (!loaded) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">불러오는 중...</div>
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

        <div className="mt-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">판매 채널 비교</h1>
            <p className="mt-2 text-sm text-neutral-600">
              수수료표, 정산일, 공식 사이트를 중심으로 비교해 보세요.
            </p>
          </div>

          {comparedChannels.length > 0 && (
            <button
              onClick={clearCompare}
              className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100"
            >
              비교함 비우기
            </button>
          )}
        </div>

        {comparedChannels.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold">비교할 판매 채널이 없습니다.</h2>
            <p className="mt-3 text-sm text-neutral-600">
              판매 채널 목록에서 비교 버튼을 눌러 추가해 주세요.
            </p>
            <a
              href="/sales-channel"
              className="mt-6 inline-flex rounded-xl bg-black px-4 py-3 text-sm text-white"
            >
              판매 채널 보러가기
            </a>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div
              className="grid min-w-[980px]"
              style={{
                gridTemplateColumns: `220px repeat(${comparedChannels.length}, minmax(200px, 1fr))`,
              }}
            >
              <CompareLabelCell label="" />
              {comparedChannels.map((channel) => (
                <div
                  key={`head-${channel.id}`}
                  className="border-b border-l border-neutral-200 px-4 py-5 text-center"
                >
                  <div className="line-clamp-2 text-base font-bold text-neutral-900">
                    {channel.name}
                  </div>
                  <button
                    onClick={() => removeCompare(channel.id)}
                    className="mt-3 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs hover:bg-neutral-100"
                  >
                    제거
                  </button>
                </div>
              ))}

              {SALES_CHANNEL_FEE_CATEGORIES.map((item) => (
                <>
                  <CompareLabelCell key={`label-${item.key}`} label={`${item.label} 수수료`} />
                  {comparedChannels.map((channel) => {
                    const feeTable = {
                      ...createEmptyFeeTable(),
                      ...(channel.feeTable || {}),
                    };

                    return (
                      <CompareValueCell
                        key={`${item.key}-${channel.id}`}
                        value={feeTable[item.key as keyof typeof feeTable] || "-"}
                      />
                    );
                  })}
                </>
              ))}

              <CompareLabelCell label="정산일" />
              {comparedChannels.map((channel) => (
                <CompareValueCell
                  key={`settlement-${channel.id}`}
                  value={channel.settlementDate || "-"}
                />
              ))}

              <CompareLabelCell label="공식 사이트" />
              {comparedChannels.map((channel) => (
                <div
                  key={`site-${channel.id}`}
                  className="border-l border-neutral-200 px-4 py-5 text-center"
                >
                  {channel.website ? (
                    <a
                      href={channel.website}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
                    >
                      사이트 이동
                    </a>
                  ) : (
                    <span className="text-sm text-neutral-500">-</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function CompareLabelCell({ label }: { label: string }) {
  return (
    <div className="border-b border-neutral-200 bg-neutral-50 px-5 py-5 text-sm font-semibold text-neutral-700">
      {label}
    </div>
  );
}

function CompareValueCell({ value }: { value: string }) {
  return (
    <div className="border-b border-l border-neutral-200 px-4 py-5 text-center text-sm text-neutral-800">
      {value}
    </div>
  );
}