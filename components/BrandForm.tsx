"use client";

import { useState } from "react";

export default function BrandForm() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [budget, setBudget] = useState("");
  const [tags, setTags] = useState("");
  const [summary, setSummary] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [storeCount, setStoreCount] = useState("");
  const [foundingYear, setFoundingYear] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");

  const [storesSeoul, setStoresSeoul] = useState("");
  const [storesGyeonggi, setStoresGyeonggi] = useState("");
  const [storesIncheon, setStoresIncheon] = useState("");
  const [storesBusan, setStoresBusan] = useState("");
  const [storesGwangju, setStoresGwangju] = useState("");
  const [storesDaegu, setStoresDaegu] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setMessage("");
    setError("");

    const res = await fetch("/api/brands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        country,
        category,
        oneLiner,
        budget,
        tags,
        summary,
        imageUrl,
        budgetMin,
        budgetMax,
        storeCount,
        foundingYear,
        monthlyRevenue,
        storesSeoul,
        storesGyeonggi,
        storesIncheon,
        storesBusan,
        storesGwangju,
        storesDaegu,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.message ?? "브랜드 등록에 실패했습니다.");
      return;
    }

    setMessage("브랜드가 성공적으로 등록되었습니다.");

    setName("");
    setCountry("");
    setCategory("");
    setOneLiner("");
    setBudget("");
    setTags("");
    setSummary("");
    setImageUrl("");

    setBudgetMin("");
    setBudgetMax("");
    setStoreCount("");
    setFoundingYear("");
    setMonthlyRevenue("");

    setStoresSeoul("");
    setStoresGyeonggi("");
    setStoresIncheon("");
    setStoresBusan("");
    setStoresGwangju("");
    setStoresDaegu("");
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">기본 정보</h2>

        <input
          className="h-11 w-full rounded-xl border px-3 text-sm"
          placeholder="브랜드명"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="국가 (예: 한국, 일본)"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="카테고리 (예: 치킨, 카페)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <input
          className="h-11 w-full rounded-xl border px-3 text-sm"
          placeholder="한 줄 소개"
          value={oneLiner}
          onChange={(e) => setOneLiner(e.target.value)}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="예산 구분 (예: 소자본, 중자본, 고자본)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="태그 (예: 치킨,배달,프랜차이즈)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <input
          className="h-11 w-full rounded-xl border px-3 text-sm"
          placeholder="브랜드 이미지 URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <textarea
          className="min-h-32 w-full rounded-xl border px-3 py-3 text-sm"
          placeholder="상세 설명"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">창업 비용 / 브랜드 규모</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="최소 창업 비용 (예: 80000000)"
            value={budgetMin}
            onChange={(e) => setBudgetMin(e.target.value)}
          />
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="최대 창업 비용 (예: 150000000)"
            value={budgetMax}
            onChange={(e) => setBudgetMax(e.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="전체 매장 수"
            value={storeCount}
            onChange={(e) => setStoreCount(e.target.value)}
          />
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="설립 연도"
            value={foundingYear}
            onChange={(e) => setFoundingYear(e.target.value)}
          />
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="월 평균 매출"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">지역별 매장 수</h2>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="서울 매장 수"
            value={storesSeoul}
            onChange={(e) => setStoresSeoul(e.target.value)}
          />
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="경기 매장 수"
            value={storesGyeonggi}
            onChange={(e) => setStoresGyeonggi(e.target.value)}
          />
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="인천 매장 수"
            value={storesIncheon}
            onChange={(e) => setStoresIncheon(e.target.value)}
          />
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="부산 매장 수"
            value={storesBusan}
            onChange={(e) => setStoresBusan(e.target.value)}
          />
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="광주 매장 수"
            value={storesGwangju}
            onChange={(e) => setStoresGwangju(e.target.value)}
          />
          <input
            className="h-11 w-full rounded-xl border px-3 text-sm"
            placeholder="대구 매장 수"
            value={storesDaegu}
            onChange={(e) => setStoresDaegu(e.target.value)}
          />
        </div>
      </div>

      {message ? <p className="text-sm text-green-600">{message}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="button"
        onClick={submit}
        className="h-11 rounded-xl bg-neutral-900 px-5 text-sm text-white hover:bg-neutral-800"
      >
        브랜드 등록하기
      </button>
    </div>
  );
}