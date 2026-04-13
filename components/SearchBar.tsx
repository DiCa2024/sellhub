"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = ["전체", "카페", "외식", "디저트", "교육", "헬스", "펫", "리테일"];
const countries = ["전체", "한국", "일본", "미국", "동남아", "유럽"];
const budgets = ["전체", "소자본", "중간", "고자본"];

export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("전체");
  const [country, setCountry] = useState("전체");
  const [budget, setBudget] = useState("전체");

  const go = () => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (category !== "전체") params.set("category", category);
    if (country !== "전체") params.set("country", country);
    if (budget !== "전체") params.set("budget", budget);
    router.push(`/search?${params.toString()}`);
  };

  return (
  <div className="rounded-2xl border bg-white shadow-sm p-4">
      <div className="grid gap-3 md:grid-cols-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="브랜드명/키워드 검색"
          className="h-11 rounded-xl border px-3 text-sm outline-none focus:border-neutral-400"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-11 rounded-xl border px-3 text-sm outline-none focus:border-neutral-400"
        >
          {categories.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="h-11 rounded-xl border px-3 text-sm outline-none focus:border-neutral-400"
        >
          {countries.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <div className="flex gap-3">
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="h-11 w-full rounded-xl border px-3 text-sm outline-none focus:border-neutral-400"
          >
            {budgets.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>

          <button
            onClick={go}
            className="h-11 shrink-0 rounded-xl bg-neutral-900 px-5 text-sm text-white hover:bg-neutral-800"
          >
            찾기
          </button>
        </div>
      </div>
    </div>
  );
}