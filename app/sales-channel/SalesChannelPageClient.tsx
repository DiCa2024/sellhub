"use client";

import { useMemo, useState } from "react";

export default function SalesChannelPageClient({
  initialChannels,
}: {
  initialChannels: any[];
}) {
  const [channels] = useState(initialChannels);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChannels = useMemo(() => {
    const keyword = searchTerm.toLowerCase();

    return channels.filter((item) => {
      const text = `${item.name} ${item.category} ${item.region}`.toLowerCase();
      return keyword === "" || text.includes(keyword);
    });
  }, [channels, searchTerm]);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">

      {/* 🔥 상단 검색 영역 */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <h1 className="text-4xl font-bold mb-4">
            판매 채널 탐색
          </h1>

          <p className="text-neutral-600 mb-6">
            다양한 판매 채널을 비교하고 가장 적합한 플랫폼을 선택하세요.
          </p>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="판매 채널 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 rounded-xl border border-neutral-300 px-4 py-3"
            />
          </div>
        </div>
      </section>

      {/* 🔥 리스트 영역 */}
      <section className="mx-auto max-w-7xl px-6 py-14">

        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            판매 채널 목록
          </h2>
          <span className="text-sm text-neutral-500">
            총 {filteredChannels.length}개
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredChannels.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              {/* 이미지 */}
              <a href={`/sales-channel/${item.id}`}>
                <div className="mb-4 h-32 overflow-hidden rounded-xl bg-neutral-100">
                  <img
                    src={item.imageUrl || "https://placehold.co/600x400?text=Channel"}
                    alt={item.name}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              </a>

              {/* 이름 */}
              <h3 className="text-lg font-bold">{item.name}</h3>

              {/* 정보 */}
              <p className="text-sm text-neutral-500">
                {item.region} · {item.category}
              </p>

              {/* 설명 */}
              <p className="mt-3 text-sm text-neutral-600 line-clamp-3">
                {item.shortDescription}
              </p>

              {/* 버튼 */}
              <div className="mt-auto pt-5 flex gap-2">

                <a
                  href={`/sales-channel/${item.id}`}
                  className="flex-1 rounded-xl border border-neutral-300 px-3 py-2 text-center text-sm"
                >
                  상세 보기
                </a>

                {item.website ? (
                  <a
                    href={item.website}
                    target="_blank"
                    className="flex-1 rounded-xl bg-black text-white px-3 py-2 text-center text-sm"
                  >
                    이동
                  </a>
                ) : (
                  <div className="flex-1 rounded-xl bg-neutral-200 text-center px-3 py-2 text-sm">
                    없음
                  </div>
                )}

              </div>

            </div>
          ))}
        </div>

      </section>
    </main>
  );
}