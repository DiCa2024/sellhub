"use client";

import { useEffect, useState } from "react";

type AdminTab = "wholesale" | "sales" | "blog";

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
] as const;

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

type FeeTable = ReturnType<typeof createEmptyFeeTable>;

type WholesaleForm = {
  category: string;
  name: string;
  region: string;
  imageUrl: string;
  tags: string;
  website: string;
  dropshipping: string;
  businessRequired: string;
  usageFee: string;
  imageProvided: string;
  shortDescription: string;
};

type SalesChannelForm = {
  name: string;
  imageUrl: string;
  region: string;
  category: string;
  settlementDate: string;
  website: string;
  shortDescription: string;
  feeTable: FeeTable;
};

type BlogForm = {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  imageUrl: string;
};

const emptyWholesaleForm: WholesaleForm = {
  category: "",
  name: "",
  region: "",
  imageUrl: "",
  tags: "",
  website: "",
  dropshipping: "",
  businessRequired: "",
  usageFee: "",
  imageProvided: "",
  shortDescription: "",
};

const emptySalesChannelForm: SalesChannelForm = {
  name: "",
  imageUrl: "",
  region: "",
  category: "",
  settlementDate: "",
  website: "",
  shortDescription: "",
  feeTable: createEmptyFeeTable(),
};

const emptyBlogForm: BlogForm = {
  title: "",
  category: "",
  excerpt: "",
  content: "",
  imageUrl: "",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("wholesale");

  const [sites, setSites] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  const [wholesaleForm, setWholesaleForm] =
    useState<WholesaleForm>(emptyWholesaleForm);
  const [salesForm, setSalesForm] =
    useState<SalesChannelForm>(emptySalesChannelForm);
  const [blogForm, setBlogForm] = useState<BlogForm>(emptyBlogForm);

  const [editingWholesaleId, setEditingWholesaleId] = useState<string | null>(
    null
  );
  const [editingSalesId, setEditingSalesId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  useEffect(() => {
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedChannels = JSON.parse(
      localStorage.getItem("salesChannels") || "[]"
    );
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    setSites(savedSites);
    setChannels(savedChannels);
    setPosts(savedPosts);
  }, []);

  const resetWholesaleForm = () => {
    setWholesaleForm(emptyWholesaleForm);
    setEditingWholesaleId(null);
  };

  const resetSalesForm = () => {
    setSalesForm(emptySalesChannelForm);
    setEditingSalesId(null);
  };

  const resetBlogForm = () => {
    setBlogForm(emptyBlogForm);
    setEditingBlogId(null);
  };

  const saveWholesale = () => {
    if (
      !wholesaleForm.name.trim() ||
      !wholesaleForm.category.trim() ||
      !wholesaleForm.region.trim() ||
      !wholesaleForm.shortDescription.trim()
    ) {
      alert("도매 사이트는 사이트명, 카테고리, 지역, 설명이 필수입니다.");
      return;
    }

    const payload = {
      category: wholesaleForm.category.trim(),
      name: wholesaleForm.name.trim(),
      region: wholesaleForm.region.trim(),
      imageUrl: wholesaleForm.imageUrl.trim(),
      tags: wholesaleForm.tags
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
      website: wholesaleForm.website.trim(),
      dropshipping: wholesaleForm.dropshipping.trim(),
      businessRequired: wholesaleForm.businessRequired.trim(),
      usageFee: wholesaleForm.usageFee.trim(),
      imageProvided: wholesaleForm.imageProvided.trim(),
      shortDescription: wholesaleForm.shortDescription.trim(),
      views: "0",
    };

    let updated: any[] = [];

    if (editingWholesaleId) {
      updated = sites.map((item: any) =>
        item.id === editingWholesaleId
          ? { ...item, ...payload, id: editingWholesaleId }
          : item
      );
      alert("도매 사이트가 수정되었습니다.");
    } else {
      const duplicated = sites.some(
        (item: any) =>
          String(item.name || "").trim().toLowerCase() ===
          payload.name.toLowerCase()
      );

      if (duplicated) {
        alert("같은 이름의 도매 사이트가 이미 있습니다.");
        return;
      }

      updated = [{ id: `site-${Date.now()}`, ...payload }, ...sites];
      alert("도매 사이트가 등록되었습니다.");
    }

    setSites(updated);
    localStorage.setItem("sites", JSON.stringify(updated));
    resetWholesaleForm();
  };

  const editWholesale = (item: any) => {
    setActiveTab("wholesale");
    setEditingWholesaleId(item.id);
    setWholesaleForm({
      category: item.category || "",
      name: item.name || "",
      region: item.region || "",
      imageUrl: item.imageUrl || "",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
      website: item.website || "",
      dropshipping: item.dropshipping || "",
      businessRequired: item.businessRequired || "",
      usageFee: item.usageFee || "",
      imageProvided: item.imageProvided || "",
      shortDescription: item.shortDescription || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteWholesale = (id: string) => {
    if (!confirm("이 도매 사이트를 삭제할까요?")) return;
    const updated = sites.filter((item: any) => item.id !== id);
    setSites(updated);
    localStorage.setItem("sites", JSON.stringify(updated));
    if (editingWholesaleId === id) resetWholesaleForm();
  };

  const saveSalesChannel = () => {
    const hasFee = Object.values(salesForm.feeTable).some(
      (v) => String(v).trim() !== ""
    );

    if (
      !salesForm.name.trim() ||
      !salesForm.region.trim() ||
      !salesForm.category.trim() ||
      !salesForm.shortDescription.trim() ||
      !hasFee
    ) {
      alert(
        "판매 채널은 채널명, 지역, 카테고리, 설명, 수수료표(최소 1개)가 필수입니다."
      );
      return;
    }

    const payload = {
      name: salesForm.name.trim(),
      imageUrl: salesForm.imageUrl.trim(),
      region: salesForm.region.trim(),
      category: salesForm.category.trim(),
      settlementDate: salesForm.settlementDate.trim(),
      website: salesForm.website.trim(),
      shortDescription: salesForm.shortDescription.trim(),
      feeTable: salesForm.feeTable,
    };

    let updated: any[] = [];

    if (editingSalesId) {
      updated = channels.map((item: any) =>
        item.id === editingSalesId
          ? { ...item, ...payload, id: editingSalesId }
          : item
      );
      alert("판매 채널이 수정되었습니다.");
    } else {
      const duplicated = channels.some(
        (item: any) =>
          String(item.name || "").trim().toLowerCase() ===
          payload.name.toLowerCase()
      );

      if (duplicated) {
        alert("같은 이름의 판매 채널이 이미 있습니다.");
        return;
      }

      updated = [{ id: `channel-${Date.now()}`, ...payload }, ...channels];
      alert("판매 채널이 등록되었습니다.");
    }

    setChannels(updated);
    localStorage.setItem("salesChannels", JSON.stringify(updated));
    resetSalesForm();
  };

  const editSalesChannel = (item: any) => {
    setActiveTab("sales");
    setEditingSalesId(item.id);
    setSalesForm({
      name: item.name || "",
      imageUrl: item.imageUrl || "",
      region: item.region || "",
      category: item.category || "",
      settlementDate: item.settlementDate || "",
      website: item.website || "",
      shortDescription: item.shortDescription || "",
      feeTable: {
        ...createEmptyFeeTable(),
        ...(item.feeTable || {}),
      },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteSalesChannel = (id: string) => {
    if (!confirm("이 판매 채널을 삭제할까요?")) return;
    const updated = channels.filter((item: any) => item.id !== id);
    setChannels(updated);
    localStorage.setItem("salesChannels", JSON.stringify(updated));
    if (editingSalesId === id) resetSalesForm();
  };

  const saveBlogPost = () => {
    if (
      !blogForm.title.trim() ||
      !blogForm.category.trim() ||
      !blogForm.excerpt.trim() ||
      !blogForm.content.trim()
    ) {
      alert("블로그는 제목, 카테고리, 요약, 본문이 필수입니다.");
      return;
    }

    const payload = {
      title: blogForm.title.trim(),
      category: blogForm.category.trim(),
      excerpt: blogForm.excerpt.trim(),
      content: blogForm.content.trim(),
      imageUrl: blogForm.imageUrl.trim(),
      date: new Date().toISOString().slice(0, 10),
      views: 0,
    };

    let updated: any[] = [];

    if (editingBlogId) {
      updated = posts.map((item: any) =>
        item.id === editingBlogId
          ? { ...item, ...payload, id: editingBlogId }
          : item
      );
      alert("블로그 글이 수정되었습니다.");
    } else {
      const duplicated = posts.some(
        (item: any) =>
          String(item.title || "").trim().toLowerCase() ===
          payload.title.toLowerCase()
      );

      if (duplicated) {
        alert("같은 제목의 블로그 글이 이미 있습니다.");
        return;
      }

      updated = [{ id: `post-${Date.now()}`, ...payload }, ...posts];
      alert("블로그 글이 등록되었습니다.");
    }

    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
    resetBlogForm();
  };

  const editBlogPost = (item: any) => {
    setActiveTab("blog");
    setEditingBlogId(item.id);
    setBlogForm({
      title: item.title || "",
      category: item.category || "",
      excerpt: item.excerpt || "",
      content: item.content || "",
      imageUrl: item.imageUrl || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteBlogPost = (id: string) => {
    if (!confirm("이 블로그 글을 삭제할까요?")) return;
    const updated = posts.filter((item: any) => item.id !== id);
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
    if (editingBlogId === id) resetBlogForm();
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">관리자 페이지</h1>
          <p className="mt-2 text-sm text-neutral-600">
            도매 사이트, 판매 채널, 블로그 글을 등록하고 수정할 수 있습니다.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <TabButton
            active={activeTab === "wholesale"}
            onClick={() => setActiveTab("wholesale")}
            label="도매 사이트 관리"
          />
          <TabButton
            active={activeTab === "sales"}
            onClick={() => setActiveTab("sales")}
            label="판매 채널 관리"
          />
          <TabButton
            active={activeTab === "blog"}
            onClick={() => setActiveTab("blog")}
            label="블로그 관리"
          />
        </div>

        {activeTab === "wholesale" && (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                {editingWholesaleId ? "도매 사이트 수정" : "도매 사이트 등록"}
              </h2>

              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="카테고리"
                  value={wholesaleForm.category}
                  onChange={(v) =>
                    setWholesaleForm({ ...wholesaleForm, category: v })
                  }
                />
                <Input
                  label="사이트명"
                  value={wholesaleForm.name}
                  onChange={(v) =>
                    setWholesaleForm({ ...wholesaleForm, name: v })
                  }
                />
                <Input
                  label="지역"
                  value={wholesaleForm.region}
                  onChange={(v) =>
                    setWholesaleForm({ ...wholesaleForm, region: v })
                  }
                />
                <Input
                  label="이미지 URL"
                  value={wholesaleForm.imageUrl}
                  onChange={(v) =>
                    setWholesaleForm({ ...wholesaleForm, imageUrl: v })
                  }
                />
                <Input
                  label="태그 (쉼표로 구분)"
                  value={wholesaleForm.tags}
                  onChange={(v) =>
                    setWholesaleForm({ ...wholesaleForm, tags: v })
                  }
                />
                <Input
                  label="공식 사이트 URL"
                  value={wholesaleForm.website}
                  onChange={(v) =>
                    setWholesaleForm({ ...wholesaleForm, website: v })
                  }
                />
                <Input
                  label="위탁배송 가능 여부"
                  value={wholesaleForm.dropshipping}
                  onChange={(v) =>
                    setWholesaleForm({ ...wholesaleForm, dropshipping: v })
                  }
                />
                <Input
                  label="사업자등록 필요 여부"
                  value={wholesaleForm.businessRequired}
                  onChange={(v) =>
                    setWholesaleForm({
                      ...wholesaleForm,
                      businessRequired: v,
                    })
                  }
                />
                <Input
                  label="이용료"
                  value={wholesaleForm.usageFee}
                  onChange={(v) =>
                    setWholesaleForm({ ...wholesaleForm, usageFee: v })
                  }
                />
                <Input
                  label="이미지 제공 여부"
                  value={wholesaleForm.imageProvided}
                  onChange={(v) =>
                    setWholesaleForm({ ...wholesaleForm, imageProvided: v })
                  }
                />
              </div>

              <div className="mt-3">
                <Textarea
                  label="설명"
                  value={wholesaleForm.shortDescription}
                  onChange={(v) =>
                    setWholesaleForm({
                      ...wholesaleForm,
                      shortDescription: v,
                    })
                  }
                />
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={saveWholesale}
                  className="rounded-xl bg-black px-4 py-3 text-white hover:opacity-90"
                >
                  {editingWholesaleId ? "수정 저장" : "도매 사이트 등록"}
                </button>
                {editingWholesaleId && (
                  <button
                    onClick={resetWholesaleForm}
                    className="rounded-xl border px-4 py-3 hover:bg-neutral-100"
                  >
                    취소
                  </button>
                )}
              </div>
            </section>

            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">등록된 도매 사이트</h2>

              <div className="space-y-4">
                {sites.length === 0 ? (
                  <p className="text-sm text-neutral-500">
                    아직 등록된 도매 사이트가 없습니다.
                  </p>
                ) : (
                  sites.map((item: any) => (
                    <div key={item.id} className="rounded-xl border p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-bold">{item.name}</p>
                          <p className="text-sm text-neutral-500">
                            {item.region} · {item.category}
                          </p>
                          <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                            {item.shortDescription}
                          </p>
                        </div>

                        <div className="flex shrink-0 gap-2">
                          <button
                            onClick={() => editWholesale(item)}
                            className="rounded-lg border px-3 py-2 text-xs hover:bg-neutral-100"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => deleteWholesale(item.id)}
                            className="rounded-lg border px-3 py-2 text-xs hover:bg-neutral-100"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === "sales" && (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                {editingSalesId ? "판매 채널 수정" : "판매 채널 등록"}
              </h2>

              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="채널명"
                  value={salesForm.name}
                  onChange={(v) => setSalesForm({ ...salesForm, name: v })}
                />
                <Input
                  label="이미지 URL"
                  value={salesForm.imageUrl}
                  onChange={(v) => setSalesForm({ ...salesForm, imageUrl: v })}
                />
                <Input
                  label="지역"
                  value={salesForm.region}
                  onChange={(v) => setSalesForm({ ...salesForm, region: v })}
                />
                <Input
                  label="카테고리"
                  value={salesForm.category}
                  onChange={(v) => setSalesForm({ ...salesForm, category: v })}
                />
                <Input
                  label="정산일"
                  value={salesForm.settlementDate}
                  onChange={(v) =>
                    setSalesForm({ ...salesForm, settlementDate: v })
                  }
                />
                <Input
                  label="공식 사이트 URL"
                  value={salesForm.website}
                  onChange={(v) => setSalesForm({ ...salesForm, website: v })}
                />
              </div>

              <div className="mt-3">
                <Textarea
                  label="한 줄 설명"
                  value={salesForm.shortDescription}
                  onChange={(v) =>
                    setSalesForm({ ...salesForm, shortDescription: v })
                  }
                />
              </div>

              <div className="mt-4">
                <p className="mb-3 text-sm font-medium">카테고리별 수수료표</p>
                <div className="grid gap-3 md:grid-cols-2">
                  {SALES_CHANNEL_FEE_CATEGORIES.map((item) => (
                    <Input
                      key={item.key}
                      label={item.label}
                      value={salesForm.feeTable[item.key]}
                      onChange={(v) =>
                        setSalesForm({
                          ...salesForm,
                          feeTable: {
                            ...salesForm.feeTable,
                            [item.key]: v,
                          },
                        })
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={saveSalesChannel}
                  className="rounded-xl bg-black px-4 py-3 text-white hover:opacity-90"
                >
                  {editingSalesId ? "수정 저장" : "판매 채널 등록"}
                </button>
                {editingSalesId && (
                  <button
                    onClick={resetSalesForm}
                    className="rounded-xl border px-4 py-3 hover:bg-neutral-100"
                  >
                    취소
                  </button>
                )}
              </div>
            </section>

            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">등록된 판매 채널</h2>

              <div className="space-y-4">
                {channels.length === 0 ? (
                  <p className="text-sm text-neutral-500">
                    아직 등록된 판매 채널이 없습니다.
                  </p>
                ) : (
                  channels.map((item: any) => (
                    <div key={item.id} className="rounded-xl border p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-bold">{item.name}</p>
                          <p className="text-sm text-neutral-500">
                            {item.region} · {item.category} · 정산일{" "}
                            {item.settlementDate || "-"}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-600">
                            {SALES_CHANNEL_FEE_CATEGORIES.map((fee) => {
                              const value = item.feeTable?.[fee.key];
                              if (!value) return null;

                              return (
                                <span
                                  key={fee.key}
                                  className="rounded bg-neutral-100 px-2 py-1"
                                >
                                  {fee.label} {value}
                                </span>
                              );
                            })}
                          </div>

                          <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                            {item.shortDescription}
                          </p>
                        </div>

                        <div className="flex shrink-0 gap-2">
                          <button
                            onClick={() => editSalesChannel(item)}
                            className="rounded-lg border px-3 py-2 text-xs hover:bg-neutral-100"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => deleteSalesChannel(item.id)}
                            className="rounded-lg border px-3 py-2 text-xs hover:bg-neutral-100"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === "blog" && (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                {editingBlogId ? "블로그 수정" : "블로그 등록"}
              </h2>

              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="제목"
                  value={blogForm.title}
                  onChange={(v) => setBlogForm({ ...blogForm, title: v })}
                />
                <Input
                  label="카테고리"
                  value={blogForm.category}
                  onChange={(v) => setBlogForm({ ...blogForm, category: v })}
                />
                <Input
                  label="썸네일 URL"
                  value={blogForm.imageUrl}
                  onChange={(v) => setBlogForm({ ...blogForm, imageUrl: v })}
                />
              </div>

              <div className="mt-3">
                <Textarea
                  label="요약"
                  value={blogForm.excerpt}
                  onChange={(v) => setBlogForm({ ...blogForm, excerpt: v })}
                />
              </div>

              <div className="mt-3">
                <Textarea
                  label="본문"
                  rows={12}
                  value={blogForm.content}
                  onChange={(v) => setBlogForm({ ...blogForm, content: v })}
                />
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={saveBlogPost}
                  className="rounded-xl bg-black px-4 py-3 text-white hover:opacity-90"
                >
                  {editingBlogId ? "수정 저장" : "블로그 등록"}
                </button>
                {editingBlogId && (
                  <button
                    onClick={resetBlogForm}
                    className="rounded-xl border px-4 py-3 hover:bg-neutral-100"
                  >
                    취소
                  </button>
                )}
              </div>
            </section>

            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">등록된 블로그 글</h2>

              <div className="space-y-4">
                {posts.length === 0 ? (
                  <p className="text-sm text-neutral-500">
                    아직 등록된 블로그 글이 없습니다.
                  </p>
                ) : (
                  posts.map((item: any) => (
                    <div key={item.id} className="rounded-xl border p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-bold">{item.title}</p>
                          <p className="text-sm text-neutral-500">
                            {item.category}
                          </p>
                          <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                            {item.excerpt}
                          </p>
                        </div>

                        <div className="flex shrink-0 gap-2">
                          <button
                            onClick={() => editBlogPost(item)}
                            className="rounded-lg border px-3 py-2 text-xs hover:bg-neutral-100"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => deleteBlogPost(item.id)}
                            className="rounded-lg border px-3 py-2 text-xs hover:bg-neutral-100"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm transition ${
        active
          ? "bg-black text-white"
          : "border border-neutral-300 bg-white hover:bg-neutral-100"
      }`}
    >
      {label}
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border p-3"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 6,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border p-3"
      />
    </div>
  );
}