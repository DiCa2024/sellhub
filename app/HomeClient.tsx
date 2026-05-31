"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type HomeClientProps = {
  latestSites: any[];
  popularSites: any[];
  channels: any[];
  latestPosts: any[];
};

export default function HomeClient({
  latestSites,
  popularSites,
  channels,
  latestPosts,
}: HomeClientProps) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(savedUser);
  }, []);

  const getTagArray = (tags: string | string[] | undefined) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;

    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  };

  const handleSearch = () => {
    const keyword = searchTerm.trim();

    if (keyword) {
      router.push(`/search?query=${encodeURIComponent(keyword)}`);
    } else {
       router.push("/search");
    }
  };

  const handleQuickSearch = (keyword: string) => {
    router.push(`/search?query=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main>
  <section className="flex min-h-[80vh] items-center justify-center bg-neutral-950 px-6 text-white">
    <div className="mx-auto max-w-5xl text-center">
      <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
        Global Seller Platform
      </p>

      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
        도매처부터 판매채널,
        <br />
        SEO와 셀러도구까지 한곳에서
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-300 md:text-lg">
        글로벌 셀러를 위한 도매 사이트, 판매 채널, 운영 도구, 콘텐츠 가이드를
        한 번에 탐색하세요.
      </p>

      <div className="mx-auto mt-9 flex max-w-2xl flex-col gap-3 rounded-full bg-white p-2 shadow-2xl sm:flex-row">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="도매처, 판매채널, SEO, 블로그 검색"
          className="min-h-12 flex-1 rounded-full px-5 text-sm text-neutral-900 outline-none"
        />

        <button
          onClick={handleSearch}
          className="rounded-full bg-neutral-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          통합 검색
        </button>
      </div>

      <div className="mt-7 flex flex-wrap justify-center gap-2 text-sm text-neutral-300">
        {["도매사이트", "판매채널", "SEO", "블로그", "셀러도구"].map((item) => (
          <button
            key={item}
            onClick={() => handleQuickSearch(item)}
            className="rounded-full border border-white/20 px-4 py-2 transition hover:bg-white hover:text-black"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  </section>

  <AppleBanner
    href="/wholesale"
    imageUrl="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=2400&q=80"
    label="Wholesale Platform"
    title={
      <>
        전 세계 도매 사이트를
        <br />
        한곳에서 탐색하세요
      </>
    }
    description="한국, 중국, 일본, 미국, 유럽의 도매 플랫폼 정보를 제공합니다."
  />

  <AppleBanner
    href="/sales-channel"
    imageUrl="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2400&q=80"
    label="Sales Channel"
    title={
      <>
        상품에 맞는
        <br />
        판매 채널 찾기
      </>
    }
    description="국내외 판매 플랫폼 정보를 한곳에서 비교해보세요."
  />

  <AppleBanner
    href="/sellertool"
    imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=80"
    label="Seller Tools"
    title={
      <>
        셀러 운영을 위한
        <br />
        필수 도구
      </>
    }
    description="마진 계산부터 이미지 제작까지 판매에 필요한 기능을 제공합니다."
  />

  <section className="grid gap-4 bg-neutral-50 px-4 py-4 md:grid-cols-2">
    <SmallAppleBanner
      href="/seo"
      imageUrl="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80"
      label="SEO Guide"
      title={
        <>
          검색 노출을 높이는
          <br />
          실전 SEO 가이드
        </>
      }
    />

    <SmallAppleBanner
      href="/blog"
      imageUrl="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80"
      label="Blog Guide"
      title={
        <>
          실전 셀러 운영
          <br />
          노하우 모음
        </>
      }
    />
  </section>

  <section className="mx-auto max-w-5xl px-6 py-12">
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-lg font-bold">최신 글</h2>
      <Link href="/blog" className="text-sm text-neutral-500 hover:text-black">
        전체 보기 →
      </Link>
    </div>

    <div className="divide-y divide-neutral-200 border-y border-neutral-200">
      {latestPosts.slice(0, 3).map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.id}`}
          className="flex items-center justify-between gap-6 py-4 transition hover:bg-neutral-50"
        >
          <div>
            <p className="text-xs text-neutral-500">{post.category}</p>
            <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-neutral-900">
              {post.title}
            </h3>
          </div>
          <span className="shrink-0 text-sm text-neutral-400">읽기</span>
        </Link>
      ))}
    </div>
  </section>
</main>
    </div>
  );
}

function WholesaleSection({
  title,
  href,
  hrefText,
  sites,
  getTagArray,
  popular = false,
}: {
  title: string;
  href: string;
  hrefText: string;
  sites: any[];
  getTagArray: (tags: string | string[] | undefined) => string[];
  popular?: boolean;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <a href={href} className="text-sm font-medium text-neutral-600 hover:text-black">
          {hrefText}
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sites.map((site) => (
          <div
            key={site.id}
            className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Link
              href={`/wholesale/${site.id}`}
              className="mb-4 block overflow-hidden rounded-2xl bg-neutral-100"
            >
              <img
                src={site.imageUrl || "https://placehold.co/600x400?text=Wholesale"}
                alt={site.name}
                className="h-32 w-full bg-white object-contain p-2 transition hover:scale-105"
              />
            </Link>

            {popular && (
              <div className="mb-3 inline-flex w-fit rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white">
                인기
              </div>
            )}

            {popular && (
              <p className="text-xs text-neutral-500">조회수 {site.views ?? 0}</p>
            )}

            <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-7">
              {site.name}
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              {site.region} · {site.category}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {getTagArray(site.tags).slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
              {site.shortDescription}
            </p>

            <div className="mt-auto pt-5">
              <div className="flex gap-2">
                <Link
                  href={`/wholesale/${site.id}`}
                  className="flex-1 rounded-xl border border-neutral-300 px-3 py-2.5 text-center text-sm font-medium transition hover:bg-neutral-100"
                >
                  상세 보기
                </Link>

                <a
                  href={site.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-xl bg-neutral-900 px-3 py-2.5 text-center text-sm font-medium text-white transition hover:opacity-90"
                >
                  사이트 이동
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ToolCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-neutral-600">{description}</p>
      <div className="mt-auto pt-5">
        <a
          href={href}
          className="block w-full rounded-xl bg-black px-4 py-3 text-center text-sm font-medium text-white transition hover:opacity-90"
        >
          바로가기
        </a>
      </div>
    </div>
  );
}

function AppleBanner({
  href,
  imageUrl,
  label,
  title,
  description,
}: {
  href: string;
  imageUrl: string;
  label: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block h-[650px] overflow-hidden bg-black"
    >
      <Image
        src={imageUrl}
        alt={label}
        fill
        sizes="100vw"
        className="object-cover opacity-70 transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-white/70">
          {label}
        </p>

        <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
          {title}
        </h2>

        <p className="mt-5 max-w-xl text-base leading-7 text-white/80 md:text-lg">
          {description}
        </p>
      </div>
    </Link>
  );
}

function SmallAppleBanner({
  href,
  imageUrl,
  label,
  title,
}: {
  href: string;
  imageUrl: string;
  label: string;
  title: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative block h-[500px] overflow-hidden rounded-[2rem] bg-black"
    >
      <Image
        src={imageUrl}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover opacity-75 transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/70">
          {label}
        </p>

        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          {title}
        </h2>
      </div>
    </Link>
  );
}