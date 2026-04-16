"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "jmjmanse@naver.com";

export default function AdminPage() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [checked, setChecked] = useState(false);

  const [sites, setSites] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);

  const [editingSiteId, setEditingSiteId] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingChannelId, setEditingChannelId] = useState<string | null>(null);

  const [showAdvancedSiteFields, setShowAdvancedSiteFields] = useState(false);

  const emptySite = {
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

  const emptyPost = {
    title: "",
    category: "",
    excerpt: "",
    content: "",
    imageUrl: "",
  };

  const emptyChannel = {
  name: "",
  imageUrl: "",
  region: "",
  category: "",
  tags: "",
  shortDescription: "",
  website: "",
  commission: "",
  settlementDate: "",
  commissionLink: "",
  settlementLink: "",
};

  const [site, setSite] = useState(emptySite);
  const [post, setPost] = useState(emptyPost);
  const [channel, setChannel] = useState(emptyChannel);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const savedChannels = JSON.parse(
      localStorage.getItem("salesChannels") || "[]"
    );

    setCurrentUser(savedUser);
    setSites(savedSites);
    setPosts(savedPosts);
    setChannels(savedChannels);
    setChecked(true);
  }, []);

  useEffect(() => {
    if (!checked) return;

    if (!currentUser) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    if (
      currentUser.email?.trim().toLowerCase() !==
      ADMIN_EMAIL.trim().toLowerCase()
    ) {
      alert("관리자만 접근할 수 있습니다.");
      router.push("/");
    }
  }, [checked, currentUser, router]);

  const handleAddOrUpdateSite = () => {
    if (!site.name || !site.region || !site.category || !site.shortDescription) {
      alert("사이트명, 지역, 카테고리, 한 줄 설명은 필수입니다.");
      return;
    }

    if (editingSiteId) {
      const updatedSites = sites.map((item) =>
        item.id === editingSiteId
          ? {
              ...item,
              category: site.category,
              name: site.name,
              region: site.region,
              imageUrl: site.imageUrl,
              tags: site.tags.split(",").map((v) => v.trim()).filter(Boolean),
              website: site.website,
              dropshipping: site.dropshipping,
              businessRequired: site.businessRequired,
              usageFee: site.usageFee,
              imageProvided: site.imageProvided,
              shortDescription: site.shortDescription,
            }
          : item
      );

      setSites(updatedSites);
      localStorage.setItem("sites", JSON.stringify(updatedSites));
      setEditingSiteId(null);
      setSite(emptySite);
      setShowAdvancedSiteFields(false);
      alert("도매 사이트가 수정되었습니다.");
      return;
    }

    const duplicated = sites.some(
      (item) =>
        item.name.trim().toLowerCase() === site.name.trim().toLowerCase()
    );

    if (duplicated) {
      alert("같은 이름의 사이트가 이미 등록되어 있습니다.");
      return;
    }

    const id = `site-${Date.now()}`;

    const newSite = {
      id,
      category: site.category,
      name: site.name,
      region: site.region,
      imageUrl: site.imageUrl,
      tags: site.tags.split(",").map((v) => v.trim()).filter(Boolean),
      website: site.website,
      dropshipping: site.dropshipping,
      businessRequired: site.businessRequired,
      usageFee: site.usageFee,
      imageProvided: site.imageProvided,
      shortDescription: site.shortDescription,
      views: "0",
    };

    const updatedSites = [newSite, ...sites];
    setSites(updatedSites);
    localStorage.setItem("sites", JSON.stringify(updatedSites));
    setSite(emptySite);
    setShowAdvancedSiteFields(false);
    alert("도매 사이트가 등록되었습니다.");
  };

  const handleEditSite = (item: any) => {
    setEditingSiteId(item.id);
    setShowAdvancedSiteFields(true);
    setSite({
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

  const handleDeleteSite = (id: string) => {
    if (!confirm("이 사이트를 삭제할까요?")) return;

    const updatedSites = sites.filter((item) => item.id !== id);
    setSites(updatedSites);
    localStorage.setItem("sites", JSON.stringify(updatedSites));

    if (editingSiteId === id) {
      setEditingSiteId(null);
      setSite(emptySite);
      setShowAdvancedSiteFields(false);
    }
  };

  const cancelEditSite = () => {
    setEditingSiteId(null);
    setSite(emptySite);
    setShowAdvancedSiteFields(false);
  };

  const handleAddOrUpdatePost = () => {
    if (!post.title || !post.category || !post.excerpt || !post.content) {
      alert("제목, 카테고리, 요약, 본문은 필수입니다.");
      return;
    }

    if (editingPostId) {
      const updatedPosts = posts.map((item) =>
        item.id === editingPostId
          ? {
              ...item,
              title: post.title,
              category: post.category,
              excerpt: post.excerpt,
              content: post.content,
              imageUrl: post.imageUrl,
            }
          : item
      );

      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      setEditingPostId(null);
      setPost(emptyPost);
      alert("블로그 글이 수정되었습니다.");
      return;
    }

    const duplicated = posts.some(
      (item) =>
        item.title.trim().toLowerCase() === post.title.trim().toLowerCase()
    );

    if (duplicated) {
      alert("같은 제목의 글이 이미 등록되어 있습니다.");
      return;
    }

    const id = `post-${Date.now()}`;

    const newPost = {
      id,
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl,
      date: new Date().toISOString().slice(0, 10),
      author: currentUser?.email || "admin",
      views: 0,
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPost(emptyPost);
    alert("블로그 글이 등록되었습니다.");
  };

  const handleEditPost = (item: any) => {
    setEditingPostId(item.id);
    setPost({
      title: item.title || "",
      category: item.category || "",
      excerpt: item.excerpt || "",
      content: item.content || "",
      imageUrl: item.imageUrl || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeletePost = (id: string) => {
    if (!confirm("이 글을 삭제할까요?")) return;

    const updatedPosts = posts.filter((item) => item.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    if (editingPostId === id) {
      setEditingPostId(null);
      setPost(emptyPost);
    }
  };

  const cancelEditPost = () => {
    setEditingPostId(null);
    setPost(emptyPost);
  };

  const handleAddOrUpdateChannel = () => {
    if (
  !channel.name ||
  !channel.region ||
  !channel.category ||
  !channel.commission ||
  !channel.shortDescription
) {
  alert("사이트명, 지역, 카테고리, 수수료, 한 줄 설명은 필수입니다.");
  return;
}

    if (editingChannelId) {
      const updatedChannels = channels.map((item) =>
        item.id === editingChannelId
          ? {
              ...item,
              name: channel.name,
imageUrl: channel.imageUrl,
region: channel.region,
category: channel.category,
tags: channel.tags.split(",").map((v) => v.trim()).filter(Boolean),
shortDescription: channel.shortDescription,
website: channel.website,
commission: channel.commission,
settlementDate: channel.settlementDate,
commissionLink: channel.commissionLink,
settlementLink: channel.settlementLink,
            }
          : item
      );

      setChannels(updatedChannels);
      localStorage.setItem("salesChannels", JSON.stringify(updatedChannels));
      setEditingChannelId(null);
      setChannel(emptyChannel);
      alert("판매 채널이 수정되었습니다.");
      return;
    }

    const duplicated = channels.some(
      (item) =>
        item.name.trim().toLowerCase() === channel.name.trim().toLowerCase()
    );

    if (duplicated) {
      alert("같은 이름의 판매 채널이 이미 등록되어 있습니다.");
      return;
    }

    const newChannel = {
  id: `channel-${Date.now()}`,
  name: channel.name,
  imageUrl: channel.imageUrl,
  region: channel.region,
  category: channel.category,
  commission: channel.commission,
  settlementDate: channel.settlementDate,
  commissionLink: channel.commissionLink,
  settlementLink: channel.settlementLink,
  tags: channel.tags.split(",").map((v) => v.trim()).filter(Boolean),
  shortDescription: channel.shortDescription,
  website: channel.website,
};

    const updatedChannels = [newChannel, ...channels];
    setChannels(updatedChannels);
    localStorage.setItem("salesChannels", JSON.stringify(updatedChannels));
    setChannel(emptyChannel);
    alert("판매 채널이 등록되었습니다.");
  };

  const handleEditChannel = (item: any) => {
    setEditingChannelId(item.id);
    setChannel({
  name: item.name || "",
  imageUrl: item.imageUrl || "",
  region: item.region || "",
  category: item.category || "",
  commission: item.commission || "",
  settlementDate: item.settlementDate || "",
  commissionLink: item.commissionLink || "",
  settlementLink: item.settlementLink || "",
  tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
  shortDescription: item.shortDescription || "",
  website: item.website || "",
});

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteChannel = (id: string) => {
    if (!confirm("이 판매 채널을 삭제할까요?")) return;

    const updatedChannels = channels.filter((item) => item.id !== id);
    setChannels(updatedChannels);
    localStorage.setItem("salesChannels", JSON.stringify(updatedChannels));

    if (editingChannelId === id) {
      setEditingChannelId(null);
      setChannel(emptyChannel);
    }
  };

  const cancelEditChannel = () => {
    setEditingChannelId(null);
    setChannel(emptyChannel);
  };

  if (
    !checked ||
    !currentUser ||
    currentUser.email?.trim().toLowerCase() !==
      ADMIN_EMAIL.trim().toLowerCase()
  ) {
    return null;
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">관리자 페이지</h1>
          <p className="mt-2 text-sm text-neutral-600">
            도매 사이트, 블로그 글, 판매 채널을 등록하고 수정할 수 있습니다.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingSiteId ? "도매 사이트 수정" : "도매 사이트 등록"}
              </h2>

              <button
                onClick={() => setShowAdvancedSiteFields((prev) => !prev)}
                className="rounded-lg border px-3 py-2 text-xs hover:bg-neutral-100"
              >
                {showAdvancedSiteFields ? "추가 정보 접기" : "추가 정보 펼치기"}
              </button>
            </div>

            <div className="grid gap-3">
              <Input
                label="카테고리"
                value={site.category}
                onChange={(v) => setSite({ ...site, category: v })}
              />
              <Input
                label="사이트명"
                value={site.name}
                onChange={(v) => setSite({ ...site, name: v })}
              />
              <Input
                label="지역"
                value={site.region}
                onChange={(v) => setSite({ ...site, region: v })}
              />
              <Input
                label="이미지 URL"
                value={site.imageUrl}
                onChange={(v) => setSite({ ...site, imageUrl: v })}
              />
              <Input
                label="태그 (쉼표로 구분)"
                value={site.tags}
                onChange={(v) => setSite({ ...site, tags: v })}
              />
              <Input
                label="공식 사이트 URL"
                value={site.website}
                onChange={(v) => setSite({ ...site, website: v })}
              />
              <Input
                label="위탁배송 가능"
                value={site.dropshipping}
                onChange={(v) => setSite({ ...site, dropshipping: v })}
              />
              <Input
                label="사업자등록 필요"
                value={site.businessRequired}
                onChange={(v) => setSite({ ...site, businessRequired: v })}
              />
              <Input
                label="이용료"
                value={site.usageFee}
                onChange={(v) => setSite({ ...site, usageFee: v })}
              />
              <Input
                label="이미지 제공 여부"
                value={site.imageProvided}
                onChange={(v) => setSite({ ...site, imageProvided: v })}
              />
              <Textarea
                label="설명"
                value={site.shortDescription}
                onChange={(v) => setSite({ ...site, shortDescription: v })}
              />

              <div className="mt-2 flex gap-2">
                <button
                  onClick={handleAddOrUpdateSite}
                  className="rounded-xl bg-black px-4 py-3 text-white hover:opacity-90"
                >
                  {editingSiteId ? "도매 사이트 수정 저장" : "도매 사이트 등록"}
                </button>

                {editingSiteId && (
                  <button
                    onClick={cancelEditSite}
                    className="rounded-xl border px-4 py-3 hover:bg-neutral-100"
                  >
                    취소
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">
              {editingPostId ? "블로그 글 수정" : "블로그 글 등록"}
            </h2>

            <div className="grid gap-3">
              <Input
                label="제목"
                value={post.title}
                onChange={(v) => setPost({ ...post, title: v })}
              />
              <Input
                label="카테고리"
                value={post.category}
                onChange={(v) => setPost({ ...post, category: v })}
              />
              <Input
                label="요약"
                value={post.excerpt}
                onChange={(v) => setPost({ ...post, excerpt: v })}
              />
              <Input
                label="썸네일 URL"
                value={post.imageUrl}
                onChange={(v) => setPost({ ...post, imageUrl: v })}
              />
              <Textarea
                label="본문"
                value={post.content}
                onChange={(v) => setPost({ ...post, content: v })}
              />

              <div className="mt-2 flex gap-2">
                <button
                  onClick={handleAddOrUpdatePost}
                  className="rounded-xl bg-black px-4 py-3 text-white hover:opacity-90"
                >
                  {editingPostId ? "블로그 글 수정 저장" : "블로그 글 등록"}
                </button>

                {editingPostId && (
                  <button
                    onClick={cancelEditPost}
                    className="rounded-xl border px-4 py-3 hover:bg-neutral-100"
                  >
                    취소
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">
            {editingChannelId ? "판매 채널 수정" : "판매 채널 등록"}
          </h2>

          <div className="grid gap-3 md:grid-cols-2">
            <Input
              label="사이트명"
              value={channel.name}
              onChange={(v) => setChannel({ ...channel, name: v })}
            />
            <Input
              label="이미지 URL"
              value={channel.imageUrl}
              onChange={(v) => setChannel({ ...channel, imageUrl: v })}
            />
            <Input
              label="지역"
              value={channel.region}
              onChange={(v) => setChannel({ ...channel, region: v })}
            />
            <Input
               label="카테고리"
               value={channel.category}
                onChange={(v) => setChannel({ ...channel, category: v })}
             />
            <Input
              label="수수료"
              value={channel.commission}
              onChange={(v) => setChannel({ ...channel, commission: v })}
            />
            <Input
              label="정산일"
              value={channel.settlementDate}
              onChange={(v) => setChannel({ ...channel, settlementDate: v })}
            />
            <Input
              label="태그 (쉼표로 구분)"
              value={channel.tags}
              onChange={(v) => setChannel({ ...channel, tags: v })}
            />
            <Input
              label="공식 사이트 URL"
              value={channel.website}
              onChange={(v) => setChannel({ ...channel, website: v })}
            />
          </div>

          <div className="mt-3">
            <Textarea
              label="한 줄 설명"
              value={channel.shortDescription}
              onChange={(v) =>
                setChannel({ ...channel, shortDescription: v })
              }
            />
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleAddOrUpdateChannel}
              className="rounded-xl bg-black px-4 py-3 text-white hover:opacity-90"
            >
              {editingChannelId ? "판매 채널 수정 저장" : "판매 채널 등록"}
            </button>

            {editingChannelId && (
              <button
                onClick={cancelEditChannel}
                className="rounded-xl border px-4 py-3 hover:bg-neutral-100"
              >
                취소
              </button>
            )}
          </div>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">등록된 도매 사이트</h2>
            <div className="space-y-4">
              {sites.length === 0 ? (
                <p className="text-sm text-neutral-500">
                  아직 등록된 사이트가 없습니다.
                </p>
              ) : (
                sites.map((item) => (
                  <div key={item.id} className="rounded-xl border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm text-neutral-500">
                          {item.region} · {item.category}
                        </p>
                        <p className="mt-2 text-sm text-neutral-600">
                          {item.shortDescription}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditSite(item)}
                          className="rounded-lg border px-3 py-2 text-xs hover:bg-neutral-100"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteSite(item.id)}
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

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">등록된 블로그 글</h2>
            <div className="space-y-4">
              {posts.length === 0 ? (
                <p className="text-sm text-neutral-500">
                  아직 등록된 글이 없습니다.
                </p>
              ) : (
                posts.map((item) => (
                  <div key={item.id} className="rounded-xl border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold">{item.title}</p>
                        <p className="text-sm text-neutral-500">
                          {item.category} · {item.date}
                        </p>
                        <p className="mt-2 text-sm text-neutral-600">
                          {item.excerpt}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditPost(item)}
                          className="rounded-lg border px-3 py-2 text-xs hover:bg-neutral-100"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeletePost(item.id)}
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

        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">등록된 판매 채널</h2>

          <div className="space-y-4">
            {channels.length === 0 ? (
              <p className="text-sm text-neutral-500">
                아직 등록된 판매 채널이 없습니다.
              </p>
            ) : (
              channels.map((item) => (
                <div key={item.id} className="rounded-xl border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-neutral-500">
                        {item.region} · 수수료 {item.commission || "-"} · 정산일{" "}
                        {item.settlementDate || "-"}
                      </p>

                      {Array.isArray(item.tags) && item.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="rounded bg-neutral-100 px-2 py-1 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="mt-2 text-sm text-neutral-600">
                        {item.shortDescription}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditChannel(item)}
                        className="rounded-lg border px-3 py-2 text-xs hover:bg-neutral-100"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteChannel(item.id)}
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
    </main>
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        className="w-full rounded-xl border p-3"
      />
    </div>
  );
}