"use client";

import { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 20;
const REGION_ITEMS = ["전체", "국내", "해외"];

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

export default function SalesChannelPageClient({
  initialChannels,
  initialSites,
  initialPosts,
}: {
  initialChannels: any[];
  initialSites: any[];
  initialPosts: any[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("전체");

  const [channels] = useState<any[]>(initialChannels);
  const [dbSites] = useState<any[]>(initialSites);
  const [dbPosts] = useState<any[]>(initialPosts);
  const [isLoading] = useState(false);

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedCompare = JSON.parse(
      localStorage.getItem("compareSalesChannels") || "[]"
    );
    setCompareIds(savedCompare.map((id: string | number) => String(id)));
  }, []);

  const filteredChannels = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return channels.filter((channel) => {
      const searchTarget = [
        channel.name,
        channel.category,
        channel.region,
        channel.settlementDate,
      ]
        .join(" ")
        .toLowerCase();

      const searchMatch =
        keyword.length === 0 || searchTarget.includes(keyword);

      const regionText = String(channel.region || "").toLowerCase();

      const regionMatch =
        selectedRegion === "전체" ||
        (selectedRegion === "국내" &&
          ["국내", "한국", "대한민국"].includes(regionText)) ||
        (selectedRegion === "해외" &&
          !["국내", "한국", "대한민국"].includes(regionText));

      return searchMatch && regionMatch;
    });
  }, [channels, searchTerm, selectedRegion]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredChannels.length / ITEMS_PER_PAGE)
  );

  const pagedChannels = filteredChannels.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const compareChannels = channels.filter((channel) =>
    compareIds.includes(String(channel.id))
  );

  const latestSites = dbSites.slice(0, 4);
  const latestPosts = dbPosts.slice(0, 4);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRegion]);

  const handleCompareToggle = (id: string) => {
    let updated: string[] = [];

    if (compareIds.includes(id)) {
      updated = compareIds.filter((item) => item !== id);
    } else {
      if (compareIds.length >= 10) {
        alert("비교는 최대 10개까지 가능");
        return;
      }
      updated = [...compareIds, id];
    }

    setCompareIds(updated);
    localStorage.setItem("compareSalesChannels", JSON.stringify(updated));
  };

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* 검색 */}
        <div className="mb-6 flex gap-3">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색"
            className="border px-4 py-2 w-full"
          />
        </div>

        {/* 리스트 */}
        {isLoading ? (
          <div>로딩중...</div>
        ) : (
          <>
            {pagedChannels.map((channel) => (
              <div
                key={channel.id}
                className="flex justify-between border p-4 mb-2"
              >
                <div>
                  <div className="font-bold">{channel.name}</div>
                  <div className="text-sm text-gray-500">
                    {channel.category} · {channel.region}
                  </div>
                </div>

                <button
                  onClick={() => handleCompareToggle(String(channel.id))}
                  className="bg-black text-white px-3 py-1"
                >
                  비교
                </button>
              </div>
            ))}
          </>
        )}

        {/* 페이지네이션 */}
        <div className="mt-6 flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className="border px-3 py-1"
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* 도매 */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-4">도매 사이트</h2>
          <div className="grid grid-cols-4 gap-4">
            {latestSites.map((site) => (
              <div key={site.id}>
                <img src={site.imageUrl} />
                <div>{site.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 블로그 */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-4">블로그</h2>
          <div className="grid grid-cols-4 gap-4">
            {latestPosts.map((post) => (
              <div key={post.id}>
                <img src={post.imageUrl} />
                <div>{post.title}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}