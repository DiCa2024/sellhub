"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

type Post = {
  id: number | string;
  title: string;
  category?: string;
  slug?: string;
  views?: number;
};

type HomeClientProps = {
  latestSites?: any[];
  popularSites?: any[];
  channels?: any[];
  latestPosts?: Post[];
  popularSeoPosts?: Post[];
  popularBlogPosts?: Post[];
};

export default function HomeClient({
  latestPosts = [],
  popularSeoPosts = [],
  popularBlogPosts = [],
}: HomeClientProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts =
    popularBlogPosts.length > 0
      ? popularBlogPosts.slice(0, 3)
      : latestPosts.slice(0, 3);

  const seoPosts = popularSeoPosts.slice(0, 3);

  const handleSearch = () => {
    const keyword = searchTerm.trim();

    if (keyword) {
      router.push(`/search?query=${encodeURIComponent(keyword)}`);
    } else {
      router.push("/search");
    }
  };

   return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main>
         <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-neutral-950 px-6 text-white">
            
    <div className="absolute inset-0">
  <Image
    src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1400&q=60"
    alt=""
    fill
    priority
    sizes="100vw"
    className="object-cover opacity-[0.28] blur-xl scale-110 animate-slow-zoom"
  />

  <div className="absolute left-[-8%] top-[6%] h-80 w-80 rounded-full bg-white/20 blur-3xl animate-soft-float" />
  <div className="absolute right-[-8%] top-[18%] h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-soft-float-delay" />
  <div className="absolute bottom-[-12%] left-[18%] h-[420px] w-[420px] rounded-full bg-purple-500/20 blur-3xl animate-soft-float-slow" />
</div>

<div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/65" />

  <div className="relative z-10 mx-auto max-w-5xl text-center">
    <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
      Global Seller Platform
    </p>

    <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
      도매처부터 판매채널,
      <br />
      SEO와 셀러도구까지 한곳에서
    </h1>

    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-300 md:text-lg">
      글로벌 셀러를 위한 도매 사이트, 판매 채널, 운영 도구, 콘텐츠
      가이드를 한 번에 탐색하세요.
    </p>

    <div className="mx-auto mt-9 flex max-w-2xl flex-col gap-3 rounded-full border border-white/10 bg-white/95 p-2 shadow-2xl backdrop-blur-xl sm:flex-row">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        placeholder="무엇을 찾고 계신가요?"
        className="min-h-12 flex-1 rounded-full bg-transparent px-5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
      />

      <button
        onClick={handleSearch}
        className="rounded-full bg-neutral-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
      >
        통합 검색
      </button>
    </div>

    <div className="mt-7 flex flex-wrap justify-center gap-2 text-sm text-neutral-300">
        {[
             { label: "Wholesale", href: "/wholesale" },
             { label: "Sales Channel", href: "/sales-channel" },
             { label: "SEO", href: "/seo" },
             { label: "Blog", href: "/blog" },
             { label: "Seller Tool", href: "/sellertool" },
          ].map((item) => (
      <Link
       key={item.label}
        href={item.href}
        className="rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-md transition hover:bg-white hover:text-black"
       >
       {item.label}
      </Link>
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
              쇼핑몰 찾기
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

        <AppleBanner
          href="/seo"
          imageUrl="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=2400&q=80"
          label="SEO Guide"
          title={
            <>
              검색 노출을 높이는
              <br />
              실전 SEO 가이드
            </>
          }
          description="키워드, 콘텐츠 구조, 검색 노출 전략을 실전 중심으로 정리합니다."
          compact
        />

        <PopularPostSection title="인기 SEO 글" posts={seoPosts} type="seo" />

        <AppleBanner
          href="/blog"
          imageUrl="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2400&q=80"
          label="Blog Guide"
          title={
            <>
              실전 셀러 운영
              <br />
              노하우 모음
            </>
          }
          description="도매, 소싱, 판매, 쇼핑몰 운영에 필요한 정보를 쉽게 확인하세요."
          compact
        />

        <PopularPostSection title="인기 Blog 글" posts={blogPosts} type="blog" />
      </main>
    </div>
  );
}

function AppleBanner({
  href,
  imageUrl,
  label,
  title,
  description,
  compact = false,
}: {
  href: string;
  imageUrl: string;
  label: string;
  title: ReactNode;
  description: string;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden bg-black ${
        compact ? "h-[560px]" : "h-[650px]"
      }`}
    >
      <Image
        src={imageUrl}
        alt={label}
        fill
        sizes="100vw"
        className="object-cover opacity-70 transition duration-700 group-hover:scale-105"
        priority={label === "Wholesale Platform"}
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

function PopularPostSection({
  title,
  posts,
  type,
}: {
  title: string;
  posts: Post[];
  type: "seo" | "blog";
}) {
  if (posts.length === 0) return null;

  const getHref = (post: Post) => {
    if (type === "seo") {
      if (post.category && post.slug) {
        return `/seo/${post.category}/${post.slug}`;
      }

      return "/seo";
    }

    return `/blog/${post.id}`;
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>

        <Link
          href={type === "seo" ? "/seo" : "/blog"}
          className="text-sm font-medium text-neutral-500 hover:text-black"
        >
          전체 보기 →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={`${type}-${post.id}`}
            href={getHref(post)}
            className="group flex min-h-[150px] flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              {post.category && (
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                  {post.category}
                </p>
              )}

              <h3 className="line-clamp-2 text-lg font-bold leading-7 text-neutral-900">
                {post.title}
              </h3>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-neutral-500">
              <span>조회수 {post.views ?? 0}</span>
              <span className="transition group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}