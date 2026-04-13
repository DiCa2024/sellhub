"use client";

import { useEffect, useState } from "react";
import { wholesaleSites } from "../data/wholesaleSites";
import { blogPosts } from "../data/blogPosts";

export default function SellertoolPage() {
  const [dynamicSites, setDynamicSites] = useState<any[]>([]);
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);

  useEffect(() => {
    const savedSites = JSON.parse(localStorage.getItem("sites") || "[]");
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    setDynamicSites(savedSites);
    setDynamicPosts(savedPosts);
  }, []);

  const allSites = [...dynamicSites, ...wholesaleSites];
  const allPosts = [...dynamicPosts, ...blogPosts];

  const latestSites = allSites.slice(0, 3);
  const latestPosts = allPosts.slice(0, 3);

  const tools = [
    {
      id: "margin-calculator",
      title: "마진 계산기",
      description:
        "매입가, 배송비, 수수료, 판매가를 넣고 예상 순이익과 마진율을 계산합니다.",
      href: "/sellertool/margin-calculator",
    },
    {
      id: "sales-price-calculator",
      title: "판매가 계산기",
      description: "목표 마진율을 기준으로 적정 판매가를 계산할 수 있습니다.",
      href: "/sellertool/sales-price-calculator",
    },
    {
      id: "commission-calculator",
      title: "수수료 계산기",
      description:
        "플랫폼 수수료와 기타 비용을 반영해 실제 차감 금액을 계산합니다.",
      href: "/sellertool/commission-calculator",
    },
    {
      id: "memo-check-tool",
      title: "메모 / 체크 도구",
      description:
        "소싱 아이디어, 검토 사항, 체크리스트를 간단하게 기록하고 관리합니다.",
      href: "/sellertool/memo-check-tool",
    },
    {
      id: "vat-calculator",
      title: "부가가치세 계산기",
      description:
        "공급가액 또는 합계금액 기준으로 부가가치세를 계산할 수 있습니다.",
      href: "/sellertool/vat-calculator",
    },
    {
      id: "comprehensive-income-tax",
      title: "종합소득세 계산기",
      description:
        "근로, 사업, 이자, 배당, 임대, 기타소득을 합산해 참고 세액을 계산합니다.",
      href: "/sellertool/comprehensive-income-tax",
    },
    {
      id: "capital-gains-tax",
      title: "양도소득세 계산기",
      description:
        "취득가, 양도가, 필요경비와 적용세율을 기준으로 참고 세액을 계산합니다.",
      href: "/sellertool/capital-gains-tax",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Seller Tools</h1>
          <p className="mt-2 text-sm text-neutral-600">
            셀러 운영에 필요한 계산기와 보조 도구를 한곳에서 사용할 수 있습니다.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-lg font-bold">{tool.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {tool.description}
              </p>

              <div className="mt-auto pt-5">
                <a
                  href={tool.href}
                  className="block w-full rounded-xl bg-black px-4 py-3 text-center text-sm font-medium text-white hover:opacity-90"
                >
                  도구 열기
                </a>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">최신 등록 도매 사이트</h2>
            <a
              href="/wholesale"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {latestSites.map((site) => (
              <div
                key={site.id}
                className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-lg font-bold">{site.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {site.region} · {site.category}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(site.tags || []).slice(0, 4).map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded bg-neutral-100 px-2 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {site.shortDescription}
                </p>

                <div className="mt-auto pt-4">
                  <a
                    href={`/wholesale/${site.id}`}
                    className="block w-full rounded-xl border border-neutral-300 px-4 py-3 text-center text-sm hover:bg-neutral-100"
                  >
                    상세 보기
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">최신 블로그 글</h2>
            <a
              href="/blog"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <div
                key={post.id}
                className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-3 inline-flex w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  {post.category}
                </div>

                <h3 className="text-lg font-bold leading-7">{post.title}</h3>

                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {post.excerpt}
                </p>

                <div className="mt-4 text-xs text-neutral-500">
                  {post.author} · {post.date}
                </div>

                <div className="mt-auto pt-4">
                  <a
                    href={`/blog/${post.id}`}
                    className="block w-full rounded-xl border border-neutral-300 px-4 py-3 text-center text-sm hover:bg-neutral-100"
                  >
                    글 보기
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}