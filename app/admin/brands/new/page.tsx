"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminBrandNewPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    summary: "",
    logoUrl: "",
    thumbnailUrl: "",
    budgetMin: "",
    budgetMax: "",
    monthlyRevenue: "",
    storeCount: "",
    foundingYear: "",
    headquartersName: "",
    contactEmail: "",
    contactPhone: "",
    introTitle: "",
    introDescription: "",
    competitivenessTitle: "",
    competitivenessBody: "",
    targetCustomer: "",
    operationSupport: "",
    startupProcess: "",
    recommendedLocation: "",
    cautionNote: "",
    isPublished: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/admin/brands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("브랜드가 등록되었습니다.");
      router.push(`/brands/${data.brand.slug}`);
    } else {
      alert(data.error || "브랜드 등록 실패");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">ADMIN 브랜드 등록</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="브랜드명" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <input name="slug" placeholder="slug (예: megacoffee)" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <input name="category" placeholder="카테고리" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <textarea name="description" placeholder="브랜드 기본 설명" onChange={handleChange} className="w-full border rounded-lg px-3 py-2 min-h-[100px]" />
        <input name="summary" placeholder="한 줄 요약" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <input name="logoUrl" placeholder="로고 URL" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <input name="thumbnailUrl" placeholder="썸네일 URL" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <input name="budgetMin" placeholder="최소 창업 비용" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <input name="budgetMax" placeholder="최대 창업 비용" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <input name="monthlyRevenue" placeholder="예상 월매출" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <input name="storeCount" placeholder="가맹점 수" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <input name="foundingYear" placeholder="설립연도" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <input name="headquartersName" placeholder="본사명" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <input name="contactEmail" placeholder="대표 이메일" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <input name="contactPhone" placeholder="대표 연락처" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />

        <hr className="my-6" />

        <h2 className="text-xl font-semibold">홍보형 상세 페이지용 콘텐츠</h2>

        <input name="introTitle" placeholder="도입부 제목" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <textarea name="introDescription" placeholder="도입부 설명" onChange={handleChange} className="w-full border rounded-lg px-3 py-2 min-h-[100px]" />
        <input name="competitivenessTitle" placeholder="경쟁력 섹션 제목" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        <textarea name="competitivenessBody" placeholder="경쟁력 설명" onChange={handleChange} className="w-full border rounded-lg px-3 py-2 min-h-[100px]" />
        <textarea name="targetCustomer" placeholder="주요 타깃 고객" onChange={handleChange} className="w-full border rounded-lg px-3 py-2 min-h-[100px]" />
        <textarea name="operationSupport" placeholder="운영 지원 내용" onChange={handleChange} className="w-full border rounded-lg px-3 py-2 min-h-[100px]" />
        <textarea name="startupProcess" placeholder="창업 절차" onChange={handleChange} className="w-full border rounded-lg px-3 py-2 min-h-[100px]" />
        <textarea name="recommendedLocation" placeholder="추천 입지" onChange={handleChange} className="w-full border rounded-lg px-3 py-2 min-h-[100px]" />
        <textarea name="cautionNote" placeholder="유의사항" onChange={handleChange} className="w-full border rounded-lg px-3 py-2 min-h-[100px]" />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="isPublished" defaultChecked onChange={handleChange} />
          공개 상태로 등록
        </label>

        <button
          type="submit"
          className="rounded-xl bg-black px-6 py-3 text-white"
        >
          브랜드 등록
        </button>
      </form>
    </div>
  );
}