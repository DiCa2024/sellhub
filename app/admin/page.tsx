"use client";

import { useEffect, useState } from "react";

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

export default function AdminPage() {
  const [channels, setChannels] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [channel, setChannel] = useState<any>({
    name: "",
    imageUrl: "",
    region: "",
    category: "",
    settlementDate: "",
    website: "",
    feeTable: createEmptyFeeTable(),
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("salesChannels") || "[]");
    setChannels(saved);
  }, []);

  const handleSave = () => {
    const hasFee = Object.values(channel.feeTable).some((v) => v !== "");

    if (!channel.name || !channel.region || !channel.category || !hasFee) {
      alert("필수값을 입력하세요");
      return;
    }

    let updated;

    if (editingId) {
      updated = channels.map((c) =>
        c.id === editingId ? { ...channel, id: editingId } : c
      );
    } else {
      updated = [
        ...channels,
        { ...channel, id: "channel-" + Date.now() },
      ];
    }

    setChannels(updated);
    localStorage.setItem("salesChannels", JSON.stringify(updated));

    setChannel({
      name: "",
      imageUrl: "",
      region: "",
      category: "",
      settlementDate: "",
      website: "",
      feeTable: createEmptyFeeTable(),
    });

    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setChannel({
      ...item,
      feeTable: {
        ...createEmptyFeeTable(),
        ...(item.feeTable || {}),
      },
    });
    setEditingId(item.id);
  };

  const handleDelete = (id: string) => {
    const updated = channels.filter((c) => c.id !== id);
    setChannels(updated);
    localStorage.setItem("salesChannels", JSON.stringify(updated));
  };

  return (
    <main className="p-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">판매 채널 관리</h1>

      {/* 입력 폼 */}
      <div className="space-y-4 border p-6 rounded-xl bg-white">
        <input
          placeholder="채널명"
          value={channel.name}
          onChange={(e) =>
            setChannel({ ...channel, name: e.target.value })
          }
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="이미지 URL"
          value={channel.imageUrl}
          onChange={(e) =>
            setChannel({ ...channel, imageUrl: e.target.value })
          }
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="지역 (국내 / 해외)"
          value={channel.region}
          onChange={(e) =>
            setChannel({ ...channel, region: e.target.value })
          }
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="카테고리"
          value={channel.category}
          onChange={(e) =>
            setChannel({ ...channel, category: e.target.value })
          }
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="정산일"
          value={channel.settlementDate}
          onChange={(e) =>
            setChannel({
              ...channel,
              settlementDate: e.target.value,
            })
          }
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="공식 사이트 URL"
          value={channel.website}
          onChange={(e) =>
            setChannel({ ...channel, website: e.target.value })
          }
          className="w-full border p-3 rounded"
        />

        {/* 수수료표 */}
        <div>
          <p className="font-semibold mb-2">카테고리별 수수료</p>

          <div className="grid grid-cols-2 gap-3">
            {SALES_CHANNEL_FEE_CATEGORIES.map((item) => (
              <input
                key={item.key}
                placeholder={`${item.label} 수수료`}
                value={channel.feeTable[item.key]}
                onChange={(e) =>
                  setChannel({
                    ...channel,
                    feeTable: {
                      ...channel.feeTable,
                      [item.key]: e.target.value,
                    },
                  })
                }
                className="border p-3 rounded"
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-black text-white px-6 py-3 rounded"
        >
          저장
        </button>
      </div>

      {/* 목록 */}
      <div className="mt-10 space-y-4">
        {channels.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-xl bg-white"
          >
            <div className="font-bold">{item.name}</div>
            <div className="text-sm text-gray-500">
              {item.region} · {item.category} · {item.settlementDate}
            </div>

            {/* 수수료표 미리보기 */}
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {SALES_CHANNEL_FEE_CATEGORIES.map((c) => {
                const val = item.feeTable?.[c.key];
                if (!val) return null;

                return (
                  <span
                    key={c.key}
                    className="bg-gray-100 px-2 py-1 rounded"
                  >
                    {c.label} {val}
                  </span>
                );
              })}
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="border px-3 py-1 rounded"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="border px-3 py-1 rounded"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}