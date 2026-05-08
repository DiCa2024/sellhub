"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type RecentItem = {
  id: number | string;
  name: string;
  imageUrl?: string;
  category?: string;
  region?: string;
  href: string;
  viewedAt?: string;
};

export default function MyPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [recentWholesale, setRecentWholesale] = useState<RecentItem[]>([]);
  const [recentSalesChannels, setRecentSalesChannels] = useState<RecentItem[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<RecentItem[]>([]);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    setRecentWholesale(
      JSON.parse(localStorage.getItem("recentWholesaleSites") || "[]")
    );

    setRecentSalesChannels(
      JSON.parse(localStorage.getItem("recentSalesChannels") || "[]")
    );

    setRecentBlogs(
      JSON.parse(localStorage.getItem("recentBlogs") || "[]")
    );
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-6xl">불러오는 중...</div>
      </main>
    );
  }

  if (!session?.user) return null;

  const currentUser = session.user;

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">마이페이지</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">내 정보</h2>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-lg font-bold text-white">
                {(currentUser.name || "U").slice(0, 1).toUpperCase()}
              </div>

              <div>
                <p className="font-bold">
                  {currentUser.name || "사용자"}
                </p>
                <p className="text-sm text-neutral-500">
                  {currentUser.email}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">계정 설정</h2>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium transition hover:bg-neutral-100"
            >
              로그아웃
            </button>
          </section>

          <RecentSection
            title="최근 본 도매 사이트"
            items={recentWholesale}
            emptyText="최근 본 도매 사이트가 없습니다."
          />

          <RecentSection
            title="최근 본 판매 채널"
            items={recentSalesChannels}
            emptyText="최근 본 판매 채널이 없습니다."
          />

          <RecentSection
            title="최근 본 블로그"
            items={recentBlogs}
            emptyText="최근 본 블로그가 없습니다."
          />
        </div>
      </div>
    </main>
  );
}

function RecentSection({
  title,
  items,
  emptyText,
}: {
  title: string;
  items: RecentItem[];
  emptyText: string;
}) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>

      {items.length === 0 ? (
        <p className="text-sm text-neutral-500">{emptyText}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {items.slice(0, 10).map((item) => (
            <Link
              key={`${item.href}-${item.id}`}
              href={item.href}
              className="group overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-28 bg-neutral-100">
                <Image
                  src={item.imageUrl || "https://placehold.co/600x400?text=Item"}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-contain p-2"
                />
              </div>

              <div className="p-3">
                <p className="line-clamp-2 text-sm font-bold group-hover:underline">
                  {item.name}
                </p>

                {(item.category || item.region) && (
                  <p className="mt-1 text-xs text-neutral-500">
                    {item.region} {item.category && `· ${item.category}`}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}